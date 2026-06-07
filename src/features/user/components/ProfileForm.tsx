import { useEffect, useState } from "react";
import AvatarProfile from "../../../assets/react.svg";
import { Phone, User } from "lucide-react";
import { fetchProfile } from "../api/user.api";
import { ConfigProvider, Spin } from "antd";
import UploadAvatar from "../../../components/UploadAvatar";

const ProfileForm = () => {
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    setLoading(true);
    const getProfile = async () => {
      try {
        const res = await fetchProfile();
        if (res.status !== "success" || !res.data) {
          throw new Error("Lỗi hệ thống khi tải thông tin");
        }

        const data = res.data;
        setFullName(data.fullName);
        setPhoneNumber(data.phoneNumber);
        setGender(data.gender);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-150 text-red-500">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff4d4f", // đỏ Ant Design
            },
          }}
        >
          <Spin size="large" />
        </ConfigProvider>
      </div>
    );
  }

  const handleSubmitTest = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fullName);
    setFullName("Thuan");
    setPhoneNumber("12345");
  };

  return (
    <div className="max-w-md md:max-w-xl w-full bg-white rounded-xl shadow-md mt-5 mx-auto py-5 px-4 md:px-8">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-center">
        Quản lý thông tin cá nhân
      </h1>

      {/* Avatar */}
      <div className="flex flex-col justify-center items-center mt-5 gap-1">
        <img
          src={AvatarProfile}
          alt="avatar"
          className="w-20 h-20 rounded-full border-3 border-white shadow-sm"
        />

        <UploadAvatar />
      </div>

      {/* Form */}
      <form onSubmit={(e) => handleSubmitTest(e)}>
        <div className="flex flex-col gap-1">
          <label className="text-sm">FullName</label>
          <div className="relative">
            <User className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-3 text-gray-500" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full py-2 pl-9 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm">Phone Number</label>
          <div className="relative">
            <Phone className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-3 text-gray-500" />
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phoneNumber}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setPhoneNumber(onlyDigits);
              }}
              className="w-full py-2 pl-9 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(Number(e.target.value))}
            className="w-full py-2 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
          >
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-500 w-full text-white text-[17px] font-semibold py-3 rounded-md mt-4 shadow-md cursor-pointer"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
