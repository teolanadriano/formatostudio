import { Image as ImageIcon } from "lucide-react";
import styles from "./ImagePreview.module.css";

function ImagePreview({
  originalImage,
  resultImage,
  originalDimensions,
  resultDimensions,
}) {
  return (
    <section className={styles["preview-section"]} id="tools">
  <div className={styles["section-heading"]}>
    <span className="section-label">Área de trabalho</span>

    <h2>Visualização das imagens</h2>

    <p>
      Compare a imagem original com o resultado processado.
    </p>
  </div>

  <div className={styles["preview-grid"]}>
    <div className={styles["preview-card"]}>
      <div className={styles["preview-card-header"]}>
        <div>
          <h3>Imagem original</h3>

          {originalDimensions && (
            <span>
              {originalDimensions.width} ×{" "}
              {originalDimensions.height} px
            </span>
          )}
        </div>

        <span className={styles["preview-badge"]}>
          Original
        </span>
      </div>

      <div className={styles["image-container"]}>
        {originalImage ? (
          <img
            src={originalImage}
            alt="Imagem original enviada"
          />
        ) : (
          <div className={styles["empty-preview"]}>
            <ImageIcon size={32} />
            <p>Nenhuma imagem selecionada</p>
          </div>
        )}
      </div>
    </div>

    <div className={styles["preview-card"]}>
      <div className={styles["preview-card-header"]}>
        <div>
          <h3>Resultado</h3>

          {resultDimensions && (
            <span>
              {resultDimensions.width} ×{" "}
              {resultDimensions.height} px
            </span>
          )}
        </div>

        <span
          className={
            styles["preview-badge"] +
            " " +
            styles["result-badge"]
          }
        >
          Resultado
        </span>
      </div>

      <div className={styles["image-container"]}>
        {resultImage ? (
          <img
            src={resultImage}
            alt="Imagem redimensionada"
          />
        ) : (
          <div className={styles["empty-preview"]}>
            <ImageIcon size={32} />

            <p>
              O resultado aparecerá aqui após os ajustes.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
  );
}

export default ImagePreview;