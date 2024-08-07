
# EME SPA FE

Enrolamiento y validacion.




## Environment Variables

Para ejecutar este proyecto, necesitas agregar las siguiente variables de entorno

`HOSTNAME_BE= host del BE`

`HOSTNAME_FE= host del FE`

`SPA_DOC_SDK= licencia de lectura DOC`

`SPA_KEY_PATH= path de SPA`

`SPA_PASSPHRASE_FE= passphrase de FE`

`SPA_TD_CA = CA de FE`

`SPA_HTTPS_PASSPHRASE= passphrase de la key https`

`SPA_CER_NAME_BE= nombre de certificado BE para encriptado`

`SPA_KEY_NAME_FE= nombre de certificado FE para desencriptado`

`SPA_HTTPS_FE_KEY= key para https`

`SPA_HTTPS_FE_CER= cert para https`

`NEXT_PUBLIC_GA_MEASUREMENT_ID= Id de flujo de GA (ej G-RSXBQ342S4)`

## Run Locally

Clonar repositorio

```bash
  git clone http://SRVCBGIT-TEST.MACRO.COM.AR:9999/biometria/BMC322-BIO-SPAEnrolValidacion-FE.git
```

Ir a la carpeta del proyecto

```bash
  cd BMC322-BIO-SPAEnrolValidacion-FE
```

Instalar dependencias

```bash
  npm install
```

Levantar server

```bash
  npm run dev
```
El server se ejecutara por default en el puerto 3000, recordar poner el query params __id__, para poder probar los diferentes flujos.

URL Final: "http://localhost:3000?id=<tu id>



## Utilizar API mocks
En el archivo src/services/api/core.js

```javascript

(...)

// Determina si usar la instancia de mock o la definida en la variable de entorno HOSTNAME_BE
const isAxioMock = true;


class Api {
    properties = {
        useEncoding: false, //determina si usar encriptacion, en desarrollo para utilizar mocks poner en false
      }
 
    async call(path,method,data){
(...)
}
```
Los mocks están disponibles en la carpeta "_ mocks _"


## Tech Stack

> React JS: 18

> Next JS: 13

> Node JS: 16.16.0

