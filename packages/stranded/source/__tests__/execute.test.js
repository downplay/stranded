/* global describe test expect jest */

import { execute, strand, action } from "../index";

const fooBar = Promise.resolve({ foo: "bar" });
const barFoo = Promise.resolve({ bar: "foo" });

describe("execute", () => {
    test("finishes no-op", async () => {
        const fixture = strand();
        const result = execute(fixture);
        expect(result.finished).toEqual(true);
        expect(result.status).toEqual("FINISHED");
        const state = await result.next();
        expect(state).toEqual({});
    });

    test("sets state from a literal", async () => {
        const fixture = strand({ test: "thing" });
        const execution = execute(fixture);
        expect(execution.state).toEqual({});
        expect(execution.status).toEqual("EXECUTING");
        const state = await execution.next();
        expect(state).toEqual({ test: "thing" });
        expect(state).toBe(execution.state);
        expect(execution.status).toEqual("FINISHED");
        expect(execution.cursor).toEqual(1);
    });

    test("executes a step and resolves a Promise", async () => {
        const fixture = strand(fooBar);
        const execution = execute(fixture);
        const state = await execution.next();
        expect(state).toEqual({ foo: "bar" });
    });

    test("resolves two Promises", async () => {
        const fixture = strand(fooBar, barFoo);
        const execution = execute(fixture);
        const state = await execution.toEnd();
        expect(state).toEqual({ foo: "bar", bar: "foo" });
    });

    test("chains to another strand", async () => {
        const fixture = strand(fooBar, strand(barFoo));
        const execution = execute(fixture);
        const state = await execution.toEnd();
        expect(state).toEqual({ foo: "bar", bar: "foo" });
    });

    test("passes on state", async () => {
        const fixture = strand(fooBar, ({ foo }) =>
            Promise.resolve({ bar: foo })
        );
        const execution = execute(fixture);
        const state = await execution.toEnd();
        expect(state).toEqual({ foo: "bar", bar: "bar" });
    });

    test("passes state to chained strand", async () => {
        const fixture = strand(
            fooBar,
            strand(({ foo }) => Promise.resolve({ bar: foo }))
        );
        const execution = execute(fixture);
        const state = await execution.toEnd();
        expect(state).toEqual({ foo: "bar", bar: "bar" });
    });

    test("dispatches an action", async () => {
        const createAnAction = foo => ({ type: "AN_ACTION", payload: foo });
        const fixture = strand(
            fooBar,
            action(({ foo }) => createAnAction(foo))
        );
        const dispatch = jest.fn();
        const execution = execute(fixture, { dispatch });
        const state = await execution.toEnd();
        expect(state).toEqual({ foo: "bar" });
        expect(dispatch).toHaveBeenCalledWith({
            type: "AN_ACTION",
            payload: "bar"
        });
    });
});
