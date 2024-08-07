import { useContext, useEffect, useState } from "react";

import { validationStep } from "../../utils/validationSteps";
import { Welcome, InitialSelfie, TakeSelfie, ValidateIdentity, End, Error } from "../../screens/index";
import Modal from "../../components/Modal/Exit/index"
import Api from "@services/api/core"
import { GlobalContext } from "Context";
export async function getServerSideProps({ query }) {
    const id = query.id
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
                idxId: data.elements[0].Id
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
function ProcessRegistration({ optionProcess, idxId, sessionid }) {
    const [step, setStep] = useState(validationStep.TAKE_SELFIE);
    const [errMsg, setErrMsg] = useState(null);
    const { setIdxId, setOptionProcess, setUIID } = useContext(GlobalContext);
    useEffect(() => {
        setUIID(sessionid);
        setOptionProcess(optionProcess);
        setIdxId(idxId);
    }, []);

    return (
        <>
            <Modal />
            {step === validationStep.TAKE_SELFIE && <TakeSelfie setStep={setStep} />}
            {step === validationStep.VALIDATING && <ValidateIdentity setStep={setStep} setErrMsg={setErrMsg} />}
            {step === validationStep.ERROR && <Error errorMsg={errMsg} setStep={setStep} />}
        </>

    )
}

export default ProcessRegistration;
