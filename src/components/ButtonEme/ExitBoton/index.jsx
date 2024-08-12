import classes from "./index.module.scss";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../../Context";
import { validationStep } from "utils/validationSteps";
import ReactGA from "react-ga4";
import { trackEvent } from "utils/ga";

export default function ButtonEmme({ step }) {
    const { setOpenExitModal } = useGlobalContext();
    const handleClick = () => {
        const optionProcess = sessionStorage.getItem("optionProcess");
        setOpenExitModal(true);
        switch (step) {
            case validationStep.WELCOME:
                {
                    if (optionProcess === "W") {
                        trackEvent({
                            category: "Button",
                            action: "enr_salir_for_inicio_dni_frente",
                        });
                    } else if (optionProcess === "E") {
                        trackEvent({
                            category: "Button",
                            action: "enr_salir_inicio_dni_frente",
                        });
                    }
                }
                break;
            case validationStep.FRENTE_DNI:
                {
                    trackEvent({
                        category: "Button",
                        action: " enr_salir_captura_dni_frente",
                    });
                }
                break;
            case validationStep.DORSO_DNI:
                {
                    trackEvent({
                        category: "Button",
                        action: "enr_salir_captura_dni_dorso",
                    });
                }
                break;
            case validationStep.SELFIE:
                {
                    trackEvent({
                        category: "Button",
                        action: "enr_salir_inicio_selfie",
                    });
                }
                break;
        }

        return;
    };
    return (
        <Button onClick={() => handleClick()} className={classes.backEme}>
            Salir
        </Button>
    );
}
