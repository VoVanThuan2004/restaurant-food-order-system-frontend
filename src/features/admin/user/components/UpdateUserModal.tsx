import { useEffect } from "react";
import type { UserUpdateDTO } from "../types/user";
import { Form, Input, Modal, Select } from "antd";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  userData: UserUpdateDTO;
  handleSubmit: (user: UserUpdateDTO) => void;
  handleCancel: () => void;
};

type FormValues = {
  fullName: string;
  phoneNumber: string;
  gender: string;
  roleName: string;
};

const UpdateUserModal = (props: Props) => {
  const [form] = Form.useForm<FormValues>();

  // Khi modal mở (hoặc menu đổi) -> set form fields
  useEffect(() => {
    if (!props.isOpen) return;

    console.log(props.userData);
    

    form.setFieldsValue({
      fullName: props.userData.fullName,
      phoneNumber: props.userData.phoneNumber,
      gender: String(props.userData.gender),
      roleName: props.userData.roleName,
    });
  }, [props.isOpen, props.userData, form]);

  const onFinish = (values: FormValues) => {
    props.handleSubmit({
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      gender: Number(values.gender),
      roleName: values.roleName,
    });
  };

  return (
    <Modal
      title="Cập nhật món ăn"
      open={props.isOpen}
      onCancel={() => {
        props.handleCancel();
        form.resetFields();
      }}
      //   afterOpenChange={(open) => {
      //     if (!open) {
      //       form.resetFields();
      //     }
      //   }}
      okText="Cập nhật"
      cancelText="Hủy"
      onOk={() => form.submit()}
      confirmLoading={props.isLoading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên" },
            { whitespace: true, message: "Tên không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập họ tên" />
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
            options={[
              { value: "EMPLOYEE", label: "Nhân viên" },
              { value: "CHEF", label: "Bếp" },
            ]}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
