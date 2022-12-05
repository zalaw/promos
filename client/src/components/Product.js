import React, { useState } from "react";
import { format } from "date-fns";

const Product = ({ data }) => {
  const [placeholder, setPlaceholder] = useState(null);

  const onErrorImage = () => {
    setPlaceholder("https://media.tenor.com/DCxUl7NnQ9QAAAAi/blush-wtf-amigo.gif");
  };

  return (
    <div className="product-container">
      <div className="babajee">
        <img src={placeholder || data.img} alt={data.name} onError={onErrorImage} />

        <div className="name-container">
          <p className="name">{data.name || ""}</p>
          <p className="extra">{data.extra || ""}</p>
        </div>

        {data.hasCard && <p>Aici cu card</p>}

        <div className="date-container">
          <p>{/* {format(new Date(data.from), "dd.MM")} - {format(new Date(data.to), "dd.MM")} */}</p>
        </div>
      </div>
      <div className="price-container">
        {data.newPrice && data.newPrice !== 0 && <span className="new-price">{data.newPrice} LEI</span>}
        {data.oldPrice && data.oldPrice !== 0 && <span className="old-price">{data.oldPrice} LEI</span>}
      </div>
    </div>
  );
};

export default Product;
