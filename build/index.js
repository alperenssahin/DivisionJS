"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Division = void 0;
var fs_1 = require("fs");
var uuid_1 = require("uuid");
/*
* <div id="" className="attribute">----------</div>
* */
var Division = /** @class */ (function () {
    // static img():Division{
    //     return new Division('img')
    // }
    // static span():Division{
    //     return new Division('span')
    // }
    // static p():Division{
    //     return new Division('p')
    // }
    // static h1():Division{
    //     return new Division("h1")
    // }
    // static h2():Division{
    //     return new Division("h2")
    // }
    // static h3():Division{
    //     return new Division("h3")
    // }
    // static h4():Division{
    //     return new Division("h4")
    // }
    // static h5():Division{
    //     return new Division("h5")
    // }
    // static h6():Division{
    //     return new Division("h6")
    // }
    // static input():Division{
    //     return new Division('input')
    // }
    // static button():Division{
    //     return new Division('button')
    // }
    // static select():Division{
    //     return new Division('select')
    // }
    // static tagName = function () {
    //     return new Division(`${Division.tagName.name}`)
    // }
    // static form():Division{
    //     return new Division('form')
    // }
    function Division(tag, attributes, styles) {
        console.log("Constructing tag : " + tag);
        this.tag = tag;
        this.attributes = attributes;
        this.id = attributes.id || (0, uuid_1.v4)().split("-")[0];
        this.class = attributes.class;
        this.innerText = attributes.innerText || '';
        this.styles = styles || {};
        this.idStyleName = '';
        this.classStyleName = '';
        this.inputType = '';
        this.inputCount = 0;
        this.buttonFunction = '';
        this.margin = '';
        this.basicTagNames = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        // this.dataId = uuidv4()
        this.vModel = '';
    }
    Division.createDom = function (tag, attributes, styles) {
        return new Division(tag, attributes, styles);
    };
    Division.div = function (attributes, styles) {
        return new Division("div", attributes, styles);
    };
    Division.prototype.setIdName = function (idname) {
        this.id = idname;
        this.idStyleName = idname;
        return this;
    };
    Division.prototype.setClassName = function (classname) {
        this.class = classname;
        this.classStyleName = classname;
        return this;
    };
    Division.prototype.setInnerText = function (text) {
        this.innerText = text;
        return this;
    };
    Division.prototype.setData = function (data) {
        this.myData = data;
        return this;
    };
    Division.prototype.setInput = function (inputtype) {
        this.inputType = "type=\"" + inputtype + "\"";
        if (inputtype === 'button') {
            this.buttonFunction = "@click='myInputFunction()' ";
        }
        return this;
    };
    Division.prototype.setInputCount = function (inputCount) {
        this.inputCount = inputCount;
        return this;
    };
    Division.prototype.setMargin = function () {
        this.margin = 'margin: auto';
        return this;
    };
    Division.prototype.generateHTML = function () {
        return "<" + this.tag + " id=" + this.id + " " + ((this.class && "class=\"" + this.class + "\"") || '') + ">" + this.innerText + "</" + this.tag + ">\n";
        // if (this.tag === 'form') {
        //     return `<${this.tag}>\n ${this.generateMultipleInput()} </${this.tag}>\n`
        // }
        // if (this.tag === 'input') {
        //     return `<${this.tag} ${this.inputType} ${this.buttonFunction}/>\n`
        // }
        // if (this.tag === 'button') {
        //     return `<${this.tag} @click="myButtonFunction()"></${this.tag}>\n`
        // }
        // if (this.tag === 'select') {
        //     return `<${this.tag}>\n<option></option>\n</${this.tag}>\n`
        // }
        // if (this.tag === 'img') {
        //     return `<${this.tag} src="" alt="" />\n`
        // }
        // if (this.basicTagNames.includes(this.tag)) {
        //     return `<${this.tag}></${this.tag}>\n`
        // }
    };
    Division.prototype.generateStyle = function () {
        var _this = this;
        //tag#id.class
        var cssSelector = this.tag + "#" + this.id + ((this.class && '.' + this.class.split(" ").join(".")) || '');
        var css = Object.keys(this.styles).reduce(function (accumulator, cssKey) { return accumulator + (cssKey + ":" + _this.styles[cssKey] + ";"); }, '');
        return cssSelector + "{\n" + css + "\n}\n";
    };
    Division.prototype.generateScripts = function () {
        if (this.inputType === "type=\"button\"") {
            return "myInputFunction(){},\n";
        }
        if (this.tag === 'button') {
            return "myButtonFunction(){},\n";
        }
    };
    Division.prototype.generateData = function () {
        if (this.myData) {
            return this.myData + ": ,";
        }
    };
    Division.prototype.generateMultipleInput = function () {
        var i = 0;
        var input = '<label>\n<input v-model="" />\n</label>\n';
        var myInputs = '';
        for (i; i < this.inputCount; i++) {
            myInputs += input;
        }
        return myInputs;
    };
    Division.compile = function (divisionFilePath) {
        var raw = (0, fs_1.readFileSync)(divisionFilePath, { encoding: "utf-8" });
        console.log(raw);
        var matchedDivision = raw.match(/Division.\w+\(([\x00-\x7F]+?)?\)[\s]+/gm);
        console.log(matchedDivision);
        if (matchedDivision) {
            var compiledJS = "\n        const {Division} = require(\"../build/index\")\n        const fs = require(\"fs\")\n        const x  = [\n            " + matchedDivision.join(",") + "\n        ]\n        const compiledVue = `\n        <template>\n            <div>\n                ${x.map(s=>s.generateHTML()).join('')}\n            </div> \n        </template>\n        <script>\n         export default {\n            name: \"" + String(divisionFilePath).split(/(\\|\/)/g).pop() + "\",\n            data () {\n                return {\n                    ${x.map(s=>s.generateData()).join('')}\n                }\n            },\n            methods: {\n                ${x.map(s=>s.generateScripts()).join('')}\n            }\n         \n         }\n        </script>\n        <style scoped>\n               ${x.map(s=>s.generateStyle()).join('')}\n        </style>\n        `\n        fs.writeFileSync('" + (divisionFilePath + ".vue") + "',compiledVue,{encoding:\"utf-8\"})\n        ";
            (0, fs_1.writeFileSync)(divisionFilePath + ".compiled", compiledJS, { encoding: "utf-8" });
        }
        else {
            console.log(Error.name);
        }
        var divisions = "<div></div><div></div><div></div>";
        return "\n        <template>\n            <div>\n                " + divisions + " \n            </div> \n        </template>\n        <script>\n         \n        </script>\n        <style scoped>\n        \n        </style>\n        ";
    };
    return Division;
}());
exports.Division = Division;
