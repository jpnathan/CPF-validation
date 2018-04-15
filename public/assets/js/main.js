let dataForm;

function verifyCpf() {
    dataForm = { 
        cpf: $('#cpf').val()
    };
    $.ajax({
        url: "http://localhost:3000/cpf",
        type: "POST",
        dataType: 'json',
        data: dataForm
    }).then(result => {
        $('#cpf').val("")
        $('#status_card').removeClass('hidden');
        $('.cpf_result').text(dataForm.cpf);

        if (result[0].block == true) {
            $('.cpf_status').text('BLOCK');
            $('.btn-danger').addClass('hidden')            
        } else {
            $('.cpf_status').text('FREE');
            $('.btn-success').addClass('hidden')
        }
        console.log(result);
    });
};

function blockCpf() {
    $.ajax({
        url: "http://localhost:3000/block",
        type: "POST",
        dataType: 'json',
        data: dataForm
    }).then(result => {
        console.log(result);        
    });
};

function freeCpf() {
    $.ajax({
        url: "http://localhost:3000/free",
        type: "POST",
        dataType: 'json',
        data: dataForm
    }).then(result => {
        console.log('result free', result);
    });
};

$(document).ready(function() {
    $(() => {
        $("#cpf").mask("999.999.999-99");
    });
    $('#status_card').addClass('hidden');
});