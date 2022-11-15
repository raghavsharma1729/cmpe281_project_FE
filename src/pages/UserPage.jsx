import styled from "@emotion/styled";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../components/Header';
import { config } from "../config";
import { getToken } from '../util';

const Image = styled('img')({
    height: '100%',
    width: '100%'
});

const UserPage = () => {
    const params = useParams();

    const navigate = useNavigate();
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        axios.get(`${config.BASE_URL}/users/${params.userId}`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                // console.log(response.data)
                setUser(response.data);
            })
            .catch(function (error) {

                console.log(error);
            });
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth='sm' >
                <Grid container mt={4} direction='row' justifyContent="center" alignItems="center">
                    <Grid item xs={6} borderRight={1} >
                        <Image src={user.gender === 'Male' ? '../../male-user.png' : '../../female-user.png'} />
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start">
                        <Typography variant="h6">
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="h6">
                            {user.email} {user.lastName}
                        </Typography>
                        <Typography variant="h6">
                            Member Since: {dayjs(user.createdAt).format('MMM-YYYY')}
                        </Typography>
                        <Typography variant="h6">
                            Email Verified
                        </Typography>
                        <Typography variant="h6">
                            Trip Created: {user.tripsCreated}
                        </Typography>
                        <Typography variant="h6">
                            Trip Joined: {user.tripsJoined}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}


export default UserPage;