var BATCH_ADD_MODEL = {
    ADD_IN_SEARCH: [{
        label: "操作",
        name: "actions",
        sortable: !1,
        width: "50",
        formatter: function (e, a, l) {
            return '<a onclick="WMS_ADD_SKU_BATCH.addToSelectedGrid(' + a.rowId + ",'" + partSearchGrid + "','" + partSelectedGrid + '\');"  class="egn-grid-link">添加</a>'
        }
    }, {label: "SKUID", name: "sku_id", key: !0, hidden: !0}, {label: "SKU编码", name: "sku_no"}, {
        label: "商家编码",
        name: "seller_outer_no"
    }, {label: "库存数量", align: "right", name: "stock_num"}, {
        label: "商品名称",
        name: "product_name"
    }, _tools.formatterPic(), {label: "颜色", name: "color_type"}, {label: "尺码", name: "size_type"}, {
        label: "规格",
        name: "spec"
    }, {label: "供应商", index: "vendorId", name: "vendor_name"}, {
        label: "采购员",
        index: "employeeId",
        name: "employee_name"
    }, {label: "成本价", name: "cost_price", align: "right"}, {
        label: "采购价",
        name: "purchase_price",
        align: "right"
    }, {label: "employeeId", name: "employeeId", hidden: !0}, {
        label: "vendorId",
        name: "vendorId",
        hidden: !0
    }, {label: "库区id", name: "warehouse_area_id", hidden: !0}, {
        label: "库区",
        name: "warehouse_area_name",
        hidden: !0
    }, {label: "库位id", name: "warehouse_bin_id", hidden: !0}, {
        label: "库位id暂存",
        name: "warehouse_bin_id_temp",
        hidden: !0,
        formatter: function (e, a, l) {
            return l.warehouse_bin_id
        }
    }, {label: "库位", name: "warehouse_bin_no", hidden: !0}, {label: "是否编辑库位", name: "editable", hidden: !0}],
    ADD_IN_SELECT: [{
        label: "操作", name: "actions", sortable: !1, width: "50", formatter: function (e, a, l) {
            return `<a onclick="WMS_ADD_SKU_BATCH.deleteFromSelectedGrid('${partSelectedGrid}','${a.rowId}');" class="egn-grid-link">删除</a>`
        }
    }, {label: "SKUID", name: "sku_id", key: !0, hidden: !0}, {label: "SKU编码", name: "sku_no"}, {
        label: "商家编码",
        name: "seller_outer_no"
    }, {label: "商品名称", name: "product_name"}, {
        label: "数量",
        name: "count",
        formatter: (e, a, l) => `<input id="selectedNum_${l.sku_id}" style="text-align: right" value="${e}">`
    }, {label: "库存数量", align: "right", name: "stock_num"}, _tools.formatterPic(), {
        label: "颜色",
        name: "color_type"
    }, {label: "尺码", name: "size_type"}, {label: "规格", name: "spec"}, {
        label: "供应商",
        index: "vendorId",
        name: "vendor_name"
    }, {label: "采购员", index: "employeeId", name: "employee_name"}, {
        label: "成本价",
        name: "cost_price",
        align: "right"
    }, {label: "采购价", name: "purchase_price", align: "right"}, {
        label: "销售价",
        name: "sale_price",
        align: "right"
    }, {label: "库区id", name: "warehouse_area_id", hidden: !0}, {
        label: "库区",
        name: "warehouse_area_name",
        hidden: !0
    }, {label: "库位id", name: "warehouse_bin_id", hidden: !0}, {
        label: "库位id暂存",
        name: "warehouse_bin_id_temp",
        hidden: !0,
        formatter: function (e, a, l) {
            return l.warehouse_bin_id
        }
    }, {label: "库位", name: "warehouse_bin_no", hidden: !0}, {
        label: "是否编辑库位",
        name: "editable",
        hidden: !0
    }, {label: "employeeId", name: "employeeId", hidden: !0}, {label: "vendorId", name: "vendorId", hidden: !0}],
    ADD_OUT_SEARCH: [{
        label: "操作", name: "actions", sortable: !1, width: "50", formatter: function (e, a, l) {
            return '<a onclick="WMS_ADD_SKU_BATCH.addToSelectedGrid(' + a.rowId + ",'" + _partSearchGrid + "','" + _partSelectedGrid + '\');"  class="egn-grid-link">添加</a>'
        }
    }, {label: "SKUID", name: "sku_id", key: !0, hidden: !0}, {label: "SKU编码", name: "sku_no"}, {
        label: "实物库存",
        name: "number",
        align: "right"
    }, {label: "商家编码", name: "seller_outer_no"}, {
        label: "商品名称",
        name: "product_name"
    }, _tools.formatterPic(), {label: "规格", name: "spec"}, {label: "颜色", name: "color_type"}, {
        label: "尺码",
        name: "size_type"
    }, {label: "成本价", name: "cost_price", align: "right"}, {
        label: "采购价",
        name: "purchase_price",
        align: "right"
    }, {label: "销售价", name: "sale_price", align: "right"}, {
        label: "供应商",
        index: "vendorId",
        name: "vendor_name"
    }, {label: "采购员", index: "employeeId", name: "employee_name"}, {
        label: "employeeId",
        name: "employeeId",
        hidden: !0
    }, {label: "vendorId", name: "vendorId", hidden: !0}, {
        label: "库区id",
        name: "warehouse_area_id",
        hidden: !0
    }, {label: "库区", name: "warehouse_area_name", hidden: !0}, {
        label: "库位id",
        name: "warehouse_bin_id",
        hidden: !0
    }, {
        label: "库位id暂存", name: "warehouse_bin_id_temp", hidden: !0, formatter: function (e, a, l) {
            return l.warehouse_bin_id
        }
    }, {label: "库位", name: "warehouse_bin_no", hidden: !0}],
    ADD_OUT_SELECT: [{
        label: "操作", name: "actions", sortable: !1, width: "50", formatter: function (e, a, l) {
            return `<a onclick="WMS_ADD_SKU_BATCH.deleteFromSelectedGrid('${_partSelectedGrid}','${a.rowId}');" class="egn-grid-link">删除</a>`
        }
    }, {label: "SKUID", name: "sku_id", key: !0, hidden: !0}, {label: "SKU编码", name: "sku_no"}, {
        label: "商家编码",
        name: "seller_outer_no"
    }, {label: "商品名称", name: "product_name"}, {
        label: "数量",
        name: "count",
        formatter: (e, a, l) => `<input id="selectedNum_${l.sku_id}" style="text-align: right" value="${e}">`
    }, _tools.formatterPic(), {label: "规格", name: "spec"}, {label: "颜色", name: "color_type"}, {
        label: "尺码",
        name: "size_type"
    }, {label: "成本价", name: "cost_price", align: "right"}, {
        label: "采购价",
        name: "purchase_price",
        align: "right"
    }, {label: "供应商", index: "vendorId", name: "vendor_name"}, {
        label: "采购员",
        index: "employeeId",
        name: "employee_name"
    }, {label: "销售价", name: "sale_price", align: "right"}, {
        label: "employeeId",
        name: "employeeId",
        hidden: !0
    }, {label: "vendorId", name: "vendorId", hidden: !0}, {
        label: "库区id",
        name: "warehouse_area_id",
        hidden: !0
    }, {label: "库区", name: "warehouse_area_name", hidden: !0}, {
        label: "库位id",
        name: "warehouse_bin_id",
        hidden: !0
    }, {
        label: "库位id暂存", name: "warehouse_bin_id_temp", hidden: !0, formatter: function (e, a, l) {
            return l.warehouse_bin_id
        }
    }, {label: "库位", name: "warehouse_bin_no", hidden: !0}]
}, WMS_ADD_SKU_BATCH = {
    initKey: function (e) {
    }, showAddPartDialog: function (e, a, l, n, r, i, d, t, o, _, s) {
        WMS_ADD_SKU_BATCH.initKey(a), $(e).dialog({
            width: i, height: d, title: t, buttons: {
                "保存": function () {
                    $(_).find(".jqgrow").first().find('[aria-describedby="partSelectedGrid_sku_no"]').click();
                    for (var e = $(_).jqGrid("getRowData"), a = $(n), l = [], r = {}, i = [], d = 0; d < e.length; d++) l.push(e[d].sku_no), i.push(e[d].sku_id), r[e[d].sku_id] = $(`#selectedNum_${e[d].sku_id}`).val();
                    console.log(s), 0 === s && $.ajax({
                        url: "/wms/bill/other/check",
                        type: "post",
                        dataType: "json",
                        async: !1,
                        contentType: defaultContentType,
                        data: JSON.stringify({
                            warehouse: WAREHOUSE_ID,
                            warehouse_area_id: $("#warehouse_area_id").val(),
                            skuIds: i.join()
                        }),
                        success: function (a) {
                            var l = a.data.list, n = "";
                            if (l && l.length > 0) {
                                for (var r = 0; r < l.length; r++) n += "<p>" + l[r].sku_no + "</p>";
                                msg.alert({
                                    text: "以下SKU不在当前库区，确定后只添加在当前库区的SKU！",
                                    detailMessage: n,
                                    buttons: {
                                        "确定": function () {
                                            for (var a = 0; a < l.length; a++) for (var n = 0; n < i.length; n++) l[a].sku_id === i[n] && delete e[n];
                                            $(this).dialog("close")
                                        }, "取消": function () {
                                            $(this).dialog("close")
                                        }
                                    }
                                })
                            }
                        }
                    });
                    var t = e.length;
                    if (0 !== t) {
                        for (var m = 0; m < t; m++) {
                            var c = e[m];
                            c.number = r[c.sku_id];
                            var u, h = $("#warehouse_area_id option:selected").text();
                            u = 0 === s ? {
                                warehouse_area_name: h,
                                warehouse_area_id: $(warehouse_area_id).val(),
                                sum: (c.number * parseFloat(c.cost_price)).toFixed(2),
                                freightage: 0
                            } : 1 === s ? {
                                warehouse_area_name: h,
                                warehouse_area_id: $(warehouse_area_id).val(),
                                warehouse_bin_id: c.warehouse_bin_id,
                                sum: (c.number * parseFloat(c.cost_price)).toFixed(2),
                                freightage: 0
                            } : {sum: (c.number * parseFloat(c.cost_price)).toFixed(2)};
                            let l = (a = $(detailTable)).getDataIDs();
                            for (var b = l.length, p = 0, g = c.editable, w = 0; w < b; w++) {
                                var f;
                                if (c.sku_no === a.jqGrid("getCell", l[w], "sku_no")) {
                                    let e = $(`#number_${c.sku_id}`).val();
                                    f = $(`#price_${c.sku_id}`).val();
                                    let n = parseInt(e, 10) + parseInt(c.number, 10);
                                    a.jqGrid("setRowData", l[w], Object.assign(c, u, {
                                        number: n,
                                        sum: (n * parseFloat(f)).toFixed(2),
                                        cost_price: f
                                    })), $(`#select_warehouse_bin_id_${l[w]}`).select2().prop("disabled", 0 == +c.editable);
                                    break
                                }
                                p++
                            }
                            var S = $.extend({}, u, c);
                            S.warehouse_area_name = u.warehouse_area_name, b === p && a.jqGrid("addRowData", S.sku_id, S), 0 === g && a.jqGrid("setCell", S.sku_id, "warehouse_bin_id", "", "not-editable-cell")
                        }
                        a.trigger("reloadGrid"), $(o).clearGridData(), $(_).clearGridData(), $(this).dialog("close")
                    } else msg.alert("查询符合条件的结果为空")
                }, "取消": function () {
                    $(o).clearGridData(), $(_).clearGridData(), $(this).dialog("close")
                }
            }
        }).autoDialogHeight(), $(l).val(""), $(l).focus()
    }, showAddOrderAddSkuDialog: function (e, a, l, n, r, i, d, t, o, _, s, m, c, u, h, b) {
        WMS_ADD_SKU_BATCH.showAddPartDialog(e, a, l, n, r, i, d, t, o, _, h, b), initPartSku(o, _, s, m, c, u)
    }, bindSkuEvent: function (e, a, l, n, r, i, d, t, o, _) {
        $(a).unbind("click").click(function () {
            console.log("点击批量添加");
            var e = $(l).jqGrid("getGridParam", "selarrrow");
            $.each(e, function (e, a) {
                WMS_ADD_SKU_BATCH.addToSelectedGrid(a, l, r)
            })
        }), $(n).unbind("click").on("click", function () {
            for (var e = $(r).jqGrid("getGridParam", "selarrrow"), a = e.length - 1; a >= 0; a--) WMS_ADD_SKU_BATCH.deleteFromSelectedGrid(r, e[a])
        }), $(i).keydown(function (a) {
            13 == a.keyCode && ("1" === _ && (o = WMS_OTHER_STOCK_IN.checkParams()), searchPart(l, e, d, i, o, _))
        }), $(t).click(function () {
            "1" === _ && (o = WMS_OTHER_STOCK_IN.checkParams()), searchPart(l, e, d, i, o, _)
        })
    }, addToSelectedGrid: function (e, a, l) {
        l = $(l);
        var n = (a = $(a)).jqGrid("getRowData", e);
        n.actions = "", n.count = 1;
        var r = n.sku_id, i = l.jqGrid("getRowData", r);
        isEmptyObject(i) ? l.jqGrid("addRowData", r, n) : (i.count = parseInt($(`#selectedNum_${r}`).val(), 10) + 1, l.jqGrid("setRowData", r, i))
    }, deleteFromSelectedGrid: function (e, a) {
        $(e).jqGrid("delRowData", a)
    }
};

