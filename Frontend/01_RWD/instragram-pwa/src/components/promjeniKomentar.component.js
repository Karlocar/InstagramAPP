import React, { Component } from "react";
import KomentarDataService from "../../services/komentar.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class promjeniKomentar extends Component {

  constructor(props) {
    super(props);

    this.komentar = this.dohvatiKomentar();
    this.promjeniKomentar = this.promjeniKomentar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      komentar: {}
    };
  }


  async dohvatiKomentar() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await KomentarDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          komentar: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniKomentar(komentar) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await KomentarkDataService.put(niz[niz.length-1],komentar);
    if(odgovor.ok){
      window.location.href='/komentar';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    this.promjeniKomentar({
      vrijemekomentiranja: podaci.get('vrijemekomentiranja'),
      opis: podaci.get('opis'),
      objava: podaci.get('objava'),
      osoba: podaci.get('osoba')
    });
    
  }


  render() {
    
    const { komentar} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="vrijemekomentiranja">
            <Form.Label>Vrijemekomentiranja</Form.Label>
            <Form.Control type="text" name="vrijemekomentiranja" placeholder="2022-09-08" maxLength={255} defaultValue={komentar.vrijemekomentiranja} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" placeholder="srce" defaultValue={komentar.opis}  required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="objava">
            <Form.Label>Objava</Form.Label>
            <Form.Control type="text" name="objava" placeholder="-09-08" defaultValue={komentar.objava} required  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="osoba">
            <Form.Label>Osoba</Form.Label>
            <Form.Control type="text" name="osoba" placeholder="" defaultValue={komentar.osoba}  />
          </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/komentari`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni komentar
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

