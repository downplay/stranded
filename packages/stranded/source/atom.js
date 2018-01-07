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
        invariant(isFunction(func), "Atom must be a function");
        this.atom = func;
    }
}

const atom = func => (func instanceof Atom ? func : new Atom(func));

export { Atom };

export default atom;
