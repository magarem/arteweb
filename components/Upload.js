
import { storage } from "../firebaseConfig";
// import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import Button from '@mui/material/Button';
import { padding } from "@mui/system";
import Resizer from "react-image-file-resizer";
import AlertDialog from "./AlertDialog";
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      700,
      700,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
 
  
 

  function Upload(props) {
    const [imgURL, setImgURL] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
    
    const handleUpload = async (file) => {
      try {
        // const storage = getStorage(); //firebase storage
        console.log(props.user.uid);
        //create thumbnail using the function we created before
        const uri = await resizeFile(file);
        const fileName = `thumb_${file.name}.png`; //filename of thumbnail
        console.log(fileName);
        //references to the location in firebase storage where the image will be uploaded
        const thumbRef = ref(storage, `${props.user.uid}/${fileName}`);
        setImgURL(thumbUrl);
        //upload thumbnail, because we are using a uri with 'base64'
        //we have to use 'uploadString' with 'data_url' as the third param
        const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");
    
        //you can store this url in your database or do something else with it
        const thumbUrl = await getDownloadURL(thumbSnapshot.ref);
    
        //upload main image, works the same
        // const storageRef = ref(storage, `images/${file.name}`);
        // const snapshot = await uploadBytes(storageRef, file);
    
        //url of the full image.
        //similarly you can upload to a database from here
        // const url = await getDownloadURL(snapshot.ref);
        
        props.setState({img: thumbUrl})
        setImgURL("")
          //     });
      } catch (e) {
        //display an error if something went wrong during the upload
        console.log(`Error uploading image: ${e.code}`);
        // setError(`Error uploading image: ${e.code}`);
      }
    };
    
    const onChange = async (e) => {
      var file_ = e.target.files[0]
      console.log(file_);
      const file = await resizeFile(file_);
      console.log(file);
      const storageRef = ref(storage, `images/${file_.name}`);
      const uploadTask = uploadString(storageRef, file);
      
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     setPorgessPorcent(progress);
      //   },
      //   (error) => {
      //     alert(error);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       setImgURL(downloadURL);
      //       props.setState({img:downloadURL})
      //     });
      //   }
      // );
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      const file = event.target[0]?.files[0];
      if (!file) return;

      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPorgessPorcent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgURL(downloadURL);
            props.setState({img:downloadURL})
          });
        }
      );
    };
  return (
    <div className="App">
      <header className="App-header">
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
        <AlertDialog title="" body="teste"/>
        <form onSubmit={handleSubmit}>
          {/* <input type="file" onChange={onChange}/> */}
          <Button
            variant="contained"
            component="label"
          >
            Enviar imagem
            <input
              type="file"
              // onChange={onChange}
              onChange={(e) => handleUpload(e.target.files[0])}
              hidden
            />
          </Button>
          {/* <button>Enviar</button> */}
        </form>
        {/*   {!imgURL && <p>{progressPorcent}%</p>} */}<br/>
        {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
      </header>
    </div>
  );
}

export default Upload;