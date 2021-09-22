"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Division = void 0;
var fs_1 = require("fs");
var Division = /** @class */ (function () {
    function Division(tag) {
        console.log("Constructing tag : " + tag);
        this.tag = tag;
        this.innerText = '';
        this.className = '';
    }
    Division.div = function () {
        return new Division("div");
    };
    Division.h1 = function () {
        return new Division("h1");
    };
    Division.prototype.setInnerText = function (text) {
        this.innerText = text;
        return this;
    };
    Division.prototype.setClassName = function (classname) {
        this.className = classname;
        return this;
    };
    Division.prototype.generateHTML = function () {
        return "<" + this.tag + " class=\"" + this.className + "\">" + this.innerText + "</" + this.tag + ">";
    };
    Division.compile = function (divisionFilePath) {
        var raw = (0, fs_1.readFileSync)(divisionFilePath, { encoding: "utf-8" });
        var matchedDivision = raw.match(/Division.\w+\(([\x00-\x7F]+?)?\)[\s]+/gm);
        if (matchedDivision) {
            var compiledJS = "\n        const {Division} = require(\"../build/index\")\n        const fs = require(\"fs\")\n        const x  = [\n            " + matchedDivision.join(",") + "\n        ]\n        const compiledVue = `\n        <template>\n            <div>\n                ${x.map(s=>s.generateHTML()).join('')} \n            </div> \n        </template>\n        <script>\n         \n        </script>\n        <style scoped>\n        \n        </style>\n        `\n        fs.writeFileSync('" + (divisionFilePath + ".vue") + "',compiledVue,{encoding:\"utf-8\"})\n        ";
            (0, fs_1.writeFileSync)(divisionFilePath + ".compiled", compiledJS, { encoding: "utf-8" });
        }
        var divisions = "<div></div><div></div><div></div>";
        return "\n        <template>\n            <div>\n                " + divisions + " \n            </div> \n        </template>\n        <script>\n         \n        </script>\n        <style scoped>\n        \n        </style>\n        ";
    };
    return Division;
}());
exports.Division = Division;
