//  //  const { log } = require("console");


// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/ui/core/Fragment",
//     "sap/m/MessageBox",
//   ],
//   /**
//    * @param {typeof sap.ui.core.mvc.Controller} Controller
//    */
//   function (
//     Controller,
//     JSONModel,
//     Filter,
//     FilterOperator,
//     Fragment,
//     MessageBox
//   ) {
//         "use strict";

//         return Controller.extend("companyui.controller.EmployeesList", {
//             onInit: function () {
//                 var oModel = new JSONModel({
//                   Employee_Id: "",
//                   Employee_First_Name: "",
//                   Employee_Last_Name: "",
//                   Employee_Phone_Number: "",
//                   Employee_Department_ID: "",
//                 });
        
//                 let AllEmployeeModel = new JSONModel();
        
//                 this.getView().setModel(oModel, "employeeModel");
//                 this.getView().setModel(AllEmployeeModel, "EmployeesModel");
        
//                 var that = this;
        
//                 jQuery.ajax({
//                     method: "GET",
//                     url: this.getOwnerComponent().getModel("oDaModel").getServiceUrl() + "Employees",
//                     success: function (data) {
//                        //console.log(data.value);
//                         var oModel = new JSONModel();
//                         oModel.setData({ Employees: data.value });
//                         //console.log(oModel)
//                         that.getView().setModel(oModel, "employeeModel");
//                         var oModelGlobal=that.getView().getModel("companyList")
//                         oModelGlobal.setProperty("/emparr",data.value);
                        
//                     },
//                     error: function (error) {
//                         console.log(error);
//                     }

//                 })


//             },
//             onNavBack: function () {
//                 const oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo('RouteHome')
//             },
//             onSelect: function (oEvent) {
//                 let Emp_Id = oEvent.getSource().getTitle()
//                 console.log(Emp_Id);
//                 let oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("EmployeeDetails", { EmployeeId: Emp_Id });
                


//                 console.log(oRouter);

//             },

//             onAddEmp: function () {
//                 if (!this.pDialog) {
//                   this.pDialog = Fragment.load({
//                     id: this.getView().getId(),
//                     name: "companyui.view.AddEmployeeDialog",
//                     controller: this,
//                   }).then(
//                     function (oDialog) {
//                       this.getView().addDependent(oDialog);
//                       return oDialog;
//                     }.bind(this)
//                   );
//                 }
//                 this.pDialog.then((oDialog) => {
//                   oDialog.setBindingContext(
//                     this.getView().getModel("employeeModel").createBindingContext(),
//                     "employeeModel"
//                   );
//                   oDialog.open();
//                 });
//               },
        
//               onAddEmployee: function () {
//                 var oEmployeeData = this.getView().getModel("employeeModel").getData();
        
//                 // console.log("Adding employee:", oEmployeeData);
        
//                 let url =
//                   this.getOwnerComponent().getModel("oDaModel").getServiceUrl() +
//                   "Employees";
        
//                 if (oEmployeeData.Employee_Id && oEmployeeData.Employee_Last_Name && (/^\d{10}$/.test(oEmployeeData.Employee_Phone_Number))) {
//                   $.ajax({
//                     method: "POST",
//                     url: url,
//                     contentType: "application/json",
//                     data: JSON.stringify(oEmployeeData),
//                     success: function () {
//                       // console.log("Data Saved in OData Service");
//                       MessageBox.success("Employee Added ");
//                       this.getView().getModel("employeeModel").setData({
//                         Employee_Id: "",
//                         Employee_First_Name: "",
//                         Employee_Last_Name: "",
//                         Employee_Phone_Number: "",
//                         Employee_Department_ID: "",
//                       });
//                     },
//                     error: function (error) {
//                       MessageBox.error(error);
//                       that.getView().getModel("employeeModel").setData({
//                         Employee_Id: "",
//                         Employee_First_Name: "",
//                         Employee_Last_Name: "",
//                         Employee_Phone_Number: "",
//                         Employee_Department_ID: "",
//                       });
//                     },
//                   });
//                 } else {
//                   MessageBox.error("Error");
//                 }
        
//                 this.onCancelAddEmployee();
//               },
        
//               onCancelAddEmployee: function () {
//                 this.byId("addEmployeeDialog").close();
//               },
        
//             // onAddEmp: function () {
//             //     var oDialog = new Dialog({
//             //         title: "Add Employee",
//             //         beginButton: new Button({
//             //             text: "Add",
//             //             press: function () {
//             //                 // Handle registration logic

//             //                 let empId = sap.ui.getCore().byId("empId").getValue()
//             //                 let empFName = sap.ui.getCore().byId("empFirstName").getValue()
//             //                 let empLName = sap.ui.getCore().byId("empLastName").getValue()
//             //                 let empPhno = sap.ui.getCore().byId("empPhoneNumber").getValue()
//             //                 let empDep = sap.ui.getCore().byId("empDepartmentId").getValue()

//             //                 let oEmployee = {
//             //                     "Employee_Id": empId,
//             //                     "Employee_First_Name": empFName,
//             //                     "Employee_Last_Name": empLName,
//             //                     "Employee_Full_Name": empFName + " " + empLName,
//             //                     "Employee_Phone_Number": empPhno,
//             //                     "Employee_Department_ID": empDep
//             //                 };

