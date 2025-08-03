import { useAuthStore } from "../Store/useAuthStore"

export const resetReqStatus = (key) => {
    useAuthStore.setState((state) => ({
        [`${key}ResData`]: null,
        [`${key}ReqStatus`]: {
            ...state[`${key}ReqStatus`],
            isSuccess: false,
            isError: false,
            error: null
        }

    }))
}