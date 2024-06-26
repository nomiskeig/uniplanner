export interface Module {
    name: String
    id: ModuleID,
    responsible: String,
    ects: String,
    turnus: String,
    compulsoryParts: CompulsoryPartID[],
    requirements: String,
    successControl: String,
    content: String,
    qualificationGoals: String,
    recommendations: String | null
    partOf: InDepthModule[]


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
    modules: ModuleID[];
    name: string;
    info: string;

}
