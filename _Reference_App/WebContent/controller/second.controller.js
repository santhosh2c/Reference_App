/* global moment:true */
sap.ui.define(
	["sap/ui/core/mvc/Controller", "reference/Format/Formatter", 'sap/m/Button', 'sap/m/Dialog', 'sap/m/Text', 'sap/m/MessageToast',
		'sap/m/MessageBox',
		'sap/m/Token', "reference/thirdParty/moment", 'sap/ui/model/json/JSONModel'
	],
	function(Controller, formatter, Button, Dialog, Text, MessageToast, MessageBox, Token, momentjs, JSONModel) {
		formatter: formatter,
		//moment:Moment,

		"use strict";
		return Controller
			.extend(
				"reference.controller.second", {

					onInit: function() {
						// var sServiceUrl = "proxy/http/services.odata.org/V2/Northwind/Northwind.svc/$metadata";
						var sServiceUrl = location.hostname === "localhost" ? "proxy/http/services.odata.org/V3/Northwind/Northwind.svc" :
							"/sap/opu/odata/sap/";
						var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

						this.getView().setModel(oModel, "oRefModel");

						sap.ui.getCore().setModel(oModel, "oRefModel");

						var m = [{
							"ProductId": "HT-1000",
							"Category": "Laptops",
							"MainCategory": "Computer Systems",
							"TaxTarifCode": "1",
							"SupplierName": "Very Best Screens",
							"WeightMeasure": 4.2,
							"WeightUnit": "KG",
							"Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
							"Name": "Notebook Basic 15",
							"DateOfSale": "2017-03-26",
							"ProductPicUrl": "test-resources/sap/ui/demokit/explored/img/HT-1000.jpg",
							"Status": "Available",
							"Quantity": 10,
							"UoM": "PC",
							"CurrencyCode": "EUR",
							"Price": 956,
							"Width": 30,
							"Depth": 18,
							"Height": 3,
							"DimUnit": "cm"
						}];

						var oModel = new JSONModel(m);
						this.getView().byId("multiInput").setModel(oModel);
					},

					onPress: function(evt) {

						var div = this.getView().byId("divcontainer");

						// var inputText = document.getElementById("input").innerHtml;

						var inputText = $(".inputClass").html();
							//var x = inputText.textContent ? inputText.textContent : inputText.innerText;

						//var text = inputText.innerHTML();
						console.log(inputText);
						console.log(div);
					},

					batch: function() {

						var oModelResgCreate = new sap.ui.model.odata.ODataModel("proxy/http/172.16.213.16:8000/sap/opu/odata/sap/ZEMT_PMAPP_SRV/", {
							json: true
						});
						oModelResgCreate.setHeaders({
							"X-Requested-With": "XMLHttpRequest",
							"Content-Type": "multipart/mixed",
							"DataServiceVersion": "2.0",
							"Access-Control-Allow-Origin": "172.16.213.16",
							"Accept": "application/json",
							"Method": "POST"
						});
						var batchUrls = [];
						var obj = {
							Muser: "KAMAL-ENST",
							IvTransmitType: "LOAD",
							IvCommit: "X"
						};

						batchUrls.push(oModelResgCreate.createBatchOperation("/OrdReleaseFM?IvAufnr=%276000000265", "POST", obj));

						oModelResgCreate.addBatchChangeOperations(batchUrls);
						oModelResgCreate.setUseBatch(true);
						oModelResgCreate.submitBatch(function(oData, oResponse) {

						}, function(err) {
							MessageBox.error(err);
						});
					}

				});
	});