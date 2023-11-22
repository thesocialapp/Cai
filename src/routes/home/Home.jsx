
import React from 'react'
import './index.css'

export default function Home() {
    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file as needed
        console.log('Selected file:', selectedFile);
      };

    return (
        <div className='h-screen w-screen home'>
            <div className="flex h-full md-flex-row lg-flex-row sm-flex-col p-5">
                <div className="flex-1 h-full p-4 ">
                    <h3 className='text-lg text-black'>Setup</h3>
                    <p className='text-sm text-gray-600'>Initial set up for the Chat Bot</p>
                    {/* A simple form */}
                    <form className="flex flex-col mt-5">
                        <div className='my-1 flex flex-col'>
                            <label htmlFor="name" className="text-sm mb-1">Name</label>
                            <input type="text" name="name" id="name" placeholder='Name of the Chat bot' className="bg-blue-100 p-2 rounded-lg focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className='my-1 flex flex-col'>
                            {/* Text area for the description */}
                            <label htmlFor="description" className="text-sm mb-1">Description</label>
                            <textarea name="description" id="description" placeholder='Description of the Chat bot' className="bg-blue-100 p-2 rounded-lg focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className='my-1 flex flex-col'>
                            {/* Base information for the bot system. To ensure the bot keeps context. Should be a textarea */}
                            <label htmlFor="base" className="text-sm mb-1">Base</label>
                            <textarea name="base" id="base" placeholder='Base information for the bot system. To ensure the bot keeps context.' className="bg-blue-100 p-2 rounded-lg focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className='my-1 flex flex-col'>
                            {/* fallback information for the bot system. Incase it fails*/}
                            <label htmlFor="fallback" className="text-sm mb-1">Fallback message</label>
                            <textarea name="base" id="base" placeholder='Fallback message to the user incase the bot fails' className="bg-blue-100 p-2 rounded-lg focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className='my-1 flex flex-col'>

                        </div>
                        {/* Button for submitting */}
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-5">Submit</button>
                        </form>
                </div>
                <div className="flex-1 h-full p-4 bg-red-300">
                    <img src="https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/52.png?sfvrsn=8623746_1" alt="Covid-19" className="w-full"/>
                </div>
            </div>
        </div>
    )
}
