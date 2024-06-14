import React from 'react'
import styles from './style.module.css'

function Footer({text}) {
  return (
    <div className={styles.footer}>
      <span>{text}</span>
      <span style={{fontSize:10}}>made by:ModyKfraa</span>
    </div>
  )
}

export default Footer