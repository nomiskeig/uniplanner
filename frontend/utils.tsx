export function createClass(...classes: string[]): string {

    
    let res = "";
    for (let c of classes)  {
        res += c
        res += " "
    }
    return res

}
