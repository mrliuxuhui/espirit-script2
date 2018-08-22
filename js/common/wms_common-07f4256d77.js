var WAREHOUSE_ID, parentTableDiv = "#parentTable_div", parentTable = "#parentTable",
    parentTablePage = "#parentTablePage", childrenTable = "#childrenTable", childrenTablePage = "#childrenTablePage",
    childrenSNTable = "#childrenSNTable", childrenSNTablePage = "#childrenSNTablePage", WMS_COMMON = {
        formatterDateTime: function (e) {
            return e = e ? Date.format(new Date(e), "yyyy-MM-dd hh:mm:ss") : ""
        }, transform: function (e) {
            for (var t = {}, r = 0, a = e.length; r < a; r++) t[e[r].name] = e[r].value;
            return t
        }, delete: function (e, t, r) {
            var a = WMS_COMMON.getSelectedIds(e, t, r);
            if (a += "") {
                var n = {};
                n.ids = a, $.ajax({
                    url: wmsPrefix + "/delete",
                    type: "POST",
                    contentType: defaultContentType,
                    dataType: "json",
                    data: JSON.stringify(n),
                    success: function (e) {
                        msg.ok(e.data), $(t).trigger("reloadGrid").trigger("resetSelectedRows")
                    },
                    error: function (e, t, r) {
                        msg.alert(e.responseText)
                    }
                })
            }
        }, getSelectedIds: function (e, t, r) {
            var a;
            return (a = e ? $(t).getGridRowData(e)[idName] + "" : WMS_COMMON.getSelectedRow(t, r)).length && Object.keys(a).length ? a : (msg.alert("请选择待审核单据！"), !1)
        }, getSelectedRow: function (e, t) {
            var r = $(e).jqGrid("getGridParam", "selarrrow");
            return !t && r.length > 1 ? (msg.alert("只能选择一条记录，请重新选择!"), !1) : !!r.length && r
        }, billEditable: function (e, t) {
            $(e).find("select").each(function () {
                $(this).removeAttr("disabled")
            }), $(e).find("input").each(function () {
                $(this).removeAttr("disabled")
            }), $(t).gridEditable(!0)
        }, billNotEditable: function (e, t) {
            $(e).find("select").each(function () {
                $(this).attr("disabled", "true")
            }), $(e).find("input").each(function () {
                $(this).attr("disabled", "true")
            }), $(t).gridEditable(!1), $(t + " td  select.inRowSelect").prop("disabled", !0)
        }, approve: function (e, t) {
            var r = WMS_COMMON.getSelectedIds(null, e, !0);
            if (!r) return !1;
            r += "";
            var a = {};
            a.ids = r, a.type = t, a.flag = !1, Mask.createMask(), Mask.createWaiting(), $.ajax({
                url: wmsPrefix + "/approve",
                type: "POST",
                contentType: defaultContentType,
                dataType: "json",
                data: JSON.stringify(a),
                success: function (t) {
                    Mask.removeWaiting(), Mask.remove(), "Successful" == t.status ? (t.data ? msg.confirm({
                        text: t.data,
                        onOk: function () {
                            a.flag = !0, $.ajax({
                                url: wmsPrefix + "/approve",
                                type: "POST",
                                contentType: defaultContentType,
                                dataType: "json",
                                data: JSON.stringify(a),
                                success: function (t) {
                                    "Successful" === t.status ? (msg.ok("审核成功!"), $(e).trigger("reloadGrid").trigger("resetSelectedRows")) : msg.alert(t.data)
                                }
                            })
                        },
                        onCancel: function () {
                            return !1
                        }
                    }) : msg.ok("审核成功!"), $(e).trigger("reloadGrid")) : msg.alert(t.data)
                },
                error: function (e, t, r) {
                    Mask.removeWaiting(), Mask.remove(), msg.alert(e.responseText)
                }
            })
        }, inapprove: function () {
            var e = WMS_COMMON.getSelectedIds(null, defaultTable, !0);
            if (e += "") {
                var t = {};
                t.ids = e, t.order_type = $("#order_type").val(), $.ajax({
                    url: wmsPrefix + "/inApprove",
                    type: "POST",
                    contentType: defaultContentType,
                    dataType: "json",
                    data: JSON.stringify(t),
                    success: function (e) {
                        msg.ok(e.data), $(defaultTable).trigger("reloadGrid")
                    },
                    error: function (e, t, r) {
                        msg.alert(e.responseText)
                    }
                })
            }
        }, formatMoney: function (e, t) {
            if (/[^0-9\.]/.test(e)) return "0.00";
            if (!e) return "0.00";
            t = t > 0 && t <= 20 ? t : 2;
            for (var r = (e = parseFloat((e + "").replace(/[^\d\.-]/g, "")).toFixed(t) + "").split(".")[0].split("").reverse(), a = e.split(".")[1], n = "", l = 0; l < r.length; l++) n += r[l] + ((l + 1) % 3 == 0 && l + 1 != r.length ? "," : "");
            return n.split("").reverse().join("") + "." + a
        }, revertMoney: function (e) {
            return parseFloat(e.replace(/[^\d\.-]/g, ""))
        }, changeSum: function () {
            $(document).on("keyup", ".changeSum", function () {
                console.log("ccc");
                let e = $(this), t = e.data("skuid"), r = e.data("rowid"), a = parseFloat($(`#number_${t}`).val()),
                    n = parseFloat($(`#price_${t}`).val());
                $("#detailTable").jqGrid("setRowData", r, {sum: (a * n).toFixed(2)})
            })
        }
    };

