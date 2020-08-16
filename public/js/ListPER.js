function getUrlApi() {
    return document.location.origin + "/api";
}

function listPER() {
    console.log('test');
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/personnels",
        dataType: 'json',
        success: function(response) {
            $('#listPER table').DataTable().clear();
            for (let i = 0; i < response.length; i++) {
                var sexe = "";
                if (response[i]['sexe'] == 1) {
                    sexe = "Femme";
                } else {
                    sexe = "Homme";
                }

                $('#listPER table').DataTable().row.add($(
                    '<tr><td>' + (response[i]['nom']) + '</td>' +
                    '<td>' + sexe + '</td>' +
                    '<td>' + (response[i]['telephone']) + '</td>' +
                    '<td>' + (response[i]['adresse']) + '</td>' +
                    '<td>' + (response[i]['email']) + '</td>' +
                    '<td>' + (response[i]['etat_civ']['nom']) + '</td>' +
                    '<td>' + (response[i]['role']['nom']) + '</td>' +
                    '<td>' + (response[i]['contrat']['type']) + '</td>' +
                    '<td>' + (response[i]['date_emb']) + '</td>' +
                    '<td>' + (response[i]['date_fin']) + '</td>' +

                    '<td><button class="btn btn-success" onclick="showModalEditPER(' + response[i]['id'] + ')" data-placement="bottom" title="Modifier" type="button"  (' + response[i]['id'] + ')" data-edit-user></button>&nbsp;' +
                    '<span id="action_' + response[i]['id'] + '" data-activate-user>' + (response[i]['estActiver'] ?
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer" onclick="showModalDeletePER(' + response[i]['id'] + ')" type="button"></button>' :
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer"  onclick="showModalDeletePER(' + response[i]['id'] + ')" type="button"></button>') +
                    '</span>&nbsp;' +
                    +'</<td>'
                ));
            }
            $('#listPER table').css('width', '100%').DataTable().order([0, 'desc']).draw();
        },
    });

}

function showModalAddPER() {

    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/roles",
        dataType: 'json',
        success: function(response) {
            for (let i = 0; i < response.length; i++) {
                let html = '<option value="">-- Veuillez séléctionner un role --</option>';
                for (let i = 0; i < response.length; i++) {
                    html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                }

                $('#role1').html(html);
                $('#role1').val("").trigger('change');;
            }
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/contrats",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner un contrat --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['type'] + '</option>';
                        }

                        $('#contrat1').html(html);
                        $('#contrat1').val("").trigger('change');;
                    }
                    $.ajax({
                        async: false,
                        type: "GET",
                        url: getUrlApi() + "/etats",
                        dataType: 'json',
                        success: function(response) {
                            for (let i = 0; i < response.length; i++) {
                                let html = '<option value="">-- Veuillez séléctionner une situation --</option>';
                                for (let i = 0; i < response.length; i++) {
                                    html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                                }

                                $('#etat1').html(html);
                                $('#etat1').val("").trigger('change');;
                            }
                            $('#nom').val("");
                            $('#telephone').val("");
                            $('#adresse').val("");
                            $('#email').val("");

                            if (response['sexe'] == true) {
                                $('#sexe').val(response['sexe'] = "Femme");
                            } else {
                                $('#sexe').val(response['sexe'] = "Homme");
                            }
                            $('#role1').val(response['role']);
                            $('#contrat1').val(response['contrat']);
                            $('#date_emb').val("");
                            $('#date_fin').val("");

                            $('#etat1').val(response['etat_civ']);


                        },
                    });
                },
            });
        },
    });
    $('#addPER').modal('show');
}

function addPER() {
    const modal = $('#addPER'),
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
        url: getUrlApi() + "/create/personnel",
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listPER();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Personnel ajouté avec succés");
        },
    });
}



function editPER(perId) {

    const modal = $('#editPER'),
        form = modal.find('form');

    $.ajax({
        async: false,
        url: getUrlApi() + "/re/personnel/" + perId,
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listPER();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Personnel modofié avec succés");
        },
    });
}

function showModalEditPER(PERId) {
    const modal = $('#editPER'),
        form = modal.find('form');
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/personnel/" + PERId,
        dataType: 'json',
        success: function(response) {
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/roles",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner un role --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#role11').html(html);
                        $('#role11').val("").trigger('change');;
                    }
                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editPER(' + PERId + ')');
                },
            });
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/contrats",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner un contrat --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['type'] + '</option>';
                        }

                        $('#contrat11').html(html);
                        $('#contrat11').val("").trigger('change');;
                    }
                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editPER(' + PERId + ')');
                },
            });
            $.ajax({
                async: false,
                type: "GET",
                url: getUrlApi() + "/etats",
                dataType: 'json',
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let html = '<option value="">-- Veuillez séléctionner une situation --</option>';
                        for (let i = 0; i < response.length; i++) {
                            html += '<option value="' + response[i]['id'] + '">' + response[i]['nom'] + '</option>';
                        }

                        $('#etat11').html(html);
                        $('#etat11').val("").trigger('change');;
                    }
                    modal.find('.modal-footer .btn-primary').attr('onclick', 'editPER(' + PERId + ')');
                },
            });
            $('#nom1').val(response['nom']);
            sexe = response['sexe'];
            if (sexe == true) {
                $('#sexe1').val(sexe = 1);
            } else {
                $('#sexe1').val(sexe = 0);
            }
            $('#telephone1').val(response['telephone']);
            $('#adresse1').val(response['adresse']);
            $('#email1').val(response['email']);
            $('#etat11').val(response['etat_civ']['id']);

            $('#role11').val(response['role']['id']);
            $('#contrat11').val(response['contrat']['id']);
            $('#date_emb1').val(response['date_emb']);
            $('#date_fin1').val(response['date_fin']);


        },
    });

    $('#editPER').modal('show');

}


function showModalDeletePER(idPER) {
    const modal = $('#deletePER');

    modal.find('.modal-footer .btn-primary').attr('onclick', 'deletePER(' + idPER + ')');

    $('#deletePER').modal('show');

}

function deletePER(idper) {
    const modal = $('#deletePER');

    $.ajax({
        async: false,
        url: getUrlApi() + "/remove/personnel/" + idper,
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function() {
            modal.modal('hide');
            listPER();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Personnel supprimé avec succés");
        }
    });
}