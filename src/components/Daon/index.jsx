import React, { useState, useContext, useRef, useEffect } from "react";
import classes from "./index.module.scss";
import { GlobalContext } from "../../Context";
import { validationStep } from "../../utils/validationSteps";
import { Box } from "@mui/material";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ReactGA from "react-ga4";

function DaonCapture({ setFeedbackMsg, setStep }) {
    const { setSelfie, idxID } = useContext(GlobalContext);
    const [accepted, setAccepted] = useState(false);
    const selfieFeed = useRef(null);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { Daon } = window;

            const configuration = {
                shouldCheckGyroscope: false,
                width: 1280,
                height: 720,
                thresholds: {
                    ThresholdInterEyesDistance: 150,
                },
                imageFormat: "image/jpeg"
            };

            const fc = new Daon.FaceCapture(configuration);

            fc.loadDFQModule({
                urlFaceDetectorWasm:
                    window.location.origin + "/DaonFaceQuality.wasm",
                onFaceModuleLoaded: ({ isLoaded, error }) => {
                    if (isLoaded) {
                        fc.startCamera(selfieFeed.current).then(() => {
                            selfieFeed.current.onloadedmetadata = () => {
                                startFaceDetector(fc);
                            };
                        });
                    }
                    if (error) {
                        setStep(validationStep.ERROR);
                        console.log(error);
                    }
                },
            });
        }
    }, [idxID]);

    const startProgressBar = () => {
        setPercent((prev) => Math.min(prev + 1, 10));
    };

    function startFaceDetector(fc) {
        fc.startFaceDetector({
            onFaceDetectorInitialized: function () {
                fc.findFace();
            },
            onFaceDetectorError: function (err) {
                setStep(validationStep.ERROR);
                console.log(err);
            },
            onFaceDetectorFeedback: function (detectorFeedbackObject) {
                if (detectorFeedbackObject.result === "PASS") {
                    setSelfie(detectorFeedbackObject);
                    const optionProcess = sessionStorage.getItem("optionProcess");
                    if (optionProcess === "E" || optionProcess === "W") {
                        ReactGA.event({
                            category: "Captura",
                            action: "enr_captura_selfie"
                        });
                    } else {
                        ReactGA.event({
                            category: "Captura",
                            action: "val_captura_selfie"
                        });
                    }

                    setPercent(10);

                    fc.pause();
                    fc.destroy();
                    setStep(validationStep.VALIDATING);

                } else {
                    setTimeout(() => {
                        fc.findFace();
                    }, 500);
                    handleFeedback(detectorFeedbackObject.feedback.message);
                }
            }
        }, {
            serverPublicKey: {
                e: "AQAB",
                kid: "QTAz-I6zsxxD2vKmEJbyxud-Mw",
                kty: "RSA",
                n: "r1TcIAGa5i6p5fPg9HHvH8Ru3F29nbr3LlTg2nQ8HGn134V5J50m-p9lCZOPKruuk19Nh8IQaSeLj3iGS2Wj5nlAFGTo-D-lcxYX6KtOD281aNLPCeCDESgP54rTpsqh-fLTwEE0ya1U3AJsB2kTuTBrAbONG620Kdos5pfl4EcFbOqpp7nrsx2JSwtA0ezWvMH5Pby-bd_lhXG0KNzPqasNjn9GkO_7Awg-GXU6vhZ7kCNApT6yVrLRPUaRhhZHS305uvk8JZXtA-5uo4tQV4ZtVftgnhYfcsL1Cu5WoKtXM6cXMM6ppzwptgi4LOCsC2b6DnoFitgIbeYod3yZ1w",
                use: "enc",
                x5c: ["MIIEPzCCAicCCQDklBMyh8PyDjANBgkqhkiG9w0BAQsFADBpMQswCQYDVQQGEwJVUzERMA8GA1UECBMIVmlyZ2luaWExDzANBgNVBAcTBlJlc3RvbjENMAsGA1UEChMERGFvbjESMBAGA1UECxMJSWRlbnRpdHlYMRMwEQYDVQQDEwppZHgtc3JwLWNhMB4XDTIxMTExMTAxMTI1MFoXDTMxMDgxMTAxMTI1MFowWjENMAsGA1UECgwERGFvbjESMBAGA1UECwwJSWRlbnRpdHlYMQswCQYDVQQGEwJJRTEoMCYGA1UEAwwfREVfREFPTl9BVVRIRU5USUNBVElPTl9EQVRBX0tFSzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK9U3CABmuYuqeXz4PRx7x/EbtxdvZ269y5U4Np0PBxp9d+FeSedJvqfZQmTjyq7rpNfTYfCEGkni494hktlo+Z5QBRk6Pg/pXMWF+irTg9vNWjSzwnggxEoD+eK06bKofny08BBNMmtVNwCbAdpE7kwawGzjRuttCnaLOaX5eBHBWzqqae567MdiUsLQNHs1rzB+T28vm3f5YVxtCjcz6mrDY5/RpDv+wMIPhl1Or4We5AjQKU+slay0T1GkYYWR0t9Obr5PCWV7QPubqOLUFeGbVX7YJ4WH3LC9QruVqCrVzOnFzDOqac8KbYIuCzgrAtm+g56BYrYCG3mKHd8mdcCAwEAATANBgkqhkiG9w0BAQsFAAOCAgEAHOaXY6w+f8z6+fRbnkwBBuMDwLsMd0/CfPxI26cWuR4UdxlZVbd9KQQgtwJr4COwOrt59YAymZdM8jNK19Q3TjbB12PW9Ld7m02Sf7bVZxNI9AmXpfzqxTsiRjNT4MG/hQ89uWrRUsUbs50rdw98/9aRsllO9TXNDMBvfdAKZByNm9BAC3Hp7lPc/OPhVS1t4C8ELWdo7RRcLfm70H8G2rCmagkJB2/voDTAttonnrBNsPwgHCRPMJvCfOkyWrPAwXbD7p+ih8LW4CHaF0OJZjNE7KN4/wBYqNJxzk9OY2Ky0upvhJtKmqQ3LgkBShv9t/gH5/zDoULx0RjgdCThv2Gf/Eer/iGpHCrFVVz78vqDkxRtQHQnLo7eBUiNuGZ935XeKYJiWKI3+bboFYMoNIOIch9udMVKTmwFar0RxN9cOqyil9VQBdGfqwH7MZpJLW0qDAg61f1ySH7uErxqcmQwV1FINc2BqIh8QH3iWqVrfkJPe4+Vzd6N+dL/O5RSB+ys6Ob9XIARODVXK8xo2hnuWRoMMslzqVG+SOV+/LDt8dx4BbSxTtaoxsUJo5dqHQVxzzLXfOWsd/i+5CSIZUpeXK9F0QDIRNjZgz+oDhAcVSveQEHnlL1G1VRrtpwy4acF+6ny3zTjr1UKd5THQRU4B5fEGpDtD/UEYOqd36Y="],
                "x5t#S256": "u5MGMkKz1A9tm0vAZlGk-veNCs_i6PGfe2DCWNCZ78o"
            },
            idxUserId: idxID
        });
    }

    function handleFeedback(message) {
        switch (message) {
            case "Face too small. Please move closer to camera":
                setFeedbackMsg("Por favor, acercate más a la cámara.");
                setPercent(0);
                setAccepted(false);
                break;
            case "Please center your face in the oval":
                setFeedbackMsg("Por favor, centrá tu cara en el círculo.");
                setPercent(0);
                setAccepted(false);
                break;
            case "Hold on for a few seconds":
                setFeedbackMsg("Permanecé quieto por unos segundos.");
                setAccepted(true);
                startProgressBar();
                break;
            default:
                setPercent(0);
                setFeedbackMsg("No se pudo encontrar un rostro.");
                setAccepted(false);
                break;
        }
    }

    return (
        <Box className={classes['containerCircularProgress']}>
            <CircularProgressbarWithChildren value={percent * 10} styles={{
                root: {},
                path: {
                    stroke: `#00a135`,
                    strokeLinecap: 'butt',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    transform: 'rotate(0.0turn)',
                    transformOrigin: 'center center',
                    strokeWidth: 3
                },
                trail: {
                    stroke: `#171b37`,
                    strokeLinecap: 'butt',
                    transform: 'rotate(0.0turn)',
                    transformOrigin: 'center center',
                    strokeWidth: 3
                },
            }}>
                <video ref={selfieFeed} id={"selfie-feed"} playsInline></video>
            </CircularProgressbarWithChildren>
        </Box>
    );
}

export default DaonCapture;
