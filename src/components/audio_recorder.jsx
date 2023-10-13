import React, { useEffect, useRef } from "react";
import { FiPause, FiStopCircle, FiMic } from "react-icons/fi";
import useRecorder from "../hooks/useRecorder";

export default function AudioRecorder({ onCompleteRecording }) {
    const { recorderState, ...handlers } = useRecorder()
    const analyserCanvas = useRef(null)
    const { audio, blob, blobURL } = recorderState

    useEffect(() => {
        if(recorderState.blobURL) {
            onCompleteRecording(recorderState.blob)
        }
    }, [recorderState])

    return (
        <div className="flex flex-col justify-center items-center">
            {
                blobURL != null ? (
                    <div className="flex flex-col">

                        <div className="w-auto h-auto bg-white rounded-md flex flex-col p-5 mb-5">
                            <div className="flex justify-center items-center">
                                <audio src={blobURL} controls />
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <div className="self-center" 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}>
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
            </div>
        </div>
    )
}