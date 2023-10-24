// UserProfileV2.js
import { useState, useEffect } from 'react';
import useAxiosJWT from '../../hooks/useAxiosJWT';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Container, Row, Col, Card, CardBody, CardImg, CardFooter, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import PageNotFound from './PageNotFound';



function UserProfilePrivate() {

    const axiosJWT = useAxiosJWT();
    const [user, setUser] = useState({});
    const [listings, setListings] = useState([]);
    const [orders, setOrders] = useState([]);

    const [avi, setAvi] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        getProfile();
        getOrders();
    }, []);

    const getProfile = async () => {

        try {

            var response = await axiosJWT.get('/users/profile');

            console.log(response.data)

            const avatar = await axios.get(`/images/avatar/${response.data.user.avatar}`);

            setAvi(avatar.data.url);
            setUser(response.data.user);

            var list = response?.data?.listings;

            if (list[0]) {
                for (let i in list) {

                    var img = await axios.get(`/images/thumbnail/${list[i].id}`);
                    list[i].thumbnail = img.data.url;
                }
                setListings(list);
            }


        } catch (err) {
            console.log(err);
        }
    }

    const getOrders = async () => {

        try {

            var response = await axiosJWT.get('/orders');

            console.log(response.data)

            setOrders(response.data);
            // console.log(response.data);

            var orderList = response?.data;

            if (orderList[0]) {


                for (let i in orderList) {

                    let items = orderList[i].OrderItems;
                    for (let j in items) {

                        var img = await axios.get(`/images/thumbnail/${items[j].Listing.id}`);
                        items[j].thumbnail = img.data.url;

                    }
                    //orderList[i].OrderItems = items;    
                    // console.log(orderList[i]);
                }
                setOrders(orderList);
                console.log(orderList[0]);

            }


        } catch (err) {
            console.log(err);
        }
    }
    if (!user.username) {
        return <PageNotFound />
    }
    return (
        <div className='col-10 offset-1'>
            <div className='row m-5'></div>
            <div className='row my-5'>

                <div className='col-2 col-lg-1'>
                    <img src={avi} alt={`${user.username}'s avatar`} className="img-fluid rounded-circle w-100" />
                </div>
                <div className='col-3 text-start'>

                    <h2 className='ps-2'>{user.username}</h2>

                    <div className=''>
                        <span className="m-2 text-muted">@{user.username}</span>
                    </div>
                    <div className=''>
                        <span className="m-2 text-danger">&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</span>
                    </div>


                </div>
                <div className='row mb-5'>
                    <Link to="/settings">
                        <button className='btn border-dark fs-5 mt-5 w-25'>Edit Profile</button>
                    </Link>
                </div>
                <div className='row my-5'>
                    <Link to="/sell">
                        <button className='btn bg-dark text-white fw-bold rounded-0 fs-4 mb-2 w-25'>Sell</button>
                    </Link>
                </div>
            </div>
            <div className='row m-5'></div>

            <Row className='my-3'>
                <h4>Selling</h4>
            </Row>
            <Row>

                {listings.map(listing => (
                    <Col md="2" className="my-2 p-1" key={listing.id}>
                        <Card className='border-0 rounded-0' onClick={!listing.isSold ? () => navigate(`/products/${listing.id}`) : undefined}>
                            <img className='border-0 rounded-0 card-img' top width="100%" src={listing.thumbnail} alt="listing image" />
                            {listing.isSold ? (
                                <div className="card-img-overlay text-center align-middle bg-dark bg-opacity-50">
                                    <div className="card-body d-flex align-items-center justify-content-center h-100 text-warning">
                                        <h4 className="card-title">SOLD</h4>
                                    </div>
                                </div>
                            ) : (<></>)}
                        </Card>
                        <Row className='px-3 fs-5 fw-bold'>
                            ${listing.price}
                        </Row>
                    </Col>
                ))}


            </Row>

            <Row className='my-3'>
                <h4>Purchases</h4>
            </Row>
            {orders.map(order => (
                <div className='card my-5'>
                    <div className='card-title m-3 mb-0'>
                        <h5>{order.createdAt.slice(0, 10)}</h5>
                        <p className='text-muted'>Order #{order.id}</p>
                        <p className=''>Total: ${Number(order.total / 100).toFixed(2)}</p>

                    </div>


                    <div className='card-body'>
                        <Row className='px-2'>
                            {order.OrderItems.map(item => (

                                <Col md="1" className="my-2 p-1" key={item.id}>
                                    <Card className='border-0 rounded-0' onClick={() => navigate(`/products/${item.Listing.id}`)}>
                                        <img className='border-0 rounded-2 card-img' top width="100%" src={item.thumbnail} alt="item image" />

                                    </Card>
                                    <Row className='px-3 fs-5'>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default UserProfilePrivate;
