import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import state from '../store'

const CamerRig = ({ children }) => {
    const snap = useSnapshot(state);
    const group = useRef();

    
    useFrame((state, delta)=>{
        const isBreak = window.innerWidth <= 1200;
        const isMobile = window.innerWidth <= 1024;

        let targetPos = [-0.4, 0, 2]
        if(snap.intro) {
            if(isBreak) targetPos = [0,6,2];
            if(isMobile) targetPos = [0,0.2,2.5];
        } else {
            if(isMobile) targetPos = [0, 0, 2.5];
            else targetPos = [0,0,2];
        }

        easing.damp3(state.camera.position, targetPos, 0.25, delta)

        easing.dampE(
            group.current.rotation,
            [state.pointer.y/10, -state.pointer.x/5, 0],
            0.25,
            delta,
        )
    })

  return (
    <group ref={group}>{children}</group>
  )
}

export default CamerRig