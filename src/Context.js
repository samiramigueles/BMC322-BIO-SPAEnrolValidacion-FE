import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [dniInfo, setDniInfo] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [optionProcess, setOptionProcess] = useState(null);
    const [uuid, setUIID] = useState(null);
    const [openExitModal, setOpenExitModal] = useState(false);
    const [idxID, setIdxId] = useState(null);
    const [frontDni, setFrontDni] = useState(null);
    const [backDni, setBackDni] = useState(null);

    const providerValue = {
        userInfo,
        setUserInfo,
        dniInfo,
        setDniInfo,
        selfie,
        setSelfie,
        optionProcess,
        setOptionProcess,
        uuid,
        setUIID,
        openExitModal,
        setOpenExitModal,
        setIdxId,
        idxID,
        frontDni,
        setFrontDni,
        backDni,
        setBackDni,
    };

    return (
        <GlobalContext.Provider value={providerValue}>
            {children}
        </GlobalContext.Provider>
    );
};
