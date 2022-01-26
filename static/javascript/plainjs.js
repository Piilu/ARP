function openMenu(){
    
    if(document.getElementById('dropmenu').style.display == 'none'){
        document.getElementById('dropmenu').style.display = 'block'
    }
    else{
        document.getElementById('dropmenu').style.display = 'none'
    }
}
function logOut(){
    answer = confirm("Are you sure you want to sign out");

    if(answer == true){
        window.location.replace("/logout/");


    }
    else{}
}

function addnewObject(){
    if (document.getElementById('add-new-object').style.display == 'none') {
       
        document.getElementById('add-new-object').style.display = 'block'
    }
    else {
        document.getElementById('add-new-object').style.display = 'none'
    }
}

function showsysItem(name){
    document.getElementById('systemitems').innerHTML +=name.value+',';
    if(name.value !=''){

        var x = document.getElementById('listofsystem');
        var item = document.createElement('p');
        item.id = name.value;
        item.innerHTML= '<span class="close" onclick="removesysItem('+name.value+')">&times;</span>'+name.value
        x.append(item);
        
        name.remove(name.selectedIndex)
        name.value = '';
      
    }


}

function removesysItem(name){
    var systext = document.getElementById('systemitems');
    var syslist = systext.innerHTML.split(',')
    //console.log(syslist);
    //console.log(systext.innerHTML)
    if(syslist.includes(name.id)){
        document.getElementById('systemitems')
        syslist.splice(syslist.indexOf(name.id),1)
        systext.innerHTML = ''
        for(let i = 0;i<syslist.length-1;i++){
            systext.innerHTML += syslist[i]+','
        }
    }

    name.remove()
    var opt = document.createElement('option');
    opt.innerHTML = name.id;
    document.getElementById('system').append(opt);
}


function clearsysItem(name){
    if(name.length-1 !=0 ){

        for(let i = 0;i< name.length-1;i++){
            document.getElementById(name[i]).remove()
            var opt = document.createElement('option');
            opt.innerHTML = name[i];
            document.getElementById('system').append(opt);
        }
        document.getElementById('systemitems').innerHTML='';

    }
}

