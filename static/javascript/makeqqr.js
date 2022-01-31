
function generateQRCode(qrtext) {
    var qr;
    qr = new QRious({
        element: document.getElementById('qr-code'),
        size: 200,
        value: qrtext , 
});
document.getElementById('qrfor').innerHTML = window.location.href
}


function generateQRCodeForNotes(data) {
    var objecid = data.id.split(',')[0]
    var url = '/digipaevik/objekt/'+objecid+'/' //    var url = window.location.href.split('/objektid/')[0]+'/digipaevik/objekt/'+objecid+'/'

    var qr;
    qr = new QRious({
        element: document.getElementById('qr-code-object'),
        size: 80,
        value: url , 
});
document.getElementById('obqrfor').href = url;
document.getElementById('obqrfor').innerHTML = 'QR päevikusse';
}