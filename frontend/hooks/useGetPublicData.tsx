import { API_URL } from "@/app/global";
import { Category, CategoryType, Module } from "@/app/types";
import { useState, useEffect } from "react";

let cache: {
    categories: Category[],
    modules: Module[],
    categoryTypes: CategoryType[]
} = { categoryTypes: [], modules: [], categories: [] };
let cached: boolean = false;
export const useGetPublicData = (studyCourseID: number) => {
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [modules, setModules] = useState<Module[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);



    useEffect(() => {
        if (cached) {
            setCategories(cache.categories);
            setModules(cache.modules)
            setCategoryTypes(cache.categoryTypes)
            return;
        }
        console.log("fetiching");
        fetch(API_URL + `/api/v1/data/categories?studyCourseID=${studyCourseID}`)
            .then((res => res.json()))
            .then((data) => {
                setCategories(data.data);
                cache.categories = data.data
            })
            .catch(err => setError(err.message))

        fetch(API_URL + `/api/v1/data/categoryTypes?studyCourseID=${studyCourseID}`)
            .then((res => res.json()))
            .then((data) => {
                setCategoryTypes(data.data);
                cache.categoryTypes = data.data
            })
            .catch(err => setError(err.message))
        fetch(API_URL + `/api/v1/data/modules?studyCourseID=${studyCourseID}`)
            .then((res => res.json()))
            .then((data) => {
                setModules(data.data);
                cache.modules = data.data
            }
            )
            .catch(err => setError(err.message))
            cached = true;
    }, [])


    useEffect(() => {
        if (modules.length > 0 && categoryTypes.length > 0 && categories.length > 0) {
            setIsLoading(false)
        }

    }, [modules, categories, categoryTypes])
    return { modules, categories, categoryTypes, isLoading, error }


}

