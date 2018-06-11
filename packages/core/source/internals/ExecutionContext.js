import { Strand } from "../strand";

export const STATUS_UNSTARTED = "UNSTARTED";
export const STATUS_RUNNING = "RUNNING";
export const STATUS_EXECUTING = "EXECUTING";
export const STATUS_FINISHED = "FINISHED";
export const STATUS_ERROR = "ERROR";

class ExecutionContext {
    cursor = 0;
    finished = false;
    status = STATUS_UNSTARTED;
    error = null;

    constructor(strand, context, state) {
        if (!(strand instanceof Strand)) {
            throw new TypeError("strand must be instance of Strand");
        }
        this.strand = strand;
        this.context = context;
        this.state = state;
    }

    /**
     * Current Atom, according to the cursor position
     */
    get current() {
        return this.strand.at(this.cursor);
    }

    start() {
        if (this.status === STATUS_UNSTARTED) {
            this.status = STATUS_RUNNING;
        }
        return this.next();
    }

    /**
     * Trigger execution of the next atom if not executing
     * @returns {Promise} - a promise which will resolve or reject when the current/next atom finishes executing
     */
    next() {
        if (this.status === STATUS_RUNNING) {
            if (this.cursor === this.strand.length) {
                this.nextPromise = this.finish();
                return this.nextPromise;
            }
            const atom = this.current;
            this.status = STATUS_EXECUTING;
            this.nextPromise = new Promise((resolve, reject) => {
                atom.execute(this.state, this.context)
                    .then(result => {
                        // Update execution state
                        this.status = STATUS_RUNNING;
                        this.cursor++;
                        // Common case is for result to return state which will be merged with the execution state
                        // TODO: Manually apply keys and record which keys were modified to support parallel merging
                        if (result) {
                            this.state = { ...this.state, ...result };
                        }
                        resolve(this.state);
                        // TODO: Throw on primitive types, and handle effects: if (result instanceof Effect) ...
                        // TODO: Also do something sensible if an error happens during this resolve, rather than during
                        // Run next Atom
                        this.next();
                    })
                    .catch(error => {
                        // Errors completely stop execution
                        // TODO: BUT, should support catcher atoms
                        this.status = STATUS_ERROR;
                        this.error = error;
                        reject(error);
                    });
            });
        }
        return this.nextPromise;
    }

    /**
     * Resolves state once the entire Strand has finished.
     * Warning: Since Strands can loop forever, it is possible that this will never resolve
     */
    toEnd() {
        return this.next().then(() => {
            if (!this.finished) {
                return this.next();
            }
            return Promise.resolve(this.state);
        });
    }

    /**
     * Ends the executing Strand
     */
    finish() {
        this.status = STATUS_FINISHED;
        this.finished = true;
        return Promise.resolve(this.state);
    }
}

export default ExecutionContext;
