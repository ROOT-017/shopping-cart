import React from "react";
import "./ProductCard.css";

export default function ProductCard({
  cart,
  product,
  add,
  remove,
  GenerateList,
}) {
  return (
    <div className="product card">
      <div className="product">
        <span role="img" aria-label="ice">
          {product.emoji}
        </span>
      </div>
      <div className="buttons">
        <button
          className="add"
          onClick={() => {
            add(product);
          }}
        >
          Add
        </button>
        <button
          className="drop"
          onClick={() => {
            const elt = cart.find((item) => item === product.name);
            if (elt) {
              //console.log(product.name);
              remove(product);
            } else
              alert(
                `${product.name.toLocaleUpperCase()} not found in your shopping cart`
              );
          }}
        >
          Drop
        </button>
      </div>
    </div>
  );
}
