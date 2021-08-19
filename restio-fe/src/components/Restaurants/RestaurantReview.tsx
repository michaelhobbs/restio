import {
    Avatar,
    Box,
    createStyles,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
} from '@material-ui/core';
import RestaurantRating from './RestaurantRating';
import { Review } from '../../rtk-query/api.generated';
import { Reply } from '@material-ui/icons';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    })
);

type ReviewProps = { review: Review };

export const RestaurantReview = ({ review }: ReviewProps) => {
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
            {review.ownerReply && (
                <Box display="flex" p={1} bgcolor={grey[200]}>
                    <Box mr={2}>
                        <Tooltip title="Owner reply">
                            <Avatar alt="Owner reply" className={classes.small}>
                                <Reply fontSize="small" />
                            </Avatar>
                        </Tooltip>
                    </Box>
                    <Typography variant="body2" component="p">
                        {review.ownerReply}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default RestaurantReview;
