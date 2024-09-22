import { Category, CategoryType } from "@/app/types";
import { ColumnFiltersState } from "@tanstack/react-table";
import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

let cache: {
    columnFilters: ColumnFiltersState
    categoryType: CategoryType
    indeptCategoryIndex: number

} = {
    columnFilters: [],
    categoryType: {
        name: "Alle Kategorien",
        typeID: 0,
        categories: []
    },
    indeptCategoryIndex: 0
}



export const useModulePageCache = (categories: Category[]) => {
    const { t } = useTranslation();
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(cache.columnFilters);
    const [categoryType, setCategoryType] = React.useState<CategoryType>(cache.categoryType);

    function setCachedColumnFilters(columnFilters: ColumnFiltersState) {
        cache.columnFilters = columnFilters
        setColumnFilters(columnFilters)

    }
    function setCachedCategoryType(newCatType: CategoryType) {
        cache.categoryType = newCatType;
        setCategoryType(newCatType);
    }
    function setCachedIndepthCategoryIndex(index: number) {
        cache.indeptCategoryIndex = index;
    }


    return { columnFilters: columnFilters,
        setColumnFilters: setCachedColumnFilters,
        currentCategoryType: categoryType,
        setCurrentCategoryType: setCachedCategoryType,
        setCachedIndepthCategoryIndex,
        cachedIndepthCategoryIndex: cache.indeptCategoryIndex
    }

}
