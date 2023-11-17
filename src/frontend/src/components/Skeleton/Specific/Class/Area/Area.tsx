import IArea from "./IArea";


export default function Area(props:IArea) {


    //const colunas: string = ``${colunas}

    return(
        <div className={`${props.className}`}>
            <div className="w-full h-full">
                {props.children}
            </div>
        </div>
    )
}