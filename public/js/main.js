// Short range $ para o Jquery
var frase = $(".frase").text(); 
var numPalavras = frase.split(" ").length;
// .text pegar o conteudo da tag
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);


var campo = $(".campoDigitacao");
campo.on("input",function(){
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contadorPalvaras").text(qtdPalavras);
    

    var qtdCaracteres  = conteudo.length;
    $("#contadorCaracteres").text(qtdCaracteres);
});

///Contador de palavras/caracteres



///Contador De tempo
var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function() {
var cronometroId = setInterval(function(){
    tempoRestante--;
    $("#tempo-digitacao").text(tempoRestante); /// esvendo texto 
    if(tempoRestante < 1){
        campo.attr("disabled",true)
        clearInterval(cronometroId);
    }
},1000);
});