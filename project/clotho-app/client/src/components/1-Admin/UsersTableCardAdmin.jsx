import { useState, useEffect, useRef } from 'react';
import useAxiosJWT from '../../hooks/useAxiosJWT';

// reactstrap components
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Table,
} from "reactstrap";

function UsersTableCardAdmin() {

    const axiosJWT = useAxiosJWT();

    // STATES
    const [usersList, setUsersList] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    // HOOKS
    /* 
    //Test Hook with sample JSON
    useEffect(() => {
        Axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
            setUsersList(response.data);
        });
    }, []);
    */
    useEffect(() => {
        setErrorMessage('');
    }, [])

    useEffect(() => {
        axiosJWT.get("/admin/users").then((response) => {
            setUsersList(response.data);
        }).catch((err) => {
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
        });
    }, []);


    const editUser = (id) => {
        alert('viewUser(id) not yet implemented');
        //PUT edit existing user: api / admin / users /: id([0 - 9] +)
//DELETE user: api / admin / users /: id([0 - 9] +)
//PATCH undelete user: api / admin / users / undelete /: id([0 - 9] +)
    };
    const deleteUser = (id) => {
        alert('deleteUser() is under dev');
    }
    const unDeleteUser = (id) => {
        alert('deleteUser() is under dev');
    }

    if (sessionStorage.getItem('isAdmin') === "true") {


        return (
            <>
                <Card style={{
                    maxWidth: '100%',
                }}>
                    <CardHeader className='text-start-0'>
                        <CardTitle tag="h4">Users:</CardTitle>
                    </CardHeader>
                    <CardBody style={{
                        maxWidth: '100%',
                    }}>
                        <Table className="tablesorter" responsive={true}>
                            <thead className="text-primary">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">Username</th>
                                    <th className="text-center">Email</th>
                                    {/* <th className="text-center">Password</th> */}
                                    <th className="text-center">Role</th>
                                    <th className="text-center">Status</th>
                                    {/* <th className="text-center">Img</th> */}
                                    <th className="text-center">Created</th>
                                    <th className="text-center">Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usersList.map((val) => {
                                        return (
                                            <tr key={val.id}>
                                                <td>{val.id}</td>
                                                <td>{val.username}</td>
                                                <td>{val.email}</td>
                                                {/* <td>{val.password ? "********" : "invalid"}</td> */}
                                                <td>{val.isAdmin ? "Admin" : "User"}</td>
                                                <td>{val.isDeleted ? "Deleted" : "Active"}</td>
                                                {/* <td>{val.avatar}</td> */}
                                                <td>{val.createdAt}</td>
                                                <td>{val.updatedAt}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => { editUser(val.id) }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                                {
                                                    val.isDeleted
                                                    &&
                                                    <td td className="text-center">
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => { deleteUser(val.id) }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                }
                                                {
                                                    !val.isDeleted
                                                    &&
                                                        <td className="text-center">
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => { deleteUser(val.id) }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                }

                                            </tr>
                                        );
                                    })
                                }

                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </>
        );
    }
    return (
        <>
            <div><span>{errorMessage}</span></div>
        </>)
}

export default UsersTableCardAdmin;