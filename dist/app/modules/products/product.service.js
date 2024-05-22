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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = exports.getProductBySearch = exports.updateProductInDB = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(productData);
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const result = yield product_model_1.ProductModel.findOne(query);
    return result;
});
const updateProductInDB = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOneAndUpdate({ _id: id }, product);
    return result;
});
exports.updateProductInDB = updateProductInDB;
const getProductBySearch = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = {};
    if (searchTerm) {
        searchQuery.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { tags: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
        ];
    }
    const result = yield product_model_1.ProductModel.find(searchQuery);
    return result;
});
exports.getProductBySearch = getProductBySearch;
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const result = yield product_model_1.ProductModel.findByIdAndDelete(query);
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getSingleProductFromDB,
    updateProductInDB: exports.updateProductInDB,
    getProductBySearch: exports.getProductBySearch,
    deleteProductFromDB,
};
