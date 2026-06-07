import { Form, Input, InputNumber, Modal } from "antd";
import { formatPriceInput } from "../../../utils/formatPrice";

type Props = {
  cashModalOpen: boolean;
  setCashModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  onPayOrder: (paymentMethod: string, amountReceived: number) => void;
};

export const PaymentCashModal = (props: Props) => {
  const { cashModalOpen, setCashModalOpen, totalPrice, onPayOrder } = props;
  const [form] = Form.useForm();

  const amountReceived = Form.useWatch("amountReceived", form);

  const changeAmount = Number(amountReceived || 0) - totalPrice;

  return (
    <Modal
      title="Thanh toán tiền mặt"
      open={cashModalOpen}
      onCancel={() => {
        setCashModalOpen(false);
        form.resetFields();
      }}
      onOk={() => form.submit()}
      okText="Xác nhận thanh toán"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          console.log(values);

          // call api payment
          onPayOrder("CASH", values.amountReceived)
        }}
      >
        {/* Tổng tiền */}
        <Form.Item label="Tổng thanh toán">
          <Input value={formatPriceInput(totalPrice)} disabled />
        </Form.Item>

        {/* Tiền nhận */}
        <Form.Item
          label="Tiền nhận"
          name="amountReceived"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiền nhận",
            },
            {
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                }

                if (Number(value) < totalPrice) {
                  return Promise.reject(
                    new Error(
                      "Tiền nhận phải lớn hơn hoặc bằng tổng thanh toán",
                    ),
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            className="w-2/3"
            min={0}
            formatter={(value) =>
              `${Number(value || 0).toLocaleString("vi-VN")}`
            }
            parser={(value) => Number(value?.replace(/\./g, "") || 0) as any}
          />
        </Form.Item>

        {/* Tiền thối */}
        <Form.Item label="Tiền thối lại">
          <Input
            disabled
            value={changeAmount > 0 ? formatPriceInput(changeAmount) : "0đ"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
