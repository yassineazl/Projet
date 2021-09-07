import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  function  sommeOrder() {
    let to=[]
    let array=[]
    let sum=0
    array.push(orders.map(item=>item.totalPrice))
     to=array[0]
    for (let i = 0; i < to.length; i++) {
      sum += parseInt(to[i])
      
  }
   
   return sum
  }

  const delO = async (id) => {
    try {
       
       let res = await axios.post('/api/vendeur/delo', { "id": id })
       console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Articles</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total</th>
              <th></th>
              <th>Livré</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                { <td>{order.createdAt.split('T')[0]}</td> }
                <td>{order.totalPrice}DT</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.split('T')[0]
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
                <td>

                </td>
               
              </tr>
            ))}
          </tbody>
          <h2>somme:{sommeOrder()}</h2>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
