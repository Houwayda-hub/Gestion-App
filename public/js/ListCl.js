function getUrlApi() {
    return document.location.origin + "/api";
}

function showModalAddCL() {

    $('#nom').val("");
    $('#tel').val("");
    $('#fax').val("");
    $('#adresse').val("");
    $('#email').val("");
    $('#mat_fiscale').val("");

    ;
    $('#addCL').modal('show');

}

function addCL() {
    const modal = $('#addCL'),
        form = modal.find('form');
    let ok = true;
    let LengthForm = modal.find('form').find('select').length + modal.find('form').find('input').length

    for (let index = 0; index < LengthForm; index++) {
        const element = modal.find('form')[index];
        if (element && !element.checkValidity()) {
            setTimeout(function() {
                element.reportValidity();
            }, 1);
            return ok = false;
        }
    }
    if (!ok)
        return;
    $.ajax({
        async: false,
        url: getUrlApi() + "/create/client",
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listCL();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Client ajouté avec succés");
        },
    });
}

function listCL() {
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/clients",
        dataType: 'json',
        success: function(response) {
            $('#listCL table').DataTable().clear();
            for (let i = 0; i < response.length; i++) {

                $('#listCL table').DataTable().row.add($(
                    '<tr><td>' + (response[i]['nom']) + '</td>' +
                    '<td>' + (response[i]['tel']) + '</td>' +
                    '<td>' + (response[i]['fax']) + '</td>' +
                    '<td>' + (response[i]['adresse']) + '</td>' +
                    '<td>' + (response[i]['email']) + '</td>' +
                    '<td>' + (response[i]['mat_fiscale']) + '</td>' +
                    '<td><button class="btn btn-success" onclick="showModalEditCL(' + response[i]['id'] + ')" data-placement="bottom" title="Modifier" type="button"  (' + response[i]['id'] + ')" data-edit-user></button>&nbsp;' +
                    '<span id="action_' + response[i]['id'] + '" data-activate-user>' + (response[i]['estActiver'] ?
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer" onclick="showModalDeleteCL(' + response[i]['id'] + ')" type="button"></button>' :
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer"  onclick="showModalDeleteCL(' + response[i]['id'] + ')" type="button"></button>') +
                    '</span>&nbsp;' +
                    +'</tr>'
                ));
            }
            $('#listCL table').css('width', '100%').DataTable().order([0, 'desc']).draw();
        },
    });

}

function editCL(CLId) {

    const modal = $('#editCL'),
        form = modal.find('form');

    $.ajax({
        async: false,
        url: getUrlApi() + "/re/client/" + CLId,
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listCL();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Client modofié avec succés");
        },
    });
}

function showModalEditCL(CLId) {
    const modal = $('#editCL'),
        form = modal.find('form');

    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/client/" + CLId,
        dataType: 'json',
        success: function(response) {
            modal.find('.modal-footer .btn-primary').attr('onclick', 'editCL(' + CLId + ')');

            $('#nomC').val(response['nom']);
            $('#telC').val(response['tel']);
            $('#faxC').val(response['fax']);
            $('#adresseC').val(response['adresse']);
            $('#emailC').val(response['email']);
            $('#mat_fiscaleC').val(response['mat_fiscale']);
        },

    });



    $('#editCL').modal('show');

}


function showModalDeleteCL(idCL) {
    const modal = $('#deleteCL');

    modal.find('.modal-footer .btn-primary').attr('onclick', 'deleteCL(' + idCL + ')');

    $('#deleteCL').modal('show');

}

function deleteCL(idCL) {
    const modal = $('#deleteCL');

    $.ajax({
        async: false,
        url: getUrlApi() + "/remove/client/" + idCL,
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function() {
            modal.modal('hide');
            listCL();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Client supprimé avec succés");
        },
        error: function(data, ajaxOptions, thrownError) {
            modal.modal('hide');
            $('#sAlert_d').show().delay(5000).fadeOut('slow').find('span').text("Impossible de supprimer ce client , il est lié à une livraison ");
        }
    });
}