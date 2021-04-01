import React, { Component } from "react";
import Cards from "./Cards";
import SearchIcon from "@material-ui/icons/Search";
import "./style.css";
export default class Home extends Component {
  state = {
    name: "",
  };
  change = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div style={{ backgroundColor: "black", height: 500 }}>
          <img
            className="img-fluid "
            src={process.env.PUBLIC_URL + "appl2.png"}
            alt="Product Info"
            style={{
              width: "100%",
            }}
          />
          <div className="container mt-5">
            <div class="input-group">
              <input
                type="text"
                list="types"
                class="form-control"
                placeholder="Search Phones, Laptops etc..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                style={{ borderColor: "black" }}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-danger"
                  type="button"
                  style={{ height: 38 }}
                >
                  <SearchIcon />
                </button>
              </div>
            </div>

            <datalist id="types" className="tyx">
              <option
                style={{ width: 200 }}
                className="tyx"
                value="Iphone 12 pro max"
              />
              <option style={{ width: 200 }} value="GTX 1050 Ti " />
              <option style={{ width: 200 }} value="Mac book pro" />
              <option style={{ width: 200 }} value="p20 lite huawei" />
            </datalist>
          </div>
        </div>

        <Cards />
      </div>
    );
  }
}
