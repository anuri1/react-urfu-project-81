import { describe, expect, test } from "vitest";
import HexletCode from "../HexletCode.js";

describe("HexletCode.formFor", () => {
    const template = { name: "rob", job: "hexlet", gender: "m" };

    test("empty form with default action", () => {
        expect(HexletCode.formFor(template, {}, () => {})).toBe(
            '<form method="post" action="#"></form>',
        );
    });

    test("form with custom url", () => {
        expect(HexletCode.formFor(template, { url: "/users" }, () => {})).toBe(
            '<form method="post" action="/users"></form>',
        );
    });

    test("works without options and callback", () => {
        expect(HexletCode.formFor(template)).toBe(
            '<form method="post" action="#"></form>',
        );
    });

    test("input and textarea fields with labels", () => {
        const form = HexletCode.formFor(template, { method: "post" }, (f) => {
            f.input("name");
            f.input("job", { as: "textarea" });
        });

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<label for="name">Name</label>' +
            '<input name="name" type="text" value="rob">' +
            '<label for="job">Job</label>' +
            '<textarea cols="20" rows="40" name="job">hexlet</textarea>' +
            "</form>",
        );
    });

    test("additional attributes", () => {
        const form = HexletCode.formFor(template, {}, (f) => {
            f.input("name", { class: "user-input" });
            f.input("job");
        });

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<label for="name">Name</label>' +
            '<input name="name" type="text" value="rob" class="user-input">' +
            '<label for="job">Job</label>' +
            '<input name="job" type="text" value="hexlet">' +
            "</form>",
        );
    });

    test("textarea with default cols and rows", () => {
        const form = HexletCode.formFor(template, {}, (f) =>
            f.input("job", { as: "textarea" }),
        );

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<label for="job">Job</label>' +
            '<textarea cols="20" rows="40" name="job">hexlet</textarea>' +
            "</form>",
        );
    });

    test("textarea with overridden cols and rows", () => {
        const form = HexletCode.formFor(template, { url: "#" }, (f) =>
            f.input("job", { as: "textarea", rows: 50, cols: 50 }),
        );

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<label for="job">Job</label>' +
            '<textarea cols="50" rows="50" name="job">hexlet</textarea>' +
            "</form>",
        );
    });

    test("throws when the field is missing in the template", () => {
        expect(() =>
            HexletCode.formFor(template, { url: "/users" }, (f) => {
                f.input("name");
                f.input("job", { as: "textarea" });
                f.input("age");
            }),
        ).toThrow("Field 'age' does not exist in the template.");
    });

    test("submit with default text", () => {
        const form = HexletCode.formFor(template, { method: "post" }, (f) => {
            f.input("name");
            f.input("job");
            f.submit();
        });

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<label for="name">Name</label>' +
            '<input name="name" type="text" value="rob">' +
            '<label for="job">Job</label>' +
            '<input name="job" type="text" value="hexlet">' +
            '<input type="submit" value="Save">' +
            "</form>",
        );
    });

    test("submit with custom text", () => {
        const form = HexletCode.formFor(template, { method: "post" }, (f) => {
            f.input("name");
            f.input("job");
            f.submit("Wow");
        });

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<label for="name">Name</label>' +
            '<input name="name" type="text" value="rob">' +
            '<label for="job">Job</label>' +
            '<input name="job" type="text" value="hexlet">' +
            '<input type="submit" value="Wow">' +
            "</form>",
        );
    });

    test("submit without inputs", () => {
        const form = HexletCode.formFor(template, {}, (f) => f.submit());

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<input type="submit" value="Save">' +
            "</form>",
        );
    });

    test("label and labelHtml options", () => {
        const form = HexletCode.formFor(template, {}, (f) => {
            f.input("name", {
                label: "User",
                labelHtml: { class: "form-label", id: "name-label" },
            });
        });

        expect(form).toBe(
            '<form method="post" action="#">' +
            '<label for="name" class="form-label" id="name-label">User</label>' +
            '<input name="name" type="text" value="rob">' +
            "</form>",
        );
    });
});