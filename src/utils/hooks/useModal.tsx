import { useState } from "react";

export default function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleModal = () => setIsOpen(open => !open);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  }

}