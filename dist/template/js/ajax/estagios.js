$(document).ready(function(){
	$('#EstagiosTable').DataTable({
        "iDisplayLength": 25,
        responsive: true,
        "language": {
          "emptyTable": "Nenhum Estagio Disponivel."
        },
    });
    $('.colorPick').colorpicker({
    	format: 'rgb',
    });
});