import { useState, useRef, useEffect } from 'react';
import axios from '../../api/axios'; 
import useAxiosJWT from '../../hooks/useAxiosJWT';
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Container
} from "reactstrap";

const CreateListing = () => {
  const axiosJWT = useAxiosJWT();

  const errRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrorMessage('');
    }, [])

  //data from api for item attributes
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    genderId: '',
    sizeId: '',
    image: null
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prevState => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    try {
      const response = await axiosJWT.post('/listings', form);
      console.log(response.data);

    } catch (err) {
      if (!err?.response) {
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

          // Fetch genders
    axios.get('/attr/genders')
    .then(response => {
      setGenders(response.data);
    })
    .catch(error => {
      console.error('Error fetching sizes:', error);
    });

  }, []);

  return (
    <>
    {success ? (
        <section>
            <p>Successfully posted item for sale.</p>
        </section>
    ) : (
    <Container>
      <Card>
        <CardHeader>Create New Listing</CardHeader>
        <CardBody>
        <span ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</span>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" placeholder="Title" onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" placeholder="Description" onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="number" name="price" id="price" placeholder="Price" onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="categoryId">Category</Label>
              <Input type="select" name="categoryId" id="categoryId" onChange={handleInputChange}>
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="genderId">Gender</Label>
              <Input type="select" name="genderId" id="genderId" onChange={handleInputChange}>
              {genders.map(gender => <option key={gender.id} value={gender.id}>{gender.name}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
            <Label for="sizeId">Size</Label>
            <Input type="select" id="sizeId" name="sizeId" onChange={handleInputChange}>
              {sizes.map(size => <option key={size.id} value={size.id}>{size.name}</option>)}
            </Input>
          </FormGroup>
            {/* <FormGroup>
              <Label for="image">Image</Label>
              <Input type="file" name="image" id="image" onChange={handleImageChange} />
            </FormGroup> */}
            <Button color="primary" type="submit">Create Listing</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
    )}
    </>
  );
};

export default CreateListing;
