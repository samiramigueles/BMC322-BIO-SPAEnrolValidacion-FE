import { useContext, useEffect, useState } from "react";
import { validationStep } from "../../utils/validationSteps";
import dynamic from "next/dynamic";


import Modal from "../../components/Modal/Exit";
import Api from "@services/api/core"
import { GlobalContext } from "Context";
import { useRouter } from "next/router";


const Welcome = dynamic(() => import("../../screens/Welcome"))
const DNI = dynamic(() => import("../../screens/DNI"))
const InitialSelfie = dynamic(() => import("../../screens/SelfieMoment/InitialSelfie"))
const TakeSelfie = dynamic(() => import("../../screens/SelfieMoment/TakeSelfie"))
const ValidateIdentity = dynamic(() => import("../../screens/ValidateIdentity"))
const End = dynamic(() => import("../../screens/End"))
const Error = dynamic(() => import("../../screens/Error"))

export async function getServerSideProps({ query }) {
    const licence = 'process.env.SPA_DOC_SDK';
    const id = query.id;
    let data = null;
    if (!id) {
        console.log("--------------------No se encontro un query string id-------------")
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
    try {
        const body = {
            loginhint: id,
        };

        data = await Api.call(
            "/enrolamiento/canal/idspa/validar",
            "post",
            body
        );

        if (!id || !data.elements[0]) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/404",
                },
            };
        }

        return {
            props:
            {
                sessionid: id,
                optionProcess: data.elements[0].TipoIdSPA,
                idxId: data.elements[0].Id,
                docSdkLicence: licence
            }
        };
    } catch (error) {
        console.error(error);
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
}


function ProcessRegistration({ docSdkLicence, optionProcess, idxId, sessionid }) {

    const [step, setStep] = useState(validationStep.WELCOME);
    const [errMsg, setErrMsg] = useState(null);
    const { setIdxId, setOptionProcess, setUIID } = useContext(GlobalContext)
    useEffect(() => {
        setUIID(sessionid)
        setOptionProcess(optionProcess);
        setIdxId(idxId);
    }, []);

    return (
        <>
            <Modal />
            {step === validationStep.WELCOME && <Welcome setStep={setStep} sessionid={sessionid} step={step} />}
            {step === validationStep.FRENTE_DNI && (
                <DNI step={step} setStep={setStep} setErrMsg={setErrMsg} docSdkLicence={docSdkLicence} />
            )}
            {step === validationStep.DORSO_DNI && (
                <DNI step={step} setStep={setStep} setErrMsg={setErrMsg} docSdkLicence={docSdkLicence} />
            )}
            {step === validationStep.SELFIE && (
                <InitialSelfie setStep={setStep} step={step} />
            )}
            {step === validationStep.TAKE_SELFIE && (
                <TakeSelfie setStep={setStep} />
            )}
            {step === validationStep.VALIDATING && <ValidateIdentity setStep={setStep} setErrMsg={setErrMsg} />}
            {step === validationStep.VALIDATED && <End sessionid={sessionid} />}
            {step === validationStep.ERROR && <Error errorMsg={errMsg} setStep={setStep} setErrMsg={setErrMsg} />}
        </>
    );
}

export default ProcessRegistration;
