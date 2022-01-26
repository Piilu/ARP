

function openModal(modalname){
    var modal = document.getElementById(modalname);
    modal.style.display = "block";

}
function closeModal(modalname){
    var modal = document.getElementById(modalname);


    modal.style.display = "none";
}
function openModalObject(){
  var modal = document.getElementById('moreobjectinfo');
  modal.style.display = "block";
}


window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  var modal2 = document.getElementById("notime");
  var modal3 = document.getElementById('moreobjectinfo');
  if (event.target == modal) {
    modal.style.display = "none";
  }
  else if (event.target ==modal2){
      modal2.style.display = "none";
    
  }
  else if (event.target ==modal3){
    modal3.style.display = "none";
  
}
}