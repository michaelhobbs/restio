import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const NoMatch = (): JSX.Element => {
    const { t } = useTranslation();
    return <Typography variant="h4">{t('error.notfound')}</Typography>;
};

export default NoMatch;
