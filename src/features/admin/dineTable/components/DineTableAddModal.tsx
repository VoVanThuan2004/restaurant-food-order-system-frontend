import { Form, Input, InputNumber, Modal } from "antd";
import type { DineTableDTO } from "../types/dine-table";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  handleSubmit: (dineTable: DineTableDTO) => void;
  handleCancel: () => void;
};

type FormValues = {
  tableName: string;
  quantity: number;
};

const DineTableAddModal = (props: Props) => {
  const [form] = Form.useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    props.handleSubmit({
      tableName: values.tableName,
      quantity: values.quantity,
    });
  };

  return (
    <Modal
      title="Thêm bàn ăn"
      open={props.isOpen}
      onCancel={() => {
        props.handleCancel();
        form.resetFields();
      }}
      afterOpenChange={(open) => {
        if (!open) {
          form.resetFields();
        }
      }}
      okText="Thêm"
      cancelText="Hủy"
      onOk={() => form.submit()}
      confirmLoading={props.isLoading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên bàn ăn"
          name="tableName"
          rules={[
            { required: true, message: "Vui lòng nhập tên món ăn" },
            { whitespace: true, message: "Tên món ăn không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập tên món ăn" />
        </Form.Item>

        <Form.Item
          label="Số lượng chỗ"
          name="quantity"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng chỗ" },
            {
              type: "number",
              min: 1,
              message: "Số lượng chỗ phải lớn hơn hoặc bằng 1",
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập số lượng chỗ"
            style={{ width: "100%" }}
            min={1}
            precision={0} // chỉ cho phép số nguyên
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DineTableAddModal;
