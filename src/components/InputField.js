
import React, { useEffect, useState } from 'react';
import '../style/style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const InputField = (props) => {
  const [name, setName] = useState('asd');
  //const { title } = props

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`)
}

  return <Modal.Dialog className="mt-5">

  
  
  <Form className="p-5 " >
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter a name</Form.Label>
    <Form.Control type="name" placeholder="Name" onChange={e => setName(e.target.value)}/>
    <Form.Text className="text-muted" >
      This is the name other players will see.
    </Form.Text>
  </Form.Group>

  <Button variant="primary"  onClick={()=>props.passedFunction(name)}>
    Create Player
  </Button>
</Form>
</Modal.Dialog>
}

InputField.propTypes = {
  //title: string.isRequired
}

export default InputField
