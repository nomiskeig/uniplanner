import { PickedModule } from "@/app/types";

export interface ExportProps {
    picks: PickedModule[],
}



export function JsonExport(props: ExportProps) {
    function exportToJSON() {
        let data: any = {};
        for (let pm of props.picks) {
            if (data[pm.category.name] == null) {
                data[pm.category.name] = [];
            }
            data[pm.category.name].push({
                name: pm.module.name,
                semester: pm.semester ? pm.semester.name : "Not assigned",
                id: pm.module.stringID
            });

        }
        // create file in browser
        const fileName = "uniplan";
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    return <button className="border-black text-white rounded pl-2 pt-1 pb-1 text-l bg-blue-700 pr-2 " onClick={exportToJSON}>Export to JSON</button>

}
