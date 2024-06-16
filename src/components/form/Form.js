import React, { Fragment, useState } from 'react'
import styles from "./Styles.module.css"
import supabase from '../../Supabase'
import { useNavigate } from 'react-router-dom'
import Toast from '../toast/Toast'
import logo from '../../assets/logo.png'

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

     async function fetchUserData (email){
      await supabase
       .from("users").select("*").eq("email", email)
        .then((data)=>{
          if(data.data){
            sendUserData(data.data[0])
            reset()
            Toast(text.Toast[0])
            setWait(false)
          }else{Toast(data.error.message);setWait(false)}
        })
      };
    
      const handleSubmit = async(e)=>{
      e.preventDefault();
      setWait(true)
      if(formType){
        await supabase.auth.signUp({
            email : email,
            password:pass,
            phone:phone,
           })
           .then(async(data)=>{
             if(data.data){
               await supabase.from("users").insert([{
                 email : data.data.user.email,
                 id: data.data.user.id,
                 signedupfrom : data.data.user.created_at,
                 name:name,
                 phone : phone,
                 access : false,
                }])
                .then((data)=>{
                if(data.status === 201){
                  reset()
                  setWait(false)
                  nav("/login")
                  Toast(text.toast[2])
                }else{
                  setWait(false)
                  Toast(text.toast[1])
                }
              })
            }
            else{Toast(text.toast[1]);setWait(false)}
              
           
          })
        }else{
          await supabase.auth.signInWithPassword({
            email : email,
            password:pass,
          }).then((data)=>{
            if(data.data.user){
              fetchUserData(data.data.user.email)
              nav("/user")
              setWait(false)
            }else{Toast(data.error.message);setWait(false)}})}
    }


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <img src={logo} alt='logo'/>
    <div className={styles.inner}>
      {type==="signup"&&
      <Fragment>
        <div>          
        <label name="name">{text.label[0]} :</label>
        <input name='name' required type='text' value={name} onChange={(e)=> setName(e.target.value)}  />
            </div>
        <div>
        <label name="phone">{text.label[1]} :</label>
    <input name='phone' required type='number' value={phone} onChange={(e)=> setPhone(e.target.value)}  />
        </div>
      </Fragment>
               }
        <div>
    <label name="email">{text.label[2]} :</label>
    <input name='email' required type='text' value={email} onChange={(e)=> setEmail(e.target.value)}  />
        </div>
        <div>
        <label name="password">{text.label[3]} :</label>
    <input name='password' required type='password' value={pass} onChange={(e)=> setPass(e.target.value)}  />
        </div>
        <input type='submit' value={text.bt} name='submit' style={{pointerEvents:`${wait? "none" : "all"}` , opacity:`${wait? 0.5 : 1}`}}/>
        </div>
   </form>
  )
}

export default Form