/* global describe test expect */

import { execute, strand } from "../index";

const fooBar = () => Promise.resolve({ foo: "bar" });
const barFoo = () => Promise.resolve({ bar: "foo" });

describe("execute", () => {
    test("resolves Promise", async () => {
        const fixture = strand(fooBar);
        const result = await execute()(fixture);
        expect(result).toEqual({ foo: "bar" });
    });

    test("resolves two Promises", async () => {
        const fixture = strand(fooBar, barFoo);
        const result = await execute()(fixture);
        expect(result).toEqual({ foo: "bar", bar: "foo" });
    });

    test("resolves object shorthand", async () => {
        const fixture = strand({ foo: "bar" });
        const result = await execute()(fixture);
        expect(result).toEqual({ foo: "bar" });
    });

    test("chains to another strand", async () => {
        const fixture = strand(fooBar, () => strand(barFoo));
        const result = await execute()(fixture);
        expect(result).toEqual({ foo: "bar", bar: "foo" });
    });
});
