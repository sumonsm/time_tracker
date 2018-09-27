import { authentication } from "./authentication.reducer.js";
import { userConstants } from "../_constants/user.constants";

const userData = { username: "user@foo.com", pass: "foobar" }

describe("authentication reducer", () => {
  it("should return the initial state", () => {
    expect(authentication(undefined, {})).toEqual({});
  });

  it(`should handle ${userConstants.LOGIN_REQUEST}`, () => {
    const action = {
      type: userConstants.LOGIN_REQUEST,
      user: userData
    };
    const expectedState = {
      loggingIn: true,
      user: userData
    };
    expect(authentication({}, action)).toEqual(expectedState);
  });

  it(`should handle ${userConstants.LOGIN_SUCCESS}`, () => {
    const action = {
      type: userConstants.LOGIN_SUCCESS,
      user: userData
    };
    const expectedState = {
      loggedIn: true,
      user: userData
    };
    expect(authentication(userData, action)).toEqual(expectedState);
  });

  it(`should handle ${userConstants.LOGIN_ERROR}`, () => {
    const action = {
      type: userConstants.LOGIN_ERROR,
      user: userData
    };
    const expectedState = userData;
    expect(authentication(userData, action)).toEqual(expectedState);
  });
});
