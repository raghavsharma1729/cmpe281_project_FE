import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { config } from '../config';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { setLocalStorage } from '../util';


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


export default function SignIn() {
    const navigate = useNavigate();
    const { login, authed } = useAuth();
    const { state } = useLocation();

    const [inputs, setInputs] = React.useState({});
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

    const handleSubmit = () => {
        axios.post(`${config.BASE_URL}/login`, {
            email: inputs.email,
            password: inputs.password
        })
            .then(function (response) {
                if (response.status == 200 && !isEmpty(response.data.token)) {
                    setLocalStorage(response);
                    login().then(() => {
                        navigate(state?.path || "/search");
                    });
                    setError();
                }
                setError(response.data.message);
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
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
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
}