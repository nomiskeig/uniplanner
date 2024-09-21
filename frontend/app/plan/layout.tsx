'use client'

import { Button } from "@/components/Button"
import { useGetPickedModules } from "@/hooks/useGetPickedModules";
import { useLogin } from "@/hooks/useLogin";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useLogin(pathname, true);
    const { pickedModules } = useGetPickedModules(user.token)
    function onToggle() {
        if (pathname.endsWith("categories")) {
            router.push("/plan/semesters")
        } else {
            router.push("/plan/categories")
        }
    }

    const seminarECTS = pickedModules.filter(pm => pm.module.seminar).reduce((acc, curr) => acc += curr.module.ects, 0)
    const practicaECTS = pickedModules.filter(pm => pm.module.practical).reduce((acc, curr) => acc += curr.module.ects, 0);
    const total = seminarECTS + practicaECTS;

    return <div>
        <div>
            <div className="flex m-2">
                <div className="text-xl mr-10">Overview</div>
                <Button onClick={onToggle} text={"Toggle view"}></Button>
            </div>
                <div className="grid m-2 grid-cols-5 border-2 border-black w-2/5">
                    <div className="p-1 bg-gray-200">Total ECTS</div>
                    <div className="col-span-4 border-l border-black p-1 bg-gray-200">{pickedModules.reduce((acc, curr) => acc += curr.module.ects, 0) + " von 120"}</div>
                    <div className="p-1 bg-gray-300">{"Seminare"}</div>
                    <div className="col-span-4 border-l border-black p-1 bg-gray-300">{seminarECTS + " von mindestens 3"}</div>
                    <div className="p-1 bg-gray-200">{"Praktika"}</div>
                    <div className="col-span-4 border-l border-black p-1 bg-gray-200">{practicaECTS + " von mindestens 6"}</div>
                    <div className="p-1 bg-gray-300">{"Praktika und Seminare zusammen"}</div>
                    <div className="col-span-4 border-l border-black p-1 bg-gray-300">{total + "von 12 bis 18"}</div>
                </div>
        </div>
        {children}
    </div>



}
