let data;
let curpageno=1;
let size;
async function getdata(){
    let result=await fetch("https://newsapi.org/v2/everything?q=tesla&from=2025-02-19&sortBy=publishedAt&apiKey=8ea85bfbe82349b9a73206ce27fde029")
    let content=await result.json();
    data=content.articles;
    size=data.length;
    loadnews(curpageno);
}   
getdata();
function emptyparent(){
    container.innerHTML=``;
}
let container=document.querySelector(".Pagination-container");
function loadnews(pgno){
    curpageno=pgno;
    emptyparent();
    let start=4*(pgno-1);
    for(let i=start;i<(start+4);i++){
        let details = ()=> {
            if(data[i].description&&data[i].description.length>130)
                return data[i].description.slice(0,130)+"..see more";
            else
                return data[i].description;
        };
        let heading = ()=> {
            if(data[i].title.length >50)
                return data[i].title.slice(0,60);
            else
                return data[i].title;
        };
        let urlimg=()=>{
            if( data[i].urlToImage===null)
                return "./news.jpeg";
            else 
                return data[i].urlToImage;
        }
        let div=document.createElement("div");
        div.className="news-card";
        div.innerHTML=`
        <div class="news-img">
                    <img src="${urlimg()}" alt="img${+i}">
                </div>
                <div class="content">
                    <div class="title">${heading()}</div>
                    <div class="description">${details()}</div>
                </div>
        `
        container.appendChild(div);
    }
    loadpageno(pgno);
    curpageno=pgno
}
function handlenext(){
    if(curpageno<(Math.ceil(size/4))){
        curpageno++;
        loadnews(curpageno);
    }
}
function handleprev(){
    if(curpageno>1){
    curpageno--;
    loadnews(curpageno);
}
}
function loadpageno(pgno){
    let pagesBox = document.querySelector(".pages-box");
    pagesBox.innerHTML=``;
    if(pgno-3>1){
        let button=document.createElement("button")
        let p=document.createElement("p");
        p.className="dots"
        button.className="pageno"
        p.innerText="..."
        button.innerHTML=`1`
        pagesBox.appendChild(button)
        pagesBox.appendChild(p);
        button.addEventListener("click",()=>{
            loadpageno(1)
            loadnews(1)
        })
    }
    if(pgno>4){
        for(let j=(pgno-2);j<=(pgno+2)&&j<=Math.ceil(size/4);j++){
            createpageno(j,pgno,pagesBox)
        }
    }
    else{
        for(let j=1;j<=3&&j<=Math.ceil(size/4);j++){
            createpageno(j,pgno,pagesBox)
        }
    }
    if(pgno+3<(Math.ceil(size/4))){
        let button=document.createElement("button")
        let p=document.createElement("p");
        p.className="dots"
        button.className="pageno"
        p.innerText="..."
        button.innerHTML=`${Math.ceil(size/4)}`
        pagesBox.appendChild(p);
        pagesBox.appendChild(button)
        button.addEventListener("click",()=>{
            loadpageno((Math.ceil(size/4)))
            loadnews((Math.ceil(size/4)))
        })
    }

}
function createpageno(j,pgno,pagesBox){
    let button=document.createElement("button");
            button.className="pageno";
            if(j===pgno)
            button.style.background="yellow"
            button.innerHTML=`${j}`;
            pagesBox.appendChild(button);
            button.addEventListener('click',()=>{
                loadnews(j);
            })
}
