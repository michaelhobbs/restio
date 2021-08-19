import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { InputProps } from '.';
import { useRules } from '../../utils/forms';
import GenericInput from './GenericInput';

export const ReviewComment: FC<InputProps> = ({ disabled }) => {
    const { t } = useTranslation();
    const rules = useRules();
    return (
        <GenericInput<{ comment: string }>
            controlProps={{
                name: 'comment',
                rules: {
                    required: rules.required,
                    ...rules.minLength(1),
                    ...rules.maxLength(1000),
                },
            }}
            disabled={disabled}
            label={t('reviews.comment')}
            textFieldProps={{
                multiline: true,
                maxRows: 20,
                minRows: 3,
                placeholder: t('reviews.create.review.placeHolder'),
                autoFocus: true,
            }}
        />
    );
};

export const ReviewRating: FC<InputProps> = ({ disabled }) => {
    const { t } = useTranslation();
    const rules = useRules();
    return (
        <GenericInput<{ rating: number }>
            controlProps={{
                name: 'rating',
                rules: {
                    required: rules.required,
                    ...rules.min(0),
                    ...rules.max(5),
                },
            }}
            disabled={disabled}
            label={t('reviews.create.rating.label')}
            textFieldProps={{
                type: 'number',
                inputProps: { min: 0, max: 5 },
            }}
        />
    );
};

export const ReviewDate: FC<InputProps> = ({ disabled }) => {
    const { t } = useTranslation();
    const rules = useRules();
    return (
        <GenericInput<{ date: string }>
            controlProps={{
                name: 'date',
                rules: {
                    required: rules.required,
                    pattern: rules.datePattern,
                },
            }}
            disabled={disabled}
            label={t('reviews.create.date.label')}
            textFieldProps={{
                placeholder: t('reviews.create.date.placeHolder'),
                helperText: t('reviews.create.date.helper'),
            }}
        />
    );
};

export const ReviewReply: FC<InputProps> = ({ disabled }) => {
    const { t } = useTranslation();
    const rules = useRules();
    return (
        <GenericInput<{ ownerReply: string }>
            controlProps={{
                name: 'ownerReply',
                rules: {
                    ...rules.minLength(1),
                    ...rules.maxLength(1000),
                },
            }}
            disabled={disabled}
            label={t('reviews.create.ownerReply.label')}
            textFieldProps={{
                multiline: true,
                maxRows: 20,
                minRows: 3,
                placeholder: t('reviews.create.ownerReply.placeHolder'),
            }}
        />
    );
};
