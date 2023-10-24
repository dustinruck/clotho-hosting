import axios from '../../api/axios';
import useAxiosImg from '../../hooks/useAxiosImg';
import useAxiosJWT from '../../hooks/useAxiosJWT';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Container,
    Row,
    Col
} from "reactstrap";

function Sell() {
    const axiosImg = useAxiosImg();
    const axiosJWT = useAxiosJWT();

    const [files, setFiles] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [imgInfo, setImgInfo] = useState([]);


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
    const [newId, setNewId] = useState('');
    

    const [inputs, setinputs] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        genderId: '',
        sizeId: ''
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setinputs(prevState => ({ ...prevState, [name]: value }));
        console.log(inputs);
    };

    const handleFilesChange = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("image", file);
            try {

                // Upload photo to server
                const response = await axiosImg.post('/images/', formData);
                // get image file name
                const fileName = response.data.fileName;
                // get image url
                const img = await axiosImg.get(`/images/preview/${fileName}`);
                const url = img.data.url
                setFiles(prevState => [ ...prevState, { url: url, fileName: fileName }]);
                setImgInfo(prevState => [...prevState, {path: fileName}]);


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
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosJWT.post('/listings',
            {
                title: inputs.title,
                description: inputs.description,
                price: inputs.price,
                categoryId: inputs.categoryId,
                genderId: inputs.genderId,
                sizeId: inputs.sizeId,
                thumbnail: imgInfo[0].path,
                images: imgInfo
            });
            console.log(response?.data);
            setNewId(response?.data?.listing?.id);
            
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

    if (!sessionStorage.getItem('token')) {
        return (
            <>
                <h4>You must be logged in to sell an item.</h4>
            </>
        );
    }

    if (success) {
        return (
            <>
                <h4>Item successfuly posted.</h4>
                <Link to={`/products/${newId}`}>View your item</Link>
            </>
        );
    }

    return (
        <>
            {/* <div className='col-10 offset-1'>
                <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                <h1>Sell an item</h1>
                <div className='card'>

                    <form onSubmit={handleSubmit}>
                        <div className='card-body'>
                            <div className='form-group'>
                                <label for="title">Title</label>
                                <input type="text" name="title" id="title" placeholder="Title" onChange={handleinputChange} required />
                            </div>
                            <div className='form-group'>
                                <label for="description">Description</label>
                                <input type="textarea" name="description" id="description" placeholder="Description" onChange={handleinputChange} required />
                            </div>
                            <div className='form-group'>
                                <label for="price">Price</label>
                                <input type="number" name="price" id="price" placeholder="Price" onChange={handleinputChange} required />
                            </div>
                            <div className='form-group'>
                                <label for="categoryId">Category</label>
                                <input type="select" name="categoryId" id="categoryId" onChange={handleinputChange} />
                                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}

                            </div>
                            <div className='form-group'>
                                <label for="genderId">Gender</label>
                                <input type="select" name="genderId" id="genderId" onChange={handleinputChange} />
                                {genders.map(gender => <option key={gender.id} value={gender.id}>{gender.name}</option>)}
                            </div>
                            <div className='form-group'>
                                <label for="sizeId">Size</label>
                                <input type="select" id="sizeId" name="sizeId" onChange={handleinputChange} />
                                {sizes.map(size => <option key={size.id} value={size.id}>{size.name}</option>)}
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='col'>
                                <button>Sell</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div> */}

            <Container>
                <div className='col-10 offset-1'>
                    <div className='mt-5 mb-3'><h3>Sell an item</h3></div>
                <Card>
                    <CardBody>
                        <span ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</span>

                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <span ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</span>

                                <Input type="text" name="title" id="title" placeholder="Title" onChange={handleInputChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <span ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</span>

                                <Input type="textarea" name="description" id="description" placeholder="Description" onChange={handleInputChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="number" min='0.01' step='0.01' name="price" id="price" placeholder="Price" onChange={handleInputChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <Input type="select" name="categoryId" id="categoryId" onChange={handleInputChange}>
                                <option disabled selected value> Select </option>
                                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="genderId">Gender</Label>
                                <Input type="select" name="genderId" id="genderId" onChange={handleInputChange}>
                                      <option disabled selected value> Select </option>
                                    {genders.map(gender => <option key={gender.id} value={gender.id}>{gender.name}</option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="sizeId">Size</Label>
                                <Input type="select" id="sizeId" name="sizeId" onChange={handleInputChange}>
                                <option disabled selected value> Select </option>
                                    {sizes.map(size => <option key={size.id} value={size.id}>{size.name}</option>)}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="image">Add images to your post.</Label>

                                <Input type="file" name='image' id="image" onChange={handleFilesChange} required accept="image/*" />



                            </FormGroup>
                            <div>
                                <Row>

                                    {files.map(img => (
                                        <Col className="col-md-1 my-2 p-1" key={img.fileName}>
                                            <Card className='card border-0 rounded-0'>
                                                <img className='border-0 rounded-0' top width="100%" src={img.url} alt="uploaded image preview" />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                            <Button className='btn bg-dark text-white fs-5 fw-bold w-100 my-3' type="submit">Publish</Button>
                        </Form>
                    </CardBody>
                </Card>
                </div>
            </Container>
        </>


    )
}

export default Sell;