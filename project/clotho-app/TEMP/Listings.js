import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listings() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    // Fetch listings
    axios.get('/api/listings/')
      .then(response => {
        setListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
      });

    // Fetch categories
    axios.get('/api/attr/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch sizes
    axios.get('/api/attr/sizes')
      .then(response => {
        setSizes(response.data);
      })
      .catch(error => {
        console.error('Error fetching sizes:', error);
      });

  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Filter listings based on search term and selected filters
  const filteredListings = listings.filter(listing => {
    return listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!selectedSize || listing.size === selectedSize) &&
           (!selectedCategory || listing.category === selectedCategory);
  });
  
  // ... Inside the render:
  return (
    <div>
      <input 
          type="text" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          placeholder="Search listings..."
      />
      
      <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
        <option value="0">One Size</option>
        <option value="1">Unknown</option>
        <option value="2">XXS</option>
        <option value="3">XS</option>
        <option value="4">S</option>
        <option value="5">M</option>
        <option value="6">L</option>
        <option value="7">XL</option>
        <option value="8">XXL</option>
        <option value="9">2X</option>
        <option value="10">3X</option>
        <option value="11">4X</option>
        <option value="12">5X</option>
        <option value="13">6X</option>
        <option value="14">00</option>
        <option value="15">0</option>
        <option value="16">2</option>
        <option value="17">4</option>
        <option value="18">6</option>
        <option value="19">8</option>
        <option value="20">10</option>
        <option value="21">12</option>
        <option value="22">14</option>
        <option value="23">16</option>
        <option value="24">18</option>
        <option value="25">20</option>
        <option value="26">22</option>
        <option value="27">24</option>
        <option value="28">26</option>
        <option value="29">28</option>
        <option value="30">23</option>
        <option value="31">25</option>
        <option value="32">27</option>
        <option value="33">29</option>
        <option value="34">30</option>
        <option value="35">31</option>
        <option value="36">32</option>
        <option value="37">33</option>
        <option value="38">34</option>
        <option value="39">35</option>
        <option value="40">36</option>
        <option value="41">37</option>
        <option value="42">38</option>
        <option value="43">39</option>
        <option value="44">40</option>
        <option value="45">41</option>
        <option value="46">42</option>
        <option value="47">43</option>
        <option value="48">44</option>
        <option value="49">45</option>
        <option value="50">46</option>
        <option value="51">47</option>
        <option value="52">48</option>
        <option value="53">49</option>
        <option value="54">4.5</option>
        <option value="55">5.5</option>
        <option value="56">6.5</option>
        <option value="57">5</option>
        <option value="58">7</option>
        <option value="59">7.5</option>
        <option value="60">8.5</option>
        <option value="61">9</option>
        <option value="62">9.5</option>
        <option value="63">10.5</option>
        <option value="64">11</option>
        <option value="65">11.5</option>
        <option value="66">12.5</option>
        <option value="67">13</option>
        <option value="68">13.5</option>
        <option value="69">14.5</option>
        <option value="70">15</option>
        <option value="71">15.5</option>

          {sizes.map(size => <option key={size.id} value={size.name}>{size.name}</option>)}
      </select>
  
      <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        <option value="">Tops</option>
        <option value="">Bottoms</option>
        <option value="">Bags</option>
        <option value="">Shoes</option>
        <option value="">Outerwear</option>
        <option value="">Accessories</option>
        <option value="">Dresses</option>
        <option value="">Jeans</option>
        <option value="">Other</option>
          {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
      </select>
    
      <div className="listings-container">
          {filteredListings.map(listing => (
              <div key={listing.id} className="listing-card">
                  <img src={listing.img} alt={listing.title} onClick={() => {/* Redirect to listing */}} />
                  <div>{listing.title}</div>
                  <div>${(listing.price / 100).toFixed(2)}</div>
                  <div>{listing.size}</div>
                  <div>Seller: {listing.seller}</div>
              </div>
          ))}
      </div>
    </div>
  );
}

export default Listings;
