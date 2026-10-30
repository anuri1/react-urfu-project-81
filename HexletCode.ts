import Tag from "./Tag.js";

type Template = Record<string, unknown>;
type FormOptions = { url?: string; method?: string };
type Attrs = Record<string, string | number>;
type InputOptions = {
    as?: string;
    label?: string;
    labelHtml?: Attrs;
} & Record<string, unknown>;

const toAttrs = (attrs: Record<string, unknown>): Record<string, string> =>
    Object.fromEntries(
        Object.entries(attrs).map(([key, value]) => [key, String(value)]),
    );

class Form {
    private fields: string[] = [];

    constructor(private template: Template) {}

    input(name: string, options: InputOptions = {}): void {
        if (!Object.hasOwn(this.template, name)) {
            throw new Error(`Field '${name}' does not exist in the template.`);
        }

        const value = String(this.template[name]);
        const { as, label, labelHtml, ...rest } = options;
        const labelText =
            label ?? name.charAt(0).toUpperCase() + name.slice(1);
        const labelAttrs = toAttrs({ for: name, ...labelHtml });

        this.fields.push(new Tag("label", labelAttrs, labelText).toString());

        if (as === "textarea") {
            const attrs = toAttrs({ cols: 20, rows: 40, name, ...rest });
            this.fields.push(new Tag("textarea", attrs, value).toString());
            return;
        }

        const attrs = toAttrs({ name, type: "text", value, ...rest });
        this.fields.push(new Tag("input", attrs).toString());
    }

    submit(text = "Save"): void {
        this.fields.push(
            new Tag("input", { type: "submit", value: text }).toString(),
        );
    }

    render(): string {
        return this.fields.join("");
    }
}

class HexletCode {
    static formFor(
        template: Template,
        options: FormOptions = {},
        callback?: (form: Form) => void,
    ): string {
        const form = new Form(template);
        callback?.(form);

        const action = options.url ?? "#";
        return new Tag("form", { method: "post", action }, form.render()).toString();
    }
}

export default HexletCode;