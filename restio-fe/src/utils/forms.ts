import { useTranslation } from 'react-i18next';

// complex type could be defined here
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useRules = () => {
    const { t } = useTranslation();
    return {
        required: {
            value: true,
            message: t('error.validation.required'),
        },
        minLength: (min: number) => {
            return {
                minLength: {
                    value: min,
                    message: t('error.validation.minLength', {
                        min: min,
                    }),
                },
            };
        },
        maxLength: (max: number) => {
            return {
                maxLength: {
                    value: max,
                    message: t('error.validation.maxLength', {
                        max: max,
                    }),
                },
            };
        },
        min: (min: number) => {
            return {
                min: {
                    value: min,
                    message: t('error.validation.min', {
                        min: min,
                    }),
                },
            };
        },
        max: (max: number) => {
            return {
                max: {
                    value: max,
                    message: t('error.validation.max', {
                        max: max,
                    }),
                },
            };
        },
        datePattern: {
            value: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            message: t('error.validation.date'),
        },
        numberPattern: {
            value: /^[0-9]+$/,
            message: t('error.validation.number'),
        },
        emailPattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: t('error.validation.email'),
        },
    };
};
