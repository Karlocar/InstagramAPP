import http from "../http-common";


class ObjavarDataService{

    async get(){
        return await http.get('/Objava');
    }

    async getBySifra(sifra) {
        return await http.get('/objava/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/Objava/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(objava){
        //console.log(objava);
        const odgovor = await http.post('/objava',objava)
           .then(response => {
             return {ok:true, poruka: 'Unio objavu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,objava){
        //console.log(objava);
        const odgovor = await http.put('/objava/' + sifra,objava)
           .then(response => {
             return {ok:true, poruka: 'Promjenio objavu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new ObjavaDataService();
