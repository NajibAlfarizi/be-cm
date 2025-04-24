import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate("kategori", "name");

    if (!products || products.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "tidak ada produk" });
    }

    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error("🔥 Gagal getAllProducts:", error); // Tambahkan ini
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "gagal mengambil produk", error: error.message });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try{
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "produk dengan id tersebut tidak ditemukan" });
    }
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "gagal mengambil produk" });
  }
});

export const createProduct = async (req, res) => {
  try {
    const { nama, harga, deskripsi, stok, kategori } = req.body;
    const gambar = req.file ? req.file.path : null;

    if (!nama || !harga || !stok || !kategori || !deskripsi || !gambar) {
      return res.status(400).json({ message: "semua field harus diisi" });
    }

    // ✅ Cek apakah kategori valid
    const categoryExists = await Category.findById(kategori);
    if (!categoryExists) {
      return res.status(400).json({ message: "kategori tidak valid" });
    }

    const product = new Product({
      nama,
      harga,
      deskripsi,
      stok,
      kategori,
      gambar,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, deskripsi, harga, stok, kategori, gambar } = req.body;
        if (!nama || !harga || !stok || !kategori || !gambar) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "semua field harus diisi" });
        }

        // validasi kategori
        const categoryExists = await Category.findById(kategori);
        if (!categoryExists) {
              return res.status(400).json({ message: "kategori tidak valid" });
       }

        const product = await Product.findByIdAndUpdate(id, {
        nama,
        deskripsi,
        harga,
        stok,
        kategori,
        gambar,
        }, { new: true });
    
        if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "produk dengan id tersebut tidak ditemukan" });
        }
        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "gagal memperbarui produk" });
    }
});

export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "produk dengan id tersebut tidak ditemukan" });
        }
        return res.status(StatusCodes.OK).json({ message: "produk berhasil dihapus" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "gagal menghapus produk" });
    }
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate("category", "name");
    if (!products || products.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "tidak ada produk dalam kategori ini" });
    }
    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "gagal mengambil produk" });
  }
});

export const getProductsByName = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.find({ nama: { $regex: name, $options: "i" } }).populate("category", "name");
    if (!products || products.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "tidak ada produk dengan nama tersebut" });
    }
    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "gagal mengambil produk" });
  }
});

export const getProductsByPriceRange = asyncHandler(async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const products = await Product.find({ harga: { $gte: minPrice, $lte: maxPrice } }).populate("category", "name");
    if (!products || products.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "tidak ada produk dalam rentang harga ini" });
    }
    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "gagal mengambil produk" });
  }
});