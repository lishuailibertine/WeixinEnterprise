(function ($) {
    var myflow = $.myflow;
    $.extend(true, myflow.config.rect, {
        attr: {
            r: 8,
            fill: '#F6F7FF',
            stroke: '#03689A',
            "stroke-width": 2
        }
    });
    $.extend(true, myflow.config.props.props, {
        text: { name: 'processname', label: '流程名称', value: '新建流程', processGuid: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputEditor(); } },
        processkind: { name: 'processkind', label: '流程分类', value: '日常办公', processKindGuid: '652112EB-2BD0-45F1-B4E4-049244F4148D', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.searchProcessKindEditor(); } },
        isactive: { name: 'isactive', label: '是否启用', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.checkboxEditor(); } },
        allowautopass: { name: 'allowautopass', label: '同一责任人跳过', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.checkboxEditor(); } },
        description: { name: 'description', label: '流程说明', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textareaEditor(); } },
        formModule: { name: 'formModule', label: '表单对象', value: '', formJson: '', formModuleGuid: '', bt_DomainXml: '', form_Html: '', textType: "formInfo", textTypeDes: "默认表单", editor: function () { return new myflow.editors.searchProcessFormEditor(); } },
        namecodingrule: { name: 'namecodingrule', label: '流程标题', value: '', textType: "nameSetting", textTypeDes: "命名规则", editor: function () { return new myflow.editors.inputEditor(); } },
        codecodingrule: { name: 'codecodingrule', label: '流程编码', value: '', textType: "nameSetting", textTypeDes: "命名规则", editor: function () { return new myflow.editors.inputEditor(); } },
        isautosave: { name: 'isautosave', label: '允许自动归档', value: '', textType: "fileSetting", textTypeDes: "归档设置", editor: function () { return new myflow.editors.checkboxEditor(); } },
        candatasave: { name: 'candatasave', label: '	允许数据归档', value: '', textType: "fileSetting", textTypeDes: "归档设置", editor: function () { return new myflow.editors.checkboxEditor(); } }
    });

    $.extend(true, myflow.config.tools.states, {
        start: {
            showType: 'image',
            type: 'start',
            name: { text: '<<start>>' },
            text: { text: '开始' },
            img: { src: 'Content/Image/workflow/img/48/start_event_empty.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                text: { name: 'text', label: '步骤名称', value: '发起', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textEditor(); } },
                stepType: { name: 'stepType', label: '步骤类型', value: '开始', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputEditor(); } },
                formModule: { name: 'formModule', label: '表单对象', value: '', formJson: '', formModuleGuid: '', bt_DomainXml: '', form_Html: '', textType: "formInfo", textTypeDes: "表单对象", editor: function () { return new myflow.editors.searchEditor(); } },
                auditor: { name: 'auditor', label: '责任人', value: '', bandJson: '', bandGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchBandEditor(); } },
                ccModule: { name: 'ccModule', label: '抄送人', value: '', ccJson: '', ccGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchCcModuleEditor(); } }
            }
        },
        end: {
            showType: 'image',
            type: 'end',
            name: { text: '<<end>>' },
            text: { text: '结束' },
            img: { src: 'Content/Image/workflow/img/48/end_event_terminate.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                text: { name: 'text', label: '步骤名称', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textEditor(); } },
                stepType: { name: 'stepType', label: '步骤类型', value: '结束', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputEditor(); } },
                formModule: { name: 'formModule', label: '表单对象', value: '', formModuleGuid: '', bt_DomainXml: '', form_Html: '', textType: "formInfo", textTypeDes: "表单对象", editor: function () { return new myflow.editors.searchProcessKindEditor(); } },
                auditor: { name: 'auditor', label: '责任人', value: '', bandJson: '', bandGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                ccModule: { name: 'ccModule', label: '抄送人', value: '', ccJson: '', ccGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                overpassday: { name: 'overpassday', label: '超时时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                candocmodify: { name: 'candocmodify', label: '允许协商', value: '', textType: "functionInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                canrollback: { name: 'canrollback', label: '允许打回', value: '', textType: "functionInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                cancancel: { name: 'cancancel', label: '允许作废', value: '', textType: "functionInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } }

            }
        },
        fork: {
            showType: 'image',
            type: 'fork',
            name: { text: '<<fork>>' },
            text: { text: '分支' },
            img: { src: 'Content/Image/workflow/img/48/gateway_exclusive1.png', width: 48, height: 48 },
            attr: { width: 100, heigth: 100 },
            props: {
                text: { name: 'text', label: '显示', value: '', textType: "basicInfo", editor: function () { return new myflow.editors.textEditor(); }, value: '分支' },
                temp1: { name: 'temp1', label: '文本', value: '', textType: "basicInfo", editor: function () { return new myflow.editors.inputEditor(); } },
                temp2: { name: 'temp2', label: '选择', value: '', textType: "personInfo", editor: function () { return new myflow.editors.selectEditor('select.json'); } }
            }
        },
        join: {
            showType: 'image',
            type: 'join',
            name: { text: '<<join>>' },
            text: { text: '合并' },
            img: { src: 'Content/Image/workflow/img/48/gateway_parallel1.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '合并' },
                temp1: { name: 'temp1', label: '文本', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
                temp2: { name: 'temp2', label: '选择', value: '', editor: function () { return new myflow.editors.selectEditor('select.json'); } }
            }
        },
        //task: {
        //    showType: 'image&text',
        //    type: 'task',
        //    name: { text: '<<task>>' },
        //    text: { text: '任务' },
        //    img: { src: '../Content/Image/workflow/img/16/task_empty.png', width: 16, height: 16 },
        //    props: {
        //        text: { name: 'text', label: '步骤名称', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
        //        stepType: { name: 'stepType', label: '步骤类型', value: '审批', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputReadOnlyEditor(); } },
        //        formModule: { name: 'formModule', label: '表单对象', value: '', formModuleGuid: '', bt_DomainXml: '', form_Html: '', textType: "formInfo", textTypeDes: "表单对象", editor: function () { return new myflow.editors.searchEditor(); } },
        //        auditor: { name: 'auditor', label: '责任人', value: '', bandGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
        //        overpassday: { name: 'overpassday', label: '超时时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
        //        desc: { name: 'desc', label: '自动完成时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
        //        ccModule: { name: 'ccModule', label: '抄送人', value: '', ccGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
        //        candocmodify: { name: 'candocmodify', label: '允许协商', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
        //        canrollback: { name: 'canrollback', label: '允许打回', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
        //        cancancel: { name: 'cancancel', label: '允许作废', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
        //        candocnumber: { name: 'candocnumber', label: '允许直接归档', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } }

        //    }
        //},
        task_single: {
            showType: 'image&text',
            type: 'task_single',
            name: { text: '<<task_single>>' },
            text: { text: '单人审批' },
            img: { src: 'Content/Image/workflow/img/16/task_empty.png', width: 16, height: 16 },
            props: {
                text: { name: 'text', label: '步骤名称', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textEditor(); }, value: '单人审批' },
                stepType: { name: 'stepType', label: '步骤类型', value: '单人审批', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputReadOnlyEditor(); } },
                formModule: { name: 'formModule', label: '表单对象', value: '', formModuleGuid: '', bt_DomainXml: '', form_Html: '', textType: "formInfo", textTypeDes: "表单对象", editor: function () { return new myflow.editors.searchEditor(); } },
                auditor: { name: 'auditor', label: '责任人', value: '', bandJson: '', bandGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                overpassday: { name: 'overpassday', label: '超时时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                desc: { name: 'desc', label: '自动完成时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                ccModule: { name: 'ccModule', label: '抄送人', value: '', ccJson: '', ccGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                candocmodify: { name: 'candocmodify', label: '允许协商', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                canrollback: { name: 'canrollback', label: '允许打回', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                cancancel: { name: 'cancancel', label: '允许作废', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                candocnumber: { name: 'candocnumber', label: '允许直接归档', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } }

            }
        },
        task_serial: {
            showType: 'image&text',
            type: 'task_serial',
            name: { text: '<<task_serial>>' },
            text: { text: '串行审批' },
            img: { src: 'Content/Image/workflow/img/16/task_empty.png', width: 16, height: 16 },
            props: {
                text: { name: 'text', label: '步骤名称', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textEditor(); }, value: '串行审批' },
                stepType: { name: 'stepType', label: '步骤类型', value: '串行审批', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputReadOnlyEditor(); } },
                formModule: { name: 'formModule', label: '表单对象', value: '', formModuleGuid: '', bt_DomainXml: '', form_Html: '', textType: "formInfo", textTypeDes: "表单对象", editor: function () { return new myflow.editors.searchEditor(); } },
                auditor: { name: 'auditor', label: '责任人', value: '', bandJson: '', bandGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                overpassday: { name: 'overpassday', label: '超时时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                desc: { name: 'desc', label: '自动完成时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                ccModule: { name: 'ccModule', label: '抄送人', value: '', ccJson: '', ccGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                candocmodify: { name: 'candocmodify', label: '允许协商', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                canrollback: { name: 'canrollback', label: '允许打回', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                cancancel: { name: 'cancancel', label: '允许作废', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                candocnumber: { name: 'candocnumber', label: '允许直接归档', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } }

            }
        },
        task_parallel: {
            showType: 'image&text',
            type: 'task_parallel',
            name: { text: '<<task_parallel>>' },
            text: { text: '并行审批' },
            img: { src: 'Content/Image/workflow/img/16/task_empty.png', width: 16, height: 16 },
            props: {
                text: { name: 'text', label: '步骤名称', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textEditor(); }, value: '并行审批' },
                stepType: { name: 'stepType', label: '步骤类型', value: '并行审批', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputReadOnlyEditor(); } },
                formModule: { name: 'formModule', label: '表单对象', value: '', formModuleGuid: '', bt_DomainXml: '', form_Html: '', textType: "formInfo", textTypeDes: "表单对象", editor: function () { return new myflow.editors.searchEditor(); } },
                auditor: { name: 'auditor', label: '责任人', value: '', bandJson: '', bandGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                overpassday: { name: 'overpassday', label: '超时时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                desc: { name: 'desc', label: '自动完成时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                ccModule: { name: 'ccModule', label: '抄送人', value: '', ccJson: '', ccGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                candocmodify: { name: 'candocmodify', label: '允许协商', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                canrollback: { name: 'canrollback', label: '允许打回', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                cancancel: { name: 'cancancel', label: '允许作废', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                candocnumber: { name: 'candocnumber', label: '允许直接归档', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } }

            }
        },
        countersign: {
            showType: 'image&text',
            type: 'countersign',
            name: { text: '<<countersign>>' },
            text: { text: '会签' },
            img: { src: 'Content/Image/workflow/img/16/task_empty.png', width: 16, height: 16 },
            props: {
                text: { name: 'text', label: '步骤名称', value: '', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
                stepType: { name: 'stepType', label: '步骤类型', value: '会签', textType: "basicInfo", textTypeDes: "基本信息", editor: function () { return new myflow.editors.inputReadOnlyEditor(); } },
                formModule: { name: 'formModule', label: '表单对象', value: '', formModuleGuid: '', bt_DomainXml: '',form_Html:'', textType: "formInfo", textTypeDes: "表单对象", editor: function () { return new myflow.editors.searchEditor(); } },
                auditor: { name: 'auditor', label: '责任人', value: '', bandJson: '', bandGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                overpassday: { name: 'overpassday', label: '超时时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                desc: { name: 'desc', label: '自动完成时限(h)', value: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.inputEditor(); } },
                ccModule: { name: 'ccModule', label: '抄送人', value: '', ccJson: '', ccGuid: '', auditorScope: '', auditorType: '', auditorRightValue: '', auditorName: '', textType: "personInfo", textTypeDes: "责任人信息", editor: function () { return new myflow.editors.searchEditor(); } },
                candocmodify: { name: 'candocmodify', label: '允许协商', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                canrollback: { name: 'canrollback', label: '允许打回', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                cancancel: { name: 'cancancel', label: '允许作废', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } },
                candocnumber: { name: 'candocnumber', label: '允许直接归档', value: '', textType: "stepInfo", textTypeDes: "功能属性", editor: function () { return new myflow.editors.checkboxEditor('select.json'); } }

            }
        }
    });
})(jQuery);