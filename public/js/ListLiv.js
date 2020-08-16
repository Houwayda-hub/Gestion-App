function getUrlApi() {
    return document.location.origin + "/api";
}

function showModalAddLIV() {

    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/clients",
        dataType: 'json',
        success: function(response) {
            for (let i = 0; i < response.length; i++) {
                let html = '<option value="">-- Veuillez séléctionner un client --</option>';
                for (let i = 0; i < response.length; i++) {
                    html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                }

                $('#client_bloc').html(html);
                $('#client_bloc').val("").trigger('change');;
            }
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/produits",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner un produit --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#produit_bloc').html(html);
                        $('#produit_bloc').val("").trigger('change');;
                    }
                    $('#numero').val("");
                    $('#total_q').val("");
                    $('#total_p').val("");
                    if (response['mode'] == true) {
                        $('#mode_paie').val(response['mode_paie'] = "Validée");
                    } else {
                        $('#mode_paie').val(response['mode_paie'] = "Annulée");
                    }
                    $('#date').val("");
                    $('#fclient_bloc').val(response['client_id']);
                    $('#produit_bloc').val(response['produit_id']);

                    if (response['etat'] == true) {
                        $('#etat').val(response['etat'] = "Validée");
                    } else {
                        $('#etat').val(response['etat'] = "Annulée");
                    }
                },
            });
        },
    });
    $('#addLIV').modal('show');

}

function addLIV() {
    const modal = $('#addLIV'),
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
        url: getUrlApi() + "/create/livraison",
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listLIV();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Livraison ajoutée avec succés");
        },
    });
}

function listLIV() {
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/livraisons",
        dataType: 'json',
        success: function(response) {
            $('#listLIV table').DataTable().clear();
            for (let i = 0; i < response.length; i++) {
                var etat = "";
                if (response[i]['etat'] == true) {
                    etat = "Validée";
                } else {
                    etat = "Annulée";
                }
                var mode = "";
                if (response[i]['mode_paie'] == true) {
                    mode = "Espéce";
                } else {
                    mode = "Chéque";
                }
                $('#listLIV table').DataTable().row.add($(
                    '<tr><td>' + (response[i]['numero']) + '</td>' +
                    '<td>' + (response[i]['total_q']) + '</td>' +
                    '<td>' + (response[i]['total_p']) + '</td>' +
                    '<td>' + mode + '</td>' +
                    '<td>' + (response[i]['date_liv']) + '</td>' +
                    '<td>' + (response[i]['client']['nom']) + '</td>' +
                    '<td>' + (response[i]['produit']['nom']) + '</td>' +
                    '<td>' + etat + '</td>' +

                    '<td><button class="btn btn-success" onclick="showModalEditLIV(' + response[i]['id'] + ')" data-placement="bottom" title="Modifier" type="button"  (' + response[i]['id'] + ')" data-edit-user></button>&nbsp;' +
                    '<span id="action_' + response[i]['id'] + '" data-activate-user>' + (response[i]['estActiver'] ?
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer" onclick="showModalDeleteLIV(' + response[i]['id'] + ')" type="button"></button>' :
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer"  onclick="showModalDeleteLIV(' + response[i]['id'] + ')" type="button"></button>') +
                    '</span>&nbsp;' +
                    +'</<td>'
                ));
            }
            $('#listLIV table').css('width', '100%').DataTable().order([0, 'desc']).draw();
        },
    });

}

function editLIV(LIVId) {

    const modal = $('#editLIV'),
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
        url: getUrlApi() + "/re/livraison/" + LIVId,
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listLIV();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Livraison modifiée avec succée");
            modal.modal('hide');
        },

    });
}

function showModalEditLIV(livId) {
    const modal = $('#editLIV'),
        form = modal.find('form');
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/livraison/" + livId,
        dataType: 'json',
        success: function(response) {
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/clients",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner un client --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#client1').html(html);
                        $('#client1').val("").trigger('change');;
                    }
                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editLIV(' + livId + ')');

                },
            });
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/produits",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner un produit --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#produit1').html(html);
                        $('#produit1').val("").trigger('change');;
                    }
                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editLIV(' + livId + ')');
                },
            });

            $('#numeroC').val(response['numero']);
            $('#total_qC').val(response['total_q']);
            $('#total_pC').val(response['total_p']);
            if (response['mode_paie'] == true) {
                $('#mode_paieC').val(response['mode_paie'] = 1);
            } else {
                $('#mode_paieC').val(response['mode_paie'] = 0);
            }
            $('#dateC').val(response['date_liv']);
            $('#client1').val(response['client']['id']);
            $('#produit1').val(response['produit']['id']);

            if (response['etat'] == true) {
                $('#etatC').val(response['etat'] = 1);
            } else {
                $('#etatC').val(response['etat'] = 0);
            }
        },
    });


    $('#editLIV').modal('show');

}


function showModalDeleteLIV(idLIV) {
    const modal = $('#deleteLIV');

    modal.find('.modal-footer .btn-primary').attr('onclick', 'deleteLIV(' + idLIV + ')');

    $('#deleteLIV').modal('show');

}

function deleteLIV(idLIV) {
    const modal = $('#deleteLIV');

    $.ajax({
        async: false,
        url: getUrlApi() + "/remove/livraison/" + idLIV,
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function() {
            modal.modal('hide');

            listLIV();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Livraison supprimée avec succés");
        }
    });
}