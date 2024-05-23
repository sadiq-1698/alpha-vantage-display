import { useState, useEffect } from "react";

export default function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleModal = () => setIsOpen(open => !open);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  }

}