(function( $ ){          
    var target = null;
    var template = null;
    var lock = false;
    var variables = {
        'last'      :    0        
    } 
    var settings = {
        'amount'      :   '10', //ÿ����ʾ��¼��          
        'address'     :   'comments.php',//�����̨�ĵ�ַ 
        'format'      :   'json',//���ݴ����ʽ 
        'template'    :   '.single_item',//html��¼DIV��class���� 
        'trigger'     :   '.get_more',//�������ظ����¼��class����
        'scroll'      :   'false',//�Ƿ�֧�ֹ�����������
        'offset'      :   '100',//������������ʱ��ƫ����
        'spinner_code':   ''
    }
    
    var methods = {
        init  :   function(options){
            return this.each(function(){
              
                if(options){
                    $.extend(settings, options);
                }
                template = $(this).children(settings.template).wrap('<div/>').parent();//wrap��������
                template.css('display','none')
                $(this).append('<div class="more_loader_spinner">'+settings.spinner_code+'</div>')//append׷��html��� loader.gif
                $(this).children(settings.template).remove()   
                target = $(this);
                if(settings.scroll == 'false'){                    
                    $(this).find(settings.trigger).bind('click.more',methods.get_data);//ͬʱ�󶨶���¼�����/��������
                    $(this).more('get_data');
                }                
                else{
                    if($(this).height() <= $(this).attr('scrollHeight')){
                        target.more('get_data',settings.amount*2);
                    }
                    $(this).bind('scroll.more',methods.check_scroll);
                }
            })
        },
        check_scroll : function(){
            if((target.scrollTop()+target.height()+parseInt(settings.offset)) >= target.attr('scrollHeight') && lock == false){
                target.more('get_data');
            }
        },
        debug :   function(){
            var debug_string = '';
            $.each(variables, function(k,v){
                debug_string += k+' : '+v+'\n';
            })
            alert(debug_string);
        },     
        remove        : function(){            
            target.children(settings.trigger).unbind('.more');//unbind�����ж���������¼�ȡ����
            target.unbind('.more')
            target.children(settings.trigger).remove();
        },
        add_elements  : function(data){
            //alert('adding elements')
            
            var root = target       
            //alert(root.attr('id')) //id��more
            var counter = 0;
            var user_wechat = 0;//����ȫ��user_wechat
            var user_mobile = 0;//����ȫ��user_mobile
            if(data){
                $(data).each(function(){//����ÿ��ƥ���Ԫ����Ҫִ�еĺ���
                    counter++
                    var t = template                    
                    $.each(this, function(key, value){
                    	  if(t.find('.'+key)) {
                    	  	/*
                    	  	if(key == 'user_id'){
                    	  		user_id=value;
                    	  	}*/
                    	  	if(key == 'wechat'){//�û�΢�ź�
                    	  		//alert(value);
                    	  		user_wechat=value;
                   	  			if(t.find('.'+key)) t.find('.'+key).html(value);
	                    	  }else if(key == 'mobile'){//�û��ֻ���
                    	  		//alert(value);
                    	  		user_mobile=value;
                   	  			if(t.find('.'+key)) t.find('.'+key).html(value);
	                    	  }

                    	  	if(key == 'room-pic' || key == 'headimg'){//��Դ��Ƭ �û�ͷ��
                    	  		//alert(key);
	                    	  	if(t.find('.'+key)) t.find('.'+key).attr('src',value);
	                    	  }else if(key == 'content-box'){//������������
                    	  		//alert(key);
                    	  		var href="rent_info.php?house_rent_id="+value;
	                    	  	if(t.find('.'+key)) t.find('.'+key).attr('href',href);
	                    	  }else if(key == 'content-box-houseSeek'){//������������
                    	  		//alert(key);
                    	  		var href="houseSeek_info.php?house_seek_id="+value;
	                    	  	if(t.find('.'+key)) t.find('.'+key).attr('href',href);
	                    	  }else if(key == 'user_rent_num'){//�û����ⷿ����Ŀ
                    	  		//alert(value);
                    	  		if(value == 0){
                    	  			if(t.find('.'+key)) t.find('.'+key).html(value);
                    	  		}else{
                    	  			//alert(value);
                    	  			if(user_wechat != "δ��д"){
                    	  				var href="../pages/user_rent_wechat.php?user_wechat="+user_wechat;
                    	  				var innerhtml="<a style='color:blue;text-decoration:underline;' href='"+href+"'>"+value+"</a>";
                    	  				if(t.find('.'+key)) t.find('.'+key).html(innerhtml);
                    	  			}
                    	  			if(user_mobile != "δ��д"){
                    	  				var href="../pages/user_rent_mobile.php?user_mobile="+user_mobile;
                    	  				var innerhtml="<a style='color:blue;text-decoration:underline;' href='"+href+"'>"+value+"</a>";
                    	  				if(t.find('.'+key)) t.find('.'+key).html(innerhtml);
                    	  			}  	
                    	  		}
	                    	  }else if(key == 'user_seek_num'){//�û����ⷿ����Ŀ
                    	  		//alert(value);
                    	  		if(value == 0){
                    	  			if(t.find('.'+key)) t.find('.'+key).html(value);
                    	  		}else{
                    	  			//alert(value);
                    	  			if(user_wechat != "δ��д"){
                    	  				var href="../pages/user_seek_wechat.php?user_wechat="+user_wechat;
                    	  				var innerhtml="<a style='color:blue;text-decoration:underline;' href='"+href+"'>"+value+"</a>";
                    	  				if(t.find('.'+key)) t.find('.'+key).html(innerhtml);
                    	  			}
                    	  			if(user_mobile != "δ��д"){
                    	  				var href="../pages/user_seek_mobile.php?user_mobile="+user_mobile;
                    	  				var innerhtml="<a style='color:blue;text-decoration:underline;' href='"+href+"'>"+value+"</a>";
                    	  				if(t.find('.'+key)) t.find('.'+key).html(innerhtml);
                    	  			}  	
                    	  		}
	                    	  }else if(key == 'star_sum'){//����
                    	  		//alert(value);   
                    	  		if(value=='0'){
	                    	  		var innerhtml="<div class='star'><i class='fa fa-star-o'></i></div><div class='star'><i class='fa fa-star-o'></i></div><div class='star'><i class='fa fa-star-o'></i></div><div class='star'><i class='fa fa-star-o'></i></div>";
	                    	  	}                	  		
	                    	  	if(value=='1'){
	                    	  		var innerhtml="<div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star-o'></i></div><div class='star'><i class='fa fa-star-o'></i></div><div class='star'><i class='fa fa-star-o'></i></div>";
	                    	  	}else if(value=='2'){
	                    	  		var innerhtml="<div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star-o'></i></div><div class='star'><i class='fa fa-star-o'></i></div>";
	                    	  	}else if(value=='3'){
	                    	  		var innerhtml="<div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star-o'></i></div>";
	                    	  	}else if(value=='4'){
	                    	  		var innerhtml="<div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star'></i></div><div class='star'><i class='fa fa-star'></i></div>";
	                    	  	}
	                    	  	if(t.find('.'+key)) t.find('.'+key).html(innerhtml);
	                    	  }else{
	                    	  	//alert(key);
                    	  		if(t.find('.'+key)) t.find('.'+key).html(value);
	                    	  }  
                    	  }
                    	            
                        
                        //key ����content,cover_img,author,date
                        //value ����content,cover_img,author,dateֵ
                        //alert(key);
                        //alert(value);
                        //new add
				                //$("img").each(function(){
											   	//this.src = value;
											 	//});
                    })         
                    //t.attr('id', 'more_element_'+ (variables.last++))
                    if(settings.scroll == 'true'){
                    //    root.append(t.html())
                    root.children('.more_loader_spinner').before(t.html())  
                    }else{
                    //    alert('...')
                          
                          root.children(settings.trigger).before(t.html())  

                    }

                    root.children(settings.template+':last').attr('id', 'more_element_'+ ((variables.last++)+1))  
                 
                })
                
                
                
                
            }            
            else  methods.remove()
            target.children('.more_loader_spinner').css('display','none');
            if(counter < settings.amount) methods.remove()            

        },
        get_data      : function(){//������ظ���������function   
            //alert('getting data')
            var ile;//ÿ����ʾ��¼��
            lock = true;
            target.children(".more_loader_spinner").css('display','block');
            $(settings.trigger).css('display','none');
            if(typeof(arguments[0]) == 'number') ile=arguments[0];
            else {
                ile = settings.amount;              
            }
            
            $.post(settings.address, {//��� data.php ҳ�淵�ص� json ��ʽ������
                last : variables.last, 
                amount : ile                
            }, function(data){
            	  //var ile;
            	  //var last_num;
            	  //last_num = ile + variables.last;//ÿ����ʾ��¼��+����=���һ����ʾ����������
            	  //alert(last_num);            
            	  //var obj = eval(data);
								//alert(obj.constructor);//String ���캯��
								//alert(obj[ile].table_id);//undefine
                $(settings.trigger).css('display','block')//������ظ���� classΪget_more��a��ǩ��display
                methods.add_elements(data)
                lock = false;
            }, settings.format)
            
        }
    };
    $.fn.more = function(method){
        if(methods[method]) 
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        else if(typeof method == 'object' || !method) 
            return methods.init.apply(this, arguments);
        else $.error('Method ' + method +' does not exist!');

    }    
})(jQuery)