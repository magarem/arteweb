import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
// import { app, database, storage } from '../../firebaseConfig';
import operations, {loadData} from "../../services/services";

// import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";

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
import { useRouter } from 'next/router'
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
const Show: NextPage<Props> = (props) => {
  const router = useRouter()
  // const username = router.query.username
  
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
  const getList = async () => {
    const username = location.pathname.split("/")[1]
    console.log(1,username);
  
    if (username){
      // const q = query(collection(database, "cards"), where("username", "==", username));
      // const querySnapshot = await getDocs(q);
      // const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      loadData(username).then((data)=>{
        setCurrentState(data)
      })
    }
  }
  useEffect(() => {
    getList()
  }, [])
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Card>
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
          </Box>
        </Modal>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {
            currentState.map((item, key) => (
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
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </main>
      <footer>
        <div className="w-full max-w-3xl px-3 mx-auto">
          <p>Criada com o Arteweb</p>
        </div>
      </footer>
    </div>
  );
};
export default Show;