
    /* Volta para a Tab sendo visualizada em um refresh/redirectBack */
    var urlTab = document.location.toString();
    if (urlTab.match('#')) {
        $('.nav-tabs a[href=#' + urlTab.split('#')[1] + ']').tab('show');
    };

    // Change hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function(e) {
        window.location.hash = e.target.hash;
    })