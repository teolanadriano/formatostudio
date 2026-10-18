import { Download } from "lucide-react";
import styles from "./DownloadButton.module.css";
import { getFormatExtension, sanitizeFileName } from "../../features/resizer/imageUtils";

function DownloadButton({
  resultImage,
  originalFile,
  format = "image/png",
  disabled = false,
}) {
  function handleDownload() {
    if (!resultImage) return;

    const extension = getFormatExtension(format);
    const baseName = originalFile?.name || "imagem";
    const fileName = `${baseName}-formatostudio.${extension}`;

    const link = document.createElement("a");

    link.href = resultImage;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button
      type="button"
      className={styles["download-button"]}
      onClick={handleDownload}
      disabled={!resultImage || disabled}
    >
      <Download size={18} />

      {resultImage
        ? "Baixar imagem"
        : "Gere um resultado para baixar"}
    </button>
  );
}

export default DownloadButton;