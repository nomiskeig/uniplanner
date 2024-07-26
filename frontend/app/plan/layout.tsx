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
    const {user} = useLogin(pathname, true);
    const {pickedModules} = useGetPickedModules(user.token)
    function onToggle() {
        console.log(pathname)
        if (pathname.endsWith("categories")) {
            router.push("/plan/semesters")
        } else {
            router.push("/plan/categories")
        }
    }

    
return <div>
        <div>
            <div>Overview</div>
            <div>Total ECTS</div>

        <div className="grid grid-cols-5 border-2 border-black w-2/3">
            <div className="p-1 bg-gray-200">Total ECTS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{pickedModules.reduce((acc, curr) => acc += curr.module.ects, 0) + " von 120"}</div>
            <div className="p-1 bg-gray-300">{"Seminare"}</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{}</div>
            <div className="p-1 bg-gray-300">{"Praktika"}</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{}</div>
        </div>
        </div>
        <div>
            <Button onClick={onToggle} text={"Toggle view"}></Button>
        </div>

            {children}
    </div>



}
