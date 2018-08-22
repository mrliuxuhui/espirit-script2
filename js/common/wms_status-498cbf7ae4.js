var statusView = {
    init: function () {
        dictDropdown.render("wms_order_state_type", $("#wms_order_state_type"), !0, null, null, "dd_wms_order_state_type"), $("#statusDiv").dialog({
            height: 200,
            width: 300,
            title: "提交异常",
            buttons: {
                "保存": function () {
                    statusView.save()
                }, "取消": function () {
                    statusView.cancel(), $(this).dialog("close")
                }
            }
        }).autoDialogHeight()
    }, save: function () {
        var t = $("#wms_order_id").html(), e = $("#wms_order_state_type").val(), s = $("#exceptionNote").val(),
            a = $("#barcode").val();
        $.ajax({
            type: "POST",
            url: "/api/wms/order/checkException",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({wms_order_id: t, type: e, note: s, barcodeOrSku: a}),
            async: !1,
            success: function (t) {
                statusView.close(), msg.ok(t.data)
            },
            error: function (t, e, s) {
                statusView.close(), msg.alert(t.responseText)
            }
        })
    }, cancel: function () {
        $("#wms_order_state_type").empty(), $("#exceptionNote").val("")
    }, close: function () {
        statusView.cancel(), $("#statusDiv").dialog("close")
    }
};