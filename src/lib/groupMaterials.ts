import {
  IMaterial,
  Totals,
  ParentGroup,
  GroupMaterialsResult,
  GroupedMaterials,
} from "../types/material";
import { TOTAL_KEYS } from "@/constants/MaterialKeys";

function initTotals(): Totals {
  return {
    remind_start_amount: 0,
    remind_start_sum: 0,
    remind_income_amount: 0,
    remind_income_sum: 0,
    remind_outgo_amount: 0,
    remind_outgo_sum: 0,
    remind_end_amount: 0,
    remind_end_sum: 0,
    last_price: 0,
  };
}

export function groupMaterials(data: IMaterial[]): GroupMaterialsResult {
  const grouped: GroupedMaterials = {};
  const grandTotal: Totals = initTotals();

  for (const item of data) {
    const { parent, category } = item;

    if (!grouped[parent]) {
      grouped[parent] = {
        total: initTotals(),
      } as ParentGroup;
    }

    if (!grouped[parent][category]) {
      grouped[parent][category] = {
        items: [],
        total: initTotals(),
      };
    }

    grouped[parent][category].items.push(item);

    for (const key of TOTAL_KEYS) {
      const value = Number(item[key]) || 0;

      grouped[parent][category].total[key] += value;
      grouped[parent].total[key] += value;
      grandTotal[key] += value;
    }
  }

  return { grouped, grandTotal };
}

export function getTotalForGroup(
  grouped: GroupedMaterials,
  parent: string,
  category?: string
): Totals | null {
  if (!grouped[parent]) {
    return null;
  }

  if (category) {
    return grouped[parent][category]?.total || null;
  }

  return grouped[parent].total;
}

export function getParentNames(grouped: GroupedMaterials): string[] {
  return Object.keys(grouped);
}

export function getCategoryNames(
  grouped: GroupedMaterials,
  parent: string
): string[] {
  if (!grouped[parent]) {
    return [];
  }

  return Object.keys(grouped[parent]).filter((key) => key !== "total");
}
