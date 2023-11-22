
import React, { useState } from 'react'
import { FiCloud } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

export default function Home() {
    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file as needed
        console.log('Selected file:', selectedFile);
    };

    const steps = [
        'General Information',
        'Bot Information and Settings',
        'Uploads',
        'Summary'
    ]

    const [step, setStep] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('Submitted', step)
        setStep((prevStep) => prevStep + 1);
    }

    return (
        <div className='h-screen w-screen home'>
            <div className="flex h-full md-flex-row lg-flex-row sm-flex-col p-5">
                <div className="flex-1 h-full p-4 ">
                    <h3 className='text-lg text-black'>Setup</h3>
                    <p className='text-sm text-gray-600'>Initial set up for the Chat Bot</p>
                    {/* A simple form */}
                    
                        <AnimatePresence>
                            <motion.form
                                key={step}
                                initial={{ opacity: 0, x: '-100%' }}
                                animate={{ opacity: 1, x: '0%' }}
                                exit={{ opacity: 0, x: '100%' }}
                                transition={{ duration: 0.5, type: 'tween' }}
                                className='mx-auto w-full'
                                onSubmit={onSubmit}
                            >
                                <div className="shadow-md rounded-lg p-2">
                                    <h3 className='text-lg text-black'>{steps[step]}</h3>
                                    {
                                        step == 0 && (
                                            <>
                                                <div className='my-1 flex flex-col'>
                                                    <label htmlFor="name" className="text-sm mb-1 text-gray-500">Name</label>
                                                    <input type="text" name="name" id="name" placeholder='Name of the Chat bot' className="bg-gray-100 p-2 rounded-lg focus:outline-none focus:border-green-500" />
                                                </div>
                                                <div className='my-1 flex flex-col'>
                                                    {/* Text area for the description */}
                                                    <label htmlFor="description" className="text-sm mb-1 text-gray-500">Description</label>
                                                    <textarea name="description" id="description" placeholder='Description of the Chat bot' className="bg-gray-100 p-2 rounded-lg focus:outline-none focus:border-green-500" />
                                                </div>
                                            </>
                                        )
                                    }

                                    {
                                        step == 1 && (
                                            <>
                                                <h3 className='text-lg text-black'> Bot Info </h3>
                                                <div className='my-1 flex flex-col'>
                                                    {/* Base information for the bot system. To ensure the bot keeps context. Should be a textarea */}
                                                    <label htmlFor="base" className="text-sm mb-1 text-gray-500">Base</label>
                                                    <textarea name="base" id="base" placeholder='Base information for the bot system. To ensure the bot keeps context.' className="bg-gray-100 p-2 rounded-lg focus:outline-none focus:border-green-500" />
                                                </div>
                                                <div className='my-1 flex flex-col'>
                                                    {/* fallback information for the bot system. Incase it fails*/}
                                                    <label htmlFor="fallback" className="text-sm mb-1 text-gray-500">Fallback message</label>
                                                    <textarea name="base" id="base" placeholder='Fallback message to the user incase the bot fails' className="bg-gray-100 p-2 rounded-lg focus:outline-none focus:border-green-500" />
                                                </div>
                                                <div className='my-1 flex flex-col'>
                                                    <p className='text-sm text-gray-500'>Uploads</p>
                                                    <div className="flex flex-row">
                                                        
                                                        
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        step == 2 && (
                                            <>
                                                <div className="bg-gray-100 w-full h-100 rounded-lg p-2 m-1">
                                                    <label htmlFor="file" className='text-sm text-gray-500'>Upload documents</label>
                                                    <div className="flex flex-col items-center justify-center border-dashed border-2 focus:border-green-900 rounded-lg mt-2">
                                                        <FiCloud className='text-6xl text-green-600' />
                                                        <p className='text-sm text-green-700 mb-4'>Drag and drop or click to upload</p>
                                                    </div>
                                                    <input type="file" name="file" id="file" className="hidden" onChange={handleFileInputChange} />
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        step == 3 && (
                                            <>
                                                <div className="bg-gray-100 w-full h-100 rounded-lg p-2 m-1">
                                                            <label htmlFor="logo" className='text-sm text-gray-500'>Upload bot logo</label>
                                                            <div className="flex flex-col items-center justify-center border-dashed border-2 focus:border-green-900 rounded-lg mt-2">
                                                                <FiCloud className='text-6xl text-green-600' />
                                                                <p className='text-sm text-green-700 mb-4'>Drag and drop your logo</p>
                                                            </div>
                                                            <input type="file" name="logo" id="logo" className="hidden" onChange={handleFileInputChange} />
                                                        </div>
                                            </>
                                        )
                                    }
                                </div>
                                <button type='submit' className='"bg-green-500 inline text-white p-2 rounded-lg mt-5'>
                                    { step == steps.length ? 'Submit' : 'Next' }
                                </button>
                            </motion.form>
                        </AnimatePresence>                      
                   
                </div>
                <div className="flex-1 h-full p-4">
                    <div className="container h-full">
                        <div className="h-full w-full shadow-md rounded-lg">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
