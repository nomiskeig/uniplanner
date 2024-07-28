import { API_URL } from "@/app/global";
import { Category, CategoryType, Module } from "@/app/types";
import { useState, useEffect } from "react";

export const useGetPublicData = (studyCourseID: number) => {
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [modules, setModules] = useState<Module[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);



    useEffect(() => {
        fetch(API_URL + `/api/v1/data/categories?studyCourseID=${studyCourseID}`)
            .then((res => res.json()))
            .then((data) => setCategories(data.data))
            .catch(err => setError(err.message))

        fetch(API_URL + `/api/v1/data/categoryTypes?studyCourseID=${studyCourseID}`)
            .then((res => res.json()))
            .then((data) => setCategoryTypes(data.data))
            .catch(err => setError(err.message))
        fetch(API_URL + `/api/v1/data/modules?studyCourseID=${studyCourseID}`)
            .then((res => res.json()))
            .then((data) => setModules(data.data))
            .catch(err => setError(err.message))
    }, [])


    useEffect(() => {
        if (modules.length > 0 && categoryTypes.length > 0 && categories.length > 0) {
            setIsLoading(false)
        }

    }, [modules, categories, categoryTypes])
    return {modules, categories, categoryTypes, isLoading, error}


}

