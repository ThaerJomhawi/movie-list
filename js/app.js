'use strict'

function Movie (name,imgUrl,release){
    this.name=name;
    this.imgUrl=imgUrl;
    this.release=release;

    Movie.allMovie.push(this)
}

Movie.allMovie=[];

let form = document.getElementById('form')
form.addEventListener('submit',submitHandler)

function submitHandler(e){
    e.preventDefault();

    let name=e.target.movieName.value;
    let imgUrl= e.target.movieImage.value;
    let release =e.target.movieRelease.value;

    new Movie(name,imgUrl,release);

    saveToLs();
    tableHead();
    render();
    tablefooter();
    
}

function saveToLs(){
    localStorage.setItem('Film',JSON.stringify(Movie.allMovie))
}


function loadFromLs(){

    let data=JSON.parse(localStorage.getItem('Film'))|| [];

    if (data){
        Movie.allMovie=[];
        for (let i = 0; i < data.length; i++) {
            new Movie(data[i].name,data[i].imgUrl,data[i].release)
            
        }
    }
    tableHead();
    render();
     tablefooter();

}



let table= document.getElementById('table')
let tHead = document.querySelector('thead')

function  tableHead(){
 
    tHead.innerHTML=" "
    let headArr=['#','Image','Name','Release']

    for (let i = 0; i < headArr.length; i++) {
        let tdHead= document.createElement('td')
        tdHead.className='tdHead'
        tHead.appendChild(tdHead);
        tdHead.textContent=headArr[i];
        
    }



}


function  render(){
// while(table.Rows.length > 0){

//     table.deleteRow(0)
// }

    
for (let i = 0; i < Movie.allMovie.length; i++) {
    
    let tr =document.createElement('tr')
    table.appendChild(tr);

    let removeTD =document.createElement('td')
    removeTD.className="remove"
    tr.appendChild(removeTD )
    removeTD.innerHTML=`<a onclick="removeRow(${i})">X</a>`

     let imgTD =document.createElement('td')
    tr.appendChild(imgTD)
    imgTD.innerHTML=`<img src="./img/${Movie.allMovie[i].imgUrl}">`;

    let nameTD =document.createElement('td')
    tr.appendChild(nameTD )
    nameTD.textContent=Movie.allMovie[i].name;

       let dateTD =document.createElement('td')
    tr.appendChild(dateTD )
    dateTD.textContent=Movie.allMovie[i].release;
}


}


function tablefooter(){

    let trf = document.createElement('tr')
    table.appendChild(trf);

    let thFooter= document.createElement('th')
    trf.appendChild(thFooter).
    thFooter.textContent= 'Quantity';

    let thFooter2= document.createElement('th')
    trf.appendChild(thFooter2).
    thFooter2.textContent= "00";
}



function removeRow(index){
    Movie.allMovie.splice(index,1)
    saveToLs();
    loadFromLs();
}


let btn = document.getElementById('clear')
btn.addEventListener('click',clearLs)

function clearLs(){
    localStorage.removeItem('Film')
    Movie.allMovie=[];
    table.innerHTML=''
}


loadFromLs();