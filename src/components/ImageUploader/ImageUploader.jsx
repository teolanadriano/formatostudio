import { useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import styles from "./ImageUploader.module.css";

function ImageUploader({ onImageUpload }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file) {
    if (file) {
      onImageUpload(file);
    }
  }

  function handleInputChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    event.target.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  return (
    <section
      className={`${styles["uploader"]} ${
        isDragging ? styles["uploader-dragging"] : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className={styles["uploader-icon"]}>
        <ImagePlus size={32} />
      </div>

      <h2>Arraste sua imagem aqui</h2>

      <p>ou selecione um arquivo do seu dispositivo</p>

      <button
        className="primary-button"
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={18} />
        Selecionar imagem
      </button>

      <span className={styles["file-hint"]}>
        JPG · PNG · WebP · Máximo 20 MB
      </span>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={handleInputChange}
      />
    </section>
  );
}

export default ImageUploader;