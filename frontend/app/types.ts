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
    parts: ModulePart[];
    practical: boolean,
    seminar: boolean,
    stammmodul: boolean



}
export interface ModulePart {
    stringID: string,
    kind: string,
    ects: number,
    successControl: string,
    name: string,
    recommendations: string,
    requirements: string,
    courses: Course[]
}
export interface PickedCategories {
    indepth1Category: Category,
    indepth2Category: Category,
    supplementaryCategory: Category
    
}
export interface Course {
    semester: string,
    name: string,
    type: string,
    responsible: string,
    sws: string,
    link: string,
    id: string

}

export interface PickedModule {
    module: Module,
    category: Category,
    semester: Semester | null
}
export interface User {
    token: string,
    username: string,
    isLoggedIn: boolean,
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

export interface Semester {
    id: string,
    name: string,

}

export type CompulsoryPartID = string
export type ModuleID = string



export interface InDepthModule {
    name: string;
    info: string;

}



export interface Turnus {
    name: string

}
