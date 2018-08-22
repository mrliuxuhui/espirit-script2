var WMS_SN_MODEL = {
    ADD_OR_EDIT_SN_MODEL: [{
        label: "id",
        name: "wms_other_stock_order_detail_sn_id",
        hidden: !0
    }, {
        label: "操作", name: "namedOpr", sortable: !1, formatter: function (e, a, l) {
            return "<a onclick=\"jqgrids.delRow('" + SNTable + "'," + a.rowId + ')" class="egn-grid-link">删除</a>'
        }
    }, {label: "数量", name: "number", index: "number", align: "right"}],
    QUERY_LIST_SN: [{label: "id", name: "wms_other_stock_order_detail_sn_id", hidden: !0}]
}, WMS_WAREHOUSE_BIN_STOCK_QUERY_MODEL = {
    LIST: [{label: "id", name: "sku_id", hidden: !0}, {
        label: "仓库",
        name: "warehouse_name",
        sortable: !1
    }, {label: "库区", name: "warehouse_area_name", sortable: !1}, {
        label: "库位",
        name: "warehouse_bin_no",
        sortable: !1
    }, {label: "SKU编码", name: "sku_no", sortable: !1}, {
        label: "商品名称",
        name: "product_name",
        sortable: !1
    }, {label: "商品货号", name: "seller_outer_no", sortable: !1}, {
        label: "实物库存",
        name: "number",
        align: "right"
    }, {label: "锁定实物", name: "number_lock", align: "right"}, {
        label: "可销库存",
        name: "real_sale_number",
        align: "right"
    }, _tools.formatterPic(), {label: "颜色", name: "color_type", sortable: !1}, {
        label: "尺码",
        name: "size_type",
        sortable: !1
    }, {label: "规格", name: "spec", sortable: !1}, {label: "条形码", name: "bar_code", sortable: !1}, {
        label: "批号",
        name: "batch_no",
        sortable: !1
    }, {label: "生产日期", name: "manufacture_date", sortable: !1}, {
        label: "到期日期",
        name: "expiry_date",
        sortable: !1
    }, {label: "成本价", name: "cost_price", align: "right", sortable: !1}, {
        label: "折扣金额",
        name: "discount_price",
        align: "right",
        sortable: !1
    }, {label: "拿货价", name: "grap_price", align: "right", sortable: !1}, {
        label: "商品编号",
        name: "product_id",
        hidden: !0
    }, {label: "仓库编号", name: "warehouse_id", hidden: !0}, {
        label: "库区编号",
        name: "warehouse_area_id",
        hidden: !0
    }, {label: "库位编号", name: "warehouse_bin_id", hidden: !0}]
}, WMS_WAREHOUSE_STOCK_QUERY_MODEL = {
    LIST: [{label: "锁定实物", name: "number_lock", hidden: !0}, {
        label: "仓库",
        name: "warehouse_name",
        sortable: !1
    }, {label: "商品货号", name: "seller_outer_no", sortable: !1}, {
        label: "SKU编码",
        name: "sku_no",
        sortable: !1
    }, {label: "SKU编码", name: "sku_id", hidden: !0, key: !0}, {
        label: "商品名称",
        name: "product_name",
        sortable: !1
    }, {label: "实物库存", name: "number", align: "right"}, {
        label: "可销库存",
        name: "sale_stock_number",
        align: "right"
    }, _tools.formatterPic(), {label: "颜色", name: "color_type", sortable: !1}, {
        label: "尺码",
        name: "size_type",
        sortable: !1
    }, {label: "规格", name: "spec", sortable: !1}, {label: "条形码", name: "bar_code", sortable: !1}, {
        label: "批号",
        name: "batch_no",
        sortable: !1
    }, {label: "生产日期", name: "manufacture_date", sortable: !1}, {label: "到期日期", name: "expiry_date", sortable: !1}]
};