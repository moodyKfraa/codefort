/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import styles from "./Styles.module.css"
import supabase from '../../../Supabase'
import Toast from '../../toast/Toast'


function Videos({access , text}) {
    const [activeVideo,setActiveVideo] = useState()
    const [videos ,setVideos ] = useState()

    useEffect(()=>{ 
        async function fetch (){
            await supabase.from("videos").select("*")
            .then((data) =>{
                if(data.data){
                    setVideos(data.data)
                }else{Toast(data.error.message)}
            })}
                access? fetch() :Toast(text.toast)
        },[activeVideo ,access ,text.toast])

  return (   
      <div className={styles.videos}> 
    <div className={styles.left}>
    {videos?
            videos.map((video)=>{
                return(
                    <button key={video.id} className={styles.video} onClick={()=>setActiveVideo(video)}>
                        {video.title}
                    </button>
                )
            })
            :<a href='app/user/videos'>{text.a}</a>
        }
    </div>
    <div className={styles.right}>
        {activeVideo?
        <div className={styles.videoPlayer}>
            <iframe src={activeVideo.link} title="video" width="100%" height="100%"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        :text.div
        }
    </div>
    </div>
  )
}

export default Videos