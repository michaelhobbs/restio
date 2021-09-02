import {
    Button,
    ListSubheader,
    Menu,
    MenuItem,
    Tooltip,
} from '@material-ui/core';
import { ExpandMore, Translate } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '../../utils/i18next';

function LanguageSelector(): JSX.Element {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        void i18n.changeLanguage(lng);
        handleClose();
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Tooltip title={t('common.selectLanguage') ?? ''}>
                <Button
                    aria-controls="language-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    color="inherit"
                    endIcon={<ExpandMore />}
                    startIcon={<Translate />}
                >
                    {i18n.language}
                </Button>
            </Tooltip>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    subheader: (
                        <ListSubheader>
                            {t('common.selectLanguage')}
                        </ListSubheader>
                    ),
                }}
            >
                {supportedLngs.map((lang) => (
                    <MenuItem
                        key={lang.langCode}
                        onClick={() => changeLanguage(lang.langCode)}
                    >
                        {lang.displayName}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default LanguageSelector;
