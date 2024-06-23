import React, { memo} from 'react'
import styles from "./Styles.module.css"
import { NavLink } from 'react-router-dom'
import Toast from '../toast/Toast'
import Par from '../tsParticles/TsParticles'
import home_banner from "./home.json"
import Lottie from 'lottie-react'

function Home({isLoggedIn , text}) {
  isLoggedIn ?  Toast(text.toast[0]) :Toast(text.toast[1])
  
  return (
    <div className={styles.home}>
            <Par/>
        <div className="container">
            <div className={styles.inner}>
            <div className={styles.text}>
                <div>
                <h1><span>{text.h1[0]}</span></h1>
                <h1>{text.h1[1]}</h1>
                </div>
                <p>{text.p}</p>
                {isLoggedIn ? <NavLink to="/user">{text.btn[1]}</NavLink> : <NavLink to="/signup">{text.btn[0]}</NavLink>}
            </div>
            <div className={styles.banner}>
              <Lottie animationData={home_banner}/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default memo(Home)