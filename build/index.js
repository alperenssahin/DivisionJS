"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Division = void 0;
var fs_1 = require("fs");
var Division = /** @class */ (function () {
    function Division(tag) {
        console.log("Constructing tag : " + tag);
        this.tag = tag;
    }
    Division.div = function () {
        return new Division("div");
    };
    Division.h1 = function () {
        return new Division("h1");
    };
    Division.compile = function (divisionFilePath) {
        var raw = (0, fs_1.readFileSync)(divisionFilePath, { encoding: "utf-8" });
        var divisions = "<div></div><div></div><div></div>";
        return "\n        <template>\n            <div>\n                " + divisions + " \n            </div> \n        </template>\n        <script>\n         \n        </script>\n        <style scoped>\n        \n        </style>\n        ";
    };
    return Division;
}());
exports.Division = Division;
