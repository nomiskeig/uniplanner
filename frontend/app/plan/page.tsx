"use client"


import { CategoryContainer } from "@/components/CategoryContainer";
import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react"
import { Category, CategoryType, Module, PickedCategories, PickedModule } from "../types";
import { useTranslation } from "react-i18next";
import { useGetPublicData } from "@/hooks/useGetPublicData";
import { useGetPickedCategories } from "@/hooks/useGetPickedCategories";
import { useGetPickedModules } from "@/hooks/useGetPickedModules";
import { useLogin } from "@/hooks/useLogin";


export default function Page() {

    const {categories, categoryTypes, modules, isLoading, error } = useGetPublicData(1);
    const {user, isLoggedIn} = useLogin("/plan", true);
    const {pickedModules, pickedModulesError, isPickedModulesLoading} = useGetPickedModules(user.token);
    const {pickedCategories, setPickedCategories, pickedCategoriesError, isPickedCategoriesLoading} = useGetPickedCategories(user.token);
    const { i18n, t } = useTranslation();
    if (isLoading || isPickedModulesLoading || pickedCategories == null) {
        return <div>Loading</div>
    }

    const inDepthType = categoryTypes.find(catType => catType.name == "inDepth")!.categoryType_id
    const supplementaryType = categoryTypes.find(catType => catType.name == "supplementary")!.categoryType_id
    const indepth1PickerOptions: DropdownOption<Category>[] = categories.filter(cat => cat.type == inDepthType).map(cat => {
        return {
            name: cat.name,
            element: cat,
            callback: (cat: Category) => {
                let newCategories = {
                    "indepth1": cat.category_id,
                    "indepth2": pickedCategories.indepth2,
                    "supplementary": pickedCategories.supplementary
                }
                fetch('http://localhost:8080/api/v1/plan/updateCategoryPicks', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    },
                    mode: 'cors',
                    body: JSON.stringify(newCategories)

                }
                ).then(res => {
                    if (res.ok) {
                        setPickedCategories(newCategories)

                    }
                })
            }


        }
    })
    const indepth2PickerOptions: DropdownOption<Category>[] = categories.filter(cat => cat.type == inDepthType).map(cat => {
        return {
            name: cat.name,
            element: cat,
            callback: (cat: Category) => {
                let newCategories = {
                    "indepth1": pickedCategories.indepth1,
                    "indepth2": cat.category_id,
                    "supplementary": pickedCategories.supplementary
                }
                fetch('http://localhost:8080/api/v1/plan/updateCategoryPicks', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    },
                    mode: 'cors',
                    body: JSON.stringify(newCategories)

                }
                ).then(res => {
                    if (res.ok) {
                        setPickedCategories(newCategories)

                    }
                })
            }


        }
    })
    const supplementaryPickerOptions: DropdownOption<Category>[] = categories.filter(cat => cat.type == supplementaryType).map(cat => {
        return {
            name: cat.name,
            element: cat,
            callback: (cat: Category) => {
                let newCategories = {
                    "indepth1": pickedCategories.indepth1,
                    "indepth2": pickedCategories.indepth2,
                    "supplementary": cat.category_id
                }
                fetch('http://localhost:8080/api/v1/plan/updateCategoryPicks', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    },
                    mode: 'cors',
                    body: JSON.stringify(newCategories)

                }
                ).then(res => {
                    if (res.ok) {
                        setPickedCategories(newCategories)

                    }
                })
            }


        }
    })
    if (pickedModules == null) {
        return <div>Loading</div>
    }
    const pickedInDepth1Modules = modules.filter(m => pickedModules.find(pm => (pm.moduleID == m.module_id && pm.categoryID == pickedCategories.indepth1) ? true : false));
    const pickedInDepth2Modules = modules.filter(m => pickedModules.find(pm => (pm.moduleID == m.module_id && pm.categoryID == pickedCategories.indepth2) ? true : false));
    const inDepth1Cat = categories.find(cat => cat.category_id == pickedCategories.indepth1)!
    const inDepth2Cat = categories.find(cat => cat.category_id == pickedCategories.indepth2)!
    const inDepth1Default = indepth1PickerOptions.findIndex(option => option.element.category_id == pickedCategories.indepth1)
    const inDepth2Default = indepth1PickerOptions.findIndex(option => option.element.category_id == pickedCategories.indepth2)
    const supplementaryDefault = supplementaryPickerOptions.findIndex(option => option.element.category_id == pickedCategories.supplementary)
    return <div>
        <div>Plan</div>
        <div>
            <div className="p-2">
                <Dropdown title={`${t("pickedIn")} ${t("inDepthModule")} 1`} options={indepth1PickerOptions} defaultIndex={inDepth1Default} ></Dropdown>
                <Dropdown title={`${t("pickedIn")} ${t("inDepthModule")} 2`} options={indepth2PickerOptions} defaultIndex={inDepth2Default} ></Dropdown>
                <Dropdown title={`${t("pickedIn")} ${t("supplementaryModule")}`} options={supplementaryPickerOptions} defaultIndex={supplementaryDefault} ></Dropdown>
            </div>
            <div className="grid grid-cols-2">
                <CategoryContainer
                    name={`${t("inDepthModule")} 1`}
                    category={inDepth1Cat}
                    modules={pickedInDepth1Modules}
                ></CategoryContainer>
                <CategoryContainer
                    name={`${t("inDepthModule")} 2`}
                    category={inDepth2Cat}
                    modules={pickedInDepth2Modules}
                ></CategoryContainer>
            </div>
        </div>
    </div>


}
