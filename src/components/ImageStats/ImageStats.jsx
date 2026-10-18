import styles from "./ImageStats.module.css";

import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  FileImage,
  HardDrive,
  Maximize2,
} from "lucide-react";

import { formatFileSize, getFormatName } from "../../features/resizer/imageUtils.js";

function ImageStats({
  originalDimensions,
  resultDimensions,
  originalSize,
  resultSize,
  resultFormat,
}) {
  if (
    !originalDimensions ||
    !resultDimensions ||
    !originalSize ||
    !resultSize
  ) {
    return null;
  }

  const sizeDifference = originalSize - resultSize;

  const percentageDifference =
    (Math.abs(sizeDifference) / originalSize) * 100;

  const wasReduced = sizeDifference > 0;
  const wasIncreased = sizeDifference < 0;

  return (
    <section className={styles["image-stats-section"]}>
      <div className={styles["success-message"]}>
        <CheckCircle2 size={20} />

        <div>
          <strong>Imagem processada com sucesso!</strong>

          <p>
            Seu arquivo está pronto para ser baixado.
          </p>
        </div>
      </div>

      <div className={styles["stats-grid"]}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Maximize2 size={20} />
          </div>

          <div className={styles["stat-content"]}>
            <span className={styles["stat-label"]}>
              Dimensões originais
            </span>

            <strong>
              {originalDimensions.width} ×{" "}
              {originalDimensions.height} px
            </strong>
          </div>
        </div>

        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Maximize2 size={20} />
          </div>

          <div className={styles["stat-content"]}>
            <span className={styles["stat-label"]}>
              Dimensões finais
            </span>

            <strong>
              {resultDimensions.width} ×{" "}
              {resultDimensions.height} px
            </strong>
          </div>
        </div>

        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <HardDrive size={20} />
          </div>

          <div className={styles["stat-content"]}>
            <span className={styles["stat-label"]}>
              Tamanho original
            </span>

            <strong>
              {formatFileSize(originalSize)}
            </strong>
          </div>
        </div>

        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <HardDrive size={20} />
          </div>

          <div className={styles["stat-content"]}>
            <span className={styles["stat-label"]}>
              Tamanho final
            </span>

            <strong>
              {formatFileSize(resultSize)}
            </strong>
          </div>
        </div>

        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <FileImage size={20} />
          </div>

          <div className={styles["stat-content"]}>
            <span className={styles["stat-label"]}>
              Formato de saída
            </span>

            <strong>
              {getFormatName(resultFormat)}
            </strong>
          </div>
        </div>

        <div
          className={`${styles["stat-card"]} ${
            wasReduced
              ? styles["stat-positive"]
              : wasIncreased
                ? styles["stat-warning"]
                : ""
          }`}
        >
          <div className={styles["stat-icon"]}>
            {wasReduced ? (
              <ArrowDown size={20} />
            ) : (
              <ArrowUp size={20} />
            )}
          </div>

          <div className={styles["stat-content"]}>
            <span className={styles["stat-label"]}>
              Variação do tamanho
            </span>

            <strong>
              {wasReduced
                ? `Redução de ${percentageDifference.toFixed(1)}%`
                : wasIncreased
                  ? `Aumento de ${percentageDifference.toFixed(1)}%`
                  : "Sem alteração"}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageStats;