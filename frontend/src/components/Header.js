import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Home Troc</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Panier
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
              
                  <NavDropdown.Item onClick={logoutHandler}>
                    Deconnexion
                  </NavDropdown.Item>
                </NavDropdown>
              ) : ( <>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> connexion
                  </Nav.Link>
                </LinkContainer>
                 {/* <LinkContainer to='/consulter'>
                 <Nav.Link>
                   <i className='fas fa-eye'></i> Consulter mes produits
                 </Nav.Link>
               </LinkContainer> */}
               </>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Clients</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Produits</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/add'>
                    <NavDropdown.Item>Ajouter Vendeur</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/all'>
                    <NavDropdown.Item> Vendeurs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/categorie'>
                    <NavDropdown.Item>Categorie</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </>
  )

}
export default Header
