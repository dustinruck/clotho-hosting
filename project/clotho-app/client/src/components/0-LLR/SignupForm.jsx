import { useState, useEffect } from 'react';
import axios from '../../api/axios';
// Reactstrap
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    CardFooter,
    Table,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";


function Signup( { props }) {


    // STATES
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [imgUrl, setImgUrl] = useState('placeholder');

    const [usersList, setUsersList] = useState([]);


//    const username = document.getElementById('newUserUsername').value;
//    const password = document.getElementById('newUserPassword').value;
//    const email = document.getElementById('newUserEmail').value;
    // const isAdmin = document.getElementById('newUserIsAdminTrue').checked ? true : false;
    // const isDeleted = document.getElementById('newUserIsDeleted').checked;
    // const imgUrl = document.getElementById('newUserImgUrl').value;

    const [success, setSuccess] = useState(false);

    // TODO: Frontend Validation -- e.g. check for duplicate usernames, etc.

    // post to db
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            props.onSubmitProp(false, "Passwords do not match", '');
        } else {

        
            try {

                const response = await axios.post("/users", {

                    username: username,
                    password: password,
                    email: email,
                    isAdmin: false,
                    isDeleted: false,
                    imgUrl: "placeholder"

                });

                console.log(JSON.stringify(response?.data));

                const uname = response?.data?.user.username;
                setSuccess(true);

                props.onSubmitProp(true, "Signed up successfully. Please log in.", uname);
            
            } catch (err) {

                if (!err?.response) {
                    props.onSubmitProp(false, 'No Server Response', '');
                } else if (err.response?.data?.message) {
                    console.log(err);
                    console.log("err.response.data.message");
                    console.log(err.response.data.message);

                    props.onSubmitProp(false, err.response.data.message, '');
                } else {
                    console.error("Error 0033:", err);
                    props.onSubmitProp(false, "Signup failed", '');
                }
                // errRef.current.focus();
            }
        }
    }


    return (
        <>
            <div className="content">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className="pr-md-1">
                            <FormGroup>
                                <label>Username:</label>
                                <Input
                                    id="newUserUsername"
                                    placeholder="StylishManatee"
                                    type="text"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-1">
                            <FormGroup>
                                <label>Password:</label>
                                <Input
                                    id='newUserPassword'
                                    placeholder="Pa$$word123"
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-1">
                            <FormGroup>
                                <label>Confirm Password:</label>
                                <Input
                                    id='newUserConfirmPassword'
                                    placeholder="Pa$$word123"
                                    type="password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-1">
                            <FormGroup>
                                <label>Email:</label>
                                <Input
                                    id="newUserEmail"
                                    placeholder="real@email.com"
                                    type="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <button className='btn btn-success'>Sign Up</button>
                </Form>
        
            </div>
        </>
    );
    
}
export default Signup;