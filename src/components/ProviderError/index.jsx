import { useEffect, useState } from "react";
import { subscribe } from "utils/events/events";
import LayoutErrorModal from "@components/LayoutErrorModal";
import ReactGA from "react-ga4";
const CODE_ERROR = {
    "75156": { title: "Hubo un problema para extraer los datos de tu DNI", subtitle: 'Controlá que haya buena luz ambiente o la imagen esté enfocada.' },
    "75155": { title: "El DNI no está vigente", subtitle: 'Utilizá el último DNI vigente.' },
    "74002": { title: "La selfie tiene que coincidir con la foto del DNI", subtitle: 'Por favor volvé a intentar.' },
    "75153": { title: "Hubo un problema para procesar el DNI", subtitle: 'Por favor volvé a intentar.' },
    "75154": { title: "Hubo un problema para procesar el DNI", subtitle: 'Por favor volvé a intentar.' },
    "75152": { title: "El servicio se encuentra inhabilitado por el momento", subtitle: "Por favor volvé a intentar en unos minutos." },
    "76003": { title: "Superaste el tiempo para registrarte", subtitle: "Por favor generá un link nuevamente." },
    "76010": { title: "Algo salió mal", subtitle: "En este momento no es posible realizar la operación. Por favor generá un link nuevamente." },
    "74001": { title: "Algo salió mal", subtitle: " En este momento no es posible realizar la operación. Por favor generá un link nuevamente." },
    "76004": { title: "Algo salió mal", subtitle: "En este momento no es posible realizar la operación. Por favor generá un link nuevamente." },
    "76009": { title: "Hubo un problema para procesar el DNI", subtitle: "Por favor volvé a intentar." },
    "76011": { title: "La selfie tiene que coincidir con la foto del DNI", subtitle: "Por favor volvé a intentar." },
    "76012": { title: "La selfie tiene que coincidir con la foto del DNI", subtitle: "Por favor volvé a intentar." },
    "75125": { title: "Hubo un problema para procesar la selfie", subtitle: "Controlá que haya buena luz ambiente o la imagen esté enfocada." },
    "75067": { title: "Algo salió mal", subtitle: "En este momento no es posible realizar la operación. Por favor generá un link nuevamente." },
    "77006": { title: "Superaste el tiempo para registrarte", subtitle: "Por favor generá un link nuevamente." },
    "77012": { title: "Algo salió mal", subtitle: "En este momento no es posible realizar la operación. Por favor generá un link nuevamente." },
    "500": { title: "Algo salió mal", subtitle: "En este momento no es posible realizar la operación. Por favor generá un link nuevamente." }

}
function ProviderError({ children }) {
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const operationProcess = sessionStorage.getItem("optionProcess");
        const handleErrorServer = (codeError) => {
            console.log("Esto es en provider error", codeError);

            ReactGA.event({
                name: 'error',
                description: (operationProcess === "E" || operationProcess === "W") ? 'enr_error_servidor' : 'val_error_servidor',
                error: `${codeError.code}`
            });

            setError(true);
            setErrMsg(CODE_ERROR[codeError.code]);
        };

        subscribe("serverError", handleErrorServer);
    }, []);


    if (error) {
        return (
            <LayoutErrorModal title={errMsg.title} subtitle={errMsg.subtitle} />
        )
    }
    return (

        children
    )
}

export {
    ProviderError
}