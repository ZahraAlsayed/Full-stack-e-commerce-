import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

type Product = {
  id: number;
  name: string;
  price: number;
}
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [oneProduct, setOneProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const fetchAllProducts = async () => {
    const { data } = await axios.get("http://localhost:3004/products")
    setProducts(data.payload)

  }

  useEffect(() => {
    fetchAllProducts();
  }, [])

  const handelDelet = async (id: number) => {
    await axios.delete(`http://localhost:3004/products/${id}`);
    toast.error(`${oneProduct.name} delete successfuly`, {
      position: "top-right",
      autoClose: 3000,
    });
    fetchAllProducts();
  }
  const creatProduct = async (product: Product) => {
    try {
      await axios.post(`http://localhost:3004/products`, product);
      toast.success(`${oneProduct.name} added successfuly`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchAllProducts();
    } catch (error) {
      toast.error(error.massage)
    }
  }

  const updateProduct = async () => {
    if (selectedProduct) {
      await axios.put(
        `http://localhost:3004/products/${selectedProduct.id}`,
        oneProduct
      );
      toast.success(`${oneProduct.name} Update successfuly`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchAllProducts();
      setSelectedProduct(null);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedProduct) {
      updateProduct();
    } else {
      creatProduct(oneProduct);
    }
    setOneProduct({
      id: 0,
      name: '',
      price: 0
    });
  }

  const handleUpdate = (product: Product) => {
    setSelectedProduct(product);
    setOneProduct({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOneProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }
 



  return (
    <div className="container">
      <div className='form-container'>
        <ToastContainer />
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input name='name' type="text" placeholder='Enter product Name' value={oneProduct.name} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Price:
            <input name='price' type="number" placeholder='Enter product price' value={oneProduct.price} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit"> {selectedProduct ? "Update Product" : "Add Product"}</button>
        </form>
      </div>
      <div >
        {products.map((product) => (
          <div key={product.id} className='form-container'>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button className="deletbutten" onClick={() => handelDelet(product.id)}>DELET</button>
            <button onClick={() => handleUpdate(product)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
