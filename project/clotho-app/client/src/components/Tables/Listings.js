//TODO links to single listings, search filter layout + menu, display results eg "results for 'fancy shoes'", "no listings fournd"
//FIXME CLEAR FILTERS OPTION
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
//import { Input, FormGroup, Label, Button, Form, Col, Card, CardImg, CardBody, CardTitle, CardText, Container, Row } from 'reactstrap';
import {
  Container, Row, Col, InputGroup, InputGroupText, Input,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardImg, CardBottom, CardFooter, CardTitle, Button, onKeyPress,
} from 'reactstrap';
import { Link } from 'react-router-dom';


function Listings() {

  const [search, setSearch] = useState('');
  const [listings, setListings] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [dropdownOpenSize, setDropdownOpenSize] = useState(false);
  const [dropdownOpenCategory, setDropdownOpenCategory] = useState(false);
  const [dropdownOpenGender, setDropdownOpenGender] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
  
    getListings();

  }, [search, selectedSize, selectedCategory, selectedGender]);



  const getListings = async () => {

    try {

      var response = await axios.get(`/listings?search=${search}&size=${selectedSize}&category=${selectedCategory}&gender=${selectedGender}`);

      console.log(response.data)

      var list = response.data;

      for (let i in list) {


        var img = await axios.get(`/images/thumbnail/${list[i].id}`);
        list[i].thumbnail = img.data.url;
      }
      setListings(list);

    } catch (err) {
      console.log(err);
    }
  }


useEffect(() => {

  // Fetch categories
  axios.get('/attr/categories')
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });

  // Fetch sizes
  axios.get('/attr/sizes')
    .then(response => {
      setSizes(response.data);
    })
    .catch(error => {
      console.error('Error fetching sizes:', error);
    });

  //Fetch genders
  axios.get('/attr/genders')
    .then(response => {
      setGenders(response.data);
    })
    .catch(error => {
      console.error('Error fetching genders:', error);
    });

}, []);



// Filter listings based on search term and selected filters
const filteredListings = listings.filter(listing => {
  return listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedSize || listing.size === selectedSize) &&
    (!selectedCategory || listing.category === selectedCategory);
});

const clearFilters = () => {
  setSelectedCategory('');
  setSelectedGender('');
  setSelectedSize('');
}

return (
  <Container>
    <Row className="mb-4">
      <Col md="8" className="offset-2">
        <InputGroup>
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          //  onKeyDown={e => {
          //     if (e.key === 'Enter') {
          //        fetchListings();
          //     } 
          //  }
          //  }
          />
          <InputGroupText addontype="append">🔍</InputGroupText>
        </InputGroup>
      </Col>
      </Row>
      <Row className="mb-4">
      <div className='col-md-2 offset-2 text-center'>
        <Dropdown isOpen={dropdownOpenCategory} toggle={() => setDropdownOpenCategory(prevState => !prevState)}>
          <DropdownToggle caret className="w-100">
            {selectedCategory || "Category"}
          </DropdownToggle>
          <DropdownMenu>
            {categories.map(category => <DropdownItem key={category.id} onClick={() => setSelectedCategory(category.id)}>{category.name}</DropdownItem>)}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className='col-md-2 text-center'>
        <Dropdown isOpen={dropdownOpenSize} toggle={() => setDropdownOpenSize(prevState => !prevState)}>
          <DropdownToggle caret className="w-100">
            {selectedSize || "Size"}
          </DropdownToggle>
          <DropdownMenu>
            {sizes.map(size => <DropdownItem key={size.id} onClick={() => setSelectedSize(size.id)}>{size.name}</DropdownItem>)}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className='col-md-2 text-center'>
        <Dropdown isOpen={dropdownOpenGender} toggle={() => setDropdownOpenGender(prevState => !prevState)}>
          <DropdownToggle caret className="w-100">
            {selectedGender || "Gender"}
          </DropdownToggle>
          <DropdownMenu>
            {genders.map(gender => <DropdownItem key={gender.id} onClick={() => setSelectedGender(gender.id)}>{gender.name}</DropdownItem>)}
          </DropdownMenu>
        </Dropdown>
      </div>
      {selectedCategory || selectedGender || selectedSize ? (
<div className='col-md-2'>
<button className='btn btn-light text-danger' onClick={clearFilters}>Clear filters</button>

</div>
      ) : (<></>)}
    </Row>



    <Row className="mt-5">

    {listings.map(listing => (
    <Col md="2" className="my-2 p-1" key={listing.id}>
        <Link to={`/products/${listing.id}`}>
            <Card className='border-0 rounded-0'>
                <img className='border-0 rounded-0' top width="100%" src={listing.thumbnail} alt="listing image" />
            </Card>
            <Row className='px-3 fs-5 fw-bold'>
                ${listing.price}
            </Row>
        </Link>
    </Col>
))}


</Row>
  </Container>
);
}

export default Listings;



































