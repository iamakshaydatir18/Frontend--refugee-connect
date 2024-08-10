import  { FC } from 'react';
import './model.css'; // Add your CSS for modal styling

// Define the prop types for the Modal component
interface ModalProps {
  show: boolean;
  onConfirm: () => void; // Function to handle confirmation
  onCancel: () => void;  // Function to handle cancellation
  message: string;       // The message displayed in the modal
}

// Use FC (Functional Component) with generic type ModalProps
const Modal: FC<ModalProps> = ({ show, onConfirm, onCancel, message }) => {
  if (!show) {
    return null; // Don't render the modal if it's not visible
  }

  return (
    <div className="modal-overlay modal-container">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default Modal;
