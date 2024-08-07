import React from "react";
import {
    ExclamationError,
    FrontDNI,
} from "../../../public/assets";
import { Grid, Typography, Box, Button } from "@mui/material";
import classes from "./index.module.scss";
import Image from "next/image";
import BackToEme from "@components/ButtonEme/BackToEme";
export default function LayoutErrorModal({ title, subtitle, iconError, handleClick }) {
    return (
        <div className={classes.container}>
            <div className={classes.modal}>
                <div>
                    {
                        iconError && (<Image src={iconError} alt="DNI" />)
                    }

                    <Image
                        src={ExclamationError}
                        alt="Cruz"
                        className={classes.cruz}
                    />
                </div>
                <Grid container display={"flex"} flexDirection={"column"} >
                    <Grid item mb={3} >
                        <Typography variant="h1" color={"primary"} fontSize={"1.3em"}>
                            {title ? title : "Algo salio mal.."}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h2" color={"primary"}>
                            {subtitle ? subtitle : "Cerrá esta ventana para volver al chat."}
                        </Typography>

                    </Grid>
                    <Box display={"flex"} justifyContent={"center"} mt={10}>
                        {
                            handleClick ?
                                (
                                    <Button onClick={() => handleClick()} variant="contained">
                                        Reintentar
                                    </Button>
                                ) : (
                                    <BackToEme />
                                )
                        }

                    </Box>
                </Grid>
            </div>
        </div>
    );
}
