import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import ReactCardFlip from "react-card-flip";

import Layout from "../../components/Layout";

import { FrontDNI, BackDNI } from "../../../public/assets/index";

import { validationStep } from "../../utils/validationSteps";

import classes from "./index.module.scss";

const BlinkId = dynamic(import("../../components/DocSdk"))

function DNI({ step, setStep, setErrMsg, docSdkLicence }) {
    return (
        <Layout step={step}>
            <section className={classes.section}>
                <Grid
                    item
                    xs={12}
                    display={"flex"}
                    flexDirection={"column"}
                    height={"max-content"}
                >
                    <Typography
                        variant="h1"
                        color={"primary"}
                        fontSize={"1.3em"}
                    >
                        {
                            step === validationStep.FRENTE_DNI ? "Vamos a validar tu DNI" : ""
                        }
                    </Typography>

                    <Typography variant="h2" color={"primary"} fontSize={"1em"}>
                        {step === validationStep.FRENTE_DNI
                            ? "Comencemos con el frente"
                            : "Ahora vamos con el dorso"}
                    </Typography>
                </Grid>

                <Grid
                    item
                    alignItems={"center"}
                    className={classes.containerFlip}
                    display={"flex"}
                    height={"min-content"}
                    justifyContent={"center"}
                    xs={12}
                >
                    <ReactCardFlip
                        isFlipped={step === validationStep.DORSO_DNI}
                        flipSpeedFrontToBack={2}
                        className={classes.containerFlip}
                    >
                        <Image
                            src={FrontDNI}
                            alt="front_dni"
                            className={classes.img}
                            loading="lazy"
                        />
                        <Image
                            src={BackDNI}
                            alt="back_dni"
                            className={classes.img}
                            loading="lazy"
                        />
                    </ReactCardFlip>
                </Grid>

                <Grid
                    item
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    flexWrap={"wrap"}
                    xs={12}
                >

                    <BlinkId
                        step={step}
                        setStep={setStep}
                        setErrMsg={setErrMsg}
                        docSdkLicence={docSdkLicence}
                    />

                    <Typography
                        variant="h3"
                        color={"primary"}
                        width={{ xs: "80%", sm: "60%", md: "40%", lg: "30%" }}
                    >
                        Ubicá el DNI en el recuadro, verificá que tenga buena
                        iluminación y evitá reflejos. Es importante que sea el
                        último DNI vigente.
                    </Typography>
                </Grid>
            </section>
        </Layout>
    );
}

export default DNI;
