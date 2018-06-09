function isFunction(functionToCheck) {
    const getType = {};
    return (
        functionToCheck &&
        getType.toString.call(functionToCheck) === "[object Function]"
    );
}

class Atom {
    static from(atom) {
        if (atom instanceof Atom) {
            return atom;
        }
        return new Atom(atom);
    }

    constructor(unit) {
        if (unit) {
            this.execute = isFunction(unit)
                ? (...props) => new Promise(resolve => resolve(unit(...props)))
                : () => Promise.resolve(unit);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    execute() {
        return Promise.resolve();
    }
}

const atom = Atom.from;

export { Atom };

export default atom;
