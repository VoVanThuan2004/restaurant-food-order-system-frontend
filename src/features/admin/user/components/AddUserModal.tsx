import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import type { UserForm } from "../types/user";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  handleSubmit: (user: UserForm) => void;
  handleCancel: () => void;
};

const AddUserModal = (props: Props) => {
  const [form] = useForm<UserForm>();

  const onFinish = (values: UserForm) => {
    props.handleSubmit(values);
  };

  return (
    <Modal
      title="Thêm người dùng"
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
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không đúng định dạng" },
            { whitespace: true, message: "Email không được chứa khoảng trắng" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên" },
            { whitespace: true, message: "Họ tên không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
            { whitespace: true, message: "Mật khẩu không hợp lệ" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
        >
          <Select
            placeholder="Chọn giới tính"
            style={{ width: "100%" }}
            // onChange={handleChange}
            options={[
              { value: "1", label: "Nam" },
              { value: "0", label: "Nữ" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="roleName"
          rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
        >
          <Select
            placeholder="Chọn vai trò"
            style={{ width: "100%" }}
            // onChange={handleChange}
            options={[
              { value: "EMPLOYEE", label: "Nhân viên" },
              { value: "CHEF", label: "Bếp" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
