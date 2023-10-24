import { useState, useEffect } from 'react';
import useAxiosJWT from '../../hooks/useAxiosJWT';


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


function NewUserForm() {
    const axiosJWT = useAxiosJWT();

    /*
    // TODO: live-update user list when a new user is created. Will need these:
    // STATES
    const [usersList, setUsersList] = useState([]);
    // HOOKS
    useEffect(() => {
        Axios.get("http://localhost:3001/api/admin/users").then((response) => {
            setUsersList(response.data);
        });
    }, []);
    */

    // STATES
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [imgUrl, setImgUrl] = useState('placeholder');

    
    // create new user from form
    const createUser = () => {

        // set states
        setUsername(document.getElementById('newUserUsername').value);
        setPassword(document.getElementById('newUserPassword').value);
        setEmail(document.getElementById('newUserEmail').value);
        setIsAdmin((document.getElementById('newUserIsAdminTrue').checked) ? true : false);
        setIsDeleted(false); // if we want to be able to delete users upon creation: document.getElementById('newUserIsDeleted').value
        setImgUrl(document.getElementById('newUserImgUrl').value); //TODO: replace with image upload

        // TODO: Frontend Validation
        // e.g. check for duplicate usernames, etc.

        // post to db
        axiosJWT.post("/admin/users", { //FIXME HANDLE SUBMIT, ERROR HANDLING, ASYNC
            username: username,
            password: password,
            email: email,
            isAdmin: isAdmin,
            isDeleted: isDeleted,
            imgUrl: imgUrl
        });
    }

    return (
        <>
            <Card className='mx-auto'>
                <CardHeader className='text-start-0'>
                    <CardTitle tag="h4">Create New User</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col className="pr-md-1" md="5">
                                <FormGroup>
                                    <label>Username:</label>
                                    <Input
                                        id="newUserUsername" 
                                        placeholder="Clever Username Here"
                                        type="text" 
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="px-md-1" md="3">
                                <FormGroup>
                                    <label>Password:</label>
                                    <Input
                                        id='newUserPassword'
                                        placeholder="Secure Password Here"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="4">
                                <FormGroup>
                                        <label> {/* htmlFor="exampleInputEmail1" */}
                                        Email:
                                    </label>
                                    <Input
                                        id="newUserEmail"
                                        placeholder="real@email.com"
                                        type="email"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="4">
                                
                                <label>Role:</label>
                            </Col>
                            <Col>    
                                <FormGroup>
                                    <Input
                                        id="newUserIsAdminTrue"
                                        name="newUserIsAdmin"
                                        type="radio"
                                    />
                                    <label>
                                            Admin
                                    </label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Input
                                        id="newUserIsAdminFalse"
                                        name="newUserIsAdmin"
                                        type="radio"
                                    />
                                    <label>
                                            User
                                    </label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup disabled >
                                    <Input
                                        disabled
                                        id="newUserIsAdminGod"
                                        name="newUserIsAdmin"
                                        type="radio"
                                    />
                                    <Label >
                                            God Tier DBA
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <FormGroup>
                                    <label>Image URL placeholder -- user will provide</label>
                                    <Input
                                        id='newUserImgUrl'
                                        disabled
                                        defaultValue="placeholder"
                                        placeholder="placeholder"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row> */}
                    </Form>
                </CardBody>
                <CardFooter>
                    <button
                        className="btn btn-primary"
                        onClick={() => { createUser() }}
                    >
                        Create User
                    </button>
                </CardFooter>
            </Card>

        </>
    );
}

export default NewUserForm;