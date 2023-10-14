import React, { Component } from "react";
import ObjavaDataService from "../../services/objava.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniObjava extends Component {

  constructor(props) {
    super(props);

    this.objava = this.dohvatiObjava();
    this.PromjeniObjava = this.PromjeniObjava.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      objava: {}
    };
  }


  async dohvatiObjava() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await ObjavaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          polaznik: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniObjava(objava) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await ObjavaDataService.put(niz[niz.length-1],objava);
    if(odgovor.ok){
      window.location.href='/objava';
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

    this.promjeniObjava({
      naslov: podaci.get('naslov'),
      opis: podaci.get('opis'),
      vrijemeizrade: podaci.get('vrijemeizrade'),
      ipadresa: podaci.get('ipadresa'),
      osoba: podaci.get ('osoba'),
      slika: podaci.get('slika')
    });
    
  }


  render() {
    
    const { objava} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" placeholder="hashtag" maxLength={255} defaultValue={objava.naslov} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" placeholder="srce" defaultValue={objava.opis}  required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="vrijemeizrade">
            <Form.Label>vrijemeizrade</Form.Label>
            <Form.Control type="text" name="vrijemeizrade" placeholder="2021-07-21" defaultValue={objava.vrijemeizrade}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ipadresa">
            <Form.Label>Ipadresa    </Form.Label>
            <Form.Control type="text" name="ipadresa" placeholder="178.238.11.6" defaultValue={objava.ipadresa}  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="osoba">
            <Form.Label>  Osoba  </Form.Label>
            <Form.Control type="text" name="osoba" placeholder="Marko Maric" defaultValue={objava.osoba}  />
          </Form.Group>ž
          <Form.Group className="mb-3" controlId="slika">
            <Form.Label>Slika</Form.Label>
            <Form.Control type="text" name="slika" placeholder="London" defaultValue={objava.slika}  />
          </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/objava`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni polaznika
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}
