import { Modal } from 'antd';
import type { ReactNode } from 'react';

interface ModalComponentProps {
  title: string | ReactNode;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: { loading?: boolean };
  width?: number | string;
  children?: React.ReactNode;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  confirmLoading?: boolean;
  loading?: boolean;
}

const ModalComponent = ({
  title,
  open,
  onCancel,
  onOk,
  okText = "OK",
  cancelText = "Hủy",
  okButtonProps = { loading: false },
  width = 520,
  children,
  maskClosable = true,
  destroyOnClose = true,
  confirmLoading,
  loading,
  ...restProps
}: ModalComponentProps) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      okButtonProps={okButtonProps}
      width={width}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      confirmLoading={confirmLoading}
      loading={loading}
      {...restProps}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;