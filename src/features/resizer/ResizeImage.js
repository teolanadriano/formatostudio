export function resizeImage(
  image,
  width,
  height,
  format = "image/png",
  quality = 0.92
) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Não foi possível criar o contexto Canvas."));
      return;
    }

    if (format === "image/jpeg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Falha ao gerar a imagem."));
          return;
        }

        resolve(blob);
      },
      format,
      quality
    );
  });
}