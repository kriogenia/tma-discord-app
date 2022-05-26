import assert from "assert";
import { describe, it } from "mocha";
import { nextSunday } from "../src/util/index.js";

describe("the next sunday function", () => {
  it("should return the date of the next sunday", () => {
    const date = nextSunday();
    assert.equal(date.getDay(), 0);
    assert.ok(date > new Date());
  });
});
