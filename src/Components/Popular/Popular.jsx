import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Items/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((err) => console.error("Failed to fetch popular products:", err));
  }, [BASE_URL]);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
