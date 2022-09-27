import { useState, useEffect } from 'react'
import { app, database } from '../firebaseConfig';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
const dbInstance = collection(database, 'receitas');

export default function RegDetails({ ID }) {
    const [singleReg, setSingleReg] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [state, setState] = useState({ img: "", title: "", body: "" });
   
    const getSingleReg = async () => {
        if (ID) {
            const singleReg = doc(database, 'receitas', ID)
            const data = await getDoc(singleReg)
            setSingleReg({ ...data.data(), id: data.id })
        }
    }

    const getRegs = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleReg(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })[0]);
            })
    }

    const getEditData = () => {
        setIsEdit(true);
        setState({img: singleReg.img, title: singleReg.title, body: singleReg.body})
    }

    useEffect(() => {
        getRegs();
    }, [])

    useEffect(() => {
        getSingleReg();
    }, [ID])

    const editReg = (id) => {
        const collectionById = doc(database, 'receitas', id)

        updateDoc(collectionById, {
            img: state.img,
            title: state.title,
            body: state.body
        })
            .then(() => {
                window.location.reload()
            })
    }

    const deleteReg = (id) => {
        const collectionById = doc(database, 'receitas', id)

        deleteDoc(collectionById)
            .then(() => {
                window.location.reload()
            })
    }
    return (
        <>
            <div>
                <button
                    onClick={getEditData}
                >Edit
                </button>
                <button
                    onClick={() => deleteReg(singleReg.id)}
                >Delete
                </button>
            </div>
            {isEdit ? (
                <div >
                    <input
                        placeholder='Enter the img..'
                        onChange={(e) => setState({img: e.target.value})}
                        value={state.img}
                    />
                    <input
                        placeholder='Enter the Title..'
                        onChange={(e) => setState({title: e.target.value})}
                        value={state.title}
                    />
                    <div className={styles.ReactQuill}>
                    <input
                        placeholder='Enter the Body..'
                        onChange={(e) => setState({body: e.target.value})}
                        value={state.body}
                    />
                    </div>
                    <button
                        onClick={() => editReg(singleReg.id)}
                       >
                        Update Reg
                    </button>
                </div>
            ) : (
                <></>
            )}
            <h2>{singleReg.RegTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: singleReg.RegBody }}></div>
        </>
    )
}