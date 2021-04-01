import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./comp/Home";
import Navbar from "./comp/Navbar";
import Show from "./comp/Show";
import Login from "./comp/Login";
import Buyer from "./comp/Buyer";
import Seller from "./comp/Seller";
import Cart from "./comp/Cart";
import Category from "./comp/Category";
import { store, persistor } from "./Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <PersistGate persistor={persistor}>
              <Navbar />

              <Route path="/" exact component={Home} />
              <Route path="/show/:id/:type" component={Show} />
              <Route path="/login/:id" component={Login} />
              <Route path="/buyer_dashboard" component={Buyer} />
              <Route path="/seller_dashboard" component={Seller} />
              <Route path="/category/:id" component={Category} />
              <Route path="/cart" component={Cart} />
            </PersistGate>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
