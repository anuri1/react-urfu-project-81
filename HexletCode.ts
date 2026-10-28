import Tag from "./Tag.js";

type Template = Record<string, unknown>;
type FormOptions = { url?: string; method?: string };
type InputOptions = Record<string, string | number>;

const toAttrs = (attrs: InputOptions): Record<string, string> =>
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
        const { as, ...rest } = options;
        const labelText = name.charAt(0).toUpperCase() + name.slice(1);

        this.fields.push(new Tag("label", { for: name }, labelText).toString());

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
        return new Tag("form", { action, method: "post" }, form.render()).toString();
    }
}

export default HexletCode;