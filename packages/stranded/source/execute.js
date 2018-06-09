import { Strand } from "./strand";
import ExecutionContext from "./internals/ExecutionContext";

const execute = (strand, context = {}, parentState = {}) => {
    const execution = new ExecutionContext(
        Strand.from(strand),
        context,
        parentState
    );

    execution.start();

    return execution;
};

export default execute;
