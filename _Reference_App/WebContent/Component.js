sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"reference/thirdParty/babel"
], function(UIComponent, Device, babel) {
	"use strict";
	//jQuery.sap.require("reference/thirdParty/babel");
	return UIComponent.extend("reference.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
		}
	});

});