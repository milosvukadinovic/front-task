import React from 'react';
import '../style/style.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import UserStore from '../stores/UserStore';

const NavBar = props => {
  //const { title } = props
  return <Navbar bg="light" expand="lg" className="md-5">
  <Navbar.Brand className="ml-5 noselect">Tic-Tac-Toe Multiplayer</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
<span className="mr-5 noselect">Welcome {UserStore.username}</span>
    </Nav>
    
      <Button variant="btn btn-light">Log out</Button>
    
  </Navbar.Collapse>
</Navbar>
}

NavBar.propTypes = {
  //title: string.isRequired
}

export default NavBar
