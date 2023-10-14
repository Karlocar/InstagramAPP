import React, { Component } from "react";
import KomentarDataService from "../../services/komentar.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class DodajKomentar extends Component {

  constructor(props) {
    super(props);
    this.DodajKomentar = this.DodajKomentar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async DodajKomentar(komentar) {
    const odgovor = await KomentarDataService.post(komentar);
    if(odgovor.ok){
      // routing na komentari
      window.location.href='/objava';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    this.DodajKomentar({
        vrijemekomentiranja: podaci.get('vrijemekomentiranja'),
        opis: podaci.get('opis'),
        objava: podaci.get('objava'),
         osoba: podaci.get('osoba'),
        
      });
      
    }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="vrijemekomentiranja">
            <Form.Label>Vrijemekomentiranja</Form.Label>
            <Form.Control type="text" name="vrijemekomentiranja" placeholder="-07-21"maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" placeholder="srce" required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="objava">
            <Form.Label>Objava</Form.Label>
            <Form.Control type="text" name="objava" placeholder="-07-21" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="osoba">
            <Form.Label>Osoba</Form.Label>
            <Form.Control type="text" name="osoba" placeholder="Marko Maric" />
          </Form.Group>

          
       
          
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/komentar`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj komentar
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
      );
      
    }
  }
  
