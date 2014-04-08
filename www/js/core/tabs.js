jQuery("a[data-role=tab]").each(function () {
    var ancla = jQuery(this);
    ancla.bind("click", function () {
        jQuery.mobile.changePage(ancla.attr("href"), {
            transition: "none",
            changeHash: false
        });
        return false;
    });
});

jQuery("div[data-role=page]").bind("pagebeforeshow", function () {
    jQuery.mobile.silentScroll(0);
    jQuery.mobile.changePage.defaults.transition = 'slide';
});