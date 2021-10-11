import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  // optionType is 'scoop' or toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace 'null with Topping options when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  const optionsItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionsItems}</Row>;
}
