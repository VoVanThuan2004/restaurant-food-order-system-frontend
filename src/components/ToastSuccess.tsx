import { message } from "antd";

const ToastSuccess = ({ msg }: { msg: string }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: msg,
      duration: 3,
    });
  };

  return { contextHolder, success };
};

export default ToastSuccess;
