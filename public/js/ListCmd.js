function getUrlApi() {
    return document.location.origin + "/api";
}

function showModalAddCMD() {

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
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/matieres",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner une matiere --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#matieres_bloc').html(html);
                        $('#matieres_bloc').val("").trigger('change');;
                    }
                    $('#numero').val("");
                    $('#total_q').val("");
                    $('#total_p').val("");
                    if (response['mode'] == true) {
                        $('#mode_paie').val(response['mode_paie'] = "Validée");
                    } else {
                        $('#mode_paie').val(response['mode_paie'] = "Annulée");
                    }
                    $('#date_prevue_recp').val("");
                    $('#fournisseurs_bloc').val(response['fournisseur']);
                    $('#matieres_bloc').val(response['matiere_pre']);

                    if (response['etat'] == true) {
                        $('#etat').val(response['etat'] = "Validée");
                    } else {
                        $('#etat').val(response['etat'] = "Annulée");
                    }
                },
            });
        },
    });
    $('#addCMD').modal('show');

}

function addCMD() {
    console.log('test');
    const modal = $('#addCMD'),
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
        url: getUrlApi() + "/create/commande",
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listCMD();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Commande ajoutée avec succés");
        },
    });
}

function listCMD() {
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/commandes",
        dataType: 'json',
        success: function(response) {
            $('#listCMD table').DataTable().clear();
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
                $('#listCMD table').DataTable().row.add($(
                    '<tr><td>' + (response[i]['numero']) + '</td>' +
                    '<td>' + (response[i]['total_q']) + '</td>' +
                    '<td>' + (response[i]['total_p']) + '</td>' +
                    '<td>' + mode + '</td>' +
                    '<td>' + (response[i]['date_prevue_recp']) + '</td>' +
                    '<td>' + (response[i]['fournisseur']['nom']) + '</td>' +
                    '<td>' + (response[i]['matiere_pre']['nom']) + '</td>' +
                    '<td>' + etat + '</td>' +

                    '<td><button  class="btn btn-success" onclick="showModalEditCMD(' + response[i]['id'] + ')" data-placement="bottom" title="Modifier" type="button"  (' + response[i]['id'] + ')" data-edit-user></button>&nbsp;' +
                    '<span id="action_' + response[i]['id'] + '" data-activate-user>' + (response[i]['estActiver'] ?
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer" onclick="showModalDeleteCMD(' + response[i]['id'] + ')" type="button"></button>' :
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer"  onclick="showModalDeleteCMD(' + response[i]['id'] + ')" type="button"></button>') +
                    '</span>&nbsp;' +
                    +'</<td>'
                ));
            }
            $('#listCMD table').css('width', '100%').DataTable().order([0, 'desc']).draw();
        },
    });

}

function editCMD(cmdId) {

    const modal = $('#editCMD'),
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
        url: getUrlApi() + "/re/commande/" + cmdId,
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listCMD();
            modal.modal('hide');

            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Commande modifiée avec succés");
        },

    });
}

function showModalEditCMD(CMDId) {
    const modal = $('#editCMD'),
        form = modal.find('form');
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/commande/" + CMDId,
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

                        $('#fournisseurs1').html(html);
                        $('#fournisseurs1').val("").trigger('change');;
                    }
                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editCMD(' + CMDId + ')');

                },
            });
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/matieres",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner une matiere --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#matieres1').html(html);
                        $('#matieres1').val("").trigger('change');;
                    }
                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editCMD(' + CMDId + ')');
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
            $('#dateC').val(response['date_prevue_recp']);
            $('#fournisseurs1').val(response['fournisseur']['id']);
            $('#matieres1').val(response['matiere_pre']['id']);

            if (response['etat'] == true) {
                $('#etatC').val(response['etat'] = 1);
            } else {
                $('#etatC').val(response['etat'] = 0);
            }
        },
    });


    $('#editCMD').modal('show');

}

function showModalDeleteCMD(idCD) {
    const modal = $('#deleteCMD');

    modal.find('.modal-footer .btn-primary').attr('onclick', 'deleteCMD(' + idCD + ')');

    $('#deleteCMD').modal('show');

}


function deleteCMD(idCMD) {
    const modal = $('#deleteCMD');

    $.ajax({
        async: false,
        url: getUrlApi() + "/remove/commande/" + idCMD,
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function() {
            modal.modal('hide');
            listCMD();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Commande supprimée avec succés");
        }
    });
}