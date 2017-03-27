$("#botao-troca-frase").click(fraseAleatoria);
$("#botao-troca-frase-id").click(buscaFrase)
$("#botao-sync").click(sincronizaPlacar)
function fraseAleatoria(){
    $("#spinner").toggle();
    
    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function(){
        $("#erro").show();            
        setTimeout(function(){
            $("#erro").hide();
        }, 3000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
};

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseID = $("#frase-id").val();
    console.log("Frase ID " + fraseID)
    var dados = { id: fraseID}
    $.get("http://localhost:3000/frases",dados, trocaFrase)
    .fail(function(){
        $("#erro").show();            
        setTimeout(function(){
            $("#erro").hide();
        }, 3000);
    })
    .always(function(){
        $("#spinner").toggle();
    });;
}

function trocaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}



function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);

        });
    });
}