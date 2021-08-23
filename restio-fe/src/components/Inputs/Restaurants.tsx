import { useTranslation } from 'react-i18next';
import { InputProps } from '.';
import { useRules } from '../../utils/forms';
import GenericInput from './GenericInput';

export const RestaurantName = ({ disabled }: InputProps): JSX.Element => {
    const { t } = useTranslation();
    const rules = useRules();
    return (
        <GenericInput<{ name: string }>
            controlProps={{
                name: 'name',
                rules: {
                    required: rules.required,
                    ...rules.maxLength(100),
                },
            }}
            disabled={disabled}
            label={t('restaurants.create.name.label')}
            textFieldProps={{
                autoFocus: true,
                placeholder: t('restaurants.create.name.placeHolder'),
            }}
        />
    );
};

export const RestaurantOwnerId = ({ disabled }: InputProps): JSX.Element => {
    const { t } = useTranslation();
    const rules = useRules();
    return (
        <GenericInput<{ ownerId: number }>
            controlProps={{
                name: 'ownerId',
                rules: {
                    required: rules.required,
                    pattern: rules.numberPattern,
                },
            }}
            disabled={disabled}
            label={t('restaurants.create.ownerId.label')}
        />
    );
};
