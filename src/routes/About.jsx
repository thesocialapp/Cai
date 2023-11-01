import React, { useState } from 'react'
import { Howl } from "howler"
import { motion } from "framer-motion"
import './About.css'
import audioURL from '../assets/xmass.mp3'
import { FiMic, FiStopCircle } from 'react-icons/fi'


export default function About() {
    const [playing, setPlaying] = useState(false)

    /// Number of bars to fill entire window width
    var sound = new Howl({
        src: [audioURL],
        html5: true,
    })

    function playSound() {
        if(sound.playing()) {
            sound.pause();
        } else {
            sound.play();
        }
        // sound.play();
    }

    function pauseSound() {
        sound.pause();
    }

    sound.on('play', function() {
        setPlaying(true)
    })

    sound.on('pause', function() {
        setPlaying(false)
    })

    sound.on('end', function() {
        setPlaying(false)
        console.log("We're done!")
    })
    

    return (
        <>
           <div className='h-screen w-screen bg-black relative'>
                <div className="bg-circle bg-circle__first"></div>
                <motion.div className='centered'>
                    <div className="flex justify-center flex-center scale-150">
                        {
                            playing ?
                            <FiStopCircle className='text-white' size={50} onClick={pauseSound}/>
                            :
                            <FiMic className='text-white' size={50} onClick={playSound}/>
                        }
                    </div>
                </motion.div>
            </div>      
        </>
    )
}

