var socket = io();
socket.on("objectitem_send",function(data){
    if (data.length == 0) {
        document.getElementById('noitems').style.display = 'block'

    }
    else {
        document.getElementById('noitems').style.display = 'none'
    }
    addNewObjekt(data[0].Klient,data[0].Aadress,data[0].Kontakt,data[0].Email,data[0].Telefon,data[0].Süsteem,data[0].ID)
})

socket.emit('join objektid',{
    action: "Connected"
})

socket.on('join objektid send',function(data){
    var searchtext = window.location.href.split('=')[1]
    if(searchtext!=undefined && searchtext.includes('+')){
        while(searchtext.includes('+')){

            searchtext=searchtext.replace('+',' ')
        }
       console.log(searchtext)
    }
    if (data.length == 0) {
        document.getElementById('noitems').style.display = 'block'

    }
    else {
        document.getElementById('noitems').style.display = 'none'
    }
    for(let i =0;i<data.length;i++){
        if(searchtext != undefined  && data[i].Aadress.toLowerCase().startsWith(searchtext.toLowerCase()) ){
            addObjekt(data[i].Klient,data[i].Aadress,data[i].Kontakt,data[i].Email,data[i].Telefon,data[i].Süsteem,data[i].ID);
            document.getElementById('otsi').value = searchtext;
            document.getElementById('otsi').focus();
        }
        else if(!window.location.href.includes('otsi')) {
            addObjekt(data[i].Klient,data[i].Aadress,data[i].Kontakt,data[i].Email,data[i].Telefon,data[i].Süsteem,data[i].ID)
        }
    }
    if(document.getElementById('obiektidelist').children.length-1==0){
        document.getElementById('noitems').style.display = 'block'
        document.getElementById('otsi').value = searchtext;
        document.getElementById('otsi').focus();

    }
    else{
        document.getElementById('noitems').style.display = 'none'

    }
})

socket.on("detailedObject_send",function(data){
    var system = data[0].Süsteem.slice(0,data[0].Süsteem.length-1)
    document.getElementById('detailklient').innerHTML = data[0].Klient;
    document.getElementById('detailaadress').innerHTML = data[0].Aadress;
    document.getElementById('detailkontakt').innerHTML = data[0].Kontakt;
    document.getElementById('detailemail').innerHTML = data[0].Email;
    document.getElementById('detailtel').innerHTML = data[0].Telefon;
    document.getElementById('detailsys').innerHTML = data[0].Süsteem;






})
function addObjekt(klient,aadress,kontakt,email,telefon,system,id){
    var item = document.createElement('div')
    var notime = 'notime'
    item.innerHTML ='<div style=" animation: fadein 0.5s; id="'+id+'" class="list-section-2"><div><strong><p style="display: inline;">Aadress</p></strong></div><div><strong><p style="display: inline;">Süsteem</p></strong></div><div><p id="'+id+'aadress">'+aadress+'</p></div><div><p id="'+id+'system">'+system+'</p></div><div id="showmorebtn"><button id="'+id+',obtn" onclick="openMoreinfObject(this);openModalObject();generateQRCodeForNotes(this)" class="button-style-round">Vaata lähemalt</button></div></div'
    document.getElementById('obiektidelist').append(item);

}

function addNewObjekt(klient,aadress,kontakt,email,telefon,system,id){
    var item = document.createElement('div')
    var  notime = 'notime'
    item.innerHTML ='<div style=" animation: fadein 0.5s; id="'+id+'" class="list-section-2"><div><strong><p style="display: inline;">Aadress</p></strong></div><div><strong><p style="display: inline;">Süsteem</p></strong></div><div><p id="'+id+'aadress">'+aadress+'</p></div><div><p id="'+id+'system">'+system+'</p></div><div id="showmorebtn"><button id="'+id+',obtn" onclick="openMoreinfObject(this);openModalObject();generateQRCodeForNotes(this)" class="button-style-round" >Vaata lähemalt</button></div></div'
    document.getElementById('obiektidelist').insertBefore(item, document.getElementById("obiektidelist").firstChild);

}
function sendObjekt(){
    var klient = document.getElementById("klientid");
    var aadress = document.getElementById("addressid");
    var kontakt = document.getElementById("kontaktid");
    var email = document.getElementById("klientemailid");
    var telefon = document.getElementById("telefonnr");
    var systemlist = document.getElementById("systemitems");
    var system = systemlist.innerHTML.slice(0,systemlist.innerHTML.length-1)

    var systemlistclear = systemlist.innerHTML.split(',')
    if(klient.value == ''||aadress.value == '' || kontakt.value== ''|| email.value== ''|| telefon.value == ''|| systemlist.innerHTML == ''){
        document.getElementById('errormsg').innerHTML = "Palun täida kõik kohustuslikud väljad"
    }
    else{
        document.getElementById('errormsg').innerHTML = ""
        showAlert() // SEE TULLEB MUUTA KUNA KUI ANDMEBAAS MAAS SIIS UTLEB ET ANDMED LAKSID LABI
        socket.emit('objectitem',{
            klient: klient.value,
            aadress: aadress.value,
            kontakt: kontakt.value,
            email: email.value,
            telefon:telefon.value,
            system: system,
            
        })    
        clearsysItem(systemlistclear)
        klient.value =''
        aadress.value =''
        kontakt.value = ''
        email.value = ''
        telefon.value = ''
        systemlist.innerHTML=''
    }
}


function openMoreinfObject(id){
    id = id.id.split(',')[0]

    socket.emit('detailedObject',{
        id:id,
    })
}

function search(name){
}