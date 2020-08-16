function getUrlApi() {
    return document.location.origin + "/api";
}

function showModalAddMP() {

    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/fournisseurs",
        dataType: 'json',
        success: function(response) {
            for (let i = 0; i < response.length; i++) {
                let html = '<option value="">-- Veuillez séléctionner un fournisseur --</option>';
                for (let i = 0; i < response.length; i++) {
                    html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                }

                $('#fournisseurs_bloc').html(html);
                $('#fournisseurs_bloc').val("").trigger('change');;
            }

            $('#fournisseurs_bloc').val(response['fournisseur']);
            $('#nom').val("");
            $('#ref').val("");
            $('#unite').val("");
            $('#quantite').val("");

            $('#prix').val("");
            if (response['etat'] == true) {
                $('#etat').val(response['etat'] = "Validée");
            } else {
                $('#etat').val(response['etat'] = "Annulée");
            }
        },
    });
    $('#addMP').modal('show');

}

function addMP() {
    console.log('test');
    const modal = $('#addMP'),
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
        url: getUrlApi() + "/create/MP",
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listMP();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("MP ajoutée avec succés");
        },
    });
}

function listMP() {
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/matieres",
        dataType: 'json',
        success: function(response) {
            $('#listMP table').DataTable().clear();
            for (let i = 0; i < response.length; i++) {
                var etat = "";
                if (response[i]['etat'] == true) {
                    etat = "En stock";
                } else {
                    etat = "En rupture";
                }
                $('#listMP table').DataTable().row.add($(
                    '<tr><td>' + (response[i]['nom']) + '</td>' +
                    '<td>' + (response[i]['ref']) + '</td>' +
                    '<td>' + (response[i]['unite']) + '</td>' +
                    '<td>' + (response[i]['quantite']) + '</td>' +
                    '<td>' + (response[i]['prix']) + '</td>' +
                    '<td>' + (response[i]['fournisseur']['nom']) + '</td>' +
                    '<td>' + etat + '</td>' +

                    '<td><button onclick="showModalEditMP(' + response[i]['id'] + ')" data-placement="bottom" class="btn btn-success" title="Modifier" type="button"  (' + response[i]['id'] + ')" data-edit-user></button>&nbsp;' +
                    '<span id="action_' + response[i]['id'] + '" data-activate-user>' + (response[i]['estActiver'] ?
                        '<button data-toggle="tooltip" data-placement="bottom" class="btn btn-danger" title="Supprimer" onclick="showModalDeleteMP(' + response[i]['id'] + ')" type="button"></button>' :
                        '<button data-toggle="tooltip" data-placement="bottom" title="Supprimer" class="btn btn-danger"  onclick="showModalDeleteMP(' + response[i]['id'] + ')" type="button"></button>') +
                    '</span>&nbsp;' +
                    +'</tr>'
                ));
            }
            $('#listMP table').css('width', '100%').DataTable().order([0, 'desc']).draw();
        },
    });

}

function editMP(mpId) {

    const modal = $('#editMP'),
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
        url: getUrlApi() + "/re/MP/" + mpId,
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listMP();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("MP modifiée avec succés");
        },
    });
}

function showModalEditMP(MPId) {
    const modal = $('#editMP'),
        form = modal.find('form');

    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/matiere/" + MPId,
        dataType: 'json',
        success: function(response) {
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/fournisseurs",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner un fournisseur --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#fournisseurs_bloc_2').html(html);
                        $('#fournisseurs_bloc_2').val("").trigger('change');;
                    }

                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editMP(' + MPId + ')');
                },

            });
            $('#nomM').val(response['nom']);
            $('#refM').val(response['ref']);
            $('#uniteM').val(response['unite']);
            $('#quantiteM').val(response['quantite']);

            $('#prixM').val(response['prix']);
            $('#fournisseurs_bloc_2').val(response['fournisseur']['id']);

            if (response['etat'] == true) {
                $('#etatM').val(response['etat'] = 1);
            } else {
                $('#etatM').val(response['etat'] = 0);
            }
        },


    });
    $('#editMP').modal('show');

}


function showModalDeleteMP(idMP) {
    const modal = $('#deleteMP');

    modal.find('.modal-footer .btn-primary').attr('onclick', 'deleteMP(' + idMP + ')');

    $('#deleteMP').modal('show');

}

function deleteMP(idmp) {
    const modal = $('#deleteMP');

    $.ajax({
        async: false,
        url: getUrlApi() + "/remove/MP/" + idmp,
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function() {
            modal.modal('hide');
            listMP();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Article supprimé avec succés");
        },
        error: function(data, ajaxOptions, thrownError) {
            modal.modal('hide');
            $('#sAlert_d').show().delay(5000).fadeOut('slow').find('span').text("Impossible de supprimer cette matiére , il est lié à un fournisseur ");
        }
    });
}