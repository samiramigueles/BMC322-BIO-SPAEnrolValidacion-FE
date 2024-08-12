import React, { useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../../Context";
import { validationStep } from "../../utils/validationSteps";
import classes from "./index.module.scss";
import { CheckMicroblink } from "../../../public/assets";
import Image from "next/image";
import {
    CANVAS_DOCUMENT_FOUND,
    CANVAS_DOCUMENT_NOT_FOUND,
    CANVAS_DOCUMENT_PASSED,
    ID_CARD_RATIO,
} from "../../enums/document";

import { Button } from "@mui/material";
import { trackEvent } from "utils/ga";

function DocSdk({ step, setStep, setErrMsg, docSdkLicence }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const { setFrontDni, setBackDni } = useGlobalContext();

    const [feedbackMsg, setFeedbackMessage] = useState("Cargando...");
    const [dniSuccess, setDniSuccess] = useState(false);
    const [isWasmLoaded, setWasmLoaded] = useState(false);
    const [cameraStarted, setCameraStarted] = useState(false);

    const [timer, setTimer] = useState(0);
    const dc = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentCaptureStep, setCurrentCaptureStep] = useState(1);

    let searchForDocumentTimeout = null;
    let loadDocModuleTimeout = null;
    let startIdDetectorTimeout = null;

    const startTime = () => {
        const timerId = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);

            if (timer === 15) {
                clearInterval(timerId);
            }
        }, 1000);
    };

    const createInstaceDc = () => {
        const { Daon } = window;
        dc.current = new Daon.DocumentCapture({
            width: 1920,
            height: 1080,
            rejectLowResolutionCameras: true,
            facingMode: "environment",
            debugMode: false,
        });

        loadDocModule();
        startCamera();
    };

    const loadDocModule = () => {
        dc.current.loadWasmModules({
            urlIDDetectorWasm: window.location.origin + "/DaonIDCapture.wasm",
            onIDModuleInited: ({ isLoaded, error }) => {
                setWasmLoaded(isLoaded);
                if (error) {
                    loadDocModuleTimeout = setTimeout(() => {
                        loadDocModule();
                    }, 5000);
                }
            },
            shouldSaveUnprocessed: true,
        });
    };

    const startCamera = () => {
        setErrorMessage("");
        setCanvasDimensions();
        dc.current
            .startCamera({
                targetVideo: videoRef.current,
                overlayCanvas: canvasRef.current,
                aspectRatio: ID_CARD_RATIO,
                overlayBackground: "rgba(0,0,0,0.0)",
            })
            .then(() => {
                setCameraStarted(true);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    const setCanvasDimensions = () => {
        const { clientWidth, clientHeight } =
            document.querySelector("#video-container");
        if (videoRef.current) {
            videoRef.current.width = clientWidth;
            videoRef.current.height = clientHeight;
        }
        if (canvasRef.current) {
            canvasRef.current.width = clientWidth;
            canvasRef.current.height = clientHeight;
        }
    };

    const startIdDetector = () => {
        dc.current.startIDDetector({
            onIDDetectorInitialized: (error) => {
                if (error) {
                    startIdDetectorTimeout = setTimeout(() => {
                        startIdDetector();
                    }, 5000);
                } else {
                    startTime();
                    dc.current.searchForDocument(ID_CARD_RATIO);
                }
            },
            onIDDetectorError: (coordinates, err, qualityScore) => {
                switch (err.code) {
                    case 900: {
                        setFeedbackMessage("Escaneando...");
                        dc.current.setStrokeStyle(
                            CANVAS_DOCUMENT_PASSED,
                            ID_CARD_RATIO
                        );
                        break;
                    }

                    case 910: {
                        if (step === validationStep.FRENTE_DNI) {
                            setFeedbackMessage("Acercá el frente de tu DNI");
                        } else if (step === validationStep.DORSO_DNI) {
                            setFeedbackMessage("Acercá el dorso de tu DNI");
                        }

                        dc.current.setStrokeStyle(
                            CANVAS_DOCUMENT_NOT_FOUND,
                            ID_CARD_RATIO
                        );
                        break;
                    }
                    default: {
                        if (step === validationStep.FRENTE_DNI) {
                            setFeedbackMessage("Acercá el frente de tu DNI");
                        } else if (step === validationStep.DORSO_DNI) {
                            setFeedbackMessage("Acercá el dorso de tu DNI");
                        }
                        dc.current.setStrokeStyle(
                            CANVAS_DOCUMENT_FOUND,
                            ID_CARD_RATIO
                        );
                        break;
                    }
                }

                searchForDocumentTimeout = setTimeout(() => {
                    dc.current.searchForDocument(ID_CARD_RATIO);
                }, 100);
            },
            onIDDetection: (
                documentImage,
                coordinates,
                qualityScore,
                unprocessedImage
            ) => {
                let documentImages = {};
                if (unprocessedImage) {
                    documentImages = { unprocessedImage };
                }
                if (documentImage && documentImage !== "data:") {
                    if (step === validationStep.FRENTE_DNI) {
                        documentImages = {
                            ...documentImages,
                            frontDni: documentImage,
                        };
                        trackEvent({
                            category: "Captura",
                            action: "enr_captura_dni_frente",
                            value: timer,
                        });
                        setFrontDni(documentImage);
                    } else if (step === validationStep.DORSO_DNI) {
                        documentImages = {
                            ...documentImages,
                            backDni: documentImage,
                        };
                        trackEvent({
                            category: "Captura",
                            action: "enr_captura_dni_dorso",
                            value: timer,
                        });
                        setBackDni(documentImage);
                    }

                    // LA FOTO SE SACO SATIFACTORIAMENTE
                    // Actualizar el paso actual de la captura

                    if (step === validationStep.FRENTE_DNI) {
                        setDniSuccess(true);
                    } else if (step === validationStep.DORSO_DNI) {
                        setStep(validationStep.SELFIE);
                    }
                } else {
                    searchForDocumentTimeout = setTimeout(() => {
                        dc.current.searchForDocument(ID_CARD_RATIO);
                    }, 500);
                }
            },
            nPassedFrames: 5,
            downloadFrames: false,
        });
    };

    useEffect(() => {
        console.log("Esto es timer", timer);
        if (timer >= 15) {
            console.log("Llego a 15");
            trackEvent({
                category: "Reintento",
                action: "enr_frente_reintentar",
                value: timer,
            });
            setStep(validationStep.ERROR);
            setErrMsg(400);
            setTimer(0);
        }
    }, [timer]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            createInstaceDc();
        }

        return () => {
            if (searchForDocumentTimeout)
                clearTimeout(searchForDocumentTimeout);
            if (loadDocModuleTimeout) clearTimeout(loadDocModuleTimeout);
            if (startIdDetectorTimeout) clearTimeout(startIdDetectorTimeout);
            if (dc.current) {
                dc.current.stopCamera();
                dc.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (cameraStarted && isWasmLoaded) {
            startIdDetector();
        }
    }, [cameraStarted, isWasmLoaded]);

    const handleClickTakeBackId = () => {
        trackEvent({
            category: "Button",
            action: "enr_inicio_dni_dorso",
            value: timer,
        });
        setStep(validationStep.DORSO_DNI);
        setCurrentCaptureStep((prevStep) => prevStep + 1);
        setDniSuccess(false);
    };

    if (dniSuccess) {
        return (
            <>
                <Image alt="check" src={CheckMicroblink} height={"50px"} />

                <Button
                    color={"secondary"}
                    fullWidth
                    onClick={() => handleClickTakeBackId()}
                    variant="contained"
                    className={classes.button}
                >
                    Tomar dorso DNI
                </Button>
            </>
        );
    } else {
        return (
            <div className={classes["dni-screen-scanning"]}>
                <div
                    className={
                        step === validationStep.FRENTE_DNI
                            ? classes["videoContainer"]
                            : `${classes["videoContainer"]} ${classes["flip"]}`
                    }
                    id="video-container"
                >
                    <video ref={videoRef} id="dni-feed" playsInline></video>
                </div>

                <canvas
                    ref={canvasRef}
                    className={classes["dni-feedback"]}
                ></canvas>

                <p className={classes["camera-dni-guides"]}>
                    <span style={{ background: "#24224F", fontSize: "0.8em" }}>
                        {feedbackMsg}
                    </span>
                </p>
            </div>
        );
    }
}

export default DocSdk;
