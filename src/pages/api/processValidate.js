import Api from "@services/api/core";
export default async function handler(req, res) {
    const { idusuario, selfie, uuid } = req.body;
    console.log(`Solicitud validacion recibido para ${uuid} - tamaños selfie ${selfie.length}`);
    try {
        const body = {
            idusuario,
            selfie,
            modo: "L",
            loginhint: uuid,
        };

        const response = await Api.call(
            "/validacion/ix/persona/rostro/validar",
            "post",
            body
        );

        console.log('Validacion finalizada para loginhint ', uuid, JSON.stringify(response.data));

        res.status(200).json({ ...response });
    } catch (e) {
        throw new Error(e);
    }
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "4mb", // Set desired value here
        },
    },
};
