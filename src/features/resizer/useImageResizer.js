import { useCallback, useEffect, useState } from "react";

import { resizeImage } from "./ResizeImage";

import {
  createImageUrl,
  getImageDimensions,
  loadImageFromUrl,
  revokeImageUrl,
  validateImageFile,
} from "./imageUtils";

export function useImageResizer() {
  const [originalImage, setOriginalImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);

  const [resultImage, setResultImage] = useState(null);
  const [resultDimensions, setResultDimensions] = useState(null);
  const [resultSize, setResultSize] = useState(0);
  const [resultFormat, setResultFormat] = useState("image/png");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = useCallback(async (file) => {
    const validation = validateImageFile(file);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError("");

    const imageUrl = createImageUrl(file);

    try {
      const image = await loadImageFromUrl(imageUrl);

      setOriginalImage((previousUrl) => {
        revokeImageUrl(previousUrl);
        return imageUrl;
      });

      setOriginalFile(file);
      setOriginalSize(file.size);
      setOriginalDimensions(getImageDimensions(image));

      setResultImage((previousUrl) => {
        revokeImageUrl(previousUrl);
        return null;
      });

      setResultDimensions(null);
      setResultSize(0);
      setResultFormat("image/png");
    } catch (uploadError) {
      revokeImageUrl(imageUrl);

      console.error(uploadError);
      setError("Não foi possível carregar a imagem.");
    }
  }, []);

  const handleResize = useCallback(
    async ({ width, height, format, quality }) => {
      if (!originalImage || !originalFile || !originalDimensions) {
        setError("Selecione uma imagem antes de processar.");
        return;
      }

      if (
        !Number.isFinite(width) ||
        !Number.isFinite(height) ||
        width < 1 ||
        height < 1
      ) {
        setError("Informe dimensões válidas para a imagem.");
        return;
      }

      setIsProcessing(true);
      setError("");

      try {
        const isUnchanged =
          width === originalDimensions.width &&
          height === originalDimensions.height &&
          format === originalFile.type;

        let resultBlob;

        if (isUnchanged) {
          // Preserva o arquivo original sem recodificação.
          resultBlob = originalFile;
        } else {
          const image = await loadImageFromUrl(originalImage);

          resultBlob = await resizeImage(
            image,
            width,
            height,
            format,
            quality
          );
        }

        const resultUrl = createImageUrl(resultBlob);

        setResultImage((previousUrl) => {
          revokeImageUrl(previousUrl);
          return resultUrl;
        });

        setResultDimensions({
          width,
          height,
        });

        setResultSize(resultBlob.size);
        setResultFormat(format);
      } catch (processingError) {
        console.error(processingError);
        setError("Ocorreu um erro ao processar a imagem.");
      } finally {
        setIsProcessing(false);
      }
    },
    [originalImage, originalFile, originalDimensions]
  );

  const handleReset = useCallback(() => {
    revokeImageUrl(originalImage);
    revokeImageUrl(resultImage);

    setOriginalImage(null);
    setOriginalFile(null);
    setOriginalDimensions(null);
    setOriginalSize(0);

    setResultImage(null);
    setResultDimensions(null);
    setResultSize(0);
    setResultFormat("image/png");

    setIsProcessing(false);
    setError("");
  }, [originalImage, resultImage]);

  useEffect(() => {
    return () => {
      revokeImageUrl(originalImage);
      revokeImageUrl(resultImage);
    };
  }, [originalImage, resultImage]);

  return {
    originalImage,
    originalFile,
    originalDimensions,
    originalSize,

    resultImage,
    resultDimensions,
    resultSize,
    resultFormat,

    isProcessing,
    error,

    hasImage: Boolean(originalImage),
    hasResult: Boolean(resultImage),

    handleImageUpload,
    handleResize,
    handleReset,
  };
}