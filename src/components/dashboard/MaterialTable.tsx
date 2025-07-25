"use client";
import React,{ useState } from "react";
import {groupMaterials} from '@/lib/groupMaterials'
import { TOTAL_KEYS } from "@/constants/MaterialKeys";
import { formatNumber } from "@/helpers/formatNumber";
import { getColumnTitle } from "@/helpers/columnTable";

import {
  IMaterial,
  CategoryGroup,
} from "@/types/material";

interface Props {
  data: IMaterial[];
}






export const MaterialTable = ({ data }: Props) => {
  const { grouped, grandTotal } = groupMaterials(data);
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({});
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const toggleParent = (key: string) => {
    setOpenParents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCategory = (key: string) => {
    setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-left min-w-[200px]">
              Материал
            </th>
            {TOTAL_KEYS.map((key) => (
              <th
                className="border border-gray-300 p-2 text-center min-w-[120px]"
                key={key}
              >
                {getColumnTitle(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-yellow-50 font-bold text-lg">
            <td className="border border-gray-300 p-2">Итого </td>
            {TOTAL_KEYS.map((key) => (
              <td
                className="border border-gray-300 p-2 text-right font-mono"
                key={key}
              >
                {formatNumber(grandTotal[key])}
              </td>
            ))}
          </tr>

          {Object.entries(grouped).map(([parent, parentData]) => (
            <React.Fragment key={parent}>
              <tr
                className="bg-blue-50 font-semibold cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => toggleParent(parent)}
              >
                <td className="border border-gray-300 p-2">
                  <span className="inline-block border border-black w-4  text-center">
                    {openParents[parent] ? "-" : "+"}
                  </span>
                  <span className="ml-2">{parent}</span>
                </td>
                {TOTAL_KEYS.map((key) => (
                  <td
                    className="border border-gray-300 p-2 text-right font-mono"
                    key={key}
                  >
                    {formatNumber(parentData.total[key])}
                  </td>
                ))}
              </tr>

              {openParents[parent] &&
                Object.entries(parentData)
                  .filter(([category]) => category !== "total")
                  .map(([category, catData]) => {
                    const catKey = `${parent}--${category}`;
                    const categoryData = catData as CategoryGroup;

                    return (
                      <React.Fragment key={catKey}>
                        <tr
                          className="bg-green-50 cursor-pointer hover:bg-green-100 transition-colors"
                          onClick={() => toggleCategory(catKey)}
                        >
                          <td className="border border-gray-300 p-2 pl-6">
                            <span className="inline-block border border-black w-4  text-center">
                              {openCategories[catKey] ? "-" : "+"}
                            </span>
                            <span className="ml-2">{category}</span>
                          </td>
                          {TOTAL_KEYS.map((key) => (
                            <td
                              className="border border-gray-300 p-2 text-right font-mono"
                              key={key}
                            >
                              {formatNumber(categoryData.total[key])}
                            </td>
                          ))}
                        </tr>

                        {openCategories[catKey] &&
                          categoryData.items.map((item, index) => (
                            <tr
                              key={item.material_id}
                              className="bg-white hover:bg-gray-50 transition-colors"
                            >
                              <td className="border border-gray-300 p-2 pl-10 text-gray-700">
                                <span className="font-bold  text-black">
                                  {index + 1})
                                </span>
                                <span className="ml-1 text-blue-700">
                                  {item.name}
                                </span>
                              </td>
                              {TOTAL_KEYS.map((key) => (
                                <td
                                  className="border border-gray-300 p-2 text-right font-mono text-gray-600"
                                  key={key}
                                >
                                  {formatNumber(item[key])}
                                </td>
                              ))}
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
