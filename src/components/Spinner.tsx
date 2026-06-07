import { ConfigProvider, Spin } from "antd";

const Spinner = ({ color }: { color: string }) => {
  return (
    <div className="flex justify-center items-center min-h-150">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: color,
          },
        }}
      >
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
};

export default Spinner;
