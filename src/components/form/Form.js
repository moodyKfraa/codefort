import React, { Fragment, useState } from 'react'
import styles from "./Styles.module.css"
import supabase from '../../Supabase'
import { useNavigate } from 'react-router-dom'
import Toast from '../toast/Toast'
import google from "../../assets/icons8-google-94.png"

function Form({type , sendUserData , text}) {
  const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')
    const [phone , setPhone] = useState('')
    const [wait , setWait] = useState(false)
    const formType = type === "signup";
    const reset = ()=>{
        setName("")
        setEmail("")
        setPass("")
        setPhone("")
    }
    const nav = useNavigate()
    
      const handleSubmit = async(e)=>{
      e.preventDefault();
      setWait(true)
      if(formType){
        await supabase.auth.signUp({
            email : email,
            password:pass,
            options:{
              data:{
                name:name,
                phone:phone
              }
            }
           }).then(data=>{
            if(data.data.user){Toast(text.toast[2]);reset();setWait(false);nav("/login");}
            else{Toast(data.error.message)}
            })
        }else{
          await supabase.auth.signInWithPassword({
            email : email,
            password:pass,
          }).then((data)=>{
            if(data.data.user){
              sendUserData()
              setWait(false)
              reset()
              setWait(false)
              nav("/user")
            Toast(text.toast[0])
            }else{Toast(data.error.message);setWait(false)}})}
    }

    const googleAuth =async()=>{
      await supabase.auth.signInWithOAuth({provider:"google"})
    }

  return (
    <div className={styles.form}> 
    <form onSubmit={handleSubmit}>
    <div className={styles.inner}>
      {type==="signup"&&
      <Fragment>
        <div>          
        <input name='name' required type='text' placeholder={text.label[0]} value={name} onChange={(e)=> setName(e.target.value)}  />
            <span style={{animationName:`${!name?"hide_span":"show_span"}`,right:`${document.body.style.direction === "rtl" && 0}`,left:`${document.body.style.direction === "ltr" && 0}`}} >{text.label[0]}</span>
            </div>
        <div>
    <input name='phone' required type='number' placeholder={text.label[1]} value={phone} onChange={(e)=> setPhone(e.target.value)}  />
        <span style={{animationName:`${!phone?"hide_span":"show_span"}`,right:`${document.body.style.direction === "rtl" && 0}`,left:`${document.body.style.direction === "ltr" && 0}`}} >{text.label[1]}</span>
        </div>
      </Fragment>
               }
        <div>
    <input name='email' required type='text' placeholder={text.label[2]} value={email} onChange={(e)=> setEmail(e.target.value)}  />
        <span style={{animationName:`${!email?"hide_span":"show_span"}`,right:`${document.body.style.direction === "rtl" && 0}`,left:`${document.body.style.direction === "ltr" && 0}`}} >{text.label[2]}</span>
        </div>
        <div>
    <input name='password' required type='password' placeholder={text.label[3]} value={pass} onChange={(e)=> setPass(e.target.value)}  />
        <span style={{animationName:`${!pass?"hide_span":"show_span"}`,right:`${document.body.style.direction === "rtl" && 0}`,left:`${document.body.style.direction === "ltr" && 0}`}} >{text.label[3]}</span>
        </div>
        <input type='submit' value={text.bt} name='submit' style={{pointerEvents:`${wait? "none" : "all"}` , opacity:`${wait? 0.5 : 1}`}}/>
        </div>
   </form>
   <hr/>
            <button onClick={googleAuth}>
              <img src={google} alt='google logo'/>
            </button>
    </div>
  )

}

export default Form