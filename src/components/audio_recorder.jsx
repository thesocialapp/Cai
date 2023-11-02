import React, { useEffect, useState } from "react";
import { FiStopCircle, FiMic } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import useRecorder from "../hooks/useRecorder";

export default function AudioRecorder({ onCompleteRecording }) {

    const { recorderState, ...handlers } = useRecorder()
    const { blobURL } = recorderState
    const [borderWidth, setBorderWidth] = useState(10)
    const controls = useAnimation()


    useEffect(() => {
        if (recorderState.blobURL) {
            onCompleteRecording(recorderState.blob)
        }
    }, [recorderState.mediaStream])

    const startAnimate = async () => {
        // Generate a random number between 10 and 50
        setBorderWidth(Math.random() * (500 - 50) + 50)
        await controls.start({
            borderWidth: borderWidth,
            transition: {
                duration: 1,
                type: "spring",
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeIn"
            }
        })
    }

    const stopAnimate = async () => {
        setBorderWidth(15)
        controls.stop()
    }

    useEffect(() => {
        if (recorderState.isRecording) {
            startAnimate()
        } else {
            stopAnimate()
        }
    }, [recorderState.isRecording])

    return (
        <>
            <motion.div className="bg-circle" initial={{ borderWidth: borderWidth }} animate={controls}></motion.div>
                <motion.div className='centered'>
                    <div className="flex justify-center flex-center scale-150">
                    <FiMic className='text-white' size={50}/>
                    </div>
                </motion.div>
            {/* <div className="flex flex-col justify-center items-center">
                <motion.div className="self-center"
                    initial={{ borderWidth: borderWidth,  }}
                    style={{ boxSizing: "border-box", borderRadius: "50%", padding: 10, borderColor: "#F87171" }}
                    animate={controls}
                >
                    {
                        !recorderState.initRecording ? (
                            <div className="w-auto h-auto bg-white rounded-full p-5">
                                <button className="w-36 h-36 rounded-full bg-red-600 flex justify-center items-center text-white" onClick={handlers.startRecording}>
                                    <FiMic color="text-white" size={50} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-auto h-auto bg-white rounded-full p-5 ml-1">
                                <button className="w-36 h-36 rounded-full bg-red-600 flex justify-center items-center text-white" onClick={handlers.saveRecording}>
                                    <FiStopCircle color="text-white" size={50} />
                                </button>
                            </div>
                        )
                    }
                </motion.div>
            </div> */}
        </>

    )
}