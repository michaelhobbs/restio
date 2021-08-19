import { DialogActions, Button, CircularProgress } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    handleClose: (refetch?: boolean) => void;
    isLoading: boolean;
};
export const EditActions: FC<Props> = ({ handleClose, isLoading }) => {
    const { t } = useTranslation();
    return (
        <DialogActions>
            <Button onClick={() => handleClose()} color="default">
                {t('common.cancel')}
            </Button>
            <Button type="submit" color="primary" variant="contained">
                {isLoading ? (
                    <CircularProgress size={20} />
                ) : (
                    <>{t('common.save')}</>
                )}
            </Button>
        </DialogActions>
    );
};
export default EditActions;
