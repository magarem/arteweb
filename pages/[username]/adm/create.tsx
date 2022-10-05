import styles from '../../../styles/data.module.scss'
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
// import DataOperations from '../../../components/DataOperations'
import { useRouter } from 'next/router'
import { Button } from "@mui/material";
import operations, { loadData, loadDataById } from "../../../services/services";
import Upload from '../../../components/Upload'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { width } from '@mui/system';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

interface Props {
  setuser: Function,
  user: {
    uid: string,
    email: string
  }
}


const Create: NextPage<Props> = (props) => {
  console.log(props)
  const router = useRouter()

  const [router_, setRouter_] = useState(router.query);
  const [open, setOpen] = useState(false);
  const [muda, setMuda] = useState(0);
  const [saved, setSaved] = useState(false);
  const [state, setState] = useState({ key: "", title: "", body: "", img: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value)
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const save = () => {
    console.log(state.key);

    console.table({
      useruid: props.user.uid,
      username: props.user.displayName,
      img: state.img,
      title: state.title,
      body: state.body
    });
    if (state.key) {
      operations.update(props.user.displayName, state.key, {
        useruid: props.user.uid,
        img: state.img,
        title: state.title,
        body: state.body
      })
    } else {
      operations.create(props.user.displayName, {
        useruid: props.user.uid,
        img: state.img,
        title: state.title,
        body: state.body
      })
    }
    setSaved(true)
    setState({ key: "", title: "", body: "", img: "" })
    setMuda(muda + 1)
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setSaved(false)
    }, 3000)
  }

  const update = () => {
    console.log(state.key);
    console.table({
      useruid: props.user.uid,
      username: props.user.displayName,
      img: state.img,
      title: state.title,
      body: state.body
    });
    operations.update(props.user.displayName, state.key, {
      useruid: props.user.uid,
      img: state.img,
      title: state.title,
      body: state.body
    })
    setSaved(true)
    const timeId = setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  if (typeof window !== 'undefined') {

    const hostname = window.location.hostname;
    console.log(hostname);
    console.log(props.user.uid)
    if (!props.user.uid) {
      console.log(1)
      console.log(1)
      //router.push('/Login')
    }
  }
  useEffect(() => {
    if (router.query.card_id) {
      console.log(props.user.displayName);
      loadDataById(router.query.username + "/" + router.query.card_id).then((data) => {
        console.log(data)
        const d = {}
        if (data?.title) {
          d.key = router.query.card_id
          d.title = data.title
          d.body = data.body
          d.img = data.img
          setState({ key: router.query.card_id, title: data.title, body: data.body, img: data.img })
          console.log(state);
        }
      })
    }
  }, [])

  if (props.user.uid) {
    return (
      <div>
        <Head>
          <title>File uploader</title>
          <meta name="description" content="File uploader" />
        </Head>
        <main className="py-10">
          <div className="w-full max-w-3xl px-3 mx-auto">
            {/* <DataOperations user={props.user}></DataOperations> */}
            {saved && (<h4>Os dados foram registrados com sucesso</h4>)}
            {/* <Card sx={{ maxWidth: 345 }}> */}
            <Grid container spacing={0} sx={{ padding: 2 }}>
              <Grid xs={4} sx={{ padding: 2 }}>
                <img
                  alt="green iguana"
                  src={state.img||"https://firebasestorage.googleapis.com/v0/b/receitas-5968d.appspot.com/o/YFxIwZAdyaVpmpNKnDwiv0GyUMR2%2Fthumb_noun-picture-1198149.png.png?alt=media&token=93a229d7-3ae3-46db-b403-1948cc76e4c3"}
                /><br/>
                <Upload key={muda} user={props.user} state={state} setState={setState} /> <br />
              </Grid>
              <Grid xs={8} sx={{ padding: 2 }}>
               
             
              {/* <CardContent> */}
              {/* <List sx={{ width: '100%', bgcolor: 'background.paper' }}> */}
                {/* <ListItem alignItems="flex-start"> */}
                {/* </ListItem> */}
                {/* <ListItem alignItems="flex-start"> */}
                  <Typography gutterBottom variant="h5" component="div">
                  <TextField
                    id="outlined-basic"
                    name="title"
                    label="Titulo"
                    variant="outlined"
                    style={{width: "100%"}}
                    onChange={handleChange}
                    value={state.title}
                  />
                  </Typography>
                {/* </ListItem> */}
                {/* <ListItem alignItems="flex-start"> */}
                  <Typography variant="body2" color="text.secondary">
                    <TextField
                    placeholder="Digite aqui sua receita"
                    name="body"
                    label="Descrição"
                    multiline
                    rows={10}
                    style={{width: "100%"}}
                    onChange={handleChange}
                    value={state.body}
                  />
                  </Typography>
                {/* </ListItem> */}
              {/* </List> */}
               
                
              {/* </CardContent>
              <CardActions> */}
                <Button onClick={state.key?update:save} size="small">Save</Button>
                {/* <Button size="small">Share</Button>
                <Button size="small">Learn More</Button> */}
              {/* </CardActions>
            </Card> */}
             </Grid>
            </Grid>
              
            <br/>
            <div className={styles.btnContainer}>
              {saved && (<h4>Os dados foram registrados com sucesso</h4>)}
              
              {/* <Upload key={muda} user={props.user} state={state} setState={setState} /> <br /> */}
              {/* <TextField
                id="outlined-basic"
                name="img"
                label="IMG"
                variant="outlined"
                onChange={handleChange}
                value={state.img}
              /><br /><br /> */}
              {/* <TextField
                id="outlined-basic"
                name="id"
                label="ID"
                variant="outlined"
                onChange={handleChange}
                value={state.key}
              /> */}
              {/* <br /><br /><TextField
                id="outlined-basic"
                name="title"
                label="Titulo"
                variant="outlined"
                onChange={handleChange}
                value={state.title}
              /><br /><br />
              <TextField
                placeholder="Digite aqui sua receita"
                name="body"
                label="Receita"
                multiline
                rows={2}
                onChange={handleChange}
                value={state.body}
              />
              <br /><br /> */}
              {/* <TextField id="outlined-basic" label="Email" variant="outlined" /><br /><br /> */}
              {/* <Button variant="contained" onClick={save}>Save</Button> */}
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <div>go to login page</div>
  }
};

// Create.getServerSideProps = ctx => {
//   // We check for ctx.res to make sure we're on the server.
//   console.log(ctx);

//   // if (ctx.res) {
//   //   ctx.res.writeHead(302, { Location: '/Login' });
//   //   ctx.res.end();
//   // }
//   return { };
// }
export default Create;

export async function getServerSideProps(context) {
  // console.log(6, JSON.parse(context.req.cookies['user']));
  if (!context.req.cookies['user']) {
    const { res } = context;
    res.setHeader("location", "/Login");
    res.statusCode = 302;
    res.end();
    return;
  }
  return {
    props: { user: JSON.parse(context.req.cookies['user']) }, // will be passed to the page component as props
  }
}