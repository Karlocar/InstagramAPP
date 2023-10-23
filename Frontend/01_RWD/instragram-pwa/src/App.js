import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Osoba from './components/osoba/osoba.component';
import DodajOsoba from './components/osoba/dodajOsoba.component';
import PromjeniOsoba from './components/smjer/promjeniOsoba.component';
import Komentar from './components/komentar/komentar.component';
import DodajKomentar from './components/komentar/dodajKomentar.component';
import PromjeniKomentar from './components/osoba/promjeniKomentar.component';
import Objava from './components/objava/objava.component';
import DodajObjava from './components/objava/dodajObjava.component';
import PromjeniObjava from './components/objava/promjeniObjava.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
        <Route path='/osoba' element={<Osoba />} />
         <Route path="/osoba/dodaj" element={<DodajOsoba />} />
        <Route path="/osoba/:sifra" element={<PromjeniOsoba />} />
        <Route path='/komentar' element={<Komentar />} />
        <Route path="/komentar/dodaj" element={<DodajKomentar />} />
        <Route path="/komentar/:sifra" element={<PromjeniKomentar />} />
        <Route path='/objava' element={<Objava />} />
        <Route path="/objava/dodaj" element={<DodajObjava />} />
        <Route path="/objava/:sifra" element={<PromjeniObjava />} />

      </Routes>
     
    </Router>
  );
}
