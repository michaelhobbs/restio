import { TextField, TextFieldProps } from '@material-ui/core';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';

/**
 * Generic wrapper for TextField from MUI, accepting input name and rules following react-hook-form systax.
 * It takes the controller from the form context.
 *
 *
 * @param props
 * @returns
 */
export function GenericInput<T>(props: {
    disabled?: boolean;
    label?: string;
    textFieldProps?: Partial<TextFieldProps>;
    controlProps: UseControllerProps<T>;
}): JSX.Element {
    const { control } = useFormContext<T>();
    const { disabled, label, controlProps, textFieldProps } = props;
    const {
        field,
        fieldState: { error },
    } = useController({ ...controlProps, control });

    return (
        <TextField
            required
            fullWidth
            variant="outlined"
            label={label}
            disabled={disabled}
            error={!!error}
            margin="normal"
            type="text"
            {...textFieldProps}
            helperText={textFieldProps?.helperText ?? error?.message}
            {...field}
        />
    );
}

export default GenericInput;
