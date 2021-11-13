import React, { useContext } from "react";
import { Link,useHistory } from "react-router-dom"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import "../App.css"
import { Globalcontex } from "../Contex/contex"
function Navbar() {
  const history=useHistory();
  const { state } = useContext(Globalcontex)

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img src="https://www.seekpng.com/png/full/135-1355426_menu-icon-original-delivery-truck-white-icon.png" width="50px" alt="ALT" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {
              state.authuser ?
                <>
                  {
                    state.authuser?.userrole === "Restaurant" ?
                      <>
                        <li className="nav-item">
                          <Link className="nav-link active" to="/dashboard">Dashboard <i className="fas fa-home"></i></Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link active" to="/adddish">Add Dishes <i className="fas fa-pizza-slice"></i></Link>
                        </li>
                      </>
                      :
                      <li className="nav-item">
                        <Link className="nav-link active" to="/allrestaurant">All Restaurant <i class="fas fa-list-alt"></i></Link>
                      </li>
                  }

                </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/signup"> Signup <i className="fas fa-user-plus"></i></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/signin">Signin <i className="fas fa-sign-in-alt"></i></Link>
                  </li>

                </>
            }
          </ul>
          <div style={{ height: "50px", backgroundColor: "transparent", width: "200px", position: "absolute", right: "0", display: "flex" }}>
            {
              state.authuser ?
                <>
                  <div><img  style={{height: "50px", width: "50px", borderRadius: "25px" }}src={state.authuser.profileimage}/></div>
                  <p className="mt-2 ml-2" style={{ color: "white" ,marginRight:"10px"}}>{state.authuser.username}</p>
                </>
                :
                null
            }
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;