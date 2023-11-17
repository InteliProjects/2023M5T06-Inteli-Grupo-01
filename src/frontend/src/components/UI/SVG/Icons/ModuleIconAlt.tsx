import SVG from "../SVG.component";
import IIcon from "./IIcon";

export default function ModuleIcon(props: IIcon){
    return <SVG link='/svg/moduloAlt.svg' {...props}/>
}