//             //                 //pending for post Data to the OData Service
//             //                 console.log(oEmployee);
//             //                 jQuery.ajax({
//             //                     method: "POST",
//             //                     url: "https://port4004-workspaces-ws-wt95r.us10.trial.applicationstudio.cloud.sap/odata/v4/company/Employees",
//             //                     contentType: "application/json",
//             //                     data: JSON.stringify(oEmployee),
//             //                     success: function () {
//             //                         console.log('Data Saved in to Odata Service');
//             //                     },
//             //                     error: function (error) {
//             //                         console.log(error);
//             //                     }

//             //                 })



//             //                 oDialog.close();
//             //             }
//             //         }),
//             //         endButton: new Button({
//             //             text: "Cancel",
//             //             press: function () {
//             //                 oDialog.close();
//             //             }
//             //         }),
//             //         content: [
//             //             new Text({ text: "Employee ID:" }),
//             //             new Input("empId"),
//             //             new Text({ text: "Employee First Name:" }),
//             //             new Input("empFirstName"),
//             //             new Text({ text: "Employee Last Name:" }),
//             //             new Input("empLastName"),
//             //             new Text({ text: "Employee Phone Number:" }),
//             //             new Input("empPhoneNumber"),
//             //             new Text({ text: "Employee Department Id:" }),
//             //             new Input("empDepartmentId"),

                        
//             //         ],
                    
//             //     });
//             //     oDialog.addStyleClass("myCustomDialog");

//             //     oDialog.open();
//             // },




//             // onSearchEmployee: function (oEvent) {
//             //     const aFilter = [];
//             //     const sQuery = oEvent.getParameter("query");
//             //     console.log(sQuery);
//             //     if (sQuery) {
//             //         aFilter.push(new Filter("Employee_Id", FilterOperator.Contains, sQuery));
//             //     }

//             //     // filter binding
//             //     const oList = this.byId("EmployeesList");
//             //     const oBinding = oList.getBinding("items");
//             //     oBinding.filter(aFilter);
//             // },



//             onSearchEmployee: function (oEvent) {
//                 const sQuery = oEvent.getParameter("query");
//                 const aFilters = [];
            
//                 if (sQuery) {
//                     const oIdFilter = new sap.ui.model.Filter("Employee_Id", sap.ui.model.FilterOperator.Contains, sQuery);
//                     const oNameFilter = new sap.ui.model.Filter("Employee_Full_Name", sap.ui.model.FilterOperator.Contains, sQuery);
            
//                     aFilters.push(new sap.ui.model.Filter({
//                         filters: [oIdFilter, oNameFilter],
//                         and: false // Use 'or' condition between the filters
//                     }));
//                 }
            
//                 // Get the list control by its ID
//                 const oList = this.byId("EmployeesList");
            
//                 // Apply the filter to the list binding
//                 oList.getBinding("items").filter(aFilters);
//             },

//             onEmployeeDepartmentValueHelp: function (oEvent) {
//                 if (!this._oValueHelpDialog) {
//                   this._oValueHelpDialog = Fragment.load({
//                     id: this.getView().getId(),
//                     name: "companyui.view.ValueHelp",
//                     controller: this,
//                   }).then(
//                     function (oDialog) {
//                       this.getView().addDependent(oDialog);
//                       return oDialog;
//                     }.bind(this)
//                   );
//                 }
//                 this._oValueHelpDialog.then((oDialog) => {
//                   oDialog.open();
//                 });
//               },
//               _onValueHelpConfirmPress: function (oEvent) {
//                 var oSelectedItem = oEvent.getParameter("selectedItem");
//                 let empDepartment = this.getView().byId("empDepartmentId");
        
//                 if (oSelectedItem) {
//                   var sSelectedDepartmentId = oSelectedItem.getTitle();
        
//                   empDepartment.setValue(sSelectedDepartmentId);
        
//                   // console.log("Selected Department ID:", sSelectedDepartmentId);
//                 }
//               },
//         });
//     });




// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/ui/core/Fragment",
//     "sap/m/MessageBox",
//   ],
//   /**
//    * @param {typeof sap.ui.core.mvc.Controller} Controller
//    */
//   function (
//     Controller,
//     JSONModel,
//     Filter,
//     FilterOperator,
//     Fragment,
//     MessageBox
//   ) {
//         "use strict";

//         return Controller.extend("companyui.controller.EmployeesList", {
//             onInit: function () {
//                 var oModel = new JSONModel({
//                   Employee_Id: "",
//                   Employee_First_Name: "",
//                   Employee_Last_Name: "",
//                   Employee_Phone_Number: "",
//                   Employee_Department_ID: "",
//                 });
        
//                 let AllEmployeeModel = new JSONModel();
        
//                 this.getView().setModel(oModel, "employeeModel");
//                 this.getView().setModel(AllEmployeeModel, "EmployeesModel");
        
//                 var that = this;
        
