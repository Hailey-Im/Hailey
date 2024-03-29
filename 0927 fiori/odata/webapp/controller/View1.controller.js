sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("sap.sync.odata.controller.View1", {
            onInit: function () {
                var oData = {
                    salesOrderNum : null,
                    salesOrderMemo : null
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "view");
            },

            onCreate : function () {
                var oModel = this.getView().getModel(); //oDataModel 객체
                var oViewModel = this.getView().getModel("view"); //view에서 다시 찾아온 것!
                var sSONUM = oViewModel.getProperty("/salesOrderNum");
                var sMemo = oViewModel.getProperty("/salesOrderMemo");
                var oCreateData = {Sonum : sSONUM, Memo : sMemo}; //객체 형태로 생성요청ㄷ
                //  ui5 framework odataV2 모델 api(메소드 기능)으로 생성요청
                 
                oModel.create("/SalesOrderSet", oCreateData,{
                    success : function() {
                        oViewModel.setProperty("/salesOrderNum", null);
                        oViewModel.setProperty("/salesOrderMemo", null);
                        MessageToast.show("저장 되었습니다."); 
                    }
                });//post
                    
                // ui5 framework odatav2 모델 api(메소드 기능)으로 생성요청

            
                // oModel.createEntry("/SalesOrderSet", {
                //     properties : oCreateData
                // });

                // oModel.submitChanges();
            },

            onDelete : function(oEvent){
                //내가 삭제버튼을 누른 엔티티의 상세주소를 추출해서 삭제요청
               
                var sPath = oEvent.getParameter("listItem").
                getBindingContextPath();
                var oModel = this.getView().getModel();

                //Delete http 요청 처리
                oModel.remove(sPath,{ success: function(){
                    MessageToast.show("삭제되었습니다.")
                }})
            },

            onPressEdit : function(){
                this.byId("table").setMode("SingleSelectMaster")
                //싱글셀렉트한 열 하나가 하이라이트 됨 
            },
           
            onPressDel : function(){
                this.byId("table").setMode("Delete")
            },

            onPressItem : function(oEvent){
                var sPath = oEvent.getParameter("listItem").
                getBindingContextPath();
                var oModel = this.getView().getModel();
                var oData = oModel.getProperty(sPath);
                
                var oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/salesOrderNum", oData.Sonum);
                oViewModel.setProperty("/salesOrderMemo", oData.Memo);
            },
            
            onUpdate : function() {
                var oViewModel = this.getView().getModel("view");
                var sSONUM = oViewModel.getProperty("/salesOrderNum");
                var sMemo = oViewModel.getProperty("/salesOrderMemo");
                var oModel = this.getView().getModel();
                var oData = {Sonum : sSONUM, Memo : sMemo};
                var sPath = "/SalesOrderSet('"+ sSONUM + "')"

                //put (update 요청)
                oModel.update(sPath,oData, {success: function(){
                    MessageToast.show("변경되었습니다.")
                }});
            }
        });
    });
