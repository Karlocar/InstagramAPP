import http from "../http-common";


class KomentarDataService{

    async get(){
        return await http.get('/Komentar');
    }

    async getBySifra(sifra) {
        return await http.get('/komentar/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/Komentar/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(komentar){
        //console.log(komentar);
        const odgovor = await http.post('/komentar',komentar)
           .then(response => {
             return {ok:true, poruka: 'Unio komentar'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,komentar){
        //console.log(komentar);
        const odgovor = await http.put('/komentar/' + sifra,komentar)
           .then(response => {
             return {ok:true, poruka: 'Promjenio komentar'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new KomentarDataService();
