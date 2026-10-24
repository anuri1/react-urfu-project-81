class Tag {
    private pairTags: Array<string> = ["label", "div"];

    constructor(
        private name: string,
        private params?: {[key: string]: string},
        private text?: string
    ) {}

    toString(): string {
        const result = `<${this.name}${this.createParamsString()}>`;
        if (!this.pairTags.includes(this.name)) {
            return result;
        }
        return `${result}${this.text ?? ""}</${this.name}>`;
    }

    createParamsString(): string {
        if (this.params === undefined) {
            return "";
        }

        let paramsString = "";
        for (const [key, value] of Object.entries(this.params)) {
            paramsString += ` ${key}="${value}"`;
        }
        return paramsString;
    }
}


console.log(new Tag("br").toString());
// <br>

console.log(new Tag("img", { src: "path/to/image" }).toString());
// <img src="path/to/image">

console.log(new Tag("input", { type: "submit", value: "Save" }).toString());
// <input type="submit" value="Save">

// Для парных тегов надо придумать как лучше
console.log(new Tag("label", {}, "Email").toString());
// <label>Email</label>

console.log(new Tag("label", { for: "email" }, "Email").toString());
// <label for="email">Email</label>

console.log(new Tag("div").toString());
// <div></div>

export default Tag;
