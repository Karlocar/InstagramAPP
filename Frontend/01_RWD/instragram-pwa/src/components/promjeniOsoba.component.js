import React, { Component } from "react";
import OsobaDataServiceDataService from "../../services/osoba.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";



export default class PromjeniOsobu extends Component {

  constructor(props) {
    super(props);

   
    this.osoba = this.dohvatiOsobu();
    this.PromjeniOsobu = this.PromjeniOsobu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

    this.state = {
      osoba: {}
    };

  }



  async dohvatiOsobu() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await OsobaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          osoba: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async PromjeniOsobu(osoba) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await OsobaDataService.put(niz[niz.length-1],osoba);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/smjerovi';
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

    this.PromjeniOsobu({
      ime: podaci.get('ime'),
      prezime: parseInt(podaci.get('prezime')),
      datumrodenja: parseFloat(podaci.get('datumrodenja')),
      korisnickoime: parseFloat(podaci.get('korisnickoime')),
      lozinka: parseFloat(podaci.get('lozinka')),
      slika: podaci.get('slika')==='on' ? true : false
    });
    
  }


  render() {
    
   const { osoba} = this.state;


    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" placeholder="Ivan"
            maxLength={255} defaultValue={osoba.ime} required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" defaultValue={osoba.prezime}  placeholder="Ivanic" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="datumrodenja">
            <Form.Label>Datumrodrnja</Form.Label>
            <Form.Control type="text" name="datumrodenja" defaultValue={osoba.datumrodenja}  placeholder="1992-02-24" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="korisnickoime">
            <Form.Label>Korisnickoime</Form.Label>
            <Form.Control type="text" name="korisnickoime" defaultValue={osoba.korisnickoime}  placeholder="iivanic@hotmail.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lozinka">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="text" name="lozinka" defaultValue={osoba.lozinka}  placeholder="ivan123" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="slika">
            <Form.Check defaultChecked={osoba.slika}
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
              Promjeni osobu
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

