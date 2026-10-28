import { describe, expect, test } from "vitest";
import HexletCode from "../HexletCode.js";

describe("HexletCode.formFor", () => {
    const template = { name: "rob", job: "hexlet", gender: "m" };

    test("empty form with default action", () => {
        expect(HexletCode.formFor(template, {}, () => {})).toBe(
            '<form action="#" method="post"></form>',
        );
    });

    test("form with custom url", () => {
        expect(HexletCode.formFor(template, { url: "/users" }, () => {})).toBe(
            '<form action="/users" method="post"></form>',
        );
    });

    test("works without options and callback", () => {
        expect(HexletCode.formFor(template)).toBe(
            '<form action="#" method="post"></form>',
        );
    });
});