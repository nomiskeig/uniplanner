export interface Module {
    name: string
    moduleID: number,
    stringID: string
    responsible: string,
    ects: number,
    turnus: string,
    compulsoryParts: CompulsoryPartID[],
    categories: Category[],
    requirements: String,
    successControl: String,
    content: String,
    qualificationGoals: String,
    recommendations: String | null



}
export interface PickedCategories {
    indepth1Category: Category,
    indepth2Category: Category,
    supplementaryCategory: Category
    
}

export interface PickedModule {
    module: Module,
    category: Category
}
export interface User {
    token: string,
    username: string,
    isLoggedIn: boolean
}

export interface CategoryType {
    name: string,
    typeID: number
    categories: Category[];
}
export interface Category {
    name: string,
    modules: Module[],
    categoryID: number,
    info: string,
    minECTS: number,
    maxECTS: number
    type: CategoryType

}

export type CompulsoryPartID = string
export type ModuleID = string

export interface PartPerformance {
    courses: Course[]

};
export interface Course {
    name: String
}


export interface InDepthModule {
    name: string;
    info: string;

}



export interface Turnus {
    name: string

}
