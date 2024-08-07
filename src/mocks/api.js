export default [
    {
        method: "post",
        url: "/enrolamiento/canal/idspa/validar",
        response: {
            elements: [
                {
                    TipoIdSPA: "W",
                    Id: "0142898059M",
                },
            ],
            //  error: {
            //      codigo: 35000,
            //      mensaje: "Ocurrio un error"
            //  }
        },
    },
    {
        method: "post",
        url: "/enrolamiento/canal/idspa/validar1",
        response: {
            error: { subcode: "75156" },
        },
    },
    {
        method: "post",
        url: "/validacion/ix/persona/rostro/validar",
        response: {
            idverificacion: "QT23123123",
            Completado: 1,
            Resultado: 1,
            Intentos: [
                {
                    resultado: 1,
                    motivo: "Succesfully",
                    estado: "COMPLETE",
                    detalle: [
                        {
                            tipo: "FACE",
                            score: 0.9,
                            fmr: 1.3,
                            resultado: "MATCH",
                            motivo: "Successfull",
                        },
                    ],
                },
            ],
        },
    },
    {
        method: "post",
        url: "/validacion/ix/persona/rostro/validar1",
        response: {
            error: { subcode: "75156" },
        },
    },
    {
        method: "post",
        url: "/enrolamiento/canal/persona/rostro/enrolar",
        response: {
            datos: {
                status: 1,
            },
        },
    },
    {
        method: "post",
        url: "/enrolamiento/canal/persona/rostro/enrolar1",
        response: {
            error: { subcode: "75125" },
        },
    },
];
