import { Strand } from "./strand";
import { Action } from "./action";

function* atomsGenerator(atoms) {
    let index = 0;
    while (atoms.length > index) {
        yield atoms[index].atom;
        index++;
    }
}

const execute = (dispatch, getState, chainedContext) => async strand => {
    let context = { ...chainedContext };
    const atoms = atomsGenerator(strand.atoms);
    while (true) {
        const atom = atoms.next().value;
        if (!atom) {
            break;
        }
        // Execute atom
        let result = await atom(context);
        // Dispatch action
        if (result instanceof Action) {
            dispatch(await result.atom());
        } else {
            // Chain to child strand
            if (result instanceof Strand) {
                result = await execute(dispatch, getState, context)(result);
            }
            // Merge results
            context = { ...context, ...result };
        }
    }
    return context;
};

export default execute;
