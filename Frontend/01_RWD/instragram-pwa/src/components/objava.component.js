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


export default class Objava extends Component {
  constructor(props) {
    super(props);
    this.dohvatiObjava = this.dohvatiObjava.bind(this);

    this.state = {
      objava: [],
      prikaziModal: false
    };
  }



  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });

  componentDidMount() {
    this.dohvatiObjava();
  }
  dohvatiObjava() {
    ObjavaDataService.getAll()
      .then(response => {
        this.setState({
          objava: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiObjava(sifra){
    
    const odgovor = await ObjavaDataService.delete(sifra);
    if(odgovor.ok){
     this.dohvatiObjava();
    }else{
     // alert(odgovor.poruka);
      this.otvoriModal();
    }
    
   }

  render() {
    const { objava} = this.state;
    return (

    <Container>
      <a href="/objava/dodaj" className="btn btn-success gumb">Dodaj novu objavu</a>
    <Row>
      { objava && objava.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.vrijemeizrade} {p.osoba}</Card.Title>
                  <Card.Text>
                    {p.opis}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/objava/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiObjava(p.sifra)}><FaTrash /></Button>
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
              <Modal.Body>Objava se nalazi na jednoj ili više osoba i ne može se obrisati.</Modal.Body>
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
