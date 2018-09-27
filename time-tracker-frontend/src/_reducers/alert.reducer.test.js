import { alert } from "./alert.reducer.js";
import { alertConstants } from "../_constants/alert.constants";

describe("alert reducer", () => {
  it("should return the initial state", () => {
    expect(alert(undefined, {})).toEqual({});
  });

  it(`should handle ${alertConstants.SUCCESS}`, () => {
    const action = {
      type: alertConstants.SUCCESS,
      message: "foo"
    };
    const expectedState = {
      "message": "foo",
      "type": "alert-success"
    };
    expect(alert({}, action)).toEqual(expectedState);
  });

  it(`should handle ${alertConstants.ERROR}`, () => {
    const action = {
      type: alertConstants.ERROR,
      message: "foo"
    };
    const expectedState = {
      "message": "foo",
      "type": "alert-danger"
    };
    expect(alert({}, action)).toEqual(expectedState);
  });

  it(`should handle ${alertConstants.CLEAR}`, () => {
    const action = {
      type: alertConstants.CLEAR,
    };
    const expectedState = {};
    expect(alert({}, action)).toEqual(expectedState);
  });
});
