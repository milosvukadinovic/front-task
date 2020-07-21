import React, { useEffect, useState } from 'react';
import '../style/style.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Boards = (props) => {
  const [name, setName] = useState('asd');
  //const { title } = props

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`)
}

  return <Modal.Dialog className="mt-5">
      <ListGroup>
  <ListGroup.Item>First board</ListGroup.Item>
</ListGroup>
</Modal.Dialog>
}

Boards.propTypes = {
  //title: string.isRequired
}

export default Boards
