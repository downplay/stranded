const { BABEL_ENV } = process.env;
const building = typeof BABEL_ENV !== "undefined" && BABEL_ENV !== "cjs";

const plugins = [
    "babel-plugin-transform-runtime",
    "babel-plugin-transform-class-properties",
    "babel-plugin-transform-object-rest-spread"
];

/* TODO: Test UMD build
if (BABEL_ENV === "umd") {
    plugins.push("external-helpers");
}
*/

if (process.env.NODE_ENV === "production") {
    plugins.push("dev-expression", "transform-react-remove-prop-types");
}

module.exports = {
    presets: [
        [
            "env",
            {
                modules: building ? false : "commonjs"
            }
        ],
        "react"
    ],
    plugins
};
