import React, { useEffect, useState } from 'react'
import supabase from '../../Supabase'
import styles from'./admin.module.css'
import { useNavigate } from 'react-router-dom'
import Toast from '../toast/Toast'

function Admin() {
    const [access , setAccess] = useState(false)
    const [title , setTitle] = useState("")
    const [link , setLink] = useState("")
    const [wait , setWait] = useState(false)
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const validLink = link.slice(0,-19)+ "preview"
        await supabase.from("videos").insert([{
            title: title,
            link:validLink,
        }]).then(({error})=>error&&Toast(error.message))
    }
    const nav = useNavigate()
    useEffect(()=>{
        supabase.auth.getUser().then(async(data)=>{
            if(data.data.user){
                console.log(access);
                if(data.data.user.email){
                    setAccess(true)
                }else{setAccess(false) ; nav("/")}
            }else{nav("/")}
        })
    },[setAccess])

  return (access&&
      <form onSubmit={handleSubmit}>
            <div className={styles.inner}>
            <input required type='text' placeholder="title :" value={title} onChange={(e)=> setTitle(e.target.value)}  />
            <input required type='text' placeholder="video Link :" value={link} onChange={(e)=> setLink(e.target.value)}  />
            <input type='submit' name='submit' value="Add Video" style={{pointerEvents:`${wait? "none" : "all"}` , opacity:`${wait? 0.5 : 1}`}}/>
            </div>
        </form>
  )
}

export default Admin