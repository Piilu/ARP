function closeAlert(){
    document.getElementById('alertsucc').style.display = 'none'
}
function showAlert() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById('alertsucc').style.display = 'block'
    $(document).ready(function () {
        setTimeout(function () {
            document.getElementById('alertsucc').style.display = 'none'
        }, 3000)

    });
}
