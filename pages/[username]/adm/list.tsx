import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
// import { app, database, storage } from '../../../firebaseConfig';

import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Cookies from 'js-cookie'
import Dialog from '@mui/material/Dialog';
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import Modal from '@mui/material/Modal';
import operations, {loadData} from "../../../services/services";
import { Router, useRouter } from "next/router";
import Cards_grid from '../../../components/Cards_grid'
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
interface Props {
  setuser: Function,
  currentState2:{
    img: string
  },
  user: {
    uid: string,
    email: string
  }
}
interface ss {
  img: string,
  title: string,
  body: string
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const List: NextPage<Props> = (props) => {
  const router = useRouter()
  console.log(props.user.displayName);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = (obj) => {
    console.log(obj);
    setCurrentState2(obj)
    setOpen(true)
  }
  const handleClose = () => setOpen(false);

  const [currentState, setCurrentState] = useState([]);
  const [currentState2, setCurrentState2] = useState<ss>({img:'', title:'', body:''});
  const [singleReg, setSingleReg] = useState({})

  const [user, setUser] = useState({});
  // useEffect(() => {
  //   setUser(props.user)
  //   // const getList = async () => {
  //   //   // onAuthStateChanged(auth, (currentUser) => {
  //   //   //   setUser(currentUser);
  //   //   // });
  //   //   // const user = Cookies.get('user_uid')
  //   //   // console.log(user);
      
  //   //   if (props.user.uid){
  //   //     // console.log(user);
        
  //   //     const q = query(collection(database, "receitas"), where("user", "==", props.user.uid));

  //   //     const querySnapshot = await getDocs(q);
  //   //     const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //   //     // querySnapshot.forEach((doc) => {
  //   //     //   // doc.data() is never undefined for query doc snapshots
  //   //     //   console.log(doc.id, " => ", doc.data());
  //   //     // });
  //   //     setCurrentState(data)
  //   //   }

  //   //   // const places = query(collection(database, 'receitas'))
  //   //   // const querySnapshot = await getDocs(places)
    
  //   //   // console.log(`Fetched ${querySnapshot.size} documents`);

  //   //   // const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //   //   // console.log(data)
  //   //   // // const data = [{id:1, nome: "maga"}, {id:2, nome: "ninja"}]
  //   //   // setCurrentState(data)
  //   // }
  // }, [props.user])
  useEffect(() => {
    // getList()
    if (props.user.displayName) {
      console.log(user);
      loadData(props.user.displayName).then((data)=>{
        console.log(data)
        setCurrentState(data)
        console.log(currentState)
      })
    }
  }, [props.user])

  useEffect(() => {
         console.log(currentState)
  }, [currentState])
  


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
  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
  
    return arr;
  }
  const call_link = (link: string) =>{
    router.push(link)
  }

 
  

  return (
    <div>
      <Head>
        <title>list</title>
        <meta name="description" content="File uploader" />
      </Head>
    
      <main>
        {/* <Cards_grid/> */}
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
      
      <Cards_grid user={props.user} currentState={currentState} setCurrentState={setCurrentState}/>
      {/* <Box sx={{ flexGrow: 1 }}> */}
    
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