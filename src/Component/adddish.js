import React, { useState, useContext } from "react";
import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc } from "../Config/firebase"
import { Globalcontex } from "../Contex/contex"
import "./adddish.css"
function Adddish() {
    const { state } = useContext(Globalcontex)
    const [itemname, setitemname] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [foodimage, setfoogimage] = useState([]);
    const [type, settype] = useState('');

    let Add = async () => {
    try {
        const imageref = ref(storage, "FoodImages/" + foodimage.name);
        const uploadtask = await uploadBytesResumable(imageref, foodimage)
         await getDownloadURL(ref(storage, imageref)).then(async(url)=>{
            var A = url
            var obj = {
                itemname,
                price,
                category,
                foodimage: A,
                type,
                uid: state.authuser.uid
            }
            let dishref = collection(db, 'ADDDISH');
            await addDoc(dishref, obj);
            // console.log(obj)
            alert("Dish Added Sucessfully")
        })
    }
    catch (err) {
        console.log(err.message)

    }
}
return (
    <div style={{ width: "100%", height: "660px", backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80')", backgroundSize: "cover" }}>
        <div className="container">
            <div className="row">
                <div className="col-md-4 login-sec">
                    <h2 className="text-center">ADD DISHES</h2>

                    <div className="form-group">
                        <label for="exampleInputEmail1" className="text-uppercase">Item Name</label>
                        <input type="text" className="form-control" placeholder="Item Name" onChange={(event) => { setitemname(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1" className="text-uppercase">Price</label>
                        <input type="text" className="form-control" placeholder="Price" onChange={(event) => { setprice(event.target.value) }} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1" className="text-uppercase">Select Category</label>
                        <select class="form-control" onChange={(event) => { setcategory(event.target.value) }}>
                            <option onChange={() => { setcategory("") }}></option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="BBQ" >BBQ</option>
                            <option value="Chines" >Chines</option>
                            <option value="Singapori" >Singapori</option>
                            <option value="Italian" >Italian</option>
                            <option value="Desi" >Desi</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Food Image :</label>
                        <input type="file" class="form-control-file" onChange={(event) => { setfoogimage(event.target.files[0]) }} />
                    </div>
                    <div class="form-group">
                        <label>Delivery Type</label>
                        <select class="form-control" onChange={(event) => { settype(event.target.value) }}>
                            <option value="" ></option>
                            <option value="Free">Free</option>
                            <option value="Paid" > Paid</option>
                        </select>
                    </div>
                    <div className="form-check">
                        <button className="btn btn-dark float-right" onClick={Add}>Add Dish</button>
                    </div>
                </div>
                <div className="col-md-8 banner-sec">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img className="d-block img-fluid" src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" alt="First slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    <div className="banner-text">
                                        <h2>SEE FOOD</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block img-fluid" src="https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80" alt="Second slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    <div className="banner-text">
                                        <h2>DESSERT</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block img-fluid" src="https://images.unsplash.com/photo-1560614382-e25d8adcb4b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Third slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    <div className="banner-text">
                                        <h2>BBQ</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

)
}
export default Adddish;