function initPartSku(e, a, l, n, r, i) {
    if (!$(e).html()) {
        var d = {
            caption: "查询结果",
            url: null,
            mtype: "GET",
            multiselect: !0,
            jsonReader: {
                root: "data.list",
                page: "data.page",
                total: "data.totalPageCount",
                records: "data.totalCount",
                repeatitems: !1
            },
            colModel: r,
            viewrecords: !0,
            height: 240,
            scrollOffset: 10,
            rowNum: 50,
            pager: l
        };
        eg_grid.render(e, d, !1, null, !0)
    }
    if (!$(a).html()) {
        var t = {
            caption: "已选择商品",
            datatype: "json",
            mtype: "get",
            data: {},
            multiselect: !0,
            cellsubmit: "clientArray",
            colModel: i,
            viewrecords: !0,
            height: 240,
            scrollOffset: 10,
            rowNum: 50,
            pager: n
        };
        eg_grid.render(a, t, !1, null, !0)
    }
    $(e).jqGrid("clearGridData", !0), $(a).jqGrid("clearGridData", !0), initTableCellClickEvent(a)
}

function searchPart(e, a, l, n, r, i) {
    var d = $(n).val();
    if (d) {
        var t = $(e), o = {
            key: $(l).val(),
            value: d,
            warehouse: $("#warehouse_id").val(),
            src: "1",
            type: i,
            warehouse_area_id: $("#warehouse_area_id").val()
        };
        "1" === i && ("0" === r ? o.flag = "0" : "1" === r && (o.flag = "1")), t.jqGrid("setGridParam", null).jqGrid("setGridParam", {
            url: a,
            postData: o,
            mtype: "POST",
            datatype: "json"
        }).trigger("reloadGrid", [{page: 1}]).trigger("resetSelectedRows")
    }
}