import { API_URL } from "@/app/global";
import { PickedModule } from "@/app/types";
import { useState, useEffect } from "react";


export const useGetPickedModules = (token: string) => {
    const [error, setError] = useState<null | string>(null);
    const [pickedModules, setPickedModules] = useState<PickedModule[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [re, setRe] = useState<number>(0);


    function reload() {
        setRe(re+1);


    }
    useEffect(() => {
        if (token == "") {
            return
        }
        fetch(API_URL + '/api/v1/plan/getModulePicks', {
            method: 'GET', headers: {
                'Authorization': "Bearer " + token
            }
        }).then((res) => res.json())
            .then(data => {
                setPickedModules(data.data);
                setIsLoading(false)
            })
            .catch(err => setError(err.message))
    }, [token, re])

    return { reloadPickedModules: reload, pickedModulesError: error, pickedModules, isPickedModulesLoading: isLoading }

}
