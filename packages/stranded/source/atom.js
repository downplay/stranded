import invariant from "invariant";

function isFunction(functionToCheck) {
    const getType = {};
    return (
        functionToCheck &&
        getType.toString.call(functionToCheck) === "[object Function]"
    );
}

class Atom {
    constructor(func) {
        // TODO: Allow promise instead?
        invariant(func, "Atom must contain a function, literal or Promise");
        this.atom = isFunction(func) ? func : () => Promise.resolve(func);
    }
}

const atom = func => (func instanceof Atom ? func : new Atom(func));

export { Atom };

export default atom;
