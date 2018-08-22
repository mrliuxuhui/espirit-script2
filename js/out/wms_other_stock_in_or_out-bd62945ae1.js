var picUtil, parentViews, picUrl = "'#picUrl'", picImg = "'#picImg'", wmsPrefix = "/wms/bill/other",
    idName = "wms_other_stock_order_id", detailTable = "#detailTable", detailTablePage = "#detailTablePage",
    defaultInsertDialog = "#defaultInsertDialog", defaultInsertForm = "#defaultInsertForm", order_type = "#order_type",
    warehouse_id = "#warehouse_id", warehouse_area_id = "#warehouse_area_id",
    other_stock_order_type = "#other_stock_order_type", other_stock_order_state = "#other_stock_order_state",
    other_stock_order_date = "#other_stock_order_date", wms_other_stock_order_id = "#wms_other_stock_order_id",
    wms_other_stock_order_no = "#wms_other_stock_order_no", note = "#note", uniqueNo = "#uniqueNo",
    addSkuBtn = "#addSkuBtn", inputScan = "#ipt_1", addPartDialog = "#addPartDialog", searchPartBtn = "#searchPartBtn",
    searchKey = "#searchKey", searchValue = "#searchValue", batchAddBtn = "#batchAddBtn",
    partSearchGrid = "#partSearchGrid", partSearchGridPager = "#partSearchGridPager",
    batchDeleteBtn = "#batchDeleteBtn", partSelectedGrid = "#partSelectedGrid",
    partSelectedGridPager = "#partSelectedGridPager", _addPartDialog = "#_addPartDialog",
    _searchPartBtn = "#_searchPartBtn", _searchKey = "#_searchKey", _searchValue = "#_searchValue",
    _batchAddBtn = "#_batchAddBtn", _partSearchGrid = "#_partSearchGrid",
    _partSearchGridPager = "#_partSearchGridPager", _batchDeleteBtn = "#_batchDeleteBtn",
    _partSelectedGrid = "#_partSelectedGrid", _partSelectedGridPager = "#_partSelectedGridPager",
    WMS_OTHER_STOCK_IN_OR_OUT_MODEL = {
        QUERY_LIST_PARENT: [{
            label: "操作",
            sortable: !1,
            name: "namedOpr",
            formatter: function (e, a, r) {
                return 1 === r.other_stock_order_state_code ? "已审核订单不可编辑" : '<a onclick="WMS_OTHER_STOCK_IN.showUpdateDialog(' + a.rowId + ')" class="egn-grid-link"  title="编辑">编辑</a> <a onclick="WMS_OTHER_STOCK_IN.deleteWmsOrder(' + a.rowId + ')" class="egn-grid-link"  title="删除">删除</a> '
            },
            width: "100px"
        }, {label: "id", name: "wms_other_stock_order_id", key: !0, hidden: !0}, {
            label: "单据状态",
            sortable: !1,
            name: "other_stock_order_state",
            align: "center"
        }, {label: "单据编号", name: "wms_other_stock_order_no"}, {
            label: "仓库",
            sortable: !1,
            name: "warehouse_name"
        }, {label: "单据类型", name: "other_stock_order_type", align: "center"}, {
            label: "审核人",
            name: "auditor_name",
            index: "approved_author_id"
        }, {label: "采购员", name: "purchaser_user_name", sortable: !1}, {
            label: "制单日期",
            name: "other_stock_order_date"
        }, {label: "备注", name: "note"}, {label: "审核时间", name: "approved_time"}, {
            label: "创建时间",
            name: "create_time"
        }, {label: "更新时间", name: "last_update_time"}, {label: "仓库ID", name: "warehouse_id", hidden: !0}],
        QUERY_LIST_CHILDREN: [{label: "id", name: "otherStockOrderDetailId", key: !0, hidden: !0}, {
            label: "库区",
            sortable: !1,
            name: "warehouse_area_name"
        }, {label: "库区ID", name: "warehouse_area_id", hidden: !0}, {
            label: "库位",
            sortable: !1,
            name: "warehouse_bin_no"
        }, _tools.formatterPic(), {label: "SKU编码", sortable: !1, name: "sku_no"}, {
            label: "商品编码",
            sortable: !1,
            name: "product_no"
        }, {label: "成本价", name: "cost_price", index: "cost_price", align: "right"}, {
            label: "数量",
            name: "number",
            align: "right"
        }, {
            label: "金额",
            name: "sum",
            align: "right",
            formatter: (e, a, r) => (r.number * r.cost_price).toFixed(2)
        }, {label: "采购价", name: "purchase_price", align: "right", hidden: !0}, {
            label: "商品名称",
            sortable: !1,
            name: "product_name"
        }, {label: "颜色", sortable: !1, name: "color_type"}, {
            label: "尺码",
            sortable: !1,
            name: "size_type"
        }, {label: "规格", sortable: !1, name: "spec"}, {label: "条形码", sortable: !1, name: "bar_code"}, {
            label: "供应商",
            sortable: !0,
            index: "vendorId",
            name: "vendor_name"
        }, {label: "计量单位", sortable: !1, name: "unit_name"}, {
            label: "批号",
            sortable: !1,
            name: "batch_no"
        }, {label: "批号id", name: "batch_id", hidden: !0}, {
            label: "生产日期",
            sortable: !1,
            name: "manufacture_date"
        }, {label: "到期日期", sortable: !1, name: "expiry_date", index: "expiry_date"}],
        ADD_OR_EDIT_MODEL: [{label: "id", name: "wms_other_stock_order_detail_id", hidden: !0}, {
            label: "操作",
            name: "namedOpr",
            sortable: !1,
            width: "60",
            formatter: function (e, a, r) {
                return "<a onclick=\"WMS_ADD_SKU_BATCH.deleteFromSelectedGrid('" + detailTable + "'," + a.rowId + ')" class="egn-grid-link">删除</a> '
            }
        }, {label: "库区", name: "warehouse_area_name"}, {
            label: "库位",
            name: "warehouse_bin_id",
            formatter: function (e, a, r) {
                var t;
                return t = r.warehouse_bin_id_temp ? WMS_OTHER_STOCK_IN.setEditOption(r.warehouse_bin_id_temp) : r.warehouse_bin_id ? WMS_OTHER_STOCK_IN.setEditOption(r.warehouse_bin_id) : WMS_OTHER_STOCK_IN.setEditOption(r.warehouseBinId), eg_grid.formatterSelect(a, t, r.warehouse_bin_id_temp || e)
            },
            width: 150
        }, _tools.formatterPic(), {label: "SKU编码", name: "sku_no"}, {
            label: '数量<i class="fa fa-pencil-square-o"></i>',
            name: "number",
            index: "number",
            formatter: (e, a, r) => `<input id="number_${r.sku_id}" type="number" class="changeSum" min="0" data-skuid="${r.sku_id}" data-rowid="${a.rowId}"  style="text-align: right" value="${e}">`
        }, {label: "库存数量", align: "right", name: "stock_num"}, {
            label: "成本价",
            name: "cost_price",
            index: "cost_price",
            align: "right",
            formatter: (e, a, r) => `<input id="price_${r.sku_id}" type="number" class="changeSum" min="0" data-skuid="${r.sku_id}" style="text-align: right" data-rowid="${a.rowId}" value="${e}">`
        }, {label: "金额", name: "sum", align: "right"}, {
            label: "库位暂存",
            name: "warehouse_bin_id_temp",
            hidden: !0,
            formatter: function (e, a, r) {
                return e || r.warehouse_bin_id || r.warehouseBinId
            }
        }, {label: "商品名称", name: "product_name"}, {label: "商品编码", name: "product_no"}, {
            label: "颜色",
            name: "color_type"
        }, {label: "尺码", name: "size_type"}, {label: "规格", name: "spec"}, {
            label: "条形码",
            name: "bar_code"
        }, {label: "供应商", index: "vendorId", name: "vendor_name"}, {
            label: "采购员",
            index: "employeeId",
            name: "employee_name"
        }, {label: "计量单位", name: "unit_name"}, {label: "批号", name: "batch_no", index: "batch_no"}, {
            label: "生产日期",
            name: "manufacture_date",
            index: "manufacture_date"
        }, {label: "到期日期", name: "expiry_date", index: "expiry_date"}, {
            label: "备注",
            name: "note",
            index: "note",
            editable: !0
        }, {
            label: "有效期（天）",
            name: "guarantee_period",
            index: "guarantee_period",
            hidden: !0,
            align: "right"
        }, {label: "SNS", name: "sns", index: "sns", hidden: !0}, {
            label: "总数量",
            name: "_number",
            hidden: !0
        }, {label: "SKU编码id", name: "sku_id", hidden: !0}, {
            label: "商品ID",
            name: "product_id",
            hidden: !0
        }, {label: "库区id", name: "warehouse_area_id", hidden: !0}, {
            label: "编辑库位",
            name: "editable",
            hidden: !0
        }, {label: "employeeId", name: "employeeId", hidden: !0}, {
            label: "vendorId",
            name: "vendorId",
            hidden: !0
        }, {label: "计量单位id", name: "unit_id", hidden: !0}]
    };