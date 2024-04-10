import { TEvent } from "../../../common/types";
import { handleDate } from "../../../utils/utils";
import "../../../styles/Home/eventCard.scss"

export default function EventCard({ event }: { event: TEvent }) {
    console.log(event)
    return (
        <>
            <img className="eventCard-image" src={event.images[0]} alt="pic" />
            <div className="eventCard-texts">
                <h1 className="eventCard-title">{event.title}</h1>
                <span className="eventCard-startDate">{handleDate(event.dateStart)}</span>
                <span className="eventCard-address">{event.address}</span>
                <span className="eventCard-tag">{event.summary}</span>
            </div>
        </>
    )
}