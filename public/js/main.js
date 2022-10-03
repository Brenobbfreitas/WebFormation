var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaMarcadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

var campo = $(".campo-digitacao");

function inicializaContadores() {
    campo.on("input",function(){
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.addClass("campo-desativado");
            }
        }, 1000);
    });
}

///botao de reiniciar
$("#botao-reiniciar").click(reiniciaJogo);
function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
}


///comparando frase digitada
function inicializaMarcadores(){
var frase = $(".frase").text();
campo.on("input",function(){
    var digitado = campo.val();

var comparavel = frase.substr(0, digitado.length)

// if (comparavel == digitado) {
//     campo.addClass("borda-verde");
//     campo.removeClass("borda-vermelha");

// }else{
//     campo.addClass("borda-vermelha");
//     campo.removeClass("borda-verde");
// }
var ehCorreto = (digitado == comparavel);

campo.toggleClass("borda-verde", ehCorreto);
campo.toggleClass("borda-vermelha", !ehCorreto);
})};


function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Seu-nome";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;
    var novaLinha = novaLinha();

    var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                    "<td>"+ botaoRemover + "</td>"+
                "</tr>";

                corpoTabela.append(linha);

}



function novaLinha(){
    var linha = $("<tr>"); //insere uma nola linha tr
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");


    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

        // Os dois <td> dentro do <tr>
        linha.append(colunaUsuario);
        linha.append(colunaPalavras);
    
        return linha;
}

//essa funcao vai remover a funcionalidade padrão da tag com a classa chamada

$(".botao-remover").click(function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
});


function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}