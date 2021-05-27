import api from '@config/api';

export type ErrorResponse = {
    success: boolean,
    error_message: string
}

export const catchHttpError = (error: {[key:string]:any}): ErrorResponse => {
    if (api.debug) console.log(error);
    return { success: false, error_message: error.message };
};