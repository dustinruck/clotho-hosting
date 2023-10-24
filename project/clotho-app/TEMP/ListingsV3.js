// import { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// import { Input, FormGroup, Label, Button, Form, Col, Card, CardImg, CardBody, CardTitle, CardText, Container, Row } from 'reactstrap';

// function Listings() {
//   const [listings, setListings] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [sizes, setSizes] = useState([]);

//   useEffect(() => {
//     // Fetch listings
//     axios.get('http://localhost:3001/api/listings/')
//       .then(response => {
//         setListings(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching listings:', error);
//       });

//     // Fetch categories
//     axios.get('http://localhost:3001/api/attr/categories')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });

//     // Fetch sizes
//     axios.get('http://localhost:3001/api/attr/sizes') 
//       .then(response => {
//         setSizes(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching sizes:', error);
//       });

//   }, []);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//    // Filter listings based on search term and selected filters
//    const filteredListings = listings.filter(listing => {
//     return listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//            (!selectedSize || listing.size === selectedSize) &&
//            (!selectedCategory || listing.category === selectedCategory);
//   });

//   return (
//     <Container>
//       <Row>
//         <Col md={4}>
//           <FormGroup>
//             <Label for="searchInput">Search listings</Label>
//             <Input
//               id="searchInput"
//               type="text"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               placeholder="Search listings..."
//             />
//           </FormGroup>
//         </Col>
//         <Col md={4}>
//           <FormGroup>
//             <Label for="sizeSelect">Size</Label>
//             <Input type="select" id="sizeSelect" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
//             {selectedSize || "Size"}
//               {sizes.map(size => <option key={size.id} value={size.name}>{size.name}</option>)}
//             </Input>
//           </FormGroup>
//         </Col>
//         <Col md={4}>
//           <FormGroup>
//             <Label for="categorySelect">Category</Label>
//             <Input type="select" id="categorySelect" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
//               {/* Categories options... */}
//               {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
//             </Input>
//           </FormGroup>
//         </Col>
//       </Row>
//       <Row>
//         {filteredListings.map(listing => (
//           <Col md={3} key={listing.id}>
//             <Card className="mb-4">
//               <CardImg top width="100%" src={listing.img} alt={listing.title} onClick={() => {/* Redirect to listing */}} />
//               <CardBody>
//                 <CardTitle tag="h5">{listing.title}</CardTitle>
//                 <CardText>${(listing.price / 100).toFixed(2)}</CardText>
//                 <CardText>{listing.size}</CardText>
//                 <CardText>Seller: {listing.seller}</CardText>
//               </CardBody>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// export default Listings;
