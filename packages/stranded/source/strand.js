import invariant from "invariant";
import { Atom } from "./atom";

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
}

const strand = (...atoms) => new Strand(atoms);

export default strand;
