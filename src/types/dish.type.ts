export interface DishResponse {
  dishId: string;
  name: string;
  basePrice: number;
  image: string;
  status: boolean;
}

export interface DishRequest {
  categoryId: string;
  name: string;
  basePrice: number;
  variantGroups: DishVariantGroupRequest[];
}

export interface DishVariantGroupRequest {
  groupId?: string;
  groupName: string;
  required: boolean;
  multiple: boolean;
  options: DishVariantOptionRequest[];
}

export interface DishVariantOptionRequest {
  optionId?: string;
  optionName: string;
  priceAdjustment: number;
}

// Response
export interface DishDetailResponse {
  categoryId: string;
  dishId: string;
  name: string;
  basePrice: number;
  image: string;
  status: boolean;
  variants: DishVariantGroupResponse[];
}

export interface DishVariantGroupResponse {
  groupId: string;
  groupName: string;
  required: boolean;
  multiple: boolean;
  options: DishVariantOptionResponse[];
}

export interface DishVariantOptionResponse {
  optionId: string;
  optionName: string;
  priceAdjustment: number;
}
