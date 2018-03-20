export const THEME_SET_IN_PROGRESS = ' THEME_SET_IN_PROGRESS';
export const THEME_SET_SUCCESS = ' THEME_SET_SUCCESS';
export const THEME_SET_FAIL = ' THEME_SET_FAIL';

export type actionType = {
  type: string,
  inProgress: ?boolean,
  name: ?string, 
  theme: ?mixed,
  shade: ?string,
  direction: ?string,
  error: ?{
    message: string,
  },
};

export type stateType = {
  inProgress: ?boolean,
  error: ?{
    message: string,
  },
};
