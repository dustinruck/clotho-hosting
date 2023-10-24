import React, { useState, useEffect } from 'react';
import useAxiosJWT from '../../hooks/useAxiosJWT';
import { Table } from 'reactstrap';

function AdminTables() {
  const axiosJWT = useAxiosJWT();

  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch Users
    axiosJWT.get('/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });

    // Fetch Listings
    axiosJWT.get('/admin/listings')
      .then(response => {
        setListings(response.data);
      })
      .catch(error => {
        console.error("Error fetching listings:", error);
      });

    // Fetch Orders
    axiosJWT.get('/admin/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div>
      {/* users */}
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Created</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin}</td>
              <td>{user.createdAt}</td>
              <td>{user.isDeleted}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  
      {/* listings */}
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>SellerId</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date Posted</th>
            <th>Sold</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {listings.map(listing => (
            <tr key={listing.id}>
              <td>{listing.id}</td>
              <td>{listing.sellerId}</td>
              <td>{listing.title}</td>
              <td>{listing.description}</td>
              <td>{listing.category}</td>
              <td>{listing.price}</td>
              <td>{listing.createdAt}</td>
              <td>{listing.isSold}</td>
              <td>{listing.isDeleted}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  
      {/* orders */}
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Seller ID</th>
            <th>Buyer ID</th>
            <th>Total</th>
            <th>Payment Token</th>
            <th>Date Ordered</th>
            <th>Cancelled?</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.seller_id}</td>
              <td>{order.buyer_id}</td>
              <td>{order.total}</td>
              <td>{order.payment_details}</td>
              <td>{order.createdAt}</td>
              <td>{order.isCancelled}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
  
}

export default AdminTables;
