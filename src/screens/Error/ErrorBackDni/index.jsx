import LayoutErrorModal from "../../../components/LayoutErrorModal"
import { BackDNI } from "../../../../public/assets";
function ErrorBackDni() {
    return (
        <LayoutErrorModal
            iconError={BackDNI}
            errMsg={"No pudimos validar el dorso del DNI"}
            textDescription={"Procurá que tenga buena iluminación y evitá reflejos."}
        />
    )
}

export default ErrorBackDni;
