
import { useEffect, useState, useRef } from "react"
import { startRecording, saveRecording } from "../handlers/recorder-controls"


const initialState = {
    isRecording: false,
    blobURL: null,
    blob: null,
    error: null,
    loadedConverter: false,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null,
    recordingMinutes: 0,
    recordingSeconds: 0,
}

export default function useRecorder() {
    const [recorderState, setRecorderState] = useState(initialState)

    // handle the recording timer
    useEffect(
        () => {
            const MAX_RECORDING_TIME = 30
            let interval = null

            if(recorderState.initRecording) {
                interval = setInterval(() => {
                    if(recorderState.recordingSeconds === 59) {
                        setRecorderState(prevState => {
                            if(prevState.recordingMinutes === MAX_RECORDING_TIME 
                                && prevState.recordingSeconds === 0) {
                                clearInterval(interval)
                                return prevState
                            } 
                            if(prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59) {
                                return {
                                    ...prevState,
                                    recordingSeconds: prevState.recordingSeconds + 1,
                                }
                            } else {
                                return {
                                    ...prevState,
                                    recordingMinutes: prevState.recordingMinutes + 1,
                                    recordingSeconds: 0,
                                }
                            }
                        })
                    } else {
                        setRecorderState(prevState => ({
                            ...prevState,
                            recordingSeconds: prevState.recordingSeconds + 1,
                        }))
                    }
                }, 1000)
                return () => clearInterval(interval)
            } else {
                clearInterval(interval)
            }
        },
    [])

    // handle the media recorder
    useEffect(() => {
        if(recorderState.mediaStream) {
            const audioCtx = new AudioContext()
            const analyser = audioCtx.createAnalyser()
            analyser.fftSize = 2048
            const source = audioCtx.createMediaStreamSource(recorderState.mediaStream)
            source.connect(analyser)
            const data = new Uint8Array(analyser.frequencyBinCount)
            
            setRecorderState(prevState => ({
                ...prevState,
                analyserCanvas: data,
                mediaRecorder: new MediaRecorder(prevState.mediaStream),
            }))
        }
    }, [recorderState.mediaStream])

    useEffect(() => {
        const recorder = recorderState.mediaRecorder
        let chunks = []

        if(recorder && recorder.state === "inactive") {
            recorder.start()
            recorder.ondataavailable = e => {
                // console.log(e.data)
                chunks.push(e.data)
            }
            recorder.onstop =  () => {
                /// Set it as mp3
                const blob = new Blob(chunks, { type: "audio/ogg" })
                chunks = []

                console.log(blob)
                
                setRecorderState(prevState => {
                    if(prevState.mediaRecorder) {
                        return {
                            ...initialState,
                            blobURL: window.URL.createObjectURL(blob),
                            blob: blob,
                        }
                    } else {
                        return initialState
                    }
                })
            }
        }
        return () => {
            if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
        }
    }, [recorderState.mediaRecorder])
    return {
        recorderState,
        startRecording: () => startRecording(setRecorderState),
        cancelRecording: () => setRecorderState(initialState),
        saveRecording: () => saveRecording(recorderState.mediaRecorder),
    }
}