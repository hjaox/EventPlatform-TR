import { checkPatchEvent, checkPostEvent, checkAttendee, checkIfValidObjectId } from "../../utils/utils";

describe("utils functions tests", () => {
    describe("function checkPatchEvent tests", () => {
        test("returns a boolean", () => {
            const testVal = {
                title: "test"
            };

            expect(typeof checkPatchEvent(testVal)).toBe("boolean");
        });
        test("returns false if input value is not an object", () => {

            expect(checkPatchEvent("test")).toBeFalsy();
            expect(checkPatchEvent(123)).toBeFalsy();
            expect(checkPatchEvent(["test"])).toBeFalsy();
            expect(checkPatchEvent(false)).toBeFalsy();
        });
        test("returns true if input is an object with the required properties", () => {
            const testVal = {
                title: "test"
            };

            expect(checkPatchEvent(testVal)).toBeTruthy();
        });
        test("returns false if input does not have the properties required", () => {
            const testVal = {
                wrongProperty: "",
            };

            expect(checkPatchEvent(testVal)).toBeFalsy();
        });
    });

    describe("function checkPostEvent tests", () => {
        test("returns a boolean", () => {
            const testVal = {
                title: "test",
                dateStart: Date.now(),
                dateEnd: Date.now(),
                address: ""
            };

            expect(typeof checkPostEvent(testVal)).toBe("boolean");
        });
        test("returns false if input value is not an object", () => {

            expect(checkPostEvent("test")).toBeFalsy();
            expect(checkPostEvent(123)).toBeFalsy();
            expect(checkPostEvent(["test"])).toBeFalsy();
            expect(checkPostEvent(false)).toBeFalsy();
        });
        test("returns true if input is an object with the required properties", () => {
            const testVal = {
                title: "test",
                dateStart: Date.now(),
                dateEnd: Date.now(),
                address: ""
            };

            expect(checkPostEvent(testVal)).toBeTruthy();
        });
        test("returns false if input does not have all the properties required", () => {
            const testVal = {
                wrongProperty: "test",
                dateStart: Date.now(),
                dateEnd: Date.now(),
                address: ""
            };

            expect(checkPostEvent(testVal)).toBeFalsy();
        });
    });

    describe("function checkAttendee tests", () => {
        test("returns a boolean", () => {
            const testVal = {
                name: "test",
                email: "test@gmail.com",
                quantity: 1
            };

            expect(typeof checkAttendee(testVal)).toBe("boolean");
        });
        test("returns false if input value is not an object", () => {

            expect(checkAttendee("test")).toBeFalsy();
            expect(checkAttendee(123)).toBeFalsy();
            expect(checkAttendee(["test"])).toBeFalsy();
            expect(checkAttendee(false)).toBeFalsy();
        });
        test("returns true if input is an object with the required properties", () => {
            const testVal = {
                name: "test",
                email: "test@gmail.com",
                quantity: 1
            };

            expect(checkAttendee(testVal)).toBeTruthy();
        });
        test("returns false if input does not have all the properties required", () => {
            const testVal = {
                wrongProperty: "test",
                email: "test@gmail.com",
                quantity: 1
            };

            expect(checkAttendee(testVal)).toBeFalsy();
        });
    });

    describe("function checkIfValidObjectId tests", () => {
        test("returns true if input is a valid ObjectId string", () => {
            expect(checkIfValidObjectId("6621146a81c00918505b1ff7")).toBeTruthy();
        });
        test("returns false if input is a not valid ObjectId", () => {
            expect(checkIfValidObjectId("test")).toBeFalsy();
            expect(checkIfValidObjectId({test :"6621146a81c00918505b1ff7"})).toBeFalsy();
            expect(checkIfValidObjectId(["6621146a81c00918505b1ff7"])).toBeFalsy();
        });
    });
});