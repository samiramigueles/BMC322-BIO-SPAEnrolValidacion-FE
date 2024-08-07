import Image from "next/image";

import { Grid } from "@mui/material";

import { LogoMacroLayout, IconLayout } from "../../../public/assets/index";

import classes from "./index.module.scss";
import ButtonEmme from "../ButtonEme/ExitBoton/index";
import Box from "@mui/material/Box";

function Layout({ children, showExitButton = true, step }) {
    return (
        <Grid
            container
            display={"flex"}
            flexWrap={"wrap"}
            height={"100vh"}
            justifyContent={"center"}
            margin={"auto"}
            py={{ xs: 2, md: 1.5 }}
            width={{ xs: "98%" }}
        >

            <Grid
                item
                alignItems={"center"}
                display={"flex"}
                height={"min-content"}
                justifyContent={"center"}
                width={"100%"}
            >
                <Image
                    alt="logo_macro"
                    className={classes.imgLogo}
                    src={LogoMacroLayout}
                />

                <Box width={"90%"} display={"flex"} justifyContent={"flex-end"} position="absolute" mt={4}>
                    {showExitButton && <ButtonEmme step={step} />}
                </Box>

            </Grid>
            {children}
        </Grid>
    );
}

export default Layout;
