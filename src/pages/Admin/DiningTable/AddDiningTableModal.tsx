import { Modal, Form, Input, InputNumber, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { DiningTableRequest } from "../../../types/dining-table.type";
import { useAddDiningTable } from "../../../hooks/DiningTable/useAddDiningTable";

// Validation schema
const addDiningTableSchema = z.object({
  name: z
    .string()
    .min(1, "Tên bàn ăn không được để trống")
    .min(2, "Tên bàn ăn phải có ít nhất 2 ký tự"),
  capacity: z
    .number()
    .min(1, "Sức chứa phải lớn hơn 0")
    .max(100, "Sức chứa không được vượt quá 100"),
});

type AddDiningTableFormData = z.infer<typeof addDiningTableSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddDiningTableModal = ({ open, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddDiningTableFormData>({
    resolver: zodResolver(addDiningTableSchema),
    defaultValues: {
      name: "",
      capacity: 2,
    },
  });

  const { mutate: addDiningTable, isPending } = useAddDiningTable();

  const onSubmit = (data: AddDiningTableFormData) => {
    addDiningTable(data as DiningTableRequest, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal
      title="Thêm bàn ăn"
      open={open}
      onCancel={() => {
        reset();
        onClose();
      }}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Tên bàn ăn"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ví dụ: Bàn 1, Bàn góc, v.v..."
                size="large"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Sức chứa (người)"
          validateStatus={errors.capacity ? "error" : ""}
          help={errors.capacity?.message}
        >
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                max={100}
                placeholder="Ví dụ: 2, 4, 6, v.v..."
                size="large"
                className="w-full"
              />
            )}
          />
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end">
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            className="mr-3"
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            onClick={handleSubmit(onSubmit)}
          >
            Thêm bàn ăn
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
