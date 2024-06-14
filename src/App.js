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
  }
if(!text){getTextData()}
  const changeLang = (lang)=>{
    setCurText(lang=== "en" ? text.en : text.ar)
    localStorage.setItem("lang",lang)
    document.body.style.direction = `${lang === "en" ? "ltr" : "rtl"}`
  }

  useEffect(()=>{      
    const fetch = async()=>{

      if(localStorage.length >= 1){
        console.log("localStorage")
        if(localStorage.key(0).startsWith("sb")){
          const token = JSON.parse(localStorage.getItem(localStorage.key(0)))
          await supabase.from("users").select("*").eq("email",token.user.email)
          .then((d)=>{
            if(d.data[0]){
              if(d.data[0].id === token.user.id ){
                setIsLoggedIn(true)
                setUser(d.data[0])
              }}else{
                setIsLoggedIn(false)
                setUser(null)
              }
          })
        }
      }else{
        setIsLoggedIn(false)
        setUser(null)
      }
    }
    fetch()
  },[isLoggedIn ])


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
      <Footer/>
      </BrowserRouter>
  )
}

export default App