//                 jQuery.ajax({
//                     method: "GET",
//                     url: this.getOwnerComponent().getModel("oDaModel").getServiceUrl() + "Employees",
//                     success: (data) => {
//                         var oModel = new JSONModel();
//                         oModel.setData({ Employees: data.value });
//                         that.getView().setModel(oModel, "employeeModel");
//                         var oModelGlobal = that.getView().getModel("companyList");
//                         oModelGlobal.setProperty("/emparr", data.value);
//                     },
//                     error: (error) => {
//                         console.log(error);
//                     }
//                 });
//             },
//             onNavBack: function () {
//                 const oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo('RouteHome')
//             },
//             onSelect: function (oEvent) {
//                 let Emp_Id = oEvent.getSource().getTitle()
//                 console.log(Emp_Id);
//                 let oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("EmployeeDetails", { EmployeeId: Emp_Id });
//             },
//             onAddEmp: function () {
//                 if (!this.pDialog) {
//                   this.pDialog = Fragment.load({
//                     id: this.getView().getId(),
//                     name: "companyui.view.AddEmployeeDialog",
//                     controller: this,
//                   }).then(
//                     function (oDialog) {
//                       this.getView().addDependent(oDialog);
//                       return oDialog;
//                     }.bind(this)
//                   );
//                 }
//                 this.pDialog.then((oDialog) => {
//                   oDialog.setBindingContext(
//                     this.getView().getModel("employeeModel").createBindingContext(),
//                     "employeeModel"
//                   );
//                   oDialog.open();
//                 });
//             },
//             onAddEmployee: function () {
//                 var oEmployeeData = this.getView().getModel("employeeModel").getData();
        
//                 let url =
//                   this.getOwnerComponent().getModel("oDaModel").getServiceUrl() +
//                   "Employees";
        
//                 if (oEmployeeData.Employee_Id && oEmployeeData.Employee_Last_Name && (/^\d{10}$/.test(oEmployeeData.Employee_Phone_Number))) {
//                   $.ajax({
//                     method: "POST",
//                     url: url,
//                     contentType: "application/json",
//                     data: JSON.stringify(oEmployeeData),
//                     success: function () {
//                       MessageBox.success("Employee Added ");
//                       this.getView().getModel("employeeModel").setData({
//                         Employee_Id: "",
//                         Employee_First_Name: "",
//                         Employee_Last_Name: "",
//                         Employee_Phone_Number: "",
//                         Employee_Department_ID: "",
//                       });
//                     }.bind(this),
//                     error: function (error) {
//                       MessageBox.error(error);
//                       this.getView().getModel("employeeModel").setData({
//                         Employee_Id: "",
//                         Employee_First_Name: "",
//                         Employee_Last_Name: "",
//                         Employee_Phone_Number: "",
//                         Employee_Department_ID: "",
//                       });
//                     }.bind(this),
//                   });
//                 } else {
//                   MessageBox.error("Error");
//                 }
//                 this.onCancelAddEmployee();
//             },
//             onCancelAddEmployee: function () {
//                 this.byId("addEmployeeDialog").close();
//             },
//             onSearchEmployee: function (oEvent) {
//                 const sQuery = oEvent.getParameter("query");
//                 const aFilters = [];
            
//                 if (sQuery) {
//                     const oIdFilter = new sap.ui.model.Filter("Employee_Id", sap.ui.model.FilterOperator.Contains, sQuery);
//                     const oNameFilter = new sap.ui.model.Filter("Employee_Full_Name", sap.ui.model.FilterOperator.Contains, sQuery);
            
//                     aFilters.push(new sap.ui.model.Filter({
//                         filters: [oIdFilter, oNameFilter],
//                         and: false // Use 'or' condition between the filters
//                     }));
//                 }
            
//                 // Get the list control by its ID
//                 const oList = this.byId("EmployeesList");
            
//                 // Apply the filter to the list binding
//                 oList.getBinding("items").filter(aFilters);
//             },
//             onEmployeeDepartmentValueHelp: function (oEvent) {
//                 if (!this._oValueHelpDialog) {
//                   this._oValueHelpDialog = Fragment.load({
//                     id: this.getView().getId(),
//                     name: "companyui.view.ValueHelp",
//                     controller: this,
//                   }).then(
//                     function (oDialog) {
//                       this.getView().addDependent(oDialog);
//                       return oDialog;
//                     }.bind(this)
//                   );
//                 }
//                 this._oValueHelpDialog.then((oDialog) => {
//                   oDialog.open();
//                 });
//             },
//             _onValueHelpConfirmPress: function (oEvent) {
//                 var oSelectedItem = oEvent.getParameter("selectedItem");
//                 let empDepartment = this.getView().byId("empDepartmentId");
        
//                 if (oSelectedItem) {
//                   var sSelectedDepartmentId = oSelectedItem.getTitle();
        
//                   empDepartment.setValue(sSelectedDepartmentId);
//                 }
//             },
//         });
// });




// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/ui/core/Fragment",
//     "sap/m/MessageBox",
//   ],
//   /**
//    * @param {typeof sap.ui.core.mvc.Controller} Controller
//    */
//   function (
//     Controller,
//     JSONModel,
//     Filter,
//     FilterOperator,
//     Fragment,
//     MessageBox
//   ) {
//         "use strict";

//         return Controller.extend("companyui.controller.EmployeesList", {
//             onInit: function () {
//                 var oModel = new JSONModel({
//                   Employee_Id: "",
//                   Employee_First_Name: "",
//                   Employee_Last_Name: "",
//                   Employee_Phone_Number: "",
//                   Employee_Department_ID: "",
//                 });
        
//                 let AllEmployeeModel = new JSONModel();
        
//                 this.getView().setModel(oModel, "employeeModel");
//                 this.getView().setModel(AllEmployeeModel, "EmployeesModel");
        
//                 var that = this;
        
