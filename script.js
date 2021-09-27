var contain= document.getElementById('container1');
var modelt=document.getElementById('model-t');
var modeltemp=document.getElementById('centi');
var cArr=[];
var tempArr=[];
var close=document.getElementById('close');
var report=document.getElementById('report');
var img2=document.getElementById('image2');
var attr2=document.createAttribute('src');
close.addEventListener('click',()=>{
    modeltemp.innerHTML="";
    modelt.innerText="";
    report.innerHTML="";
    attr2.value="";
    img2.setAttributeNode(attr2);
});
var load=document.getElementById('bubble');
var load1=document.getElementById('bubble1');
fetch("https://restcountries.com/v3/all",(response)=>{
resolve(response);
})
.then((data)=>{
    return data.json();
})
.then((jsondata)=>{
    load.style.visibility="hidden";
    contain.style.visibility="visible";
    console.log(jsondata);
    countries(jsondata);
})
.catch((error)=>{
    console.log(error);
});



var row=document.createElement('div');
row.className="row justify-content-center";
const countries=(arr)=>{
var c=0;
for(var i=0;i<arr.length;i++){
    var col=document.createElement('div');
    col.className="col-lg-6 col-xl-4";
    var temp=cardcreator(arr[i],i);
    col.appendChild(temp);
    row.appendChild(col);
    c+=1;
    if(c==3){
        contain.appendChild(row);
        c=0;
        row=document.createElement('div');
        row.className="row justify-content-center";
    }
}
if(c!=0 && c!=3){
    contain.appendChild(row);
}
};


var card;
var btn;
var text;
var title;
var cardBody;
var image;
var attr1;
var str="";
const cardcreator=(obj,Id)=>{
    str="";
    card=document.createElement('div');
    card.className="card";
    card.style="width:max-content;";
    cardBody=document.createElement('div');
    cardBody.className="card-body";
    title = document.createElement('h5');
    title.className="card-title";
    text=document.createElement('p');
    text.className='card-text';
    
    if("capital" in obj){
        cArr.push({"name":obj.name.common,"code":obj.cca2,"capital":obj.capital[0]});
        str+="Capital: "+obj.capital[0]+"<br>"+"Region: "+obj.region+"<br>"+"Country Code: "+obj.cca2;
    }
    else{
        cArr.push({"name":obj.name.common,"code":obj.cca2});
        str+="Capital: no capital"+"<br>"+"Region: "+obj.region+"<br>"+"Country Code: "+obj.cca2;
    }
    text.innerHTML=str;
    
    btn=document.createElement('button');
    btn.type="button";
    btn.className='btn btn-primary button1';
    attr1=document.createAttribute("data-bs-toggle");
    attr1.value="modal";
    btn.setAttributeNode(attr1);
    attr1=document.createAttribute("data-bs-target");
    attr1.value="#myModal";
    btn.setAttributeNode(attr1);
    attr1=document.createAttribute("id");
    attr1.value=Id;
    btn.setAttributeNode(attr1);
    btn.innerText="Weather";
    
    
    image=document.createElement('img');
    image.src=obj.flags[1];
    image.className="card-img-top image1";
    title.innerText=obj.name.common;
    card.appendChild(title);
    card.appendChild(cardBody);
    cardBody.appendChild(image);
    cardBody.appendChild(text);
    cardBody.appendChild(btn);
    btn.addEventListener('click',Modal);
    return card;
};



const Modal=()=>{
load1.style.visibility="visible";
var strq;
if("capital" in cArr[event.target.id]){
    strq="https://api.openweathermap.org/data/2.5/weather?q="+cArr[event.target.id].capital+",,";
}
else{
    strq="https://api.openweathermap.org/data/2.5/weather?q=,,";
}
var d=cArr[event.target.id].name;modelt.innerText=d;
strq+=cArr[event.target.id].code;
console.log(strq);
fetch(strq+"&appid=b253f6baa12a1fcb2075f8961b77f1f3&units=metric",(response)=>{
resolve(response);
})
.then((data)=>{
    load1.style.visibility="hidden";
    return data.json();
})
.then((data)=>{
    if(data.weather[0].description.toString().includes("clouds")){
        img2.style.visibility="visible";
        attr2.value="source/clouds.png";
        img2.setAttributeNode(attr2);
    }
    if(data.weather[0].description.toString().includes("rain")){
        img2.style.visibility="visible";
        attr2.value="source/rain.png";
        img2.setAttributeNode(attr2);
    }
    if(data.weather[0].description.toString().includes("sky")){
        img2.style.visibility="visible";
        attr2.value="source/sun.png";
        img2.setAttributeNode(attr2);
    }
    modeltemp.innerHTML=Math.ceil(data.main.temp)+"&#176"+"C";
    report.innerHTML="Feelslike "+data.main.feels_like+"&#176"+"C"+"<br>"+data.weather[0].description;
})
.catch((error)=>{
    console.log(error);
});
};
