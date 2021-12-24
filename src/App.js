// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import './App.css';
// import { Navbar, Container } from 'react-bootstrap';

// function App() {
//   return (
//     <div class="fixed-top">
//     <div className="App">
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">CLick the button on right to get the users!</Navbar.Brand>
//           <button>Get Users</button>
//         </Container>
//       </Navbar>

//     </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import './App.css';
import './style.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'bootstrap/dist/css/bootstrap.css';
import Service from './service';
import { Navbar, Container } from 'react-bootstrap';
import logo from './Images/logo.jpg'

function App() {

  const [user, setuser] = useState("");
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const getusers = () => {
    Service.getusers().then(
      (res) => {
        setSpinnerLoading(true);
      
        setTimeout(() => {
          setuser(res.data);
          setSpinnerLoading(false)
        }, 2000);

      },
      (error) => {
        console.log(error)
      }
    );
  }

  
  useEffect(() => { console.log(user) }, [user])


  return (
    <>
      <nav className="navbar fixed-top">
        <div className="logo"><img src={logo} alt="LOGO"></img></div>
        <div className="push-left">
        <div className="nav">
        </div>
          {
            <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">CLICK THE BUTTON TO GET ALL THE USERS!!</Navbar.Brand>
            <button><li classname="menu-item current-menu-item"><a className="nav_link" onClick={getusers}
              href="/#">Get Users</a></li></button>
            </Container>
          </Navbar>
          }
        </div>
      </nav>
      
      <div className="center" >
        <Loader 
          type="Arrow"
          color="Red"
          height={100}
          width={100}
          timeout={3000} //3 secs
          visible={spinnerLoading}
        />
      </div>

      {user && (
        <section>
          <div className="d-flex-row p-2 justify-center">
            {user.map( (data) => (
              <div className="card d-inline-flex wrap justify-content-center m-3">
                <div className="text">
                  <img src={data.avatar} alt="img"></img>
                  <h3>{data.first_name + " " + data.last_name}</h3>
                  <p>{data.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


    </>
  );
}
export default App;
