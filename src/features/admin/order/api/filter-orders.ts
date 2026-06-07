import { http } from "../../../../app/api/http";
import type { FilterProps } from "../types/filter-props";

export const filterOrderApi = async (props: FilterProps) => {
  const params = new URLSearchParams();

  if (props.startDate) params.append("startDate", props.startDate);
  if (props.endDate) params.append("endDate", props.endDate);
  if (props.shift) params.append("shift", props.shift);
  if (props.page) params.append("page", String(props.page));
  if (props.limit) params.append("limit", String(props.limit));

  const res = await http.get(`/dashboard/orders?${params.toString()}`);

  return res.data;
};
