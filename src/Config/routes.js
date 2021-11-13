import React, { useContext, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "../Component/navbar"
import Signup from "../Component/signup"
import SignInSide from "../Component/signin"
import Dashboard from "../Component/dashboard";
import Adddish from "../Component/adddish";
import AllRest from "../Component/allrest"
import Foodmenu from "../Component/foodmenu";
import { Globalcontex } from "../Contex/contex"
import { onAuthStateChanged, auth, doc, db, getDoc } from "./firebase"
function Routes() {
  const { state, dispatch } = useContext(Globalcontex);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
        // alert("Signup and Reload The Page !!")
      }
      else {
        console.log('user not found');
      }
    })
  }, []);

  const fetchUserInfo = async (uid) => {
    let userRef = doc(db, 'Signup Users', uid);
    let userInfo = await getDoc(userRef);
    userInfo = userInfo.data();
    // console.log(userInfo);
   await  dispatch({ type: "AUTH-USER", payload: userInfo });
  }
  //  console.log(state.authuser)
  return (
    <Router>
      <Navbar />
      <Switch>
        {
          state.authuser ?
            <>
              {
                state.authuser?.userrole === "Restaurant" ?
                  <>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/adddish">
                      <Adddish />
                    </Route>
                  </>
                  :
                  <>
                    <Route path="/allrestaurant">
                      <AllRest />
                    </Route>
                    <Route path="/foodmenu">
                      <Foodmenu />
                    </Route>
                  </>
              }
            </>
            :
            <>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <SignInSide />
              </Route>
            </>
        }

      </Switch>
    </Router>
  )
}
export default Routes;