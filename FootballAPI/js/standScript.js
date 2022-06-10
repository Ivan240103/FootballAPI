//dati ottenuti dal server, dopo il parse
var data

//richiede i dati della classifica della competizione attuale
function standingRequest() {
  var xHttp = new XMLHttpRequest()
  xHttp.onreadystatechange = function() { handleStandingRequest(this) }
  xHttp.open('GET', 'https://api.football-data.org/v2/competitions/' + sessionStorage.getItem('comp') + '/standings', true)
  xHttp.setRequestHeader("X-Auth-Token", "c7935e5ccb844b968cdfd9448ad13075")
  xHttp.send()
}

//gestisce la risposta con le classifiche
function handleStandingRequest(response) {
  if(response.readyState == 4 && response.status == 200) {
    data = JSON.parse(response.responseText)
    printStanding() //stampa la classifica
  }
}

function printStanding() {
  //array delle posizioni
  var stand = data.standings[0].table
  //inserisce il titolo
  document.getElementById('compTitle').innerHTML = data.competition.name
  //svuota il corpo della tabella
  document.getElementById('tbody').innerHTML = ''
  for (var i = 0; i < stand.length; i++) {
    //creazione nuova riga
    var row = document.createElement('tr')
    //creazione dei campi
    var pos = document.createElement('td')
    pos.appendChild(document.createTextNode(stand[i].position))
    row.appendChild(pos)
    var team = document.createElement('td')
    team.setAttribute("class", "sq")
    team.appendChild(document.createTextNode(stand[i].team.name))
    row.appendChild(team)
    var g = document.createElement('td')
    g.appendChild(document.createTextNode(stand[i].playedGames))
    row.appendChild(g)
    var v = document.createElement('td')
    v.appendChild(document.createTextNode(stand[i].won))
    row.appendChild(v)
    var n = document.createElement('td')
    n.appendChild(document.createTextNode(stand[i].draw))
    row.appendChild(n)
    var p = document.createElement('td')
    p.appendChild(document.createTextNode(stand[i].lost))
    row.appendChild(p)
    var gf = document.createElement('td')
    gf.appendChild(document.createTextNode(stand[i].goalsFor))
    row.appendChild(gf)
    var gs = document.createElement('td')
    gs.appendChild(document.createTextNode(stand[i].goalsAgainst))
    row.appendChild(gs)
    var dr = document.createElement('td')
    dr.appendChild(document.createTextNode(stand[i].goalDifference))
    row.appendChild(dr)
    var point = document.createElement('td')
    point.appendChild(document.createTextNode(stand[i].points))
    row.appendChild(point)
    document.getElementById('tbody').appendChild(row)
  }
}
