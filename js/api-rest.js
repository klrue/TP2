(function(){

    let bouton = document.getElementById('bout_nouvelles')
    let nouvelles = document.querySelector('.nouvelles section')
    let annonce = document.getElementById('annonce')
   //bouton.addEventListener('mousedown', monAjax)
    window.addEventListener('load',function(){
        monAjax(monObjJS.siteURL + '/wp-json/wp/v2/posts?categorie=33&per_page=3', nouvelles)
        monAjax(monObjJS.siteURL + '/wp-json/wp/v2/posts?categorie=35&per_page=1', annonce)
    })


    function monAjax(requete, elmDom)
    {
       let maRequete = new XMLHttpRequest();
       console.log(maRequete)
       maRequete.open('GET', requete);

       maRequete.onload = function () {
           console.log(maRequete)
           if (maRequete.status >= 200 && maRequete.status < 400) {
               let data = JSON.parse(maRequete.responseText);
               let chaineResultat = ''
               for(const elm of data){
                chaineResultat += '<h2>' + elm.title.rendered + '</h2>'
                chaineResultat += elm.content.rendered
               }
               elmDom.innerHTML = chaineResultat;
             
            }
            else {
               console.log('La connexion est faite mais il y a une erreur')
           }
       }
       maRequete.onerror = function () {
           console.log("erreur de connexion");
       }
       maRequete.send()
    }


    /*------------------------------------------------------------------------------------------------------
    Controle du formualaire d'édition d'article de category "Nouvelles"
    -------------------------------------------------------------------------------------------------------*/
    let bout_ajout = document.getElementById('bout-rapide')
    bout_ajout.addEventListener('mousedown',function()
    {
        let monArticle = {
            "title" : document.querySelector('.admin-rapide [name="title"]').value,
            "content" :  document.querySelector('.admin-rapide [name="content"]').value,
            "status" : "publish",
            "categories" :[35]

        }
        //console.log(monArticle);
        let creerArticle = new XMLHttpRequest();
        creerArticle.open("POST", monObjJS.siteURL +'/wp-json/wp/v2/posts');
        creerArticle.setRequestHeader("X-WP-Nonce", monObjJS.nonce);
        creerArticle.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        creerArticle.send(JSON.stringify(monArticle));
        creerArticle.onreadystatechange = function()
        {
            if(creerArticle.readyState==4)
            {
                if(creerArticle.status == 201)
                {
                    document.querySelector('.admin-rapide [name="title"]').value = '';
                    document.querySelector('.admin-rapide [name="content"]').value = '';
                }
                else
                {
                    alert('ERREUR, réessayez à nouveau. - STATUS = ' + creerArticle.status);
                }
            }
        }
    })

}())