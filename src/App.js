/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState } from 'react'
import Header from './components/header/Header'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/home/Home'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'
import User from './components/user/User'
import Footer from './components/footer/Footer'
import ContactUs from './components/contactUs/ContactUs'
import Admin from './components/admin/Admin'
import supabase from './Supabase'

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
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

  const getUserData =()=>{
    setIsLoggedIn(true)
  }
  const loggedout =()=>{
    setIsLoggedIn(false)
  }
  useEffect(()=>{
    if(!isLoggedIn){
      if(localStorage.getItem("sb-uhtemvqbfzogigemhknj-auth-token")){
        setIsLoggedIn(true)
      }else{
        supabase.auth.getUser().then(({data})=>{
          if(data.user){setIsLoggedIn(true)}
        })
      }
    }
  },[isLoggedIn,setIsLoggedIn])

  return (curText&&
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} changeLang={changeLang} text={curText.header}/>
      <Routes>
        <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} text={curText.home}/>} />
        <Route path="/contact" element={<ContactUs text={curText.contact}/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/signup" element={<SignUp sendUserData={getUserData} text={curText.form} />} />
        <Route path="/login" element={<Login sendUserData={getUserData} text={curText.form} />} />
        <Route path="/user" element={<User isLoggedIn={isLoggedIn} loggedout={loggedout} text={curText.user}/>} />
      </Routes>
      <Footer text={curText.footer}/>
      </BrowserRouter>
  )
}

export default App
