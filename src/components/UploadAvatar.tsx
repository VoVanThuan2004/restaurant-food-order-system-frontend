import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type {
  UploadProps,
  UploadChangeParam,
  UploadFile,
  RcFile,
} from "antd/es/upload";

const props: UploadProps = {
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  listType: "picture",          // Hiển thị dạng ảnh đẹp hơn (thumbnail + tên file)
  maxCount: 1,                  // ← Giới hạn tối đa 1 file (tự động thay thế file cũ nếu upload mới)
  multiple: false,              // Tắt chọn nhiều file (dù maxCount=1 đã đủ, nhưng thêm cho chắc)
  accept: "image/jpeg,image/png,image/gif,image/webp",  // ← Chỉ cho phép các loại ảnh này

  // Kiểm tra trước khi upload (tùy chọn nhưng rất khuyến khích)
  beforeUpload: (file: RcFile) => {
    const isImage = /^image\//.test(file.type);
    if (!isImage) {
      message.error("Chỉ được upload file ảnh (jpg, png, gif, webp)!");
      return Upload.LIST_IGNORE; // Không thêm vào danh sách
    }

    const isLt5M = file.size / 1024 / 1024 < 5; // Ví dụ giới hạn 5MB
    if (!isLt5M) {
      message.error("Ảnh phải nhỏ hơn 5MB!");
      return Upload.LIST_IGNORE;
    }

    return true; // Cho phép upload
  },

  onChange(info: UploadChangeParam<UploadFile>) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} upload thành công`);
      console.log("Upload thành công:", info.file.response);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload thất bại.`);
      console.log("Upload lỗi:", info.file.error);
    }
  },

  // Nếu bạn muốn xóa defaultFileList cũ (vì giờ chỉ cho 1 file)
  // defaultFileList: [], // ← comment hoặc xóa nếu không cần file mặc định
};

const UploadAvatar = () => {
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
    </Upload>
  );
};

export default UploadAvatar;