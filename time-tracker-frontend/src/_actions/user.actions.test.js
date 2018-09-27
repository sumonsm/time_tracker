import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { userActions } from "./user.actions";
import { userConstants } from "../_constants/user.constants";

// mock the API calls
jest.mock("../_services/user.service");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe("user.actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("login() dispatches USERS_LOGIN_REQUEST and triggers sign_in request via API", () => {
    const expectedActions = [
      {
        type: userConstants.LOGIN_REQUEST,
        user: { username: "user@foo.com" }
      }
    ];

    store.dispatch(userActions.login("user@foo.com", "password"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("logout() dispatches USERS_LOGOUT", () => {
    const expectedActions = [
      {
        type: userConstants.LOGOUT
      }
    ];

    store.dispatch(userActions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
