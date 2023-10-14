import React, { Component } from "react";
import ObjavaDataService from "../../services/objava.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class DodajObjava extends Component {

  constructor(props) {
    super(props);
    this.DodajObjava = this.DodajObjava.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async DodajObjava(objava) {
    const odgovor = await PolaznikDataService.post(smjer);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/objava';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    this.DodajObjava({
        naslov: podaci.get('naslov'),
        opis: podaci.get('opis'),
        vrijemeizrade: podaci.get('vrijemeizrade'),
        ipadresa: podaci.get('ipadresa'),
        osoba: podaci.get('osoba'),
        slika: podaci.get ('slika')
      });
      
    }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" placeholder="hashtag" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" placeholder="srce" required />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="vrijemeizrade">
            <Form.Label>vrijemeizrade</Form.Label>
            <Form.Control type="text" name="vrijemeizrade" placeholder="2021-07-21" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="ipadresa">
            <Form.Label>Ipadresa</Form.Label>
            <Form.Control type="text" name="ipadresa" placeholder="178.238.11.6" />
            </Form.Group>

          <Form.Group className="mb-3" controlId="osoba">
            <Form.Label>Osoba</Form.Label>
            <Form.Control type="text" name="osoba" placeholder="Marko Maric" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slika">
            <Form.Label>Slika</Form.Label>
            <Form.Control type="text" name="slika" placeholder="London" />
          </Form.Group>
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/objava`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj objavu
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
    
  }
}
