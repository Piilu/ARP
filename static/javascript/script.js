window.onload = function () {
    var id = location.href.split('/objekt/')[1];
    if (id.includes('/')){
        id = id.split('/')[0]
    }
    join(id)
}
var socket = io();
function join(id) {
    socket.emit("join", {
        action: "Connected",
        id: id
    });
}



socket.on("join_send_objekt",function(data){
    document.getElementById('objektinimi').innerHTML = data[0].Klient;
    document.getElementById('objektiaadress').innerHTML = data[0].Aadress;
    document.getElementById('objektikontakt').innerHTML = data[0].Kontakt

});
socket.on("join_send", function (data) {
    if (data.length == 0) {
        document.getElementById('noitems').style.display = 'block'

    }
    else {
        document.getElementById('noitems').style.display = 'none'
    }
    //console.log(data)
    for (let i = 0; i < data.length; i++) {
        addItem(data[data.length - i - 1].Tegija, data[data.length - i - 1].Liik, data[data.length - i - 1].Süsteem, data[data.length - i - 1].Sisu, data[data.length - i - 1].Kuupäev, data[data.length - i - 1].ID, data[data.length - i - 1].FileURL)


    }
    //console.log(document.querySelectorAll(".list-section-1").length)
    //console.log(data.length)
});

socket.on("addItem_send", function (data) {
    if (data.length == 0) {
        document.getElementById('noitems').style.display = 'block'

    }
    else {
        document.getElementById('noitems').style.display = 'none'
    }

   // console.log(data)
    addItemNew(data[0].Tegija, data[0].Liik, data[0].Süsteem, data[0].Sisu, data[0].Kuupäev, data[0].ID, data[0].FileURL)

})

function addItem(tegija, liik, system, sisu, kuupäev, id, url) {
    //console.log(id+"pdf")
    var item = document.createElement('div');
    item.innerHTML = '<div style=" animation: fadein 0.5s; border: none;" class="list-section-1"><div><strong><p  style="display:inline">Kuupäev:</p></strong><p id="' + id + "k" + '" class="item-text" >' + kuupäev + '</p></div><div><strong><p  class = "item-text-bold">Liik:</p></strong><p id="' + id + "l" + '" class="item-text" >' + liik + '</p></div><div><strong><p  class = "item-text-bold">Süsteem:</p></strong><p id="' + id + "s" + '" class="item-text" >' + system + '</p></div><div><strong><p   class="item-text-bold" >Tegija:</p></strong><p id="' + id + "t" + '" class="item-text" >' + tegija + '</p></div><div style="width:10%;"><strong><p  style="display:inline">Sisu:</p></strong></div><div style="width:70%"><p style="margin:0; word-wrap: break-word;white-space: pre-wrap;" id="' + id + "sisu" + '"  >' + sisu + '</p></div>  <div class="pdfplace" ><a class="filea" id="' + id + "pdf" + '" style="float: right;" href="' + url + '">PDF</a></div> </div>'
    document.getElementById('listofitems').append(item);



    //console.log(laiend[1])
    if (url == "NONE" || url == "") {
        document.getElementById(id + "pdf").style.display = 'none'
    }
    else {
        if (url.includes(".pdf")) {
            document.getElementById(id + "pdf").innerHTML = "PDF"

        }
        else {
            document.getElementById(id + "pdf").innerHTML = "PILT"
            document.getElementById(id + "pdf").style.backgroundColor = "lightskyblue"

        }
        document.getElementById(id + "pdf").style.display = 'block'
    }

}
function addItemNew(tegija, liik, system, sisu, kuupäev, id, url) {
    var item = document.createElement('div');
    item.innerHTML = '<div style=" animation: fadein 0.5s; border: none;" class="list-section-1"><div><strong><p  style="display:inline">Kuupäev:</p></strong><p id="' + id + "k" + '" class="item-text" >' + kuupäev + '</p></div><div><strong><p  class = "item-text-bold">Liik:</p></strong><p id="' + id + "l" + '" class="item-text" >' + liik + '</p></div><div><strong><p  class = "item-text-bold">Süsteem:</p></strong><p id="' + id + "s" + '" class="item-text" >' + system + '</p></div><div><strong><p   class="item-text-bold" >Tegija:</p></strong><p id="' + id + "t" + '" class="item-text" >' + tegija + '</p></div><div style="width:10%;"><strong><p  style="display:inline">Sisu:</p></strong></div><div style="width:70%"><p style="margin:0; word-wrap: break-word;white-space: pre-wrap;" id="' + id + "sisu" + '"  >' + sisu + '</p></div>  <div class="pdfplace" ><a class="filea" id="' + id + "pdf" + '" style="float: right;" href="' + url + '">PDF</a></div> </div>'

    document.getElementById('listofitems').insertBefore(item, document.getElementById("listofitems").firstChild);
    if (url == "NONE" || url == "") {
        document.getElementById(id + "pdf").style.display = 'none'
    }
    else {
        if (url.includes(".pdf")) {
            document.getElementById(id + "pdf").innerHTML = "PDF"

        }
        else {
            document.getElementById(id + "pdf").innerHTML = "PILT"
            document.getElementById(id + "pdf").style.backgroundColor = "lightskyblue"

        }
        document.getElementById(id + "pdf").style.display = 'block'
    }

}
function addnew() {

    if (document.getElementById('add-new').style.display == 'none') {

        document.getElementById('add-new').style.display = 'block'
    }
    else {
        document.getElementById('add-new').style.display = 'none'
    }
}

function addnewItem(filename) {
    // console.log(document.getElementById("author").value )
    var author = document.getElementById("author").value;
    var liik = document.getElementById("notetype").value;
    var system = document.getElementById("system").value;
    var id = location.href.split('/objekt/')[1]
    if (id.includes('/')){
        id = id.split('/')[0]
    }
    var sisu = document.getElementById("dec").value;
    if (author == '' || liik == '' || sisu == '') {
        document.getElementById("errormsg").style.display = "block"
        document.getElementById("errormsg").innerHTML = "Palun täida kohustuslikud väljad!!"

    }
    else {
        document.getElementById("errormsg").style.display = "none"
        showAlert() //PEAB UMBER TOSTMA, KUNA KUI ANDMEBAAS MAAS SIIS NÄITAB ET LÄKS LÄBI
        socket.emit("addItem", {
            Tegija: author,
            Liik: liik,
            Süsteem: system,
            Sisu: sisu,
            failinimi: filename,
            id: id,

        })
        document.getElementById("lisabtnid").blur();
        document.getElementById("author").value = '';
        document.getElementById("notetype").value = '';
        document.getElementById("system").value = '';
        document.getElementById("dec").value = '';
    }
}
function fileName() {
    var fullPath = document.getElementById('upfile').value;
    var uploadedName = document.getElementById("filenametext");
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        uploadedName.innerHTML = filename;

    }
}

