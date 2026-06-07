import { Select } from "antd";
import type { ItemStatus } from "../constants/item-status";
import { getItemStatusOptions } from "../utils/getItemStatusOptions";

type Props = {
  status: ItemStatus;
  onChange: (status: ItemStatus) => void;
};

const ItemStatusSelect = (props: Props) => {
  const options = getItemStatusOptions(props.status);

  return (
    <Select
      className="w-full"
      // defaultValue={props.status}
      value={props.status}
      options={options}
      onChange={(value) => props.onChange(value as ItemStatus)}
    />
  );
};

export default ItemStatusSelect;
