import "./ModalSucc.css";

export const ModalSucc = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
        <div className="closeContent">
          <button className="modal-close" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-content">
          <img
            src="../../../public/images/success-icon.png"
            alt="Imagen de envío exitoso"
            className="modal-image"
          />
          <h2 className="modal-title">Envío exitoso!</h2>
          <p className="modal-text">
            El destinatario recibirá el dinero en 30 minutos.
          </p>
        </div>
      </div>
    </div>
  );
};
