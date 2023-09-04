import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store';

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);
    useFrame((state, delta) =>{
        const isBreakpoint =window.innerWidth <= 1260;
        const isBMobile =window.innerWidth <= 600;

        //set the initial position
        let targetPosition = [-0.4, 0, 2];
        if(snap.intro){
            if(isBreakpoint) targetPosition = [0, 0, 2];
            if(isBMobile) targetPosition = [0, 0.7, 2.5];
        }else{
            if(isBMobile) targetPosition =[0, 0, 2.5];
            else targetPosition = [0, 0, 2];
        }
        //set module camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta)
        //set the model movement smoothly
        easing.damp2(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x /5, 0],
            0.25, delta
        )
    })
    return <group ref={group}>{children}</group>
}

export default CameraRig