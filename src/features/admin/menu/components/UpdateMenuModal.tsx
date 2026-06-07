import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
  type UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Menu, MenuUpdateDTO } from "../types/menu";
import type { UploadChangeParam, UploadProps } from "antd/es/upload";
import { useEffect, useMemo } from "react";

type CategoryOptions = {
  value: string;
  label: string;
};

type Props = {
  isOpen: boolean;
  menu: Menu;
  categoryOptions: CategoryOptions[];
  handleSubmit: (menu: MenuUpdateDTO) => void;
  handleCancel: () => void;
  loading?: boolean;
};

type FormValues = {
  categoryId: string;
  name: string;
  price: number;
  image: UploadFile[]; // fileList
};

const normFile = (e: UploadChangeParam<UploadFile>): UploadFile[] => {
  return e?.fileList ?? [];
};

const UpdateMenuModal = (props: Props) => {
  const [form] = Form.useForm<FormValues>();

  const uploadProps: UploadProps = {
    listType: "picture",
    maxCount: 1,
    multiple: false,
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được upload file ảnh");
        return Upload.LIST_IGNORE;
      }
      // Không auto upload, để submit chung
      return false;
    },
  };

  // Tạo fileList ban đầu từ ảnh cũ
  const initialImageFileList = useMemo<UploadFile[]>(() => {
    if (!props.menu?.image) return [];
    return [
      {
        uid: `old-${props.menu._id}`,
        name: "image.png",
        status: "done",
        url: props.menu.image,
      },
    ];
  }, [props.menu]);

  // Khi modal mở (hoặc menu đổi) -> set form fields
  useEffect(() => {
    if (!props.isOpen) return;

    form.setFieldsValue({
      categoryId: props.menu.categoryId, // Select sẽ tự chọn đúng option theo value
      name: props.menu.name,
      price: Number(props.menu.price) || 0,
      image: initialImageFileList, // Upload hiển thị ảnh cũ
    });
  }, [props.isOpen, props.menu, initialImageFileList, form]);

  const onFinish = (values: FormValues) => {
    props.handleSubmit({
      _id: props.menu._id,
      categoryId: values.categoryId,
      name: values.name,
      price: values.price,
      image: values.image,
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
      confirmLoading={props.loading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Chọn danh mục */}
        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select
            showSearch
            placeholder="Chọn danh mục"
            options={props.categoryOptions.filter((c) => c.value !== null)}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Tên món ăn"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên món ăn" },
            { whitespace: true, message: "Tên món ăn không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập tên món ăn" />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá sản phẩm" },
            {
              type: "number",
              min: 0,
              message: "Giá phải lớn hơn hoặc bằng 0",
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập giá sản phẩm"
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
            }
            // parser={(value) => (value ? value.replace(/,/g, "") : "")}
          />
        </Form.Item>

        <Form.Item
          label="Hình món ăn"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Vui lòng upload hình món ăn" }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload hình món ăn</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMenuModal;
