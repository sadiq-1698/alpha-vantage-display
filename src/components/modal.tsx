import React from "react";
import { ReactComponent as CloseSVG } from '../utils/assets/close.svg';

const Modal = ({ children, closeModal }: { children: React.ReactNode, closeModal: () => void }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.25)]">
      <div className="bg-white shadow-md rounded-2xl w-11/12 lg:w-[600px]">
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