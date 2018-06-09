/* global describe test expect */

import { Atom } from "../Atom";

describe("Atom", () => {
    describe("constructor", () => {
        test("constructs unit resolving atom", async () => {
            const unit = {};
            const atom = new Atom(unit);
            const result = await atom.execute();
            expect(result).toBe(unit);
        });

        test("constructs unit resolving function", async () => {
            const payload = {};
            const unit = () => Promise.resolve(payload);
            const atom = new Atom(unit);
            const result = await atom.execute();
            expect(result).toBe(payload);
        });
    });

    describe("from", () => {
        test("returns identity", () => {
            const identity = new Atom();
            expect(Atom.from(identity)).toBe(identity);
        });
    });
});
