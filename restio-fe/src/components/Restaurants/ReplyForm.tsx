import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    createStyles,
    makeStyles,
    TextField,
    Theme,
    Tooltip,
} from '@material-ui/core';
import {
    ArrowDropDown,
    ArrowDropUp,
    Reply as ReplyIcon,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    Reply,
    Review,
    usePostReplyMutation,
} from '../../rtk-query/api.generated';
import { useRules } from '../../utils/forms';

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

export const ReplyForm = ({ review }: ReplyFormProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [isVisible, setVisible] = useState(false);
    const rules = useRules();

    const [postReply, { isLoading, isError, isSuccess }] =
        usePostReplyMutation();

    const { handleSubmit, control } = useForm<Reply>({
        reValidateMode: 'onSubmit',
    });
    const onSubmit: SubmitHandler<Reply> = (data) => {
        postReply({
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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box p={2}>
                        <Controller
                            name="reply"
                            control={control}
                            defaultValue={''}
                            rules={{
                                required: rules.required,
                                ...rules.minLength(1),
                                ...rules.maxLength(1000),
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="owner-reply"
                                    multiline
                                    maxRows={10}
                                    minRows={2}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    onChange={field.onChange}
                                    label={t('reviews.create.reply.label')}
                                    placeholder={t(
                                        'reviews.create.reply.placeHolder'
                                    )}
                                    disabled={isLoading}
                                    error={!!error}
                                    helperText={error?.message}
                                    margin="normal"
                                />
                            )}
                        />
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
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                t('reviews.create.reply.button')
                            )}
                        </Button>
                    </Box>
                </form>
            )}
        </>
    );
};

export default ReplyForm;
