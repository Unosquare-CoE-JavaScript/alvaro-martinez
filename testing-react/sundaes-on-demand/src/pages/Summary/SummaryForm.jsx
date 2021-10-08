import React, { useState } from 'react';
import { Button, Form, FormCheck } from 'react-bootstrap';

export default function SummaryForm() {
  const [disabled, setDisabled] = useState(false);

  const checboxLabel = (
    <span>
      I agree with the{' '}
      <span style={{ color: 'blue' }}>terms and conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId='ters-and-conditions'>
        <FormCheck
          type='checkbox'
          label={checboxLabel}
          id='terms'
          defaultChecked={disabled}
          onChange={(e) => {
            setDisabled(e.target.checked);
          }}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!disabled}>
        confirm order
      </Button>
    </Form>
  );
}
