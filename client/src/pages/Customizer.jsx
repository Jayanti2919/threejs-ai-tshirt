import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import {download} from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

import { AiPicker, ColorPicker, FilePicker, CustomButton, Tab } from '../components'

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setfile] = useState('')
  const [prompt, setprompt] = useState('')
  const [generatingImg, setgeneratingImg] = useState(false)

  const [activeEditorTab, setactiveEditorTab] = useState('')
  const [activeFilterTab, setactiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })


  const generateTabContent = () => {
    switch(activeEditorTab){
      case "colorpicker":
        return <ColorPicker />
      
      case "filepicker":
        return <FilePicker 
          file={file}
          setfile={setfile}
          readFile={readFile}
        />

      case "aipicker":
        return <AiPicker
          prompt={prompt}
          setprompt={setprompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />

      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("No prompt entered. Please enter something!")

    try{
      setgeneratingImg(true)
      console.log(prompt)
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method:'POST',
        headers: {
          'Content-Type': "application/json", 
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch(error){
      alert(error)
    } finally{
      setgeneratingImg(false);
      setactiveEditorTab("");
    }
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setactiveEditorTab("");
      })
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleactiveFilterTab(decalType.filterTab)
    }
  }

  const handleactiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setactiveFilterTab((prevState)=>{
      return {
        ...prevState,
      [tabName] : !prevState[tabName]
      }
    })

  }

  return (
    <AnimatePresence
    >
      {!snap.intro && (
        <>
        <motion.div
          key="custom"
          className='absolute z-10 left-0 top-0'
          {...slideAnimation("left")}
        >
          <div className='flex items-center min-h-screen '>
            <div className='editortabs-container tabs'>
              {EditorTabs.map((tab)=>(
                <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={()=>{activeEditorTab==='' ? setactiveEditorTab(tab.name) : setactiveEditorTab('')}}
                />
              ))}

              {generateTabContent()}
            </div>

          </div>
        </motion.div>
        <motion.div
          className='absolute top-5 z-10 right-5 '
          {...fadeAnimation}
        >
          <CustomButton 
          type="filled" 
          title="Go Back" 
          handleClick={()=>{state.intro=true}}
          customStyle="w-fit px-4 py-2.5 font-bold text-sm"
          />
        </motion.div>

        <motion.div 
          className='filtertabs-container'
          {...slideAnimation("up")}
        >
              {FilterTabs.map((tab)=>(
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={()=>handleactiveFilterTab(tab.name)}
                />
              ))}

        </motion.div>
        </>
      )}

    </AnimatePresence>
  )
}

export default Customizer