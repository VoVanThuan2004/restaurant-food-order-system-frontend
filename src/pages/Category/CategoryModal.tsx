import { Form, Input } from "antd";
import { useEffect } from "react";
import ModalComponent from "../../components/ModalComponent";

const CategoryModal = ({
  isOpen,
  mode,
  categoryName,
  handleSubmit,
  handleCancel,
  loading,
}: {
  isOpen: boolean;
  mode: string;
  categoryName?: string;
  handleSubmit: (categoryName: string) => void;
  handleCancel: () => void;
  loading?: boolean;
}) => {
  const [form] = Form.useForm<{ categoryName: string }>();

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "update" && categoryName) {
      form.setFieldsValue({ categoryName });
    } else {
      form.resetFields();
    }
  }, [isOpen, mode, categoryName, form]);

  return (
    <ModalComponent
      title={mode === "add" ? "Thêm danh mục" : "Cập nhật danh mục"}
      open={isOpen}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      okText={mode === "add" ? "Thêm" : "Cập nhật"}
      cancelText="Hủy"
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          handleSubmit(values.categoryName.trim());
          form.resetFields();
        }}
      >
        <Form.Item
          label="Tên danh mục"
          name="categoryName"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục" },
            { whitespace: true, message: "Tên danh mục không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>
      </Form>
    </ModalComponent>
  );
};

export default CategoryModal;
