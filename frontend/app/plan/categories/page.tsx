"use client"


import { CategoryContainer } from "@/components/CategoryContainer";
import { SelectDropdown, DropdownOption } from "@/components/SelectDropdown";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { useGetPublicData } from "@/hooks/useGetPublicData";
import { useGetPickedCategories } from "@/hooks/useGetPickedCategories";
import { useGetPickedModules } from "@/hooks/useGetPickedModules";
import { useLogin } from "@/hooks/useLogin";
import { useNotificiations } from "@/hooks/useNotifications";
import { Category } from "@/app/types";
import { API_URL } from "@/app/global";

function compareCategories(a: Category, b: Category) {
    return a.name.localeCompare(b.name)
}

export default function Page() {

    const { categories, categoryTypes, modules, isLoading, error } = useGetPublicData(1);
    const { user, isLoggedIn } = useLogin("/plan/categories", true);
    const { pickedModules, pickedModulesError, isPickedModulesLoading, reloadPickedModules } = useGetPickedModules(user.token);
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
                fetch(API_URL + '/api/v1/plan/updateCategoryPicks', {
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
                fetch(API_URL + '/api/v1/plan/updateCategoryPicks', {
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
                fetch(API_URL + '/api/v1/plan/updateCategoryPicks', {
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
    const pickedInDepth1Modules = pickedModules.filter(pm => pm.category.categoryID == inDepth1Cat.categoryID)
    const pickedInDepth2Modules = pickedModules.filter(pm => pm.category.categoryID == inDepth2Cat.categoryID)
    const pickedSupplementaryModules = pickedModules.filter(pm => pm.category.categoryID == supplementaryCat.categoryID)
    const inDepth1Default = indepth1PickerOptions.findIndex(option => option.element.categoryID == pickedCategories.indepth1Category.categoryID)
    const inDepth2Default = indepth2PickerOptions.findIndex(option => option.element.categoryID == pickedCategories.indepth2Category.categoryID)
    const pickedPickAreaModules = pickedModules.filter(pm => pm.category.name == "Wahlbereich Informatik");
    const supplementaryDefault = supplementaryPickerOptions.findIndex(option => option.element.categoryID == pickedCategories.supplementaryCategory.categoryID)
    return <div>
        <div className="text-2xl m-2 mt-10">Categories</div>
        <div>
            <div className="p-2">
                <SelectDropdown title={`${t("pickedIn")} ${t("inDepthModule")} 1`} options={indepth1PickerOptions} defaultIndex={inDepth1Default} ></SelectDropdown>
                <SelectDropdown title={`${t("pickedIn")} ${t("inDepthModule")} 2`} options={indepth2PickerOptions} defaultIndex={inDepth2Default} ></SelectDropdown>
                <SelectDropdown title={`${t("pickedIn")} ${t("supplementaryModule")}`} options={supplementaryPickerOptions} defaultIndex={supplementaryDefault} ></SelectDropdown>
            </div>
            <div className="">
                <CategoryContainer
                    reloadModulePicks={ () => reloadPickedModules()}
                    name={`${t("inDepthModule")} 1`}
                    category={inDepth1Cat}
                    data={pickedInDepth1Modules}
                    modulesOfCategory={modules.filter(m => (m.categories.find(c => c.categoryID == inDepth1Cat.categoryID)) ? true : false)}
                ></CategoryContainer>
                <CategoryContainer
                    reloadModulePicks={ () => reloadPickedModules()}
                    name={`${t("inDepthModule")} 2`}
                    category={inDepth2Cat}
                    data={pickedInDepth2Modules}
                    modulesOfCategory={modules.filter(m => (m.categories.find(c => c.categoryID == inDepth2Cat.categoryID)) ? true : false)}
                ></CategoryContainer>
                <CategoryContainer
                    reloadModulePicks={ () => reloadPickedModules()}
                    name={`${t("supplementaryModule")}`}
                    category={supplementaryCat}
                    data={pickedSupplementaryModules}
                    modulesOfCategory={modules.filter(m => (m.categories.find(c => c.categoryID == supplementaryCat.categoryID)) ? true : false)}
                ></CategoryContainer>
                <CategoryContainer
                    reloadModulePicks={ () => reloadPickedModules()}
                    
                    name={`Wahlbereich`}
                    category={categories.find(c => c.name == "Wahlbereich Informatik")!}
                    data={pickedPickAreaModules}
                    modulesOfCategory={modules.filter(m => (m.categories.find(c => c.name == "Wahlbereich Informatik")) ? true : false)}
                ></CategoryContainer>
            </div>
        </div>
    </div>


}
