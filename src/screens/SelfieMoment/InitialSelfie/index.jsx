import Image from "next/image";

import { Grid, Typography, Button } from "@mui/material";

import Layout from "../../../components/Layout";

import {
    PhoneEyes,
    FaceIntoMark,
    NotAccesories,
} from "../../../../public/assets/index";

import { validationStep } from "../../../utils/validationSteps";

import classes from "./index.module.scss";
import { useState } from "react";
import ReactGA from "react-ga4";
function InitialSelfie({ setStep, step }) {

    const handleClick = () => {
        ReactGA.event({
            category: 'Button',
            action: 'enr_inicio_selfe',
        });
        setStep(validationStep.TAKE_SELFIE);
    }


    return (
        <Layout step={step}>
            <section className={classes.section}>
                <Grid item xs={12}>
                    <Typography
                        variant="h1"
                        color={"primary"}
                        className={classes.description}
                        textAlign={"center"}
                    >
                        Ahora vamos a sacarte una foto. Tené en cuenta:
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={12}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    gap={{ xs: "1em" }}
                    my={{ xs: "1em", sm: "3em" }}
                >
                    {/* images */}
                    <Grid
                        item
                        alignItems={"center"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={{ xs: "50px" }}
                        justifyContent={"flex-start"}
                        xs={4}
                        sm={3}
                        md={2}
                        lg={1}
                    >
                        <Image
                            alt="phone_eyes"
                            className={classes.img}
                            src={PhoneEyes}
                        />
                        <Image
                            alt="face_mark"
                            className={classes.imgFaceMark}
                            src={FaceIntoMark}
                        />
                        <Image
                            alt="not_accesories"
                            className={classes.imgAccesories}
                            src={NotAccesories}
                        />
                    </Grid>

                    {/* text */}
                    <Grid
                        item
                        alignItems={"center"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={{ xs: "80px", sm: "7em" }}
                        xs={6}
                        sm={6}
                        md={5}
                        lg={3}
                        xl={2}
                    >
                        <Typography variant="h4" width={"95%"}>
                            Ubicá el celular a la altura de tus ojos.
                        </Typography>
                        <Typography variant="h4" width={"95%"}>
                            Mantené tu rostro siempre dentro del marco.
                        </Typography>
                        <Typography variant="h4" width={"95%"}>
                            No uses accesorios como lentes de sol o gorra.
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    className={classes.button}
                    color={"secondary"}
                    fullWidth
                    onClick={() => handleClick()}
                    variant="contained"
                >
                    Continuar
                </Button>
            </section>
        </Layout>
    );
}

export default InitialSelfie;
