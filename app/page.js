"use client";
import React from "react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingAction, setloadingAction] = useState(false);
  const [dropDown, setDropDown] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      let rjson = await response.json();
      setProducts(rjson.products);
    };

    fetchProducts();
  }, []);

  const buttonAction = async (action, slug, initialQuantity) => {
    let index = products.findIndex((item) => item.slug === slug);
    let newProducts = JSON.parse(JSON.stringify(products));
  
    if (action === "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }
    setProducts(newProducts);
  
    // Use the index from the dropDown array
    let indexDrop = dropDown.findIndex((item) => item.slug === slug);
    let newDropdown = JSON.parse(JSON.stringify(dropDown));
  
    if (action === "plus") {
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) + 1;
    } else {
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropDown(newDropdown);
  
    console.log(action, slug);
    setloadingAction(true);
  
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
  
    let r = await response.json();
    console.log(r);
    setloadingAction(false);
  };
  

  const addProduct = async (e) => {
    e.preventDefault(0);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        console.log("Product Added Successfully");
        setAlert("Your Product has been Added!");

        setTimeout(() => {
          setAlert("");
        }, 1000);

        const updatedResponse = await fetch("/api/products");
        const updatedData = await updatedResponse.json();
        setProducts(updatedData.products);

        setProductForm({});
      } else {
        console.error("Error Adding Product");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropDownEdit = async (e) => {
    setQuery(e.target.value);
    if (!loading) {
      setloading(true);
      setDropDown([]);
      try {
        const response = await fetch("/api/search?query=" + query);
        let rjson = await response.json();
        setDropDown(rjson.products);
        setloading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setloading(false);
      }
    }
  };

  return (
    <>
      <Header />

      <div className="container mx-auto p-4 border-2 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Search for a Product</h2>

        <div className="flex space-x-4 mb-4">
          <div className="relative w-3/4">
            <input
              onChange={onDropDownEdit}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Product Name"
            />
            {loading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 018 4.828V0C3.732 0 0 3.732 0 8h4zm13.742-3.24a8.015 8.015 0 011.432 4.465h4c0-4.428-3.343-8-7.568-8v3.535a7.963 7.963 0 012.136 6.8z"
                  ></path>
                </svg>
              </div>
            )}
          </div>

          <select
            className="block appearance-none w-1/4 bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            id="category"
          >
            <option value="">Select Category</option>
            {/* Add options for categories */}
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="dropContainer w-full border border-1 p-4 border-2 rounded-lg">
          {dropDown.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col bg-gray-200 my-3 p-2 rounded"
            >
              <span className="text-gray-800 font-bold mb-2">{item.slug}</span>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold mx-3">Quantity:</span>
                  <button onClick={() => {buttonAction("minus", item.slug, item.quantity )}} disabled={loadingAction} className="add inline-block cursor-pointer px-3 py-1 bg-gray-700 mx-3 text-white font-semibold rounded-lg shadow-md disabled:bg-gray-700 hover:bg-gray-900"> - </button>
                  <span className="text-gray-600 text-center ml-1 mx-3">{item.quantity}</span>
                  <button onClick={() => {buttonAction("plus", item.slug, item.quantity )}} disabled={loadingAction} className="add inline-block cursor-pointer px-3 py-1 bg-gray-700 mx-3 text-white font-semibold rounded-lg shadow-md disabled:bg-gray-700 hover:bg-gray-900"> + </button>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold mx-3">Price:</span>
                  <span className="text-gray-600 text-center ml-1">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-6 mx-auto p-4 border-2 rounded-lg">
        <div className="text-center">
          {alert && (
            <div className="text-green-800 border-2 rounded-lg border-green-800 my-2 bg-green-100 p-2 inline-block">
              {alert}
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-4">Add a Product</h1>
        <form className="max-w-sm">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productName"
            >
              Product Slug:
            </label>
            <input
              name="slug"
              value={productForm?.slug || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              type="text"
              placeholder="Enter Product Slug"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity:
            </label>
            <input
              name="quantity"
              value={productForm?.quantity || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="number"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price:
            </label>
            <input
              name="price"
              value={productForm?.price || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Enter Price"
            />
          </div>
          <button
            onClick={addProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="container my-6 mx-auto p-4 border-2 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Current Stock</h1>

        <table className="min-w-full bg-white border border-gray-300 mb-10">
          <thead>
            <tr>
              <th className="border border-gray-300 px-6 py-2 w-3/5">
                Product Name
              </th>
              <th className="border border-gray-300 px-2 py-2 w-1/5">
                Quantity
              </th>
              <th className="border border-gray-300 px-2 py-2 w-1/5">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.slug}>
                  <td className="border border-gray-300 px-6 py-2">
                    {product.slug}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {product.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
