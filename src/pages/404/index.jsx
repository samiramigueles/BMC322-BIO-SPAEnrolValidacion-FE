import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Layout from "../../components/Layout/index";
import { ExclamationError } from "../../../public/assets";
import BackToEme from "../../components/ButtonEme/BackToEme";

export default function () {
    return (
        <Layout showExitButton={false}>
            <Grid item>
                <Box display={"flex"} justifyContent={"center"} mb={5}>
                    <Image src={ExclamationError} alt={"error"} />
                </Box>

                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100vw"}
                    flexDirection={"column"}
                >
                    <Typography
                        variant="h1"
                        color={"primary"}
                        mb={5}
                        fontSize={20}
                    >
                        Algo Salió Mal
                    </Typography>
                    <Typography variant="h2" color={"primary"}>
                        En este momento no es posible realizar la operación. Por
                        favor, generá un link nuevamente.
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"center"} mt={10}>
                    <BackToEme />
                </Box>
            </Grid>
        </Layout>
    );
}
