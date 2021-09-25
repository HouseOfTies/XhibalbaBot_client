"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var path_1 = require("path");
dotenv_1["default"].config({ path: path_1["default"].resolve(process.cwd(), '.env') });
exports["default"] = {
    botToken: process.env.BOT_TOKENno,
    openWeather: null,
    multimedia: {
        youtube: null,
        bingImages: null
    }
};
