"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.handleSuccessResponse = void 0;
function handleSuccessResponse(res, statusCode, message, data, token) {
    res.status(statusCode).json({ message, data, token });
}
exports.handleSuccessResponse = handleSuccessResponse;
function handleErrorResponse(res, statusCode, message) {
    res.status(statusCode).json({ message });
}
exports.handleErrorResponse = handleErrorResponse;
