/* global describe test expect */

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "../index";

configure({ adapter: new Adapter() });

describe("execute", () => {
    test("renders", () => {
        expect(() => shallow(<Provider />)).not.toThrow();
    });
});
