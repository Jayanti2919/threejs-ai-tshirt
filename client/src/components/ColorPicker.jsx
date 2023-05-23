import React from 'react'
import {SketchPicker} from 'react-color'
import { useSnapshot } from 'valtio' 

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full margin-3'>
      <SketchPicker 
        color={snap.color}
        disableAlpha
        onChange={(color)=>{state.color = color.hex}}
        presetColors={['#fff0', '#ccc', '#03ecfc', '#33cca1', '#d10042', '#171616', '#EFBD48']}
      />
    </div>
  )
}

export default ColorPicker