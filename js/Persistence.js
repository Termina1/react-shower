import * as Derivable from 'derivable';

function tryParseJSON(blob) {
  try {
    return JSON.parse(blob);
  } catch (err) {
    return undefined;
  }
}

function read(key) {
  const blob = localStorage.getItem(key);
  return tryParseJSON(blob);
}

function write(key, value) {
  const blob = JSON.stringify(value);
  localStorage.setItem(key, blob);
}

/**
 * Create an atom which value is persisted in localStorage under the defined
 * key.
 *
 * XXX: This functionality is probably worth be a separate npm package.
 */
export function atom(key, initialValue) {
  let currentValue = read(key);
  if (currentValue === undefined) {
    currentValue = initialValue;
  }
  const value = Derivable.atom(currentValue);
  // Each time someone writes into atom we write value into localStorage.
  value.react(val => {
    write(key, val);
  }, {skipFirst: true});
  return value;
}
