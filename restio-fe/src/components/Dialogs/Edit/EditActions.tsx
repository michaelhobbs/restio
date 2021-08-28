import { Button, CircularProgress, DialogActions } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type Props = {
    handleClose: (refetch?: boolean) => void;
    isLoading: boolean;
};
export const EditActions = ({ handleClose, isLoading }: Props): JSX.Element => {
    const { t } = useTranslation();
    return (
        <DialogActions>
            <Button onClick={() => handleClose()}>
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
