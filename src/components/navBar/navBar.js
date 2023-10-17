import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Buildings } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


function Navigator(props) {
  const { workSpaceState, isLogged, handleLogOut } = props;

  return (
    <Navbar data-bs-theme="dark" className='rounded-3  bg-primary bg-opacity-50  '>
      <Container>
        <Navbar.Brand href="/"> <Buildings size={60} color="white fw-bold " /> Share Space</Navbar.Brand>
        <Nav className=" d-flex justify-content-around">
          {
            !isLogged ? (
              <>
                <Nav.Link className='text-decoration-none mx-3 px-3'> <Link to="/" className='text-decoration-none'> <span className="text-white fw-bold  "> Home</span></Link></Nav.Link>
                <Nav.Link > <Link to="/login" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Login</span></Link></Nav.Link>
                <Nav.Link > <Link to="/register"> <span className="text-white fw-bold   mx-3 px-3"> Register</span></Link></Nav.Link>
              </>
            ) : (
              workSpaceState.userDetails?.role === "owner" ? (
                <>
                  <Nav.Link > <Link to="/" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Home</span></Link></Nav.Link>
                  <Nav.Link > <Link to="/addworkSpace" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Add WorkSpace</span></Link></Nav.Link>
                  <Nav.Link > <Link to="/allworkSpaces" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> All WorkSpaces</span></Link></Nav.Link>
                  <Nav.Link > <Link to="/profile" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Profile</span></Link></Nav.Link>
                </>
              ) : (workSpaceState.userDetails?.role === "admin"? (<>
                <Nav.Link > <Link to="/" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Home</span></Link></Nav.Link>
                {/* <Nav.Link > <Link to="/userWorkSpaces" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  ">  WorkSpaces</span></Link></Nav.Link>
                <Nav.Link > <Link to="/mapViewSpaces" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Spaces in Your city</span></Link></Nav.Link>
                <Nav.Link > <Link to="/cart" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Cart</span></Link></Nav.Link> */}
                <Nav.Link > <Link to="/dashboard" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  ">  DashBoard </span></Link></Nav.Link>
                <Nav.Link > <Link to="/profile" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Profile</span></Link></Nav.Link>
              </>):(workSpaceState.userDetails?.role === 'security'?(<>
                <Nav.Link > <Link to="/" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Home</span></Link></Nav.Link>
                {/* <Nav.Link > <Link to="/userWorkSpaces" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  ">  WorkSpaces</span></Link></Nav.Link>
                <Nav.Link > <Link to="/mapViewSpaces" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Spaces in Your city</span></Link></Nav.Link>
                <Nav.Link > <Link to="/cart" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Cart</span></Link></Nav.Link> */}
                <Nav.Link > <Link to="/verfiyBooking" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Verfiy Booking </span></Link></Nav.Link>
                <Nav.Link > <Link to="/profile" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Profile</span></Link></Nav.Link>
              </>):(<>
                <Nav.Link > <Link to="/" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Home</span></Link></Nav.Link>
                <Nav.Link > <Link to="/userWorkSpaces" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  ">  WorkSpaces</span></Link></Nav.Link>
                <Nav.Link > <Link to="/mapViewSpaces" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Spaces in Your city</span></Link></Nav.Link>
                <Nav.Link > <Link to="/cart" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Cart</span></Link></Nav.Link>
                <Nav.Link > <Link to="/profile" className='text-decoration-none mx-3 px-3'> <span className="text-white fw-bold  "> Profile</span></Link></Nav.Link>
              </>))
                
              )
            )
          }
        </Nav>
        {isLogged && (
          <Nav className="ml-auto">
            <Nav.Link onClick={handleLogOut} className='fw-bold text-white text-end   rounded-5 bg-primary '> LogOut</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigator;
