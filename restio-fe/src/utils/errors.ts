import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'react-i18next';

const useErrorParser = (): {
    extractErrorMessage: (e: FetchBaseQueryError | SerializedError) => string;
} => {
    const { t } = useTranslation();
    const defaultError = t('error.default');
    const extractErrorMessage = (e: FetchBaseQueryError | SerializedError) => {
        // error is either thunk error or api error
        // we implement this type guard to extract message when it is an api error
        if (e && 'data' in e) {
            const typeError = e;
            const errorData = typeError.data as Error;
            return errorData.message ?? defaultError;
        }
        return defaultError;
    };
    return { extractErrorMessage };
};

export { useErrorParser };
