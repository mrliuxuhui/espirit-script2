var ORDER_TYPE,
    initWarehouseArea,
    warehouseAreaIdStash,
    batchUrl = '/wms/bill/other/batch',
    insertEventCount = 0,
    updateEventCount = 0,
    warehouseBinIds = '',
    isEdit = !1, flag = '1';
$(function() {
  ORDER_TYPE = 1, WMS_OTHER_STOCK_IN.init(), WMS_SN.initSN(), filterSet.customerCondition['order_type' + OPERATE_IN + ORDER_TABLE] = '1,3', top.EgeniePermission.checkPermit(window);
});
var WMS_OTHER_STOCK_IN = {
  init: function() {
    $('body').on('focus', '[type="number"]', function() {
      $(this).css({ textAlign: 'left' });
    }).on('blur', '[type="number"]', function() {
      $(this).css({ textAlign: 'right' });
    }), parentViews = defaultViews, picUtil = JsUtil, $('#insertBtn').click(WMS_OTHER_STOCK_IN.showInsertDialog), $('#editBtn').click(WMS_OTHER_STOCK_IN.showUpdateDialog), $('#approveBtn').click(WMS_OTHER_STOCK_IN.approve), $('#inApproveBtn').click(WMS_OTHER_STOCK_IN.inApprove), $('#deleteBtn').click(function() {
      WMS_OTHER_STOCK_IN.deleteWmsOrder(null);
    }), $('#importBtn').click(WMS_OTHER_STOCK_IN.uploadXlsFile), $('#importXLSBtn').click(WMS_OTHER_STOCK_IN.startImport), $('#exportBtn').click(WMS_OTHER_STOCK_IN.exportXlsFile), $('.templateDownload').click(WMS_OTHER_STOCK_IN.templateDownload), $('#setParamsBtn').click(WMS_OTHER_STOCK_IN.setParams), $('#printBarCode').click(warrant_out_print.openSkuProductTemp), $('#printOtherStockOutBtn').click(warrant_out_print.openOtherStockInOrOutTemp), $(defaultInsertDialog).on('dialogbeforeclose', function(e, t) {
      isEdit = !0;
    }), WMS_COMMON.changeSum(), $(warehouse_id).change(function() {
      $(detailTable).jqGrid('clearGridData'), WAREHOUSE_ID = $(this).val();
    }), $('#warehouse_area_id').change(function() {
      warehouseBinIds = dataLoader.loadGridSelectData({
        warehouseId: $('#warehouse_id').val(),
        warehouseAreaId: $('#warehouse_area_id').val(),
      });
      let e = this;
      $(detailTable).jqGrid('setColProp', 'warehouse_bin_id', { editoptions: { value: warehouseBinIds } }).trigger('reloadGrid').trigger('resetSelectedRows'), setTimeout(function() {
        $(e).data('isInit') || isEdit || $(detailTable).getRowData().length > 0 && msg.confirm({
          text: '切换库区将会清空当前录入信息，确定切换吗？',
          onOk: function() {
            initWarehouseArea = $(e).val(), $(detailTable).jqGrid('clearGridData');
          },
          onCancel: function() {
            $(e).data('isInit', !0), $(e).val(initWarehouseArea).change();
          },
        });
        isEdit = !1, $(e).data('isInit', !1);
      });
    }), $(inputScan).keydown(WMS_OTHER_STOCK_IN.selectSkuOrBarCode), $(other_stock_order_date).datepicker({ dateFormat: 'yy-mm-dd' }), initJQGridTableHasRequest(parentTable, '/api/wms/other/querybyfilter', WMS_OTHER_STOCK_IN_OR_OUT_MODEL.QUERY_LIST_PARENT, {
      search_key: 'order_type',
      search_value: ORDER_TYPE,
      operator: 0,
      vo: '{"order_type-4-1":"1,3"}',
    }, 50, '100%', 230, parentTablePage, 'json', 'POST', emptyListMessage, jqPageLimits, null, null, null, null, WMS_OTHER_STOCK_IN.onCellSelect, function() {
      top.EgeniePermission.checkPermit(window);
    }, WMS_OTHER_STOCK_IN.beforeSelectRow, function() {
    }, function() {
    }), initJQGridTableHasRequest(childrenTable, null, WMS_OTHER_STOCK_IN_OR_OUT_MODEL.QUERY_LIST_CHILDREN, null, 50, 200, 230, childrenTablePage, 'local', 'POST', emptyListMessage, jqPageLimits, null, WMS_SN.onRowEvent, null, null, null), $(childrenTable).on('jqGridLoadComplete', function(e) {
      WMS_OTHER_STOCK_IN.countTotal($(this).getRowData(), 'childrenTablePage');
    }), $(addSkuBtn).on('click', function() {
      '-1' === $(warehouse_id).val() || '-1' === $(warehouse_area_id).val() || '-1' === $(other_stock_order_type).val() || '' === $(other_stock_order_date).val() ? msg.alert('请选择仓库，库区，入库单类型和制单日期') : (initWarehouseArea = $('#warehouse_area_id').val(), WMS_ADD_SKU_BATCH.showAddOrderAddSkuDialog(_addPartDialog, _searchKey, _searchValue, detailTable, batchUrl, 1200, 'auto', '批量添加出库商品', _partSearchGrid, _partSelectedGrid, _partSearchGridPager, _partSelectedGridPager, BATCH_ADD_MODEL.ADD_OUT_SEARCH, BATCH_ADD_MODEL.ADD_OUT_SELECT, 1, flag));
    });
  }, beforeSelectRow: function(e, t, a) {
    var r = { search_key: 'wms_other_stock_order_id', search_value: e, operator: '0' };
    $(childrenTable).jqGrid('setGridParam', {
      datatype: 'json',
      url: '/wms/bill/other/getdetail',
      postData: r,
    }).trigger('reloadGrid').trigger('resetSelectedRows');
  }, getWarehouseArea: function() {
    $('warehouse_area_id').empty(), $.ajax({
      url: '/api/baseinfo/warehouseArea/get',
      method: 'POST',
      data: { warehouseId: $(warehouse_id).val() },
      success: function(e) {
        select.render(e.data, 'id', 'warehouseAreaName', $(warehouse_area_id), !0, null, warehouseAreaIdStash), $(warehouse_area_id).val();
      },
    }), initWarehouseArea = '-1';
  }, approve: function() {
    WMS_COMMON.approve(parentTable, '1');
  }, inApprove: function() {
    WMS_COMMON.inApprove(parentTable);
  }, setParams: function() {
    dialog.openDialog({
      dialogId: 'isShowZeroStockDialog', customOpt: {
        title: '参数设置', buttons: {
          '保存': function() {
            WMS_OTHER_STOCK_IN.checkParams(), $(this).dialog('close');
          }, '取消': function() {
            $(this).dialog('close');
          },
        },
      },
    });
  }, checkParams: function() {
    return flag = $('#checkZero')[0].checked ? '0' : '1';
  }, save: function() {
    if (!WMS_OTHER_STOCK_IN.verifyData()) return msg.alert('单据信息不完整');
    let e = WMS_COMMON.transform($(defaultInsertForm).serializeArray()), t = {}, a = $(detailTable), r = a.getDataIDs(),
      i = ['warehouse_area_id', 'warehouse_bin_id', 'sku_id', 'batch_id', 'batch_no', 'expiry_date', 'manufacture_date', 'number', 'cost_price', 'note', 'sns', 'stock_num'];
        a.find('.jqgrow').first().find('[aria-describedby="detailTable_product_name"]').click(),
        t.count = r.length,
            r.forEach((e, r) => {
      t[r + 1 + '_children'] = Object.assign(JSON.parse(JSON.stringify(a.getRowData(e), i)), { number: $(`#number_${e}`).val() }, { cost_price: $(`#price_${e}`).val() }, { warehouse_bin_id: $('#select_warehouse_bin_id_' + e).val() || '' });
    }), $.ajax({
      url: wmsPrefix + '/create',
      type: 'POST',
      dataType: 'json',
      contentType: defaultContentType,
      data: JSON.stringify({ parent: e, children: t }),
      success: function(e) {
        'Successful' === e.status && (msg.ok(e.data), $(parentTable).trigger('reloadGrid'), $(defaultInsertDialog).dialog('destroy'), $('#detailTable').GridUnload(), WMS_OTHER_STOCK_IN.clearInsertDialog());
      },
    });
  }, showInsertDialog: function() {
    $(detailTable).clearGridData(), $(detailTable).GridUnload(), warehouseAreaIdStash = null, select.render('/api/baseinfo/warehouse/get', 'id', 'warehouseName', $(warehouse_id), !0, WMS_OTHER_STOCK_IN.getWarehouseArea, '', !1, '', 'dd_warehouse', {}, !0), $(order_type).val(ORDER_TYPE), $(other_stock_order_date).val((new Date).toFormattedString('yyyy-MM-dd')), WMS_COMMON.billEditable(defaultInsertDialog, detailTable), select.render('/wms/bill/other/type/1', 'key', 'val', $(other_stock_order_type), !1, null, 2), 0 === insertEventCount && WMS_ADD_SKU_BATCH.bindSkuEvent(batchUrl, _batchAddBtn, _partSearchGrid, _batchDeleteBtn, _partSelectedGrid, _searchValue, _searchKey, _searchPartBtn, flag, '1'), $(defaultInsertDialog).dialog({
      width: 1200,
      height: 'auto',
      title: '新建其它出库单',
      resizable: !1,
      buttons: {
        '保存': function() {
          WMS_OTHER_STOCK_IN.save();
        }, '取消': function() {
          isEdit = !0, $(defaultInsertDialog).dialog('destroy'), $('#detailTable').GridUnload(), WMS_OTHER_STOCK_IN.clearInsertDialog();
        },
      },
      open: function() {
      },
      isReload: !0,
    }).autoDialogHeight(), initJQGridTableHasRequest(detailTable, '', WMS_OTHER_STOCK_IN_OR_OUT_MODEL.ADD_OR_EDIT_MODEL, {}, 1e3, 600, 500, detailTablePage, 'local', 'POST', emptyListMessage, jqPageLimits, null, null, WMS_OTHER_STOCK_IN.beforeSaveCell, WMS_OTHER_STOCK_IN.afterEditCell, null, WMS_OTHER_STOCK_IN.gridComplete, null, null, WMS_OTHER_STOCK_IN.afterSaveCell), $(detailTable).trigger('reloadGrid').trigger('resetSelectedRows'), insertEventCount++;
  }, gridComplete: function() {
    $('select[id^=\'select_warehouse_bin_id_\']').change().prop('disabled', !0);
    $(detailTable).getRowData(), $(detailTable).getDataIDs();
    $('#detailTable').setGridHeight($('#defaultInsertDialog').height() - $('#selectProductRow').height() - 150), $(detailTable).find('.inRowSelect').select2();
  }, setNumVal: function(e) {
    var t = $(detailTable), a = (t.getCell(e, 'number') * t.getCell(e, 'cost_price')).toFixed(2);
    t.setCell(e, 'sum', a), WMS_OTHER_STOCK_IN.countTotal(t.getRowData(), 'detailTablePage');
  }, countTotal: function(e, t) {
    let a = 0, r = 0;
    e.forEach(e => {
      a += +e.number, r += +e.sum;
    }), document.getElementById(t + '-statistics') || $('#' + t).find('div[role=group]').prepend(`\n        <div class="pull-left" id="${t}-statistics" style="line-height: 28px; margin-left: 160px">\n          <span style="font-size: 14px; margin-right: 10px; border-right: 1px solid">本页统计&nbsp;&nbsp;</span>\n          <span>数量： </span><span id="${t}-totalNumber" style="margin-right: 15px"></span>\n          <span>总金额： </span><span id="${t}-totalSum" style="margin-right: 15px"></span>\n        </div>`.trimMultiLine()), $(`#${t}-totalNumber`).html(a), $(`#${t}-totalSum`).html(r.toFixed(4));
  }, update: function() {
    if (!WMS_OTHER_STOCK_IN.verifyData()) return void msg.alert('单据信息不完整');
    let e = $(defaultInsertForm).serializeArray(), t = $(detailTable),
      a = jsons.join(WMS_COMMON.transform(e), { wms_other_stock_order_id: $(wms_other_stock_order_id).val() });
    var r = [],
      i = ['wms_other_stock_order_detail_id', 'warehouse_area_id', 'warehouse_bin_id', 'sku_id', 'batch_id', 'batch_no', 'expiry_date', 'manufacture_date', 'number', 'cost_price', 'note', 'sns'];
    t.find('tr').each(function() {
      let e = $(this).attr('id');
      if (e) {
        let a = JSON.parse(JSON.stringify(t.getRowData(e), i));
        a.number = $(`#number_${a.sku_id}`).val(), a.cost_price = $(`#price_${a.sku_id}`).val(), a.batch_id = '0', a.warehouse_bin_id = $('#select_warehouse_bin_id_' + e).val() || '', r.push(a);
      }
    }), a.skus = r, $.ajax({
      url: wmsPrefix + '/update',
      type: 'POST',
      dataType: 'json',
      contentType: defaultContentType,
      data: JSON.stringify(a),
      success: function(e) {
        'Successful' === e.status && (msg.ok('更新成功！'), $(parentTable).trigger('reloadGrid'), $(defaultInsertDialog).dialog('destroy'), $('#detailTable').GridUnload(), WMS_OTHER_STOCK_IN.clearInsertDialog());
      },
    });
  }, setEditOption: function(e) {
    let t = warehouseBinIds.split(';').map(t => {
      let a = t.split(':');
      return `<option value="${a[0]}" ${a[0] == e ? 'selected' : ''}>${a[1]}</option>`;
    });
    return `<select data-value="${e}">${t.join('')}</select>`;
  }, showUpdateDialog: function(e) {
    $('#tipNoSku').hide();
    var t = {};
    t.id = String(e), $.ajax({
      url: wmsPrefix + '/edit',
      type: 'POST',
      contentType: defaultContentType,
      dataType: 'json',
      data: JSON.stringify(t),
      success: function(t) {
        null !== t ? (isEdit = !0, WMS_OTHER_STOCK_IN.initEditFrom(e), WMS_OTHER_STOCK_IN.editCallback(t)) : msg.alert('没有查询到当前选定的其它入库单信息');
      },
      error: function(e, t, a) {
        msg.alert(e.responseText);
      },
    });
  }, initEditFrom: function(e) {
    select.render('/api/baseinfo/warehouse/get', 'id', 'warehouseName', $(warehouse_id), !0, WMS_OTHER_STOCK_IN.getWarehouseArea, '', !1, '', 'dd_warehouse', {}, !0), $(order_type).val(ORDER_TYPE), $(other_stock_order_date).val((new Date).toFormattedString('yyyy-MM-dd')), select.render('/wms/bill/other/type/1', 'key', 'val', $(other_stock_order_type), !1, null, 2), WMS_ADD_SKU_BATCH.bindSkuEvent(batchUrl, _batchAddBtn, _partSearchGrid, _batchDeleteBtn, _partSelectedGrid, _searchValue, _searchKey, _searchPartBtn, flag, '1'), setTimeout(function() {
      WAREHOUSE_ID = $('#warehouse_id').val(), initWarehouseArea = $('#warehouse_area_id').trigger('change').val();
    }, 1), $(defaultInsertDialog).dialog({
      height: 'auto',
      width: 1200,
      title: '编辑其它出库单',
      resizable: !1,
      buttons: {
        '保存': function() {
          WMS_OTHER_STOCK_IN.update();
        }, '取消': function() {
          isEdit = !0, $(defaultInsertDialog).dialog('close'), WMS_OTHER_STOCK_IN.clearInsertDialog();
        },
      },
      open: function() {
        $(detailTable).GridUnload();
      },
    }).autoDialogHeight(), initJQGridTableHasRequest(detailTable, null, WMS_OTHER_STOCK_IN_OR_OUT_MODEL.ADD_OR_EDIT_MODEL, {}, 1e3, 600, 500, detailTablePage, 'local', 'get', emptyListMessage, jqPageLimits, null, null, WMS_OTHER_STOCK_IN.beforeSaveCell, WMS_OTHER_STOCK_IN.afterEditCell, null, WMS_OTHER_STOCK_IN.gridComplete, null, null, WMS_OTHER_STOCK_IN.afterSaveCell), $(detailTable).trigger('reloadGrid').trigger('resetSelectedRows'), setTimeout(function() {
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
    var o = $(detailTable);
    if ('batch_no' === t && o.getDataIDs().some(e => o.jqGrid('getCell', e, t) === a)) return '';
    if ('manufacture_date' == t) {
      var l, n = parseInt($(detailTable).jqGrid('getCell', e, 'guarantee_period'), 10);
      l = a.split('-');
      var s = new Date(l[0], l[1] - 1, l[2]), d = s.getTime() + 24 * n * 60 * 60 * 1e3;
      return s.setTime(d), tb.jqGrid('setCell', r, 'expiry_date', s.toFormattedString('yyyy-MM-dd')), a;
    }
  }, afterEditCell: function(e, t, a, r, i) {
    'manufacture_date' == t && $('#' + r + '_manufacture_date', detailTable).datepicker({ dateFormat: 'yy-mm-dd' });
    $('#' + e + '_warehouse_bin_id').select2({
      allowClear: !0,
      width: '100%',
      theme: 'classic',
    }).select2('open').on('select2:select', function(e) {
      $($(e.target).parents('table').find('.jqgrid-rownum')[0]).click();
    });
  }, afterSaveCell: function(e, t, a, r, i) {
    'number' !== t && 'cost_price' !== t || WMS_OTHER_STOCK_IN.setNumVal(e);
  }, selectSkuOrBarCode: function(e) {
    if (13 === e.keyCode) {
      let e = $(warehouse_id).val(), r = $(warehouse_area_id).val(), i = $(other_stock_order_type).val(),
        o = $(other_stock_order_date).val();
      if ('' === e || '-1' === e || '' === r || '-1' === r || '' === i || '-1' === i || '' === o) return msg.alert('请选择仓库、单据类型和制单日期。');
      $('#tipNoSku').hide(), initWarehouseArea = $('#warehouse_area_id').val();
      var t = $(inputScan).val();
      if ('' === t) return;
      var a = {
        key: $(uniqueNo).val(),
        value: t,
        warehouse: $('#warehouse_id').val(),
        src: '0',
        type: '1',
        warehouse_area_id: $(warehouse_area_id).val(),
      };
      '0' === (flag = WMS_OTHER_STOCK_IN.checkParams()) ? a.flag = '0' : '1' === flag && (a.flag = '1'), $.ajax({
        url: '/wms/bill/other/sku',
        type: 'POST',
        dataType: 'json',
        contentType: defaultContentType,
        data: JSON.stringify(a),
        success: function(e) {
          if ('Successful' === e.status) {
            $('#tipNoSku').hide();
            var a = e.data.length;
            if (0 === a) return void msg.alert('库存中未查询到SKU编码为：' + t + '相关数据');
            for (var r = 0; r < a; r++) {
              var i = e.data[r];
              i.number = 1;
              var o = {
                warehouse_area_name: $('#warehouse_area_id option:selected').text(),
                warehouse_area_id: $(warehouse_area_id).val(),
                warehouse_bin_id: i.warehouse_bin_id,
              }, l = $(detailTable);
              let t = l.getDataIDs();
              for (var n = t.length, s = 0, d = i.editable, _ = 0; _ < n; _++) {
                var u;
                if (i.sku_no === l.jqGrid('getCell', t[_], 'sku_no')) {
                  let e = $(`#number_${i.sku_id}`).val();
                  u = $(`#price_${i.sku_id}`).val();
                  var c = parseInt(e, 10) + parseInt(i.number, 10);
                  isNaN(parseFloat(i.cost_price)) && (i.cost_price = '0.00'), l.jqGrid('setRowData', t[_], Object.assign(i, {
                    number: c,
                    sum: (c * parseFloat(u)).toFixed(2),
                    cost_price: u,
                  }));
                  break;
                }
                s++;
              }
              n === s && (isNaN(parseFloat(i.cost_price)) && (i.cost_price = '0.00'), i.sum = (i.cost_price * i.number).toFixed(2), l.jqGrid('addRowData', i.sku_id, $.extend({}, o, i))), 0 === Number(d) && l.jqGrid('setCell', i.sku_id, 'warehouse_bin_id', '', 'not-editable-cell');
            }
            $(inputScan).val(''), $(inputScan).focus(), $('select[id^=\'select_warehouse_bin_id_\']').select2().change().prop('disabled', !0);
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
    null !== e && $(detailTable).jqGrid('delGridRow', e, { reloadAfterSubmit: !1 });
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
    warehouseAreaIdStash = t.warehouse_area_id, $(warehouse_id).val(t.warehouse_id).change(), WAREHOUSE_ID = t.warehouse_id + '', $(wms_other_stock_order_id).val(t.other_stock_order_id), $(wms_other_stock_order_no).val(t.other_stock_order_no), $(other_stock_order_type).val(t.other_stock_order_type).change(), $(other_stock_order_date).val(t.other_stock_order_date), $(note).val(t.note), warehouseBinIds = dataLoader.loadGridSelectData({
      warehouseId: $('#warehouse_id').val(),
      warehouseAreaId: t.warehouse_area_id,
    });
  }, uploadXlsFile: function() {
    excel.init(), $('#excelImport').dialog({
      width: 800, height: 400, title: '导入', buttons: {
        '取消': function() {
          excel.clearList(), $(this).dialog('destroy'), document.getElementById('fileNameInput').value = '';
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
      excelImport.importXlsx('wms_other_out_stock_order_detail', e, t);
    } else msg.alert('请选择需要导入的文件');
  }, multipleTransform: function(e, t, a, r) {
    for (var i = {
      isFailed: !1,
      errorData: e,
    }, o = [], l = 0; l < t.length; l++) '' !== t[l][r] && -1 === o.indexOf(t[l][r]) && o.push(t[l][r]);
    if (o.length > 0) {
      var n = { values: o.join() }, s = {};
      if ($.ajax({
        url: {
          warehouse_area_id: '/api/baseinfo/warehouseArea/warehouseAndWarehouseAreaMap',
          warehouse_bin_id: '/api/baseinfo/warehouseBin/warehouseAndWarehouseBinMap',
        }[a[r]], type: 'post', data: n, async: !1, timeout: 3e5, success: function(e) {
          'Successful' === e.status ? s = e.data : i.isFailed = !0;
        }, error: function() {
          i.isFailed = !0;
        },
      }), i.isFailed) return i;
      var d = a.indexOf('warehouse_id'), _ = '';
      for (l = 0; l < t.length; l++) if (t[l][d] && (_ = parseInt(t[l][d])), '' !== t[l][r]) {
        var u = t[l][r];
        s[_] && s[_][u] ? t[l][r] = s[_][u] + '' : e[l] ? e[l].push(r) : e[l] = [r];
      }
    }
    return i.errorData = e, i;
  }, exportXlsFile: async function() {
    var e = $(parentTable), t = e.jqGrid('getGridParam', 'selarrrow'), a = {};
    if (t.length > 0) {
      if (t.length > 100 && !await _tools.syncConfirm(`预计导出${t.length}条出库单，耗时较长，您确认全部导出？`)) return;
      for (var r = [], i = 0; i < t.length; i++) {
        var o = e.jqGrid('getRowData', t[i]);
        r.push(o);
      }
      excelExport.exportData('wms_other_out_stock_order_detail_export', '其它出库单信息', r, a);
    } else {
      var l = filterSet.getCurrentCondition();
      if (!filterSet.checkValue(l)) return;
      var n = JSON.stringify(l), s = {};
      s.vo = n, s.page = 0, s.pageSize = 100;
      var d = e.jqGrid('getGridParam', 'records');
      if (d > 100 && !await _tools.syncConfirm(`预计导出${d}条出库单，耗时较长，您确认全部导出？`)) return;
      var _ = new XMLHttpRequest;
      _ || (_ = new ActiveXObject('Microsoft.XMLHTTP')), _.open('HEAD', location.href, !0), _.onreadystatechange = function() {
        if (4 == _.readyState && 200 == _.status) {
          var e = _.getResponseHeader('Date');
          e = _tools.millisecondToDate(+new Date(e)), s.lastUpdateTime = e, excelExport.exportUrl('wms_other_out_stock_order_detail_export', '其它出库单信息', '/api/wms/other/querybyfilter', s, d, a);
        }
      }, _.send(null);
    }
  }, templateDownload: function() {
    templateDownload.download('wms_other_out_stock_order_detail');
  }, getTotalNumber: function(e, t) {
    return parseInt($(t).jqGrid('getCell', e, '_number'), 10);
  },
};
