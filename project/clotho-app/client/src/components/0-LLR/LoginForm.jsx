import { useRef, useState, useEffect } from 'react';

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

import axios from '../../api/axios';
const LOGIN_URL = '/auth/login';

const Login = ({ props }) => {

    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState(props.uname ? props.uname : '');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
               { username, password }
            );
            console.log(JSON.stringify(response?.data));

            const token = response?.data?.token;
            const refreshToken = response?.data?.refreshToken;
            const isAdmin = response?.data?.isAdmin;
            const userId = response?.data?.userId;
            const uname = response?.data?.username;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('refreshToken', refreshToken);
            sessionStorage.setItem('isAdmin', isAdmin);
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('username', uname);

            //get avi url
            const avatar = await axios.get(`/images/avatar/${response?.data?.avatar}`);
            const avi = avatar.data.url
            sessionStorage.setItem('avi', avi);

            console.log(sessionStorage.getItem('token'));

            setUsername('');
            setPassword('');
            setSuccess(true);

            props.onSubmitProp(true, "Logged in successfully!", uname, avi);

        } catch (err) {

            if (!err?.response) {
                props.onSubmitProp(false, 'No Server Response', null);
            } else if (err.response?.data?.message) {
                console.log(err);
                console.log(err.response.data.message);
                props.onSubmitProp(false, err.response.data.message, null);
            } else {
                console.log(err);
                props.onSubmitProp(false, "Login failed", null);
            }
            errRef.current.focus();
        } 
    }

    return (
        <>
            <div className="content">
                <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className="pr-md-1">
                            <FormGroup>
                                <label htmlFor="username">Username:</label>
                                <Input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                    defaultValue={props.uname ? props.uname : ''}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-1">
                            <FormGroup>
                                <label htmlFor="password">Password:</label>
                                <Input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pl-md-1">
                            <button className='btn btn-success'>Sign In</button>
                        </Col>
                    </Row>
                </Form>

                {/* <p>
                    Don't have an account?<br />
                    <span className="line">
                        <a href="#">Sign Up</a>
                    </span>
                </p> */}
            </div>  
        </>
    )
}

export default Login;