//                 jQuery.ajax({
//                     method: "GET",
//                     url: this.getOwnerComponent().getModel("oDaModel").getServiceUrl() + "Employees",
//                     success: (data) => {
//                         var oModel = new JSONModel();
//                         oModel.setData({ Employees: data.value });
//                         that.getView().setModel(oModel, "employeeModel");
//                         var oModelGlobal = that.getView().getModel("companyList");
//                         oModelGlobal.setProperty("/emparr", data.value);
//                     },
//                     error: (error) => {
//                         console.log(error);
//                     }
//                 });
//             },
//             onNavBack: function () {
//                 const oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo('RouteHome')
//             },
//             onSelect: function (oEvent) {
//                 let Emp_Id = oEvent.getSource().getTitle()
//                 console.log(Emp_Id);
//                 let oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("EmployeeDetails", { EmployeeId: Emp_Id });
//             },
//             onAddEmp: function () {
//                 if (!this.pDialog) {
//                   this.pDialog = Fragment.load({
//                     id: this.getView().getId(),
//                     name: "companyui.view.AddEmployeeDialog",
//                     controller: this,
//                   }).then(
//                     function (oDialog) {
//                       this.getView().addDependent(oDialog);
//                       return oDialog;
//                     }.bind(this)
//                   );
//                 }
//                 this.pDialog.then((oDialog) => {
//                   oDialog.setBindingContext(
//                     this.getView().getModel("employeeModel").createBindingContext(),
//                     "employeeModel"
//                   );
//                   oDialog.open();
//                 });
//             },
//             // onAddEmployee: function () {
//             //     var oEmployeeData = this.getView().getModel("employeeModel").getData();
//             //     console.log(oEmployeeData);
        
//             //     let url =
//             //       this.getOwnerComponent().getModel("oDaModel").getServiceUrl() +
//             //       "Employees";
        
//             //     if (oEmployeeData.Employee_Id && oEmployeeData.Employee_Last_Name && (/^\d{10}$/.test(oEmployeeData.Employee_Phone_Number))) {
//             //       $.ajax({
//             //         method: "POST",
//             //         url: url,
//             //         contentType: "application/json",
//             //         data: JSON.stringify(oEmployeeData),
//             //         success: () => {
//             //           MessageBox.success("Employee Added ");
//             //           this.getView().getModel("employeeModel").setData({
//             //             Employee_Id: "",
//             //             Employee_First_Name: "",
//             //             Employee_Last_Name: "",
//             //             Employee_Phone_Number: "",
//             //             Employee_Department_ID: "",
//             //           });
//             //         },
//             //         error: (error) => {
//             //           MessageBox.error(error);
//             //           this.getView().getModel("employeeModel").setData({
//             //             Employee_Id: "",
//             //             Employee_First_Name: "",
//             //             Employee_Last_Name: "",
//             //             Employee_Phone_Number: "",
//             //             Employee_Department_ID: "",
//             //           });
//             //         },
//             //       });
//             //     } else {
//             //       MessageBox.error("Error");
//             //     }
//             //     this.onCancelAddEmployee();
//             // },

//             onAddEmployee: function () {
//               var oEmployeeData = this.getView().getModel("employeeModel").getData();
//               console.log(oEmployeeData);
          
//               let url =
//                   this.getOwnerComponent().getModel("oDaModel").getServiceUrl() +
//                   "Employees";
          
//               var payload = {
//                   "Employee_Id": oEmployeeData.Employee_Id,
//                   "Employee_First_Name": oEmployeeData.Employee_First_Name,
//                   "Employee_Last_Name": oEmployeeData.Employee_Last_Name,
//                   "Employee_Phone_Number": oEmployeeData.Employee_Phone_Number,
//                   "Employee_Department_ID": oEmployeeData.Employee_Department_ID
//               };
          
//               if (payload.Employee_Id && payload.Employee_Last_Name && (/^\d{10}$/.test(payload.Employee_Phone_Number))) {
//                   $.ajax({
//                       method: "POST",
//                       url: url,
//                       contentType: "application/json",
//                       data: JSON.stringify(payload),
//                       success: () => {
//                           MessageBox.success("Employee Added ");
//                           this.getView().getModel("employeeModel").setData({
//                               Employee_Id: "",
//                               Employee_First_Name: "",
//                               Employee_Last_Name: "",
//                               Employee_Phone_Number: "",
//                               Employee_Department_ID: "",
//                           });
//                       },
//                       error: (error) => {
//                           MessageBox.error(error);
//                           this.getView().getModel("employeeModel").setData({
//                               Employee_Id: "",
//                               Employee_First_Name: "",
//                               Employee_Last_Name: "",
//                               Employee_Phone_Number: "",
//                               Employee_Department_ID: "",
//                           });
//                       },
//                   });
//               } else {
//                   MessageBox.error("Error");
//               }
//               this.onCancelAddEmployee();
//           },
          
//             onCancelAddEmployee: function () {
//                 this.byId("addEmployeeDialog").close();
//             },
//             onSearchEmployee: function (oEvent) {
//                 const sQuery = oEvent.getParameter("query");
//                 const aFilters = [];
            
//                 if (sQuery) {
//                     const oIdFilter = new sap.ui.model.Filter("Employee_Id", sap.ui.model.FilterOperator.Contains, sQuery);
//                     const oNameFilter = new sap.ui.model.Filter("Employee_Full_Name", sap.ui.model.FilterOperator.Contains, sQuery);
            
//                     aFilters.push(new sap.ui.model.Filter({
//                         filters: [oIdFilter, oNameFilter],
//                         and: false // Use 'or' condition between the filters
//                     }));
//                 }
            
