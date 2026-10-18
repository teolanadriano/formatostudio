import { useEffect, useState } from "react";
import { Maximize2, WandSparkles } from "lucide-react";
import style from "./ResizeControls.module.css";

function ResizeControls({
  originalDimensions,
  onResize,
  isProcessing = false,
}) {
  const [resizeMode, setResizeMode] = useState("pixels");

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [percentage, setPercentage] = useState(100);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);

  const [format, setFormat] = useState("image/png");
  const [quality, setQuality] = useState(92);

  useEffect(() => {
    if (!originalDimensions) return;

    setWidth(originalDimensions.width);
    setHeight(originalDimensions.height);
    setPercentage(100);
  }, [originalDimensions]);

  function handleWidthChange(event) {
    const newWidth = Number(event.target.value);

    setWidth(event.target.value);

    if (
      keepAspectRatio &&
      originalDimensions &&
      newWidth > 0
    ) {
      const aspectRatio =
        originalDimensions.height / originalDimensions.width;

      setHeight(Math.round(newWidth * aspectRatio));
    }
  }

  function handleHeightChange(event) {
    const newHeight = Number(event.target.value);

    setHeight(event.target.value);

    if (
      keepAspectRatio &&
      originalDimensions &&
      newHeight > 0
    ) {
      const aspectRatio =
        originalDimensions.width / originalDimensions.height;

      setWidth(Math.round(newHeight * aspectRatio));
    }
  }

  function handlePercentageChange(event) {
    const newPercentage = Number(event.target.value);

    setPercentage(newPercentage);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!originalDimensions) return;

    let targetWidth;
    let targetHeight;

    if (resizeMode === "pixels") {
      targetWidth = Number(width);
      targetHeight = Number(height);
    } else {
      targetWidth = Math.round(
        originalDimensions.width * (percentage / 100)
      );

      targetHeight = Math.round(
        originalDimensions.height * (percentage / 100)
      );
    }

    if (
      !targetWidth ||
      !targetHeight ||
      targetWidth < 1 ||
      targetHeight < 1
    ) {
      return;
    }

    onResize({
      width: targetWidth,
      height: targetHeight,
      format,
      quality: quality / 100,
    });
  }

  return (
    <section className={style["resize-controls-section"]}>
      <div className={style["section-heading"]}>
        <span className="section-label">Configuração</span>

        <h2>Ajuste sua imagem</h2>

        <p>
          Defina as dimensões e o formato desejado para exportação.
        </p>
      </div>

      <form className={style["resize-controls"]} onSubmit={handleSubmit}>
        <div className={style["control-group"]}>
          <label className={style["control-label"]}>
            Método de redimensionamento
          </label>

          <div className={style["segmented-control"]}>
            <button
              type="button"
              className={
                resizeMode === "pixels"
                  ? style["segment-button"] + " " + style["active"]

                  : style["segment-button"]
              }
              onClick={() => setResizeMode("pixels")}
            >
              Por pixels
            </button>

            <button
              type="button"
              className={
                resizeMode === "percentage"
                  ? style["segment-button"] + " " + style["active"]
                  : style["segment-button"]
              }
              onClick={() => setResizeMode("percentage")}
            >
              Por porcentagem
            </button>
          </div>
        </div>

        {resizeMode === "pixels" ? (
          <div className={style["dimensions-grid"]}>
            <div className={style["control-group"]}>
              <label htmlFor="width">Largura (px)</label>

              <input
                id="width"
                type="number"
                min="1"
                value={width}
                onChange={handleWidthChange}
                required
              />
            </div>

            <div className={style["control-group"]}>
              <label htmlFor="height">Altura (px)</label>

              <input
                id="height"
                type="number"
                min="1"
                value={height}
                onChange={handleHeightChange}
                required
              />
            </div>
          </div>
        ) : (
          <div className={style["control-group"]}>
            <div className={style["percentage-heading"]}>
              <label htmlFor="percentage">
                Escala da imagem
              </label>

              <strong>{percentage}%</strong>
            </div>

            <input
              id="percentage"
              type="range"
              min="1"
              max="200"
              step="1"
              value={percentage}
              onChange={handlePercentageChange}
            />

            <div className={style["range-labels"]}>
              <span>1%</span>
              <span>100%</span>
              <span>200%</span>
            </div>
          </div>
        )}

        {resizeMode === "pixels" && (
          <label className={style["checkbox-control"]}>
            <input
              type="checkbox"
              checked={keepAspectRatio}
              onChange={(event) =>
                setKeepAspectRatio(event.target.checked)
              }
            />

            <span>
              Manter proporção da imagem
            </span>
          </label>
        )}

        <div className={style["control-divider"]} />

        <div className={style["control-group"]}>
          <label htmlFor="format">
            Formato de saída
          </label>

          <select
            id="format"
            value={format}
            onChange={(event) => setFormat(event.target.value)}
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>

        {(format === "image/jpeg" || format === "image/webp") && (
          <div className={style["control-group"]}>
            <div className={style["percentage-heading"]}>
              <label htmlFor="quality">
                Qualidade de exportação
              </label>

              <strong>{quality}%</strong>
            </div>

            <input
              id="quality"
              type="range"
              min="10"
              max="100"
              step="1"
              value={quality}
              onChange={(event) =>
                setQuality(Number(event.target.value))
              }
            />

            <div className={style["range-labels"]}>
              <span>Menor arquivo</span>
              <span>Maior qualidade</span>
            </div>
          </div>
        )}

        <button
          className={"primary-button" + " " + style["resize-button"]}
          type="submit"
          disabled={isProcessing}
        >
          <WandSparkles size={18} />

          {isProcessing
            ? "Processando..."
            : "Gerar resultado"}
        </button>
      </form>
    </section>
  );
}

export default ResizeControls;