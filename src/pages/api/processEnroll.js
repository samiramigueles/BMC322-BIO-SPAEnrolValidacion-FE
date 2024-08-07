import Api from "@services/api/core";
export default async function handler(req, res) {
    const { frontDni, backDni, imageDni, selfie, uuid } = req.body.data;
    console.log(`Solicitud enrolamiento recibido para ${uuid} - tamaños frente ${frontDni.length} dorso ${backDni.length} selfie ${selfie.length}`);
    try {
        const body = {
            modo: "L",
            loginhint: uuid,
            frente: frontDni,
            dorso: backDni,
            fotodocumento: imageDni,
            selfie,
        };

        const response = await Api.call(
            "/enrolamiento/canal/persona/rostro/enrolar",
            "post",
            body
        );

        console.log('Enrolamiento finalizado para loginhint ', uuid, JSON.stringify(response.data));

        return res.status(200).json({ ...response });
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
