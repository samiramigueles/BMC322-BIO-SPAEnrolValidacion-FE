import { useContext, useEffect, useState } from "react";

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Box, Grid, Icon, Typography } from "@mui/material";

import { LoadingValidated } from "../../../public/assets/index";

import classes from "./index.module.scss";

import Layout from "@components/Layout";
import axios from "axios";
import Lottie from "lottie-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { emit } from "utils/events/events";
import { GlobalContext } from "../../Context";
import { validationStep } from "../../utils/validationSteps";
function ValidateIdentity({ setStep, setErrMsg }) {

    const { selfie, frontDni, backDni, uuid, idxID } = useContext(GlobalContext);
    const [progress, setProgress] = useState(0);
    const [responseReceived, setResponseReceived] = useState(false);

    const generateImagesProcessValidation = () => {
        const selfieBase64 = selfie.faceImage;
        const selfieB64Data = selfieBase64.split(',')[1];

        return {
            selfie: selfieB64Data,
        }
    }


    const postProcessEnroll = async () => {
        const selfieBase64 = selfie.faceImage;
        const frontDniBase64 = frontDni.split(",")[1];
        const backDniBase64 = backDni.split(",")[1];
        const selfieB64Data = selfieBase64.split(',')[1];

        const body = {
            selfie: selfieB64Data,
            frontDni: frontDniBase64,
            backDni: backDniBase64,
            imageDni: frontDniBase64,
            uuid
        }

        try {
            const { data } = await axios.post("/api/processEnroll", { data: body });
            return data;
        } catch (e) {
            console.log("Error en process enroll", e);
        }
    }

    const postProcessValidation = async () => {
        const { selfie } = generateImagesProcessValidation();
        try {
            const { data } = await axios.post("api/processValidate", { idxID, selfie, uuid });
            return data;
        } catch (e) {
            //mandar a pantalla error
            console.log("error", e);
        }

    }

    const handleResponseReceived = () => {
        setResponseReceived(true);
        setProgress(100); // Establece el progreso en 100
    };


    useEffect(() => {
        const processOperation = sessionStorage.getItem("optionProcess");
        if (processOperation === "E" || processOperation === "W") {
            postProcessEnroll()
                .then((data) => {
                    if (!data) {
                        setStep(validationStep.ERROR);
                        return;
                    }

                    if (data?.error) {

                        emit("serverError", {
                            code: data.error.subcode
                        })
                        return;
                    }
                    handleResponseReceived();

                    window.location.href = 'https://www.macro.com.ar/eme2';


                    return;
                })
        } else {
            postProcessValidation()
                .then((data) => {
                    if (data?.Resultado === 1) {
                        handleResponseReceived();
                        window.location.href = 'https://www.macro.com.ar/eme2';
                    } else if (data?.Completado !== 0) {
                        emit("serverError", {
                            code: "500"
                        })
                        return
                    } else {
                        emit("serverError", {
                            code: data.error.subcode
                        })
                        return
                    }
                });

        }

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!responseReceived && progress < 100) {
                setProgress(progress + 100 / 25); // Ajusta la velocidad de llenado aquí
            }

        }, 1000);

        // Detener el intervalo después de 25 segundos (25000ms)
        setTimeout(() => {
            clearInterval(interval);
        }, 25000);

        return () => {
            clearInterval(interval); // Limpia el intervalo al desmontar el componente
        };
    }, [progress]);

    const milestones = [
        { percentage: 10, label: 'Enviando Datos' },
        { percentage: 30, label: 'Evaluando calidad' },
        { percentage: 50, label: 'Comprobando Liveness' },
        { percentage: 70, label: 'Consultando RENAPER' },
        { percentage: 90, label: 'Validando DNI | Selfie' },
        { percentage: 100, label: 'Finalizando' }
    ];

    const renderValidation = () => (
        <Grid
            container
            alignItems={{ xs: "center", md: "center" }}
            className={classes.container}
            display={"flex"}
            flexDirection={"column"}
            flexWrap={"wrap"}
            gap={"5em"}
            height={"100vh"}
            justifyContent={"center"}
        >
            <Grid
                item
                display={"flex"}
                flexWrap={"wrap"}
                gap={"1em"}
                justifyContent={"center"}
                mt={"-6em"}
            >
                <Typography
                    variant="h1"
                    color={"primary"}
                    fontSize={{ xs: "1.3em", sm: "1.5em" }}
                    width={{ xs: "55%", sm: "100%" }}
                >
                    Estamos validando tu identidad
                </Typography>

                <Typography
                    variant="h2"
                    color={"primary"}
                    fontSize={{ xs: "1em", sm: "1.2em" }}
                    width={{ xs: "90%", sm: "60%", sm: "100%" }}
                >
                    Aguardá unos segundos. Estamos procesando la imagen.
                </Typography>
            </Grid>

            <Grid item display={"flex"} justifyContent={"center"}>
                <Lottie animationData={LoadingValidated} loop autoPlay className={classes.video} />
            </Grid>
        </Grid>
    )


    const renderEnroll = () => (
        <Layout>

            <Grid item>
                <Typography variant="h1" color={"primary"}>Estamos registrando tu identidad.</Typography>
            </Grid>
            <Grid item display={"flex"} className={classes.containerCircularProgress}>
                <CircularProgressbarWithChildren value={progress} styles={{
                    // Customize the root svg element
                    root: {
                    },
                    // Customize the path, i.e. the "completed progress"
                    path: {
                        // Path color
                        stroke: `#00a135`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.0turn)',
                        transformOrigin: 'center center',
                        strokeWidth: 8
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                        // Trail color
                        stroke: `#f0f0f0`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Rotate the trail
                        transform: 'rotate(0.0turn)',
                        transformOrigin: 'center center',
                        strokeWidth: 8

                    },
                }} >

                    <Typography variant="h1" fontFamily={"Open Sans"} color={"#1C2E51"} fontSize={"1.3em"}>{`${progress}%`}</Typography>
                </CircularProgressbarWithChildren>



            </Grid>
            <Grid item width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} marginLeft={{ xs: "25%", md: "40%" }} marginBottom={{ xs: "25%" }} >
                {milestones.map((milestone) => (

                    <Box display={"flex"} gap={3} key={milestone.percentage}>
                        {
                            progress >= milestone.percentage ?
                                (
                                    <Icon color="success">

                                        <CircleIcon />

                                    </Icon>
                                ) : (
                                    <Icon color={"disabled"}>
                                        <CircleOutlinedIcon />
                                    </Icon>
                                )
                        }
                        <span style={{
                            fontWeight: progress >= milestone.percentage ? 'bold' : "normal",
                            color: progress >= milestone.percentage ? "#1C2E51" : "#00000042",
                        }}>
                            {milestone.label}
                        </span>


                    </Box>

                ))}
            </Grid>
        </Layout>
    );

    if (sessionStorage.getItem("optionProcess") === "E" || sessionStorage.getItem("optionProcess") === "W") {
        return renderEnroll()
    } else {
        return renderValidation()
    }

}

export default ValidateIdentity;
