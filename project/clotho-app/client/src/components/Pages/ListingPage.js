import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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


const ListingPage = () => {

  const navigate = useNavigate();
  const [listing, setListing] = useState();
  const [images, setImages] = useState([]);
  const [sellerAvi, setSellerAvi] = useState('');
  const [data, setData] = useState({});
  const { id } = useParams();

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

  const buyNow = () => {
   setData({listing, images, sellerAvi});

    console.log(data);
    // setCheckout(true);

    sessionStorage.setItem('checkoutId', listing.id);

    navigate('/checkout', {state: {
     id: listing.id
    }});

    // navigate('/checkout', {state: {
    //   listing: {...listing},
    //   images: {...images},
    //   sellerAvi: sellerAvi
    // }});

  }

  // if (checkout) {

 
  //   return (
  //     // <Checkout listing={{listing}} images={{images}} sellerAvi={{sellerAvi}}/>
  //     <Checkout {...props}/>

  //   )
  // }

  if (listing) {
  return (
    <Container>
      <Row>
      <Col md="6">
      <Row>

{images.map(img => (
    <Col md="12" className="my-2 p-1" key={img.id}>
        <Card className='border-0 rounded-0'>
            <img className='border-0 rounded-0' top width="100%" src={img.url} alt="listing image" />
            {listing.isSold ? (
                                <div className="card-img-overlay text-center align-middle bg-white bg-opacity-50">
                                    <div className="card-body d-flex align-items-center justify-content-center h-100 text-warning">
                                        <h4 className="card-title">SOLD</h4>
                                    </div>
                                </div>
                            ) : (<></>)}
        </Card>

    </Col>
))}
</Row>
      </Col>
        <Col md="4" className="ms-5">
          <Row>
          <div className='row my-2'>
            
              {listing.isSold ? (
                            <Card className="border-0 my-5">
                 <div className='card-title text-muted fs-3 border-bottom pb-5'>This item is no longer available.</div>
                 </Card>
              )
            : (
              <Card className="border-0">
              <CardBody>
                <CardTitle tag="h3" className="mb-5">{listing.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                <h3 className="text-muted my-3 fw-bold">${listing.price}</h3>
                </CardSubtitle>
  
                              <CardText>
                  <p className="text-muted fs-5">Size {listing.Size.name}</p>
                </CardText>
                <CardText className="row border-bottom pb-5">
                <button className='btn bg-dark text-white fs-5 fw-bold' onClick={buyNow}>Buy now</button>
                </CardText>
                <CardText className='fs-5 row border-bottom pb-2 mt-5'>{listing.description}</CardText>
                <CardText className="row border-bottom p-0">
                  <p className="text-muted px-0">{listing.Category.name}</p>
                </CardText>
  
                <CardText className="row border-bottom p-0">
                  <p className="text-muted px-0">Gender: {listing.Gender.name}</p>
                </CardText>
                <CardText className="row border-bottom p-0 pb-5">
                  <p className="text-muted px-0">Listed on {listing.createdAt.slice(0,10)}</p>
                </CardText>
  
              </CardBody>
            </Card>
            )}
              </div>

          </Row>
          <Row>
          <Card className="border-0">
            <CardBody>
              <div className='row mb-5'>

                        <div className='col-3'>
                            <img src={sellerAvi} alt={`${listing.Seller.username}'s avatar`} className="img-fluid rounded-circle w-100" />
                        </div>
                        <div className='col-8 text-start'>
                        <CardTitle tag="h5" className="mb-1 px-2">{listing.Seller.username}</CardTitle>

                        <div className=''>
                                        <span className="m-2 text-muted">@{listing.Seller.username}</span>
                                    </div>
                                    <div className=''>
                                        <span className="m-2 text-danger">&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</span>
                                    </div>
                        </div>
            </div>
            <CardText className="row border-bottom pb-4">
            <button className='btn border-dark fs-5 mb-2' onClick={() => navigate(`/${listing.Seller.username}`)}>Visit shop</button>
                </CardText>
            <div className='row my-2'>



              </div>

            </CardBody>
          </Card>
          </Row>
        </Col>
      </Row>

<div>

</div>


    </Container>
  );
}

if (!listing) {
return (
  <PageNotFound />
)
}


};

export default ListingPage;
