var ORDER_TYPE, initWarehouseArea, warehouseAreaIdStash, isEdit = !1, warehouseBinIds = '',
  batchUrl = '/wms/bill/other/batch', whichModule = 'WMSOtherIn', whichGirdToShowData = '#parentTable';
$(function() {
  ORDER_TYPE = 0, WMS_OTHER_STOCK_IN.init(), WMS_SN.initSN();
});
var WMS_OTHER_STOCK_IN = {
  init: function() {
    _tools.editCellSelectable(), picUtil = JsUtil, WMS_OTHER_STOCK_IN.initBtnClickEvent(), $(warehouse_area_id).on('change', function() {
      warehouseBinIds = dataLoader.loadGridSelectData({
        warehouseId: $('#warehouse_id').val(),
        warehouseAreaId: $('#warehouse_area_id').val(),
      });
      let e = this;
      $(detailTable).jqGrid('setColProp', 'warehouse_bin_id', { editoptions: { value: warehouseBinIds } }).trigger('reloadGrid').trigger('resetSelectedRows'), setTimeout(function() {
        $(e).data('isInit') || isEdit || $(detailTable).getRowData().length > 0 && msg.confirm({
          text: '切换库区将会清空当前录入信息，确定切换吗？',
          onOk: function() {
            initWarehouseArea = $('#warehouse_area_id').val(), $(detailTable).jqGrid('clearGridData');
          },
          onCancel: function() {
            $('#warehouse_area_id').data('isInit', !0).val(initWarehouseArea).change();
          },
        });
        isEdit = !1, $(e).data('isInit', !1);
      });
    }), $(inputScan).keydown(WMS_OTHER_STOCK_IN.selectSkuOrBarCode), $(warehouse_id).change(function() {
      $(detailTable).jqGrid('clearGridData'), WAREHOUSE_ID = $(this).val();
    }), $(other_stock_order_date).datepicker({ dateFormat: 'yy-mm-dd' }), initJQGridTableHasRequest(parentTable, location.search.includes('source_id') ? null : '/api/wms/other/querybyfilter', WMS_OTHER_STOCK_IN_OR_OUT_MODEL.QUERY_LIST_PARENT, {
      search_key: 'order_type',
      search_value: ORDER_TYPE,
      operator: 0,
      vo: '{"order_type-4-1":"0,2"}',
    }, 50, 200, 230, parentTablePage, 'json', 'POST', emptyListMessage, jqPageLimits, null, null, null, null, WMS_OTHER_STOCK_IN.onCellSelect, function() {
      top.EgeniePermission.checkPermit(window);
    }, WMS_OTHER_STOCK_IN.beforeSelectRow, function() {
    }, function() {
    }), initJQGridTableHasRequest(childrenTable, null, WMS_OTHER_STOCK_IN_OR_OUT_MODEL.QUERY_LIST_CHILDREN, null, 50, 200, 230, childrenTablePage, 'local', 'POST', emptyListMessage, jqPageLimits, null, WMS_SN.onRowEvent, null, null, null), $(parentTable).trigger('reloadGrid').trigger('resetSelectedRows'), $(childrenTable).on('jqGridLoadComplete', function(e) {
      WMS_OTHER_STOCK_IN.countTotal($(this).getRowData(), 'childrenTablePage');
    }), $(addSkuBtn).bind('click', function() {
      let e = $(warehouse_id).val(), t = $(warehouse_area_id).val(), a = $(other_stock_order_type).val();
      '-1' === e || '' === e || '-1' === t || '' === t || '-1' === a || '' === a || '' === $(other_stock_order_date).val() ? msg.alert('请选择仓库，库区，入库单类型和制单日期') : (initWarehouseArea = $('#warehouse_area_id').val(), WMS_ADD_SKU_BATCH.showAddOrderAddSkuDialog(addPartDialog, searchKey, searchValue, detailTable, '/sku/single', 1200, 'auto', '批量添加入库商品', partSearchGrid, partSelectedGrid, partSearchGridPager, partSelectedGridPager, BATCH_ADD_MODEL.ADD_IN_SEARCH, BATCH_ADD_MODEL.ADD_IN_SELECT, 0));
    });
  }, initBtnClickEvent: function() {
    $('#insertBtn').click(WMS_OTHER_STOCK_IN.showInsertDialog), $('#editBtn').click(WMS_OTHER_STOCK_IN.showUpdateDialog), $('#approveBtn').click(WMS_OTHER_STOCK_IN.approve), $('#inApproveBtn').click(WMS_OTHER_STOCK_IN.inApprove), $('#deleteBtn').click(() => WMS_OTHER_STOCK_IN.deleteWmsOrder(null)), $('#importBtn').click(WMS_OTHER_STOCK_IN.uploadXlsFile), $('#importXLSBtn').click(WMS_OTHER_STOCK_IN.startImport), $('#exportBtn').click(WMS_OTHER_STOCK_IN.exportXlsFile), $('#searchDetailBtn').click(WMS_OTHER_STOCK_IN.searchDetail), $('.templateDownload').click(WMS_OTHER_STOCK_IN.templateDownload), $('#createFromPurchase').click(WMS_OTHER_STOCK_IN.showCreateFromPurchase), $('#printBarCode').click(warrant_out_print.openSkuProductTemp), $('#createOutOrder').click(WMS_OTHER_STOCK_IN.createOutOrder), $('#printOtherStockInBtn').click(warrant_out_print.openOtherStockInOrOutTemp), WMS_COMMON.changeSum(), $('body').on('focus', '[type="number"]', function() {
      $(this).css({ textAlign: 'left' });
    }).on('blur', '[type="number"]', function() {
      $(this).css({ textAlign: 'right' });
    }), $(defaultInsertDialog).on('dialogbeforeclose', function(e, t) {
      isEdit = !0;
    });
  }, createOutOrder() {
    let e = $('#parentTable').jqGrid('getGridParam', 'selarrrow');
    if (1 !== e.length) return msg.alert('请选择入库单且只选择一条数据！');
    $.ajax({
      url: '/wms/bill/other/in/create/out',
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ id: e.join() }),
      success: function(e) {
        if ('Successful' === e.status) return msg.ok('操作成功！');
      },
    });
  }, searchDetail: function() {
    let e, t = $('#searchDetailDiv'), a = $('#parentTable').find('.current_line').attr('id'),
      r = t.find('#skuNo').val(), i = t.find('#productNo').val();
    e = r || i ? {
      url: '/wms/bill/other/detail/find',
      postData: { orderId: a, skuNo: r, productNo: i },
    } : {
      url: '/wms/bill/other/getdetail',
      postData: { search_key: 'wms_other_stock_order_id', search_value: a, operator: '0' },
    }, $('#childrenTable').jqGrid('setGridParam', e).trigger('reloadGrid', [{ page: 1 }]);
  }, beforeSelectRow: function(e, t, a) {
    $('#searchDetailDiv').find('input').val(''), $(childrenTable).jqGrid('setGridParam', {
      datatype: 'json',
      url: '/wms/bill/other/getdetail',
      postData: { search_key: 'wms_other_stock_order_id', search_value: e, operator: '0' },
    }).trigger('reloadGrid', [{ page: 1 }]).trigger('resetSelectedRows');
  }, getWarehouseArea: function() {
    $('warehouse_area_id').empty(), $.ajax({
      url: '/api/baseinfo/warehouseArea/get',
      method: 'POST',
      noReject: !0,
      data: { warehouseId: $(warehouse_id).val() },
      success: function(e) {
        select.render(e.data, 'id', 'warehouseAreaName', $(warehouse_area_id), !0, null, warehouseAreaIdStash), $(warehouse_area_id).val();
      },
    }), initWarehouseArea = '-1';
  }, approve: function() {
    WMS_COMMON.approve(parentTable, '0');
  }, inApprove: function() {
    WMS_COMMON.inApprove(parentTable);
  }, save: function() {
    if (!WMS_OTHER_STOCK_IN.verifyData()) return msg.alert('单据信息不完整');
    let e = WMS_COMMON.transform($(defaultInsertForm).serializeArray()), t = {}, a = $(detailTable), r = a.getDataIDs(),
      i = ['warehouse_area_id', 'warehouse_bin_id', 'sku_id', 'batch_id', 'batch_no', 'expiry_date', 'manufacture_date', 'number', 'cost_price', 'note', 'sns', 'stock_num'];
    a.find('.jqgrow').first().find('[aria-describedby="detailTable_product_name"]').click(), t.count = r.length, r.forEach((e, r) => {
      t[r + 1 + '_children'] = Object.assign(JSON.parse(JSON.stringify(a.getRowData(e), i)), { number: $(`#number_${e}`).val() }, { cost_price: $(`#price_${e}`).val() }, { warehouse_bin_id: $('#select_warehouse_bin_id_' + e).val() || '' });
    }), $.ajax({
      url: wmsPrefix + '/create',
      type: 'POST',
      dataType: 'json',
      contentType: defaultContentType,
      data: JSON.stringify({ parent: e, children: t }),
      success: function(e) {
        'Successful' === e.status && (msg.ok(e.data), $(parentTable).trigger('reloadGrid'), $(defaultInsertDialog).dialog('destroy'), $(detailTable).GridUnload(), WMS_OTHER_STOCK_IN.clearInsertDialog());
      },
    });
  }, showInsertDialog: function() {
    $('#tipNoSku').hide(), $(detailTable).clearGridData(), $(detailTable).GridUnload(), warehouseAreaIdStash = null, select.render('/api/baseinfo/warehouse/get', 'id', 'warehouseName', $(warehouse_id), !0, WMS_OTHER_STOCK_IN.getWarehouseArea, '', !1, '', 'dd_warehouse', {}, !0), $(order_type).val(ORDER_TYPE), $(other_stock_order_date).val((new Date).toFormattedString('yyyy-MM-dd')), WMS_COMMON.billEditable(defaultInsertDialog, detailTable), select.render('/wms/bill/other/type/0', 'key', 'val', $(other_stock_order_type), !1, null, 0), WMS_ADD_SKU_BATCH.bindSkuEvent(batchUrl, batchAddBtn, partSearchGrid, batchDeleteBtn, partSelectedGrid, searchValue, searchKey, searchPartBtn, '', '0'), $(defaultInsertDialog).dialog({
      width: 1200,
      height: 'auto',
      title: '新建其它入库单',
      resizable: !1,
      buttons: {
        '保存': function() {
          WMS_OTHER_STOCK_IN.save();
        }, '取消': function() {
          isEdit = !0, $(defaultInsertDialog).dialog('destroy'), $(detailTable).GridUnload(), WMS_OTHER_STOCK_IN.clearInsertDialog();
        },
      },
      open: function() {
      },
    }).autoDialogHeight(), initJQGridTableHasRequest(detailTable, null, WMS_OTHER_STOCK_IN_OR_OUT_MODEL.ADD_OR_EDIT_MODEL, {}, 1e3, 600, 500, detailTablePage, 'local', 'POST', emptyListMessage, jqPageLimits, null, null, WMS_OTHER_STOCK_IN.beforeSaveCell, WMS_OTHER_STOCK_IN.afterEditCell, null, WMS_OTHER_STOCK_IN.gridComplete, null, null, WMS_OTHER_STOCK_IN.afterSaveCell), $(detailTable).trigger('reloadGrid').trigger('resetSelectedRows');
  }, update: function() {
    if (!WMS_OTHER_STOCK_IN.verifyData()) return msg.alert('单据信息不完整');
    var e = $(defaultInsertForm).serializeArray(),
      t = jsons.join(WMS_COMMON.transform(e), { wms_other_stock_order_id: $(wms_other_stock_order_id).val() }), a = [],
      r = ['wms_other_stock_order_detail_id', 'warehouse_area_id', 'warehouse_bin_id', 'sku_id', 'batch_id', 'batch_no', 'expiry_date', 'manufacture_date', 'number', 'cost_price', 'note', 'sns'];
    let i = $(detailTable);
    i.find('tr').each(function() {
      let e = $(this).attr('id');
      if (e) {
        let t = JSON.parse(JSON.stringify(i.getRowData(e), r));
        t.number = $(`#number_${t.sku_id}`).val(), t.cost_price = $(`#price_${t.sku_id}`).val(), t.batch_id = '0', t.warehouse_bin_id = $('#select_warehouse_bin_id_' + e).val() || '', a.push(t);
      }
    }), t.skus = a, $.ajax({
      url: wmsPrefix + '/update',
      type: 'POST',
      dataType: 'json',
      contentType: defaultContentType,
      data: JSON.stringify(t),
      success: function(e) {
        'Successful' === e.status && (msg.ok('更新成功'), $(parentTable).trigger('reloadGrid'), $('#childrenTable').jqGrid('clearGridData', !0), $(detailTable).GridUnload(), $(defaultInsertDialog).dialog('close'), WMS_OTHER_STOCK_IN.clearInsertDialog());
      },
    });
  }, setEditOption: function(e) {
    let t = warehouseBinIds.split(';').map(t => {
      let a = t.split(':');
      return `<option value="${a[0]}" ${a[0] == e ? 'selected' : ''}>${a[1]}</option>`;
    });
    return `<select data-value="${e}">${t.join('')}</select>`;
  }, showUpdateDialog: function(e) {
    e += '', $('#tipNoSku').hide(), $.ajax({
      url: wmsPrefix + '/edit',
      type: 'POST',
      contentType: defaultContentType,
      dataType: 'json',
      data: JSON.stringify({ id: e }),
      success: function(t) {
        if (!t) return msg.alert('没有查询到当前选定的其它入库单信息');
        isEdit = !0, WMS_OTHER_STOCK_IN.initEditFrom(e), WMS_OTHER_STOCK_IN.editCallback(t);
      },
      error: function(e, t, a) {
        msg.alert(e.responseText);
      },
    });
  }, initEditFrom: function(e) {
    select.render('/api/baseinfo/warehouse/get', 'id', 'warehouseName', $(warehouse_id), !0, WMS_OTHER_STOCK_IN.getWarehouseArea, '', !1, '', 'dd_warehouse', {}, !0), $(order_type).val(ORDER_TYPE), $(other_stock_order_date).val((new Date).toFormattedString('yyyy-MM-dd')), select.render('/wms/bill/other/type/0', 'key', 'val', $(other_stock_order_type), !1, null, 1), WMS_ADD_SKU_BATCH.bindSkuEvent(batchUrl, batchAddBtn, partSearchGrid, batchDeleteBtn, partSelectedGrid, searchValue, searchKey, searchPartBtn, '', '0'), setTimeout(function() {
      WAREHOUSE_ID = $('#warehouse_id').val(), initWarehouseArea = $('#warehouse_area_id').trigger('change').val();
    }, 1), dialog.openDialog({
      dialogId: 'defaultInsertDialog',
      title: '编辑其它入库单',
      customOpt: {
        width: 1200, open: function() {
          $(detailTable).GridUnload();
        }, buttons: {
          '保存': WMS_OTHER_STOCK_IN.update, '取消': function() {
            isEdit = !0, $(defaultInsertDialog).dialog('close'), WMS_OTHER_STOCK_IN.clearInsertDialog();
          },
        },
      },
    }), initJQGridTableHasRequest(detailTable, null, WMS_OTHER_STOCK_IN_OR_OUT_MODEL.ADD_OR_EDIT_MODEL, {}, 1e3, 600, 500, detailTablePage, 'local', 'POST', emptyListMessage, jqPageLimits, null, null, WMS_OTHER_STOCK_IN.beforeSaveCell, WMS_OTHER_STOCK_IN.afterEditCell, null, WMS_OTHER_STOCK_IN.gridComplete, null, null, WMS_OTHER_STOCK_IN.afterSaveCell), $(detailTable).trigger('reloadGrid').trigger('resetSelectedRows'), setTimeout(function() {
      WMS_OTHER_STOCK_IN.getEditDetailData(e);
    }, 2);
  }, getEditDetailData: function(e) {
    $.ajax({
      url: '/wms/bill/other/getdetail',
      type: 'post',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      data: { search_key: 'wms_other_stock_order_id', search_value: e, operator: '0', pageSize: '10000' },
      success: function(e) {
        let t = e.data.list, a = t.length;
        for (let e = 0; e < a; e++) {
          let a = t[e];
          a.sum = (a.cost_price * a.number).toFixed(2);
        }
        $(detailTable)[0].addJSONData(t);
      },
    });
  }, beforeSaveCell: function(e, t, a, r, i) {
    var l = $(detailTable);
    if ('batch_no' === t && l.getDataIDs().some(e => l.jqGrid('getCell', e, t) === a)) return '';
    if ('manufacture_date' === t) {
      var o = parseInt($(detailTable).jqGrid('getCell', e, 'guarantee_period'), 10), n = a.split('-'),
        s = new Date(n[0], n[1] - 1, n[2]), d = s.getTime() + 24 * o * 60 * 60 * 1e3;
      return s.setTime(d), l.jqGrid('setCell', r, 'expiry_date', s.toFormattedString('yyyy-MM-dd')), a;
    }
  }, afterSaveCell: function(e, t, a, r, i) {
    'number' !== t && 'cost_price' !== t || WMS_OTHER_STOCK_IN.setNumVal(e);
  }, afterEditCell: function(e, t, a, r, i) {
    'manufacture_date' === t && $('#' + r + '_manufacture_date', detailTable).datepicker({ dateFormat: 'yy-mm-dd' });
    $('#' + e + '_warehouse_bin_id').select2({
      allowClear: !0,
      width: '100%',
      theme: 'classic',
    }).select2('open').on('select2:select', function(e) {
      $($(e.target).parents('table').find('.jqgrid-rownum')[0]).click();
    });
  }, gridComplete: function() {
    let e = $(detailTable), t = e.getRowData(), a = e.getDataIDs();
    t.forEach((e, t) => {
      $('#select_warehouse_bin_id_' + a[t]).change().prop('disabled', 0 == +e.editable);
    }), console.log('完成了'), e.setGridHeight($('#detailTable').setGridHeight($('#defaultInsertDialog').height() - $('#selectProductRow').height() - 150)), e.find('.inRowSelect').select2();
  }, setNumVal: function(e) {
    var t = $(detailTable), a = (t.getCell(e, 'number') * t.getCell(e, 'cost_price')).toFixed(2);
    t.setCell(e, 'sum', a), WMS_OTHER_STOCK_IN.countTotal(t.getRowData(), 'detailTablePage');
  }, countTotal: function(e, t) {
    let a = 0, r = 0;
    e.forEach(e => {
      a += +e.number, r += +e.sum;
    }), document.getElementById(t + '-statistics') || $('#' + t).find('div[role=group]').prepend(`\n        <div class="pull-left" id="${t}-statistics" style="line-height: 28px; margin-left: 160px">\n          <span style="font-size: 14px; margin-right: 10px; border-right: 1px solid">本页统计&nbsp;&nbsp;</span>\n          <span>数量： </span><span id="${t}-totalNumber" style="margin-right: 15px"></span>\n          <span>总金额： </span><span id="${t}-totalSum" style="margin-right: 15px"></span>\n        </div>`.trimMultiLine()), $(`#${t}-totalNumber`).html(a), $(`#${t}-totalSum`).html(r.toFixed(4));
  }, selectSkuOrBarCode: function(e) {
    if (13 === e.keyCode) {
      let e = $(warehouse_id).val(), a = $(warehouse_area_id).val(), r = $(other_stock_order_type).val(),
        i = $(other_stock_order_date).val();
      if ('' === e || '-1' === e || '' === a || '-1' === a || '' === r || '-1' === r || '' === i) return msg.alert('请选择仓库、单据类型和制单日期。');
      initWarehouseArea = $('#warehouse_area_id').val();
      var t = $(inputScan).val();
      if ('' === t) return;
      $.ajax({
        url: '/wms/bill/other/sku',
        type: 'POST',
        dataType: 'json',
        contentType: defaultContentType,
        data: JSON.stringify({
          key: $(uniqueNo).val(),
          value: t,
          warehouse: $('#warehouse_id').val(),
          src: '0',
          warehouse_area_id: $(warehouse_area_id).val(),
          type: '0',
        }),
        success: function(e) {
          if ('Successful' === e.status) {
            $('#tipNoSku').hide();
            var t = e.data.length;
            if (0 === t) return;
            for (var a = 0; a < t; a++) {
              var r = e.data[a];
              r.number = 1;
              var i = {
                warehouse_area_name: $('#warehouse_area_id option:selected').text(),
                warehouse_area_id: $(warehouse_area_id).val(),
              }, l = $(detailTable);
              let t = l.getDataIDs();
              for (var o = t.length, n = 0, s = r.editable, d = 0; d < o; d++) {
                var _;
                if (r.sku_no === l.jqGrid('getCell', t[d], 'sku_no')) {
                  let e = $(`#number_${r.sku_id}`).val();
                  _ = $(`#price_${r.sku_id}`).val();
                  var u = parseInt(e, 10) + parseInt(r.number, 10);
                  isNaN(parseFloat(r.cost_price)) && (r.cost_price = '0.00'), l.jqGrid('setRowData', t[d], Object.assign(r, {
                    number: u,
                    sum: (u * parseFloat(_)).toFixed(2),
                    cost_price: _,
                  }));
                  break;
                }
                n++;
              }
              o === n && (isNaN(parseFloat(r.cost_price)) && (r.cost_price = '0.00'), r.sum = (r.cost_price * r.number).toFixed(2), l.jqGrid('addRowData', r.sku_id, $.extend({}, i, r))), 0 === Number(s) && l.jqGrid('setCell', r.sku_id, 'warehouse_bin_id', '', 'not-editable-cell');
            }
            $(inputScan).val(''), $(inputScan).focus();
          } else $('#tipNoSku').show();
          return 'skip';
        },
        error: function(e, t, a) {
          msg.alert(e.responseText);
        },
      });
    }
  }, deletex: function() {
    var e = $(detailTable).jqGrid('getGridParam', 'selrow');
    e && $(detailTable).jqGrid('delGridRow', e, { reloadAfterSubmit: !1 });
  }, clearInsertDialog: function() {
    $(warehouse_id).empty(), $(warehouse_area_id).empty(), $(other_stock_order_type).empty(), $(other_stock_order_state).val(''), $(note).val(''), $(inputScan).val(''), jqgrids.clearGrid(detailTable);
  }, verifyData: function() {
    return '-1' !== $('#warehouse_id').val() && '-1' !== $('#warehouse_area_id').val();
  }, deleteWmsOrder: function(e) {
    msg.confirm({
      text: '您确定删除该行记录吗?', onOk: function() {
        WMS_COMMON.delete(e, parentTable, !0);
      },
    });
  }, editCallback: function(e) {
    var t = e.data;
    warehouseAreaIdStash = t.warehouse_area_id, $(warehouse_id).val(t.warehouse_id).change(), $(wms_other_stock_order_id).val(t.other_stock_order_id), $(wms_other_stock_order_no).val(t.wms_other_stock_order_no), $(other_stock_order_type).val(t.other_stock_order_type).change(), $(other_stock_order_date).val(t.other_stock_order_date), $(note).val(t.note), warehouseBinIds = dataLoader.loadGridSelectData({
      warehouseId: $('#warehouse_id').val(),
      warehouseAreaId: t.warehouse_area_id,
    });
  }, uploadXlsFile: function() {
    excel.init(), $('#excelImport').dialog({
      width: 800, height: 400, title: '导入', buttons: {
        '取消': function() {
          excel.clearList(), $(this).dialog('close'), document.getElementById('fileNameInput').value = '';
        },
      },
    }).autoDialogHeight();
  }, startImport: function() {
    var e = document.getElementById('fileNameInput');
    if (0 !== e.files.length) {
      var t = {
        saveCount: 300,
        multipleTransform: WMS_OTHER_STOCK_IN.multipleTransform,
        multipleTransformColumns: ['warehouse_area_id', 'warehouse_bin_id'],
      };
      excelImport.importXlsx('wms_other_in_stock_order_detail', e, t);
    } else msg.alert('请选择需要导入的文件');
  }, multipleTransform: function(e, t, a, r) {
    var i, l = { isFailed: !1, errorData: e }, o = [];
    for (i = 0; i < t.length; i++) '' !== t[i][r] && -1 === o.indexOf(t[i][r]) && o.push(t[i][r]);
    if (o.length > 0) {
      var n = { values: o.join() }, s = {};
      if ($.ajax({
        url: {
          warehouse_area_id: '/api/baseinfo/warehouseArea/warehouseAndWarehouseAreaMap',
          warehouse_bin_id: '/api/baseinfo/warehouseBin/warehouseAndWarehouseBinMap',
        }[a[r]], type: 'post', data: n, async: !1, timeout: 3e5, success: function(e) {
          'Successful' === e.status ? s = e.data : l.isFailed = !0;
        }, error: function() {
          l.isFailed = !0;
        },
      }), l.isFailed) return l;
      var d = a.indexOf('warehouse_id'), _ = '';
      for (i = 0; i < t.length; i++) if (t[i][d] && (_ = parseInt(t[i][d])), '' !== t[i][r]) {
        var u = t[i][r];
        s[_] && s[_][u] ? t[i][r] = s[_][u] + '' : e[i] ? e[i].push(r) : e[i] = [r];
      }
    }
    return l.errorData = e, l;
  }, exportXlsFile: async function() {
    var e = $(parentTable), t = e.jqGrid('getGridParam', 'selarrrow'), a = {};
    if (t.length > 0) {
      if (t.length > 100 && !await _tools.syncConfirm(`预计导出${t.length}条入库单，耗时较长，您确认全部导出？`)) return;
      for (var r = [], i = 0; i < t.length; i++) {
        var l = e.jqGrid('getRowData', t[i]);
        r.push(l);
      }
      excelExport.exportData('wms_other_in_stock_order_detail_export', '其它入库单信息', r, a);
    } else {
      var o = filterSet.getCurrentCondition();
      if (!filterSet.checkValue(o)) return;
      var n = JSON.stringify(o), s = {};
      s.vo = n, s.page = 0, s.pageSize = 1e3;
      var d = e.jqGrid('getGridParam', 'records');
      if (d > 100 && !await _tools.syncConfirm(`预计导出${d}条入出库单，耗时较长，您确认全部导出？`)) return;
      var _ = new XMLHttpRequest;
      _ || (_ = new ActiveXObject('Microsoft.XMLHTTP')), _.open('HEAD', location.href, !0), _.onreadystatechange = function() {
        if (4 == _.readyState && 200 == _.status) {
          var e = _.getResponseHeader('Date');
          e = _tools.millisecondToDate(+new Date(e)), s.lastUpdateTime = e, excelExport.exportUrl('wms_other_in_stock_order_detail_export', '其它入库单信息', '/api/wms/other/querybyfilter', s, d, a);
        }
      }, _.send(null);
    }
  }, templateDownload: function() {
    templateDownload.download('wms_other_in_stock_order_detail');
  }, initPurchaseGrid: function() {
    let e = {
      mtype: 'POST',
      sortable: !0,
      colModel: [{ label: 'id', name: 'pms_purchase_order_id', hidden: !0, key: !0 }, {
        label: '仓库',
        name: 'warehouse_name',
        width: '80px',
      }, { label: '采购单号', name: 'pms_purchase_order_no', width: 160 }, {
        label: '采购日期',
        name: 'purchase_date',
        width: 120,
      }, { label: '创建时间', name: 'create_time', width: 120 }, {
        label: '制单人',
        name: 'creator_name',
        width: 80,
      }, { label: '商品类型', name: 'product_type', width: 80 }, {
        label: '订单类型',
        name: 'purchase_order_type',
        width: 80,
      }, { label: '备注', name: 'remarks', width: 120 }, {
        label: '送货地址',
        name: 'deliver_address',
        width: 80,
      }, { label: '合同条款', name: 'contract_terms', width: 80 }, {
        label: '审核时间',
        name: 'check_date',
        width: 120,
      }, { label: '审核人', name: 'auditor_name', width: 80 }],
      url: '/api/pms/old_purchaseOrder/querys',
      postData: {
        vo: JSON.stringify({
          'check_state-4-1': '1',
          'close_state-4-1': '0',
          'purchase_order_type-4-1': '0',
        }),
      },
      pager: $('#purchaseGridPager'),
      jsonReader: { root: 'list', page: 'page', total: 'totalPageCount', records: 'totalCount', repeatitems: !1 },
    };
    eg_grid.render('#purchaseGrid', e, !1, null, !0);
  }, showCreateFromPurchase: function() {
    let e = $('#purchaseGrid');
    e.hasClass('ui-jqgrid-btable') || WMS_OTHER_STOCK_IN.initPurchaseGrid(), dialog.openDialog({
      dialogId: 'createFromPurchaseDialog',
      customOpt: {
        width: 800, title: '采购订单', buttons: {
          '确定': function() {
            let t = e.find('.current_line');
            if (0 === t.length) return msg.alert('请选中一条采购单！');
            WMS_OTHER_STOCK_IN.editNewOrder(t.attr('id')), $(this).dialog('close');
          }, '取消': closeDialog,
        },
      },
      open: function() {
        $('#purchaseGrid').trigger('reloadGrid', [{ page: 1 }]);
      },
    });
  }, editNewOrder: function(e) {
    $.ajax({
      needMask: !0,
      type: 'POST',
      contentType: 'application/json',
      url: '/api/pms/purchaseOrder/generateStockInByPurchaseOrder',
      data: JSON.stringify({ purchaseOrderId: e }),
      success(e) {
        'Successful' === e.status && ($('#parentTable').trigger('reloadGrid', [{ page: 1 }]).trigger('resetSelectedRows'), WMS_OTHER_STOCK_IN.showUpdateDialog(e.pmsIds[0]));
      },
    });
  },
};
