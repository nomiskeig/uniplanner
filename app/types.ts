export interface Course {
    name: String
    id: String 

}

export interface InDepthModule {
    courses: Course[];
    name: String;
    info: String;

}
