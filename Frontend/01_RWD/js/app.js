$(document).foundation();

let podaci=[];
let trenutniSmjer=0;

function ucitajPodatke(){
    $.ajax('',   // request url
    {
        success: function (data, status, xhr) {// success callback function
           // console.log(data);
           podaci = data;
           $('#podaci').html('');
           for(let i=0;i<data.length;i++){
            $('#podaci').append('<li>' + data[i].ime + 
            ' <a class="brisi" href="#" id="s_' + data[i].sifra + '">X</a>' + 
            ' <a class="promjena" href="#" id="p_' + data[i].sifra + '">P</a>' + 
            '</li>');
           }
           definirajDogadaje();
    }
});
}

ucitajPodatke();


function definirajDogadaje(){
    $('.brisi').off('click');
    $('.brisi').click(function(){

        const element = $(this);
       // console.log(element);
        const sifra = element.attr('id').split('_')[1];
        console.log('Brišem: ' + sifra);

        $.ajax(' + sifra, {
        type: 'DELETE',  // http method
        success: function (data, status, xhr) {
           element.parent().remove();
        },
        error: function (e) {
                console.log(e);
                alert(e.responseJSON);
        }
    });
        return false;
    });


    $('.promjena').off('click');
    $('.promjena').click(function(){
        const element = $(this);
        // console.log(element);
         const sifra = element.attr('id').split('_')[1];
        //console.log(sifra);
        trenutnaOsoba = sifra;
        for(let i=0;i<podaci.length;i++){
            const s = podaci[i];
            if(s.sifra==sifra){
                $('#ime').val(s.ime);
                $('#prezime').val(s.cijena);
                $('#datumrodenja').val(s.datumrodenja);
                $('#korisnickoime').val(s.korisnickoime);
                $('#lozinka').val(s.lozinka);
                if(s.slika){
                    $('#slika').attr('checked','checked');
                }else{
                    $('#slika').removeAttr('checked');
                }
                break;
            }
        }

        return false;
    });
}


$('#dodaj').click(function(){

    const ime = $('#ime').val();
    if(ime.trim().length==0){
        ime=0;
    }

    const prezime = $('#prezime').val();
    if(prezime.trim().length==0){
        prezime=0;
    }

    const datumrodenja = $('#datumrodenja').val();
    if(datumrodenja.trim().length==0){
        datumrodenja=0;
        const lozinka = $('#lozinka').val();
        if(lozinka.trim().length==0){
            lozinka=0;
    }

    const slika = $('#slika').is(":checked")

    const osoba = { 
        ime: $('#ime').val(), 
        prezime: prezime,
        datumrodenja:  datumrodenja,
        korisnickoime: korisnickoime,
        lozinka: lozinka,
        slika: slika};

    $.ajax('', {
        type: 'POST',  // http method
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(smjer),  // data to submit
        success: function (smjer, status, xhr) {
            console.log(podaci);
            podaci.push(smjer);
            $('#podaci').append('<li>' + $('#naziv').val() + 
            ' <a class="brisi" href="#" id="s_' + smjer.sifra + '">X</a>' + 
            ' <a class="promjena" href="#" id="p_' + smjer.sifra + '">P</a>' + 
            '</li>');
            definirajDogadaje();
        },
        error: function (e) {
                //alert(errorMessage);
                //console.log(e.responseJSON.errors);
                const greske = e.responseJSON.errors;
                let poruka='';
                for(svojstvo in greske){
                    //console.log(varijabla);
                    //console.log(`${g[varijabla]}`);
                    poruka += `${greske[svojstvo]}` + '\n';
                }
                alert(poruka);

        }
    });

    return false;
});



$('#promjeni').click(function(){

    if(trenutnaOsoba==0){
        alert('Prvo odaberite osobu za promjenu');
        return;
    }


    const ime = $('#ime').val();
    if(ime.trim().length==0){
        ime=0;
    }

    const prezime = $('#prezime').val();
    if(prezime.trim().length==0){
        prezime=0;
    }

    const datumrodenja = $('#datumrodenja').val();
    if(datumrodenja.trim().length==0){
        datumrodenja=0;
        const korisnickoime = $('#korisnickoime').val();
        if(korisnickoime.trim().length==0){
            korisnickoime=0;
            const lozinka = $('#lozinka').val();
            if(lozinka.trim().length==0){
                lozinka=0;
        }

    const slika = $('#slika').is(":checked")

    const osoba = { 
        ime: $('#ime').val(), 
        prezime: prezime,
        datumrodenja:  datumrodenja,
        korisnickoime: korisnickoime,
        lozinka: lozinka,
        slika: slika};

    $.ajax('' + trenutnaOsoba, {
        type: 'PUT',  // http method
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(smjer),  // data to submit
        success: function (smjer, status, xhr) {
           // trebalo bi podvaliti na postojeći zapis.
           ucitajPodatke();
        },
        error: function (e) {
                //alert(errorMessage);
                //console.log(e.responseJSON.errors);
                const greske = e.responseJSON.errors;
                let poruka='';
                for(svojstvo in greske){
                    //console.log(varijabla);
                    //console.log(`${g[varijabla]}`);
                    poruka += `${greske[svojstvo]}` + '\n';
                }
                alert(poruka);

        }
    });

    return false;
});
