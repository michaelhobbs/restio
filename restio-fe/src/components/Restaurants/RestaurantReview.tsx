import { Avatar, Box, Theme, Tooltip, Typography } from '@material-ui/core';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { Reply } from '@material-ui/icons';
import { Review } from '../../rtk-query/api';
import RestaurantRating from './RestaurantRating';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    })
);

type ReviewProps = { review: Review };

export const RestaurantReview = ({ review }: ReviewProps): JSX.Element => {
    const classes = useStyles();
    return (
        <Box py={2}>
            <RestaurantRating rating={review.rating} />
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
            >
                {review.date}
            </Typography>
            <Box py={1}>
                <Typography variant="body1" component="p">
                    {review.comment}
                </Typography>
            </Box>
            {review.reply && (
                <Box display="flex" p={1} bgcolor={grey[200]}>
                    <Box mr={2}>
                        <Tooltip title="Owner reply">
                            <Avatar alt="Owner reply" className={classes.small}>
                                <Reply fontSize="small" />
                            </Avatar>
                        </Tooltip>
                    </Box>
                    <Typography variant="body2" component="p">
                        {review.reply}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default RestaurantReview;
