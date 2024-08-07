import ErrorFrontDNI from "./ErrorFrontDni";

function ErrorScreen({ setStep, errorMsg, setErrMsg }) {
    switch (errorMsg) {
        case 400: {
            return (
                <ErrorFrontDNI setStep={setStep} setErrMsg={setErrMsg} />
            );
        }
    }
}

export default ErrorScreen;
