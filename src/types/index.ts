export type CheckoutPayload = {
  user_id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone: string;
  delivery_address: string;
  payment_type: "0" | "1";
  delivery_method: number;
};

export type ShippingType = {
  id: number;
  city_name: string;
  charge: number;
  is_free: number;
  status: number;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  state: string;
  city: string;
  street_address: string;
  zipcode: string;
};

export type FilterType = {
  categories: number[];
  brands: number[];
  sizes: string[];
  price: [number, number];
};

export interface AxiosErrorResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export type UpdatePasswordType = {
  current_password: string;
  password: string;
  confirmation_password: string;
};

export type AddressType = {
  id: number;
  user_id: number;
  type: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  zipcode: string;
  is_default: boolean;
};

export type UpdatedVariantKeyType = {
  vid: string;
  variant_id: number;
  variant_key: string;
  variant_sku: string;
  price: number;
};

export type DeliveryInfo = {
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // Monday, Tuesday, etc.
};

export type SubCategoryType = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
};

// auth types
export type RegisterValuesType = {
  name: string;
  email: string;
  password: string;
};

export type LoginValuesType = {
  email: string;
  password: string;
};

export type ResetPasswordType = {
  email: string;
};

export interface ProcessedVariantKeyType {
  id: number;
  vid: string;
  variant_key: string;
  variant_sku: string;
  selling_price: string;
}

export interface ProcessedVariantType {
  [color: string]: {
    image: string;
    sizes: { [size: string]: ProcessedVariantKeyType };
    default: ProcessedVariantKeyType | null;
  };
}

// cart product type
export type CartItemType = {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant_id?: number;
  vid?: string;
  variant_key?: string;
  slug: string;
  variants?: ProcessedVariantType;
};

export type WishlistType = Omit<CartItemType, "quantity">;

export type CategoryType = {
  id: number;
  name: string;
  image: string;
  products_count: number;
  sub_categories: SubCategoryType[];
  slug: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  profile_photo?: string;
  orders_count: number;
  status: number;
};

export type ReviewType = {
  id: number;
  user_id: number;
  name: string;
  product_id: number;
  user: UserType;
  rating?: string;
  message?: string;
  created_at: string;
};
export type OtherImageType = {
  id: string;
  image: string;
};
export type BrandType = {
  id: number;
  name: string;
  image: string;
  products_count?: number;
};
export type VariantType = {
  id: number;
  vid?: string;
  sku?: string;
  variant_key?: string;
  selling_price?: string;
  image: string;
};

type PolicyType = {
  id: number;
  title: string;
  image?: string;
};
export type ProductType = {
  id: number;
  category_id: number;
  sub_category_id: number;
  brand_id?: number;
  discount: null | string;
  name: string;
  sku: string;
  quantity: number;
  original_price: number;
  selling_price: number;
  image_thumbnail: string;
  video_thumbnail?: string;
  category: CategoryType;
  is_trending?: string;
  is_export: boolean;
  slug: string;
  short_description: string;
  long_description: string;
  status: number;
  total_delivery_day?: number;
  total_sold: number;
  default_sold?: string;
  show_default_sold?: boolean;
  is_free_delivery?: number;
  variants_title: string;
  reviews: ReviewType[];
  other_images: OtherImageType[];
  tags: string;
  reviews_count: number;
  reviews_avg_rating: string | null;
  variants: VariantType[];
  policies: PolicyType[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  created_at: string;
};

// checkout types
export type SelectedVariantType = {
  image: string;
  sizes: { [size: string]: ProcessedVariantKeyType };
  default: ProcessedVariantKeyType | null;
};

export type SocialLoginResponse = {
  success: boolean;
  data: {
    user: UserType;
    token: string;
  };
};

// order item type
export type OrderedItem = {
  product: ProductType;
  quantity: number;
  product_id: number;
  price: number;
  discount: string;
};

// order payment type
export type PaymentType = {
  bank_type: string;
  status: number;
};

export type OrderStatus = 0 | 1 | 2 | 3;
// 0: Pending, 1: Processing, 2: Delivered, 3: Canceled

export type PaymentStatus = 0 | 1 | 2;
// 0: Unpaid; 1: Paid; 2: Refunded

export type ChargeStatus = 0 | 1;
// 0: Unpaid, 1: Paid

export interface OrderedType {
  id: number;
  order_number: string;
  order_total: number;
  order_status: OrderStatus;
  payment?: PaymentType;

  payment_type: 0 | 1;
  payment_status: PaymentStatus;
  paid_at: string | null;

  delivery_charge: number;
  charge_status: ChargeStatus;

  order_details: OrderedItem[];

  delivery_address: string;
  delivery_at: string | null;

  phone: string;
  slug: string;
  created_at: string;
  updated_at: string;
}
