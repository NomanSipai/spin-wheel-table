import Table from "./components/Table";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container px-4 mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <Table />
    </div>
  );
}

export default App;
