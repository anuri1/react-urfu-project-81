import { describe, expect, test } from "vitest";
import Tag from "../Tag.js";

describe("Tag", () => {
    test("single tag without params", () => {
        expect(new Tag("br").toString()).toBe("<br>");
    });

    test("single tag with one param", () => {
        expect(new Tag("img", { src: "path/to/image" }).toString()).toBe(
            '<img src="path/to/image">',
        );
    });

    test("single tag with several params", () => {
        expect(new Tag("input", { type: "submit", value: "Save" }).toString()).toBe(
            '<input type="submit" value="Save">',
        );
    });

    test("paired tag with text and empty params", () => {
        expect(new Tag("label", {}, "Email").toString()).toBe("<label>Email</label>");
    });

    test("paired tag with params and text", () => {
        expect(new Tag("label", { for: "email" }, "Email").toString()).toBe(
            '<label for="email">Email</label>',
        );
    });

    test("paired tag without text", () => {
        expect(new Tag("div").toString()).toBe("<div></div>");
    });
});