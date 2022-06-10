//dati ottenuti dal server, dopo il parse
var data

function show() {
  var item = sessionStorage.getItem('comp')
  leagueRequest(item)
}

//richiesta per ottenere i dati delle giornate di una competizione data
function leagueRequest(leagueCod) {
  sessionStorage.setItem('comp', leagueCod)
  var xHttp = new XMLHttpRequest()
  xHttp.onreadystatechange = function() { handleLeagueRequest(this) }
  xHttp.open('GET', 'https://api.football-data.org/v2/competitions/' + sessionStorage.getItem('comp') + '/matches', true)
  xHttp.setRequestHeader("X-Auth-Token", "c7935e5ccb844b968cdfd9448ad13075")
  xHttp.send()
}

//gestisce la risposta dal server
function handleLeagueRequest(response) {
  if(response.readyState == 4 && response.status == 200) {
    data = JSON.parse(response.responseText)
    printCompetitionName()  //stampo il nome della competizione
    printMatches()  //stampa le giornate
  }
}

//stampa il nome della competizione come titolo
function printCompetitionName() {
  //svuota il contenuto della sezione matches
  document.getElementById('matches').innerHTML = ''
  //crea un elemento h2
  var titleElem = document.createElement('h2')
  //ci scrive dentro il nome della competizione
  var titleTxt = document.createTextNode(data.competition.name)
  titleElem.appendChild(titleTxt)
  //inserisce il titolo all'interno del tag section
  document.getElementById('matches').appendChild(titleElem)
}

//stampa l'elenco delle partite divise per giornata
function printMatches() {
  var matchday = 0  //numero della giornata
  var hrBool = false  //flag per decidere se inserire la linea di separazione
  for(var i = 0; i < data.matches.length; i++) {
    /*se la giornata attuale è diversa dalla giornata salvata allora inserisce
    il nuovo titolo, disegan la linea di separazione e aggiorna il dato salvato*/
    if(data.matches[i].matchday != matchday) {
      //hrBool è false solo al primo giro
      if(hrBool) {
        var hr = document.createElement('hr')
        document.getElementById('matches').appendChild(hr)
      }
      matchday++
      //aggiunge il nuovo titolo
      var matchdayElem = document.createElement('h3')
      var matchdayTxt = document.createTextNode('Giornata ' + matchday)
      matchdayElem.appendChild(matchdayTxt)
      document.getElementById('matches').appendChild(matchdayElem)
      hrBool = true
    }
    //crea l'elemento che conterrà l'incontro
    var matchElem = document.createElement('p')
    //se è terminato aggiunge anche il risultato
    if(data.matches[i].status == 'FINISHED') {
      var matchTxt = document.createTextNode(data.matches[i].homeTeam.name + ' - ' + data.matches[i].awayTeam.name +
        ' ' + data.matches[i].score.fullTime.homeTeam + ' - ' + data.matches[i].score.fullTime.awayTeam)
    } else {
      var matchTxt = document.createTextNode(data.matches[i].homeTeam.name + ' - ' + data.matches[i].awayTeam.name)
    }
    matchElem.appendChild(matchTxt)
    //aggiunta alla section matches
    document.getElementById('matches').appendChild(matchElem)
  }
}
