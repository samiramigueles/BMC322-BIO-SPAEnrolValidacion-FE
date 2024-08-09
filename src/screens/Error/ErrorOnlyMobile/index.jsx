import LayoutErrorModal from "../../../components/LayoutErrorModal";

function ErrorOnlyMobile({ errorMsg, setStep }) {
    return (
        <LayoutErrorModal
            title={"eMe validación solo está disponible en versión móvil"}
            subtitle={"Cerrá esta ventana para volver al chat."}
        />
    );
}

export default ErrorOnlyMobile;
