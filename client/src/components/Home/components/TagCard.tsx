import "../../../styles/Home/tagCard.scss";
import { GiMicrophone } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { BsFilm } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { TbRun } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { TiThSmall } from "react-icons/ti";
import { TTagCard } from "../../../common/types";

export default function TagCard({ tag, setSelectedTag, selectedTag }: TTagCard) {
    function getIcon(item: string) {
        switch (item) {
            case "All":
                return <TiThSmall className="icon" />
            case "Music":
                return <GiMicrophone className="icon" />;
            case "Pets":
                return <MdPets className="icon" />;
            case "Films":
                return <BsFilm className="icon" />;
            case "Books":
                return <GoBook className="icon" />;
            case "Outdoor":
                return <TbRun className="icon" />;
            case "Sports":
                return <MdOutlineSportsSoccer className="icon" />;
            case "Plants":
                return <PiPlantLight className="icon" />
            case "Community":
                return <GrGroup className="icon" />
            default:
                return <FaList className="icon" />;
        }
    }

    return (
        <li className={`home-tags-list-item ${selectedTag === tag ? "active-item" : ""}`} onClick={() => setSelectedTag(tag)}>
            <span className="icon-container">{getIcon(tag)}</span>
            <span className="text">{tag}</span>
        </li>
    )
}