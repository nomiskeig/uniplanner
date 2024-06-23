export interface Module {
    name: String
    id: string,
    responsible: String,
    ects: String,
    turnus: String,
    compulsoryParts: CompulsoryPartID[],
    requirements: String,
    successControl: String,
    content: String,
    qualificationGoals: String,
    recommendations: String | null


}
export type CompulsoryPartID = string
export interface PartPerformance {
    courses: Course[]

};
export interface Course {
    name: String

}


export interface InDepthModule {
    modules: string;
    name: String;
    info: String;

}

export interface Category {
    name: string,
    type: CategoryType,
    minECTS: string,
    maxECTS: string
}

export interface CategoryType {
    name: string
}



export interface ModuleToCategoryMapping {
    categoryName: string,
    moduleID: string
}


export interface Parser {
    getStudyCourseName: () => string,
    getModules: () => Module[],
    getCategories: () => Category[],
    getModulesToCategoryMappings: () => ModuleToCategoryMapping[],


}
