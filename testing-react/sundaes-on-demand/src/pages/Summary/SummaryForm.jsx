import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

export default function SummaryForm() {
  const [disabled, setDisabled] = useState(false);

  const popover = (
    <Popover id='popover-basic'>
      No ice cream will actually be delivered
    </Popover>
  );

  const checboxLabel = (
    <span>
      I agree with the{' '}
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}>terms and conditions</span>
      </OverlayTrigger>
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
