function getUrlApi() {
    return document.location.origin + "/api";
}

function showModalAddFR() {

    $('#nom').val("");
    $('#tel').val("");
    $('#fax').val("");
    $('#adresse').val("");
    $('#email').val("");
    $('#mat_fiscale').val("");

    ;
    $('#addFR').modal('show');

}

function addFR() {
    const modal = $('#addFR'),
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
        url: getUrlApi() + "/create/fournisseur",
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listFR();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Fournisseur ajouté avec succés");
        },
    });
}

function listFR() {
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/fournisseurs",
        dataType: 'json',
        success: function(response) {
            $('#listFR table').DataTable().clear();
            for (let i = 0; i < response.length; i++) {

                $('#listFR table').DataTable().row.add($(
                    '<tr><td>' + (response[i]['nom']) + '</td>' +
                    '<td>' + (response[i]['tel']) + '</td>' +
                    '<td>' + (response[i]['fax']) + '</td>' +
                    '<td>' + (response[i]['adresse']) + '</td>' +
                    '<td>' + (response[i]['email']) + '</td>' +
                    '<td>' + (response[i]['mat_fiscale']) + '</td>' +
                    '<td><button class="btn btn-success" onclick="showModalEditFR(' + response[i]['id'] + ')" data-placement="bottom" title="Modifier" type="button"  (' + response[i]['id'] + ')" data-edit-user></button>&nbsp;' +
                    '<span id="action_' + response[i]['id'] + '" data-activate-user>' + (response[i]['estActiver'] ?
                        '<button data-toggle="tooltip" data-placement="bottom" class="btn btn-danger" title="Supprimer" onclick="showModalDeleteFR(' + response[i]['id'] + ')" type="button"></button>' :
                        '<button data-toggle="tooltip" data-placement="bottom" class="btn btn-danger" title="Supprimer"  onclick="showModalDeleteFR(' + response[i]['id'] + ')" type="button"></button>') +
                    '</span>&nbsp;' +
                    +'</tr>'
                ));
            }
            $('#listFR table').css('width', '100%').DataTable().order([0, 'desc']).draw();
        },
    });

}

function editFR(FRId) {

    const modal = $('#editFR'),
        form = modal.find('form');

    let ok = true;
    let LengthForm = modal.find('form').find('select').length + modal.find('form').find('input').length

   

    $.ajax({
        async: false,
        url: getUrlApi() + "/re/fournisseur/" + FRId,
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listFR();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Fournisseur modifié avec succée");
            modal.modal('hide');
        },

    });
}

function showModalEditFR(FRId) {
    const modal = $('#editFR'),
        form = modal.find('form');

    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/fournisseur/" + FRId,
        dataType: 'json',
        success: function(response) {
            modal.find('.modal-footer .btn-primary').attr('onclick', 'editFR(' + FRId + ')');

            $('#nomC').val(response['nom']);
            $('#telC').val(response['tel']);
            $('#faxC').val(response['fax']);
            $('#adresseC').val(response['adresse']);
            $('#emailC').val(response['email']);
            $('#mat_fiscaleC').val(response['mat_fiscale']);
        },

    });



    $('#editFR').modal('show');

}


function showModalDeleteFR(idFR) {
    const modal = $('#deleteFR');

    modal.find('.modal-footer .btn-primary').attr('onclick', 'deleteFR(' + idFR + ')');

    $('#deleteFR').modal('show');

}

function deleteFR(frCL) {
    const modal = $('#deleteFR');

    $.ajax({
        async: false,
        url: getUrlApi() + "/remove/fournisseur/" + frCL,
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function() {
            modal.modal('hide');
            listFR();
            $('#sAlert_u').show().delay(3000).fadeOut('slow').find('span').text("Fournisseur supprimé avec succés");
        },
        error: function(data, ajaxOptions, thrownError) {
            modal.modal('hide');
            $('#sAlert_d').show().delay(5000).fadeOut('slow').find('span').text("Impossible de supprimer ce fournisseur, il est lié à une commande ");
        }
    });
}