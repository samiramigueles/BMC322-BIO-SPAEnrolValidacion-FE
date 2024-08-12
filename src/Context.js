import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error(
            "Error de contexto: useGlobalContext debe usarse dentro de un GlobalProvider"
        );
    }
    return context;
};

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
