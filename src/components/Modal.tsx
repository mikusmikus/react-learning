import React from "react";
import "../styles/components/modal.scss";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

const Modal = ({ children, isOpen }: ModalProps) => {
  return (
    <div className={`custom-modal ${isOpen && "custom-modal-open"}`}>
      <div>{children}</div>
    </div>
  );
};

export default Modal;
