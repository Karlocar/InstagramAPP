import React, { Component } from "react";
import SmjerDataService from "../../services/smjer.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class DodajOsoba extends Component {

  constructor(props) {
    super(props);
    this.DodajOsoba = this.DodajOsoba.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async DodajOsoba(osoba) {
    const odgovor = await OsobaDataService.post(osoba);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/osobe';
    }else{
      // pokaži grešku
     // console.log(odgovor.poruka.errors);
      let poruke = '';
      for (const key in odgovor.poruka.errors) {
        if (odgovor.poruka.errors.hasOwnProperty(key)) {
          poruke += `${odgovor.poruka.errors[key]}` + '\n';
         // console.log(`${key}: ${odgovor.poruka.errors[key]}`);
        }
      }

      alert(poruke);
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

    let prezime=0;
    if (podaci.get('prezime').trim().length>0){
     prezime = parseInt(podaci.get('trajanje'))
    }

    this.DodajOsobu({
      ime: podaci.get('ime'),
      prezime: prezime,
      datumrodenja: parseFloat(podaci.get('datumrodenja')),
      korisnickoime: parseFloat(podaci.get('korisnickoime')),
      lozinka: parseFloat(podaci.get('lozinka')),
      slika: podaci.get('slika')==='on' ? true : false
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" placeholder="Ivan" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="Ivanic" placeholder="130" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="lozinka">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="text" name="lozinka" placeholder="ivan123" />
            <Form.Text className="text-muted">
            
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="datumrodenja">
            <Form.Label>Datumrodrnja</Form.Label>
            <Form.Control type="text" name="datum rodenja" placeholder="-1992-02-24" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="korisnickoime">
            <Form.Label>Korisnickoime</Form.Label>
            <Form.Control type="text" name="korisnickoime" placeholder="iivanic@hotmail.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="slika">
            <Form.Check
            inline
            label="slika"
            name="slika"
          />
          </Form.Group>

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/osoba`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj osobe
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