//                 // Get the list control by its ID
//                 const oList = this.byId("EmployeesList");
            
//                 // Apply the filter to the list binding
//                 oList.getBinding("items").filter(aFilters);
//             },
//             onEmployeeDepartmentValueHelp: function (oEvent) {
//                 if (!this._oValueHelpDialog) {
//                   this._oValueHelpDialog = Fragment.load({
//                     id: this.getView().getId(),
//                     name: "companyui.view.ValueHelp",
//                     controller: this,
//                   }).then(
//                     function (oDialog) {
//                       this.getView().addDependent(oDialog);
//                       return oDialog;
//                     }.bind(this)
//                   );
//                 }
//                 this._oValueHelpDialog.then((oDialog) => {
//                   oDialog.open();
//                 });
//             },
//             _onValueHelpConfirmPress: function (oEvent) {
//                 var oSelectedItem = oEvent.getParameter("selectedItem");
//                 let empDepartment = this.getView().byId("empDepartmentId");
        
//                 if (oSelectedItem) {
//                   var sSelectedDepartmentId = oSelectedItem.getTitle();
        
//                   empDepartment.setValue(sSelectedDepartmentId);
//                 }
//             },
//         });
// });




// sap.ui.define([
//   "sap/ui/core/mvc/Controller",
//   "sap/ui/model/json/JSONModel",
//   "sap/ui/model/Filter",
//   "sap/ui/model/FilterOperator",
//   "sap/ui/core/Fragment",
//   "sap/m/MessageBox"
// ], function(
//   Controller,
//   JSONModel,
//   Filter,
//   FilterOperator,
//   Fragment,
//   MessageBox
// ) {
//   "use strict";

//   return Controller.extend("companyui.controller.EmployeesList", {
//       onInit: async function() {
//           this.getView().setModel(new JSONModel({
//               Employee_Id: "",
//               Employee_First_Name: "",
//               Employee_Last_Name: "",
//               Employee_Phone_Number: "",
//               Employee_Department_ID: ""
//           }), "employeeModel");

//           try {
//               const response = await fetch(`${this.getOwnerComponent().getModel("oDaModel").getServiceUrl()}Employees`);
//               const data = await response.json();
//               this.getView().setModel(new JSONModel({ Employees: data.value }), "employeeModel");
//               this.getView().getModel("companyList").setProperty("/emparr", data.value);
//           } catch (error) {
//               console.error(error);
//           }
//       },

//       onNavBack: function() {
//           this.getOwnerComponent().getRouter().navTo('RouteHome');
//       },

//       onSelect: function(oEvent) {
//           const Emp_Id = oEvent.getSource().getTitle();
//           this.getOwnerComponent().getRouter().navTo("EmployeeDetails", { EmployeeId: Emp_Id });
//       },

//       onAddEmp: async function() {
//           if (!this.pDialog) {
//               this.pDialog = await Fragment.load({
//                   id: this.getView().getId(),
//                   name: "companyui.view.AddEmployeeDialog",
//                   controller: this
//               });

//               this.getView().addDependent(this.pDialog);
//           }

//           this.pDialog.open();
//       },

//       onAddEmployee: async function() {
//           const oEmployeeData = this.getView().getModel("employeeModel").getData();
//           const url = `${this.getOwnerComponent().getModel("oDaModel").getServiceUrl()}Employees`;

//           const payload = {
//               "Employee_Id": oEmployeeData.Employee_Id,
//               "Employee_First_Name": oEmployeeData.Employee_First_Name,
//               "Employee_Last_Name": oEmployeeData.Employee_Last_Name,
//               "Employee_Phone_Number": oEmployeeData.Employee_Phone_Number,
//               "Employee_Department_ID": oEmployeeData.Employee_Department_ID
//           };






          
//           if (payload.Employee_Id && payload.Employee_Last_Name && (/^\d{10}$/.test(payload.Employee_Phone_Number))) {
//               try {
//                   const response = await fetch(url, {
//                       method: "POST",
//                       headers: {
//                           "Content-Type": "application/json"
//                       },
//                       body: JSON.stringify(payload)
//                   });

//                   if (response.ok) {
//                       MessageBox.success("Employee Added ");
//                     //   this.getView().getModel("employeeModel").setData({
//                     //       Employee_Id: "",
//                     //       Employee_First_Name: "",
//                     //       Employee_Last_Name: "",
//                     //       Employee_Phone_Number: "",
//                     //       Employee_Department_ID: ""
//                     //   });
//                   } else {
//                       const errorMessage = await response.text();
//                       MessageBox.error(errorMessage);
//                   }
//               } catch (error) {
//                   MessageBox.error(error.message);
//               }
//           } else {
//               MessageBox.error("Invlid Input");
//           }

//           this.onCancelAddEmployee();
//       },

//       onCancelAddEmployee: function() {
//           this.byId("addEmployeeDialog").close();
//       },

//       onSearchEmployee: function(oEvent) {
//           const sQuery = oEvent.getParameter("query");
//           const aFilters = [];

//           if (sQuery) {
//               const oIdFilter = new sap.ui.model.Filter("Employee_Id", sap.ui.model.FilterOperator.Contains, sQuery);
//               const oNameFilter = new sap.ui.model.Filter("Employee_Full_Name", sap.ui.model.FilterOperator.Contains, sQuery);

//               aFilters.push(new sap.ui.model.Filter({
//                   filters: [oIdFilter, oNameFilter],
//                   and: false // Use 'or' condition between the filters
//               }));
//           }

