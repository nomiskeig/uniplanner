export interface Module {
    name: String
    id: ModuleID,
    responsible: String,
    ects: Number,
    turnus: String,
    compulsoryParts: CompulsoryPartID[],
    requirements: String,
    successControl: String,
    content: String,
    qualificationGoals: String,
    recommendations: String | null
    partOf: String[]


}
export type CompulsoryPartID = String
export type ModuleID = String
export interface PartPerformance {
    courses: Course[]

};
export interface Course {
    name: String

}


export interface InDepthModule {
    modules: ModuleID[];
    name: String;
    info: String;

}
