import { getIcon } from "../../../utils/utils";
import "../../../styles/Home/tagCard.scss";

export default function TagCard({tag}: {tag: string}) {
    return (
        <>
            <span className="icon-container">{getIcon(tag)}</span>
            <span className="text">{tag}</span>
        </>
    )
}