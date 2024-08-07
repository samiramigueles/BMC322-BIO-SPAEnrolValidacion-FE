import Api from "@services/api/core";
export default async function handler(req, res) {
    const { uuid } = req.body;
    try {
        const body = {
            loginhint: uuid,
        };
        const response = await Api.call(
            "/enrolamiento/canal/idspa/borrar",
            "post",
            body
        );

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
