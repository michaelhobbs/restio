import {
    Box,
    CircularProgress,
    IconButton,
    Typography,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

type Props = {
    title: string;
    goBack?: () => void;
    isLoading?: boolean;
};

export const PageTitle = (props: Props): JSX.Element => {
    const { title, goBack, isLoading } = props;
    const { t } = useTranslation();
    return (
        <Box mb={2} display="flex" alignItems="flex-start">
            {goBack && (
                <IconButton
                    aria-label={t('common.back')}
                    onClick={goBack}
                    size="large"
                >
                    <ArrowBackIos />
                </IconButton>
            )}
            <Box>
                <Typography variant="h4" gutterBottom>
                    {isLoading ? <CircularProgress size={20} /> : title}
                </Typography>
            </Box>
        </Box>
    );
};
export default PageTitle;
