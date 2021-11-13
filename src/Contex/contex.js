import React,{createContext,useReducer} from "react";
// import { auth } from "../Config/firebase";
import {reducer,authuser,allrest} from "./reducer"
export let Globalcontex=createContext('inital value');
function Contextprovider({children}){
const[state,dispatch]=useReducer(reducer,authuser)
    return(
        <Globalcontex.Provider value={{state,dispatch}}>
        {children}
        </Globalcontex.Provider>


    )
}
export default Contextprovider;


