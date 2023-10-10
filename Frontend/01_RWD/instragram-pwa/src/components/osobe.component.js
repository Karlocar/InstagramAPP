import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OsobaDataService from "../../services/smjer.service";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class Osobe extends Component{

    constructor(props){
        super(props);
        this.dohvatiOsobe = this.dohvatiOsobe.bind(this);
        this.obrisiSmjer = this.obrisiSmjer.bind(this);

        this.state = {
            Osobe: []
        };

    }

    componentDidMount(){
        this.dohvatiOsobe();
    }

    async dohvatiOsobe(){

        await OsobaDataServiceDataService.get()
        .then(response => {
            this.setState({
                Osobe: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiOsoba(sifra){
        const odgovor = await OsobaDataServiceDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiOsobe();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { Osobe } = this.state;

        return (
            <Container>
               <a href="/osobe/dodaj" className="btn btn-success gumb">
                Dodaj nove osobe
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Datumrodenja</th>
                        <th>Korisnickoime</th>
                        <th>Lozinka</th>
                        <th>Slika</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                { Osobe && Osobe.map((osoba,index) => (
                    <tr key={index}>
                        <td>{osoba.ime}</td>
                        <td className="broj">{osoba.prezime}</td>
                        <td className="broj">
                            <NumericFormat
                                
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2} 
                                fixedDecimalScale/>
                        </td>
                        <td className="sredina">{osoba.slika ? 'DA' : 'NE'}</td>
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/smjerovi/${osoba.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiOsoba(osoba.sifra)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>

                   ))}
                </tbody>
               </Table>



            </Container>


        );
    }
}