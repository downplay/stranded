/* global describe test expect */

import { strand } from "../index";

describe("strand", () => {
    test("constructs noop", () => {
        expect(() => strand()).not.toThrow();
    });
});
