// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles

// Styled components
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all user data from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/take'); // Adjust the API endpoint as needed
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">
                User Dashboard
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <StyledCard>
                            <CardContent>
                                <StyledAvatar
                                    alt={user.username}
                                    src="https://via.placeholder.com/100" // Dummy profile picture
                                />
                                <Typography variant="h5">{user.username}</Typography>
                                <Typography variant="body1">Email: {user.email}</Typography>
                                <Typography variant="body1">Password: {user.password}</Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
