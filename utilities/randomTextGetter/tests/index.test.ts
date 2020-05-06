import { randomTextGetter } from "..";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.12352;
global.Math = mockMath;

describe("randomTextGetter", () => {
    it("should return a random text string in an array of text strings", () => {
        const texts = [ "A", "B", "C", "D", "E", "F", "G"];
        expect(randomTextGetter(texts)).toEqual(texts[5]);
    });
});