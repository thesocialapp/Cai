import React from "react"
import { FiPlayCircle, FiPauseCircle, FiMic } from "react-icons/fi"

export default function RecorderBtn({ ref, onClick }) {
    return (
        <button onClick={onClick} className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center">
            {state == 'recording' ?
                <FiPauseCircle color="white" size={25} /> : state == 'paused' ? <FiPlayCircle color="white" size={25} /> : <FiMic color="white" size={25} />}
        </button>
    )
}