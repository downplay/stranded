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
        this.unit = unit;
    }

    execute(...props) {
        return Promise.resolve(
            isFunction(this.unit) ? this.unit(...props) : this.unit
        );
    }
}

const atom = Atom.from;

export { Atom };

export default atom;
