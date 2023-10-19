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
    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImage, setGeneratingImage] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })
    //show tab content depending the active tab
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "aipicker":
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImage={generatingImage}
                    handleSubmit={handleSubmit}
                />
            default:
                return null;
        }
    }
    const handleSubmit = async (type) => {
        if (!prompt) return alert("Please enter a prompt");

        try {
            setGeneratingImage(true);

            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                })
            })

            const data = await response.json();

            handleDecals(type, `data:image/png;base64,${data.photo}`)
        } catch (error) {
            alert(error)
        } finally {
            setGeneratingImage(false);
            setActiveEditorTab("");
        }
    }

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }
    const handleActiveFilterTab = (tabName) => {
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

        // after setting the state, activeFilterTab is updated

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = (type) => {
        reader(file)
            .then((result) => {
                handleDecals(type, result);
                setActiveEditorTab("");
            })
    }
    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => setActiveEditorTab(tab.name)}
                                    />
                                ))}
                                {generateTabContent()}
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
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isActiveTab={activeFilterTab[tab.name]}
                                isFilterTab
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer