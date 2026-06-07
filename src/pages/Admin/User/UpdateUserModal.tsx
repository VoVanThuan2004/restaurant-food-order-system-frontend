import { Form, Input, Select, DatePicker, Spin } from "antd";
import ModalComponent from "../../../components/ModalComponent";
import { useUpdateUser } from "../../../hooks/user/useUpdateUser";
import { useAllRoles } from "../../../hooks/role/useAllRoles";
import type { UserRequest, UserResponse } from "../../../types/user.type";
import dayjs from "dayjs";
import { useEffect } from "react";

interface UpdateUserModalProps {
  open: boolean;
  user: UserResponse | null;
  onCancel: () => void;
  onSuccess?: () => void;
}

export const UpdateUserModal = ({
  open,
  user,
  onCancel,
  onSuccess,
}: UpdateUserModalProps) => {
  const [form] = Form.useForm();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { data: rolesData, isLoading: rolesLoading } = useAllRoles();

  const roles = rolesData?.data || [];

  // Set form values when user changes
  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : undefined,
        phoneNumber: user.phoneNumber,
        roleIds: user.roles.map((role) => role.roleId) || [],
      });      
    }
  }, [open, user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues: UserRequest = {
        email: values.email,
        fullName: values.fullName,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        phoneNumber: values.phoneNumber,
        roleIds: values.roleIds || [],
      };

      updateUser({
        userId: user?.userId as string,
        user: formattedValues
      }, {
        onSuccess: () => {
          form.resetFields();
          onCancel();
          onSuccess?.();
        },
      });
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <ModalComponent
      title="Cập nhật thông tin người dùng"
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText="Cập nhật"
      cancelText="Hủy"
      width={600}
      confirmLoading={isPending}
      okButtonProps={{ loading: isPending }}
    >
      <Spin spinning={rolesLoading}>
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            label="Họ và Tên"
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên" },
              { min: 2, message: "Tên phải có ít nhất 2 ký tự" },
            ]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại phải từ 10-11 chữ số",
              },
            ]}
          >
            <Input placeholder="0912345678" />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value={1}>Nam</Select.Option>
              <Select.Option value={0}>Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
          >
            <DatePicker
              placeholder="Chọn ngày sinh"
              format="DD/MM/YYYY"
              className="w-full"
              disabledDate={(current) =>
                current && current.isAfter(dayjs().endOf("day"))
              }
            />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="roleIds"
            rules={[
              { required: true, message: "Vui lòng chọn ít nhất một vai trò" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn vai trò"
              optionLabelProp="label"
            >
              {roles.map((role: any) => (
                <Select.Option
                  key={role.roleId}
                  value={role.roleId}
                  label={role.roleName}
                >
                  {role.roleName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </ModalComponent>
  );
};
