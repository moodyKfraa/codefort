import React, { memo } from 'react'
import styles from "./Styles.module.css"
import home_banner from '../../assets/home_banner.jpg'
import { NavLink } from 'react-router-dom'
import Toast from '../toast/Toast'


function Home({isLoggedIn , text}) {
  isLoggedIn ?  Toast(text.toast[0]) :Toast(text.toast[1])
  return (
    <div className={styles.home}>
        <div className="container">
            <div className={styles.inner}>
            <div className={styles.text}>
                <div>
                <h1><span>{text.h1[0]}</span></h1>
                <h1>{text.h1[1]}</h1>
                </div>
                <p>{text.p}</p>
                <NavLink to="codefort/signup">{text.btn}</NavLink>
            </div>
            <img src={home_banner}/>
            </div>
        </div>
    </div>
  )
}

export default memo(Home)