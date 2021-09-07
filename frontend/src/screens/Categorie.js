import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Table, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const Categorie = () => {
    const [cat, setCat] = useState([])
    useEffect(() => {
        const getCat = async () => {
            let cats = await axios.get('/api/vendeur/gets')
            await setCat(cats.data)
        }
        getCat()
    }, [cat])
    const [state, setState] = useState('')
    const addCategorie = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post('/api/vendeur/ad', { "Name": state })
            setState('')
            alert('Categorie Ajoutée')
        } catch (err) { console.log(err) }


    }

    const del=async(id)=>{
        try {
           
            let res=await axios.post('/api/vendeur/del',{"id":id})
        } catch(err) {
            console.log(err)
        }
    }
    return (

        <FormContainer>
            <br />
            <Form>
                <Form.Group controlId='email'>
                    <Form.Label>Categorie</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='categorie'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button onClick={e => addCategorie(e)} type='submit' variant='primary'>
                    Ajouter
               </Button>
                <br />
                <br />
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Categorie</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cat.map((item) => (
                            <tr key={item._id}>
                                <td>{item.Name}</td>
                                <td>
                                    <Button onClick={()=>del(item._id)} aria-label="delete">
                                       Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Form>

        </FormContainer>

    )
}

export default Categorie
