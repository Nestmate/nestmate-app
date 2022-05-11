import { toDate } from "../../helpers/helpers";
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { Badge } from "../../elements/badges/Badge";


export const MateInfo = ({ mate }) => {

    const {
        description,
        interests,
        budgetRange,
        moveDateRange,
    } = mate;

    return (
        <div>
            <div className="py-4 border-t-2 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-slate-500 mb-2">Budget Range</p>
                    <p className="text-xl flex flex-row gap-2 items-center">${budgetRange[0]} <DotsHorizontalIcon className="h-4 w-4 text-slate-500"/> ${budgetRange[1]}</p>
                </div>
                <div>
                    <p className="text-slate-500 mb-2">Move Date</p>
                    <p className="text-xl flex flex-row gap-2 items-center">{toDate(moveDateRange[0])} <DotsHorizontalIcon className="h-4 w-4 text-slate-500"/> {toDate(moveDateRange[1])}</p>
                </div>
            </div>

            <div className="py-4 border-t-2">
                <p className="text-slate-500 mb-2">Bio</p>
                <p className="text-xl">{description}</p>
            </div>

            <div className="py-4 border-t-2">
                <p className="text-slate-500 mb-2">Interest</p>
                <div className="flex flex-cols flex-wrap gap-3">
                    {interests?.map(({emoji,name}) => <Badge icon={emoji}>{name}</Badge>)}
                </div>
               
            </div>
        </div>
    )
}
