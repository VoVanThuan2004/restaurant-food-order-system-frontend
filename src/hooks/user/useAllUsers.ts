import { useQuery } from "@tanstack/react-query";
import { getAllUsersApi } from "../../services/user.api";

type Props = {
  page: number;
  size: number;
  search?: string;
};

export const useAllUsers = (props: Props) => {
  return useQuery({
    queryFn: () => getAllUsersApi(props),
    queryKey: ["users", props],
    placeholderData: (previousData) => previousData,
  });
};
