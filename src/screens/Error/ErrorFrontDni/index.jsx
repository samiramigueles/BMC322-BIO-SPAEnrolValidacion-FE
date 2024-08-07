import LayoutErrorModal from "../../../components/LayoutErrorModal"
import { validationStep } from "../../../utils/validationSteps";
function ErrorFrontDNI({ setStep, setErrMsg }) {
    const handleSetStep = () => {
        setStep(validationStep.FRENTE_DNI);
        setErrMsg(null);
    }
    return (
        <LayoutErrorModal
            title={"No pudimos validar el DNI"}
            subtitle={"Verificá que tenga buena iluminación y evitá reflejos."}
            handleClick={handleSetStep}
        />
    )
}

export default ErrorFrontDNI;