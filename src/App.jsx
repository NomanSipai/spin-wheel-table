import Table from "./components/Table";

function App() {
  const table = [
    {
      id: 1,
      day: "Sunday",
      users: 200,
      product_name: "iPhone 16 Pro Max",
      discount: 10,
      discountType: "Flat Discount",
      credit: 10,
      freeCall: "True",
      rewardExpired: "3",
    },
    {
      id: 2,
      day: "Monday",
      users: 100,
      product_name: "Samsung S23 Ultra",
      discount: 20,
      discountType: "Upto Discount",
      credit: 5,
      freeCall: "false",
      rewardExpired: "3",
    },
    {
      id: 3,
      day: "Tuesday",
      users: 500,
      product_name: "iPhone 16 Pro Max",
      discount: 5,
      discountType: "Flat Discount",
      credit: 10,
      freeCall: "True",
      rewardExpired: "3",
    },
    {
      id: 4,
      day: "Wednesday",
      users: 50,
      product_name: "iPhone 16 Pro Max",
      discount: 10,
      discountType: "Flat Discount",
      credit: 10,
      freeCall: "True",
      rewardExpired: "3",
    },
    {
      id: 5,
      day: "Thursday",
      users: 150,
      product_name: "iPhone 16 Pro Max",
      discount: 30,
      discountType: "Flat Discount",
      credit: 10,
      freeCall: "True",
      rewardExpired: "3",
    },
    {
      id: 6,
      day: "Friday",
      users: 350,
      product_name: "iPhone 16 Pro Max",
      discount: 8,
      discountType: "Flat Discount",
      credit: 20,
      freeCall: "True",
      rewardExpired: "3",
    },
    {
      id: 7,
      day: "Satureday",
      users: 60,
      product_name: "iPhone 16 Pro Max",
      discount: 4,
      discountType: "Flat Discount",
      credit: 30,
      freeCall: "True",
      rewardExpired: "3",
    },
  ];

  return (
    <div className="container px-4 mx-auto">
      {table.map((product) => (
        <Table key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;
