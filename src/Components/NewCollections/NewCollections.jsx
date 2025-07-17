import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';

export const NewCollections = () => {
  const [new_collections, setNew_collection] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/newcollections`)
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
      .catch((err) => console.error("Failed to fetch new collections:", err));
  }, [BASE_URL]);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => (
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
