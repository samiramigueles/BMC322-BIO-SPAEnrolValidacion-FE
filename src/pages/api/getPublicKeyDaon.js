import Api from "@services/api/core"
export default async function handler(req, res) {
    try {        
        const response = await Api.call("/enrolamiento/idspa/publickey/crear","get");

        res.status(200).json(response.datos);
    } catch (e) {
        throw new Error(e);
    }
}