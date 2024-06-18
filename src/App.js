/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState } from 'react'
import Header from './components/header/Header'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/home/Home'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'
import supabase from './Supabase'
import User from './components/user/User'
import Footer from './components/footer/Footer'
import ContactUs from './components/contactUs/ContactUs'
import Toast from './components/toast/Toast'

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [user , setUser] = useState();
  const [text ,setText] = useState();
  const [curText ,setCurText] = useState();

async function getTextData(){
   const text =  await import('./data.json')
    setText(text)
    const lang = localStorage.getItem("lang")
    setCurText(lang==="en"? text.en :text.ar)
    document.body.style.direction = `${lang === "en" ? "ltr" : "rtl"}`
  }
if(!text){getTextData()}
  const changeLang = (lang)=>{
    setCurText(lang=== "en" ? text.en : text.ar)
    localStorage.setItem("lang",lang)
    document.body.style.direction = `${lang === "en" ? "ltr" : "rtl"}`
  }

  useEffect(()=>{      
    const fetch = async()=>{
      await supabase.auth.getUser().then(async ({data})=>{
        if(data.user.aud === "authenticated"){
          await supabase.from("users").select("*").eq("email",data.user.email)
          .then(userData=>{
            if(userData.data){
              setIsLoggedIn(true)
              setUser(userData.data[0])
            }else{
              Toast(userData.error.message)
              setIsLoggedIn(false)
              setUser()
            }
            })
        }else{
          setIsLoggedIn(false);
          setUser(null)
        }})}

    fetch()
  },[isLoggedIn])


  const getUserData =(data)=>{
    setUser(data)
    setIsLoggedIn(true)
  }
  const loggedout =()=>{
    setIsLoggedIn(false)
    setUser(null)
  }

  return (curText&&
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} changeLang={changeLang} text={curText.header}/>
      <Routes>
        <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} text={curText.home}/>} />
        <Route path="/contact" element={<ContactUs text={curText.contact}/>} />
        <Route path="/signup" element={<SignUp sendUserData={getUserData} text={curText.form} />} />
        <Route path="/login" element={<Login sendUserData={getUserData} text={curText.form} />} />
        <Route path="/user" element={<User user={user} loggedout={loggedout} text={curText.user}/>} />
      </Routes>
      <Footer text={curText.footer}/>
      </BrowserRouter>
  )
}

export default App
