sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.c203.delivery.controller.delivery", {
            onInit: function () {

            },

            multipletotal: function(sTotal) {
                return (sTotal * 100).toLocaleString();
            },
        });
    });