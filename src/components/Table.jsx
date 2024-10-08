import React, { useState } from "react";
import Data from "../DATA.json"; // Ensure your DATA.json is structured correctly
import toast from "react-hot-toast";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineClose,
} from "react-icons/ai";

const Table = () => {
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState(Data);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [newDay, setNewDay] = useState("");
  const [addRowVisible, setAddRowVisible] = useState({});
  const [newProduct, setNewProduct] = useState({
    users: "",
    product_name: "",
    discount: "",
    discountType: "Flat Discount",
    credit: "",
    freeCall: "True",
    rewardExpired: "",
    showInWheel: false,
  });

  const handleEditClick = (id) => setEditingId(id);
  const handleInputChange = (e, id, field) => {
    const newValue =
      field === "showInWheel" ? e.target.checked : e.target.value;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: newValue } : product
      )
    );
  };

  const handleSaveClick = () => setEditingId(null);
  const handleDeleteRow = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product deleted successfully!");
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitNewProduct = (day) => {
    if (!newProduct.users || !newProduct.product_name) {
      toast.error("Please fill in all fields.");
      return;
    }
    const newEntry = {
      ...newProduct,
      id: products.length ? products[products.length - 1].id + 1 : 1,
      day,
    };
    setProducts((prev) => [...prev, newEntry]);
    toast.success("Product added successfully!");
    setNewProduct({
      users: "",
      product_name: "",
      discount: "",
      discountType: "Flat Discount",
      credit: "",
      freeCall: "True",
      rewardExpired: "",
      showInWheel: false,
    });
    setAddRowVisible((prev) => ({ ...prev, [day]: false }));
  };

  const handleAddDay = () => {
    if (!newDay) {
      toast.error("Please select a day.");
      return;
    }
    if (days.includes(newDay)) {
      toast.error("This day is already added.");
      return;
    }
    setDays((prev) => [...prev, newDay]);
    setNewDay("");
    toast.success("Day added successfully!");
  };

  const handleDeleteDay = (day) => {
    setDays((prev) => prev.filter((d) => d !== day));
    setProducts((prev) => prev.filter((product) => product.day !== day));
    toast.success("Day deleted successfully!");
  };

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg p-5 bg-gray-50">
      <div className="mb-4 mt-4 flex items-center space-x-2">
        <select
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
          className="border rounded px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Select a Day</option>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddDay}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition shadow-md"
        >
          Add Day
        </button>
      </div>

      {days.map((day) => (
        <div key={day} className="my-5 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">{day}</h2>
            <button
              onClick={() => handleDeleteDay(day)}
              className="text-red-600 hover:text-red-800 transition flex items-center"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-200 text-gray-600 uppercase">
              <tr>
                {[
                  "Distributed Users",
                  "Product Name",
                  "Discount (%)",
                  "Discount Type",
                  "Credit",
                  "Free Call",
                  "Reward Expired Time",
                  "Actions",
                ].map((header) => (
                  <th key={header} className="px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.day === day)
                .map((product) => (
                  <tr key={product.id} className="hover:bg-gray-100 border-b">
                    {[
                      "users",
                      "product_name",
                      "discount",
                      "discountType",
                      "credit",
                      "freeCall",
                      "rewardExpired",
                    ].map((field, index) => (
                      <td key={field} className="px-4 py-3">
                        {editingId === product.id ? (
                          field === "discountType" || field === "freeCall" ? (
                            <select
                              value={product[field]}
                              onChange={(e) =>
                                handleInputChange(e, product.id, field)
                              }
                              className="border rounded px-2 py-1 w-full"
                            >
                              {field === "discountType" ? (
                                <>
                                  <option value="Flat Discount">
                                    Flat Discount
                                  </option>
                                  <option value="Upto Discount">
                                    Upto Discount
                                  </option>
                                </>
                              ) : (
                                <>
                                  <option value="True">True</option>
                                  <option value="False">False</option>
                                </>
                              )}
                            </select>
                          ) : (
                            <input
                              type={
                                field === "discount" || field === "credit"
                                  ? "number"
                                  : "text"
                              }
                              value={product[field]}
                              onChange={(e) =>
                                handleInputChange(e, product.id, field)
                              }
                              className="border rounded px-2 py-1 w-full"
                            />
                          )
                        ) : (
                          <span>
                            {field === "rewardExpired"
                              ? `${product[field]} Hour`
                              : product[field]}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 flex space-x-2">
                      {editingId === product.id ? (
                        <button
                          onClick={handleSaveClick}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                        >
                          <AiOutlineSave />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(product.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                        >
                          <AiOutlineEdit />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteRow(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              {addRowVisible[day] ? (
                <tr className="hover:bg-gray-100">
                  {[
                    "users",
                    "product_name",
                    "discount",
                    "discountType",
                    "credit",
                    "freeCall",
                    "rewardExpired",
                  ].map((field) => (
                    <td key={field} className="px-4 py-3">
                      {field === "discountType" || field === "freeCall" ? (
                        <select
                          value={newProduct[field]}
                          onChange={(e) =>
                            handleNewProductChange(field, e.target.value)
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          {field === "discountType" ? (
                            <>
                              <option value="Flat Discount">
                                Flat Discount
                              </option>
                              <option value="Upto Discount">
                                Upto Discount
                              </option>
                            </>
                          ) : (
                            <>
                              <option value="True">True</option>
                              <option value="False">False</option>
                            </>
                          )}
                        </select>
                      ) : (
                        <input
                          type={
                            field === "discount" || field === "credit"
                              ? "number"
                              : "text"
                          }
                          value={newProduct[field]}
                          onChange={(e) =>
                            handleNewProductChange(field, e.target.value)
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => handleSubmitNewProduct(day)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    >
                      <AiOutlineSave />
                    </button>
                    <button
                      onClick={() =>
                        setAddRowVisible((prev) => ({ ...prev, [day]: false }))
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-3">
                    <button
                      onClick={() =>
                        setAddRowVisible((prev) => ({ ...prev, [day]: true }))
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Add Row
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Table;
