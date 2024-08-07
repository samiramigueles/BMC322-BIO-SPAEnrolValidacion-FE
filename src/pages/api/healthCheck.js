import Api from "@services/api/core";
export default async function handler(req, res) {
    try {
      const body = "enviando"
        const response = await Api.call(
            "/validacion/healthCheck",
            "get",
            body
        );
        
        return res.status(200).json({...response});
    } catch (e) {
        throw new Error(e);
    }
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}