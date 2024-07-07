import { PickedCategories } from "@/app/types";
import { useState, useEffect } from "react";


export const useGetPickedCategories = (token: string) => {
    const [error, setError] = useState<null | string>(null);
    const [pickedCategories, setPickedCategories] = useState<PickedCategories | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        if (token == "") {
            return;
        }
        

        fetch('http://localhost:8080/api/v1/plan/getCategoryPicks', {
            method: 'GET', headers: {
                'Authorization': "Bearer " + token
            }
        }).then((res) => res.json())
        .then(data => {setPickedCategories(data); setIsLoading(false)})
        .catch(err => setError(err.message))
    }, [token])

    return {pickedCategoriesError: error, pickedCategories, setPickedCategories, isPickedCategoriesLoading: isLoading}

}
