/* global describe test expect jest */

import { execute, strand, action } from "../index";

const fooBar = () => Promise.resolve({ foo: "bar" });
const barFoo = () => Promise.resolve({ bar: "foo" });

const createAnAction = foo => ({ type: "AN_ACTION", payload: foo });

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

    test("passes on context", async () => {
        const fixture = strand(fooBar, ({ foo }) =>
            Promise.resolve({ bar: foo })
        );
        const result = await execute()(fixture);
        expect(result).toEqual({ foo: "bar", bar: "bar" });
    });

    test("passes context to chained strand", async () => {
        const fixture = strand(fooBar, () =>
            strand(({ foo }) => Promise.resolve({ bar: foo }))
        );
        const result = await execute()(fixture);
        expect(result).toEqual({ foo: "bar", bar: "bar" });
    });

    test("dispatches an action", async () => {
        const fixture = strand(fooBar, ({ foo }) =>
            action(createAnAction(foo))
        );
        const dispatch = jest.fn();
        const result = await execute(dispatch)(fixture);
        expect(result).toEqual({ foo: "bar" });
        expect(dispatch).toHaveBeenCalledWith({
            type: "AN_ACTION",
            payload: "bar"
        });
    });
});
