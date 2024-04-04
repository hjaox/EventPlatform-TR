import { GiMicrophone } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { BsFilm } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { TbRun } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";

export function handleDate(dateInput: Date) {
    const dateToConvert = new Date(dateInput);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "August", "October", "November", "December"];
    const month = months[dateToConvert.getMonth()];
    const date = dateToConvert.getDate();
    const time = dateToConvert.toLocaleTimeString("en-US")

    return `${month} ${date} • ${time}`
}

export function getIcon(item: string) {
    switch (item) {
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