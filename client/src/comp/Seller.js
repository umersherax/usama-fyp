import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
const api = axios.create({
  baseURL: `http://localhost:8080`,
});

export default function Seller(props) {
  let history = useHistory();
  const ShopName = useSelector((state) => state.posts.logged);
  const id = useSelector((state) => state.posts.id);
  const [arr, setArr] = React.useState([]);
  const [len, setLen] = React.useState("");
  const [values, setValues] = React.useState({
    x: true,
    x1: false,
    PP: "",
    PQ: "",
    img: "",
    PD: "",
    PT: "",
    PN: "",
    Pid: "",
    text: "Add products",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    api.get(`api/shop/findowner/${id}`).then((res) => {
      setLen(res.data.length);
      setArr(res.data);
    });
  }, [id]);

  const imx = (event) => {
    setValues({
      ...values,
      img: event.target.files[0],
    });
  };

  function show(e) {
    if (e === 1) {
      const data = {
        PN: values.PN,
        PT: values.PT,
        PQ: values.PQ,
        PP: values.PP,
        desc: values.PD,
        Pid: values.Pid,
      };
      console.log(data);
      api.post("/api/shop/edit_data", data);
      alert("Product has been updated");
      history.push("/");
    } else {
      const formData = new FormData();
      formData.append("file", values.img);
      formData.append("PN", values.PN);
      formData.append("PP", values.PP);
      formData.append("PQ", values.PQ);
      formData.append("PD", values.PD);
      formData.append("PT", values.PT);
      formData.append("PO", id);

      api
        .post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data._id);
          props.history.push("/");
        });
    }
  }

  function shift() {
    setValues({
      ...values,
      x: true,
      x1: false,
    });
  }
  function unshift() {
    setValues({
      ...values,
      x1: true,
      x: false,
    });
  }

  function drop(e) {
    setValues({
      ...values,
      PT: e,
    });
  }
  function edit(e) {
    api.get(`/api/shop/editprods/${e}`).then((res) => {
      console.log(res.data);
      setValues({
        ...values,
        PN: res.data[0].ProductName,
        PP: res.data[0].ProductPrice,
        PT: res.data[0].ProductType,
        PQ: res.data[0].ProductQuantity,
        PD: res.data[0].Desc,
        Pid: res.data[0]._id,
        x1: false,
        x: true,
        text: "Edit products",
      });
    });
  }
  const del = (e) => {
    api.delete(`/api/shop/del/${e}`).then((res) => {
      //setArr(res.data);
      console.log(res.data);
      window.location.reload();
      setValues({
        ...values,
        x1: true,
        x: false,
      });
    });
  };
  return (
    <div>
      {!id && history.push("/")}
      <div>
        <div className="container">
          <h4 className="mt-5">
            <i>Shop Name: {ShopName}</i>
          </h4>
          <hr />

          <ul className="nav nav-tabs mt-5">
            <li className="nav-item" onClick={shift}>
              {values.x ? (
                <Link className="nav-link active" to="#">
                  {values.text}
                </Link>
              ) : (
                <Link className="nav-link" to="#">
                  {values.text}
                </Link>
              )}
            </li>
            <li className="nav-item" onClick={unshift}>
              {values.x1 ? (
                <Link className="nav-link active" to="#">
                  Manage products
                </Link>
              ) : (
                <Link className="nav-link" to="#">
                  Manage products
                </Link>
              )}
            </li>
          </ul>

          {values.x ? (
            <>
              <div className="form-row mt-5">
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">Product Type</label>
                  <select
                    id="inputState"
                    className="form-control"
                    value={values.PT}
                    onChange={(e) => drop(e.target.value)}
                  >
                    <option selected>Choose</option>
                    <option>Laptop</option>
                    <option>Phones</option>
                    <option>Tabs</option>
                    <option>Mouse</option>
                    <option>Gaming</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label for="inputCity">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    value={values.PN}
                    onChange={handleChange("PN")}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label for="inputCity">Product Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    value={values.PP}
                    onChange={handleChange("PP")}
                  />
                </div>

                <div className="form-group col-md-2">
                  <label for="inputZip">Product Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Quantity"
                    value={values.PQ}
                    onChange={handleChange("PQ")}
                  />
                </div>
              </div>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">
                  Product Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  style={{ width: "50%" }}
                  value={values.PD}
                  onChange={handleChange("PD")}
                />
              </div>
              {values.text === "Add products" ? (
                <>
                  <div className="form-group">
                    <label for="exampleFormControlFile1">
                      Upload any image
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={imx}
                      name="img"
                    />
                  </div>

                  <button
                    className="btn btn-danger mt-2 mb-5 btn-lg float-right"
                    onClick={() => show(0)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-danger mt-2 mb-5 btn-lg float-right"
                  onClick={() => show(1)}
                >
                  Edit
                </button>
              )}
            </>
          ) : len > 0 ? (
            <table className="table table-hover mt-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Products</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Description</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {arr.map((a, i) => (
                  <tr key={a._id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        className="img-fluid"
                        src={process.env.PUBLIC_URL + `/${a.Image}`}
                        alt="Product Info"
                        style={{
                          width: "30%",
                        }}
                      />
                      <br />
                      <hr />
                      <h3
                        className="btn btn-link"
                        onClick={() => history.push(`/Show/${a._id}/1`)}
                      >
                        {a.ProductName}
                      </h3>
                    </td>
                    <td>{a.ProductPrice}</td>
                    <td>{a.ProductQuantity}</td>
                    <td>{a.Desc}</td>
                    <td
                      style={{ color: "gray", cursor: "pointer" }}
                      onClick={() => edit(a._id)}
                    >
                      <EditIcon />
                    </td>
                    <td>
                      <DeleteIcon
                        style={{ color: "gray", cursor: "pointer" }}
                        className="ml-0"
                        onClick={() => {
                          del(a._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h4 className="mt-5 btn  btn-outline-danger  btn-lg text-dark">
              No products yet :(
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}
