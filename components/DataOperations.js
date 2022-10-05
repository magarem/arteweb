import styles from '../styles/data.module.scss'
// import { app, database, storage } from '../firebaseConfig';
import operations, {loadData} from "../services/services";
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

const dbInstance = collection(database, 'cards');
export default function DataOperations(props) {
    
    const [open, setOpen] = useState(false);
    const [muda, setMuda] = useState(0);
    const [saved, setSaved] = useState(false);
    const [state, setState] = useState({ img: "", title: "", body: "" });
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
            useruid: props.user.uid,
            username: props.user.displayName,
            img: state.img,
            title: state.title,
            body: state.body});

        operations.create(props.user.displayName, {
            useruid: props.user.uid,
            img: state.img,
            title: state.title,
            body: state.body
        })
        setSaved(true)
        setState({ img: "", title: "", body: "" })
        setMuda(muda+1)
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setSaved(false)
        }, 3000)
        // addDoc(dbInstance, {
        //     useruid: props.user.uid,
        //     username: props.user.displayName,
        //     img: state.img,
        //     title: state.title,
        //     body: state.body
        // }).then(() => {
        //     setSaved(true)
        //     setState({ img: "", title: "", body: "" })
        //     setMuda(muda+1)
        //     const timeId = setTimeout(() => {
        //         // After 3 seconds set the show value to false
        //         setSaved(false)
        //     }, 3000)
        // })
    }
    
    return (
        <>
           <div className={styles.btnContainer}>
               
           {saved && (<h4>Os dados foram registrados com sucesso</h4>)}
                <Upload key={muda} user={props.user} setState={setState} />

              
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