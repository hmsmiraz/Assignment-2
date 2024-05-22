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
exports.getOrderService = exports.createOrderService = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
const createOrderService = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = order.productId;
    const isExists = yield product_model_1.ProductModel.findById(id);
    if (!isExists) {
        throw new Error('Product not found in DB!');
    }
    else {
        const updatedQuantity = ((_a = isExists === null || isExists === void 0 ? void 0 : isExists.inventory) === null || _a === void 0 ? void 0 : _a.quantity) - (order === null || order === void 0 ? void 0 : order.quantity);
        if (isExists.inventory.inStock &&
            updatedQuantity >= 0 &&
            updatedQuantity <= ((_b = isExists === null || isExists === void 0 ? void 0 : isExists.inventory) === null || _b === void 0 ? void 0 : _b.quantity)) {
            const result = yield order_model_1.OrderModel.create(order);
            yield product_model_1.ProductModel.updateOne({ _id: id }, {
                'inventory.quantity': updatedQuantity,
                'inventory.inStock': updatedQuantity > 0,
            });
            return result;
        }
        else {
            throw new Error('Insufficient quantity available in inventory');
        }
    }
});
exports.createOrderService = createOrderService;
const getOrderService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailQuery = email ? { email } : {};
    const result = yield order_model_1.OrderModel.find(emailQuery);
    if (result.length > 0) {
        return result;
    }
    throw new Error('Order not found');
});
exports.getOrderService = getOrderService;
