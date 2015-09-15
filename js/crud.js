/**
 * Created by heitor on 14/09/15.
 */

$(document).ready(function () {
    var $formGroups = $('div.form-group');
    var $helpBlocks = $('.help-block');
    var $titleInput = $('#titleInput');
    var $descriptionInput = $('#descriptionInput');
    var $tableItem = $('#tableItem');
    var $addItemForm = $('#addItemForm');
    var minId = 0;
    var maxId = 999;

    function getId() {
        return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    }

    function getCreationDate() {
        return new Date().toLocaleString();
    }

    function limparErros() {
        $formGroups.removeClass('has-error');
        $helpBlocks.text('');
    }

    function adicionarItens(item) {
        var linha = '<tr>';
        linha += '<td>' + item.id + '</td>';
        linha += '<td>' + item.creation + '</td>';
        linha += '<td>' + item.title + '</td>';
        linha += '<td>' + item.description + '</td>';
        linha += '<td>';
        linha += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button>';
        linha += '</td ></tr>';

        var $linhaObjeto = $(linha);


        var $botaoRemoverItem = $linhaObjeto.find('button.btn').click(function () {
            console.log(item.id);
            $linhaObjeto.remove();
        });

        $tableItem.append($linhaObjeto);

    }

    function listarItens(itens) {
        $.each(itens, function (i, cat) {
            adicionarItens(cat);
        })
    }

    function mostrarErros(erros) {
        var helpBlockPrefixo = '#help-block-';
        var formGroupPrefixo = '#form-group-';
        $.each(erros, function (propriedade, valorDaPropriedade) {
            $(helpBlockPrefixo + propriedade).text(valorDaPropriedade);
            $(formGroupPrefixo + propriedade).addClass('has-error');
        });
    }

    $addItemForm.submit(function (evento) {
        evento.preventDefault();
        limparErros();
        var title = $titleInput.val();
        var description = $descriptionInput.val();
        if (title === '' || description === '') {
            mostrarErros({'title': 'Nome Obrigatório', 'description': 'E-mail Obrigatório'})
        } else {
            adicionarItens({
                "id": getId(),
                "title": title,
                "creation": getCreationDate(),
                "description": description
            });
            $titleInput.val('');
            $descriptionInput.val('');
        }

    });
});