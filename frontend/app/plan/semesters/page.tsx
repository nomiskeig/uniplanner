"use client"

import { Semester } from "@/app/types";
import { SemesterContainer } from "@/components/SemesterContainer";
import { useGetPickedModules } from "@/hooks/useGetPickedModules";
import { useLogin } from "@/hooks/useLogin";



export default function Page() {
    const { user } = useLogin("/plan/semesters", true);
    const { pickedModules, reloadPickedModules } = useGetPickedModules(user.token);


    const semesters: Semester[] = pickedModules.filter(pm => pm.semester != null).map(pm => pm.semester!).reduce((acc, curr) => {
        if (!acc.find(s => s.id == curr.id)) {
            return acc.concat([curr]);

        }
        return acc;
    }, []);
    return <div>
        <div className="text-2xl m-2 mt-10">Semesters</div>
        {semesters.map((s, i) => {
            const options = pickedModules.filter(pm => pm.semester && pm.semester.id == s.id);

            return <SemesterContainer reloadPicks={reloadPickedModules} key={i} name={s.name} semester={s} data={options}></SemesterContainer>

        })}
        <SemesterContainer reloadPicks={reloadPickedModules} name={"Not assigned"} semester={{
            name: "not assigned", id: "1"
        }}
            data={pickedModules.filter(pm => pm.semester == null)}
        ></SemesterContainer>
    </div>

}