//           const oList = this.byId("EmployeesList");
//           oList.getBinding("items").filter(aFilters);
//       },

//       onEmployeeDepartmentValueHelp: async function() {
//           if (!this._oValueHelpDialog) {
//               this._oValueHelpDialog = await Fragment.load({
//                   id: this.getView().getId(),
//                   name: "companyui.view.ValueHelp",
//                   controller: this
//               });

//               this.getView().addDependent(this._oValueHelpDialog);
//           }

//           this._oValueHelpDialog.open();
//       },

//       _onValueHelpConfirmPress: function(oEvent) {
//           const oSelectedItem = oEvent.getParameter("selectedItem");
//           const empDepartment = this.getView().byId("empDepartmentId");

//           if (oSelectedItem) {
//               const sSelectedDepartmentId = oSelectedItem.getTitle();
//               empDepartment.setValue(sSelectedDepartmentId);
//           }
//       }
//   });
// });






// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/ui/core/Fragment",
//     "sap/m/MessageBox",
//   ],
//   /**
//    * @param {typeof sap.ui.core.mvc.Controller} Controller
//    */
//   function (
//     Controller,
//     JSONModel,
//     Filter,
//     FilterOperator,
//     Fragment,
//     MessageBox
//   ) {
//     "use strict";

//     return Controller.extend("companyui.controller.EmployeesList", {
//       onInit: function () {
//         var oModel = new JSONModel({
//           Employee_Id: "",
//           Employee_First_Name: "",
//           Employee_Last_Name: "",
//           Employee_Phone_Number: "",
//           Employee_Department_ID: "",
//         });

//         let AllEmployeeModel = new JSONModel();

//         this.getView().setModel(oModel, "employeeModel");
//         this.getView().setModel(AllEmployeeModel, "EmployeesModel");

//         var that = this;

//         let url =
//           this.getOwnerComponent().getModel("oDaModel").getServiceUrl() +
//           "Employees";
//         $.ajax({
//           method: "GET",
//           url: url,
//           contentType: "application/json",
//           success: function (data) {
//             // console.log(data);
//             that.getView().getModel("EmployeesModel").setData(data.value);
//           },
//           error: function (error) {
//             console.log(error);
//           },
//         });
//       },
//       onNavBack: function () {
//         const oRouter = this.getOwnerComponent().getRouter();
//         oRouter.navTo("RouteHome");
//       },
//       onSelect: function (oEvent) {
//         let Emp_Id = oEvent.getSource().getTitle();
//         // console.log(Emp_Id);
//         let oRouter = this.getOwnerComponent().getRouter();
//         // console.log(oRouter);
//         oRouter.navTo("EmployeeDetails", { EmployeeId: Emp_Id });
//       },
//       onAddEmp: function () {
//         if (!this.pDialog) {
//           this.pDialog = Fragment.load({
//             id: this.getView().getId(),
//             name: "companyui.view.AddEmployeeDialog",
//             controller: this,
//           }).then(
//             function (oDialog) {
//               this.getView().addDependent(oDialog);
//               return oDialog;
//             }.bind(this)
//           );
//         }
//         this.pDialog.then((oDialog) => {
//           oDialog.setBindingContext(
//             this.getView().getModel("employeeModel").createBindingContext(),
//             "employeeModel"
//           );
//           oDialog.open();
//         });
//       },

//       onAddEmployee: function () {
//         var oEmployeeData = this.getView().getModel("employeeModel").getData();
//         var aMessages = [];
    
//         if (!oEmployeeData.Employee_Id) {
//             aMessages.push({
//                 type: "Error",
//                 title: "Employee ID Missing",
//                 description: "Please enter Employee ID",
//             });
//         }
//         if (!oEmployeeData.Employee_Last_Name) {
//             aMessages.push({
//                 type: "Error",
//                 title: "Last Name Missing",
//                 description: "Please enter Last Name",
//             });
//         }
//         if (!oEmployeeData.Employee_First_Name) {
//             aMessages.push({
//                 type: "Error",
//                 title: "First Name Missing",
//                 description: "Please enter First Name",
//             });
//         }
//         if (!/^\d{10}$/.test(oEmployeeData.Employee_Phone_Number)) {
//             aMessages.push({
//                 type: "Error",
//                 title: "Invalid Phone Number",
//                 description: "Please enter a valid 10-digit phone number",
//             });
//         }
    
//         if (aMessages.length > 0) {
//             this.showMessagePopover(aMessages);
//         } else {
//             // Check if Employee ID is unique
//             var url = this.getOwnerComponent().getModel("oDaModel").getServiceUrl() + "Employees";
//              var uniqueId = oEmployeeData.Employee_Id;
//            // var uniqueId=0
    
//             $.ajax({
//                 method: "GET",
//                 url: url + "?$filter=Employee_Id eq '" + uniqueId + "'",
//                 success: function (data) {
//                     //console.log(data.value);
//                     if (data.value && data.length > 0) {
//                         // Employee ID already exists
//                         this.showMessagePopover([{
//                             type: "Error",
//                             title: "Duplicate Employee ID",
//                             description: "Employee ID already exists. Please enter a unique Employee ID.",
//                         }]);
//                     } else {
//                         // Adding the employee
//                         this.addEmployee(oEmployeeData);
//                     }
//                 }.bind(this),
//                 error: function (error) {
//                     MessageBox.error("Error checking Employee ID uniqueness: " + error);
//                 }
//             });
//         }
//     },
    
