import React from 'react'
import { CustomBtn } from '../components';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';


const Home = () => {
    const snap = useSnapshot(state);
    return (
        <div>
            <AnimatePresence>
                {snap.intro &&(
                    <motion.div className='home' {...slideAnimation('left')}>
                        <motion.header {...slideAnimation('down')}>
                        </motion.header>
                        <motion.div className='home-content' {...headContainerAnimation}>
                            <motion.div {...headTextAnimation}>
                                <h1 className='head-text'>
                                    LET'S<br className='xl:block hidden'/> GET IT
                                </h1>
                            </motion.div>
                            <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                                <p className='max-w-md font-normal text-grey-600 text-base'>
                                    Create your dream <strong>T</strong> with our amazing <strong>3D</strong> customization tool.
                                    <strong> Unleash your imagination</strong>{" "} and define own style.
                                </p>
                                <CustomBtn 
                                    type="filled"
                                    title="Customize it"
                                    handleClick={() => state.intro = false}
                                    customStyles="w-fit px-4 py-2.5 font bold text-sm"
                                />
                            </motion.div> 
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Home