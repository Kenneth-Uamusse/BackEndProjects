"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const HttpError_1 = require("../errors/HttpError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError_1.HttpError) {
        res.status(err.status).json({ message: err.message });
    }
    else if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.errorHandler = errorHandler;
