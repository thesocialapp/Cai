import React, { useState, useEffect } from 'react'
import './Home.css'
import AudioRecorder from '../components/audio_recorder';
import { FiRefreshCcw, FiCloudOff } from "react-icons/fi"
import { socket } from "../socket"
import msgpack from "msgpack-lite"


export default function Home() {
    
    const [connected, setIsConnected] = useState(false)


    function receiveAudioFile(blob) {
        // console.log('received audio blob')
        // // Convert the blob to an ArrayBuffer
        const fileReader = new FileReader()
        fileReader.onload = () => {
            try {
                const arrayBuffer = fileReader.result



                const str = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
                const msgBuffer = msgpack.encode({ "audio": str, "name": 'test' })
                const back = arrayBufferToBase64(msgBuffer)
                console.log(back)
                socket.emit('stream-audio', back)
            } catch (error) {
                console.log(error)
            }
        }
        fileReader.readAsArrayBuffer(blob)
    }

    function arrayBufferToBase64(arrayBuffer) {
        const binaryArray = new Uint8Array(arrayBuffer);
        const base64String = btoa(String.fromCharCode.apply(null, binaryArray));
        return base64String;
    }

    useEffect(() => {
        socket.connect();

        function  onConnect() {
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

        function onRtcResponse(data) {
            console.log("We got a web rtc response", data)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('audioResponse', onAudioDetails)
        socket.on('rtcResponse', onRtcResponse)
        socket.on('transcriptionResult', onTranscribeComplete)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('audioDetails', onAudioDetails)
        }
    }, [])



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
                                        <div className='flex flex-col justify-center items-center'>
                                            <FiCloudOff color='black' size={49} className='mb-5'/>
                                            <h1 className='text-xl font-medium'>Not connected</h1>
                                            <p className='mb-5 text-gray-600'>Sorry it seems we lost connection, this is on us. Please try reconnecting</p>
                                            <button className='bg-black rounded-md px-4 py-2 text-white flex items-center' onClick={() => socket.connect()}>
                                                <span><FiRefreshCcw color='white' size={49} className='pr-5'/></span>
                                                    Retry connection
                                                </button>
                                        </div>
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