// //TODO links to single listings, search filter layout + menu, display results eg "results for 'fancy shoes'", "no listings fournd"
// //FIXME CLEAR FILTERS OPTION
// import { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// //import { Input, FormGroup, Label, Button, Form, Col, Card, CardImg, CardBody, CardTitle, CardText, Container, Row } from 'reactstrap';
// import {
//   Container, Row, Col, InputGroup, InputGroupText, Input,
//   Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardImg, CardBottom, CardFooter, CardTitle, Button, onKeyPress,
// } from 'reactstrap';
// import { Alert, CloseButton } from 'reactstrap';

// function Listings() {

//   const [search, setSearch] = useState('');
//   const [listings, setListings] = useState([]);
//   const [imgs, setImgs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [genders, setGenders] = useState([]);
//   const [dropdownOpenSize, setDropdownOpenSize] = useState(false);
//   const [dropdownOpenCategory, setDropdownOpenCategory] = useState(false);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedGender, setSelectedGender] = useState('');

//   // loading and error states
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showAlert, setShowAlert] = useState(true);

//   useEffect(() => {
//     setLoading(true); // loading is true before the API call
//     getListings().finally(() => setLoading(false));
//   }, [search, selectedSize, selectedCategory, selectedGender]);



//   const getListings = async () => {
//     try {
//       setLoading(true); //  loading while fetching listings

//       // input validation before the api call
//       if (typeof search !== 'string' || typeof selectedCategory !== 'string') {
//         throw new Error('Invalid input');
//       }

//   var response = await axios.get(`/listings?search=${search}&size=${selectedSize}&category=${selectedCategory}&gender=${selectedGender}`);
//       console.log('Fetched listings:', response.data); // log response

//       var list = response.data;
//       for (let i in list) {
//         const img = await axios.get(`/admin/listingimages/thumbnail/${list[i].id}`);
//         list[i].thumbnail = img.data.url;
//       }
//       setListings(list);
//       setError(null); 
//     } catch (err) {
//       console.error('Error fetching listings:', err);
//       // setError('Failed to fetch listings');
//     } finally {
//       setLoading(false);
//     }
//   };


// useEffect(() => {

//   // Fetch categories
//   axios.get('/attr/categories')
//     .then(response => {
//       setCategories(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching categories:', error);
//       // setError('Failed to fetch categories');
//     });

//   // Fetch sizes
//   axios.get('/attr/sizes')
//     .then(response => {
//       setSizes(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching sizes:', error);
//       // setError('Failed to fetch sizes');
//     });

//   // Fetch genders
//   // axios.get('/attr/genders')
//   //   .then(response => {
//   //     setGenders(response.data);
//   //   })
//   //   .catch(error => {
//   //     console.error('Error fetching genders:', error);
//   //     // setError('Failed to fetch genders');
//   //   });

// }, []);



// // Filter listings based on search term and selected filters
// const filteredListings = listings.filter(listing => {
//   return listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (!selectedSize || listing.size === selectedSize) &&
//     (!selectedCategory || listing.category === selectedCategory);
// });

// return (
//   <Container>
//     {/* // flash alert for errors // */}
//     {error && showAlert && ( // Only show the alert if there's an error and showAlert is true
//         <Alert color="danger">
//           {error}
//           <CloseButton onClick={() => setShowAlert(false)} aria-label="Close" /> {/* Close button */}
//         </Alert>
//       )}    <Row className="mb-4">
//       <Col md="8">
//         <InputGroup>
//           <Input
//             placeholder="Search"
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//           //  onKeyDown={e => {
//           //     if (e.key === 'Enter') {
//           //        fetchListings();
//           //     } 
//           //  }
//           //  }
//           />
//           <InputGroupText addonType="append">🔍</InputGroupText>
//         </InputGroup>
//       </Col>
//       <Col md="2">
//         <Dropdown isOpen={dropdownOpenSize} toggle={() => setDropdownOpenSize(prevState => !prevState)}>
//           <DropdownToggle caret>
//             {selectedSize || "Size"}
//           </DropdownToggle>
//           <DropdownMenu>
//             {sizes.map(size => <DropdownItem key={size.id} onClick={() => setSelectedSize(size.id)}>{size.name}</DropdownItem>)}
//           </DropdownMenu>
//         </Dropdown>
//       </Col>
//       <Col md="2">
//         <Dropdown isOpen={dropdownOpenCategory} toggle={() => setDropdownOpenCategory(prevState => !prevState)}>
//           <DropdownToggle caret>
//             {selectedCategory || "Category"}
//           </DropdownToggle>
//           <DropdownMenu>
//             {categories.map(category => <DropdownItem key={category.id} onClick={() => setSelectedCategory(category.id)}>{category.name}</DropdownItem>)}
//           </DropdownMenu>
//         </Dropdown>
//       </Col>
//     </Row>

//     <Row>
//       {listings.map(listing => (
//         <Col md="4" key={listing.id}>
//           <Card>
//             <CardImg top width="100%" src={listing.thumbnail} alt="lisiting image" />
//             <CardFooter>
//               {/* <CardTitle tag="h5"> */}
//               ${listing.price}
//               {/* </CardTitle> */}
//             </CardFooter>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   </Container>
// );
// }

// export default Listings;
