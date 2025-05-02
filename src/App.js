import React from 'react';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Home } from './Home';
import { About } from './about';
import { Users } from './user';
import { InstallPrompt } from './InstallPromptButton';

import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
     <InstallPrompt />
      <Router>
        <Navbar bg="primary" variant="dark">
        
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
