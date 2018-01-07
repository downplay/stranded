import React, { Component } from "react";
import { strandedContextShape } from "./Provider";

/**
 * Main HOC for connecting strands to components
 */
const stranded = mapStrandsToProps => WrappedComponent => {
    class Stranded extends Component {
        static contextTypes = {
            strandedContext: strandedContextShape
        };
        render() {
            // For now, only supporting shorthand
            const connectedProps = { ...this.props };
            Object.keys(mapStrandsToProps).forEach(key => {
                connectedProps[key] = (...params) =>
                    this.context.strandedContext.execute(
                        mapStrandsToProps[key](...params)
                    );
            });
            return <WrappedComponent {...connectedProps} />;
        }
    }
    return Stranded;
};

export default stranded;
