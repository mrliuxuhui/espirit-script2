var singleSNBtn = "#singleSNBtn", batchSNDiv = "#batchSNDiv", singleSNDiv = "#singleSNDiv", batchSNBtn = "#batchSNBtn",
    singleSN = "#singleSN", snNumber = "#snNumber", addOrEditSNDiv = "#addOrEditSNDiv", beginSN = "#beginSN",
    endSN = "#endSN", SNTable = "#SNTable", SNTablePage = "#SNTablePage", WMS_SN = {
        initSN: function () {
            $(singleSNBtn).click(function () {
                $(batchSNDiv).hide(), $(singleSNDiv).toggle()
            }), $(batchSNBtn).click(function () {
                $(singleSNDiv).hide(), $(batchSNDiv).toggle()
            }), $(snNumber).keydown(WMS_SN.batchSN), $(singleSN).keydown(WMS_SN.singleSN)
        }, batchSN: function (e) {
            var a = $(beginSN), i = $(endSN), t = $(snNumber), l = $(SNTable);
            if (13 == e.keyCode) {
                if ("" === a.val() || "" === i.val() || "" === t.val()) return;
                var r = t.val(), n = a.val(), S = i.val(), s = parseInt(l.getGridParam("records"), 10) + 1;
                l.jqGrid("addRowData", s, {
                    sn: "",
                    number: ""
                }), l.jqGrid("setCell", s, "sn", n + "-" + S), l.jqGrid("setCell", s, "number", r), t.val(""), a.val(""), i.val("")
            }
        }, singleSN: function (e) {
            var a = $(singleSN), i = $(SNTable);
            if (13 == e.keyCode) {
                var t = a.val();
                if ("" === t) return;
                var l = parseInt(i.getGridParam("records"), 10) + 1;
                i.jqGrid("addRowData", l, {
                    sn: "",
                    number: ""
                }), i.jqGrid("setCell", l, "sn", t), i.jqGrid("setCell", l, "number", "1"), a.val("")
            }
        }, onRowEvent: function (e) {
            var a = {
                search_key: "wms_other_stock_order_detail_id",
                search_value: $(childrenTable).jqGrid("getCell", e, "wms_other_stock_order_detail_id"),
                operator: "0"
            };
            $(SNTable).jqGrid("setGridParam", {postData: null}).jqGrid("setGridParam", {
                url: "/api/wms/sn/query",
                postData: a
            }).trigger("reloadGrid").trigger("resetSelectedRows")
        }, enterSN: function (e) {
            $(addOrEditSNDiv).dialog({
                height: "auto", width: "100%", title: "SN", buttons: {
                    "确定": function () {
                        if (WMS_SN.validateSN) {
                            for (var a = parseInt($(SNTable).getGridParam("records"), 10), i = "", t = "", l = 1; l <= a; l++) {
                                var r = $(SNTable).jqGrid("getCell", l, "sn"),
                                    n = $(SNTable).jqGrid("getCell", l, "number");
                                1 == parseInt(n) ? i += r + "#" : t += r + "-" + n + "#"
                            }
                            var S = i.substr(0, i.length - 1) + "&" + t.substr(0, t.length - 1);
                            $(detailTable).jqGrid("setCell", e, "sns", S), $(this).dialog("close"), WMS_SN.clearSNDialog()
                        }
                    }, "取消": function () {
                        $(this).dialog("close")
                    }
                }
            }).autoDialogHeight(), initJQGridTableHasRequest(SNTable, "", WMS_SN_MODEL.ADD_OR_EDIT_SN_MODEL, {}, 50, "100%", 230, SNTablePage, "local", "POST", emptyListMessage, jqPageLimits, null, WMS_OTHER_STOCK_IN.onSelectRow, null, null, null), $(SNTable).autoTableWidth().trigger("reloadGrid").trigger("resetSelectedRows")
        }, validateSN: function () {
            return !0
        }, clearSNDialog: function () {
        }
    };