import React, { useEffect } from 'react';
import classes from "./index.module.scss";
import { Button, Box, Typography } from "@mui/material";
import { ButtonLogo } from '../../../../public/assets';
import Image from "next/image";
import {  trackEvent } from "utils/ga";
function BackToEme() {
    // function init() {
    //     window.open('', '_self', '');
    //     window.close();
    // }
    // useEffect(() => {
    //     init();
    // }, []);
    const handleButtonClick = () => {
        trackEvent({
            category: "Button",
            action: "enr_volver_chat"
        })
        window.location.href = 'https://www.macro.com.ar/eme2';
    };

    return (

        <Button variant={"contained"} className={classes["dropbtn Banco-Macro-ANCH-aval"]} onClick={handleButtonClick}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} padding={0.5}>
                <Image alt='eMe' src={ButtonLogo} className={classes["img"]} width={100} height={100} unoptimized />
                <Typography variant='h1' color={"white"} className={classes["text"]}>
                    Volver al chat
                </Typography>

            </Box>
        </Button>

    )
}

export default BackToEme
