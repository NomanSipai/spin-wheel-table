import React, { useState } from "react";
import Data from "../DATA.json";
import toast from "react-hot-toast";
import {
  AiOutlinePlus,
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

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleInputChange = (e, id, field) => {
    const newValue = e.target.value;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: newValue } : product
      )
    );
  };

  const handleSaveClick = () => {
    setEditingId(null);
  };

  const handleDeleteRow = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product deleted successfully!");
  };

  const [addRowVisible, setAddRowVisible] = useState({});
  const [newProduct, setNewProduct] = useState({
    users: "",
    product_name: "",
    discount: "",
    discountType: "Flat Discount",
    credit: "",
    freeCall: "True",
    rewardExpired: "",
  });

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
      day: day,
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
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg p-5">
      {/* Select for adding new day */}
      <div className="mb-4 flex items-center">
        <select
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
          className="border rounded px-4 py-1 mr-2" // Reduced padding
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
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition" // Reduced padding
        >
          Add Day
        </button>
      </div>

      {days.map((day) => (
        <div key={day} className="my-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">{day}</h2>
            <button
              onClick={() => handleDeleteDay(day)}
              className="text-red-600 hover:text-red-800 transition flex items-center"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
          <table className="min-w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md border border-gray-300">
            <thead className="text-xs uppercase bg-gray-200">
              <tr>
                <th className="px-4 py-2">Distributed Users</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Discount (%)</th>
                <th className="px-4 py-2">Discount Type</th>
                <th className="px-4 py-2">Credit</th>
                <th className="px-4 py-2">Free Call</th>
                <th className="px-4 py-2">Reward Expired Time</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.day === day)
                .map((product) => (
                  <tr key={product.id} className="hover:bg-gray-100 border-b">
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={product.users}
                          onChange={(e) =>
                            handleInputChange(e, product.id, "users")
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        product.users
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={product.product_name}
                          onChange={(e) =>
                            handleInputChange(e, product.id, "product_name")
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        product.product_name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={product.discount}
                          onChange={(e) =>
                            handleInputChange(e, product.id, "discount")
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        product.discount
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <select
                          value={product.discountType}
                          onChange={(e) =>
                            handleInputChange(e, product.id, "discountType")
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="Flat Discount">Flat Discount</option>
                          <option value="Upto Discount">Upto Discount</option>
                        </select>
                      ) : (
                        product.discountType
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={product.credit}
                          onChange={(e) =>
                            handleInputChange(e, product.id, "credit")
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        product.credit
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <select
                          value={product.freeCall}
                          onChange={(e) =>
                            handleInputChange(e, product.id, "freeCall")
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </select>
                      ) : (
                        product.freeCall
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={product.rewardExpired}
                          onChange={(e) =>
                            handleInputChange(e, product.id, "rewardExpired")
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        `${product.rewardExpired} Hour`
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {editingId === product.id ? (
                        <button
                          onClick={handleSaveClick}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition flex items-center"
                        >
                          <AiOutlineSave className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(product.id)}
                          className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition flex items-center"
                        >
                          <AiOutlineEdit className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteRow(product.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition flex items-center"
                      >
                        <AiOutlineDelete className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {addRowVisible[day] && (
            <div className="flex items-center mb-4 mt-2">
              <input
                type="number"
                value={newProduct.users}
                onChange={(e) =>
                  handleNewProductChange("users", e.target.value)
                }
                placeholder="Distributed Users"
                className="border rounded px-2 py-1 mr-2"
              />
              <input
                type="text"
                value={newProduct.product_name}
                onChange={(e) =>
                  handleNewProductChange("product_name", e.target.value)
                }
                placeholder="Product Name"
                className="border rounded px-2 py-1 mr-2"
              />
              <input
                type="number"
                value={newProduct.discount}
                onChange={(e) =>
                  handleNewProductChange("discount", e.target.value)
                }
                placeholder="Discount (%)"
                className="border rounded px-2 py-1 mr-2"
              />
              <select
                value={newProduct.discountType}
                onChange={(e) =>
                  handleNewProductChange("discountType", e.target.value)
                }
                className="border rounded px-2 py-1 mr-2"
              >
                <option value="Flat Discount">Flat Discount</option>
                <option value="Upto Discount">Upto Discount</option>
              </select>
              <input
                type="number"
                value={newProduct.credit}
                onChange={(e) =>
                  handleNewProductChange("credit", e.target.value)
                }
                placeholder="Credit"
                className="border rounded px-2 py-1 mr-2"
              />
              <select
                value={newProduct.freeCall}
                onChange={(e) =>
                  handleNewProductChange("freeCall", e.target.value)
                }
                className="border rounded px-2 py-1 mr-2"
              >
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
              <input
                type="text"
                value={newProduct.rewardExpired}
                onChange={(e) =>
                  handleNewProductChange("rewardExpired", e.target.value)
                }
                placeholder="Reward Expired Time"
                className="border rounded px-2 py-1 mr-2"
              />
              <button
                onClick={() => handleSubmitNewProduct(day)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition flex items-center"
              >
                Add Row
              </button>
            </div>
          )}
          <button
            onClick={() =>
              setAddRowVisible((prev) => ({ ...prev, [day]: !prev[day] }))
            }
            className="bg-green-600  ms-auto text-white px-3 py-1 rounded hover:bg-green-700 transition mt-2 flex items-center"
          >
            {addRowVisible[day] ? <>Hide Add Row</> : <>Add Row</>}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Table;
