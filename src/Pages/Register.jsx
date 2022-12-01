import React, { useState } from "react";
import "../Components/Components.css";
import { storage } from "../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addUser } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import * as GrIcon from "react-icons/gr";
import * as AiIcon from "react-icons/ai";

const Register = () => {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [Inputs, setInputs] = useState({});
  const [AllInputs, setAllInputs] = useState([]);
  const [File, setFile] = useState(null);
  const dispatch = useDispatch();


  const HandleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...Inputs, [name]: value });
  }


  const HandleClick = (e) => {
    e.preventDefault();
    if (Password === ConfirmPassword) {
      //todo

      const storageRef = ref(storage, `files/${File.name}`);
      const uploadTask = uploadBytesResumable(storageRef, File)

      uploadTask.on("state_changed", (snapshot)=>{
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
        (err)=> console.log(err),
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
            const inputs = { ...Inputs, img: url, password: Password };
           
            addUser(dispatch, inputs);
          })
        }
      )
    }
  }



  return (
    <main className="register-container">
      <section className="register-wrapper">
        <h1>create an account</h1>
        <form>
          <div className="register-input-div">
            <input className="imageinput" name='name' type="text" placeholder="Name" onChange={HandleInputs} />
            <input className="imageinput" name='lastname' type="text" placeholder="Lastname" onChange={HandleInputs} />
            <input className="imageinput" name='username' type="text" placeholder="Username" onChange={HandleInputs} />
            <input className="imageinput" name='email' type="email" placeholder="Email" onChange={HandleInputs} />
            <input className="imageinput" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <input className="imageinput" type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
            <div >
              <input onChange={e => setFile(e.target.files[0])} id="image" type="file" className="inputimage"></input>
            </div>
          </div>
        </form>
        <p>By creating an account. I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></p>
        <button type="button" onClick={HandleClick}>Create</button>
      </section>
    </main>
  );
};

export default Register;
