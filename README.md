# Stranded 0.0.1

A new model for side effects in a React/Redux architecture.

## Intro

Side effects in Redux are commonly handled using one of the popular libraries `redux-thunk`, `redux-saga`, or `redux-promise`. They are great solutions to many problems. But I have found myself increasingly not liking these solutions on three counts;

1. Changing the contract of the `dispatch` function, in a hidden and somewhat magical way

2. Confusing to set up, and interactions between multiple Redux middlewares can become ambiguous

3. Breaking the usual explicitness of everything that normally happens in a React and Redux architecture

This alternative side effects model adds a new layer to the architecture, rather than trying to inject new functionality into the dispatch layer. Redux instead remains as a purely synchronous state machine, and side effects are handled in a new layer in between your components and your store. I call this layer "Strands".

## How It Works

`stranded` introduces two core constructs: `strands` and `atoms`.

An `atom` is a _unit of work_. It defines a single step in a longer process. They are always wrapped in a Promise and therefore will always be asynchronous. An atom could: call a single fetch

A `strand` is a series of `atoms`, defining a set of steps to complete a larger process. They are a way to compose more complex scenarios from small units. The atoms in a strand are executed in series, but it is also possible to run atoms in parallel using `parallel`.

## An Example

Let's take the extremely common example of logging in a user. This example is expanded in more detail in the demo website, but it is not much more complicated than this.

The 'strand' we will export looks like this, and is invoked much like a Redux action creator:

```js
import { strand, dispatch } from "stranded";

import { callLoginService } from "./atoms";
import { userLoggedIn, loginFailed } from "./actions";

export const login = (username, password) =>
    strand(
        // Create context for subsequent steps
        { username, password },
        // Atom to invoke our login service using fetch, will be passed the context created above
        callLoginService,
        // Pass on the result from the API to decide a Redux action to dispatch
        // Note: should also be an imported atom, but inlined here for brevity
        ({ authorized, profile, error }) =>
            dispatch(authorized ? userLoggedIn(profile) : loginFailed(error))
    );
```

The `callLoginService` atom is a plain async function that looks like this:

```js
const callLoginService = async ({ username, password }) => {
    try {
        // Call the API
        const response = await axios.post("/api/login", { username, password });
        if (response.status === 200) {
            // Map result to values which will be merged into the strand context
            return { authorized: true, profile: response.data };
        }
        // Wrong credentials
        return { authorized: false };
    } catch {
        // Server error
        return { authorized: false, error: true };
    }
};
```

`userLoggedIn` and `loginFailed` are creators for straightforward Redux actions `USER_LOGGED_IN` and `LOGIN_FAILED`.

This is a trivial example, and looking at this you might well wonder what advantage this has over an `async` function used as a `thunk`. Well, we are not yet utilising the full power of `strands`, and we will see more interesting composability later, but some of the advantages include:

* Testability. It can be quite awkward to test complex thunks, involving a lock of mocking and spying. Atoms are smaller functions with more limited responsibility and therefore easier to test in focus. In fact the only part here that truly needs testing is `callLoginService`

* Ease of API. Since everything is destructured from a shared results object that gets populated as we move through the strand, all previously evaluated results are available, and we don't have to worry about order of function parameters. This API also encourages mapping operations into meaningful application state straight away rather than leaking implementation details (HTTP responses, etc.)

* Cancellable. A strand's execution can be cancelled at any stage.

* Chainable and extensible. Atoms can return new strands and other atoms, which may themselves invoke new functionality via middleware.

* Debugging. The discreet steps allows us to generate useful debug data as the `strand` is executed, and handle errors in a more structured fashion vs the complexity of having try/catch around different steps in a thunk. More on this to come...

## Credits

Built using the Lerna React Library Template:
https://github.com/downplay/lerna-react-library-template

Bits and pieces of which borrowed from React Router (C) React Training MIT License
https://github.com/ReactTraining/react-router

## Version History

### Next version

* First release

## Copyright

&copy;2018 Downplay Ltd

Distributed under MIT license. See LICENSE for full details.
