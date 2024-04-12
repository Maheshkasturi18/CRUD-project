import { React, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Form } from "./Component/Form";

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [dataList, setDataList] = useState([]);

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
    const data = await axios.post("/create", formData);

    // console.warn(data);

    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    // console.warn(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditonChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

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
          <Form
            handleSubmit={handleSubmit}
            handleonChange={handleonChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
          />
        )}

        {editSection && (
          <Form
            handleSubmit={handleUpdate}
            handleonChange={handleEditonChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button>
                          <i
                            class="fa-solid fa-pen"
                            onClick={() => handleEdit(el)}
                          ></i>
                        </button>
                        <button>
                          <i
                            class="fa-solid fa-trash "
                            onClick={() => handleDelete(el._id)}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="texxt-center">NO data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default App;
