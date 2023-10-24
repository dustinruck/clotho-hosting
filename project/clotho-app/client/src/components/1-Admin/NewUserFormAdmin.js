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
    const [isAdmin, setIsAdmin] = useState('1');
    const [isDeleted, setIsDeleted] = useState(false);
    const [imgUrl, setImgUrl] = useState('placeholder');
    const [usersList, setUsersList] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        axiosJWT.get("/admin/users").then((response) => {
            setUsersList(response.data);
        });
    }, []);


    // create new user from form
    const createUser = async (e) => {

        e.preventDefault();

        // TODO: check for duplicate usernames, etc.

        // post to db
        axiosJWT.post("/admin/users", { //FIXME HANDLE SUBMIT, DISPLAY ERROR
            username: username,
            password: password,
            email: email,
            isAdmin: isAdmin,
            isDeleted: isDeleted,
            imgUrl: imgUrl
        })
            .then(response => {
                setShowAlert(true);  // Show an alert if it worked
                setUsersList([...usersList, response.data]);

            })
            .catch(error => {
                console.error("There was an error", error);
            });
    }

    return (
        <>
            {showAlert &&
                <div className="alert alert-success" role="alert">
                    User created successfully!
                </div>
            }
            <div className="content">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader className='text-start-0'>
                                <CardTitle tag="h4">Create New User</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={createUser}>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Username:</label>
                                                <Input
                                                    id="newUserUsername"
                                                    placeholder="Clever Username Here"
                                                    type="text"
                                                    required
                                                    onChange={(e) => setUsername(e.target.value)}
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
                                                    onChange={(e) => setPassword(e.target.value)}
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
                                                    onChange={(e) => setEmail(e.target.value)}
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
                                                    onChange={(e) => setIsAdmin('1')}
                                                    defaultChecked
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
                                                    onChange={(e) => setIsAdmin('0')}
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
                                                    onChange={(e) => setIsAdmin('GOD')}
                                                />
                                                <Label >
                                                    God Tier DBA
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <label>Image URL (will be input box)</label>
                                                <Input
                                                    id='newUserImgUrl'
                                                    disabled
                                                    defaultValue="placeholder"
                                                    placeholder="placeholder"
                                                    type="text"
                                                    onChange={(e) => setImgUrl(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => { createUser(e) }}
                                >
                                    Create User
                                </button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default NewUserForm;