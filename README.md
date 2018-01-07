# Stranded 0.0.1

A new model for side effects in a React/Redux architecture.

## Intro

Side effects in Redux are commonly handled using one of the popular libraries `redux-thunk`, `redux-saga`, or `redux-promise`. They are great solutions to many problems. But I have found myself increasingly not liking these solutions on three counts;

1. Changing the contract of the `dispatch` function, in a hidden and somewhat magical way

2. Confusing to set up, and interactions between multiple Redux middlewares can become ambiguous

3. Breaking the usual explicitness of everything that normally happens in a React and Redux architecture

This alternative side effects model adds a new layer to the architecture, rather than trying to inject new functionality into the dispatch layer. Redux instead remains as a purely synchronous state machine, and side effects are handled in a new layer in between your components and your store. I call this layer "Strands".

## An Example

## Credits

Built on the Lerna React Library Template:
https://github.com/downplay/lerna-react-library-template

Bits and pieces of which borrowed from React Router (C) React Training MIT License
https://github.com/ReactTraining/react-router

## Version History

### Next version

* First release

## Copyright

&copy;2018 Downplay Ltd

Distributed under MIT license. See LICENSE for full details.
