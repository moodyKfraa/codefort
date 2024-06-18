import React, { memo} from 'react'
import styles from "./Styles.module.css"
import { NavLink } from 'react-router-dom'
import Toast from '../toast/Toast'
import {motion} from 'framer-motion'
import Par from '../tsParticles/TsParticles'
import home_banner from "../../assets/home_banner.png"
function Home({isLoggedIn , text}) {
  isLoggedIn ?  Toast(text.toast[0]) :Toast(text.toast[1])
  const pVal = text.p
  const variants = {
    start:{
      opacity : 0,
    },
    end:{
      opacity : 1,
      transition:{
        staggerChildren:0.02
      }
    }
  }
  const spanVariants = {
    start:{
      opacity : 0,
    },
    end:{
      opacity : 1,
    }
  }
  
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
                <motion.p variants={variants} initial="start" animate="end">
                  {pVal.split("").map((char , inn)=><motion.span key={inn} variants={spanVariants}>{char}</motion.span>
                  )}
                </motion.p>
                {isLoggedIn ? <NavLink to="/user">{text.btn[1]}</NavLink> : <NavLink to="/signup">{text.btn[0]}</NavLink>}
            </div>
            {/* <img src={home_banner} /> */}
            </div>
        </div>
    </div>
  )
}

export default memo(Home)