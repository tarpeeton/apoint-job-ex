export interface IMaterial {
  name: string;
  material_id: number;
  color: string | null;
  code: string;
  last_price: number;
  min_amount: number | null;
  category: string;
  parent: string;
  unit: string;
  width: string;
  remind_start_amount: number;
  remind_start_sum: number;
  remind_income_amount: number;
  remind_income_sum: number;
  remind_outgo_amount: number;
  remind_outgo_sum: number;
  remind_end_amount: number;
  remind_end_sum: number;
}


export type TotalKeys =
  | "remind_start_amount"
  | "remind_start_sum"
  | "remind_income_amount"
  | "remind_income_sum"
  | "remind_outgo_amount"
  | "remind_outgo_sum"
  | "remind_end_amount"
  | "remind_end_sum"
  | "last_price";

export type Totals = Record<TotalKeys, number>;

export interface CategoryGroup {
  items: IMaterial[];
  total: Totals;
}

export type ParentGroup = {
  [category: string]: CategoryGroup;
} & {
  total: Totals;
};

export interface GroupedMaterials {
  [parent: string]: ParentGroup;
}

export interface GroupMaterialsResult {
  grouped: GroupedMaterials;
  grandTotal: Totals;
}
