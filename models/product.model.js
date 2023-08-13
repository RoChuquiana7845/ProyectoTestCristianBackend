import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
     descripcion: { type: String, required: true, unique: true },
     precio: { type: Number, required: true },
     stock: { type: Number, required: true },
     date: {type: Date, default: Date.now },
     user: {type: mongoose.Types.ObjectId, ref: "User"},
   },
   {
    timestamps: true,
   }
    
);

export default mongoose.model("producto", productSchema);