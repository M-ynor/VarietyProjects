import React, { useEffect, useState } from 'react';
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";
import config from "../config/config";
import snap from "../store";
import state from '../store';
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { download } from "../assets"
import { fadeAnimation, slideAnimation } from "../config/motion";
import { FilePicker, Tab, ColorPicker, AIPicker, CustomBtn } from "../components/index";
const Customizer = () => {
    const snap = useSnapshot(state);
    return (
        <AnimatePresence>
            {!snap.intro &&(
                <>
                    <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => {}}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
                        <CustomBtn 
                            type="filled"
                            title="Go back"
                            handleClick={() => state.intro = true}
                            customStyles="w-fit  px-4  py-2.5 font bold text-sm"
                        />
                    </motion.div>
                    <motion.div className='filtertabs-container' {...slideAnimation("up")}>
                    {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        isActiveTab=""
                                        isFilterTab
                                        handleClick={() => {}}
                                    />
                                ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer