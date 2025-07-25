"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterials } from "@/store/slices/materialSlice";
import { AppDispatch , RootState } from "@/store/store";
import { MaterialTable } from "./MaterialTable";
import { TableSkeleton } from "../ui/table-skeleton";


export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading , error } = useSelector(
    (state: RootState) => state.materials
  );

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);



  return (
    <section className="px-6 mt-10">
      <h1 className="text-4xl">Отчёт по материалам</h1>
      {isLoading && <TableSkeleton />}
      {error && <p className="text-base text-red-500">{error}</p>}
      <div className="mt-8">
        {data.length > 0 && <MaterialTable data={data} />}
      </div>
    </section>
  );
};
