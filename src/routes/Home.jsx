import React, { useState, useEffect } from 'react'
import './Home.css'
import AudioRecorder from '../components/audio_recorder';
import { socket } from "../socket"


export default function Home() {
    // const [file, setFile] = useState(null)
    const [connected, setIsConnected] = useState(false)
    const chunkSize = 1024 * 1024; // 1MB

    // Handle file audio file select
    const receiveAudioFile = (file) => {
        console.log('sending file to server', file)
        sendBlobInChunks(file)
    }

    useEffect(() => {
        socket.connect();

        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        function onTranscribeComplete(data) {
            console.log('received transcription results')
            console.log(data)
        }

        function onAudioDetails(data) {
            console.log('received audio details')
            console.log(data)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('audioDetails', onAudioDetails)
        socket.on('transcriptionResults', onTranscribeComplete)
        
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('audioDetails', onAudioDetails)
        }
    }, [])

    function sendBlobInChunks(file) {
        let offset = 0

        function readChunk() {
            const chunk = file.slice(offset, offset + chunkSize)
            offset += chunkSize

            if(chunk.size > 0) {
                const reader = new FileReader()

                reader.onload = (e) => {
                    const chunkData = e.target.result
                    print("chunk data", chunkData)

                    socket.emit('audio-details', {
                        "chunk": chunkData,
                        "blob-name": new Date().toISOString(),
                    })

                    if(offset < file.size) {
                        // read and send the next chunk
                        readChunk()
                    }
                }

                reader.readAsArrayBuffer(chunk)
            }
        }
        readChunk()
    }
    
    return (
        <div className="home">
            <div className="h-full flex justify-center">
                <div className="container h-full">
                    <div className="h-full flex flex-col justify-center items-center">
                        <div className="flex flex-row">
                            <div className="ml-2 flex items-center">
                                {
                                    connected ? (
                                        <AudioRecorder onCompleteRecording={receiveAudioFile} />
                                    ) : (
                                        <div></div>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

