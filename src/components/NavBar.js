import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'



export class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <Navbar className="p-0" expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand className="px-4 py-2" as={Link} to="/home">Visualizer</Navbar.Brand>
                    <Navbar.Toggle className="mr-2" aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" style={{backgroundColor: '#343A40'}}>
                        <Nav className="mr-auto">
                        {/* <Nav.Link as={Link} to="/home">Home</Nav.Link> */}
                        <Nav.Link as={Link} to="/playlist">Playlists</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link>
                            <button onClick={()=>this.props.logout()}>
                                logout
                            </button>
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}