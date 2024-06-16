import React, { Fragment } from 'react'
import logo from "../../assets/logo.png"
import { NavLink } from 'react-router-dom'
import styles from "./Styles.module.css"


function Header({isLoggedIn , changeLang , text}){
  return (
    <header>
        <div className="container">
            <div className={styles.inner}>
            <nav>
                <ul>
                {document.body.offsetWidth > 768 && <li><NavLink exact to="/" >{text.ul[0]}</NavLink></li>}
                <li><NavLink to="/contact">{text.ul[1]}</NavLink></li>
                </ul>
            </nav>
        <NavLink to="/"><img src={logo} alt='codefort logo'/></NavLink>
                    <div className={styles.bts}>
                    {!isLoggedIn?<Fragment>
                    <NavLink to="/signup">{text.bts[0]}</NavLink>
                    <NavLink to="/login">{text.bts[1]}</NavLink>
                    </Fragment>
                    :
                    document.location.pathname !== "/user" &&<NavLink to="/user" style={{display:"flex"}}><span style={{color:"#eee"}} className="material-symbols-outlined">account_circle</span></NavLink>
                    }
                    <div className={styles.translate}>
                    <button onClick={()=>changeLang("en")} >en</button>
                    <button onClick={()=>changeLang("ar")} >ar</button>
                    </div>
                    </div>
            </div>
        </div>
    </header>
  )
}

export default Header