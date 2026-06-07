import useAuthStore from "../../stores/useAuthStore"
import { StaffPage } from "./StaffPage";

export const DiningTablePage = () => {
    const roles = useAuthStore((state) => state.user?.roles);

    // Nếu role là staff -> staff page
    if (roles?.includes("ADMIN")) {
        return <StaffPage />
    }
    return (
        <div>
            Trang admin quản lý bàn ăn
        </div>
    )
}