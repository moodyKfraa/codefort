import React, { useState } from 'react'
import styles from './Styles.module.css'
import supabase from '../../../Supabase'
import {useNavigate } from 'react-router-dom'
import Toast from '../../toast/Toast'

function Profile({user , loggedout ,provider, text}) {
  const [activeTab , setActiveTab] = useState("overview")
  const [newPass , setNewPass] = useState("")
  const [newPassrep , setNewPassrep] = useState("")
  const [wait , setWait] = useState(false)

  const reset = ()=>{
    setNewPass("")
    setNewPassrep("")
}
  
  const changePassword = async(e)=>{
    e.preventDefault()
    setWait(true)
    if(newPass!==newPassrep){
      Toast(text.toast[0])
      setWait(false)
      return
    }
    await supabase.auth.updateUser({
      email: user.email,
      password : newPass,
    }).then(data=>{
      if(data.data.user){
        Toast(text.toast[1])
        reset()
      setWait(false)
      }else{
        Toast(data.error.message)
        setWait(false)
      }
    })
  }
  const navigate = useNavigate()
  
  const handleLogOut = async()=>{
    await supabase.auth.signOut()
    loggedout()
    setWait(false)
    navigate("/")
    Toast(text.toast[2])
  }
  return (user &&
 <div className={styles.Profile}>
      <div className={styles.left}>
        <button onClick={()=>{setActiveTab("overview")}}>{text.btn[0]}</button>
        {provider === "gmail" && <button onClick={()=>{setActiveTab("changePassword")}}>{text.btn[1]}</button>}
        <button onClick={handleLogOut}>{text.btn[2]}</button>
      </div>
      <div className={styles.right}>
        {activeTab === "overview" ?
        <div className={styles.overview}>
          <div className={styles.profileImg}>{user.name[0]}</div>
          <div className={styles.data}>
              <p>{text.p[0]} :</p>
              <p>{user.name}</p>
              <p> {text.p[1]} :</p>
              <p>{user.phone}</p>
              <p>{text.p[2]} :</p>
              <p>{user.email}</p>
          </div>
        </div>
          :
          <div className={styles.changePassword}>
          <h1>{text.h1[1]}</h1>
          <form onSubmit={changePassword} className={styles.data} name='change password'>
        <div>
    <input name='password' required type='text' placeholder={text.form[0]} value={newPass} onChange={(e)=> setNewPass(e.target.value)}  />
        <span style={{animationName:`${!newPass?"hide_span":"show_span"}`,right:`${document.body.style.direction === "rtl" && 0}`,left:`${document.body.style.direction === "ltr" && 0}`}} >{text.form[0]}</span>
        </div>
        <div>
    <input name='password' required type='text' placeholder={text.form[1]} value={newPassrep} onChange={(e)=> setNewPassrep(e.target.value)}  />
        <span style={{animationName:`${!newPassrep?"hide_span":"show_span"}`,right:`${document.body.style.direction === "rtl" && 0}`,left:`${document.body.style.direction === "ltr" && 0}`}} >{text.form[1]}</span>
        </div>
        <input type='submit' value={text.form[2]} name='submit' style={{pointerEvents:`${wait? "none" : "all"}` , opacity:`${wait? 0.5 : 1}`}}/>
          </form>
        </div>
        }
      </div>
    </div>
  )
}

export default Profile