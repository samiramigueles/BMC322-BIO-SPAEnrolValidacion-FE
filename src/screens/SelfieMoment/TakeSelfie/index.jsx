import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import DaonCapture from "../../../components/Daon";

import classes from "./index.module.scss"


function TakeSelfie({ setStep }) {
    const [feedbackMsg, setFeedbackMsg] = useState(
        "Ubicá tu rostro dentro del círculo."
    );

    return (
        <Grid
            container
            alignItems={"center"}
            bgcolor={"#052A51"}
            display={"flex"}
            height={"100vh"}
            justifyContent={"space-around"}
            overflow={"hidden"}
            py={{ xs: "3em", md: "6em" }}

        >
            <Grid item flexDirection={"column"} xs={12} mb={{ xs: "0em", md: "30em" }}>
                <Typography
                    variant="h1"
                    mb={1}
                    fontSize={{ xs: "1.5em" }}
                    sx={{ color: "white" }}
                >
                    Vamos a sacarte una foto
                </Typography>

                <Typography
                    variant="h3"
                    fontSize={{ xs: "1.3em" }}
                    sx={{ color: "white" }}
                >
                    {feedbackMsg}
                </Typography>
            </Grid>

            <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                xs={12}
            >
                <DaonCapture
                    setFeedbackMsg={setFeedbackMsg}
                    setStep={setStep}
                />
            </Grid>
        </Grid>
    );
}

export default TakeSelfie;
