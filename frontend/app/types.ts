export interface Module {
    name: String
    module_id: number,
    responsible: String,
    ects: String,
    turnus: string,
    compulsoryParts: CompulsoryPartID[],
    requirements: String,
    successControl: String,
    content: String,
    qualificationGoals: String,
    recommendations: String | null
    partOf: InDepthModule[]


}
export interface PickedCategories {
    indepth1: number,
    indepth2: number,
    supplementary: number
    
}
export interface User {
    token: string,
    username: string,
    isLoggedIn: boolean
}

export interface CategoryType {
    name: string,
    categoryType_id: number
}
export interface Category {
    name: string,
    category_id: number,
    type: number,
    info: string,
    minECTS: number,
    maxECTS: number

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


export interface ModuleToCategoryMapping {
    category: number,
    module: number,


}

export interface Turnus {
    name: string

}
