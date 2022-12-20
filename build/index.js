"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const loginRouter_1 = __importDefault(require("./router/loginRouter"));
const middleware_1 = require("./utils/middleware");
const tokenRouter_1 = __importDefault(require("./router/tokenRouter"));
// import mongoose from "mongoose";
const app = (0, express_1.default)();
app.use(express_1.default.static("frontend-build"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middleware_1.requestLogger);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("connected to MongoDB");
})
    .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
});
app.use("/api/users", tokenRouter_1.default);
app.use("/api/login", loginRouter_1.default);
app.use(middleware_1.unknownEndpoint);
app.use(middleware_1.errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
