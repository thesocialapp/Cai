export async function startRecording(setRecorderState) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setRecorderState(prevState => ({
            ...prevState,
            initRecording: true,
            blob: null,
            blobURL: null,
            mediaStream: stream,
        }))
    } catch(err) {
        console.log(err)
    }
}

export function saveRecording(recorder) {
    if(recorder.state !== "inactive") {
        recorder.stop()
    }
}