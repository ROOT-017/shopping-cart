import React, { useReducer } from "react";
import products from "./productData";
import "./Product.css";
import ProductCard from "../ProductCard/ProductCard";

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const getTotal = (total) => {
  // const total = cart.reduce((totalCost, item) => totalCost + item.price);
  return total.toLocaleString("us", currencyOptions);
};

// function cartReducer(state, action) {
//   switch (action.type) {
//     case "add":
//       console.log();
//       console.log(action.product.price);
//       return [...state, action.product];
//     case "remove":
//       const productIndex = state.findIndex(
//         (item) => item.name === action.product.name
//       );
//       if (productIndex < 0) {
//         console.log(state);
//         return state;
//       }
//       const update = [...state];
//       // update.splice(productIndex, 1);
//       console.log(update.splice(productIndex, 1));
//       return update;
//     default:
//       return state;
//   }
// }
var data = products;
function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === action.name) {
          data[i].qty = data[i].qty + 1;
        }
      }
      console.log(data);
      data.map((item) => item === action.name);
      // console.log(data);
      return [...state, action.name];
    case "remove":
      const update = [...state];
      update.splice(update.indexOf(action.name), 1);
      return update;
    default:
      return state;
  }
}
function totalReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + action.price;
    case "remove":
      return state - action.price;
    default:
      return state;
  }
}
export default function Product() {
  const [cart, setCart] = useReducer(cartReducer, [{}]);
  const [total, setTotal] = useReducer(totalReducer, 0);

  function add(product) {
    const { name, qty, price } = product;
    setCart({ name, qty, type: "add" });
    setTotal({ price, type: "add" });
  }

  function remove(product) {
    const { name, price } = product;
    setCart({ name, type: "remove" });
    setTotal({ name, price, type: "remove" });
  }
  function GenerateList(cart) {
    var list = document.querySelector(".list");
    let items = cart;
    // Quatity(cart)
    try {
      list.innerHTML = null;
      items.map((item) => {
        // if( Quatity(cart).includes(item))
        list.innerHTML += `<li><span class="item">${item}</span>${
          Quatity(cart).length
        }<span></span></li>`;
      });
    } catch {
      return;
    }
  }
  function Quatity(cart) {
    return cart.filter((item) => item === cart[cart.length - 1]);
  }
  //  let arr = ["one", "two", "one", "one"];
  //  let ans = arr.includes()
  // //console.log(ans);
  GenerateList(cart);
  Quatity(cart);
  return (
    <div className="wrapper">
      <div className="product container">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            remove={remove}
            add={add}
            product={product}
            cart={cart}
            GenerateList={GenerateList}
          />
        ))}
      </div>
      <div className="cart info">
        <div>Shopping Cart: {cart.length} total items.</div>
        <ol className="list"></ol>
        <div>Total:{"$" + getTotal(total)} </div>
      </div>
    </div>
  );
}
