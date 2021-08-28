import {
    Box,
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { Alert } from '@material-ui/core';
import { RequestStatusFlags } from '@reduxjs/toolkit/dist/query/core/apiState';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type DeleteConfirmationProps<T> = {
    dialogData: T;
    handleClose: (refetch?: boolean) => void;
    apiCall: (data: T) => void;
    apiCallStatus: RequestStatusFlags;
};

export function DeleteConfirmationDialog<T extends Record<string, unknown>>({
    dialogData,
    handleClose,
    apiCall,
    apiCallStatus: { isLoading, isSuccess, isError },
}: DeleteConfirmationProps<T>): JSX.Element {
    const { t } = useTranslation();
    const [closeOnSuccess, setCloseOnSuccess] = useState(false);
    useEffect(() => {
        if (!isSuccess) {
            // new call is made
            setCloseOnSuccess(true); // close when new call isSuccess
        }
        if (isSuccess && closeOnSuccess) {
            handleClose(true);
        }
    }, [isSuccess, handleClose, closeOnSuccess]);
    return <>
        <DialogTitle id="alert-dialog-title">
            {t('common.delete.title')}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {t('common.delete.message')}
            </DialogContentText>
            {isError && (
                <Box mt={1}>
                    <Alert severity="error">
                        {t('error.deletingFailed')}
                    </Alert>
                </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleClose()}>
                {t('common.cancel')}
            </Button>
            <Button
                onClick={() => {
                    apiCall(dialogData);
                }}
                color="primary"
                variant="contained"
                autoFocus
                disabled={isLoading}
            >
                {isLoading ? (
                    <CircularProgress size={20} />
                ) : (
                    <>{t('common.delete.button')}</>
                )}
            </Button>
        </DialogActions>
    </>;
}

export default DeleteConfirmationDialog;
