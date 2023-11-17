import SVG from "../SVG.component";
import IIcon from "./IIcon";

export default function CompanyIcon(props: IIcon){
    return <SVG link='/svg/company.svg' {...props}/>
}