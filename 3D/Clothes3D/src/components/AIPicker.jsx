import React from 'react'
import CustomBtn from './CustomBtn';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    return (
        <div className="aipicker-container">
            <textarea
                placeholder="Ask AI..."
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="aipicker-textarea"
            />
            <div className="flex flex-wrap gap-3">
                {generatingImg ? (
                    <CustomBtn
                        type="outline"
                        title="Asking AI..."
                        customStyles="text-xs"
                    />
                ) : (
                    <>
                        <CustomBtn
                            type="outline"
                            title="AI Logo"
                            handleClick={() => handleSubmit('logo')}
                            customStyles="text-xs"
                        />

                        <CustomBtn
                            type="filled"
                            title="AI Full"
                            handleClick={() => handleSubmit('full')}
                            customStyles="text-xs"
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default AIPicker