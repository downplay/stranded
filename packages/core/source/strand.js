import invariant from "invariant";
import { Atom } from "./atom";
import execute from "./execute";

export class Strand extends Atom {
    constructor(atoms = []) {
        super();
        invariant(Array.isArray(atoms), "Strand requires an array of atoms");
        this.atoms = atoms.map(Atom.from);
    }

    get length() {
        return this.atoms.length;
    }

    at(index) {
        return this.atoms[index];
    }

    execute(state, context) {
        // Since a Strand can also function as an Atom, here we execute the
        // sub-strand and return the final state
        // TODO: More interaction between parent and child strands might be useful.
        // Also implement a plan for cancellation.
        const execution = execute(this, context, state);
        return execution.toEnd();
    }
}

const strand = (...atoms) => new Strand(atoms);

export default strand;
