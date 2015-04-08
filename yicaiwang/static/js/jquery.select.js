(function($){
    function Select(element,options){
        this.$element=element;
        this.set(options);
    }
    Select.prototype={
        set:function(opts){
            this.options= $.extend(true,{},(this.options|| $.fn.select.defaults),opts);
            this.listen();
            this.render();
        },
        render:function(){
            var _this=this;
            this.$element.next('.ui-select').remove();
            var $container=$('<div/>').addClass('ui-select ui-select_hover').insertAfter(this.$element.hide()).width(this.options.width);
            var hint='请选择';
            if(!this.$element.children('option').first().val()){
                hint=this.$element.children('option').first().html();
            }
            var $single;
            if(this.options.multiple){
                $single=$('<ul class="select-single">'+
                    '<li class="li-input">'+
                    '<input class="input-show"/>'+
                    '</li>'+
                    '</ul>');
            }else{
                $single=$('<div class="select-single">'+
                    '<span class="select-input">'+hint+'</span>'+
                    '<span class="select-arrow">'+
                    '<s class="arrow arrow-tthin"></s>'+
                    '</span>'+
                    '</div>');
            }
            $single.appendTo($container);



            var $liInput=$single.find('.li-input');
            var $drop=$('<div class="select-drop">'+
                '<div class="select-search">'+
                '<input class="input-search"/>'+
                '</div><ul></ul></div>').appendTo($container).width(this.options.width-1);
            var $ul=$drop.find('ul');
            var $input=this.options.multiple?$single.find('.input-show'):$drop.find('.input-search');
            var $liOption=$($.map(this.$element.children('option[value!=""]'),function(n,i){
                return '<li id="'+$(n).val()+'" class="option" data-sort="'+i+'">'+ $(n).html()+'</li>';
            }).join('')).appendTo($ul);
            $.each(this.$element.find(":selected"),function(){
                $liOption.filter('[id='+this.value+']').addClass('selected');
            });

            var $liNoMatch=$('<li class="no-match">没有匹配项</li>').hide().appendTo($ul)
                .click(function(){
                    $input.focus();
                    return false;
                });

            $drop.on('mouseenter','li',function(){
                $(this).addClass('hover').siblings().removeClass('hover');
            });

            $(document).on({
                click:function(e){
                    if($(e.target).is(':not(.ui-select *)')){
                        $liInput.prevAll('.focus').removeClass('focus');
                        if(!$container.hasClass('ui-select_hover')){
                            $container.addClass('ui-select_hover');
                            $drop.hide();
                        }
                        $liInput.width('0').find('input').width('0');
                        $container.css('marginBottom',$single.height()-22);
                    }
                }
            })


            $drop.on('click','li',function(e,flag){
                if(_this.options.multiple){
                    addMultipleItem($(this).off('click'));
                }else{
                    $container.addClass("ui-select_hover").find('.select-input').text($(this).text());
                    $drop.hide();
                    $(this).addClass('selected').siblings().removeClass('selected');
                }
                if(!flag){
                    var $option=_this.$element.find('[value='+this.id+']').prop('selected',true);
                    _this.$element.trigger('on_selected',[$option]);
                }
            });

            $ul.find('.selected').trigger('click',[this.options.ignoreTriggerOnInit]);

            $input.on('keydown',function(e){
                switch (e.keyCode){
                    case 8://backspace
                        if(this.value.length==0){
                            var $last=$liInput.prev();
                            if($last.length==1){
                                if($last.hasClass('focus')){
                                    $last.find('.close').click();
                                }else{
                                    $last.addClass('focus').prevAll().removeClass('focus');
                                }
                            }
                        }
                        break;
                    case 13://enter
                        if(!$drop.is(':hidden')){
                            $drop.find('.option.hover').click();
                        }
                        break;
                    case 38://up
                        if(!$drop.is(':hidden')){
                            var $hover=$drop.find('.option.hover:visible');
                            if($hover.length==0){
                                return;
                            }
                            if($hover.prevAll('.option:visible').length==0){
                                $ul.find('.option:visible').last().trigger('mouseenter');
                            }else{
                                $hover.prevAll('.option:visible').first().trigger('mouseenter');
                            }
                        }
                        break;
                    case 40://down
                        if(!$drop.is(':hidden')){
                            var $hover=$drop.find('.option.hover:visible');
                            if($hover.length==0){
                                return;
                            }
                            if($hover.nextAll('.option:visible').length==0){
                                $ul.find('.option:visible').first().trigger('mouseenter');
                            }else{
                                $hover.nextAll('.option:visible').first().trigger('mouseenter');
                            }
                        }
                        break;
                }


            });


            if(!this.options.search){
                $drop.find('.select-search').hide().parent().height(0).css('padding',0);
            }else{
                $input.on('keyup',function(e){
                    var s=$.trim(this.value);
                    if([38,40].indexOf(e.keyCode)==-1){
                        if(s.length>0){
                            if(s.charAt(s.length-1)!=';'|| s.length==1){
                                search(s);
                            }
                        }else{
                            search(s);
                        }
                    }
                });
            }
            function search(text){
                $container.removeClass('ui-select_hover');
                $drop.show();
                var $show=$ul.children('.option').hide().filter(':contains('+text+')').show();
                $liNoMatch.hide();
                if($show.length==0){
                    $liNoMatch.show();
                    if(text==''){
                        $liNoMatch.html('没有更多选项');
                    }else{
                        $liNoMatch.html('没有匹配项');
                    }
                }else{
                    $show.first().addClass('hover').siblings().removeClass('hover');
                }
            }
            $single.on('click',function(e){
                $input.focus();
                $liInput.width(_this.options.width).find('input').width('90%');
                $drop.css('top',$single.height());
                if($container.hasClass('ui-select_hover')){
                    search($input.val());
                }else{
                    if(!_this.options.multiple) {
                        $container.addClass('ui-select_hover');
                        $drop.hide();
                    }
                }
            });

            if(this.options.multiple){
                this.$element.prop('multiple',true);
                $drop.find('.select-search').hide();
                $single.on('click','.close',function(){
                    var $li=$(this).parent(),
                        sort=$li.data('sort'),
                        arr=$ul.children('.option');
                    if(sort!==undefined){
                        $li.html($(this).prev('span').html()).attr('class','option');
                        if(arr.length==0){
                            $li.insertBefore($liNoMatch);
                        }else{
                            $ul.children('.option').each(function(i,n){
                                if($(this).data('sort')>sort){
                                    $li.insertBefore($(this));
                                    return false;
                                }
                                $li.insertBefore($liNoMatch);
                            });
                        }
                        _this.$element.find('[value='+$li[0].id+']').prop('selected',false);
                    }else{
                        $(this).parent().remove();
                    }
                    $drop.css('top',$single.height());
                    $container.css('marginBottom',$single.height()-22);
                });
                $input.on('keyup',function(e){
                    var s= $.trim(this.value);
                    if(s.length>1&&s.charAt(s.length-1)==';'){//分号
                        var text=s.substring(0,s.length-1);
                        var arr=$ul.find('.option'),
                            flag=true;
                        for(var i= 0,len=arr.length;i<len;i++){
                            if($(arr[i]).html()==text){
                                addMultipleItem($(arr[i]));
                                flag=false;
                                break;
                            }
                        }
                        if(flag){
                            addMultipleItem(null,text);
                        }
                    }
                });
            }else{
                this.$element.prop('multiple',false);
            }
            function addMultipleItem($li,text){
                if($li){
                    $li.html('<span>'+$li.html()+'</span><a href="javascript:void(0)" class="close"></a>');
                }else{
                    $li=$('<li></li>').html('<span>'+text+'</span><a href="javascript:void(0)" class="close"></a>');
                }
                $li.attr('class','item').insertBefore($liInput);
                $liInput.find('input').val('').focus();
                $container.addClass('ui-select_hover');
                $drop.hide();
                $drop.css('top',$single.height());
                $container.css('marginBottom',$single.height()-22);
            }
        },
        listen:function(){
            this.$element.off('on_selected');
            if(typeof this.options.onSelected==='function'){
                this.$element.on('on_selected',this.options.onSelected);
            }
        },
        getMultipleSelected:function(){
            return $.map($('.ui-select').find('li.item'),function(n){
               return {value:n.id,text:$(n).text()};
            });
        },
        getMultipleValue:function(separator){
            return $.map(this.getMultipleSelected(),function(n){
                return n.value;
            }).join(separator?separator:';');
        },
        getMultipleText:function(separator){
            return $.map(this.getMultipleSelected(),function(n){
                return n.text;
            }).join(separator?separator:';');
        }
    };

    $.fn.select=function(args){
        var _arguments=arguments,result=undefined;
        this.each(function(){
            var obj=$(this).data('select');
            if(!obj){
                $(this).data('select',(obj=new Select($(this),$.extend(true,{},typeof args==='object'?args:{}))));
                return;
            }
            if(typeof args==='string'&&typeof obj[args]==='function'){
                result=obj[args].apply(obj,Array.prototype.slice.call(_arguments,1));
            }else if(args&&typeof args==='object'){
                obj.set(args);
            }else{
                throw '方法['+args+']不存在';
            }
        });
        if(result!==undefined){
            return result;
        }else{
            return this;
        }
    };
    $.fn.select.defaults={
        width:250,
        search:false,
        multiple:false,
        onSelected: $.noop(),
        ignoreTriggerOnInit:false
    };
})(jQuery);