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
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useCategories } from "../../../hooks/category/useCategories";
import { useAddDish } from "../../../hooks/dish/useAddDish";
const { Title } = Typography;

export const CreateDishPage = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Gọi hook api lấy danh sách categories
  const { data: categoryData } = useCategories();
  const categories = categoryData?.data || [];

  const categoryOptions = categories.map((c) => ({
    label: c.categoryName,
    value: c.categoryId,
  }));

  // Gọi hook api thêm món ăn
  const addDishMutation = useAddDish();

  const onFinish = (values: any) => {
    if (!fileList.length) {
      message.error("Vui lòng tải ảnh món ăn");
      return;
    }

    if (!values.variantGroups?.length) {
      message.error("Vui lòng thêm ít nhất 1 nhóm biến thể");
      return;
    }

    const file = fileList[0]?.originFileObj as File;

    // Gọi API thêm món ăn
    addDishMutation.mutate({
        file,
        dishRequest: values
    }, {
        onSuccess: (data) => {
            message.success(data.message || "Thêm món ăn thành công");
            form.resetFields();
        }
    })
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Title level={3} className="mb-6 text-gray-800">
          Thêm món ăn mới
        </Title>

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
                <Form.Item label="Ảnh món ăn" required>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    maxCount={1}
                    className="avatar-uploader"
                    beforeUpload={(file) => {
                      // =========================
                      // CHECK FILE TYPE
                      // =========================

                      const isImage = file.type.startsWith("image/");

                      if (!isImage) {
                        message.error("Chỉ được tải lên file ảnh");
                        return Upload.LIST_IGNORE;
                      }

                      // =========================
                      // CHECK FILE SIZE
                      // =========================

                      const isLt5M = file.size / 1024 / 1024 < 5;

                      if (!isLt5M) {
                        message.error("Ảnh phải nhỏ hơn 5MB");
                        return Upload.LIST_IGNORE;
                      }

                      // Prevent auto upload
                      return false;
                    }}
                    onChange={({ fileList: newFileList }) =>
                      setFileList(newFileList)
                    }
                  >
                    {fileList.length === 0 && (
                      <div>
                        <UploadOutlined
                          style={{
                            fontSize: 32,
                            color: "#aaa",
                          }}
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
              loading={addDishMutation.isPending}
            >
              Lưu món ăn
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
