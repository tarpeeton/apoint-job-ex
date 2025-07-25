import { TotalKeys } from "@/types/material";

export const getColumnTitle = (key: TotalKeys): string => {
  const titles: Record<TotalKeys, string> = {
    remind_start_amount: "Нач. количество",
    remind_start_sum: "Нач. сумма",
    remind_income_amount: "Приход количество",
    remind_income_sum: "Приход сумма",
    remind_outgo_amount: "Расход количество",
    remind_outgo_sum: "Расход сумма",
    remind_end_amount: "Кон. количество",
    remind_end_sum: "Кон. сумма",
    last_price: "Цена на конец месяца",
  };
  return titles[key];
};
