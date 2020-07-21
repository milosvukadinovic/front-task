import React from 'react';
import '../style/style.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import UserStore from '../stores/UserStore';

const NavBar = props => {
  //const { title } = props
  console.log('testing navbar')
  console.log(UserStore.username)
  return <Navbar  expand="lg" bg="dark" variant="dark" className="md-5 p-3">
  <Navbar.Brand className="ml-5 noselect">Tic-Tac-Toe Multiplayer</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
<span className="mr-5 noselect text-light">Welcome {props.username}</span>
    </Nav>
    
      <Button variant="btn btn-light">Log out</Button>
    
  </Navbar.Collapse>
</Navbar>
}

NavBar.propTypes = {
  //title: string.isRequired
}

export default NavBar
