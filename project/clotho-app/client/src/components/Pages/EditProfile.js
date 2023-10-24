// EditProfile.js
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAxiosJWT from '../../hooks/useAxiosJWT';
import { Button, Form, FormGroup, Label, Input, Row, Card, CardBody, CardText, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Avatar from '../Forms/Avatar';
import { useNavigate } from 'react-router-dom';

function EditProfile({ props }) {

  const axiosJWT = useAxiosJWT();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [avi, setAvi] = useState({});

  const navigate = useNavigate();


  // const [avatar, setAvatar] = useState('');
  const [modal, setModal] = useState(false);


  const toggle = () => setModal(!modal);

  useEffect(() => {
    getProfile();

  }, []);

  const getProfile = async () => {

    try {

      var response = await axiosJWT.get('/users/profile');

      console.log(response.data)

      const avatar = await axios.get(`/images/avatar/${response.data.user.avatar}`);

      setAvi(avatar.data.url);
      setUser(response.data.user);

    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axiosJWT.put('/users', {
        password,
        email,
        username
      });
      toggle();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="container">
      <div className="col-10 offset-1">

      <div className='row'>

        <div className='row my-5'>
          <h2>Settings</h2>
        </div>


        <div className="col-md-6">

          <div className='row'>
            <div className="card pb-3">
              <div className="card-body">
                <div className="card-title fs-4 mb-5">Update details</div>
                <Form onSubmit={handleSubmit}>
                  {/* <FormGroup>
            <Label for="currentPassword">Current Password</Label>
            <Input type="password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </FormGroup> */}
                  {/* <FormGroup>
            <Label for="confirmNewPassword">Confirm New Password</Label>
            <Input type="password" name="confirmNewPassword" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
        </FormGroup> */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Username</Label>
                    <Input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter new username' />
                  </FormGroup>
                  <button type="submit" className="btn border-dark w-100">Save changes</button>
                </Form>
                {/* <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Profile Updated</ModalHeader>
                <ModalBody>
                  Your profile has been updated successfully!
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>Ok</Button>
                </ModalFooter>
              </Modal> */}

              </div>
            </div>
          </div>
          <div className='row my-5'>
            <div className="card pb-4">
              <div className="card-body ">
                <div className="card-title fs-4 mb-5">New profile image</div>
                <Avatar />
              </div>
            </div>
          </div>

        </div>

        <div className='col-md-4'>
          <Row>
            <Card className="border-0">
              <CardBody>
                <div className='row mb-5'>

                  <div className='col-3'>
                    <img src={avi} alt={`${user.username}'s avatar`} className="img-fluid rounded-circle w-100" />
                  </div>
                  <div className='col-8 text-start'>
                    <CardTitle tag="h5" className="mb-1 px-2">{user.username}</CardTitle>
                    <div className='my-2'>
                      <span className="m-2 text-muted fs-5">{user.email}</span>
                    </div>
                    <div className=''>
                      <span className="m-2 text-danger">&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</span>
                    </div>
                  </div>
                </div>
                <CardText className="row border-bottom pb-4">
                  <button className='btn border-dark fs-5 mb-2' onClick={() => navigate(`/${user.username}`)}>Back to profile</button>
                </CardText>
                <div className='row my-2'>
                </div>
              </CardBody>
            </Card>
          </Row>
        </div>

</div>

      </div>
    </div>

  );
}
export default EditProfile;























// import { Button, Container, Row, Col, Input, FormGroup, Label } from 'reactstrap';
// import { useState, useEffect } from 'react';
// import useAxiosJWT from '../../hooks/useAxiosJWT';
// import axios from '../../api/axios';
// import { Link } from 'react-router-dom';

// function EditProfile() {
//     const axiosJWT = useAxiosJWT();
//     const [user, setUser] = useState({});
//     const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });

//     useEffect(() => {
//         // fetch the user profile here
//         // fetchUserProfile();
//     }, []);

//     const handleChangeAvatar = (event) => {
//         // TODO - avatar change logic here
//     }

//     const handleUpdateEmail = (event) => {
//         event.preventDefault();
//         // TODO - update email logic
//     }

//     const handleDeleteAccount = (event) => {
//         event.preventDefault();
//         // TODO - delete account logic
//     }

//     const handleChangePassword = (event) => {
//         event.preventDefault();
//         if (passwordData.newPassword === passwordData.confirmNewPassword) {
//             // TODO - password change logic
//         } else {
//             alert('New passwords do not match');
//         }
//     }

//     return (
//         <Container className='col-10 offset-1'>
//             <Row className='my-5'>
//                 <Col md='2' className='text-center'>
//                     <img src={user.avatar} alt={`${user.username}'s avatar`} className="img-fluid rounded-circle" width={60} />
//                     <Input type="file" onChange={handleChangeAvatar} />
//                 </Col>
//                 <Col md='10'>
//                     <h2>Edit Profile</h2>
//                     <FormGroup>
//                         <Label for="email">Email:</Label>
//                         <Input type="email" name="email" id="email" defaultValue={user.email} />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="passwordConfirm">Password (for email change confirmation):</Label>
//                         <Input type="password" name="passwordConfirm" id="passwordConfirm" />
//                     </FormGroup>
//                     <Button color="primary" onClick={handleUpdateEmail}>Update Email</Button>
//                 </Col>
//             </Row>

//             <Row className='my-5'>
//                 <Col>
//                     <h4>Change Password</h4>
//                     <FormGroup>
//                         <Label for="currentPassword">Current Password:</Label>
//                         <Input type="password" name="currentPassword" id="currentPassword" onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="newPassword">New Password:</Label>
//                         <Input type="password" name="newPassword" id="newPassword" onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="confirmNewPassword">Confirm New Password:</Label>
//                         <Input type="password" name="confirmNewPassword" id="confirmNewPassword" onChange={e => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })} />
//                     </FormGroup>
//                     <Button color="warning" onClick={handleChangePassword}>Change Password</Button>
//                 </Col>
//             </Row>

//             <Row className='my-5'>
//                 <Col>
//                     <h4>Delete Account</h4>
//                     <FormGroup>
//                         <Label for="passwordDelete">Password (for confirmation):</Label>
//                         <Input type="password" name="passwordDelete" id="passwordDelete" />
//                     </FormGroup>
//                     <Button color="danger" onClick={handleDeleteAccount}>Delete Account</Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }


// export default EditProfile;
