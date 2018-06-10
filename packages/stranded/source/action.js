import { Atom } from "./atom";

export class Action extends Atom {
    constructor(creator) {
        super();
        this.creator = creator;
    }

    execute(state, { dispatch }) {
        dispatch(this.creator(state));
        return Promise.resolve();
    }
}

/**
 * Dispatches an action to hte redux store
 */
const action = creator => new Action(creator);

export default action;
