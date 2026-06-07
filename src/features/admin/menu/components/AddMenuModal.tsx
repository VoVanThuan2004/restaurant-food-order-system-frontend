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
  type UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { MenuDTO } from "../types/menu";

type CategoryOptions = {
  value: string;
  label: string;
};

type Props = {
  isOpen: boolean;
  handleSubmit: (menu: MenuDTO) => void;
  handleCancel: () => void;
  loading: boolean;
  categoryOptions: CategoryOptions[];
};

const uploadProps: UploadProps = {
  name: "file",
  listType: "picture",
  maxCount: 1,
  multiple: false,
  accept: "image/*",
  beforeUpload: (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được upload file ảnh (jpg, png, webp, ...)");
      return Upload.LIST_IGNORE;
    }

    // Ví dụ limit 2MB
    const isLt2MB = file.size / 1024 / 1024 < 2;
    if (!isLt2MB) {
      message.error("Ảnh phải nhỏ hơn 2MB");
      return Upload.LIST_IGNORE;
    }

    // Chặn auto upload (giữ file để submit cùng form)
    return false;
  },
  onChange(info) {
    if (info.fileList.length > 1) {
      info.fileList = info.fileList.slice(-1);
    }
  },
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

const AddMenuModal = (props: Props) => {
  const [form] = Form.useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    props.handleSubmit({
      categoryId: values.categoryId,
      name: values.name,
      price: values.price,
      image: values.image,
    });

    // nếu handleSubmit không throw -> coi như success
    // form.resetFields();
    // props.handleCancel();
  };

  return (
    <Modal
      title="Thêm món ăn"
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

export default AddMenuModal;
