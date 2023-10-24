import React, { useState, useEffect, useRef } from 'react';
import useAxiosJWT from '../../hooks/useAxiosJWT';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';

import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
} from 'reactstrap';
import PageNotFound from './PageNotFound';

const Checkout = () => {
    const axiosJWT = useAxiosJWT();
    const [success, setSuccess] = useState(false);
    const errRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const id = sessionStorage.getItem('checkoutId');
  const [listing, setListing] = useState();
  const [images, setImages] = useState([]);
  const [sellerAvi, setSellerAvi] = useState('');
  const [checkout, setCheckout] = useState(false);
  const [props, setProps] = useState({});
  
  console.log(id);


    useEffect(() => {


        getListing();
    
      }, []);
    
    



      const getListing = async () => {
    
        try {
    
          var list = await axios.get(`/listings/${id}`);
    
          console.log(list.data);
    
          setListing(list.data);
    
          var imgs = await axios.get(`/images/${id}`);
          setImages(imgs.data);
    
          const avatar = await axios.get(`/images/avatar/${list.data.Seller.avatar}`);
          setSellerAvi(avatar.data.url);
    
        } catch (err) {
          console.log(err);
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id);

        try {
            const response = await axiosJWT.post('/orders', { items: [id] });
            console.log(response?.data);
            setSuccess(true);

        } catch (err) {
            if (!err.response) {
                console.log(err);

                setErrorMessage('No Server Response');
            } else if (err.response?.data?.message) {
                console.log(err);
                setErrorMessage(err.response.data.message);
            } else {
                console.log(err);
                setErrorMessage("Submission failed");
            }
            errRef.current.focus();
        }

    };

    if (success) {
        return (
            <>
                <h4>Your order has been successfuly placed.</h4>
                <Link to={`/`}>View order details (Coming soon)</Link>
                <Link to={`/`}>Back to home</Link>

            </>
        );
    }

    if (listing && images[0]) {


    return (
        <Container>

            <Row>
                <Col md="8" className="pe-5">
                    <Row>
                        <Card className="">
                            <div className='col-12'>
                                <CardTitle tag="h3" className="m-3 py-3 border-bottom row">Checkout</CardTitle>
                            </div>
                            <CardBody>
                                <CardText className='fs-4 mb-5'>
                                    Review order:
                                </CardText>
                                <CardText className="mb-2 p-0 pb-2 fs-5 border-bottom row">
                                    <div className='col-6'>
                                        {listing.title}
                                    </div>
                                    <div className='col-6 text-end'>${listing.price}</div>
                                </CardText>
                                <CardText className="mb-2 fs-5 p-0 pb-2 border-bottom row fw-bold">
                                    <div className='col-6'>Shipping:</div>
                                    <div className='col-6 text-end'>$0.00</div>
                                </CardText>
                                <CardText className="mb-2 fs-5 p-0 pb-2 border-bottom row fw-bold">
                                    <div className='col-6'>Order total:</div>
                                    <div className='col-6 text-end'>${listing.price}</div>
                                </CardText>
                                <CardText className="mb-2 fs-5 p-0 pb-2 border-bottom row">
                                    <div className='col-6'>Payment Method:</div>
                                    <div className='col-6 text-end'>N/A</div>
                                </CardText>
                                <form onSubmit={handleSubmit}>
                                    <div className='row m-3 mt-5 text-center'>
                                        <button className='btn btn-dark fs-4'>Place order</button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Row>
                </Col>
                <Col md="4">
                    <Row>
                        <Card className="">
                            <CardBody>
                                <div className='row'>

                                    <div className='col-2 offset-5 p-0 my-3'>
                                        <img src={sellerAvi} alt={`${listing.Seller.username}'s avatar`} className="img-fluid rounded-circle" />
                                    </div>
                                    <div className='col-12 text-center'>
                                        <CardTitle tag="h5" className="">{listing.Seller.username}</CardTitle>
                                    </div>
                                    <div className='col-12 text-center m-0'>
                                        <span className="m-2 text-muted">@{listing.Seller.username}</span>
                                    </div>
                                    <div className='col-12 text-center m-0'>
                                        <span className="m-2 text-danger">&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</span>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </Row>
                    <Row>


                        <Col md="12" className="my-2 p-0" key={images[0].id}>
                            <Card className='border-0'>
                                <img className='rounded-2' top width="100%" src={images[0].url} alt="lisiting image" />
                            </Card>
                        </Col>

                    </Row>
                    <Row>
                        <Card className="">
                            <CardBody>
                                <CardTitle tag="h3" className="mb-5">Order summary</CardTitle>
                                <CardText className="mb-2 fs-5 p-0 pb-2 border-bottom row">
                                    <div className='col-6'>
                                        {listing.title}
                                    </div>
                                    <div className='col-6 text-end'>${listing.price}</div>
                                </CardText>
                                <CardText className='text-muted px-0 border-bottom row'>
                                    <p className="pb-0 mb-1">Size: {listing.Size.name}</p>
                                </CardText>
                                <CardText className="text-muted px-0 border-bottom row">
                                    <p className="pb-0 mb-1">Gender: {listing.Gender.name}</p>
                                </CardText>
                                <CardText className="mb-2 fs-5 p-0 pb-2 border-bottom row fw-bold">
                                    <div className='col-6'>Total to pay</div>
                                    <div className='col-6 text-end'>${listing.price}</div>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Row>

                </Col>
            </Row>

            <div>

            </div>
            <span ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</span>


        </Container>
    );
                        }
};

export default Checkout;
