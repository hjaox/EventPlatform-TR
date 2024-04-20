import file from "../assets/default.jpg";

export function handleDate(dateInput: Date) {
    const dateToConvert = new Date(dateInput);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "August", "October", "November", "December"];
    const month = months[dateToConvert.getMonth()];
    const date = dateToConvert.getDate();
    const time = dateToConvert.toLocaleTimeString("en-US");

    return `${month} ${date} • ${time}`
}

export async function fetchDefaultImage() {
    try {
        const defaultImage = await fetch(file);
        const imageBlob = await defaultImage.blob();
        const imageFile = new File([imageBlob], "defaultImage", { type: "image/jpeg" });

        return imageFile;
    } catch {
        return null
    }
}