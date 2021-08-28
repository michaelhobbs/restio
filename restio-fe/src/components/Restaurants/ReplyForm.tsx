import { Avatar, Box, Button, CircularProgress, Theme, Tooltip } from '@material-ui/core';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import {
    ArrowDropDown,
    ArrowDropUp,
    Reply as ReplyIcon,
} from '@material-ui/icons';
import { Alert } from '@material-ui/core';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Reply, Review, usePostReplyMutation } from '../../rtk-query/api';
import { ReviewReply } from '../Inputs/Reviews';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    })
);

type ReplyFormProps = {
    review: Review;
};

export const ReplyForm = ({ review }: ReplyFormProps): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [isVisible, setVisible] = useState(false);

    const [postReply, { isLoading, isError, isSuccess }] =
        usePostReplyMutation();

    const methods = useForm<Reply>({
        reValidateMode: 'onSubmit',
        defaultValues: {
            reply: '',
        },
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<Reply> = (data) => {
        void postReply({
            reviewId: review.id,
            reply: data,
        });
    };

    const showForm = isVisible && !isSuccess;
    const replyPrompt = t('reviews.create.reply.prompt');
    return (
        <>
            <Box display="flex" mb={2}>
                <Box mr={1}>
                    <Tooltip title={replyPrompt}>
                        <Avatar
                            alt={t('reviews.create.reply.replyIconFallback')}
                            className={classes.small}
                            onClick={() => setVisible(!isVisible)}
                        >
                            <ReplyIcon fontSize="small" />
                        </Avatar>
                    </Tooltip>
                </Box>

                {isSuccess && (
                    <Box px={2} mb={1}>
                        <Alert severity="success">
                            {t('reviews.create.reply.success')}
                        </Alert>
                    </Box>
                )}
                {!isSuccess && (
                    <Button
                        size="small"
                        onClick={() => setVisible(!isVisible)}
                        endIcon={
                            isVisible ? <ArrowDropUp /> : <ArrowDropDown />
                        }
                    >
                        {replyPrompt}
                    </Button>
                )}
            </Box>
            {showForm && (
                <FormProvider<Reply> {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box p={2}>
                            <ReviewReply disabled={isLoading} />
                        </Box>
                        {isError && (
                            <Box px={2} mb={1}>
                                <Alert severity="error">
                                    {t('error.savingFailed')}
                                </Alert>
                            </Box>
                        )}
                        <Box mx={2} mb={2} textAlign="end">
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                                type="submit"
                            >
                                {isLoading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : (
                                    t('reviews.create.reply.button')
                                )}
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
            )}
        </>
    );
};

export default ReplyForm;
