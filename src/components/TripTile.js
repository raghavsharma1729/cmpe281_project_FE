import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';



const TripTile = ({ trip }) => {
    const navigate = useNavigate();
    const { title, destinations, description, cost, members, fromDate, toDate, _id, creator } = trip;
    const goToTrip = () => {
        navigate(`/trips/${_id}`);
    }
    const goToUser = () => {
        navigate(`/users/${creator[0]._id}`);
    }
    return (
        <Box border={1} borderRadius={2} mt={2} px={4} py={2} key={_id}>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center" onClick={goToTrip}>
                <Grid item>
                    <Typography variant='h6'>{title}</Typography>
                </Grid>
                <Grid item>
                    <Typography><PeopleIcon /> &nbsp;{members}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                    <Typography color='secondary'>
                        Cost: ${cost}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        <DateRangeIcon />{dayjs(fromDate).format('DD-MMM-YYYY')} to {dayjs(toDate).format('DD-MMM-YYYY')}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <Grid item>
                    <Typography>{description}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                    <Typography><LocationOnIcon />&nbsp;{destinations?.join(", ")}</Typography>
                </Grid>
                <Grid item onClick={goToUser}>
                    <Typography><AccountCircleIcon /> &nbsp;{creator[0].firstName} {creator[0].lastName} </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TripTile;