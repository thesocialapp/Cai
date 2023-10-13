import React, {useRef, useState } from "react"

export default function Upload({ onAudioFileSelect }) {
    const fileInputRef = useRef(null)
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const startRecording = () => {
        console.log('start recording')
    }

    const handleFileSelect = () => {
        fileInputRef.current.click();
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDraggingOver(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDraggingOver(false);
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files[0];
        onAudioFileSelect(droppedFile)
        setIsDraggingOver(false)
    }



    return (
        <div
            className={`border-dashed border-2 ${isDraggingOver ? 'border-green-500' : 'border-gray-400'
                } p-5 m-5 rounded-md text-center cursor-pointer transition duration-300 ease-in-out`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
            />

            <button onClick={handleFileSelect}>Drag Audio File here or click</button>
        </div>
    )
}