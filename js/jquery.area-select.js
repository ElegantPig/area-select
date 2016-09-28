/**
 * @author Changfeng
 **/
(function($) {
    $.fn.extend({
        'initArea': function(options) {
            jQuery.extend(defaults, options);
            createAreaPanel(options);
            // 绑定点击打开事件
            $('body').on('click', '#'+options.triggerId, function() {
                $('#_area_mask').fadeIn();
                $('#_area_panel').fadeIn();
            });
            // 复原已选项
            if(options.selectedArea) {
                recoverSelected(options.selectedArea);
            }
        }
    });

    // 创建选择面板
    function createAreaPanel(options) {
        // 遮罩层
        var mask = $('<div id="_area_mask"></div>');
        $('body').append(mask);
        // 选择面板
        var panel = $('<div id="_area_panel"></div>');
        $('body').append(panel);
        // 顶部条
        var topBar = $('<div class="top-bar">选择区域<a href="javascript: void(0);" id="cancel" class="btn">取消</a><a href="javascript: void(0);" id="save" class="btn">保存</a></div>');
        $(panel).append(topBar);
        // 一级展示区
        var firstWrap = $('<div class="wrap first-wrap" data-level="1"></div>');
        $(panel).append(firstWrap);
        // 一级展示内容
        var firstUl = $('<ul></ul>');
        $(firstWrap).append(firstUl);
        for (var i in options.area) {
            var firstLiDom = $('<li><input type="checkbox" class="cb" value="' + options.area[i].id + '" data-name="' + options.area[i].value + '" /><a href="javascript: void(0);" data-id="' + options.area[i].id + '" class="area-item" title="' + options.area[i].value + '">' + options.area[i].value + '</a></li>');
            $(firstUl).append(firstLiDom);
            // 二级
            if (options.area[i].children && options.area[i].children.length != 0) {
                $(firstLiDom).find('.area-item').addClass('has-children');
                var secondWrap = $('<div class="wrap child-wrap second-wrap" data-level="2" data-pid="' + options.area[i].id + '"></div>');
                $(panel).append(secondWrap);
                var secondUl = $('<ul></ul>');
                $(secondWrap).append(secondUl);
                for (var j in options.area[i].children) {
                    var secondLiDom = $('<li><input type="checkbox" class="cb '+ options.area[i].id +'" value="' + options.area[i].children[j].id + '" data-pid="'+ options.area[i].id +'" data-name="' + options.area[i].children[j].value + '" /><a href="javascript: void(0);" data-id="' + options.area[i].children[j].id + '" class="area-item" title="' + options.area[i].children[j].value + '">' + options.area[i].children[j].value + '</a></li>');
                    $(secondUl).append(secondLiDom);
                    // 三级
                    if (options.area[i].children[j].children && options.area[i].children[j].children.length != 0) {
                        $(secondLiDom).find('.area-item').addClass('has-children');
                        var thirdWrap = $('<div class="wrap child-wrap third-wrap" data-level="3" data-pid="' + options.area[i].children[j].id + '"></div>');
                        $(panel).append(thirdWrap);
                        var thirdUl = $('<ul></ul>');
                        $(thirdWrap).append(thirdUl);
                        for (var k in options.area[i].children[j].children) {
                            var thirdLiDom = $('<li><input type="checkbox" class="cb '+ options.area[i].id +' '+ options.area[i].children[j].id +'" value="' + options.area[i].children[j].children[k].id + '" data-pid="'+ options.area[i].children[j].id +'" data-name="' + options.area[i].children[j].children[k].value + '" /><a href="javascript: void(0);" data-id="' + options.area[i].children[j].children[k].id + '" class="area-item" title="' + options.area[i].children[j].children[k].value + '">' + options.area[i].children[j].children[k].value + '</a></li>');
                            $(thirdUl).append(thirdLiDom);
                            // 四级
                            if (options.area[i].children[j].children[k].children && options.area[i].children[j].children[k].children.length != 0) {
                                $(thirdLiDom).find('.area-item').addClass('has-children');
                                var forthWrap = $('<div class="wrap child-wrap forth-wrap" data-level="4" data-pid="' + options.area[i].children[j].children[k].id + '"></div>');
                                $(panel).append(forthWrap);
                                var forthUl = $('<ul></ul>');
                                $(forthWrap).append(forthUl);
                                for (var m in options.area[i].children[j].children[k].children) {
                                    var forthLiDom = $('<li><input type="checkbox" class="cb '+ options.area[i].id +' '+ options.area[i].children[j].id +' '+ options.area[i].children[j].children[k].id +'" value="' + options.area[i].children[j].children[k].children[m].id + '" data-pid="'+ options.area[i].children[j].children[k].id +'" data-name="' + options.area[i].children[j].children[k].children[m].value + '" /><a href="javascript: void(0);" data-id="' + options.area[i].children[j].children[k].children[m].id + '" class="area-item" title="' + options.area[i].children[j].children[k].children[m].value + '">' + options.area[i].children[j].children[k].children[m].value + '</a></li>');
                                    $(forthUl).append(forthLiDom);
                                }
                            }
                        }
                    }
                }
            }
        }
        // 点击地区展开下级
        $('#_area_panel .area-item').bind('click', function() {
            var areaItem = this;
            var thisId = $(this).attr('data-id');
            var childWrap = $('#_area_panel .wrap[data-pid="' + thisId + '"]');
            var childLevel = $(childWrap).attr('data-level');
            if ($(childWrap).css('display') == 'none') {
                $('#_area_panel .wrap').each(function() {
                    if (parseInt($(this).attr('data-level')) >= parseInt(childLevel)) {
                        $(this).hide();
                    }
                });
                $(childWrap).slideDown(200);
                $(areaItem).closest('.wrap').find('.area-item').removeClass('on');
                $(areaItem).addClass('on');
            } else {
                $(childWrap).hide();
                $(areaItem).removeClass('on');
            }
        });
        // 点击取消按钮事件
        $('#_area_panel #cancel').bind('click', function() {
            closePanel();
            if (options.onCancel && typeof options.onCancel == 'function') {
                options.onCancel();
            }
        });
        // 点击保存按钮
        $('#_area_panel #save').bind('click', function() {
            var results = getCheckedVals();
            $('#_area_mask').fadeOut(150);
            $('#_area_panel').fadeOut(150);
            if (options.onSave && typeof options.onSave == 'function') {
                options.onSave(results);
            }
        });
        // 点击复选框
        $('#_area_panel .cb').bind('click', function() {
            $('#_area_panel .'+$(this).val()).prop('checked', $(this).is(':checked'));
            var thiscb = this;
            var pcb = $('#_area_panel .cb[value="'+ $(this).attr('data-pid') +'"]');
            while($(pcb).length != 0) {
                pcb.prop('checked', isSameLevelAllSelected(thiscb));
                thiscb = pcb;
                pcb = $('#_area_panel .cb[value="'+ $(pcb).attr('data-pid') +'"]');
            }
        });
    }

    // 复原已选框
    function recoverSelected(areaIdArr) {
        if(areaIdArr && areaIdArr.length > 0) {
            for(var i=0; i<areaIdArr.length; i++) {
                $('#_area_panel .cb[value="'+ areaIdArr[i] +'"]').prop('checked', true);
                $('#_area_panel .'+areaIdArr[i]).prop('checked', true);
            }
        }
    }

    // 同级是否全选
    function isSameLevelAllSelected(cb) {
        if($(cb).closest('.wrap').find('.cb').length == $(cb).closest('.wrap').find('.cb:checked').length) {
            return true;
        } else {
            return false;
        }
    }

    // 子级是否全选
    function isChildLevelAllSelected(cb) {
        if($('#_area_panel .cb[data-pid="'+ $(cb).val() +'"]').length == $('#_area_panel .cb[data-pid="'+ $(cb).val() +'"]:checked').length) {
            return true;
        } else {
            return false;
        }
    }

    // 关闭面板
    function closePanel() {
        $('#_area_mask').fadeOut(150);
        $('#_area_panel').fadeOut(150);
        setTimeout(function() {
            $('#_area_panel .cb').removeAttr('checked');
            $('#_area_panel .child-wrap').hide();
            $('#_area_panel .area-item').removeClass('on');
        }, 200);
    }

    // 获取选中的结果
    function getCheckedVals() {
        var results = {};
        var checkedCBs = jQuery.makeArray($('#_area_panel .cb:checked'));
        checkedCBs.reverse();
        $(checkedCBs).each(function() {
            if(isChildLevelAllSelected(this)) {
                results[$(this).val()] = $(this).attr('data-name');
                $('#_area_panel .cb[data-pid="'+ $(this).val() +'"]:checked').each(function() {
                    delete results[$(this).val()];
                });
            }
        });
        return results;
    }

    // 默认参数
    var defaults = {
        area: [],
        triggerId: '',
        selectedArea: {},
        onCancel: function() {},
        onSave: function() {}
    }
})(jQuery);