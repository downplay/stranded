/* global describe test expect */

import { Atom } from "../atom";
import { Strand } from "../strand";

describe("Strand", () => {
    describe("constructor", () => {
        test("constructs noop", () => {
            expect(() => new Strand()).not.toThrow();
            const noop = new Strand();
            expect(noop.length).toEqual(0);
        });

        test("converts inputs to atoms", () => {
            const strand = new Strand([{}, {}]);
            expect(strand.length).toEqual(2);
            expect(strand.atoms).toEqual([expect.any(Atom), expect.any(Atom)]);
        });
    });

    describe("at", () => {
        test("returns positional atoms", () => {
            const atom1 = new Atom();
            const atom2 = new Atom();
            const strand = new Strand([atom1, atom2]);
            expect(strand.at(0)).toBe(atom1);
            expect(strand.at(1)).toBe(atom2);
            expect(strand.at(3)).toBe(undefined);
        });
    });

    describe("from", () => {
        test("returns identity", () => {
            const identity = new Strand();
            expect(Strand.from(identity)).toBe(identity);
        });
    });
});
