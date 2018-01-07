import { Component } from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import { Strand } from "./strand";
import execute from "./execute";

const strandsContextShape = PropTypes.shape({
    execute: PropTypes.func.isRequired
}).isRequired;

/**
 * Provider connects to Redux and connects the execute function to stranded components
 */
class Provider extends Component {
    static childContextTypes = {
        strandsContext: strandsContextShape
    };

    getChildContext() {
        return {
            strandsContext: {
                execute: this.executeStrand
            }
        };
    }

    executeStrand(strand) {
        invariant(strand instanceof Strand);
        execute(this.props.store.dispatch, this.props.store.getState)(strand);
    }

    render() {
        return this.props.children;
    }
}

export default Provider;
