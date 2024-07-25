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
import { useNotificiations } from "@/hooks/useNotifications";

function compareCategories(a: Category, b: Category) {
    return a.name.localeCompare(b.name)
}

export default function Page() {

    const { categories, categoryTypes, modules, isLoading, error } = useGetPublicData(1);
    const { user, isLoggedIn } = useLogin("/plan", true);
    const { pickedModules, pickedModulesError, isPickedModulesLoading } = useGetPickedModules(user.token);
    const { pickedCategories, setPickedCategories, pickedCategoriesError, isPickedCategoriesLoading } = useGetPickedCategories(user.token);
    const { addNotification } = useNotificiations();
    const { i18n, t } = useTranslation();
    if (isLoading || isPickedModulesLoading || pickedCategories == null) {
        return <div>Loading</div>
    }

    const indepth1PickerOptions: DropdownOption<Category>[] = categoryTypes.find(type => type.name == "inDepth")!.categories.sort(compareCategories).map(cat => {
        return {
            name: cat.name,
            element: cat,
            callback: (cat: Category) => {
                let newCategories = {
                    "indepth1": cat.categoryID,
                    "indepth2": pickedCategories.indepth2Category.categoryID,
                    "supplementary": pickedCategories.supplementaryCategory.categoryID
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
                        setPickedCategories({
                            indepth1Category: cat,
                            indepth2Category: pickedCategories.indepth2Category,
                            supplementaryCategory: pickedCategories.supplementaryCategory
                        })

                    }
                    else {
                        res.json().then(text => addNotification(text.message, "Error"))
                    }
                })
            }


        }
    })
    const indepth2PickerOptions: DropdownOption<Category>[] = categoryTypes.find(type => type.name == "inDepth")!.categories.sort(compareCategories).map(cat => {
        return {
            name: cat.name,
            element: cat,
            callback: (cat: Category) => {
                let newCategories = {
                    "indepth1": pickedCategories.indepth1Category.categoryID,
                    "indepth2": cat.categoryID,
                    "supplementary": pickedCategories.supplementaryCategory.categoryID
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
                        setPickedCategories({
                            indepth1Category: pickedCategories.indepth1Category,
                            indepth2Category: cat,
                            supplementaryCategory: pickedCategories.supplementaryCategory
                        })

                    }
                    else {
                        res.json().then(text => addNotification(text.message, "Error"))
                    }

                }).catch(err => {
                })
            }


        }
    })
    const supplementaryPickerOptions: DropdownOption<Category>[] = categoryTypes.find(type => type.name == "supplementary")!.categories.sort(compareCategories).map(cat => {
        return {
            name: cat.name,
            element: cat,
            callback: (cat: Category) => {
                let newCategories = {
                    "indepth1": pickedCategories.indepth1Category.categoryID,
                    "indepth2": pickedCategories.indepth1Category.categoryID,
                    "supplementary": cat.categoryID
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
                        setPickedCategories({
                            indepth1Category: pickedCategories.indepth1Category,
                            indepth2Category: pickedCategories.indepth2Category,
                            supplementaryCategory: cat
                        })

                    }
                })
            }
        }
    })
    if (pickedModules == null) {
        return <div>Loading</div>
    }
    const inDepth1Cat = pickedCategories.indepth1Category;
    const inDepth2Cat = pickedCategories.indepth2Category;
    const supplementaryCat = pickedCategories.supplementaryCategory
    const pickedInDepth1Modules = pickedModules.filter(pm => pm.category.categoryID == inDepth1Cat.categoryID).map(pm =>  ({ module: pm.module, semester: pm.semester }))
    const pickedInDepth2Modules = pickedModules.filter(pm => pm.category.categoryID == inDepth2Cat.categoryID).map(pm => ({module: pm.module, semester: pm.semester}))
    const pickedSupplementaryModules = pickedModules.filter(pm => pm.category.categoryID == supplementaryCat.categoryID).map(pm => ({module: pm.module, semester: pm.semester}))
    const inDepth1Default = indepth1PickerOptions.findIndex(option => option.element.categoryID == pickedCategories.indepth1Category.categoryID)
    const inDepth2Default = indepth2PickerOptions.findIndex(option => option.element.categoryID == pickedCategories.indepth2Category.categoryID)
    const supplementaryDefault = supplementaryPickerOptions.findIndex(option => option.element.categoryID == pickedCategories.supplementaryCategory.categoryID)
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
                    data={pickedInDepth1Modules}
                ></CategoryContainer>
                <CategoryContainer
                    name={`${t("inDepthModule")} 2`}
                    category={inDepth2Cat}
                    data={pickedInDepth2Modules}
                ></CategoryContainer>
            </div>
            <div className="grid grid-cols-2">
                <CategoryContainer
                    name={`${t("supplementaryModule")}`}
                    category={supplementaryCat}
                    data={pickedSupplementaryModules}
                ></CategoryContainer>
                <CategoryContainer
                    name={`${t("inDepthModule")} 2`}
                    category={inDepth2Cat}
                    data={pickedInDepth2Modules}
                ></CategoryContainer>
            </div>
        </div>
    </div>


}
