import Lottie from "lottie-react";
import { Grid } from "@mui/material";

import { LoadingValidated } from "../../../public/assets/index";

import classes from "./index.module.scss";

const LoadingAnimation = () => {
    return (
        <Grid item display={"flex"} justifyContent={"center"}>
            <Lottie
                animationData={LoadingValidated}
                loop
                autoPlay
                className={classes.video}
            />
        </Grid>
    );
};

export default LoadingAnimation;
