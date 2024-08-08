import Lottie from "lottie-react";

import { LoadingValidated } from "../../../public/assets/index";

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
