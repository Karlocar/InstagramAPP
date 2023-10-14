import React, { Component } from "react";
import ObjavaDataService from "../../services/objava.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';


export default class Osoba extends Component {
  constructor(props) {
    super(props);
    this.dohvatiOsoba = this.dohvatiOsoba.bind(this);

    this.state = {
      osoba: [],
      prikaziModal: false
    };
  }



  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });

  componentDidMount() {
    this.dohvatiOsoba();
  }
  dohvatiOsoba() {
    OsobaataService.getAll()
      .then(response => {
        this.setState({
          osoba: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiOsoba(sifra){
    
    const odgovor = await OsobaDataService.delete(sifra);
    if(odgovor.ok){
     this.dohvatiOsoba();
    }else{
     // alert(odgovor.poruka);
      this.otvoriModal();
    }
    
   }

  render() {
    const { osoba} = this.state;
    return (

    <Container>
      <a href="/osoba/dodaj" className="btn btn-success gumb">Dodaj novu osobu</a>
    <Row>
      { objava && objava.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.ime{p.prezime}</Card.Title>
                  <Card.Text>
                    {p.lozinka}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/osoba/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiOsoba(p.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>


      <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
              <Modal.Header closeButton>
                <Modal.Title>Greška prilikom brisanja</Modal.Title>
              </Modal.Header>
              <Modal.Body>Osoba se nalazi na jednoj ili više objava i ne može se obrisati.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.zatvoriModal}>
                  Zatvori
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>


    );
    
        }
}
