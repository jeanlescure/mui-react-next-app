import * as types from './types';

type State = () => types.stateType;
type Dispatch = (action: types.actionType) => void;

export const themeSet = (
  name: string,
  theme: any,
  shade: string,
  direction: string,
  successCallback: ?Function,
  errorCallback: ?Function,
) =>
  async (dispatch: Dispatch, getState: State) => {
    try {
      dispatch({
        type: types.THEME_SET_IN_PROGRESS,
        inProgress: true,
      });

      if (errorCallback) {
        errorCallback(err);
      }

      dispatch({
        name,
        theme,
        shade,
        direction,
        type: types.THEME_SET_SUCCESS,
      });
    } catch (err) {
      console.log(err);

      if (errorCallback) {
        errorCallback(err);
      }

      dispatch({
        type: types.THEME_SET_FAIL,
        error: {
          message: `${err.message}. Please try again`,
        },
      });
    }
  };
