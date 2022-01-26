

<strong>MYSQL SERVER CONNECTION</strong>
---
```
 $query = 'SELECT * FROM flask WHERE Username =' + connection.escape(regUsername);
    connection.query($query, function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query (Register find).");
            return;
        }
        console.log("Register find query succesfully executed");
       
    });
```

```
<div style=" animation: fadein 0.5s; border: none;" class="list-section-1"><div><strong><p  style="display:inline">Kuupäev:</p></strong><p id="' + id + "k" + '" class="item-text" >' + kuupäev + '</p></div><div><strong><p  class = "item-text-bold">Liik:</p></strong><p id="' + id + "l" + '" class="item-text" >' + liik + '</p></div><div><strong><p  class = "item-text-bold">Süsteem:</p></strong><p id="' + id + "s" + '" class="item-text" >' + system + '</p></div><div><strong><p   class="item-text-bold" >Tegija:</p></strong><p id="' + id + "t" + '" class="item-text" >' + tegija + '</p></div><div style="width:10%;"><strong><p  style="display:inline">Sisu:</p></strong></div><div style="width:70%"><p style="margin:0; word-wrap: break-word;white-space: pre-wrap;" id="' + id + "sisu" + '"  >' + sisu + '</p></div>  <div class="pdfplace" ><a class="filea" id="'+id+"pdf"+'" style="float: right;" href="'+url+'">PDF</a></div> </div>        
```

```
<div style="border: none;" class="list-section-1">
<div>
    <strong>
        <p style="display: inline;">Kuupäev:</p>
    </strong>
    <p id="" class="item-text">2022-01-10 03:09:49</p>
</div>

<div>
    <strong>
        <p  class = "item-text-bold">Liik:</p>
    </strong>
    <p id="" class="item-text">asdasd</p>
</div>
<div>
    <strong>
        <p class = "item-text-bold">Süsteem:</p>
    </strong>
    <p id="" class="item-text">asdasd</p>
</div>
<div>
    <strong>
        <p class = "item-text-bold">Tegija:</p>
    </strong>
    <p id="" class="item-text">asdasd</p>
</div>
<div>
    <strong>
        <p class = "item-text-bold">Sisu:</p>
    </strong>
    <p id="" class="item-text">asdasd</p>
</div>
</div>

```

```
<div class="list-section-2"><div><strong><p style="display: inline;">Aadress</p></strong></div><div><strong><p style="display: inline;">Süsteem</p></strong></div><div><p></p></div><div><p></p></div><div id="showmorebtn"><button onclick="openModal('notime')" class="button-style-round" href="">Vaata lähemalt</button></div></div>
```


```
  <div class="list-section-2">
                <div><strong>
                        <p style=" display: inline;">Aadress</p>
                    </strong></div>
                <div><strong>
                        <p style="display: inline;">Süsteem</p>
                    </strong></div>
                <div>
                    <p>asdasd</p>
                </div>
                <div>
                    <p>asdasd</p>
                </div>
                <div style="background-color: transparent;" id="showmorebtn">
                    <button onclick="openModal('notime')" class="button-style-round" href="">Vaata lähemalt</button></div>
            </div>
```