import React, { memo, useState } from 'react'
import styles from "./Styles.module.css"
import Videos from './videos/Videos'
import Profile from './profile/Profile'


function User({user,loggedout ,text}) {
    const [activePanel,setActivePanel] =useState("videos")
  return (user&&
    <div className={styles.user}>
            <div className={styles.subNav}>
                    <button onClick={()=>setActivePanel("videos")} >{text.btn[0]}</button>
                    <button onClick={()=>setActivePanel("profile")}>{text.btn[1]}</button>
                </div>
        <div className='container'>
           <div className={styles.inner}>
                <div className={styles.panel}>
                    {
                    activePanel === "videos"? <Videos user={user} text={text.videos}/> : <Profile user={user} loggedout={loggedout} text={text.profile}/>
                    }
</div>
           </div>
        </div>
    </div>
  )
}

export default memo(User)