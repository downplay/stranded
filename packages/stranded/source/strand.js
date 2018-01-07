import invariant from "invariant";
import atom from "./atom";

class Strand {
    constructor(atoms) {
        invariant(Array.isArray(atoms), "Strand needs an array of atoms");
        this.atoms = atoms.map(atom);
    }
}

const strand = (...atoms) => new Strand(atoms);

export default strand;
