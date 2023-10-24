// UserProfileV2.js
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import jwtDecode from 'jwt-decode';
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

function UserProfile({ match }) {
    const [user, setUser] = useState({});
    const [listings, setListings] = useState([]);
    const token = localStorage.getItem('token');
    let isOwner = false;
    let isAdmin = false;

    if (token) {
        const decoded = jwtDecode(token);
        isOwner = decoded.id === match.params.id;
        isAdmin = decoded.isAdmin;
    }

    useEffect(() => {
        // Fetch user profile
        axios.get(`/api/users/${match.params.id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });

        // Fetch user listings
        axios.get(`/api/listings/seller/${match.params.id}`)
            .then(response => {
                setListings(response.data);
            })
            .catch(error => {
                console.error('Error fetching listings:', error);
            });
    }, [match.params.id]);

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <img src={user.avatar} alt={`${user.username}'s avatar`} className="img-fluid rounded-circle" />
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    {(isOwner || isAdmin) && <Button color="primary">Edit Profile</Button>}
                    <Button color="info">Follow</Button>
                    <Button color="warning">Message</Button>
                </Col>
                <Col md={8}>
                    <h3>Listings by {user.username}</h3>
                    {listings.map(listing => (
                        <Card key={listing.id}>
                            <CardBody>
                                <CardTitle tag="h5">{listing.title}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">${(listing.price / 100).toFixed(2)}</CardSubtitle>
                                <CardText>{listing.description}</CardText>
                            </CardBody>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfile;
