import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { alertActions } from "./alert.actions";
import { alertConstants } from "../_constants/alert.constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe("alert.actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it(`success() dispatches ${alertConstants.SUCCESS}`, () => {
    const expectedActions = [
      {
        type: alertConstants.SUCCESS,
        message: "Success!"
      }
    ];

    store.dispatch(alertActions.success("Success!"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it(`error() dispatches ${alertConstants.ERROR}`, () => {
    const expectedActions = [
      {
        type: alertConstants.ERROR,
        message: "It's a trap!"
      }
    ];

    store.dispatch(alertActions.error("It's a trap!"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it(`clear() dispatches ${alertConstants.CLEAR}`, () => {
    const expectedActions = [
      {
        type: alertConstants.CLEAR
      }
    ];

    store.dispatch(alertActions.clear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
