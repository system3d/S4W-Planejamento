$(document).ready(function() {
	$('.checkSets').change(function(event) {
		var type = $(this).attr('data-type');
		if($(this).is(":checked")){
			var value = true;
		}else{
			var value = false;
		}
		$.ajax({
			url: urlbaseGeral+"/settings/calendario/store",
			type: 'POST',
			dataType: 'json',
			data: {value: value, type:type},
		});
		
	});



	$('.inputdatePicker').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-BR",
        autoclose: true,
        todayHighlight: true,
        todayBtn: "linked",
        showOnFocus: true,
        immediateUpdates: true,
    });

    $('#feriadoForm').submit(function(event) {
    	event.preventDefault();
    	var value = $('#feriadoInput').val();
    	var obs = $('#feriadoObs').val();
    	$.ajax({
			url: urlbaseGeral+"/settings/calendario/store",
			type: 'POST',
			dataType: 'json',
			data: {value: value, type:'custom', obs:obs},
		}).done(function(r) {
			flashMessage(r.status, r.msg);
			if(r.status == 'success'){
				$('#feriadoInput').val('');
    			$('#feriadoObs').val('');
    			calendarTable.ajax.reload();
			}
			
		})
    });

   	$(document).on('click', '.delHolyCustom', function(event) {
    	event.preventDefault();
    	var value = $(this).attr('data-id');
    	$.ajax({
			url: urlbaseGeral+"/settings/calendario/delete",
			type: 'POST',
			dataType: 'json',
			data: {id: value},
		}).done(function(r) {
			flashMessage(r.status, r.msg);
			if(r.status == 'success')
			calendarTable.ajax.reload();
		})
		
    });

	 var calendarTable = $('#calendarTable').DataTable({
            ajax: {
              type: 'POST',
              url: urlbaseGeral+"/settings/calendario/getCustoms",
            },
            scrollX: true,
            responsive: true,
            "searching": false,
            "ordering": false,
            "sorting": false,
            "paging": false,
            "info": false,
            columns:  [
            { "data": "date" },
            { "data": "obs"},
            { "data": "actions" },
        ]
        });

});
