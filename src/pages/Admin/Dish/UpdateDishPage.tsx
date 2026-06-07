import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDishDetailApi } from "../../../services/dish.api";
import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Select,
  Switch,
  Upload,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  message,
  type UploadFile,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useCategories } from "../../../hooks/category/useCategories";
import Spinner from "../../../components/Spinner";
import { useUpdateDish } from "../../../hooks/dish/useUpdateDish";
const { Title } = Typography;

export const UpdateDishPage = () => {
  const { dishId } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hàm kiểm tra xem có upload ảnh mới hay không
  const hasNewImageUpload = (): boolean => {
    if (fileList.length === 0) return false;

    // Nếu có file nào không phải là ảnh cũ (uid !== "-1"), tức là có ảnh mới
    return fileList.some((file) => file.uid !== "-1");
  };

  // Lấy file ảnh mới (nếu có)
  const getNewImageFile = (): File | null => {
    const newFile = fileList.find((file) => file.uid !== "-1");
    if (newFile && newFile.originFileObj) {
      return newFile.originFileObj;
    }
    return null;
  };

  // Fetch chi tiết món ăn
  const fetchDishDetail = async () => {
    if (!dishId) return;
    setLoading(true);

    try {
      const res = await getDishDetailApi(dishId);
      const dish = res.data;

      // Chuẩn bị fileList cho ảnh hiện tại
      if (dish?.image) {
        // setOriginalImageUrl(dish.image);
        setFileList([
          {
            uid: "-1",
            name: "current-image.jpg",
            status: "done",
            url: dish.image,
          },
        ]);
      }

      // Map dữ liệu vào form
      form.setFieldsValue({
        categoryId: dish?.categoryId,
        name: dish?.name,
        basePrice: dish?.basePrice,
        status: dish?.status,
        variantGroups: dish?.variants.map((group) => ({
          groupId: group.groupId,
          groupName: group.groupName,
          required: group.required,
          multiple: group.multiple,
          options: group.options.map((option) => ({
            optionId: option.optionId,
            optionName: option.optionName,
            priceAdjustment: option.priceAdjustment,
          })),
        })),
      });
    } catch {
      message.error("Không thể tải thông tin món ăn");
      navigate("/admin/dish");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishDetail();
  }, [dishId]);

  // Gọi hook api lấy danh sách categories
  const { data: categoryData } = useCategories();
  const categories = categoryData?.data || [];
  const categoryOptions = categories.map((c) => ({
    label: c.categoryName,
    value: c.categoryId,
  }));

  // Gọi hook api cập nhật món ăn
  const updateDishMutation = useUpdateDish();

  const onFinish = (values: any) => {
    if (!dishId) return;

    // Kiểm tra xem có upload ảnh mới hay không
    if (hasNewImageUpload()) {
      const newImageFile = getNewImageFile();

      // Gọi API update kèm ảnh mới (FormData)
      updateDishMutation.mutate({
        dishId,
        file: newImageFile as File,
        dishRequest: values,
      });
    } else {
      // Gọi API update không kèm ảnh (chỉ cập nhật các field khác)
      updateDishMutation.mutate({
        dishId,
        dishRequest: values,
      });
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Title level={3} className="mb-6 text-gray-800">
          Cập nhật món ăn
        </Title>

        {/* ==================== OVERLAY LOADING ==================== */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
            <Spinner color="#1677ff" />
          </div>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: true,
            variantGroups: [{ required: true, multiple: false, options: [{}] }],
          }}
        >
          <Row gutter={[24, 24]}>
            {/* ==================== CỘT TRÁI - Thông tin chính ==================== */}
            <Col xs={24} lg={14}>
              <Card
                title="Thông tin món ăn"
                className="shadow-sm border border-gray-100"
                styles={{ body: { padding: "24px" } }}
              >
                {/* Ảnh món ăn */}
                <Form.Item label="Ảnh món ăn">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    maxCount={1}
                    beforeUpload={(file) => {
                      const isImage = file.type.startsWith("image/");
                      if (!isImage) {
                        message.error("Chỉ được tải lên file ảnh");
                        return Upload.LIST_IGNORE;
                      }
                      const isLt5M = file.size / 1024 / 1024 < 5;
                      if (!isLt5M) {
                        message.error("Ảnh phải nhỏ hơn 5MB");
                        return Upload.LIST_IGNORE;
                      }
                      return false;
                    }}
                    onChange={({ fileList: newFileList }) =>
                      setFileList(newFileList)
                    }
                  >
                    {fileList.length === 0 && (
                      <div>
                        <UploadOutlined
                          style={{ fontSize: 32, color: "#aaa" }}
                        />
                        <p className="mt-2 text-gray-500">Tải ảnh lên</p>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                {/* Danh mục */}
                <Form.Item
                  name="categoryId"
                  label="Danh mục"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục" },
                  ]}
                >
                  <Select
                    placeholder="Chọn danh mục"
                    size="large"
                    options={categoryOptions}
                  ></Select>
                </Form.Item>

                {/* Tên món ăn */}
                <Form.Item
                  name="name"
                  label="Tên món ăn"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên món ăn" },
                  ]}
                >
                  <Input placeholder="Ví dụ: Matcha Latte" size="large" />
                </Form.Item>

                {/* Giá cơ bản */}
                <Form.Item
                  name="basePrice"
                  label="Giá cơ bản (VNĐ)"
                  rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    size="large"
                    min={0}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    addonAfter="đ"
                  />
                </Form.Item>
              </Card>
            </Col>

            {/* ==================== CỘT PHẢI - Biến thể ==================== */}
            <Col xs={24} lg={10}>
              <Card
                title={
                  <div className="flex items-center justify-between">
                    <span>Biến thể & Lựa chọn</span>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        const current =
                          form.getFieldValue("variantGroups") || [];
                        form.setFieldValue("variantGroups", [
                          ...current,
                          { required: false, multiple: false, options: [{}] },
                        ]);
                      }}
                    >
                      Thêm nhóm
                    </Button>
                  </div>
                }
                className="shadow-sm border border-gray-100 h-full"
                styles={{ body: { padding: "24px" } }}
              >
                <Form.List name="variantGroups">
                  {(fields, { remove }) => (
                    <div className="space-y-6">
                      {fields.map(({ key, name }) => (
                        <Card
                          key={key}
                          size="small"
                          className="border border-gray-200 shadow-sm"
                          extra={
                            fields.length > 1 && (
                              <Button
                                danger
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => remove(name)}
                              />
                            )
                          }
                        >
                          <Space
                            direction="vertical"
                            className="w-full"
                            size="middle"
                          >
                            {/* GroupId ẩn */}
                            <Form.Item name={[name, "groupId"]} hidden>
                              <Input />
                            </Form.Item>

                            {/* Tên nhóm */}
                            <Form.Item
                              name={[name, "groupName"]}
                              label="Tên nhóm biến thể"
                              rules={[
                                { required: true, message: "Nhập tên nhóm" },
                              ]}
                            >
                              <Input placeholder="Ví dụ: Size, Đá, Topping..." />
                            </Form.Item>

                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  name={[name, "required"]}
                                  valuePropName="checked"
                                >
                                  <Switch
                                    checkedChildren="Bắt buộc"
                                    unCheckedChildren="Không bắt buộc"
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  name={[name, "multiple"]}
                                  valuePropName="checked"
                                >
                                  <Switch
                                    checkedChildren="Chọn nhiều"
                                    unCheckedChildren="Chọn một"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            <Divider orientation="horizontal" plain>
                              Lựa chọn
                            </Divider>

                            {/* Danh sách lựa chọn */}
                            <Form.List name={[name, "options"]}>
                              {(
                                optionFields,
                                { add: addOption, remove: removeOption },
                              ) => (
                                <div className="space-y-3">
                                  {optionFields.map((optField, index) => (
                                    <div
                                      key={optField.key}
                                      className="flex gap-3 items-start"
                                    >
                                      {/* Hidden field giữ optionId */}
                                      <Form.Item
                                        name={[optField.name, "optionId"]}
                                        hidden
                                      >
                                        <Input />
                                      </Form.Item>

                                      <Form.Item
                                        {...optField}
                                        name={[optField.name, "optionName"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Nhập tên lựa chọn",
                                          },
                                        ]}
                                        className="flex-1"
                                      >
                                        <Input placeholder="Tên lựa chọn" />
                                      </Form.Item>

                                      <Form.Item
                                        {...optField}
                                        name={[
                                          optField.name,
                                          "priceAdjustment",
                                        ]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Nhập giá cộng thêm",
                                          },
                                        ]}
                                      >
                                        <InputNumber
                                          placeholder="Giá +"
                                          min={0}
                                          style={{ width: 120 }}
                                          formatter={(value) =>
                                            `${value}`.replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ",",
                                            )
                                          }
                                          addonAfter="đ"
                                        />
                                      </Form.Item>

                                      {optionFields.length > 1 && (
                                        <Button
                                          danger
                                          type="text"
                                          icon={<DeleteOutlined />}
                                          onClick={() => removeOption(index)}
                                        />
                                      )}
                                    </div>
                                  ))}

                                  <Button
                                    type="dashed"
                                    onClick={() => addOption()}
                                    block
                                    icon={<PlusOutlined />}
                                  >
                                    Thêm lựa chọn
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Space>
                        </Card>
                      ))}
                    </div>
                  )}
                </Form.List>
              </Card>
            </Col>
          </Row>

          {/* ==================== Footer Buttons ==================== */}
          <div className="flex justify-end gap-4 mt-10">
            <Button size="large" onClick={() => window.history.back()}>
              Hủy
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<SaveOutlined />}
              className="px-10"
              loading={updateDishMutation.isPending}
            >
              Lưu món ăn
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
