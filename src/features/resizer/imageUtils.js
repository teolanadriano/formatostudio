export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function validateImageFile(file) {
  if (!file) {
    return {
      valid: false,
      error: "Nenhum arquivo foi selecionado.",
    };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Formato não suportado. Use JPG, PNG ou WebP.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "O arquivo deve ter no máximo 20 MB.",
    };
  }

  return {
    valid: true,
    error: "",
  };
}

export function loadImageFromUrl(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () => {
      reject(new Error("Não foi possível carregar a imagem."));
    };

    image.src = imageUrl;
  });
}

export function getImageDimensions(image) {
  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
}

export function createImageUrl(fileOrBlob) {
  return URL.createObjectURL(fileOrBlob);
}

export function revokeImageUrl(url) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

export function getFormatExtension(format) {
  switch (format) {
    case "image/jpeg":
      return "jpg";

    case "image/webp":
      return "webp";

    case "image/png":
    default:
      return "png";
  }
}

export function getFormatName(format) {
  switch (format) {
    case "image/jpeg":
      return "JPG";

    case "image/webp":
      return "WebP";

    case "image/png":
    default:
      return "PNG";
  }
}

export function sanitizeFileName(fileName) {
  if (!fileName) {
    return "imagem";
  }

  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-");
}

export function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, unitIndex);

  return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${
    units[unitIndex]
  } ${units[unitIndex] === "B" ? "" : ""}`.trim();
}