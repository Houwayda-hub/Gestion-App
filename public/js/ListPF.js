function getUrlApi() {
    return document.location.origin + "/api";
}

function showModalAddPF() {

    $('#nom').val("");
    $('#ref').val("");
    $('#prix_vente').val("");
    $('#quantite').val("");
    $('#etat').val("");


    $('#addP').modal('show');

}

function addP() {
    console.log('test');
    const modal = $('#addP'),
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
        url: getUrlApi() + "/create/produit",
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            listPF();
            modal.modal('hide');
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Produit ajouté avec succés");
        },
    });
}

function listPF() {
    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/produits",
        dataType: 'json',
        success: function(response) {
            $('#listPF table').DataTable().clear();
            for (let i = 0; i < response.length; i++) {
                var etat = "";
                if (response[i]['etat'] == true) {
                    etat = "En stock";
                } else {
                    etat = "En rupture";
                }
                $('#listPF table').DataTable().row.add($(
                    '<tr><td>' + (response[i]['nom']) + '</td>' +
                    '<td>' + (response[i]['ref']) + '</td>' +
                    '<td>' + (response[i]['prix_vente']) + '</td>' +
                    '<td>' + (response[i]['quantite']) + '</td>' +
                    '<td>' + etat + '</td>' +

                    '<td><button class="btn btn-success" onclick="showModalPF(' + response[i]['id'] + ')" data-placement="bottom" title="Modifier" type="button"  (' + response[i]['id'] + ')" data-edit-user></button>&nbsp;' +
                    '<span id="action_' + response[i]['id'] + '" data-activate-user>' + (response[i]['estActiver'] ?
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer" onclick="showModalDeletePF(' + response[i]['id'] + ')" type="button"></button>' :
                        '<button data-toggle="tooltip" class="btn btn-danger" data-placement="bottom" title="Supprimer"  onclick="showModalDeletePF(' + response[i]['id'] + ')" type="button"></button>') +
                    '</span>&nbsp;' +
                    +'</tr>'
                ));
            }
            $('#listPF table').css('width', '100%').DataTable().order([0, 'desc']).draw();
        },
    });

}


function editPF(pId) {

    const modal = $('#EDIT'),
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
        url: getUrlApi() + "/re/produit/" + pId,
        data: new FormData(form.get(0)),
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function(response) {
            modal.modal('hide');
            listPF();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Produit modifié avec succée");
        },

    });
}

function showModalPF(pfId) {
    const modal = $('#EDIT'),
        form = modal.find('form');

    $.ajax({
        async: false,
        type: "GET",
        url: getUrlApi() + "/produit/" + pfId,
        dataType: 'json',
        success: function(response) {
            modal.find('.modal-footer .btn-primary').attr('onclick', 'editPF(' + pfId + ')');

            $('#nomP').val(response['nom']);
            $('#refP').val(response['ref']);
            $('#prixP').val(response['prix_vente']);
            $('#quantiteP').val(response['quantite']);


            if (response['etat'] == true) {
                $('#etatP').val(response['etat'] = 1);
            } else {
                $('#etatP').val(response['etat'] = 0);
            }
        },

    });
    $('#EDIT').modal('show');

}

function showModalDeletePF(idPF) {
    const modal = $('#deletePF');

    modal.find('.modal-footer .btn-primary').attr('onclick', 'deletePF(' + idPF + ')');

    $('#deletePF').modal('show');

}

function deletePF(idPF) {
    const modal = $('#deletePF');

    $.ajax({
        async: false,
        url: getUrlApi() + "/remove/produit/" + idPF,
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",
        success: function() {
            modal.modal('hide');
            listPF();
            $('#sAlert_u').show().delay(5000).fadeOut('slow').find('span').text("Produit supprimé avec succés");
        }


    });
}