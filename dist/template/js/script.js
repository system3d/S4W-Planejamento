$(document).ready(function() {

   

    // Bootstrap Select
    $('.selectpicker').selectpicker({
        size: 4
    });

    /*
    MODAL RELOAD
    */
    var modalscripts = function() {

        // Remove the data-toggle attribute inside the modals to prevent modals close
        $.each($(".modal [data-target=#modal]"), function(index, val) {
            $(this).removeAttr('data-toggle');
        });

        // Inside the modals, if another modal is called, so open the respective content via AJAX in the same modal opened
        $(".modal [data-target=#modal]").click(function(ev) {

            ev.preventDefault();
            $("#modal .modal-dialog .modal-content").html('<div class="overlay"><i class="fa loading"></i></div>');

            var target = $(this).attr("href");

            $("#modal .modal-dialog .modal-content").load(target, function() {
                $("#modal").modal("show");
            }).error(function(data) {
                $("#modal").find('.modal-content').html(data).modal("show");
            });;

        });

    };

    //LIMPA MODALS
    $('body').on('hidden.bs.modal', '#modal', function() {
        $(this).removeData('bs.modal');
        $(this).find('.modal-content').html('<div class="overlay"><i class="fa loading"></i></div>');
    });

    $('body').on('show.bs.modal', '#modal', function(event) {
        //$(this).find('.modal-content').html('<div class="text-center well-lg">' + '<div class="loading"></div>' + '</div>');
    });

    $('body').on('loaded.bs.modal', '#modal', function() {
        modalscripts();
    });




    if( $('meta[name="_token"]').length && thisUserId ){
        /* Adiciona Token no Header de cada ajax*/
        var token = $('meta[name="_token"]').attr('content');
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': token
            }
        });
        /* Solicita novo token */
        $.ajax({
            url:  urlbaseGeral + '/newtoken',
            type: 'GET',
            dataType: 'json',            
        })
        .done(function( response ) {                        
            // $('meta[name="_token"]').attr('content', response.csrf_token);        
        })
        .fail(function( response ) {
            
            $.toast({
                heading: 'Seção expirada!',
                text: 'Por favor faça <a href="'+ window.location.protocol + '/logout">login</a> novamente.',
                icon: 'error',
                showHideTransition: 'slide',
                allowToastClose: true,
                hideAfter: false,
                stack: 1,
                position: 'top-center',
                textAlign: 'left',
                loader: false,
                bgColor: '#FC3E3E',
                beforeShow: function() {},
                afterShown: function() {},
                beforeHide: function() {},
                afterHidden: function() {
                    window.location.assign(  window.location.protocol + '/logout' )
                }
            });

        });    
    }


});


function number_format(numero, decimal, decimal_separador, milhar_separador) {
    numero = (numero + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+numero) ? 0 : +numero,
        prec = !isFinite(+decimal) ? 0 : Math.abs(decimal),

        sep = (typeof milhar_separador === 'undefined') ? ',' : milhar_separador,

        dec = (typeof decimal_separador === 'undefined') ? '.' : decimal_separador,

        s = '',

        toFixedFix = function(n, prec) {

            var k = Math.pow(10, prec);

            return '' + Math.round(n * k) / k;

        };

    // Fix para IE: parseFloat(0.55).toFixed(0) = 0;

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

    if (s[0].length > 3) {

        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);

    }

    if ((s[1] || '').length < prec) {

        s[1] = s[1] || '';

        s[1] += new Array(prec - s[1].length + 1).join('0');

    }
    return s.join(dec);

}

function dd(param) {
    console.log(param);
}

function diffForHumans(data){
  var dateAll = data.split(" ");
  var dateS = dateAll[0].split("-");
  var dateT = dateAll[1].split(":");
  var RSaida = dateS[2]+'/'+dateS[1]+'/'+dateS[0]+' '+dateT[0]+':'+dateT[1];
  return RSaida;
}

function diffForMachines(data){
  var dateS = data.split("/");
  var RSaida = dateS[2]+'-'+dateS[1]+'-'+dateS[0];
  return RSaida;
}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
  };

Date.prototype.ddmmyyy = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return  (dd[1]?dd:"0"+dd[0])+'/'+ (mm[1]?mm:"0"+mm[0]) +'/'+yyyy; // padding
  };
