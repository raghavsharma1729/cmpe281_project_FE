import * as React from 'react';
import { Typography } from "@mui/material";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { isEmpty } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../components/Header';
import { config } from "../config";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { TodayRounded, AssistantDirectionRounded, PersonRounded } from '@mui/icons-material/';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { getToken, getUser, isUserSignedIn } from '../util';
import dayjs from 'dayjs';

const TripPage = () => {
    const params = useParams();

    const [trip, setTrip] = React.useState({});
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get(`${config.BASE_URL}/trips/${params.tripId}`, {})
            .then(function (response) {
                // console.log(response.data)
                setTrip(response.data);
            })
            .catch(function (error) {

                console.log(error);
            });
    }, []);


    const requestForTrip = () => {
        if (isUserSignedIn()) {
            axios.post(`${config.BASE_URL}/trips/${params.tripId}/request`, {}, {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
                .then(function (response) {
                    // console.log(response)
                    setTrip(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            navigate("/login");
        }
    }

    const hasUserjoined = (trip) => {
        if (isUserSignedIn()) {
            const user = getUser();
            return trip?.joiners.includes(user.id) || user.id == trip.userId;
        }
    }

    const goToUser = () => {
        navigate(`/users/${trip.creator[0]._id}`);
    }

    return (
        <>
            <Header />
            <Container maxWidth='sm'>
                {isEmpty(trip) || (
                    <>
                        <Box>
                            <Grid>
                                <Typography variant="h4" style={{ weight: 'bold' }}>
                                    {trip?.title}
                                </Typography>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item><Typography variant="h6" style={{ weight: 'bold' }}>Destinations: </Typography></Grid>
                                <Grid item>
                                    <List dense>
                                        {trip?.destinations.map((place) => {
                                            return (<ListItem>
                                                <ListItemAvatar>
                                                    <AssistantDirectionRounded color="primary" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={place}
                                                />
                                            </ListItem>)
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>About trip : </Typography></Grid>
                                <Grid item > <Typography variant="h6" style={{ color: 'blue' }}>  {trip.description} </Typography></Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Estimation Cost : </Typography></Grid>
                                <Grid item > <Typography variant="h6" style={{ color: 'blue' }}> $ {trip.cost} </Typography></Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Capacity : </Typography></Grid>
                                <Grid item > <Typography variant="h6" style={{ color: 'blue' }}> {trip.members} <PeopleIcon /></Typography></Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Trip Duration: </Typography></Grid>
                                <Grid item > <Typography variant="h6" style={{ color: 'blue' }}> {dayjs(trip.fromDate).format('DD-MMM-YYYY')} to {dayjs(trip.toDate).format('DD-MMM-YYYY')} </Typography></Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item><Typography variant="h6" style={{ weight: 'bold' }}>Detail Itenary: </Typography></Grid>
                                <Grid>
                                    <List dense>
                                        {trip?.tripDetails.map((place) => {
                                            const text = `Day${place.day}: ${place.detail}`;
                                            return (<ListItem>
                                                <ListItemAvatar>
                                                    <TodayRounded color="primary" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={text}
                                                />
                                            </ListItem>)
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Trip Creator: </Typography></Grid>
                                <Grid item onClick={goToUser}>
                                    <Typography variant="h6" style={{ color: 'blue' }}><AccountCircleIcon /> &nbsp;{trip.creator[0].firstName} {trip.creator[0].lastName} </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item><Typography variant="h6" style={{ weight: 'bold' }}>Joined Members: </Typography></Grid>
                                <Grid>
                                    <List dense>
                                        {trip?.joinee.map((user) => {
                                            const text = `${user.firstName} ${user.lastName}`;
                                            return (<ListItem>
                                                <ListItemAvatar>
                                                    <PersonRounded color="primary" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={text}
                                                />
                                            </ListItem>)
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            {hasUserjoined(trip) ? <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Chat Link:</Typography></Grid>
                                <Grid item><a href={trip.chatLink} target="_blank">
                                    Chat Link</a> </Grid>
                            </Grid> :
                                <Grid container>
                                    <Grid item >
                                        <Button variant="contained" onClick={requestForTrip}>
                                            Join the Trip
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
}


export default TripPage;