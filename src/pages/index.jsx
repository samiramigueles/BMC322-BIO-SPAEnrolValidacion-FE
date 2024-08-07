import { useContext, useEffect, useState } from "react";

import Head from "next/head";

import { Intro, ErrorOnlyMobile } from "../screens";

import { GlobalContext } from "../Context";
import Api from "@services/api/core"
import { emit } from "utils/events/events";
export async function getServerSideProps({ query }) {
    const id = query.id;
    let data = null;
    if (!id) {
        console.log("No se encontro un query string id")
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
    try {
        console.log('Validando loginhint ', id);
        const body = {
            loginhint: id,
        };

        data = await Api.call(
            "/enrolamiento/canal/idspa/validar",
            "post",
            body
        );


        if (!data.elements[0]) {
            console.log('No existe un resultado desde ESB para loginhint ', id);
            return {
                redirect: {
                    permanent: false,
                    destination: "/404",
                },
            };
        }

        console.log('Validacion OK ', JSON.stringify(data));

        return {
            props:
            {
                sessionid: id,
                optionProcess: data.elements[0].TipoIdSPA,
                idxId: data.elements[0].Id
            }
        };
    } catch (error) {
        console.error('Error en renderizado de pagina inicial ', error);
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
}

export default function Home({ optionProcess, idxId, error }) {
    const { setOptionProcess, setIdxId } = useContext(GlobalContext);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        if (error) {
            emit("serverError", {
                code: error.subcode,
            })
        }
        sessionStorage.setItem("optionProcess", optionProcess);
        setOptionProcess(optionProcess);
        setIdxId(idxId);
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

        if (!isMobile) {
            setIsMobile(false)
        }

    }, []);

    if (!isMobile) {
        return (
            <ErrorOnlyMobile />
        )
    } else {
        return (
            <div>
                <Head>
                    <title>Banco Chat</title>
                </Head>
                <Intro />
            </div>
        );
    }


}
