import { Box, DialogContent, DialogTitle } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { FC, Fragment, useEffect } from 'react';
import {
    DeepPartial,
    FormProvider,
    SubmitHandler,
    UnpackNestedValue,
    useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    UpdateRestaurantApiArg,
    UpdateReviewApiArg,
    UpdateUserApiArg,
} from '../../rtk-query/api.generated';
import { InputProps } from '../Inputs';
import EditActions from './Edit/EditActions';

type EditDialogProps<T> = {
    dialogData: T;
    handleClose: (refetch?: boolean) => void;
    editHook: UseMutation<any>;
    inputFields: FC<InputProps>[];
    getEditPayload: (
        id: number,
        item: UnpackNestedValue<T>
    ) => UpdateUserApiArg | UpdateRestaurantApiArg | UpdateReviewApiArg;
};

export function EditDialog<T extends { id: number }>({
    dialogData,
    handleClose,
    editHook,
    inputFields,
    getEditPayload,
}: EditDialogProps<T>): JSX.Element {
    const { t } = useTranslation();

    const [updateT, { isLoading, isError, isSuccess }] = editHook();

    useEffect(() => {
        if (isSuccess) {
            handleClose(true);
        }
    }, [isSuccess, handleClose]);

    const methods = useForm<T>({
        reValidateMode: 'onSubmit',
        defaultValues: dialogData as UnpackNestedValue<DeepPartial<T>>,
    });
    const { handleSubmit } = methods;
    const onSubmit: SubmitHandler<T> = (data) => {
        void updateT(getEditPayload(dialogData.id, { ...dialogData, ...data }));
    };

    return (
        <FormProvider<T> {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <DialogTitle id="alert-dialog-title">
                    {t('admin.edit.title')}
                </DialogTitle>
                <DialogContent>
                    {inputFields.map((Field, idx) => (
                        <Fragment key={idx}>
                            <Field disabled={isLoading} />
                        </Fragment>
                    ))}
                    {isError && (
                        <Box mt={1}>
                            <Alert severity="error">
                                {t('error.savingFailed')}
                            </Alert>
                        </Box>
                    )}
                </DialogContent>
                <EditActions handleClose={handleClose} isLoading={isLoading} />
            </form>
        </FormProvider>
    );
}

export default EditDialog;
