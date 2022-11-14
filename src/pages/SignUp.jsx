import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { config } from '../config';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment/moment';
import { Stack } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';





function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://pooling.com/">
                pooling
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignUp() {
    const navigate = useNavigate();
    const { authed } = useAuth();
    const { state } = useLocation();

    const [inputs, setInputs] = React.useState({ dateOfBirth: moment('2014-08-18T21:11:54') });
    const [error, setError] = React.useState();

    // is user logged in redirect to search page
    React.useEffect(() => {
        if (authed) {
            navigate(state?.path || "/search");
        }
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleDateChange = (newValue) => {
        setInputs(values => ({ ...values, dateOfBirth: newValue }))
    };

    const handleSubmit = () => {
        const { firstName, lastName, email, password, dateOfBirth, gender } = inputs;
        axios.post(`${config.BASE_URL}/signup`, {
            firstName,
            lastName,
            email,
            gender,
            dateOfBirth,
            password
        })
            .then(function (response) {
                navigate("/login");
                setError();
            })
            .catch(function (error) {
                console.log(error);
                setError(error.response.data.message);
            });
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" >
                        <Stack spacing={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <DesktopDatePicker
                                margin="normal"
                                sx={{ mt: '100%' }}
                                label="Date of Birth"
                                inputFormat="MM/DD/YYYY"
                                value={inputs.dateOfBirth}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="gender"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            </RadioGroup>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <p style={{ color: "red" }}>{error}</p>
                        </Stack>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
}