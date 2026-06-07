import { Modal } from 'antd';

interface ModalComponentProps {
  title: string;
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
      {...restProps}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;