

// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
// ],
//     /**
//      * @param {typeof sap.ui.core.mvc.Controller} Controller
//      */
//     function (Controller, JSONModel) {
//         "use strict";

//         return Controller.extend("companyui.controller.DepartmentsList", {
//             onInit: function () {
               
//             },
//             onNavBack:function(){
//                 const oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo('RouteHome')
//             },
//             onSelectDepartment:function(oEvent){
//                 let Dep_Id = oEvent.getSource().getTitle()
//                 console.log(Dep_Id);
//                 const oRouter = this.getOwnerComponent().getRouter();
            
//             }
//         });
//     });



sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("companyui.controller.DepartmentsList", {
        onInit: function () {
            this.getView().setModel(new JSONModel(), "filterModel");
        },
        onAfterRendering: function () {
            this.oList = this.byId("departmentList");
        },
        onNavBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('RouteHome');
        },

        // onSelectDepartment: function (oEvent) {
        //     let Dep_Id = oEvent.getSource().getTitle();
        //     console.log(Dep_Id);
        //     const oRouter = this.getOwnerComponent().getRouter();
        // },

        onSelectDepartment: function(oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext("oDaModel");
            var sDepartmentId = oContext.getProperty("Department_Id");
            this.getOwnerComponent().getRouter().navTo("DepartmentsDetails", {
                Department_Id: sDepartmentId
            });
        },

        // onSearchDepartment: function (oEvent) {
        //     var sQuery = oEvent.getParameter("query");
        //     var oFilter = new Filter("Department_Name", FilterOperator.Contains, sQuery);
        //     var oBinding = this.oList.getBinding("items");
        //     if (oBinding) {
        //         oBinding.filter(oFilter);
        //     }
        // }
        
        onSearchDepartment: function (oEvent) {
            const sQuery = oEvent.getParameter("query");
            const aFilters = [];
        
            if (sQuery) {
                const oIdFilter = new sap.ui.model.Filter("Department_Id", sap.ui.model.FilterOperator.Contains, sQuery);
                const oNameFilter = new sap.ui.model.Filter("Department_Name", sap.ui.model.FilterOperator.Contains, sQuery);
        
                aFilters.push(new sap.ui.model.Filter({
                    filters: [oIdFilter, oNameFilter],
                    and: false // Use 'or' condition between the filters
                }));
            }
        
            // Get the list control by its ID
            const oList = this.byId("departmentList");
        
            // Apply the filter to the list binding
            oList.getBinding("items").filter(aFilters);
        }
    });
});
