import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { logout } from "../modules/authManager";

const Header = ({ isLoggedIn, userProfile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={RRNavLink} to="/">LessonLink</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/">Home</NavLink>
                            </NavItem>
                        }
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} tag={RRNavLink} to="/teachers">Teachers</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} tag={RRNavLink} to={`/students/${userProfile?.id}`} >Students</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} tag={RRNavLink} to={`/lessons/${userProfile?.id}`} >Lessons</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout} tag={RRNavLink} to="/login">Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;