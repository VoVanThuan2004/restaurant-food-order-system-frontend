import { useEffect, useState } from "react";
import { message, notification, Spin } from "antd";
import { getUserProfileApi, updateProfileApi } from "../../services/user.api";
import { getApiError } from "../../utils/get-api-error";
import useAuthStore from "../../stores/useAuthStore";

export const ProfilePage = () => {
  const [userId, setUserId] = useState("");

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(1);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [roles, setRoles] = useState<string[]>([]);

  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const setUserUpdate = useAuthStore((state) => state.setUserUpdate);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-600";

      case "WAITER":
        return "bg-blue-100 text-blue-600";

      case "CHEF":
        return "bg-orange-100 text-orange-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getUserProfileApi();

      if (res.status !== "success") {
        throw new Error("Không thể tải thông tin");
      }

      const user = res.data;

      setUserId(user?.userId as string);
      setFullName(user?.fullName as string);
      setPhoneNumber(user?.phoneNumber as string);
      setGender(user?.gender as number);
      setRoles(user?.roles || []);

      setAvatarUrl(user?.avatarUrl || "");

      setDateOfBirth(
        user?.dateOfBirth ? user.dateOfBirth.substring(0, 10) : "",
      );
    } catch (error) {
      const apiError = getApiError(error);

      message.error(apiError.message || "Không thể tải thông tin người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChooseAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    const previewUrl = URL.createObjectURL(file);

    setAvatarUrl(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await updateProfileApi(
        userId,
        {
          fullName,
          phoneNumber,
          gender,
          dateOfBirth,
        },
        avatarFile,
      );

      const userUpdated = res.data;


      // Cập nhật thông tin user toàn cục
      setUserUpdate({
        userId: userUpdated?.userId as string,
        fullName: userUpdated?.fullName as string,
        roles: userUpdated?.roles as string[],
        avatar: userUpdated?.avatarUrl as string,
      });
      notification.success({
        title: res.message || "Cập nhật thông tin thành công",
      });

      await fetchProfile();
    } catch (error) {
      const apiError = getApiError(error);

      message.error(apiError.message || "Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-red-500 h-36 relative">
          <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">
            <img
              src={avatarUrl || ""}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="pt-20 pb-8 px-6">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{fullName}</h2>

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {roles.map((role) => (
                <span
                  key={role}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                    role,
                  )}`}
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Upload Avatar */}
            <div className="mt-4">
              <label className="cursor-pointer text-red-500 font-medium hover:text-red-600">
                Thay đổi ảnh đại diện
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleChooseAvatar}
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              {/* FullName */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Họ tên
                </label>

                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Số điện thoại
                </label>

                <input
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ""))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Giới tính
                </label>

                <select
                  value={gender}
                  onChange={(e) => setGender(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                >
                  <option value={1}>Nam</option>
                  <option value={0}>Nữ</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Ngày sinh
                </label>

                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={saving}
                className="
                  bg-red-500
                  hover:bg-red-600
                  disabled:bg-gray-400
                  text-white
                  font-semibold
                  px-10
                  py-3
                  rounded-xl
                  shadow-md
                  transition
                "
              >
                {saving ? "Đang cập nhật..." : "Cập nhật thông tin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
