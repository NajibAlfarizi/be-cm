import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        nama: { type: String, required: true },
        deskripsi: { type: String },
        harga: { type: Number, required: true },
        stok: { type: Number, default: 0 },
        kategori: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        gambar: { type: String },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema);
export default Product;