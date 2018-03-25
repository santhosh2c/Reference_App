sap.ui.define(function() {
	"use strict";
	var Formatter = {
			setDate: function(value) {
				 var Data = "";
				if(value != "" && value != undefined){
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MMM-YYYY"});
					Data = oDateFormat.format(new Date(value));
				}
			return Data;
		},
		
		decimal : function(v){
			return parseFloat(v).toFixed(2);
		},
		
		number : function(maxlen){
			return parseInt(maxlen);;
		}
		
	};

	return Formatter;
}, true);