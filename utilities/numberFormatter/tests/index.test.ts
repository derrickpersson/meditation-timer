import { numberFormatter } from "../numberFormatter";

describe("numberFormatter", () => {
    it("should return the number as a string", () => {
        const simpleNum = 10;

        expect(numberFormatter(simpleNum)).toEqual("10");
    });

    it("should add nice formatting to numbers greater than 1000", () => {
        const thou = 1100;
        const tenThou = 10222;
        const hundyThou = 123000;
        const mill = 1000000;
        const bill = 1000000000;

        expect(numberFormatter(thou)).toEqual("1,100");
        expect(numberFormatter(tenThou)).toEqual("10,222");
        expect(numberFormatter(hundyThou)).toEqual("123,000");
        expect(numberFormatter(mill)).toEqual("1,000,000");
        expect(numberFormatter(bill)).toEqual("1,000,000,000");
    });
})