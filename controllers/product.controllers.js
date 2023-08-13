import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    
    const productos = await Product.find({user: req.user.userId}).populate();
    console.log(productos)
    res.status(200).json(productos)
    
};

export const createProduct = async (req, res) => {
  try {
     const { descripcion,precio,stock } = req.body;

    const existingProd = await Product.findOne({ descripcion });
    if (existingProd) {
      return res.status(400).json({ message: 'Ya existe un registro con la misma descripción' });
    }
    console.log(req.body)
    const product = new Ptudent({
      descripcion,
      precio,
      stock,
      user: req.user.userId
    });
    console.log(product)
    const productOk= await product.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro ingresado ok",productOk});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al insertar" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByIdAndDelete(id) ;
    if (!product) {
      return res.status(404).json({ message: 'Product no encontrado' });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al eliminar el producto' });
  }
};

export const updateProduct = async (req, res) => {
     try {
    const { id } = req.params;
    const { descripcion, precio,stock } = req.body;

    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    product.descripcion = descripcion;
    product.precio = precio;
    product.stock = stock;
    await product.save();

    
    res.status(200).json({"status":"registro actualizado ok",product});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el producto' });
  }
};

export const getProduct = async (req, res) => {
    try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Producto' });
    }
};