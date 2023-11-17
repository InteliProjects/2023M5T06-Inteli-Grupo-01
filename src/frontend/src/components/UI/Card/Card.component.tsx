import { BsGithub } from "react-icons/bs";
import ICard from "./ICard.component";



export default function Card (props:ICard) {

    return(
        <div className="w-52 h-48 p-2 bg-purple rounded-md shadow-md">

            <div className="flex flex-col gap-2 text-white">

                <div className="overflow-hidden text-center mt-1 font-bold">
                    <h1>{props.module}</h1>
                </div>

                <div className="text-center overflow-hidden max-h-16">
                    <h1>{props.project}</h1>
                </div>

                <div className="text-center font-bold">
                    <h1>{props.company}</h1>
                </div>

                <div className="flex justify-center mb-1">
                    <a href={props.githubLink} target="_blank"><BsGithub size={32}/></a>
                </div>

            </div>    
        </div>
    )
}