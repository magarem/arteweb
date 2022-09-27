import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { app, database, storage } from '../firebaseConfig';

import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie'
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
// const Lista2 = async () => {
//   const docRef = doc(database, "receitas", "Dm7mljYDcHCpbLDHZVOF");
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }


const List: NextPage = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (obj) => {
    console.log(obj);
    setCurrentState2(obj)
    setOpen(true)
  }
  const handleClose = () => setOpen(false);

  const [currentState, setCurrentState] = useState([]);
  const [currentState2, setCurrentState2] = useState({});
  const [singleReg, setSingleReg] = useState({})
 
  
  const getSingleReg = async (id) => {
    if (true) {
        const singleReg = doc(database, 'receitas', id)
        const data = await getDoc(singleReg)
        setSingleReg({ ...data.data(), id: data.id })
    }
  }

  const [user, setUser] = useState({});

  

  const getList = async (x) => {
    // onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });
    // const user = Cookies.get('user_uid')
    // console.log(user);
    
    if (props.user.uid){
      // console.log(user);
      
      const q = query(collection(database, "receitas"), where("user", "==", props.user.uid));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
      setCurrentState(data)
    }

    // const places = query(collection(database, 'receitas'))
    // const querySnapshot = await getDocs(places)
  
    // console.log(`Fetched ${querySnapshot.size} documents`);

    // const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    // console.log(data)
    // // const data = [{id:1, nome: "maga"}, {id:2, nome: "ninja"}]
    // setCurrentState(data)
  }

  useEffect(() => {
    getList()
  }, [])
  // getList()
  // useEffect(() => {
  //   console.log(props.user)
  // }, [props.user])


  const styles = {
    card: {
      // Provide some spacing between cards
      margin: 16,
  
      // Use flex layout with column direction for components in the card
      // (CardContent and CardActions)
      display: "flex",
      flexDirection: "column",
  
      // Justify the content so that CardContent will always be at the top of the card,
      // and CardActions will be at the bottom
      justifyContent: "space-between"
    }
  };

  

  return (
    <div>
      <Head>
        <title>list</title>
        <meta name="description" content="File uploader" />
      </Head>
    
      <main>
        
      {/* {props.user.uid} */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <Card  >
                <CardMedia
                  
                  component="img"
                  image={currentState2.img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {currentState2.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {currentState2.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setOpen(false)}>Fechar</Button>
                </CardActions>
              </Card>


          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            <img src={currentState2.img}/>
           
            {currentState2.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {currentState2.body} 
          </Typography> */}
          {/* <Button size="small" onClick={() => setOpen(false)}>Fechar</Button> */}
        </Box>
        
      </Modal>
      
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <Grid container rowSpacing={2} columnSpacing={2}>
        
      {
        currentState.map((item, key) => (
          // <div style={{ display: "inline-block" , padding: "10px"}}>
            <Grid item xs={12} sm={4} md={3} key={key} >
              <Box  style={{"padding": "0px"}}>
              <Card raised onClick = {() => {handleOpen({...item})}}>
                <CardMedia
                  height={300}
                  component="img"
                  image={item.img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                  {item.body}
                  </Typography> */}
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Zoom</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            {/* </div> */}
            </Box>
            </Grid>
        ))
      }
      </Grid>
      {/* </Box> */}
      {/* <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          
          image={singleReg.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {singleReg.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {singleReg.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> */}


       
      </main>

      <footer>
        <div className="w-full max-w-3xl px-3 mx-auto">
          <p>All right reserved</p>
        </div>
      </footer>
    </div>
  );
};
export default List;