import { useEffect } from "react";
import Image from "next/image";
import { Grid, Typography, Button } from "@mui/material";

import Layout from "../../components/Layout";

import { EndIcon } from "../../../public/assets";

import classes from "./index.module.scss";
import { useGlobalContext } from "../../Context";
import BackToEme from "../../components/ButtonEme/BackToEme";
import { trackEvent } from "utils/ga";

function End({ sessionid }) {
    const { optionProcess } = useGlobalContext();
    useEffect(() => {
        const optionProcess = sessionStorage.getItem("optionProcess");
        if (optionProcess === "E" || optionProcess === "W") {
            trackEvent({
                category: "Finalizacion",
                action: "enr_operacion_exitosa",
                value: `operation_id: ${sessionid}`,
            });
        } else {
            trackEvent({
                category: "Finalizacion",
                action: "val_operacion_exitosa",
                value: `operation_id: ${sessionid}`,
            });
        }
    }, []);
    return (
        <Layout showExitButton={false}>
            <section className={classes.section}>
                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                    <Typography variant="h1" color={"primary"} width={"60%"}>
                        ¡Tu identidad fue{" "}
                        {optionProcess === "E" ? "registrada" : "validada"}{" "}
                        correctamente!
                    </Typography>
                </Grid>

                <Grid item xs={10} sm={6} md={4} lg={3.5} xl={3}>
                    <Image
                        src={EndIcon}
                        alt="end_icon"
                        className={classes.img}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"center"}
                    height={"min-content"}
                >
                    <Typography variant="h1" color={"primary"} width={"100%"}>
                        ¡Muchas gracias!
                    </Typography>
                </Grid>
                <Grid item>
                    <BackToEme />
                </Grid>
            </section>
        </Layout>
    );
}

export default End;
