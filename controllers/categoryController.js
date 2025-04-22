import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Category from "../models/categoryModel.js";

export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.status(StatusCodes.OK).json(categories);
});

export const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Category not found");
    }
    res.status(StatusCodes.OK).json(category);
});

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(StatusCodes.CREATED).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Category not found");
    }
    res.status(StatusCodes.OK).json(category);
}
);

export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Category not found");
    }
    res.status(StatusCodes.OK).json({ message: "Category deleted" });
}
);

export const getCategoryByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const category = await Category.findOne({ name });
    if (!category) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Category not found");
    }
    res.status(StatusCodes.OK).json(category);
});

