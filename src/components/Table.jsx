import React, { useState } from "react";

const Table = ({ product }) => {
  const [editingId, setEditingId] = useState(null);
  //   const [products, setProducts] = useState([
  //     {
  //       id: 1,
  //       day: "Sunday",
  //       users: 200,
  //       product_name: "iPhone 16 Pro Max",
  //       discount: 10,
  //       discountType: "Flat Discount",
  //       credit: 10,
  //       freeCall: "True",
  //       rewardExpired: "3 Hours",
  //     },
  //     {
  //       id: 2,
  //       day: "Monday",
  //       users: 100,
  //       product_name: "Samsung S23 Ultra",
  //       discount: 20,
  //       discountType: "Upto Discount",
  //       credit: 5,
  //       freeCall: "false",
  //       rewardExpired: "3 Hours",
  //     },
  //     {
  //       id: 3,
  //       day: "Tuesday",
  //       users: 500,
  //       product_name: "iPhone 16 Pro Max",
  //       discount: 5,
  //       discountType: "Flat Discount",
  //       credit: 10,
  //       freeCall: "True",
  //       rewardExpired: "3 Hours",
  //     },
  //     {
  //       id: 4,
  //       day: "Wednesday",
  //       users: 50,
  //       product_name: "iPhone 16 Pro Max",
  //       discount: 10,
  //       discountType: "Flat Discount",
  //       credit: 10,
  //       freeCall: "True",
  //       rewardExpired: "3 Hours",
  //     },
  //     {
  //       id: 5,
  //       day: "Thursday",
  //       users: 150,
  //       product_name: "iPhone 16 Pro Max",
  //       discount: 30,
  //       discountType: "Flat Discount",
  //       credit: 10,
  //       freeCall: "True",
  //       rewardExpired: "3 Hours",
  //     },
  //     {
  //       id: 6,
  //       day: "Friday",
  //       users: 350,
  //       product_name: "iPhone 16 Pro Max",
  //       discount: 8,
  //       discountType: "Flat Discount",
  //       credit: 20,
  //       freeCall: "True",
  //       rewardExpired: "3 Hours",
  //     },
  //     {
  //       id: 7,
  //       day: "Satureday",
  //       users: 60,
  //       product_name: "iPhone 16 Pro Max",
  //       discount: 4,
  //       discountType: "Flat Discount",
  //       credit: 30,
  //       freeCall: "True",
  //       rewardExpired: "3 Hours",
  //     },
  //   ]);
  //   const days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Satureday",
  //   ];

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

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg my-5">
      <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
        <caption className="p-5 text-xl font-bold text-gray-800 bg-gray-200 rounded-t-lg">
          {product.day}
        </caption>
        <thead className="text-xs uppercase bg-gray-300">
          <tr>
            <th className="px-4 py-2">Distributed Users</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Discount (%)</th>
            <th className="px-4 py-2">Discount Type</th>
            <th className="px-4 py-2">Credit</th>
            <th className="px-4 py-2">Free Call</th>
            <th className="px-4 py-2">Reward Expired Time</th>
            <th className="px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr key={product.id} className="hover:bg-gray-100 border-b">
            <td className="px-4 py-3">
              {editingId === product.id ? (
                <input
                  type="number"
                  value={product.users}
                  onChange={(e) => handleInputChange(e, product.id, "users")}
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
                  onChange={(e) => handleInputChange(e, product.id, "discount")}
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
                  onChange={(e) => handleInputChange(e, product.id, "credit")}
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
                  onChange={(e) => handleInputChange(e, product.id, "freeCall")}
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
            <td className="px-4 py-3">
              {editingId === product.id ? (
                <button
                  onClick={handleSaveClick}
                  className="text-blue-600 font-semibold"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(product.id)}
                  className="text-blue-600 font-semibold"
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
