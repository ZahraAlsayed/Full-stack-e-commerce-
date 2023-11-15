import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

uuidv4();
export const getAllProducts = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
    res.status(200).json({ message: 'Get All products', payload: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
      const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
      const id = req.params.id;
      const product = products.find((product) => product.id == id);
      console.log(product)
    if (product) {
        res.status(200).json({
            message: 'Get one product information',
            payload: product
        });
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    //const data = req.body;
    const newProduct = {
      id:  new Date().getTime().toString(),
      name: req.body.name,
      price: req.body.price,
    };
      // Get existing data
      const exisitingProducts = JSON.parse(await fs.readFile("products.json", "utf8"));
      // Add the new product
      console.log(newProduct);
      exisitingProducts.push(newProduct);
      // Write the file
      await fs.writeFile("products.json", JSON.stringify(exisitingProducts));
      res.status(201).json({
          message: 'The product was created successfully'
      });
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
};

export const deleteOneProduct = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id == id);

    if (productIndex !== -1) {
      // Remove the product from the array
      const deletedProduct = products.splice(productIndex, 1)[0];

      // Write the updated array back to the file
      await fs.writeFile('products.json', JSON.stringify(products));

      res.status(200).json({
        message: 'Product deleted successfully',
        payload: deletedProduct,
      });
    } else {
      res.status(404).json({
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOneProduct = async (req, res) => {
      try {
    const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
    const id = req.params.id
    const productIndex = products.findIndex((product) => product.id ==id);

    if (productIndex !== -1) {
      // Update the product in the array
      const updatedProduct = {
        ...products[productIndex],
        name: req.body.name,
        price: req.body.price,
      };
      products[productIndex] = updatedProduct;

      // Write the updated array back to the file
      await fs.writeFile('products.json', JSON.stringify(products));

      res.status(200).json({
        message: 'Product updated successfully',
        payload: updatedProduct,
      });
    } else {
      res.status(404).json({
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
