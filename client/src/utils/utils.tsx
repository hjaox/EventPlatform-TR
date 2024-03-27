import { GiMicrophone } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { BsFilm } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { TbRun } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";

export function handleDate(date: Date) {
    const dateToConvert = new Date(date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "August", "October", "November", "December"];
    const month = months[dateToConvert.getMonth()];
    const day = dateToConvert.getDate();
    const hour = dateToConvert.getHours();
    const regMinutes = dateToConvert.getMinutes();
    const regHour = hour === 0
        ? 12
        : hour > 12
            ? hour - 12
            : hour;

    return `${month} ${day} • ${regHour}:${regMinutes} ${hour > 11 ? "PM" : "AM"}`
}

export function getIcon(item: string) {
    switch (item) {
        case "Music":
            return <GiMicrophone size={35} />;
        case "Pets":
            return <MdPets size={35} />;
        case "Films":
            return <BsFilm size={35} />;
        case "Books":
            return <GoBook size={35} />;
        case "Outdoor":
            return <TbRun size={35} />;
        case "Sports":
            return <MdOutlineSportsSoccer size={35} />;
        case "Plants":
            return <PiPlantLight size={35} />
        case "Community":
            return <GrGroup size={35} />
        default:
            return <FaList size={35} />;
    }
}