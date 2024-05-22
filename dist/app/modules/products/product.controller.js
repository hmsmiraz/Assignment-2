"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const zodParseData = product_validation_1.default.parse(product);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParseData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something is missing or invalid, check and try again',
            error: err,
        });
    }
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const searchTerm = (_a = req.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        const result = yield (0, product_service_1.getProductBySearch)(searchTerm);
        res.status(200).send({
            success: true,
            message: 'Product fetched successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Product is retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something is missing or invalid, check and try again',
            error: err,
        });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const product = req.body;
        const value = product_validation_1.default.parse(product);
        yield (0, product_service_1.updateProductInDB)(id, value);
        res.send({
            success: true,
            message: 'Product is updated successfully!',
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Product is deleted successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something is missing or invalid, check and try again',
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getProduct,
    getSingleProduct,
    updateProductById,
    deleteProduct,
};
