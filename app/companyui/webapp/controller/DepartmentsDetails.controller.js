sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "jquery.sap.global",
  "sap/ui/model/odata/v2/ODataModel",
], (Controller, JSONModel, jQuery,ODataModel) => {
  "use strict";

  return Controller.extend("companyui.controller.DepartmentsDetails", {
      onInit() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("DepartmentsDetails").attachPatternMatched(this._onObjectMatched, this);

      },
      _onObjectMatched: function (oEvent) {
        var DepartmentId = oEvent.getParameter("arguments").Department_Id; // Ensure parameter name matches
        
        if (!DepartmentId) {
            // Handle the case where DepartmentId is undefined or empty
            console.error("DepartmentId is undefined or empty.");
            return;
        }
    
        var sPath = "/Departments('" + DepartmentId + "')";
        console.log(sPath + " path ended");
    
        // Bind the view to the selected department
        this.getView().bindElement({
            path: sPath,
            model: "oDaModel",
            parameters: {
                expand: "Employees"
            }
        });
    },
      
  });
});