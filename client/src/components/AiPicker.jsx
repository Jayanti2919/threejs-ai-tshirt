import React from 'react'
import CustomButton from './CustomButton'

const AiPicker = ({ prompt, setprompt, generatingImg, handleSubmit }) => {
  return (
    <div className='aipicker-container'>
      <textarea 
        placeholder='Ask AI'
        rows={5}
        value={prompt}
        onChange={(e)=>{setprompt(e.target.value);}}
        className='aipicker-textarea'
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton 
            type="outline"
            title="Asking AI..."
            customStyle="text-xs"
          />
        ): (
          <>
          <CustomButton
            type="outline"
            title="AI Logo"
            handleClick={()=>handleSubmit('logo')}
            customStyle="text-xs"
          />

          <CustomButton
            type="filled"
            title="AI Full"
            handleClick={()=>handleSubmit('full')}
            customStyle="text-xs"
          />
          </>
        )}
      </div>
    </div>
  )
}

export default AiPicker