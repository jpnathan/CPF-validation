let dataForm;

$(document).ready(function () {
    $(() => {
        $("#cpf").mask("999.999.999-99");
    });
    $('#status_card').addClass('hidden');

    if (location.pathname === '/') {
        getStatus();
    }
});

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
        if (typeof result === 'string') {
            $('#status_card').addClass('hidden');
            $('.alert-danger').text(result);
            $('.alert-danger').removeClass('hidden');
        }
        else {
            $('.alert-danger').addClass('hidden');
            $('#status_card').removeClass('hidden');
            $('#cpf').val("")
            $('.cpf_result').text(dataForm.cpf);
            
            if (result[0].block == true) {
                $('.cpf_status').text('BLOCK');
                $('.btn-danger').addClass('hidden');           
            } else {
                $('.cpf_status').text('FREE');
                $('.btn-success').addClass('hidden');
            }
        }
    });
};

function blockCpf() {
    $.ajax({
        url: "http://localhost:3000/block",
        type: "POST",
        dataType: 'json',
        data: dataForm
    }).then(result => {
        if (typeof result === 'string') {
            $('.alert-danger').text(result)
            $('.alert-danger').removeClass('hidden')
        }
        else {
            $('.cpf_status').text('BLOCK');
            $('.cpf_status').css({color: 'red'});
            $('.btn-success').removeClass('hidden');
            $('.btn-danger').addClass('hidden');
        };
    });
};

function freeCpf() {
    $.ajax({
        url: "http://localhost:3000/free",
        type: "POST",
        dataType: 'json',
        data: dataForm
    }).then(result => {
        if (typeof result === 'string') {
            $('.alert-danger').text(result)
            $('.alert-danger').removeClass('hidden')
        }
        else {
            $('.cpf_status').text('FREE');
            $('.cpf_status').css({color: 'green'});
            $('.btn-success').addClass('hidden');
            $('.btn-danger').removeClass('hidden');
        };
    });
};

function getStatus() {
    $.ajax({
        url: "http://localhost:3000/status",
        type: "GET",
        dataType: 'json',
    }).then(result => {
        $('.time').text(convertMilliToMin(result.uptime))
        $('.consults').text(result.consults)
        $('.blacklist').text(result.blacklist)
    });
}

function convertMilliToMin(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};