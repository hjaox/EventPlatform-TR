const eventProperties = ["title", "dateStart", "dateEnd", "address", "details", "summary", "tag", "price", "openPrice"];

export function checkPatchEvent(event: any) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address", "details", "summary", "tag", "price", "openPrice"];

    if(typeof event !== "object" || Array.isArray(event)) return false;

    for(const property of eventProperties) {
        if(Object.keys(event).includes(property)) return true;
    }

    return false;
};

export function checkPostEvent(event: any) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address"];

    if(typeof event !== "object" || Array.isArray(event)) return false;

    for(const property of eventProperties) {
        if(!Object.keys(event).includes(property)) return false;
    }

    return true;
};