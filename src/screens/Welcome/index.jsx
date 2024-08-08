import React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";

import { Button, Typography, Grid } from "@mui/material";

import { WelcomePresentation } from "../../../public/assets/index";

import { validationStep } from "../../utils/validationSteps";

import classes from "./index.module.scss";

import { useGlobalContext } from "../../Context";
import ReactGA from "react-ga4";
function Welcome({ setStep, sessionid, step }) {
    const { optionProcess } = useGlobalContext();
    const handleClick = () => {
        if (optionProcess === "E") {
            ReactGA.event({
                category: "Button",
                action: "enr_inicio_dni_frente",
                value: `operation_id: ${sessionid}`,
            });
        } else if (optionProcess === "W") {
            ReactGA.event({
                category: "Button",
                action: "enr_for_inicio_dni_frente",
                value: `operation_id: ${sessionid}`,
            });
        }

        setStep(
            optionProcess === "E" || optionProcess === "W"
                ? validationStep.FRENTE_DNI
                : validationStep.SELFIE
        );
    };
    return (
        <Layout step={step}>
            <Grid
                item
                xs={8}
                md={6}
                lg={4}
                xl={3}
                height={"max-content"}
                mt={-5}
            >
                <Typography variant="h1" color={"primary"} fontSize={"1.3em"}>
                    {optionProcess === "W"
                        ? "Para avanzar, necesitamos registrar el número de teléfono que estás usando"
                        : `Hola, vamos a comenzar ${
                              optionProcess === "E" || optionProcess === "W"
                                  ? "registrando"
                                  : "validando"
                          } tu identidad`}
                </Typography>
            </Grid>

            <Grid
                item
                xs={12}
                display={"inline-flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={{ xs: "25%", sm: "30%" }}
                overflow={"hidden"}
            >
                <Image
                    alt="animation"
                    className={classes.img}
                    src={WelcomePresentation}
                />
            </Grid>

            <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                flexWrap={"wrap"}
                height={"max-content"}
                gap={"1.5em"}
            >
                <Typography variant="h2" color={"primary"} width={"100%"}>
                    {optionProcess === "E" || optionProcess === "W"
                        ? " Solo necesitás estar en un lugar iluminado y con el DNI en mano."
                        : "Solo necesitás estar en un lugar iluminado."}
                </Typography>

                <Button
                    className={classes.button}
                    color={"secondary"}
                    onClick={() => handleClick()}
                    variant="contained"
                >
                    Comenzar
                </Button>
            </Grid>
        </Layout>
    );
}

export default Welcome;
