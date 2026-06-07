import ToastSuccess from "../../../components/ToastSuccess";
import ChangePasswordForm from "../components/change-password-form";
import { useChangePassword } from "../hooks/useChangePassword";
import type { ChangePasswordDTO } from "../types/auth.type";

const ChangePasswordRoute = () => {
  const { loading, error, changePassword } = useChangePassword();
  const { success, contextHolder} = ToastSuccess({ msg: "Thay đổi mật khẩu thành công"})

  const onChangePassword = async (data: ChangePasswordDTO) => {
    const res = await changePassword(data);
    if (res?.status === "success") {
      success();
    }
  };

  return (
    <div>
      <ChangePasswordForm
        onChangePassword={onChangePassword}
        loading={loading}
        error={error}
      />

      {contextHolder}
    </div>
  );
};

export default ChangePasswordRoute;
