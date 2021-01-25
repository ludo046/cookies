const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const input = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt');
let dejaFait = false;
const today = new Date();
const nextWeek = new Date(today.getTime() + 7*24*60*60*1000)
//console.log(nextWeek);
let day = ('0' + nextWeek).slice(9,11);
let month = ('0' + (today.getMonth()+2)).slice(-2);
let year = today.getUTCFullYear()
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

btns.forEach(btn =>{
    btn.addEventListener('click', btnAction);
})

function btnAction(e){
    let nvObj = {};
    input.forEach(input =>{
        let attrName = input.getAttribute('name');
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;
    })
    let description = e.target.getAttribute('data-cookie');
    
    if (description === 'creer'){
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    } else if (description === "toutAfficher"){
        listecookie();
    }
}

function creerCookie(name, value, exp){
    infoTxt.innerText = ''
    affichage.childNodes.forEach(child =>{
        child.remove();
    })
    //si cookie meme nom 
    let cookies = document.cookie.split(';');
    cookies.forEach(cookie =>{
        cookie = cookie.trim();
        //console.log(cookie);
        let formatCookie = cookie.split('=');
        //console.log(formatCookie);
        if (formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true
        }
    })
    if(dejaFait){
        infoTxt.innerText = "tu as deja créé un cookie avec ce nom !"
        dejaFait = false;
        return
    }
    //si cookie pas de nom
    if(name.length === 0){
        infoTxt.innerText = `Ajoute un nom à ton cookie !`
        return;
    }
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expire=${exp.toUTCString()}`;
    let info = document.createElement('li');
    info.innerText = `cookie ${name} créé.`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 2000)
}

function listecookie(){
    let cookies = document.cookie.split(';');
    if (cookies.join() === ""){
        infoTxt.innerText = "tu n'as pas encore créé de cookies !"
        return
    }
    cookies.forEach(cookie =>{
        cookie = cookie.trim();
        let formatCookie =  cookie.split('=');
        let item = document.createElement('li');
        infoTxt.innerText = "Appuie sur un cookie pour l'effacer !"
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])},Valeur : ${decodeURIComponent(formatCookie[1])}`;
        affichage.appendChild(item);

        //suppression
        item.addEventListener('click',() =>{
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`
            item.innerText = `Tu as supprimé le cookie ${formatCookie[0]}`
            setTimeout(() =>{
                item.remove();
            },1000);
        })
    })
}