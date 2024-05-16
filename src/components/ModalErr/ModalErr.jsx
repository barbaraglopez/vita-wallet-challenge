import "./ModalErr.css";

export const ModalErr = ({ onClose, text }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <h2 className="modal-title">Hubo un error</h2>
          <p>Es probable que tengas que esperar unos segundos para volver a realizar la solicitud, para estar segur@ puedes reiniciar la sesion</p>
          <p className="modal-text">
           {Text}
          </p>
        </div>
      </div>
    </div>
  );
};
