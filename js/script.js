let auteurs= new Array();
let categories= new Array();
let sortAutersArray = new Array();
let sortCategoriesList = new Array();

let url ="books.json";
fetch(url)
.then(response => response.json())
.then(data =>{
    getAuters(data);
    getCategories(data);
    getCartsInfo(data);

}).catch(err => console.log(err));
function getAuters(data){
    let i=0;
    data.map(item =>{
        for(let index =0; index< item.authors.length; index++){    
            if(item.authors[index] !== "" && auteurs.includes(item.authors[index]) !=1){
                auteurs[i++]=item.authors[index];
            }    
        }
          
    
    });
  
    sortAuters(auteurs , data);
    

}
function sortAuters(auteurs, data){
     sortAutersArray =auteurs.sort() ;
 
    remplireSelectAuters(sortAutersArray, data);
}
function remplireSelectAuters(sortAutersArray, data){

    let select = document.getElementById("autersSelect");
    for(let index =0; index<sortAutersArray.length; index++)
    {
       let option =document.createElement('option');

       option.innerHTML =sortAutersArray[index];
       option.value = index;
       select.appendChild(option);
    }
    select.addEventListener('change', function(){
       let choice = select.selectedIndex ;
       let value =-1;
       value = select.options[choice].value;
       if(value != -1){
        value = select.options[choice].value;
        document.getElementById("categoriesSelect").innerHTML =" ";
        filtrerAuters(value, data);
       }
   
    });

}
function getCategories(data){
    let i=0;
    data.map(item =>{
        for(let index =0; index< item.categories.length; index++){    
            if(item.categories[index] !== "" && categories.includes(item.categories[index]) !=1){
                categories[i++]=item.categories[index];
            }    
        }  
    });
    sortCategories(categories, data);
}
  
function sortCategories(categories, data){
    sortCategoriesList =categories.sort();
    remplireSelectCategories(sortCategoriesList, data);
}
function remplireSelectCategories(sortCategoriesList, data){
    let select = document.getElementById("categoriesSelect");
    for(let index =0; index<sortCategoriesList.length; index++)
    {
       let option =document.createElement('option');

       option.innerHTML =sortCategoriesList[index];
       option.value = index;
       select.appendChild(option);
    }
    select.addEventListener('change', function(){
        let choice = select.selectedIndex ;
        let value =-1;
        value = select.options[choice].value;
        if(value != -1){
         value = select.options[choice].value;
         document.getElementById("autersSelect").innerHTML =" ";
         filtrerCategories(value, data);
        }
    });
 
}
function getCartsInfo(data){
    let mainDiv = document.getElementById("mainDiv");
    data.map(item =>{
    let  urlType = (item.thumbnailUrl !== undefined )? item.thumbnailUrl : "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
    const date = new Date(item.publishedDate.dt_txt);
    const formatDate =new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date);
    
    let card = document.createElement('DIV');

    card.classList.add("col-lg-2","col-md-3", "col-sm-12", "card");
   
    let card_body = document.createElement('DIV');
    card_body.classList.add('card_body');


    card_body.innerHTML = `
    <img class="card-img-top" src=${urlType}>
    <h4  id="title"><strong>${item.title}</strong></h4>
    <p id="isbn"><strong>ISBN:</strong> ${item.isbn}</p>
    <p id="date"><strong>Date de publication: </strong> ${formatDate} </p>
    <p id="pages"><strong>Nombre de pages: </strong>  ${item.pageCount}</p>`;
 
    if( item.shortDescription !== undefined)
    {
       card_body.innerHTML += `<p id="discriotion"><strong>discription: </strong> ${item.shortDescription}</p>`;
    }
    card.appendChild(card_body);
    console.log(card);
    mainDiv.appendChild(card);  
    });
} 
function filtrerAuters(value, data){

    let mainDiv = document.getElementById("mainDiv");
    document.getElementById("mainDiv").innerHTML = "";
    data.map(item =>{
    if(item.authors.includes(sortAutersArray[value])){
        let  urlType = (item.thumbnailUrl !== undefined )? item.thumbnailUrl : "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
        const date = new Date(item.publishedDate.dt_txt);
        const formatDate =new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date);
        
        let card = document.createElement('DIV');
        card.classList.add("col-lg-2","col-md-3", "col-sm-12", "card");
        let card_body = document.createElement('DIV');
        card_body.classList.add('card_body');


        card_body.innerHTML = `
        <img class="card-img-top" src=${urlType}>
        <h4  id="title"><strong>${item.title}</strong></h4>
        <p id="isbn"><strong>ISBN:</strong> ${item.isbn}</p>
        <p id="date"><strong>Date de publication: </strong> ${formatDate} </p>
        <p id="pages"><strong>Nombre de pages: </strong>  ${item.pageCount}</p>`;
 
        if( item.shortDescription !== undefined)
        {
           card_body.innerHTML += `<p id="discriotion"><strong>discription: </strong> ${item.shortDescription}</p>`;
        }
        card.appendChild(card_body);
        console.log(card);
        mainDiv.appendChild(card);  
      }
    });
}

 
function  filtrerCategories(value, data){
    let mainDiv = document.getElementById("mainDiv");
    document.getElementById("mainDiv").innerHTML = "";
    data.map(item =>{
        if(item.categories.includes(sortCategoriesList[value])){
        let  urlType = (item.thumbnailUrl !== undefined )? item.thumbnailUrl : "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
        const date = new Date(item.publishedDate.dt_txt);
        const formatDate =new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date);
        
        let card = document.createElement('DIV');
        card.classList.add("col-lg-2","col-md-3", "col-sm-12", "card");
        let card_body = document.createElement('DIV');
        card_body.classList.add('card_body');
    
    
        card_body.innerHTML = `
        <img class="card-img-top" src=${urlType}>
        <h4  id="title"><strong>${item.title}</strong></h4>
        <p id="isbn"><strong>ISBN:</strong> ${item.isbn}</p>
        <p id="date"><strong>Date de publication: </strong> ${formatDate} </p>
        <p id="pages"><strong>Nombre de pages: </strong>  ${item.pageCount}</p>`;
    
        if( item.shortDescription !== undefined)
        {
           card_body.innerHTML += `<p id="discriotion"><strong>discription: </strong> ${item.shortDescription}</p>`;
        }
        card.appendChild(card_body);
        console.log(card);
        mainDiv.appendChild(card);  
      }
    });
}



