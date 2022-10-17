/*global QUnit*/

sap.ui.define([
	"sd_orderlist/controller/orderlist.controller"
], function (Controller) {
	"use strict";

	QUnit.module("orderlist Controller");

	QUnit.test("I should test the orderlist controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
