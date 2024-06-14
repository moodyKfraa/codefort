import React, { Fragment, useState } from 'react'
import styles from "./Styles.module.css"
import supabase from '../../Supabase'
import { useNavigate } from 'react-router-dom'
import Toast from '../toast/Toast'

function Form({type , sendUserData , text}) {
  const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')
    const [phone , setPhone] = useState('')
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
          }else{Toast(data.error.message)}
        })
      };
    
      const handleSubmit = async(e)=>{
      e.preventDefault();
      if(formType){
        await supabase.auth.signUp({
            email : email,
            password:pass,
            phone:phone,
           })
           .then(async(data)=>{
             if(data.data.user){
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
                  Toast(text.Toast[2])
                  console.log("done",text);
                  reset()
                  nav("/")
                }else{
                  Toast(text.Toast[1])
                }
              })
            }
            else{Toast(text.Toast[1])}
              
           
          })
        }else{
          await supabase.auth.signInWithPassword({
            email : email,
            password:pass,
          }).then((data)=>{
            if(data.data.user){
              fetchUserData(data.data.user.email)
              nav("/user")
            }else{
              Toast(data.error.message)
            }
            }
           )
      }
    }


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <span>{formType ? text.span[0] : text.span[1]}</span>
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
        <input type='submit' value={text.bt} name='submit'/>
        </div>
   </form>
  )
}

export default Form