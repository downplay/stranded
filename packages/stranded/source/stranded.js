import React, { Component } from "react";
import { strandsContextShape } from "./Provider";

/**
 * Main HOC for connecting strands to components
 */
const stranded = mapStrandsToProps => WrappedComponent => {
    class Stranded extends Component {
        static contextTypes = {
            strandedContext: strandsContextShape
        };

        componentDidMount() {
            // For now, only supporting shorthand
            const connectedProps = { ...this.props };
            Object.keys(mapStrandsToProps).forEach(key => {
                connectedProps[key] = (...params) =>
                    this.context.strandedContext.execute(
                        mapStrandsToProps[key](...params)
                    );
            });
        }

        render() {
            return <WrappedComponent {...connectedProps} />;
        }
    }
    return Stranded;
};

export default stranded;
