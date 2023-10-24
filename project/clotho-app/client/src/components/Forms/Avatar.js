import axios from '../../api/axios';
import useAxiosImg from '../../hooks/useAxiosImg';
import useAxiosJWT from '../../hooks/useAxiosJWT';
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

function Avatar(){
    const axiosImg = useAxiosImg();
    const axiosJWT = useAxiosJWT();


    const [file, setFile] = useState({});
    const [imgInfo, setImgInfo] = useState({});


    const errRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setErrorMessage('');
    }, [])
    

    const handleFilesChange = async (e) => {
        if (e.target.files[0]) {
            const imgFile = e.target.files[0];
            const form = new FormData();
            form.append("image", imgFile);
            try {
                // Upload photo to server
                const response = await axiosImg.post('/images/', form);
                // get image url
                const fileName = response.data.fileName;
                const img = await axiosImg.get(`/images/preview/${fileName}`);
                const url = img.data.url
                setFile({ url: url, fileName: fileName });
                setImgInfo({avatar: fileName});
                console.log(file);
                console.log(imgInfo);

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
            const response = await axiosJWT.put('/users', imgInfo);
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
                <h4>Avatar successfuly updated.</h4>
                <Link to={`/profile`}>View your updated profile</Link>
            </>
        );
    }

    return (
        <>
<Form onSubmit={handleSubmit}>
        <FormGroup>
        <Label for="image" className='text-muted'>Upload image file</Label>

        <Input type="file" name='image' id="image" onChange={handleFilesChange} required accept="image/*" />
    </FormGroup>
{file.url ? (
    <div>
    <Row>
            <Col className="col-md-1 my-2 p-1">
                <Card className='card border-0 rounded-0'>
                    <img className='border-0 rounded-0' top width="100%" src={file.url} alt="uploaded image file" />
                </Card>
            </Col>
    </Row>
</div>

) : (<></>)}


    <button className='btn border-dark w-100 mt-4' type="submit">Save</button>
    <span ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</span>

</Form>
        </>

    );
}
export default Avatar;