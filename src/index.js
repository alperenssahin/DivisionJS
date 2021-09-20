"use strict";
exports.__esModule = true;
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
        var compiledString;
        var raw = (0, fs_1.readFileSync)(divisionFilePath, { encoding: "utf-8" });
        console.log(raw);
        return raw;
    };
    return Division;
}());
exports.Division = Division;
