

// sap.ui.define([
// 	"sap/ui/core/mvc/Controller"
// ], (Controller) => {
// 	"use strict";

// 	return Controller.extend("companyui.controller.EmployeeDetails", {
// 		onInit() {
// 			const oRouter = this.getOwnerComponent().getRouter();
// 			oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);
// 		},
// 		_onObjectMatched: function (oEvent) {
// 			var sEmployeeId = oEvent.getParameter("arguments").EmployeeId;
// 			this.getView().bindElement("/Employees/" + sEmployeeId); 
// 			console.log(this.getView());
// 		 }

		
// 	});
// });





// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
// ], function (Controller, JSONModel) {
//     "use strict";

//     return Controller.extend("companyui.controller.EmployeesDetails", {
//         onInit: function () {
//             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//             oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);
//         },

//         _onObjectMatched: function (oEvent) {
//             var sEmployeeId = oEvent.getParameter("arguments").EmployeeId;
//             var oModel = this.getView().getModel("employeeModel");
//             var aEmployees = oModel.getProperty("/Employees");
//             var oEmployee = aEmployees.find(function (o) {
//                 return o.Employee_Id === sEmployeeId;
//             });
//             var oEmployeeModel = new JSONModel(oEmployee);
//             this.getView().setModel(oEmployeeModel, "selectedEmployee");
//         }
//     });
// });



// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
// ], function (Controller, JSONModel) {
//     "use strict";

//     return Controller.extend("companyui.controller.EmployeesDetails", {
//         onInit: function () {
//             // Attach pattern matched event
//             this.getOwnerComponent().getRouter().getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);
//         },

//         _onObjectMatched: function (oEvent) {
//             // Retrieve employee ID from route parameters
//             var sEmployeeId = oEvent.getParameter("arguments").EmployeeId;
//             console.log("Employee ID:", sEmployeeId);
//             var test = this.getView().getModel("companyList").getProperty("/emparr/"+sEmployeeId);
//             // Retrieve selectedEmployee model
//             var oModel = this.getView().getModel("employeeModel");
//             console.log("Selected Employee Model:", test);
            
//             // Retrieve employee data from model
//             var oEmployee = oModel.getProperty("/" + sEmployeeId);
//             console.log("Selected Employee Data:", oEmployee);

//             // Set selectedEmployee model to the view
//             this.getView().setModel(oModel, "selectedEmployee");
//         },

//         onNavBack: function () {
//             this.getOwnerComponent().getRouter().navTo("RouteHome");
//         }
//     });
// });




// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
// ], function (Controller, JSONModel) {
//     "use strict";

//     return Controller.extend("companyui.controller.EmployeesDetails", {
//         onInit: function () {
//             this.getOwnerComponent().getRouter().getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);

//         },
        
//         _onObjectMatched: function (oEvent) {
//             // Retrieve employee ID from route parameters
//             var sEmployeeId = oEvent.getParameter("arguments").EmployeeId;
//             console.log("Employee ID:", sEmployeeId);

//             // Retrieve selectedEmployee model
//             var oModel = this.getView().getModel("selectedEmployee");
//             console.log("Selected Employee Model:", oModel);

//             // Check if model is loaded
//             if (!oModel) {
//                 // If model is not loaded, create a new one
//                 oModel = new JSONModel();
//                 this.getView().setModel(oModel, "selectedEmployee");
//             }

//             // Simulate employee data - replace this with actual data retrieval logic
//             var oEmployeeData = {
//                 "EmployeeId": sEmployeeId,
//                 "FirstName": "John",
//                 "LastName": "Doe",
//                 "PhoneNumber": "1234567890",
//                 "DepartmentId": "123"
//             };

//             // Set employee data to the model
//             oModel.setData(oEmployeeData);
//         },

//         onNavBack: function () {
//             this.getOwnerComponent().getRouter().navTo("RouteHome");
//         }
//     });
// });


sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast"
], function(Controller, JSONModel, Fragment, MessageToast) {
  "use strict";

  return Controller.extend("frontend.controller.EmployeeDetails", {
      onInit: function() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);

          this.getView().setModel(new sap.ui.model.json.JSONModel(), "employeeModel");
          this._Emp_Id = null;
      },

      _onObjectMatched: function(oEvent) {
          this._Emp_Id = oEvent.getParameter("arguments").EmployeeId;
          this.getView().bindElement(`/Employees/${this._Emp_Id}`);

          let url = `${this.getOwnerComponent().getModel("oDaModel").getServiceUrl()}Employees('${this._Emp_Id}')`;

          jQuery.ajax({
              method: "GET",
              url: url,
              success: (data) => this.setDataToModel(data),
              error: (error) => console.log(error),
          });
      },

      setDataToModel: function(data) {
          this.getView().getModel("employeeModel").setData(data);
      },

      onEdit: function () {
        if (!this.pDialog) {
          this.pDialog = Fragment.load({
            id: this.getView().getId(),
            name: "companyui.view.EditEmployee",
            controller: this,
          }).then(
            function (oDialog) {
              this.getView().addDependent(oDialog);
              return oDialog;
            }.bind(this)
          );
        }
        this.pDialog.then((oDialog) => {
          oDialog.open();
        });
      },
      onSaveEmployee: function () {
        let oEmployeeData = this.getView().getModel("employeeModel").getData();

        // console.log(this._Emp_Id);

        // console.log("Adding employee:", oEmployeeData);

        let url =
          this.getOwnerComponent().getModel("oDaModel").getServiceUrl() +
          "Employees" +
          `('${this._Emp_Id}')`;
        // console.log(url);

        if (oEmployeeData) {
          $.ajax({
            method: "PATCH",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(oEmployeeData),
            success: function () {
              // console.log("Data Saved in OData Service");
              MessageToast.show("Employee Edited ");
            },
            error: function (error) {
              console.error(error);
            },
          });
        }

        this.onCancelEmployee();
      },

      onCancelEmployee: function () {
        this.byId("editEmployee").close();
      },
      onRequest: function () {
        if (!this._oValueHelpDialog) {
          this._oValueHelpDialog = Fragment.load({
            id: this.getView().getId(),
            name: "companyui.view.ValueHelp",
            controller: this,
          }).then(
            function (oDialog) {
              this.getView().addDependent(oDialog);
              return oDialog;
            }.bind(this)
          );
        }
        this._oValueHelpDialog.then((oDialog) => {
          oDialog.open();
        });
      },
      _onValueHelpConfirmPress: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        let empDepartment = this.getView().byId("empDepartmentId");

        if (oSelectedItem) {
          var sSelectedDepartmentId = oSelectedItem.getTitle();

          empDepartment.setValue(sSelectedDepartmentId);

          console.log("Selected Department ID:", sSelectedDepartmentId);
        }
      },

      onNavBack: function() {
          this.getOwnerComponent().getRouter().navTo("Employees");
      }
  });
});
