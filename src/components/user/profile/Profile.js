import React, { useState } from 'react'
import styles from './Styles.module.css'
import supabase from '../../../Supabase'
import {useNavigate } from 'react-router-dom'
import Toast from '../../toast/Toast'

function Profile({user , loggedout , text}) {
  const [activeTab , setActiveTab] = useState("overview")
  const [newPass , setNewPass] = useState("")
  const [newPassrep , setNewPassrep] = useState("")
  
  const changePassword = async()=>{
    if(newPass!==newPassrep){
      Toast(text.toast[0])
      return
    }
    await supabase.auth.updateUser({
      email: user.email,
      password : newPass,
    }).then(data=>{
      if(data.data.user){
        Toast(text.toast[1])
        setNewPass("")
        setNewPassrep("")
      }
    })
  }
  const navigate = useNavigate()
  
  const handleLogOut = async()=>{
    await supabase.auth.signOut()
    loggedout()
    Toast(text.toast[2])
    navigate("/")
  }
  return (
 user &&
 <div className={styles.Profile}>
      <div className={styles.left}>
        <button onClick={()=>{setActiveTab("overview")}}>{text.btn[0]}</button>
        <button onClick={()=>{setActiveTab("changePassword")}}>{text.btn[1]}</button>
        <button onClick={handleLogOut}>{text.btn[2]}</button>
      </div>
      <div className={styles.right}>
        {activeTab === "overview" ?
        <div className={styles.overview}>
          <h1>{text.h1[0]}</h1>
          <div className={styles.data}>
              <p>{text.p[0]} :</p>
              <p>{user.name}</p>
              <p> {text.p[1]} :</p>
              <p>{user.phone}</p>
              <p>{text.p[2]} :</p>
              <p>{user.email}</p>
              <p>{text.p[3]} :</p>
              <p>{user.signedupfrom}</p>
          </div>
        </div>
          :
          <div className={styles.changePassword}>
          <h1>{text.h1[1]}</h1>
          <form onSubmit={(e)=>e.preventDefault()} className={styles.data} name='change password'>
              <p> {text.form[0]} :</p>
        <input required type='password' value={newPass} onChange={(e)=> setNewPass(e.target.value)}  /> 
              <p>{text.form[1]} :</p>
        <input required type='password' value={newPassrep} onChange={(e)=> setNewPassrep(e.target.value)}  />
          <button onClick={changePassword}>{text.form[2]}</button>
          </form>
        </div>
        }
      </div>
    </div>
  )
}

export default Profile