//弹出层的默认配置
(function (config) {
    config['fixed'] = true;
    config['okValue'] = '确定';
    config['cancelValue'] = '取消';
    config['width']=300;
    config['skin']='no_radius';
    config['onshow']=function(){
        var $close=$('.ui-dialog-close').empty().removeClass('ui-dialog-close').addClass('close').attr('title','关闭');
        if($('.ui-dialog-header').is(':hidden')){
            $close.appendTo('.ui-dialog-body');
        }
        $('.ui-popup-backdrop').click(function(){
            $(this).next().find('.close').click();
        });
    };
})(dialog.defaults);

$.extend({
    alert:function(content,callback){
        dialog({
            title:'提示',
            content:content,
            width:250,
            ok: $.isFunction(callback)?callback: $.noop
        }).showModal();
    },
    confirm:function(content,callback){
        dialog({
            title:'请确认',
            content:content,
            width:250,
            ok: $.isFunction(callback)?callback: $.noop,
            cancel: $.noop
        }).showModal();
    }
});
