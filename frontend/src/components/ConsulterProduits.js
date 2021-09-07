import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'
import React, { useState, useRef,useEffect} from 'react';
import axios from 'axios'
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';


function ConsulterProduits({match}) {
    const [items,setItems]=useState([])
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] = useState('');
    const classes = useStyles();
    const qrRef = useRef(null);

   useEffect(() => {
       getdata()
   }, [])

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);
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
    const onScanFile =async () => {
        qrRef.current.openImageDialog();
        
        
    }

    const getdata=async()=>{
        try {
            let result= await axios.post('/api/vendeur/get',{"number":match.params.id})
            setItems(result.data) } catch(err) {console.log(err)}
    }

    
    const handleErrorWebCam = (error) => {
        console.log(error);
    }
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result);
        }
    }
    return (
        <Container className={classes.conatiner}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                          <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                          <Button className={classes.btn} variant="contained" 
                            color="primary" onClick={() => generateQrCode()}>Generate</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>) : null}
                      </Grid> */}
                        {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        
                            <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                            <Button className={classes.btn} variant="contained" color="primary" onClick={getdata}>Rechercher</Button>
                            <QrReader
                                ref={qrRef}
                                delay={300}
                                style={{ width: '100%' }}
                                onError={handleErrorFile}
                                onScan={handleScanFile}
                                legacyMode
                            />
                        </Grid> */}
                        <Grid item xl={6} lg={5} md={7} sm={12} xs={12}>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>       
                                        <th>Produit</th>
                                        <th>Quantite Initiale</th>
                                        <th>Quantite Restante</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.stockIn}</td>   
                                            <td>{item.countInStock}</td>        
                                                
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
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
export default ConsulterProduits;