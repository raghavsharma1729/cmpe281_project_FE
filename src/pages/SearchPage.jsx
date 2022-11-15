import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Box, Button, Container, Grid, IconButton, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import queryString from 'query-string';
import React from "react";
import Header from '../components/Header';
import TripTile from "../components/TripTile";
import { config } from "../config";

const SearchContainer = () => {


    const [inputs, setInputs] = React.useState(
        {
            places: [],
            startDate: null,
            endDate: null
        }
    );

    const [trips, setTrips] = React.useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleEndDateChange = (endDate) => {
        setInputs(values => ({ ...values, endDate: endDate.format('MMM-DD-YYYY') }))
    };
    const handleStartDateChange = (startDate) => {
        let dates = {
            startDate: startDate.format('MMM-DD-YYYY'),
            endDate: inputs.endDate
        }
        if (startDate.isAfter(inputs.endDate)) {
            dates = {
                ...dates, endDate: startDate
            }
        }
        setInputs(values => ({ ...values, ...dates }))
    };
    const handleAddingDestination = () => {
        const places = inputs.places;
        places.push(inputs.place);
        setInputs(values => ({ ...values, places, place: '' }))
    };
    const handleSearch = () => {
        const filterQuery = queryString.stringify(
            {
                places: inputs.places,
                startDate: inputs.startDate,
                endDate: inputs.endDate
            });
        console.log(filterQuery);
        axios.get(`${config.BASE_URL}/trips?${filterQuery}`, {})
            .then(function (response) {
                console.log(response.data);
                setTrips(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <Header />
            <Container>
                <Grid>
                    <Typography variant="h3">
                        Search for Trips
                    </Typography>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="search"
                            label="Seach Destinations"
                            name="place"
                            value={inputs.place}
                            autoFocus
                            onChange={handleChange}
                        />
                        <IconButton color="primary" aria-label="add places" onClick={handleAddingDestination}>
                            <AddLocationIcon />
                        </IconButton>
                        <Typography>
                            {inputs.places?.join(", ")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            margin="normal"
                            label="Start Date"
                            inputFormat="MMM-DD-YYYY"
                            value={inputs.startDate}
                            minDate={new Date()}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            margin="normal"
                            label="End Date"
                            inputFormat="MMM-DD-YYYY"
                            minDate={inputs.startDate}
                            value={inputs.endDate}
                            onChange={handleEndDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={handleSearch}> Search </Button>
                    </Grid>
                </Grid>
                <Box container spacing={4}>
                    {trips.map((trip) => (
                        <TripTile trip={trip} />
                    ))}
                </Box>
            </Container>
        </>
    );
}

export default SearchContainer;