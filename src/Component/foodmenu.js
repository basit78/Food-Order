import React, { useContext, useState, useEffect } from "react";
import { db, collection, getDocs, where, query ,addDoc} from "../Config/firebase"
import { Globalcontex } from "../Contex/contex";
export default function Foodmenu() {
    const [allmenus, setallmenu] = useState([]);
    const [price, setprice] = useState([]);
    const [item, setitem] = useState([]);
    const [counter, setcounter] = useState(1)
    const [adress, setadress] = useState('');
    const [phone, setphone] = useState('');
    const { state } = useContext(Globalcontex)
    useEffect(async () => {
        let DishRef = collection(db, 'ADDDISH');
        let q = query(DishRef, where("uid", "==", state.restid))
        let allmenu = await getDocs(q);
        let allmenuClone = allmenus.slice(0);
        allmenu.forEach((doc) => {
            allmenuClone.push(doc.data());
        });
        setallmenu(allmenuClone);
    }, [])

    const Foodmenu = (price, itemname) => {
        setprice(price)
        setitem(itemname)
    }
    return (
        <div style={{ backgroundColor: "#EFCE9B", width: "100%", height: "100%", display: "flex" }}>
            <div style={{ width: "100%" }}>
                <h3 style={{ fontFamily: "cursive", color: "white", textAlign: "center" }}>Food Menu</h3>

                <table class="table">
                    <thead>
                        <tr style={{ width: "100%" }}>
                            <th scope="col">SR </th>
                            <th scope="col">Food Image</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Delivery Type</th>
                            <th scope="col">Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allmenus.map(({ foodimage, price, category, itemname, type }, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={foodimage} style={{ height: "50px", width: "50px" }} /></td>
                                    <td>{itemname}</td>
                                    <td>{category}</td>
                                    <td>{price} Rs</td>
                                    <td>{type}</td>
                                    <td><button className="btn" style={{ backgroundColor: "#D9CA3E", color: "white" }} data-toggle="modal" data-target="#myModal" onClick={() => { Foodmenu(price, itemname, type) }}>Add to Cart</button></td>
                                </tr>

                            ))
                        }


                    </tbody>
                </table>
            </div>
            <div style={{ backgroundColor: "#D9CA3E", color: "white", width: "50%" }}>
                <center>
                    <h3 style={{ fontFamily: "cursive" }}>Delicous Meals</h3>
                    <div><img style={{ height: "150px", width: "150px", backgroundColor: "white", borderRadius: "50%", border: "3px solid white", boxShadow: "-10px -10px 70px" }} src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80" /></div>
                    <div><img style={{ height: "150px", width: "150px", backgroundColor: "white", borderRadius: "50%", border: "3px solid white", boxShadow: "-10px -10px 70px" }} src="https://images.unsplash.com/photo-1525755662778-989d0524087e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" /></div>
                    <div><img style={{ height: "150px", width: "150px", backgroundColor: "white", borderRadius: "50%", border: "3px solid white", boxShadow: "-10px -10px 70px" }} src="https://media.istockphoto.com/photos/spicy-hot-grilled-spare-ribs-from-a-summer-bbq-served-with-a-hot-picture-id1300481295?b=1&k=20&m=1300481295&s=170667a&w=0&h=-etJLJX7ynMyNgIb6gR-vRS09I8cXVRMSUDVETj144k=" /></div>
                    <div><img style={{ height: "150px", width: "150px", backgroundColor: "white", borderRadius: "50%", border: "3px solid white", boxShadow: "-10px -10px 70px" }} src="https://images.unsplash.com/photo-1585032226651-759b368d7246?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" /></div>
                    <div><img style={{ height: "150px", width: "150px", backgroundColor: "white", border: "3px solid white" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAG1BMVEUAAAD///8iIiL5+fkmJib39/cfHx/y8vI2NjaY7mNSAAAFOElEQVR4nO2d23KkMAxEwzCT3f//4q1KCsPSctMy43BJ96Mt2TowU74J+BjGXRpApEoQeu+Lbxw+xo9dwhhJlaDi/YKSNo1nI3yUyKCkTSbclAlNaML7ERbvMlq8j7AtECxRqgCDXJZHvYroeRJC/CniTIhUEc1eJjShCU1owqsTkvZ6EtYDkiJS3IULhXOaEWxQgdexhGQWqpSgAi8TmtCEJjTh1QnndSp4k/HwIMKMMYkMdUlCDNGEJjShCU1ownXJE2zL+H5iQpRwFYj3TQiVrRcTmtCEJjThbycUAHvseStSmOscOKeRYs0EeDChkl6hHEuZ0IQmNKEJ70woAAaEqQCjvLY2NTFjHEFkQNimYwjfddKkyISbMmFYYsK4pE0m3JQJwxLCU5ze92TX8IMSCDt02q/poDMTdum0X9NBZybs0mm/poPOTNil035NB539GsJSgCvgDp2m5jQQa0evSTi5SZVcgLBtEjv/7E34jlhNyGXCjRITviVWE3IpD7GxI/GAcAC1BY3tTCJTGVKlTPHOQkhibasyoQlNaEIT3pCQmChDJSEM3Fmmwk7mujFpRhESMuNDCHeeK5EfsAlNaEITmvA+hDvfp6eEQwmVoJW2hdAIYbHBaUrKOJrTnIMwlX+i7USZ0IQmNKEJr0mo2Cq57Wi86EM5t0hFpJSAlGG9ba6nZV/2J2z7KSoyYS1WxcaEJoRYTRjqLIRogs97K1GgIsKhfKFl0vPxrSexwf4nr4Xx43/Nt6V8Febv57qrP+uqUjJ/Swbv6mTzoucW5Mood0yowh2Xz7rNZ92L/KRPR5ibc5rQhCY0oQmjKQAZ6JUD8KDlxRp/PS7j+L74XNt6NF9kjtd7e60H6MdaZKCfq4gX2IjvGMKLplTVbZSJJQ70bboAYdvpzdyOCeMQTbjhbsKvyEwo6hhC5X1tpL2UIsJXdXyfF+c40IN7NN2pDut4o0pXZEUvVL1o5l7qrir3GS/wVKMc0QxgLFWZ0IQmNKEJr05IeiBd5R4Mo5l7ZDO/DP2K15qjvlFPhv5gRS9UibmJ5Jo3eZGN+p2zUNTBhMqh2k6ZcCtWE8ZeJnynTLgVa5sX+aS6svxPafyY1uRktV70gqrFZv56+R+ED12VtXn9+B6VXeMjWJvqd0zpghzfo5Lz0gwF0z5CdjxWNzbhdxgZCiYTcpkwNjbhdxgZCqZ9hAC4l3DR9Igr5YQYTyl5rp0wMhyyi03ZB0glZURr/DYphKDU/SH7AFLayfkJlRITmtCEJvyFhKkvx6IXIcS+lrsY1UV1sMxGHlz1Bwf6axNlNB+hYUIYzBykkxkUEjYZp0bzoc3mWMLUf4x4MRsTpoNOGZtwK3rFxoTpoFPG9yfEGuU99KlX04W5iW0rerR5rHfqIQ6yq1/fV5htYB8gspGyLwOeTEmdsKgtIR/3AQKbkxC2HapJ6TgmrISYKsEqE4oy4ZeNCSshpkqwCpQCU7oq6kko5PyXqUTmEftg654k/vUkzNwpaU+prcqEJjShCU14G0LFtq3qZwnhefwiPOLHkwTyBh6S8/+zhJPYNLLuRd7Aw04HLkSYSqMxoQlNaMLbE5KEfOJVbDANAKsoIazNi4LX7GDJ/Ko9DGS95V5ftpN9gCDPgZ31v+1kRrkdYKJsJaGxIhOa0IQmNOF9CIm30h5RdI6/zqhnIs/aK4SpF+eCcS7ADtmXAiHJwy/CqWbjWf+xhG2T6ZRMuCkTmnBdYsK0jiHE5/GVZXtbgGMqRT9QiYhUgQ061W1ZD1KA/wDAcXaF5loNIgAAAABJRU5ErkJggg==" /></div>
                </center>
            </div>
            {/* Modal */}
            <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    {/* Modal content */}
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" style={{ color: "#D9CA3E" }}> Bucket</h4>
                        </div>
                        <div class="modal-body">



                            <div class="form-group">
                                <label>Adress</label>
                                <input type="text" class="form-control" placeholder="West Main Street 96" onChange={(ev) => {setadress(ev.target.value) }} />
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="type" class="form-control" placeholder="12345678901" onChange={(ev) => {setphone(ev.target.value) }} />
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Dish Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <button class="page-link" onClick={() => { setcounter(counter - 1) }}><i class="fas fa-minus"></i></button>
                                                </li>
                                                <li class="page-item">
                                                    <p class="page-link">{counter}</p>
                                                </li>
                                                <li class="page-item">
                                                    <button class="page-link" onClick={() => { setcounter(counter + 1) }}><i class="fas fa-plus"></i></button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </th>
                                    <td>{item}</td>
                                    <td>{price}</td>
                                    <td>{price * counter}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginLeft: "1%" }}> Delivery Charges 100Rs</p>
                            <p style={{ marginLeft: "42%" }}>Total : <b>{price * counter + 100}Rs</b></p>

                        </div>
                        <div class="modal-footer">
                            <button class="btn" style={{ backgroundColor: "#D9CA3E", color: "white" }} onClick={async() => {                        
                                var obj={
                                    adress,
                                    phone,
                                    item,
                                    price,
                                    Qty:counter,
                                    Total:counter*price,
                                    name:state.authuser.username,
                                    email:state.authuser.email,
                                    uid:state.restid
                                }   
                                let dishref = collection(db, 'Custumer Order');
                                await addDoc(dishref, obj);                                                              
                                 alert("Order Has Been Placed Sucessfully")




                            }}>Order</button>
                            <button type="button" class="btn" data-dismiss="modal" style={{ backgroundColor: "#D9CA3E", color: "white" }}>Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}