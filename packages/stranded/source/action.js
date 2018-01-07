import { Atom } from "./atom";

export class Action extends Atom {}

/**
 * Dispatches an action to hte redux store
 */
const action = creator => new Action(creator);

export default action;
