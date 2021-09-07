import React, { useState, useRef, useEffect } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import { Table, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Vendeurs = () => {
    const [vendeur, setVendeur] = useState([])
    useEffect(() => {
        const getAllv = async () => {
            let res = await axios.get('/api/vendeur/getv')

            await setVendeur(res.data)
        }
        getAllv()
    }, [vendeur])

    const delv = async (id) => {
        try {

            let res = await axios.post('/api/vendeur/delv', { "id": id })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Container>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Cin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendeur.map((item) => (
                            <tr key={item._id}>
                                <td>{item.Name}</td>
                                <td>{item.Cin}</td>
                                <td>
                                    <Button onClick={() => delv(item._id)} aria-label="delete">
                                        Supprimer
                                    </Button>
                                    <Link to={`/consulter/${item.Cin}`}>
                                        <Button aria-label="delete">
                                            Details
                                    </Button>
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

        </div>
    )
}

export default Vendeurs
