import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { LoadingIntro } from "../../../public/assets/index";
import classes from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { useGlobalContext } from "../../Context";
function Intro() {
    const router = useRouter();
    const { setUIID, optionProcess } = useGlobalContext();

    useEffect(() => {
        const optionProcessSession = sessionStorage.getItem("optionProcess");

        setUIID(router.query.id);
        setTimeout(() => {
            if (optionProcessSession) {
                if (
                    optionProcessSession === "E" ||
                    optionProcessSession === "W"
                ) {
                    router.push(`/process-registration?id=${router.query.id}`);
                } else if (optionProcessSession === "V") {
                    router.push(`/process-validation?id=${router.query.id}`);
                }
            }
        }, 6000);
    }, [optionProcess]);

    return (
        <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
        >
            <Grid
                item
                display={"flex"}
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Image
                    src={LoadingIntro}
                    alt="logo_macro"
                    className={classes.img}
                    unoptimized
                />
            </Grid>
        </Grid>
    );
}

export default Intro;
