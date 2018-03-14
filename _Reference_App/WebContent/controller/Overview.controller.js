/* global moment:true */
sap.ui.define( 
	["sap/ui/core/mvc/Controller", "reference/Format/Formatter", 'sap/m/Button', 'sap/m/Dialog', 'sap/m/Text', 'sap/m/MessageToast', 'sap/m/MessageBox',
	 'sap/m/Token',  "reference/thirdParty/moment", 	"sap/ui/export/Spreadsheet"], 
	function(Controller, formatter, Button, Dialog, Text, MessageToast, MessageBox, Token, momentjs, Spreadsheet) {
	formatter: formatter,
	//moment:Moment,
	
	"use strict";
			let get = jQuery.sap;
			jQuery.sap.require("reference/connection/connection");
			//jQuery.sap.require("https://maps.googleapis.com/maps/api/js?key=api_key");
			//jQuery.sap.require("https://unpkg.com/babel-standalone@6/babel.min.js");
			return Controller
			    .extend(
			        "reference.controller.Overview", {
			
			_data : {
			"date" : new Date(),
			"thisView" : "this.getView()"
			},
			
			
			dil : function(){
				 jQuery.sap.Dialog = new sap.m.Dialog({
			            title: "Error",
			            content: new sap.m.Text({text: "fdg"}),
			            state : "Error",
			            title : "Error",
			            resizable : true,
			            beginButton: new sap.m.Button({
			              text: "OK",
			              press: function () {
			                jQuery.sap.Dialog.close();

			              }
			            })
			            });
			               jQuery.sap.Dialog.open();

			},
			
			addColListItem : function(){
				 var columnListItemNewLine = new sap.m.ColumnListItem({
			            cells:[
			                new sap.m.Text({text: "1"}),
			                new sap.m.TextArea({value: "senf", rows: 6, width: 
			                "30%"}),
			                new sap.m.Text({text: "1"}),
			                new sap.m.Text({text: "1"}),
			                new sap.m.Text({text: "1"}),
			                new sap.m.Text({text: "1"}),
			                ]
			        });
				 this.getView().byId("table").removeAllItems();
			        this.getView().byId("table").addItem(columnListItemNewLine);
			},
			
			
			combo : function(){
			let combo = this.getView().byId("combo").getValue();
			let oMultiInput2 = this.getView().byId("multiInput1");
			oMultiInput2.addToken(new sap.m.Token({text : combo}));
			
			},
			
			handleChange : function(oEvent){
				console.log("date", oEvent.valid)
				 let m = this.getView().byId("DTP1").getDateValue();
				 this.getView().byId("DTP1").setMinDate(new Date(2017, 11, 7));
			},
			
			getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},
			
			nextPage : function(){
				var mod = this.getView().getModel().getData();
				this.getRouter().navTo("second");
			},
			
			displayInputErrors: function(faultyRows){  
				
				var data = this.getView().byId("textA").getValue();
		        var inputText = "";

		        for(var i=0; i<data.length; i++){
		            if(data.indexOf(i) != -1){
		                inputText += "DSGFADS";
		                inputText.fontcolor('green');
		            }else{
		            	inputText += "no";
		            	inputText.fontcolor('green');
		        }
		        }
		        this.byId("textA").setValue(inputText);
		        
		    },
			
			onDialogWithSizePress: function (oEvent) {
				if (!this.fixedSizeDialog) {
					this.fixedSizeDialog = new Dialog({
						title: 'Available Products',
						contentWidth: "550px",
						contentHeight: "300px",
						content: new List({
							items: {
								path: '/ProductCollection',
								template: new StandardListItem({
									title: "{Name}",
									counter: "{Quantity}"
								})
							}
						}),
						beginButton: new Button({
							text: 'Close',
							press: function () {
								this.fixedSizeDialog.close();
							}.bind(this)
						})
					});

					//to get access to the global model
					this.getView().addDependent(this.fixedSizeDialog);
				}

				this.fixedSizeDialog.open();
			},

			onEscapePreventDialog: function() {
				if (!this.escapePreventDialog) {
					this.escapePreventDialog = new sap.m.Dialog({
						title: 'Try closing me with ESCAPE',
						buttons: [
							new sap.m.Button({
								text : "Simply close",
								press : function() {
									this.escapePreventDialog.close();
								}.bind(this)
							})
						],
						escapeHandler: function(oPromise) {
							if (!this.confirmEscapePreventDialog) {
								this.confirmEscapePreventDialog = new sap.m.Dialog({
									title : "",
									showHeader : false,
									
								});
							}

							this.confirmEscapePreventDialog.open();
							var m = this.confirmEscapePreventDialog.getId();
							$(m).hide()
						}.bind(this)
					});
				}

				this.escapePreventDialog.open();
			},
			
			onInit :  function(evt){
				
				$.sap.Service_URL = location.hostname === "localhost" ? "proxy/http/services.odata.org/V3/Northwind/Northwind.svc" : "/sap/opu/odata/sap/";
//				if(window.location.hostname == "localhost"){
//					$.sap.Service_URL = "proxy/http/152.63.2.109:8001/sap/opu/odata/sap/";
//				}else{
//					window.Service_URL = "/sap/opu/odata/sap/";
//				}
				
//				let Service_URL = location.hostname ? "proxy/http/152.63.2.109:8001/sap/opu/odata/sap/" : "/sap/opu/odata/sap/";
//				console.log(Service_URL+"ZSRV_UI_TRS_ETRS");
				console.log("component", sap.ui.getCore().byId("componentID"));
				//console.log("ownerComponent", this.getOwnerComponent());
			    console.log("moment", moment().format('LL'));
			    
			let oMultiInput1 = this.getView().byId("multiInput1");
			
			
			oMultiInput1.addValidator(function(args){
				let text = args.text;
			
				return new Token({key: text, text: text});
			});
			console.log(this)
			let indData = [{
				"key" : "1",
				"value": "jhsfgdgkdsgkgds"
			},
			{
				"key" : "2",
				"value": "dfgkjjghfjdhfgdhjhgfjdhgfdh"
			}]
			 let indexModel = new sap.ui.model.json.JSONModel(indData); 
			  this.getView().byId("indexCombo").setModel(indexModel);
//			  this.getView().setModel(indexModel);
//			  this.getView().bindElement("/0");
			
			
			
			console.log("onInit", this);
			console.log(sap.m.Label.getMetadata());
			this.getView().byId("text").setBusy(true);
			console.log(this.getView().byId("text").isBusy());
			let form = [{
				EmployeeID : "131232.000000",
				Starttime :"PT03H00M49S",
				EmployeeName : "santhosh",
				EmployeeNumber : 9900227666,
				EmployeePlace : "Bangalore"
			}];
			
			
			
			let formModel = new sap.ui.model.json.JSONModel(form);
			this.getView().byId("form").setModel(formModel);
			this.getView().byId("form2").setModel(formModel);
			this.getView().byId("form").bindElement("/"+"0");
			//this.getView().byId("tex").setModel(formModel);
			//this.getView().byId("tex").bindText("/EmployeeName"); //works when form[0] is mapped
			//this.getView().byId("form2").bindElement("/"+"0");
			
			
			
			
			
			//txt.onAfterRendering = function(){
			//	if(sap.m.Text.prototype.onAfterRendering){
			//		sap.m.Text.prototype.onAfterRendering.apply(this, arguments);
			//	}
			//	
			//	setTimeout(function(){
			//		alert("text");
			//	}, 3000);
			//	
			//}
			let txt = this.byId("text");
			txt.addEventDelegate({
			      onAfterRendering : function () {
			    	 setTimeout(function(){
							//alert("text");
						}, 3000);
			     }
			}, this);
			
			
			let switchs = this.byId("switch");
			switchs.addEventDelegate({
				onAfterRendering : function(){
					this.getView().byId("switch").attachBrowserEvent("keydown", this.hello);
				}
			},this)
			
			
			let oPicker = this.byId("datePicker");
			oPicker.setDateValue(new Date());
			oPicker.addEventDelegate({
			    onsapdown: function() {
			        let oDateValue = oPicker.getDateValue();
			        oDateValue.setDate(oDateValue.getDate() - 1);
			        oPicker.invalidate();
			    },
			    onsapup: function() {
			        let oDateValue = oPicker.getDateValue();
			        oDateValue.setDate(oDateValue.getDate() + 1);
			        oPicker.invalidate();
			    }
			});
			
			
			
			
			
			
			
			
			let oInput = this.byId("one");
			oInput.attachBrowserEvent("mousewheel", function(oEvent) {
			   oEvent.preventDefault();
			});
			
			get.hi = "hi";
			
			console.log(get.hi);
			
			//console.log(Service_URL.getServiceUrl("ZSRV_UI_ECS_ECES"));
			//this._oView = this.getView();           
			this.getView().addEventDelegate({
			    onBeforeHide: function(oEvent) {
			        alert("1");
			    },
			
			    onAfterHide: function(oEvent) {
			    	alert("2");
			    }
			})
			
			//console.log(jQuery.sap.hi = "fgdh");
			//console.log(jQuery.sap);
			console.log(sap.ui.getCore().getEventBus());
			let thisView = this.getView();
			let oModel = new sap.ui.model.json.JSONModel(this._data);
			thisView.setModel(oModel);
			
//			let serviceName = "Northwind";
//			let finApprTable = new sap.ui.model.odata.ODataModel(`proxy/http/services.odata.org/V3/Northwind/${serviceName}.svc/`);
			
			
			let finApprTable = new sap.ui.model.odata.v2.ODataModel($.sap.Service_URL);
			console.log("products", finApprTable.getProperty("/Products"));
			finApprTable.attachRequestFailed(function(){
				alert("fdafdsa");
			})
			this.byId("table").setModel(finApprTable);
			this.byId("table1").setModel(finApprTable);
			
//			finApprTable.read("/Employees", null,
//				null, true,((oData, oResponse )=>{
//				//console.log(oData);
//					console.log("insideFunction", this);
//				  this.oModel = new sap.ui.model.json.JSONModel(oData.results); 
//				  this.byId("table").setModel(this.oModel);
//				  
//				  
//				  
//				  let c = "con";
//				  let d = "cons";
//				  this.s = "mons";
//				  this.hi(d,c);
//				}),
//				function(err) {
//				   alert("ERROR");
//			});
			
			},
			
			sel : function(){
				 this.byId("selSize").setSelectedKey("ProdudsfctId");
//				 window.scroll(0, 750)
				
			},
			
			invalidate : function(){
//				this.getView().getId().invalidate();
//				this.getView().byId("inputPercent").invalidate();
			},
			
			
			onMessageDialogPress: function (oEvent) {
				var dialog = new Dialog({
					title: 'Default Message',
					type: 'Message',
						content: new Text({
							text: 'That´s OpenUI5.'
						}),
					beginButton: new Button({
						text: 'OK',
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
			},
			
			busy : function(){
				window.busyIndicator = sap.ui.core.BusyIndicator;
				busyIndicator.show();
				busyIndicator.attachOpen(function(){
					$(".sapUiLocalBusyIndicatorAnimation").empty();
					$(".sapUiLocalBusyIndicatorAnimation").removeClass("sapUiLocalBusyIndicatorAnimStandard")
					$(".sapUiLocalBusyIndicatorAnimation").append("<section><img src='https://loading.io/spinners/comets/index.comet-spinner.svg'></section>");
					
					
				})
			},
			
			scroll : function(evt){
				var tabID = this.getView().byId("table").getId();
				
				$(this).click(function(){
					$('html, body').animate({
					    scrollTop: $("#"+tabID).offset().top
					}, 2000);
    });
				
				 
				
//				$('html, body' ).animate({
//				    opacity: 0.25,
//				    left: "+=50",
//				    height: "toggle"
//				  }, 5000);
			},
			
			
			
			
			onBeforeRendering : function(){
//				let indData = [{
//					"key" : "1",
//					"value": "jhsfgdgkdsgkgds"
//				},
//				{
//					"key" : "2",
//					"value": "dfgkjjghfjdhfgdhjhgfjdhgfdh"
//				}]
//				 let indexModel = new sap.ui.model.json.JSONModel(indData); 
//				  this.getView().setModel(indexModel);
//				  this.getView().bindElement("/0");
			},
			
			
			hi : function(a,b,s){
			console.log(a);
			console.log(b);
			console.log(this.s);
			},
			
			inpValidate : function(){
				$(".inputWrapper :input").each(function (index, value){
					$(this).val() === "" ? $(this).addClass("query") : $(this).removeClass("query");
					console.log(value);
				});
			},
			
			openPDF : function(){
				var URL = "https://www.sapfioritrial.com/sap/opu/odata/sap/HCM_MY_PAYSTUBS_SRV/PDFPaystubs(SEQUENCENUMBER=1694,PersonnelAssignment='00100226')/$value";
				sap.m.URLHelper.redirect( URL, true )
			},
			
			hello : function(evt){
			alert("called from browser event");
			if(evt.keyCode === jQuery.sap.KeyCodes.ARROW_LEFT){
				alert("Left arrow pressed");
			}
			},
			
			onAfterRendering : function(){
				//this.byId("adjustToolbar").removeStyleClass("sapMTB")
				//this.byId("adjustToolbar").addStyleClass("toolbarStyling")
				
//				headerToolbar : [
//	                  new sap.m.Toolbar({
//	                  content:[
//	                           new sap.m.SearchField({
//	                           placeholder:"{i18n>mainViewSearchField}"
//	                           })
//	                           ]
//	                  })
//	                  ],
				
				function addMonths(date, months) {
					  date.setMonth(date.getMonth() + months);
					  return date;
					}
				let min = addMonths(new Date(), -6);
				let max = addMonths(new Date(), +6);
				let minMM, minDD, minYY, maxMM, maxDD, maxYY;
				minMM = min.getMonth();
				minDD = min.getDate();
				minYY = min.getFullYear();
				maxMM = max.getMonth();
				maxDD = max.getDate();
				maxYY = max.getFullYear();
				 this.getView().byId("DTP1").setMinDate(new Date(minYY, minMM, minDD));
				 this.getView().byId("DTP1").setMaxDate(new Date(maxYY, maxMM, maxDD));
//				let iid = "#"+this.getView().byId("two").getId();
//				console.log("FDAGDSGFs", iid);
//				$(iid).attr("placeholder", "Type here to search");
				
				$(".cls .sapMInputBaseInner").attr("placeholder", "Type here to search");
			    $(".sapMLabel").click(function(){
				 // $(this).parent().find('li').removeClass('active');
			        
			        if($(this).hasClass('active')){
			        	$(this).removeClass('active');
			        }else
			        {
			        	$(this).addClass('active');
			        }
			
			});
			
			let tx = "#"+this.getView().byId("text").getId();
			$(tx).click(function(){
				alert("txtxtx");
			})
			
			let datett = this.getView().byId("getDate");
			console.log(datett);
			
			
			
			
			//let inp = this.getView().byId("getDate").getId();
			//$("#"+inp).click(function(){
			//	alert("hi");
			//});
			
			// MessageBox.error("Confirmation forly",{
			//		  onClose : function(){
			//			this.hi();
			//		  }
			//	  }); 
			 
			 	this.getView().byId("date1").setEnabled(true);
			},
			
			//hi : function(){
			//alert("hi");
			//},
			
			button : function(){
			let a = this.getView().byId("one").getValue();
			let b = this.getView().byId("two").getValue();
			let c = +a + +b;
			let m = this;
			console.log(m);
			
			this.getView().byId("panel").setExpanded(false);
			//let oCtx = this.getView().getBindingContext();
			//
			//let $a = $(this.getView().byId("getDate").getDomRef().id);
			//
			//console.log(oCtx , $a);
			
			//console.log(this.getView().byId("getDate").getValue(), this.oModel.getData());
			//let m = this.getView().byId("table").getColumns();
			//m[0].mAggregations.header.mProperties.text
			// console.log(m);
			
			//$(".style1").attr("disabled", "disabled");
			console.log(jQuery.sap.my);
			//console.log(jQuery.sap.byId("getDate"));
			},
			
			onExit : function(){
			this.getView().destroyContent();
			alert("hi");
			},
			
			press :  function(oEvent){
			 let src = oEvent.getSource();
			 this.getView().byId("detach").detachPress(function(){
				 alert("detached");
			 }, src);
			},
			
			
			percentCheck: function(oEvent) {
		        //inputText is the input Text box  
		        var inputText = this.getView().byId("inputPercent");
		        var isSelected = oEvent.getParameter("selected");

		        if (isSelected) {
		            inputText.setValue("100%");
		        } else {
		            inputText.setValue("");
		        }
		        
		        console.log("tttttT", this.getView().byId("table").getGrowingInfo().total)
		    },
			
			tableModel : function(){
			
			// no use of this method
			let hasModel = this.getView().byId("table").hasModel();
			if(hasModel){
				let data = this.getView().byId("table").getModel().getData();
				console.log(data);
				console.log(hasModel);
			}
			},
			
			formatting : function(a){
			if(a == "USA"){
				return  "PSA";
			}else{
				return "OSA";
			}
			},
			
			startedTable : function(){
			this.getView().byId("table").setBusy(true);
			},
			
			finishedTable : function(){
			this.getView().byId("table").setBusy(false);
			},
			
			growingStarted : function(){
			this.getView().byId("table").setBusy(true);
			},
			
			growingFinished : function(){
			this.getView().byId("table").setBusy(false);
			},
			
			ReturnedSwitchPress : function(){
			
			},
			
			frag : function(){
			L1confsearchFrag.open();
			},
			
			strip : function(){
			this.getView().byId("stripmsg").setVisible(true);
			},
			
			tblColumns : function(){
			let col = this.getView().byId("table");
			
			let col1 = this.getView().byId("table").getColumns()[0];
			let col2 = this.getView().byId("table").getColumns()[1];
			col.sort([col1, col2]);
			console.log(col);
			},
			
			dialog : function(){
			
			
			 let RatingInfo = new Dialog({
			     title: 'Change Info',
			     type: 'Message',
			     state: 'Warning',
			     escapeHandler : function(){
			    	 
			     },
			     content: new Text({
			         text: "Rating changed"
			     }),
			     beginButton: new Button({
			         text: 'Proceed',
			         type: 'Accept',
			         press: function() {
			        	 RatingInfo.close();
			         }
			     }),
			     endButton: new Button({
			         text: 'Cancel',
			         type: 'Reject',
			         press: function() {
			        	 var iiif = '#'+RatingInfo.getId();
			        	 $(iiif).fadeOut(500, function(){
			        		 RatingInfo.close();
			        	 });
			        	 
			         }
			     }),
			 });
			 
			
			 
			 this.getView().addDependent(RatingInfo);
			 RatingInfo.open();
			
			},
			
			
			
			
			onVQChangeMatSrc : function(evt){
				console.log("search", evt.oSource.oParent.oParent.sId);
			},
			
			getIndex : function(){
				let model = this.getView().byId("indexCombo").getModel().getData();
				 let key = this.getView().byId("indexCombo").getSelectedKey();
				 
				 for(let i=0;i<model.length;i++){
					 if(model[i].key = key){
						 console.log("dfahkg");
					 }
				 }
				console.log(key);
			},
			
			
			createColumnConfig: function() {
				var aCols = [];

				aCols.push({
					label: 'ID',
					type: 'string',
					property: 'Address',
					scale: 0
				});

				aCols.push({
					property: 'Country',
					type: 'string'
				});

				return aCols;
			},
			
			onExport: function() {
				var aBoundProperties, aCols, oProperties, oRowBinding, oSettings, oTable, oController;

				oController = this;

				if (!this._oTable) {
					this._oTable = this.byId("table");
				}

				oTable = this._oTable;
				oRowBinding = oTable.getBinding("items");

				aCols = this.createColumnConfig();

				var oModel = oRowBinding.getModel();
				var oModelInterface = oModel.getInterface();

				oSettings = {
					workbook: { columns: aCols },
					dataSource: {
						type: "oData",
						dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
						serviceUrl: oModelInterface.sServiceUrl,
						headers: oModelInterface.getHeaders ? oModelInterface.getHeaders() : null,
						count: oRowBinding.getLength ? oRowBinding.getLength() : null,
						useBatch: oModelInterface.bUseBatch,
						sizeLimit: oModelInterface.iSizeLimit
					},
					worker: false // We need to disable worker because we are using a MockServer as OData Service
				};

				new Spreadsheet(oSettings).build();
			},
			

	});
});