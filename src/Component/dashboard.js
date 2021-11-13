import React, { useState, useEffect, useContext } from "react";
import { db, collection, query, where, getDocs } from "../Config/firebase"
import { Globalcontex } from "../Contex/contex"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
function Dashboard() {
    const { state } = useContext(Globalcontex)
    const [allOrders, setallOrders] = useState([]);
    useEffect(async () => {
        let OrdRef = collection(db, 'Custumer Order');
        let q = query(OrdRef, where("uid", "==", state.authuser.uid))
        let allords = await getDocs(q);
        let allorderclone = allOrders.slice(0);
        allords.forEach((doc) => {
            allorderclone.push(doc.data());
            console.log()
        });
        setallOrders(allorderclone);
        // console.log(state.authuser.uid)
    }, [])
    return (
        <>
            <h1 style={{ fontFamily: "arial", textAlign: "center" }}>Hello Dashboard</h1>
            <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                {
                    allOrders.map(({ Qty, Total, adress, email, item, name, phone, price, }) => {
                        return (
                            <>
                                <div class="card" style={{ width: "100%", backgroundColor: "#D9CA3E" }}>
                                    <div class="card-body" style={{ display: "flex" }}>
                                        <div style={{ width: "50%" }}>
                                            <h5 style={{ color: "white" }}>Custumer Information</h5>
                                            <p class="card-title"><b>Name :</b>{name}</p>
                                            <p class="card-title"><b>Email :</b>{email}</p>
                                            <p class="card-title"><b>Phone :</b>{phone}</p>
                                            <p class="card-title"><b>Adress :</b>{adress}</p>

                                        </div>
                                        <div style={{ width: "50%" }}>
                                            <h5 style={{ color: "white" }}>Dish Information</h5>
                                            <p class="card-title"><b> Dish Name :</b>{item}</p>
                                            <p class="card-title"><b>Quantity :</b>{Qty}</p>
                                            <p class="card-title"><b>Price :</b>{price}</p>
                                            <p class="card-title"><b>Total :</b>{Total} Rs</p>
                                        </div>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                                <br />
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Dashboard;

