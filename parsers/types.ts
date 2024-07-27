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
    isPractical: boolean,
    isSeminar: boolean,
    isStammmodul: boolean


}
export type CompulsoryPartID = string
export interface PartPerformance {
    courses: Course[]

};


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

export interface ModulePartToModuleMapping {
    stringModulePartID: string,
    stringModuleID: string,

}

export interface ModulePart {
    stringID: string,
    kind: string,
    name: string,
    ects: string,
    successControl: string,
    requirements: string,
    recommendations: string,
    courses: Course[]

}

export interface Course {
    semester: string,
    id: string,
    link: string,
    courseName: string,
    sws: string,
    type: string,
    responsible: string


}

export interface Parser {
    getStudyCourseName: () => string,
    getModules: () => Module[],
    getCategories: () => Category[],
    getModulesToCategoryMappings: () => ModuleToCategoryMapping[],
    getModulePartToModuleMappings: () => ModulePartToModuleMapping[]
    getModuleParts: () => ModulePart[]

}
