import React, { useState } from 'react'
import { Howl } from "howler"
import { motion, useAnimation } from "framer-motion"
import './About.css'
import audioURL from '../assets/xmass.mp3'
import { FiMic, FiStopCircle } from 'react-icons/fi'
import { useEffect } from 'react'


export default function About() {
    const [borderSize, setBorderSize] = useState(70)
    const [playing, setPlaying] = useState(false)
    const controls = useAnimation()

    /// Number of bars to fill entire window width
    var sound = new Howl({
        src: [audioURL],
        html5: true,
        volume: 0.2,
    })

    const increaseBorderSize = () => {
        const newSize = borderSize + 10
        setBorderSize(newSize)
        controls.start({
            borderWidth: newSize,
            transition: { duration: 0.5, ease: "easeOut" },
        })
    }

    const reduceBorderSize = () => {
        setBorderSize(50); // Set it back to the original size
    
        // Animate the border size reduction
        controls.start({ borderWidth: 50 });
      };
    
    // Animate the border size increase or decrease  
    const animate = () => {
        console.log("animate", playing)
        if(playing) {
            increaseBorderSize()

            setTimeout(() => {
                reduceBorderSize()
                requestAnimationFrame(animate)
            }, 1000)
        }
    }

    useEffect(() => {
        animate()
    }, [playing])

    function playSound() {
        console.log("Playing")
        if(sound.playing()) {
            setPlaying(false)
            sound.pause();
        } else {
            setPlaying(true)
            sound.play();
        }
        // sound.play();
    }

    function pauseSound() {
        console.log("Pausing")
        setPlaying(false)
        sound.pause();
    }

    sound.on('play', function() {
        console.log("Playing")
        setPlaying(true)
    })

    sound.on('pause', function() {
        console.log("Paused")
        setPlaying(false)
    })

    sound.on('end', function() {
        setPlaying(false)
        console.log("We're done!")
    })
    

    return (
        <>
           <div className='h-screen w-screen bg-black relative'>
                <motion.div className="bg-circle" initial={{ borderWidth: borderSize }} animate={controls}></motion.div>
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

