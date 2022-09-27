import styles from '../styles/data.module.scss'
import { app, database, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Upload from './Upload'

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

const dbInstance = collection(database, 'receitas');
export default function DataOperations(props) {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [state, setState] = useState({ img: "", title: "", body: "" });
    // useEffect(() => {
    //     console.log(2, props.user)
    //   }, [props.user])
    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value)
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const save = () => {
        console.table({
            user: props.user.uid,
            img: state.img,
            title: state.title,
            body: state.body});
        addDoc(dbInstance, {
            user: props.user.uid,
            img: state.img,
            title: state.title,
            body: state.body
        }).then(() => {
            setState({ img: "", title: "", body: "" })
        })
    }
    
    return (
        <>
           <div className={styles.btnContainer}><br/>
               
               
                <Upload user={props.user} setState={setState} />

              
                <br />
                
                <TextField 
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
                    
                <br /><br />
                {/* <TextField id="outlined-basic" label="Email" variant="outlined" /><br /><br /> */}
                <Button variant="contained" onClick={save}>Save</Button>

            </div>
        </>
    )
}