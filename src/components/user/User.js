import React, { memo, useEffect, useState } from 'react'
import styles from "./Styles.module.css"
import Videos from './videos/Videos'
import Profile from './profile/Profile'
import supabase from '../../Supabase'
import Toast from '../toast/Toast'


function User({isLoggedIn , loggedout,text}) {
    const [activePanel,setActivePanel] =useState("videos")
    const [user,setUser] =useState({})
    const [access,setAccess] =useState(false)
    const [provider,setProvider] =useState("")
   useEffect(()=>{      
    const fetch = async()=>{
      await supabase.auth.getUser().then(async ({data})=>{
        if(!data.user){setUser({}); loggedout();return}
        if(data.user.aud === "authenticated"){
              setUser(data.user.user_metadata)
              setProvider(data.user.raw_app_meta_data.provider)
              await supabase.from("users").select("access").eq("email" , data.user.email)
              .then(async userDb=> {
                if(userDb.data[0]){
                    setAccess(userDb.data[0].access)
                }else if(userDb.error){Toast(userDb.error.message)}
                else{
                  await supabase.from("users").insert([{email: data.user.user_metadata.email}])
                  setAccess(false)
                }
              })
        }else{
          loggedout()
          setUser({})
        }})}
    if(isLoggedIn){fetch()}
  },[isLoggedIn])

  return (isLoggedIn&&
    <div className={styles.user}>
            <div className={styles.subNav}>
                    <button onClick={()=>setActivePanel("videos")} >{text.btn[0]}</button>
                    <button onClick={()=>setActivePanel("profile")}>{text.btn[1]}</button>
                </div>
        <div className='container'>
           <div className={styles.inner}>
                <div className={styles.panel}>
                    {
                    activePanel === "videos"? <Videos access={access} text={text.videos}/> : <Profile user={user} provider={provider} loggedout={loggedout} text={text.profile}/>
                    }
</div>
           </div>
        </div>
    </div>
  )
}

export default memo(User)