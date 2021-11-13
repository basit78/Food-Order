import React, { useEffect, useState, useContext } from "react";
import { Globalcontex } from "../Contex/contex"
import { collection, db, getDocs, query, where } from "../Config/firebase"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
function AllRest() {
    const [allrest, setallrest] = useState([]);
    const { dispatch } = useContext(Globalcontex);
    useEffect(async () => {
        let RestRef = collection(db, 'Signup Users');
        let q = query(RestRef, where("userrole", "==", "Restaurant"))
        let allrests = await getDocs(q);
        let allrestClone = allrest.slice(0);
        allrests.forEach((doc) => {
            allrestClone.push(doc.data());
        });
        setallrest(allrestClone);

    }, [])
    let history = useHistory();
    const getRestid = async (uid) => {
        // console.log(uid)
        dispatch({ type: "FOOD_MENU", payload: uid})
        history.push("/foodmenu")
    }
    return (
        <div style={{ backgroundColor: "black" }}>
            {
                allrest.map(({ username, email, uid, password, userrole, profileimage }, index) => {
                    return (
                        <center>
                            <div key={index}>

                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                R
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={username}
                                        subheader={email}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={profileimage}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            This impressive paella is a perfect party dish and a fun meal to cook
                                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                                            if you like.
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                        <Button variant="outlined" onClick={() => { getRestid(uid) }}>Food Menu</Button>
                                    </CardActions>
                                </Card>
                                <br />
                                <br />
                            </div>
                        </center>


                    )
                })
            }
        </div>
    )
}
export default AllRest;







