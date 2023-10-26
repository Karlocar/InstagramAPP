import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";



export default class Osoba extends Component{

    render () {
        return (
            <Container>
            < a href="/smjerovi/dodaj" className="btn btn success gumb">
                Dodaj novi smjer
                </a>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th> Ime</th>   
                        <th> Prezime</th>
                        <th> Datumrodenja</th>
                        <th> Korisnickoime</th>
                        <th> Lozinka</th>
                        <th> Slika</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* Ovdje će doći podaci s backend-a*/}
                        </tbody>
                         </Table>
                         </Container>
        );
    }
}
