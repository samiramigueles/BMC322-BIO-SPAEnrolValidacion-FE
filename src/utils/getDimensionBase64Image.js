export function cutImageBase64(base64, porcentajeRecorte) {
    return obtenerDimensionesDeBase64(base64)
        .then(({ width, height }) => {
            // Calcular el porcentaje de recorte para el ancho y el alto
            const porcentajeRecorteAncho = width * (porcentajeRecorte / 100);
            const porcentajeRecorteAlto = height * (porcentajeRecorte / 100);

            // Calcular las nuevas dimensiones después del recorte
            const nuevoAncho = width - 2 * porcentajeRecorteAncho;
            const nuevoAlto = height - 2 * porcentajeRecorteAlto;

            // Crear un lienzo para el recorte
            const canvasRecorte = document.createElement("canvas");
            const ctxRecorte = canvasRecorte.getContext("2d");

            canvasRecorte.width = nuevoAncho;
            canvasRecorte.height = nuevoAlto;

            // Crear una imagen para la base64
            const img = new Image();
            img.src = base64;

            // Dibujar la imagen en el lienzo con el recorte
            ctxRecorte.drawImage(
                img,
                porcentajeRecorteAncho,
                porcentajeRecorteAlto,
                nuevoAncho,
                nuevoAlto,
                0,
                0,
                nuevoAncho,
                nuevoAlto
            );

            // Obtener el base64 del recorte
            const base64Recortado = canvasRecorte.toDataURL("image/jpeg");

            return base64Recortado;
        })
        .catch((error) => {
            console.error("Error al recortar la imagen:", error.message);
        });
}
// Función para obtener las dimensiones de una imagen en base64
function obtenerDimensionesDeBase64(base64) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function () {
            const width = img.width;
            const height = img.height;
            resolve({ width, height });
        };

        img.onerror = function () {
            reject(new Error("Error al cargar la imagen base64."));
        };

        img.src = base64;
    });
}
