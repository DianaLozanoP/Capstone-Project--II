
import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
} from 'mdb-react-ui-kit';

import miniLogo from "./LogoMini.png"

const NavBar = ({ currentUser, logout }) => {
    const [openNavSecond, setOpenNavSecond] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/'><img src={miniLogo} alt="Doculab MiniLogo" className="miniLogo" /></MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNavSecond(!openNavSecond)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar open={openNavSecond}>
                    <MDBNavbarNav>
                        {/* <MDBNavbarLink active aria-current='page' href='#'>
                            Home
                        </MDBNavbarLink> */}
                        <MDBNavbarLink href='/samples'>Samples</MDBNavbarLink>
                        <MDBNavbarLink href='/clients'>Clients</MDBNavbarLink>
                        <MDBNavbarLink href='/labnotes'>Lab notes</MDBNavbarLink>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavBar;