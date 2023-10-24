import { useState } from 'react';
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
    const response = await axiosJWT.post('/admin/listings', form); //FIXME HANDLE ERRORS
    console.log(response.data);
  };

  return (
    <Container>
      <Card>
        <CardHeader>Create New Listing</CardHeader>
        <CardBody>
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
              <option value="1">Tops</option>
              <option value="2">Bottoms</option>
              <option value="3">Bags</option>
              <option value="4">Shoes</option>
              <option value="5">Outerwear</option>
              <option value="6">Accessories</option>
              <option value="7">Dresses</option>
              <option value="8">Jeans</option>
              <option value="9">Other</option>
                {/* ... */}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="genderId">Gender</Label>
              <Input type="select" name="genderId" id="genderId" onChange={handleInputChange}>
                <option value="1">Men</option>
                <option value="2">Women</option>
                <option value="3">Unisex</option>
                <option value="4">All</option>
                {/* ... */}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="sizeId">Size</Label>
              <Input type="select" name="sizeId" id="sizeId" onChange={handleInputChange}>
              <option value="">One Size</option>
          <option value="">Unknown</option>
          <option value="">XXS</option>
          <option value="">XS</option>
          <option value="">S</option>
          <option value="">M</option>
          <option value="">L</option>
          <option value="">XL</option>
          <option value="">XXL</option>
          <option value="">2X</option>
          <option value="">3X</option>
          <option value="">4X</option>
          <option value="">5X</option>
          <option value="">6X</option>
            <option value="">00</option>
            <option value="">0</option>
            <option value="">2</option>
            <option value="">4</option>
            <option value="">6</option>
            <option value="">8</option>
            <option value="">10</option>
            <option value="">12</option>
            <option value="">14</option>
            <option value="">16</option>
            <option value="">18</option>
            <option value="">20</option>
            <option value="">22</option>
            <option value="">24</option>
            <option value="">26</option>
            <option value="">28</option>
            <option value="">23</option>
            <option value="">25</option>
            <option value="">27</option>
            <option value="">29</option>
            <option value="">30</option>
            <option value="">31</option>
            <option value="">32</option>
            <option value="">33</option>
            <option value="">34</option>
            <option value="">35</option>
            <option value="">36</option>
            <option value="">37</option>
            <option value="">38</option>
            <option value="">39</option>
            <option value="">40</option>
            <option value="">41</option>
            <option value="">42</option>
            <option value="">43</option>
            <option value="">44</option>
            <option value="">45</option>
            <option value="">46</option>
            <option value="">47</option>
            <option value="">48</option>
            <option value="">49</option>
                <option value="">4.5</option>
                <option value="">5.5</option>
                <option value="">6.5</option>
                <option value="">5</option>
                <option value="">7</option>
                <option value="">7.5</option>
                <option value="">8.5</option>
                <option value="">9</option>
                <option value="">9.5</option>
                <option value="">10.5</option>
                <option value="">11</option>
                <option value="">11.5</option>
                <option value="">12.5</option>
                <option value="">13</option>
                <option value="">13.5</option>
                <option value="">14.5</option>
                <option value="">15</option>
                <option value="">15.5</option>
                {/* ... */}
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
  );
};

export default CreateListing;
