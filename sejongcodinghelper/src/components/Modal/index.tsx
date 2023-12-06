import React, { ReactNode, useCallback } from 'react';
import { CreateModal, CloseModalButton } from './style';

const Modal = ({
  children,
  style,
  show,
  onCloseModal,
}: {
  children: ReactNode;
  style?: { [key: string]: string };
  show: boolean;
  onCloseModal: () => void;
}) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateModal onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
