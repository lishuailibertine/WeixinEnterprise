var openDialogId;
(function ($) {
    var myflow = $.myflow;
    var ddClick = function() {
        openDialogId = $(this).parent().prev();
        var jsonData = openDialogId.attr("cusTextValue");
        oProcessAdd.openAddWin(jsonData);
    };
    var selectPFormModule = function() {
        var inputValue = $(this).parent().prev();
        var jsonData = inputValue.attr("cusTextValue");
        if (typeof (jsonData) == "undefined" || jsonData == null || jsonData=="")
            oProcessAdd.pFormModuleJsonData = "";
        else
        oProcessAdd.pFormModuleJsonData = JSON.parse(jsonData);
        oProcessAdd.openSelectProcessFormWin();

    };
    //流程分类点击事件
    var selectPKindModule = function () {
        var inputValue = $(this).parent().prev();
        var jsonData = inputValue.attr("cusTextValue");
        if (typeof (jsonData) == "undefined" || jsonData == null || jsonData == "")
            oProcessAdd.pKindModuleJsonData = "";
        else
            oProcessAdd.pKindModuleJsonData = JSON.parse(jsonData);
        oProcessAdd.openSelectProcessKindWin();

    };
    var selectBandModule = function() {
        var inputValue = $(this).parent().prev();
        var jsonData = inputValue.attr("cusTextValue");
        oProcessAdd.bandccModuleJsonData = JSON.parse(jsonData);
        oProcessAdd.openSelectBandWin();

    };
    var selectCcModule = function() {
        var inputValue = $(this).parent().prev();
        var jsonData = inputValue.attr("cusTextValue");
        oProcessAdd.bandccModuleJsonData = JSON.parse(jsonData);
        oProcessAdd.openSelectCcModleWin(jsonData);

    };
    //选择流程分支的定义
    var selectRelation = function () {
        openDialogId = $(this).parent().prev();
        var jsonData = openDialogId.attr("cusTextValue");
        if (typeof (jsonData) == "undefined")
            oProcessAdd.openSelectRelationWin(encodeURIComponent(""));
        else
            oProcessAdd.openSelectRelationWin(jsonData);

    }
    $.extend(true, myflow.editors, {
        inputEditor: function () {
            var _props, _k, _divId, _src, _r;
            this.init = function (props, k, divId, src, r) {
                debugger;
                _props = props; _k = k; _divId = divId; _src = src; _r = r;
                $('<input style="width:100%;"/>').val(props[_k].value).change(function () {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _divId);
                $('#' + _divId).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _divId + ' input').each(function () {
                    _props[_k].value = $(this).val();
                });
            }
        },
        inputReadOnlyEditor: function () {
            var _props, _k, _divId, _src, _r;
            this.init = function (props, k, divId, src, r) {
                _props = props; _k = k; _divId = divId; _src = src; _r = r;
                $('<input style="width:100%;"/>').val(props[_k].value).change(function () {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _divId);
                $('#' + _divId).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _divId + ' input').each(function () {
                    _props[_k].value = $(this).val();
                });
            }
        },
        checkboxEditor: function () {
            var _props, _k, _div, _src, _r;
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                var html = $('<input type="checkbox" style="width:auto;"/>');
                html.change(function () {
                    if ($(this).is(':checked') == true) {
                                props[_k].value = "true";
                            } else {
                                props[_k].value = "false";
                            }
                }).appendTo('#' + _div);
                if (props[_k].value == "true") {
                    html.attr("checked", "checked");
                } else {
                    html.removeAttr("checked");
                }
                $('#' + _div).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    _props[_k].value = $(this).attr("checked");
                });
            }
        },
        textareaEditor: function () {
            var _props, _k, _divId, _src, _r;
            this.init = function (props, k, divId, src, r) {
                _props = props; _k = k; _divId = divId; _src = src; _r = r;
                $('<textarea style="width:100%;" rows=2/>').val(props[_k].value).change(function () {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _divId);
                $('#' + _divId).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _divId + ' textarea').each(function () {
                    _props[_k].value = $(this).val();
                });
            }
        },
        searchEditor: function () {
            var _props, _k, _div, _src, _r;
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                $('#' + _div).addClass("input-group");
               
                $('<input type="text" placeholder="search..."  cusTextValue="' + props[_k].formJson + '"  style="margin-top: 5px;"/>').val(props[_k].value).change(function () {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _div);
                $('<span class="input-group-btn" ><button id="searchBtn' + _div + '" class="btn btn-default" type="button"style="border:none;  background: url(/Content/Image/workflow/img/search.png) no-repeat center center; width: 15px;height: 25px;margin-top: 1px;"></button></span>  ').appendTo('#' + _div);
                $("#searchBtn" + _div).bind("click", ddClick);
                $('#' + _div).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    _props[_k].value = $(this).val();
                });
            }
        },
        searchProcessFormEditor: function () {
            var _props, _k, _div, _src, _r;
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                $('#' + _div).addClass("input-group");
                $('<input type="text" id="txt_' + _div + '" placeholder="search..." cusTextValue="' + props[_k].formJson + '" style="margin-top: 5px;"/>').val(props[_k].value).change(function () {
                    debugger;
                    props[_k].value = $(this).val();
                    props[_k].formJson = $(this).attr("cusTextValue");
                }).appendTo('#' + _div);
                $('<span class="input-group-btn" ><button id="searchPFormBtn' + _div + '" class="btn btn-default" type="button"style="border:none;  background: url(/Content/Image/workflow/img/search.png) no-repeat center center; width: 15px;height: 25px;margin-top: 1px;"></button></span>  ').appendTo('#' + _div);
                $("#searchPFormBtn" + _div).bind("click", selectPFormModule);
                $('#' + _div).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    
                    props[_k].value = $(this).val();
                });
            }
        },
        searchProcessKindEditor: function () {
            var _props, _k, _div, _src, _r;
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                $('#' + _div).addClass("input-group");
                $('<input type="text" id="txt_' + _div + '" placeholder="search..." style="margin-top: 5px;"/>').val(props[_k].value).change(function () {
                    debugger;
                    props[_k].value = $(this).val();
                   
                }).appendTo('#' + _div);
                $('<span class="input-group-btn" ><button id="searchPKindBtn' + _div + '" class="btn btn-default" type="button"style="border:none;  background: url(/Content/Image/workflow/img/search.png) no-repeat center center; width: 15px;height: 25px;margin-top: 1px;"></button></span>  ').appendTo('#' + _div);
                $("#searchPKindBtn" + _div).bind("click", selectPKindModule);
                $('#' + _div).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    _props[_k].value = $(this).val();
                });
            }
        },

        searchBandEditor: function () {
            var _props, _k, _div, _src, _r;
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                $('#' + _div).addClass("input-group");
                $('<input type="text" id="txt_' + _div + '" placeholder="search..." style="margin-top: 5px;"/>').val(props[_k].value).change(function () {
                    debugger;
                    props[_k].value = $(this).val();
                    props[_k].bandJson = $(this).attr("cusTextValue");

                }).appendTo('#' + _div);
                $('<span class="input-group-btn" ><button id="searchBandBtn' + _div + '" class="btn btn-default" type="button"style="border:none;  background: url(/Content/Image/workflow/img/search.png) no-repeat center center; width: 15px;height: 25px;margin-top: 1px;"></button></span>  ').appendTo('#' + _div);
                $("#searchBandBtn" + _div).bind("click", selectBandModule);
                $('#' + _div).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    _props[_k].value = $(this).val();
                });
            }
        },
        searchCcModuleEditor: function () {
            var _props, _k, _div, _src, _r;
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                $('#' + _div).addClass("input-group");
                $('<input type="text" id="txt_' + _div + '" placeholder="search..." style="margin-top: 5px;"/>').val(props[_k].value).change(function () {
                    debugger;
                    props[_k].value = $(this).val();
                    props[_k].ccJson = $(this).attr("cusTextValue");

                }).appendTo('#' + _div);
                $('<span class="input-group-btn" ><button id="searchCcBtn' + _div + '" class="btn btn-default" type="button"style="border:none;  background: url(/Content/Image/workflow/img/search.png) no-repeat center center; width: 15px;height: 25px;margin-top: 1px;"></button></span>  ').appendTo('#' + _div);
                $("#searchCcBtn" + _div).bind("click", selectCcModule);
                $('#' + _div).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    _props[_k].value = $(this).val();
                });
            }
        },
        searchPathEditor: function () {
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                $('#' + _div).addClass("input-group");
                $('<input type="text"  placeholder="search..." style="margin-top: 5px;" />').val(props[k].value).change(function () {
                    props[k].value = $(this).val();
                    props[k].hideValue = $(this).attr("cusTextValue");
                    $(r).trigger("textchange", [$(this).val(), src]);
                }).appendTo('#' + _div);
                $('<span class="input-group-btn" ><button id="searchPathBtn' + _div + '" class="btn btn-default" type="button"style="border:none;  background: url(/Content/Image/workflow/img/search.png) no-repeat center center; width: 15px;height: 25px;margin-top: 1px;"></button></span>  ').appendTo('#' + _div);
                $("#searchPathBtn" + _div).bind("click", selectRelation);
                $('#' + _div).data('editor', this);
            }
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    _props[_k].value = $(this).val();
                    $(r).trigger("textchange", [$(this).val(), src]);
                });
            }
        },
        selectEditor: function (arg) {
            var _props, _k, _div, _src, _r;
            this.init = function (props, k, div, src, r) {
                _props = props; _k = k; _div = div; _src = src; _r = r;
                var sle = $('<select  style="width:100%;"/>').val(props[_k].value).change(function () {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _div);
                if (typeof arg === 'string') {
                    $.ajax({
                        type: "GET",
                        url: arg,
                        dataType: "text/html",
                        success: function (data) {
                            var opts = eval(data);
                            if (opts && opts.length) {
                                for (var idx = 0; idx < opts.length; idx++) {
                                    sle.append('<option value="' + opts[idx].value + '">' + opts[idx].name + '</option>');
                                }
                                sle.val(_props[_k].value);
                            }
                        },
                        error: function (data) {
                            alert(data);
                        }
                    });
                } else {
                    //debugger;
                    //添加逻辑判断：如果没有传值
                    if (typeof (arg) != "undefined") {
                        for (var idx = 0; idx < arg.length; idx++) {
                            sle.append('<option value="' + arg[idx].value + '">' + arg[idx].name + '</option>');
                        }
                    }

                    sle.val(_props[_k].value);
                }
                $('#' + _div).data('editor', this);
            };
            this.destroy = function () {
                $('#' + _div + ' input').each(function () {
                    _props[_k].value = $(this).val();
                });
            };
        }
    });
})(jQuery);