import runJobs from "./runJobs";

const packages = [
    {
        name: "@strands/core",
        path: "packages/core"
    }
];

runJobs(packages, "build");
