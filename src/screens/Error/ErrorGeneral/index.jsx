import LayoutErrorModal from "../../../components/LayoutErrorModal";
import { validationStep } from "../../../utils/validationSteps";
import { useContext } from "react";
import { GlobalContext } from "../../../Context";
function ErrorGeneral({ errorMsg, setStep }) {
    const { optionProcess } = useContext(GlobalContext);

    const handleSetStep = () => {
        if (optionProcess === "E") {
            return setStep(validationStep.FRENTE_DNI);
        }
        setStep(validationStep.SELFIE)
    }
    return (
        <LayoutErrorModal
            errMsg={errorMsg ? errorMsg : "Algo salió mal"}
            textDescription={"Cerrá esta ventana para volver al chat."}

        />
    )
}

export default ErrorGeneral;
