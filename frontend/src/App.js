import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [datalist, setDataList] = useState([]);

  const handleonChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formdata);

    console.warn(data);

    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
    }
  };

  const getFetchData = async () => {
    const data = await axios.get();
    console.warn(data);
    if (data.data.success) {
      setDataList(data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  console.warn(datalist)

  return (
    <section className="crud">
      <div className="container mt-5">
        <div className="text-center">
          <button
            className="btn btn-success rounded-pill"
            onClick={() => setAddSection(true)}
          >
            +
          </button>
        </div>

        {addSection && (
          <div className="addconatiner p-5">
            <form action="" className="p-5" onSubmit={handleSubmit}>
              <i
                className="fa-regular fa-circle-xmark  ms-auto"
                onClick={() => setAddSection(false)}
              ></i>
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleonChange}
              />
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleonChange}
              />
              <label htmlFor="name">Mobile :</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                onChange={handleonChange}
              />
              <button className="btn btn-success mt-3">Submit</button>
            </form>
          </div>
        )}



        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>


    </section>
  );
}

export default App;
