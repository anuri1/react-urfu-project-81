import Tag from "./Tag.js";

type Template = Record<string, unknown>;
type FormOptions = { url?: string };
type FormCallback = (form: unknown) => void;

class HexletCode {
    static formFor(
        template: Template,
        options: FormOptions = {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        callback?: FormCallback,
    ): string {
        const action = options.url ?? "#";
        return new Tag("form", { action, method: "post" }).toString();
    }
}

export default HexletCode;