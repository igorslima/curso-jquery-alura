var campo = $(".campo-digitacao");
var tempoInicial = $(".tempo-digitacao").text();
$(
    function(){
        atualizaTamanhoFrase();
        inicializaContadores();
        inicializaCronometro();
        inicializaMarcadores();
        $("#botao-reiniciar").click(reiniciaJogo);
        atualizaPlacar();
        $('#usuarios').selectize({
            create: true,
            sortField: 'text'
        });
        $(".tooltip").tooltipster({
            trigger: "custom"
        });
    }
);
function atualizaTempoInicial(novoTempo){
    $("#tempo-digitacao").text(novoTempo);
    tempoInicial = novoTempo;
   
}
function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    campo.on("input", function(){
       var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1 ;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
    
}
var frase = $(".frase").text();

function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }
        else{
            campo.addClass("borda-vermelha");
            campo.remove("borda-verde");
        }
    });
}


function inicializaCronometro(){
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function(){
            tempoRestante -= 1;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.addClass("campo-desativado");
    inserePlacar();

}
function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    
    var numPalavras = $("#contador-palavras").text();
    
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);  
}

function novaLinha(usuario, numPalavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("material-icons").text("delete");
    
    link.append(icone);
    
    colunaRemover.append(link);
    
    
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    
    return linha;
}
function removeLinha(){
        event.preventDefault();
        $(this).parent().parent().remove();
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text(0);
    $("#contador-palavras").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
