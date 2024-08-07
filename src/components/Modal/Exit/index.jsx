import { Button, Modal, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../../Context";
import { ExclamationError } from "../../../../public/assets";
import Image from "next/image";
import classes from "./index.module.scss";
import axios from "axios";
export default function ModalContainer() {
    const { openExitModal, setOpenExitModal,uuid } = useContext(GlobalContext);
    const handleClose = () => {
        setOpenExitModal(false);
    }
    const handleClick = async () => {
        const { data } = await axios.post("/api/removeSession",{uuid:uuid});
        window.location.href = "https://www.macro.com.ar/eme2";
    }
    return (
        <Modal
            open={openExitModal}
            onClose={handleClose}
            className={classes.modal}
        >
            <Box className={classes.box}>
                <Box m={3}>
                    <Image src={ExclamationError} alt='error' />
                </Box>

                <Typography variant="h1" component={"h1"} fontSize={"22px"} color="primary">
                    ¿Seguro que querés salir?
                </Typography>
                <Box display={"flex"} justifyContent={"space-evenly"} mt={2} borderTop={"1px solid grey"} width={"100%"} height={"100%"}>
                    <Box borderRight={"1px solid grey"} display={"flex"} justifyContent={"center"} height={"100%"} width={"50%"}>
                        <Button variant="text" className={classes.button} onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Box>
                    <Box display={"flex"} justifyContent={"center"} height={"100%"} width={"50%"}>
                        <Button variant="text" className={classes.button} onClick={() => handleClick()}>
                            Salir
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}