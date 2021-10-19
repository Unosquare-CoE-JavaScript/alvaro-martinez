import { Col, Form } from 'react-bootstrap';

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = (event) =>
    updateItemCount(name, event.target.checked ? 1 : 0);
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: '75%' }}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Label>{name}</Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Check defaultChecked={false} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
}
