class Tag {
    private pairTags: Array<string> = ["label", "div", "form"];

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


export default Tag;