function isEmptyObject(e) {
    if ("object" == typeof e && !(e instanceof Array)) {
        for (var t in e) return !1;
        return !0
    }
    return !1
}

function initJQGridTableHasRequest(e, t, r, a, n, l, i, o, s, d, c, u, g, p, f, m, b, T, v, y, S, h) {
    var w = {
        url: t,
        colModel: r,
        postData: a,
        rowNum: n,
        height: l,
        width: i,
        scrollOffset: 10,
        pager: $(o),
        datatype: s,
        mtype: d,
        emptyrecords: c,
        rowList: u,
        editurl: g,
        cellEdit: !1,
        cellsubmit: "clientArray",
        multiselect: !0,
        rownumbers: !0,
        viewrecords: !0,
        regional: "cn",
        gridComplete: T,
        jsonReader: h || {
            root: "data.list",
            page: "data.page",
            total: "data.totalPageCount",
            records: "data.totalCount",
            repeatitems: !1
        },
        prmNames: {page: "page", rows: "pageSize"},
        onSelectRow: p,
        beforeSaveCell: f,
        afterEditCell: m,
        onCellSelect: b,
        afterSaveCell: S,
        beforeSelectRow: v,
        beforeRequest: y,
        sortable: !0
    };
    "#parentTable" === e ? eg_grid.render(e, w, !0, $("#childrenTable")) : eg_grid.render(e, w, !1, null, !0), initTableCellClickEvent(e), $(e).jqGrid("navGrid", o, {
        add: !1,
        edit: !1,
        del: !1,
        search: !1,
        refresh: !0,
        refreshtext: "刷新"
    })
}

function initJQGridTableLocal(e, t, r, a, n, l, i, o, s, d, c, u, g, p, f, m, b, T, v, y) {
    var S = {
        url: t,
        colModel: r,
        postData: a,
        rowNum: n,
        height: l,
        width: i,
        scrollOffset: 10,
        pager: $(o),
        datatype: s,
        mtype: d,
        emptyrecords: c,
        rowList: u,
        editurl: g,
        cellEdit: !0,
        cellsubmit: "clientArray",
        forceFit: !1,
        multiselect: !0,
        responsive: !0,
        rownumbers: !0,
        viewrecords: !0,
        regional: "cn",
        shrinkToFit: !1,
        autowidth: !0,
        jsonReader: {root: "list", page: "page", total: "totalPageCount", records: "totalCount", repeatitems: !0},
        prmNames: {page: "page", rows: "pageSize"},
        onSelectRow: p,
        beforeSaveCell: f,
        afterEditCell: m,
        onCellSelect: b,
        gridComplete: T,
        beforeSelectRow: v,
        beforeRequest: y
    };
    eg_grid.render(e, S), initTableCellClickEvent(e)
}