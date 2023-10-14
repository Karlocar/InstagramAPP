import http from "../http-common";


class OsobaDataService{

    async get(){
        return await http.get('/Osoba');
    }

    async getBySifra(sifra) {
        return await http.get('/Osoba/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/Osoba/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(osoba){
        //console.log(osoba);
        const odgovor = await http.post('/osoba',osoba)
           .then(response => {
             return {ok:true, poruka: 'Unio osobu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,osoba){
        //console.log(osoba);
        const odgovor = await http.put('/osoba/' + sifra,osoba)
           .then(response => {
             return {ok:true, poruka: 'Promjenio osobu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new OsobaDataService();
