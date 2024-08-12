import { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "utils/events/events";
import dynamic from "next/dynamic";
import { trackEvent } from "utils/ga";

const LayoutErrorModal = dynamic(() => import("@components/LayoutErrorModal"), {
    ssr: false,
});

function ProviderError({ children }) {
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        const loadErrorMessages = async () => {
            const module = await import("utils/errorMessages");
            setErrorMessages(module.ERROR_MESSAGES);
        };

        loadErrorMessages();

        const operationProcess = sessionStorage.getItem("optionProcess");
        const handleErrorServer = (codeError) => {
            console.log("Esto es en provider error", codeError);

            trackEvent({
                name: "error",
                description:
                    operationProcess === "E" || operationProcess === "W"
                        ? "enr_error_servidor"
                        : "val_error_servidor",
                error: `${codeError.code}`,
            });
            setError(true);
            setErrMsg(errorMessages[codeError.code]);
        };

        subscribe("serverError", handleErrorServer);
        return () => {
            unsubscribe("serverError", handleErrorServer);
        };
    }, [errorMessages]);

    if (error) {
        return (
            <LayoutErrorModal title={errMsg.title} subtitle={errMsg.subtitle} />
        );
    }
    return children;
}

export { ProviderError };
