
function verifyCpf() {
    let dataForm = { 
        cpf: $('#cpf').val(),
        block: false
    };
    $.ajax({
        url: "http://localhost:3000/cpf",
        type: "POST",
        dataType: 'json',
        data: dataForm
    }).then(result => {
        console.log(result);
    });
}

$(document).ready(function() {
    $(() => {
        $("#cpf").mask("999.999.999-99");
    });
});