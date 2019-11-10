import { SET_TITLE } from "../constants/action-types";

export const setPageTitle = (title: String) => {
    return {
        type: SET_TITLE,
        payload: title
    }
}