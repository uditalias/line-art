import { random, bindToContext } from "../src/utils";

describe("utils", () => {
    describe("random", () => {
        it("should return the same number when using same min and max", () => {
            expect(random(1, 1)).toBe(1);
        });

        it("should return the number between range", () => {
            const min = 1;
            const max = 2;
            const value = random(min, max);

            expect(value).toBeGreaterThanOrEqual(min);
            expect(value).toBeLessThanOrEqual(max);
        });
    });

    describe("bindToContext", () => {
        it("should bind class methods to context", (done) => {

            class Num {
                constructor(value) {
                    this.value = value;
                    bindToContext(["inc"], this);
                }

                inc() {
                    this.value += 1;
                }
            }

            const num = new Num(5);

            window.requestAnimationFrame(num.inc);

            setTimeout(() => {
                expect(num.value).toBe(6);
                done();
            }, 120)
        });
    });
});