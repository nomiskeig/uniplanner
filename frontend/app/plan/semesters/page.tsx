"use client"

import { Semester } from "@/app/types";
import { SemesterContainer } from "@/components/SemesterContainer";
import { useGetPickedModules } from "@/hooks/useGetPickedModules";
import { useLogin } from "@/hooks/useLogin";



export default function Page() {
    const {user} = useLogin("/plan/semesters", true);
    const {pickedModules} = useGetPickedModules(user.token);


    const semesters: Semester[] = pickedModules.filter(pm => pm.semester != null).map(pm => pm.semester!);
    return <div>
        <div>Semesters</div>
        {semesters.map(s => {
            const options = pickedModules.filter(pm => pm.semester && pm.semester.id == s.id);

            return <SemesterContainer name = {s.name} semester={s} data={options}></SemesterContainer>

        })}
        <SemesterContainer name= {"Not assigned"} semester={{
        name: "not assigned", id:"1" 
        }}
        data={pickedModules.filter(pm => pm.semester == null)}
        ></SemesterContainer>
    </div>

}
