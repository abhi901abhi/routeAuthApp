jQuery(document).ready(function ($) {
    new Heyoffline({
        monitorFields: false,
        elements: ['.monitoredFields']
    });

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});