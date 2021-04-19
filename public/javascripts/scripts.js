(function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });

    $(document).ready( function () {
        $('#dataTable').DataTable({
            columnDefs: [
                {
                    targets: -1,
                    className: 'display'
                }
              ],
            "language": {
                "lengthMenu": "Mostrar _MENU_ post por página",
                "zeroRecords": "No hay resultados",
                "info": "Mostrando _PAGE_ de _PAGES_ páginas",
                "infoEmpty": "No hay información disponible",
                "infoFiltered": "(filtrado por _MAX_ del total)",
                "search": "Buscar:",
                "paginate": {
                    "first":      "Primero",
                    "last":       "Último",
                    "next":       "Siguiente",
                    "previous":   "Anterior"
                },
            }    
        });
    } );
})(jQuery);
