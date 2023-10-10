import http from "../http-common";


class OsobaDataService{

    async get(){
        return await http.get('/Osoba');
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

}

export default new OsobaDataService();