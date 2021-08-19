import { TextField } from '@material-ui/core';
import { FC, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputProps } from '.';
import { UserRoles } from '../../types/types';
import { useRules } from '../../utils/forms';
import GenericInput from './GenericInput';

export function UserName({ disabled }: InputProps) {
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
            label={t('user.username')}
            textFieldProps={{
                autoComplete: 'username',
                autoFocus: true,
            }}
        />
    );
}
export const UserEmail: FC<InputProps> = ({ disabled }) => {
    const { t } = useTranslation();
    const rules = useRules();
    return (
        <GenericInput<{ email: string }>
            controlProps={{
                name: 'email',
                rules: {
                    required: rules.required,
                    ...rules.maxLength(100),
                    pattern: rules.emailPattern,
                },
            }}
            disabled={disabled}
            label={t('user.email')}
            textFieldProps={{
                autoComplete: 'email',
                type: 'email',
            }}
        />
    );
};
export const UserRole: FC<InputProps> = ({ disabled }) => {
    const { t } = useTranslation();
    const rules = useRules();
    const userRolesOptions = useMemo(
        () => [
            { label: t('user.role.user'), value: UserRoles.User },
            { label: t('user.role.owner'), value: UserRoles.Owner },
            { label: t('user.role.admin'), value: UserRoles.Admin },
        ],
        [t]
    );
    const fieldName = 'role';
    const { control } = useFormContext();
    return (
        <Controller
            name={fieldName}
            control={control}
            rules={{
                required: rules.required,
            }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    select
                    label={t('user.role.label')}
                    onChange={field.onChange}
                    required
                    margin="normal"
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    error={!!error}
                    helperText={error?.message}
                    disabled={disabled}
                >
                    {userRolesOptions.map((role) => (
                        <option key={role.value} value={role.value}>
                            {role.label}
                        </option>
                    ))}
                </TextField>
            )}
        />
    );
};
