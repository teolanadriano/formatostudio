import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ImageUploader from "./components/ImageUploader/ImageUploader";
import ImagePreview from "./components/ImagePreview/ImagePreview";
import ImageStats from "./components/ImageStats/ImageStats";
import ResizeControls from "./components/ResizeControls/ResizeControls";
import DownloadButton from "./components/DownloadButton/DownloadButton";

import { useImageResizer } from "./features/resizer/useImageResizer";

import styles from "./App.module.css";

function App() {
  const {
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
    hasImage,
    hasResult,

    handleImageUpload,
    handleResize,
    handleReset,
  } = useImageResizer();

  return (
    <div className={styles.app} id="top">
      <Header />

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className="section-label">
              
            </span>

            <h1>
              Redimensione suas imagens
              <br />
              com simplicidade.
            </h1>

            <p>
              Ajuste dimensões, preserve a qualidade e exporte
              suas imagens diretamente no navegador.
            </p>
          </div>
        </section>

        {!hasImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <>
            <div className={styles.uploadedFileBar}>
              <div>
                <strong>{originalFile?.name}</strong>

                <span>
                  Imagem carregada com sucesso
                </span>
              </div>

              <button
                className={styles.secondaryButton}
                onClick={handleReset}
                type="button"
              >
                Substituir imagem
              </button>
            </div>

            <div className={styles.configArea}>
              <div className={styles.controls}>
                <ResizeControls
                  originalDimensions={originalDimensions}
                  onResize={handleResize}
                  isProcessing={isProcessing}
                />
              </div>

              {error && (
                <p className={styles.processingError}>
                  {error}
                </p>
              )}

              <ImagePreview
                originalImage={originalImage}
                resultImage={resultImage}
                originalDimensions={originalDimensions}
                resultDimensions={resultDimensions}
              />
            </div>


            <ImageStats
              originalDimensions={originalDimensions}
              resultDimensions={resultDimensions}
              originalSize={originalSize}
              resultSize={resultSize}
              resultFormat={resultFormat}
            />

            {hasResult && (
              <div className={styles.downloadArea}>
                <DownloadButton
                  resultImage={resultImage}
                  originalFile={originalFile}
                  format={resultFormat}
                />
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;