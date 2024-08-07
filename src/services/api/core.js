import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mocksResponse from "../../mocks/api";
import { encrypt, decrypt } from "@services/crypt";
import https from "https";
/**
 * Esta instancia es la de produccion
 */
const axiosLiveInstance = axios.create({
    baseURL: process.env.HOSTNAME_BE,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
/**
 * Esta instancia se utiliza para utilizar mocks en desarrollo
 */
const axiosMockInstance = axios.create({ baseURL: "http://localhost:3000" });

const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, {
    delayResponse: 1500,
});

// Cargar respuestas simuladas desde la carpeta _mocks_
mocksResponse.forEach((mock) => {
    const { method, url, response } = mock;

    switch (method) {
        case "get":
            axiosMockAdapterInstance.onGet(url).reply(200, response);
            break;
        case "post":
            axiosMockAdapterInstance.onPost(url).reply(200, response);
            break;
        case "put":
            axiosMockAdapterInstance.onPut(url).reply(200, response);
            break;
        case "delete":
            axiosMockAdapterInstance.onDelete(url).reply(200, response);
            break;
    }
});

// Determina si usar la instancia de mock o la definida en la variable de entorno HOSTNAME_BE
const isAxioMock = false;

class Api {
    properties = {
        useEncoding: true, //determina si usar encriptacion, en desarrollo para mocks poner en false
    };

    async call(path, method, data) {
        try {
            let response = null;
            let requestData = data;
            let responseData = null;

            if (this.properties.useEncoding) {
                requestData = encrypt(JSON.stringify(requestData));
            }

            if (isAxioMock) {
                response = await axiosMockInstance({
                    method,
                    url: path,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: requestData,
                });
                console.log("api mock response");
            } else {
                response = await axiosLiveInstance({
                    method,
                    url: path,
                    data: requestData,
                    headers: {
                        "Content-Type": "text/plain",
                    },
                });
            }

            responseData = response.data;

            if (this.properties.useEncoding) {
                responseData = decrypt(JSON.stringify(responseData));
            }
            console.log("Desencriptado de respuesta BE", responseData);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default new Api();
