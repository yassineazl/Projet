
import React, { useState, useRef, useEffect } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import { Table, Row, Col } from 'react-bootstrap'
import QRCode from 'qrcode';
import axios from 'axios'
import { Link } from 'react-router-dom'




function App() {
  const [vendeur, setVendeur] = useState([])
  const [test, setText] = useState('');
  const [nom, setNom] = useState('');
  const [cin, setCin] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const classes = useStyles();
  const qrRef = useRef(null);


  const generateQrCode = async () => {
    try {
      let res = await axios.post('/api/vendeur', {
        "Name": test,
        "Numero": nom,
        "cin": cin
      })
      alert('Vendeur ajoutee')
      const response = await QRCode.toDataURL(`https://hometroc.herokuapp.com/consulter/${cin}`);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  }
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
    <Container className={classes.conatiner}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <TextField label="Nom" onChange={(e) => setText(e.target.value)} />
              <br />
              <br />
              <TextField label="Numero de telephone" onChange={(e) => setNom(e.target.value)} />
              <br />
              <br />
              <TextField label="Cin" onChange={(e) => setCin(e.target.value)} />
              <Button className={classes.btn} variant="contained"
                color="primary" onClick={() => generateQrCode()}>Generate</Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Table striped bordered hover responsive className='table-sm'>
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
                <Link to={`/consulter/${item._id}`}>
                  <Button aria-label="delete">
                    Details
                                    </Button>
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));
export default App;