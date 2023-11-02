import React, { useState, useEffect } from 'react'
import './Home.css'
import AudioRecorder from '../components/audio_recorder';
import { FiRefreshCcw, FiCloudOff, FiAward } from "react-icons/fi"
import { socket } from "../socket"
import msgpack from "msgpack-lite"
import { Howl } from "howler"
import { easeIn, motion } from "framer-motion"
import LineAnime from '../components/line_animations';

export default function Home() {
    const [audioData, setAudioData] = useState(null);
    const [connected, setIsConnected] = useState(false)
    const [volume, setVolume] = useState(0.5);

    function receiveAudioFile(blob) {
        // console.log('received audio blob')
        // // Convert the blob to an ArrayBuffer
        const fileReader = new FileReader()
        fileReader.onload = (event) => {
            try {
                console.log('sending audio file url', event.target.result)
                const arrayBuffer = arrayBufferToBase64(event.target.result)
                const msgBuffer = msgpack.encode({ "audio": arrayBuffer, "name": 'test' })
                const msgBufferStr = arrayBufferToBase64(msgBuffer)
                console.log('audio sample rate', blob.sampleRate)
                socket.emit('stream-audio', msgBufferStr)
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

    function base64ToArrayBuffer(data) {
        const binaryString = window.atob(data);
        const bytes = new Uint8Array(binaryString.length);
        return bytes.map((byte, i) => binaryString.charCodeAt(i));
    }

    useEffect(() => {
        if (audioData) {
            const audioContext = new AudioContext()
            const audioBuffer = audioContext.createBuffer(1, audioData.length, audioContext.sampleRate)
            audioBuffer.copyToChannel(new Float32Array(audioData), 0)
            const audioSource = audioContext.createBufferSource()
            audioSource.buffer = audioBuffer

            // Create a gain node to control volume
            const gainNode = audioContext.createGain();
            gainNode.gain.value = volume; // Set the volume here

            audioSource.connect(gainNode);
            gainNode.connect(audioContext.destination)
            // audioSource.start()
        }
    }, [audioData])

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

        function onRtcResponse(data) {
            console.log("We got a web rtc response", data)
        }

        function onAudioResponse(data) {
            // Convert the base64 string to an ArrayBuffer
            const arrayBuffer = base64ToArrayBuffer(data)
            // Get audio blob
            const audioBlob = new Blob([arrayBuffer])
            // Get URL
            const audioBlobUrl = URL.createObjectURL(audioBlob)

            var response = new Howl(
                {
                    src: [audioBlobUrl],
                    volume: volume,
                    format: "ogg",
                    onloaderror: function (error) {
                        console.log("error loading audio", error)
                    }
                }
            )

            response.once('load', () => {
                response.play()
            })

            response.on('end', () => {
                console.log("Finished playing")
            })
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('audioResponse', onAudioDetails)
        socket.on('audio_response', onAudioResponse)
        socket.on('rtcResponse', onRtcResponse)
        socket.on('transcriptionResult', onTranscribeComplete)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('audioDetails', onAudioDetails)
        }
    }, [])

    const numLines = 130;

    return (
        <div className="home">
            <div className="h-full flex justify-center items-center relative">
                <div className='absolute flex flex-col justify-center top-10 items-center' >
                    
                        <FiAward color='black' size={48} className='mb-3'/>
                        <span>
                            <h2 className='text-2xl text-bold text-center'>SocialXAI</h2>
                            <p className='text-center px-3'>Have a chat with our interactive Voice Assistant</p>
                        </span>
                    
                    
                </div>
                <div className="flex justify-center  items-center">
                    <LineAnime numLines={numLines} duration={0.3} />
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "44%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "150px",
                        height: "150px",
                        backgroundColor: "red", // Change the button's background color
                        borderRadius: "50%",
                        border: "solid 10px #333", // Change the button's border
                    }}
                    className="flex justify-center items-center">
                        {
                            connected ?
                                <AudioRecorder onCompleteRecording={receiveAudioFile} />
                                :
                                <div className='flex h-full w-full flex-col justify-center items-center'>
                                    <FiCloudOff color='white' size={49}  />
                                </div>
                        }
                </div>
            </div>
        </div>
    )
}

{/* {
                                    connected ? (
                                        <AudioRecorder onCompleteRecording={receiveAudioFile} />
                                    ) : (
                                        <div className='flex flex-col justify-center items-center'>
                                            <FiCloudOff color='black' size={49} className='mb-5' />
                                            <h1 className='text-xl font-medium'>Not connected</h1>
                                            <p className='mb-5 text-gray-600'>Sorry it seems we lost connection, this is on us. Please try reconnecting</p>
                                            <button className='bg-black rounded-md px-4 py-2 text-white flex items-center' onClick={() => socket.connect()}>
                                                <span><FiRefreshCcw color='white' size={49} className='pr-5' /></span>
                                                Retry connection
                                            </button>
                                        </div>
                                    )
                                } */}


