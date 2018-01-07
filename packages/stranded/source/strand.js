import invariant from "invariant";
import atom from "./atom";

export class Strand {
    constructor(atoms) {
        invariant(Array.isArray(atoms), "Strand requires an array of atoms");
        this.atoms = atoms.map(atom);
    }
}

const strand = (...atoms) => new Strand(atoms);

export default strand;
