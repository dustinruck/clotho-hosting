

import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, InputGroup, InputGroupText, Input,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardImg, CardBody, CardTitle, Button, onKeyPress,
} from 'reactstrap';
import '../../assets/ListingsV2.css';

const Listings = () => {
  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dropdownOpenSize, setDropdownOpenSize] = useState(false);
  const [dropdownOpenCategory, setDropdownOpenCategory] = useState(false);
  const [listings, setListings] = useState([]);

  const sizes = [
    "One Size", "Unknown", "XXS", "XS", "S", "M", "L", "XL", "XXL", "2X",
    "3X", "4X", "5X", "6X", 
    "0", "2", "4", "6", "8", "10", "12", "14", "16", "18",
    "20", "22", "24", "26", "28", "23", "25", "27", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", 
    "4.5", "5.5", "6.5", "5", "7", "7.5", "8.5", "9", "9.5", "10.5", "11",
    "11.5", "12.5", "13", "13.5", "14.5", "15", "15.5"
  ];

  const categories = [
    "Tops", "Bottoms", "Bags", "Shoes", "Outerwear", "Accessories", "Dresses", "Jeans", "Other"
  ];

  async function fetchListings() {
    try {
      const response = await fetch(BASE_API_URL + '/api/listings?search=${search}&size=${selectedSize}&category=${selectedCategory}');
      const data = await response.json();
      setListings(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching the listings:', error);
    }
  }

  useEffect(() => {
    fetchListings();
  }, [search, selectedSize, selectedCategory]);


  return (
    <Container>
      <Row className="mb-4">
        <Col md="8">
          <InputGroup>
          <Input 
   placeholder="Search" 
   value={search} 
   onChange={e => setSearch(e.target.value)} 
   onKeyDown={e => {
      if (e.key === 'Enter') {
         fetchListings();
      } 
   }
   }
/>
            <InputGroupText addonType="append">🔍</InputGroupText>
          </InputGroup>
        </Col>
        <Col md="2">
          <Dropdown isOpen={dropdownOpenSize} toggle={() => setDropdownOpenSize(prevState => !prevState)}>
            <DropdownToggle caret>
              {selectedSize || "Size"}
            </DropdownToggle>
            <DropdownMenu>
              {sizes.map(size => <DropdownItem key={size} onClick={() => setSelectedSize(size)}>{size}</DropdownItem>)}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col md="2">
          <Dropdown isOpen={dropdownOpenCategory} toggle={() => setDropdownOpenCategory(prevState => !prevState)}>
            <DropdownToggle caret>
              {selectedCategory || "Category"}
            </DropdownToggle>
            <DropdownMenu>
              {categories.map(category => <DropdownItem key={category} onClick={() => setSelectedCategory(category)}>{category}</DropdownItem>)}
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        {listings.map(listing => (
          <Col md="4" key={listing.id}>
            <Card>
              <CardImg top width="100%" src={listing.thumbnail || "placeholder-image.jpg"} alt="lisiting image" />
              <CardBody>
                <CardTitle tag="h5">{listing.title}</CardTitle>
                <p>Price: ${listing.price}</p>
                <p>Size: {listing.sizeId}</p>
                <p>Seller: {listing.sellerId}</p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Listings;