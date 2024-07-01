"use client"


import { CategoryContainer } from "@/components/CategoryContainer";
import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { UserContext } from "@/components/UserContext"
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react"
import { Category, CategoryType, PickedCategories } from "../types";


export default function Page() {

    const userContext = useContext(UserContext)
    const router = useRouter();
    const [studyCourse, setStudyCourse] = React.useState<number>(1);
    const [categories, setCategories] = React.useState<Category[]>(() => [])
    const [categoryTypes, setCategoryTypes] = React.useState<CategoryType[]>(() => [])
    const [pickedCategories, setPickedCategories] = React.useState<null | PickedCategories>(null)
    useEffect(() => {
        // redirect user to login page if the user is not logged in 
        if (!userContext.user.isLoggedIn) {
            router.push("/login")
            return;
        }
        fetch(`http://localhost:8080/api/v1/data/categories?studyCourseID=${studyCourse}`).then((res => res.json())).then((data) => setCategories(data.data)).catch(err => console.log(err))
        fetch(`http://localhost:8080/api/v1/data/categoryTypes?studyCourseID=${studyCourse}`).then((res => res.json())).then((data) => setCategoryTypes(data.data)).catch(err => console.log(err))
        fetch('http://localhost:8080/api/v1/plan/getCategoryPicks', {
            method: 'GET', headers: {
                'Authorization': "Bearer " + userContext.user.token
            }
        }).then((res) => res.json()).then(data => setPickedCategories(data))

    }, [])
    const loading = categories.length == 0 || categoryTypes.length == 0 || pickedCategories == null
    if (loading) {
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
                        'Authorization': 'Bearer ' + userContext.user.token
                    },
                    mode: 'cors',
                    body: JSON.stringify(newCategories)

                }
                ).then(res => {if(res.ok) {
                        setPickedCategories(newCategories)

                }})
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
                        'Authorization': 'Bearer ' + userContext.user.token
                    },
                    mode: 'cors',
                    body: JSON.stringify(newCategories)

                }
                ).then(res => {if(res.ok) {
                        setPickedCategories(newCategories)

                }})
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
                        'Authorization': 'Bearer ' + userContext.user.token
                    },
                    mode: 'cors',
                    body: JSON.stringify(newCategories)

                }
                ).then(res => {if(res.ok) {
                        setPickedCategories(newCategories)

                }})
            }


        }
    })
    console.log(supplementaryPickerOptions)
    if (pickedCategories != null) {
    }
    return <div>
        <div>Plan</div>
            <div>
                <div>
                    <Dropdown title="Picked in depth module 1" options={indepth1PickerOptions} defaultIndex={indepth1PickerOptions.findIndex(option => option.element.category_id == pickedCategories.indepth1)} ></Dropdown>
                    <Dropdown title="Picked in depth module 2" options={indepth2PickerOptions} defaultIndex={indepth2PickerOptions.findIndex(option => option.element.category_id == pickedCategories.indepth2)} ></Dropdown>

                    <Dropdown title="Picked in supplementary module" options={supplementaryPickerOptions} defaultIndex={supplementaryPickerOptions.findIndex(option => option.element.category_id == pickedCategories.supplementary)} ></Dropdown>
                </div>
                <div>

                    <CategoryContainer name={"In depth module 1"} category={categories.find(cat => cat.category_id == pickedCategories.indepth1)!}
                     modules={[]}></CategoryContainer>
                    <CategoryContainer name={"In depth module 2"} category={categories.find(cat => cat.category_id == pickedCategories.indepth2)!}
                     modules={[]}></CategoryContainer>
                </div>
            </div>
    </div>


}
