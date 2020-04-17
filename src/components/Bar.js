import React, {Component} from 'react';
import logo from '../logo.png';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
import {Navbar,Nav} from 'react-bootstrap';


class Bar extends Component {
    render(){
        return(
<Navbar className="nav-bg" expand="lg" variant="dark">
  <Navbar.Brand>
    <Link to='/'><img src={logo} alt="downNine" className="logo"/></Link>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link>
        <Link to='/' className="nav-element">Home</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/Menu' className="nav-element">Menu</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/About' className="nav-element">About</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/Contact' className="nav-element">Contact</Link>
      </Nav.Link>
      <Nav.Link>
      <ButtonContainer>
        <Link to="/Cart"  className="nav-btn">Check Please!</Link>
      </ButtonContainer>
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        )}
}

export default Bar;


