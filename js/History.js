import {atom} from 'derivable';
import createHistory from 'history/lib/createBrowserHistory';

const history = createHistory();

/**
 * Current location exposed as an atom.
 *
 * XXX: This functionality is probably worth be a separate npm package.
 */
export const location = atom(history.getCurrentLocation());

// Each time something pops up from history (browser back button is used) we
// update current location.
history.listen(nextLocation => {
  if (nextLocation.action === 'POP') {
    location.set(nextLocation);
  }
});

// Each time someone updates location atom we push location to history.
location.react(nextLocation => {
  history.push(nextLocation);
}, {skipFirst: true});
