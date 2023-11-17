import ISkeletonClassSpecific from "./ISkeletonClassSpecific"

export default function SkeletonClassSpecific (props:ISkeletonClassSpecific) {



    return(
        <div className="min-h-screen max-h-screen p-4 overflow-auto">
            <div className="grid grid-cols-12 min-h-screen max-h-screen">
                {props.children}
            </div>
        </div>
    )
}