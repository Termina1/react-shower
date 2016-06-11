# react-shower
[Shower](https://shwr.me) presentation engine running on React and Redux.

## Usage

I built [reshower](https://github.com/Termina1/reshower) cli-tool specifically to streamline
work with react-shower.

To start a new project just go to some directory, then:
```javascript
npm i -g reshower
mkdir somedir && reshower init
```

and follow instructions.

To start working just do:
```javascript
reshower start
```

in your project folder.

You can read more about reshower [here](https://github.com/Termina1/reshower).

## Configuration

You can use config.json file in your directory to specify desired configuration.

Options:

1. ```theme``` — shower theme you want to use, by default ```shower-ribbon``` is used.
If you want to use another theme (e.g. ```shower-material```), you need first to use npm to install it

2. ```proportions``` — every shower theme should support 16x9 mode, and 4x3 mode, you can use
this option to specify desired mode

## Components
I tried to keep this engine reasonably close to original Shower API, but this is a list
of components that I decided to introduce to increase usability or for some technical reasons.

### Deck
This is just a wrapper for every presentation, it has no properties.

### Slide
Basically ```<section>``` tag from original Shower engine, but less verbose.

Properties:
1. ```className``` — additional class for this slide

### Code
You can use it to embed some code in your slide. Prism.js is used for highlighting.

Properties:
1. ```code``` — code you want to display
2. ```lang``` — prism.js language preset

Example:
```javascript
import example from "./examples/example.hs";

...

<Code code={example} lang={haskell}/>
```

If you want to know more about shower themes capabilities you should visit their documentation.

## Why?
The purpose of this port is not to use fanciest technologies available,
but because current Shower engine lacks features that are critical for me:

###1. Flexible file structure
I don't want to keep all my presentation in one file. There should be easy way to split my presentation as
any other kind of code into separate files to enchance its logical structure.

###2. Components
I need a way to reuse markup, to not copy-paste every pattern I need on 2 or more slides,
in addition over time there are more patterns that I want to reuse in my different presentation,
instead I have to copy-paste them, this leads me to copying a lot of boilerplate code when I start another presentation.

###3. Extensibility
Current Shower engine uses ad-hoc modules, which is not part of any specification.
This port uses ES6 modules, which leads to better interop with other libraries.

###4. Hot-reload
If you used it once, you're addicted. Of course, you can use things like Browsersync, livereload, etc,
but it's not even close to instant updates that are available if you use webpack hot-reload feature.

###5. (Almost) Pure CSS
Actually, the reason I started this project is my experience with Spectacle presentation engine.
It has React, Redux and hot-reload as well. However, in my opinion their CSS-in-JS approach may be viable
for developing isolated components in real project, presentation is not the same as your common web project.

I struggled with radium for a bit, and understood, that it is easier to rewrite whole Spectacle project
than customize their theme for my needs. So it goes.

###6. Beautiful and clean Shower themes
I am a big fan of Shower themes. It's a pleasure to create presentations with them, they are clean
and battle-tested by many speakers.

## WIP
Currently this engine does not support ```Timer``` feature and ```next``` feature for lists.

## Contributions
All contributions are welcome, just make a PR.
