import { Strand } from "./strand";

function* atomsGenerator(atoms) {
    let index = 0;
    while (atoms.length > index) {
        yield atoms[index].atom;
        index++;
    }
}

const execute = (dispatch, getState) => async strand => {
    let context = {};
    const atoms = atomsGenerator(strand.atoms);
    while (true) {
        const atom = atoms.next().value;
        if (!atom) {
            break;
        }
        // Execute atom
        let result = await atom();
        // Chain to child strand
        if (result instanceof Strand) {
            result = await execute(dispatch, getState)(result);
        }
        context = { ...context, ...result };
    }
    return context;
};

export default execute;
