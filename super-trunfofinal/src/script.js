var cartaNayra = {
    nome: "Twitch",
  imagem: "http://pm1.narvii.com/7020/26eb62323c7efea1ec9a39ab18d42f5a779dda19r1-380-380v2_00.jpg",
  atributos: {
    ataque:80,
    defesa:70,
    magia:60
    }
}

var cartaFelipe = {
    nome: "LeBlanc",
  imagem: "https://i.pinimg.com/originals/3a/a4/50/3aa4509a6b8315341c9edf45631d8526.png",
  atributos: {
    ataque:60,
    defesa:75,
    magia:90,
    }
}

var cartaGabi = {
    nome:"Annie",
  imagem: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Annie_9.jpg",
  atributos: {
    ataque: 65,
    defesa:70,
    magia:85
    }
}

var cartaNaruto = {
    nome: "Naruto",
    imagem: "https://conteudo.imguol.com.br/c/entretenimento/16/2017/06/27/naruto-1498593686428_v2_450x337.png",
    atributos: {
        ataque: 80,
        defesa: 60,
        magia: 100
    }
}

var cartaHarry = {
    nome: "Harry Potter",
    imagem: "https://sm.ign.com/ign_br/screenshot/default/89ff10dd-aa41-4d17-ae8f-835281ebd3fd_49hp.jpg",
    atributos: {
        ataque: 70,
        defesa: 50,
        magia: 95
    }
}

var cartaBatman = {
    nome: "Batman",
    imagem: "https://assets.b9.com.br/wp-content/uploads/2020/09/Batman-issue86-heder-1280x677.jpg",
    atributos: {
        ataque: 95,
        defesa: 70,
        magia: 30
    }
}

var cartaMarvel = {
    nome: "Capitã Marvel",
    imagem: "https://cinepop.com.br/wp-content/uploads/2018/09/capitamarvel21.jpg",
    atributos: {
        ataque: 90,
        defesa: 80,
        magia: 60
    }
}

var cartaItachi = {
  nome: "Itachi",
  imagem: "https://ovicio.com.br/wp-content/uploads/2020/10/20201007-naruto-itachi-uchiha-anime-tribute-1239755-1280x0-1-1200x675.jpeg",
  atributos: {
    ataque: 89,
    defesa: 95, 
    magia: 75
  }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaNayra, cartaFelipe, cartaGabi, cartaNaruto, cartaHarry, cartaBatman, cartaMarvel, cartaItachi]
//            0           1           2          3         4            5            6           7       8

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar ()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas(){
  var divQuantidadeCartas = document.getElementById('quantidade-cartas')
  var html = "Quantidade de Cartas no Jogo: " + cartas.length
  
  divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
  var divPlacar = document.getElementById('placar')
  var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Maquina"
    
  divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  
   divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

   if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu a carta da máquina!</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu, carta da máquina é mais poderosa</p>'
         pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }

    if(cartas.length == 0){
      alert("Fim de jogo")
      if(pontosJogador > pontosMaquina){
        htmlResultado = '<p class="resultado-final">Você Venceu!</p>' 
      } else if (pontosMaquina > pontosJogador) {
        htmlResultado = '<p class"resultado-final">Você Perdeu</p>'
      } else {
         htmlResultado = '<p class"resultado-final">Empatou</p>'
      }
    } else {
      document.getElementById("btnProximaRodada").disabled = false 
    }
    
    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true

    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  
  divCartas.innerHTML = '<div id="carta-jogador" class= "carta"></div> <div id="carta-maquina" class "carta"></div>'
  
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  
  divResultado.innerHTML = " "
}