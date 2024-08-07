import LayoutErrorModal from "../../../components/LayoutErrorModal";

function ErrorOnlyMobile({ errorMsg, setStep }) {

    return (
        <LayoutErrorModal
            errMsg={"eMe validación solo está disponible en versión móvil"}
            textDescription={"Cerrá esta ventana para volver al chat."}
        />
    )
}

export default ErrorOnlyMobile;
