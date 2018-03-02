import * as types from './types';

type State = () => types.stateType;
type Dispatch = (action: types.actionType) => void;

export const themeSet = (name: string, shade: string, theme: any, errorCallback: ?Function) =>
  async (dispatch: Dispatch, getState: State) => {
    try {
      dispatch({
        type: types.THEME_SET_IN_PROGRESS,
        inProgress: true,
      });

      dispatch({
        name,
        shade,
        theme,
        type: types.THEME_SET_SUCCESS,
      });
    } catch (err) {
      if (errorCallback) {
        errorCallback(err);
      }

      console.log(err);

      dispatch({
        type: types.THEME_SET_FAIL,
        error: {
          message: `${err.message}. Please try again`,
        },
      });
    }
  };