//     showMessagePopover: function (aMessages) {
//         var oMessageModel = new sap.ui.model.json.JSONModel();
//         oMessageModel.setData({ messages: aMessages });
//         var oMessagePopover = new sap.m.MessagePopover({
//             items: {
//                 path: "/messages",
//                 template: new sap.m.MessagePopoverItem({
//                     type: "{type}",
//                     title: "{title}",
//                     description: "{description}",
//                 }),
//             },
//         });
//         oMessagePopover.setModel(oMessageModel);
//         var oParentControl = this.getView().byId("addEmployeeButton");
//         if (oParentControl) {
//             oMessagePopover.toggle(oParentControl);
//         } else {
//             console.error("Parent control not found");
//         }
//     },
    
//     addEmployee: function (oEmployeeData) {
//         var url = this.getOwnerComponent().getModel("oDaModel").getServiceUrl() + "Employees";
    
//         $.ajax({
//             method: "POST",
//             url: url,
//             contentType: "application/json",
//             data: JSON.stringify(oEmployeeData),
//             success: function () {
//                 MessageBox.success("Employee Added ");
//                 this.clearEmployeeData();
//             }.bind(this),
//             error: function (error) {
//                 // MessageBox.error(error);
//                 // this.clearEmployeeData();
//                 this.showMessagePopover([{
//                     type: "Error",
//                     title: "API Error",
//                     description: error.responseJSON.error.message,
//                 }]);
//             }.bind(this),
//         });
//     },
    
//     clearEmployeeData: function () {
//         this.getView().getModel("employeeModel").setData({
//             Employee_Id: "",
//             Employee_First_Name: "",
//             Employee_Last_Name: "",
//             Employee_Phone_Number: "",
//             Employee_Department_ID: "",
//         });
//     },
    

//       onCancelAddEmployee: function () {
//         this.byId("addEmployeeDialog").close();
//       },

//       onSearchEmployee: function (oEvent) {
//         const aFilter = [];
//         const sQuery = oEvent.getParameter("query");
//         if (sQuery) {
//           const oEmployeeIdFilter = new Filter(
//             "Employee_Id",
//             FilterOperator.Contains,
//             sQuery
//           );
//           aFilter.push(oEmployeeIdFilter);

//           const oEmployeeNameFilter = new Filter(
//             "Employee_Full_Name",
//             FilterOperator.Contains,
//             sQuery
//           );
//           aFilter.push(oEmployeeNameFilter);
//         }

//         const oCombinedFilter = new Filter(aFilter, false);
//         // filter binding
//         const oList = this.byId("EmployeesList");
//         const oBinding = oList.getBinding("items");
//         oBinding.filter(oCombinedFilter);
//       },

//       onEmployeeDepartmentValueHelp: function () {
//         if (!this._oValueHelpDialog) {
//           this._oValueHelpDialog = Fragment.load({
//             id: this.getView().getId(),
//             name: "companyui.view.ValueHelp",
//             controller: this,
//           }).then(
//             function (oDialog) {
//               this.getView().addDependent(oDialog);
//               return oDialog;
//             }.bind(this)
//           );
//         }
//         this._oValueHelpDialog.then((oDialog) => {
//           oDialog.open();
//         });
//       },
//       _onValueHelpConfirmPress: function (oEvent) {
//         var oSelectedItem = oEvent.getParameter("selectedItem");
//         let empDepartment = this.getView().byId("empDepartmentId");

//         if (oSelectedItem) {
//           var sSelectedDepartmentId = oSelectedItem.getTitle();

//           empDepartment.setValue(sSelectedDepartmentId);
//         }
//       },
//     });
//   }
// );







sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator",
      "sap/ui/core/Fragment",
      "sap/m/MessageBox",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
      Controller,
      JSONModel,
      Filter,
      FilterOperator,
      Fragment,
      MessageBox
    ) {
      "use strict";
  
      return Controller.extend("companyui.controller.EmployeesList", {
        onInit: function () {
          var oModel = new JSONModel({
            Employee_Id: "",
            Employee_First_Name: "",
            Employee_Last_Name: "",
            Employee_Phone_Number: "",
            Employee_Department_ID: "",
          });
  
          let AllEmployeeModel = new JSONModel();
  
          this.getView().setModel(oModel, "employeeModel");
          this.getView().setModel(AllEmployeeModel, "EmployeesModel");
  
          var that = this;
  
          let url =
            this.getOwnerComponent().getModel("oDaModel").getServiceUrl() +
            "Employees";
          $.ajax({
            method: "GET",
            url: url,
            contentType: "application/json",
            success: function (data) {
              // console.log(data);
              that.getView().getModel("EmployeesModel").setData(data.value);
            },
            error: function (error) {
              console.log(error);
            },
          });
        },
        onNavBack: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");
        },
        onSelect: function (oEvent) {
          let Emp_Id = oEvent.getSource().getTitle();
          // console.log(Emp_Id);
          let oRouter = this.getOwnerComponent().getRouter();
          // console.log(oRouter);
          oRouter.navTo("EmployeeDetails", { EmployeeId: Emp_Id });
        },
        onAddEmp: function () {
          if (!this.pDialog) {
            this.pDialog = Fragment.load({
              id: this.getView().getId(),
              name: "companyui.view.AddEmployeeDialog",
              controller: this,
            }).then(
              function (oDialog) {
                this.getView().addDependent(oDialog);
                return oDialog;
              }.bind(this) 
            ); 
          }
//bind(this) is a method used to set the value of 'this' explicitly within a function in JavaScript
//inside the callback function passed to 'then', 'this' might refer to the global object (in non-strict mode) or undefined (in strict mode) if bind(this) isn't used. This happens because 'then' invokes the callback function without any context, causing this to lose its original context (which is the controller object).
//we can do the code without using .bind(this), but in the outer context we have to assign that=this, and in place of this use that
          this.pDialog.then((oDialog) => {
            oDialog.setBindingContext(
              this.getView().getModel("employeeModel").createBindingContext(),
              "employeeModel"
            );
            oDialog.open();
          });
        },
  
        onAddEmployee: function () {
          var oEmployeeData = this.getView().getModel("employeeModel").getData();
          var aMessages = [];
      
          if (!oEmployeeData.Employee_Id) {
              aMessages.push({
                  type: "Error",
                  title: "Employee ID Missing",
                  description: "Please enter Employee ID",
              });
          }
          if (!oEmployeeData.Employee_Last_Name) {
              aMessages.push({
                  type: "Error",
                  title: "Last Name Missing",
                  description: "Please enter Last Name",
              });
          }
          if (!oEmployeeData.Employee_First_Name) {
              aMessages.push({
                  type: "Error",
                  title: "First Name Missing",
                  description: "Please enter First Name",
              });
          }
          if (!/^\d{10}$/.test(oEmployeeData.Employee_Phone_Number)) {
              aMessages.push({
                  type: "Error",
                  title: "Invalid Phone Number",
                  description: "Please enter a valid 10-digit phone number",
              });
          }
      
          if (aMessages.length > 0) {
              this.showMessagePopover(aMessages);
          } else {
              // Check if Employee ID is unique
              var url = this.getOwnerComponent().getModel("oDaModel").getServiceUrl() + "Employees";
               var uniqueId = oEmployeeData.Employee_Id;
             // var uniqueId=0
      
              $.ajax({
                  method: "GET",
                  url: url + "?$filter=Employee_Id eq '" + uniqueId + "'",
                  success: function (data) {
                      //console.log(data.value);
                     // if (data.value && data.value.length > 0) {
                      if(data.value  && data.length > 0){
                          // Employee ID already exists
                          this.showMessagePopover([{
                              type: "Error",
                              title: "Duplicate Employee ID",
                              description: "Employee ID already exists. Please enter a unique Employee ID.",
                          }]);
                      } else {
                          // Adding the employee
                          this.addEmployee(oEmployeeData);
                      }
                  }.bind(this),
                  error: function (error) {
                      MessageBox.error("Error checking Employee ID uniqueness: " + error);
                  }
              });
          }
      },
      
      showMessagePopover: function (aMessages) {
          var oMessageModel = new sap.ui.model.json.JSONModel();
          oMessageModel.setData({ messages: aMessages });
          var oMessagePopover = new sap.m.MessagePopover({
              items: {
                  path: "/messages",
                  template: new sap.m.MessagePopoverItem({
                      type: "{type}",
                      title: "{title}",
                      description: "{description}",
                  }),
              },
          });
          oMessagePopover.setModel(oMessageModel);
          var oParentControl = this.getView().byId("addEmployeeButton");
          if (oParentControl) {
              oMessagePopover.toggle(oParentControl);
          } else {
              console.error("Parent control not found");
          }
      },
      
      addEmployee: function (oEmployeeData) {
          var url = this.getOwnerComponent().getModel("oDaModel").getServiceUrl() + "Employees";
      
          $.ajax({
              method: "POST",
              url: url,
              contentType: "application/json",
              data: JSON.stringify(oEmployeeData),
              success: function () {
                  MessageBox.success("Employee Added ");
                  this.clearEmployeeData();
              }.bind(this),
              error: function (error) {
                  // MessageBox.error(error);
                  // this.clearEmployeeData();
                  this.showMessagePopover([{
                      type: "Error",
                      title: "API Error",
                      description: error.responseJSON.error.message,
                  }]);
              }.bind(this),
          });
      },
      
      clearEmployeeData: function () {
          this.getView().getModel("employeeModel").setData({
              Employee_Id: "",
              Employee_First_Name: "",
              Employee_Last_Name: "",
              Employee_Phone_Number: "",
              Employee_Department_ID: "",
          });
      },
      
  
        onCancelAddEmployee: function () {
          this.byId("addEmployeeDialog").close();
        },
  
        onSearchEmployee: function (oEvent) {
          const aFilter = [];
          const sQuery = oEvent.getParameter("query");
          if (sQuery) {
            const oEmployeeIdFilter = new Filter(
              "Employee_Id",
              FilterOperator.Contains,
              sQuery
            );
            aFilter.push(oEmployeeIdFilter);
  
            const oEmployeeNameFilter = new Filter(
              "Employee_Full_Name",
              FilterOperator.Contains,
              sQuery
            );
            aFilter.push(oEmployeeNameFilter);
          }
  
          const oCombinedFilter = new Filter(aFilter, false);
          // filter binding
          const oList = this.byId("EmployeesList");
          const oBinding = oList.getBinding("items");
          oBinding.filter(oCombinedFilter);
        },
  
        onEmployeeDepartmentValueHelp: function () {
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
          }
        },
      });
    }
  );
  
  
