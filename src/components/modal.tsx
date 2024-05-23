import React from "react";
import { ReactComponent as CloseSVG } from '../utils/assets/close.svg';

const Modal = ({ children, closeModal, overlayClickClose = true }:
  { children: React.ReactNode, closeModal: () => void, overlayClickClose?: boolean }
) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
      <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.25)] z-10"
        onClick={() => overlayClickClose ? closeModal() : {}}>
      </div>

      <div className="bg-white shadow-md rounded-2xl w-11/12 lg:w-[600px] z-20">
        <div className="modal-header flex w-full justify-end pt-4 px-3">
          <span className="cursor-pointer" onClick={closeModal}>
            <CloseSVG />
          </span>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;