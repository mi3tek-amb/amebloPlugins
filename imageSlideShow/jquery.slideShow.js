/* jQuery.slideShow.js
 *
 * The MIT License (MIT) Copyright (c) 2013
 * copyright : Mistuki Suzuki
 */

;(function($){
	
	$.init = $.init || new Function;
		
	$.fn.imageSlider = function(){
		return this.each(function(){
			new $.init.imageSlider(this);
		});
	};
	
		$.init.imageSlider = function(elem){
			this.init(elem);
		};
		
		$.init.imageSlider.prototype = {
			
			init : function(Elem){									

				var
				constructor = this,
				self = $(Elem),
				Wrapper = $(
				'<div class="imgSlider">\
					<div class="display"></div>\
					<ul class="thumbWrap"></ul>\
				</div>'),
				thumbObjs = [],
				thumbelm = 	'<li class="thumb"><a><img class="thumbImg" alt="thumbnailImage" /></a></li>',
				getImgs = $(self).find('img'),
				display = Wrapper.find('.display'),
				thumbWrap = Wrapper.find('ul');	
				getImgs.hide();
				
				self.append(Wrapper);
						
				$.each(getImgs,function(){
					var
					item = $(this),
					src = item.attr('src').replace('http://',''),
					thumbObj = $(thumbelm);
					thumbObj.find('a')[0].href = item.attr('src');
					thumbObj.find('img')[0].src = 'http://imgstat.ameba.jp/view/d/400/' + src;
					thumbObjs.push(thumbObj);
				});
						
				thumbWrap.append(thumbObjs);								
				display.flag = true;
				
				self.find('.thumb').on('click',function(){
					clearTimeout(display.auto);
					delete display.auto;
					constructor.selectable($(this),self.find('.thumb'),display);
					return false;
				});
				
				self.reflash = function(){
					delete display.auto;
					display.auto = setTimeout( function(){
						functions.start( display, elems, i + 1 ) 
					}, 10000 );
				}
								
				display.on('click',function(){
					if( !display.flag ){
						return false;
					}else{
						constructor.open( display );
						return false;
					}
				});
								
				constructor.start( display, self.find('li'), 0 );
			},			
			close : function(){
				
				$('#photoBox').fadeOut(500,function(){
					$(this).remove();
					$('#blur').remove();
				});
			},
			open : function( obj ){						
				var 
				functions = this,
				uri = $( obj ).find('img').attr('src');
				
				$('body')
				.append(
				'<div id="photoBox"　style="display:none" >\
					<div id="photoWrap">\
						<div class="centering">\
							<div class="pb_area close"></div>\
							<div id="imgBg"></div>\
						</div>\
					</div>\
				</div><style id="blur">\
				.skinBody{filter: blur(10px);-webkit-filter: blur(10px);}</style>'
				);
				
				var imgElm = '<img class="imgElm_Box" src="'+uri+'" />';
				
				$(imgElm).hide()
				.prependTo('#imgBg').on('load',function(){
					$(this).fadeIn(500);
				});
				
				$('#photoBox').fadeIn(500)
				.find('.close').on('click',function(){
					functions.close();
					return false;
				});
				
				return false;
			},
			wipeAnimate : function(obj,callback){
			
				var time = 0,
				pattern = Math.floor(Math.random()*5),
				imageWipe = obj.find('.imageWipe');
				
				if(pattern===1){
					
					imageWipe
					.each(function(){
						$(this).delay(time).css({
							overflow:'hidden'
						}).slideUp(500);
						time = time + 100;
					});
					
				}else if(pattern===2){
					
					imageWipe
					.each(function(){
						$(this).delay(time).css({
							overflow:'hidden'
						}).animate({
							width:0
						},500);
						time = time + 100;
					});
					
				}else if(pattern===4){
					
					imageWipe.find('img').fadeOut(1000);				
					time = 1100;
					
				}else{
					
					imageWipe
					.each(function(l){
						
						$(this).css({
							overflow:'hidden'
						}).animate({
							left:-1000
						},1500);
						$(this).find('img').animate({
							left:1000
						},1500);
					
						time = 1100;
					});
					
				}
				return setTimeout( callback, time + 500 );
				
			},
			wipeObj : function(imgUri, length, display){
			
				var 
				obj = new Array,
				width = display.width(),
				height = width/2,
				eachWidth = width/length,
				i = 0,W = 0;
				display.height(height);
				
				for( ;i < length; i++ ){
					
					obj.push( 
						$('<div class="imageWipe">')
						.css({
							float:'left',
							width:eachWidth+10,
							height:height,
							overflow:'visible',
							position:'absolute',
							left:W+'px',
							top:0
						}).append(
							$(document.createElement('img'))
							.css({
								margin:0,
								width:width,
								position:'relative',
								left:'-'+W+'px',
								top:0,
								zIndex:1
							}).attr( 'src',imgUri )
						)
					);
					W = eachWidth+W;
				}
				return obj;
			},
			imgObj : function( imgUri ){
			
				var imgObj = 
				$(document.createElement('img'))
				.css({
					margin:0,
					width:"100%",
					position:'absolute',
					left:0,
					top:0,
					zIndex:0
				}).attr( 'src',imgUri );
				
				return imgObj;
			},
			resize : function(self,display){
				var
				width = display.width(),
				height = width/2,
				eachWidth = width/10,
				W = 0;
				display.height(height);
				self.find('.imageWipe')
				.each(function(){
					var that = $(this);
					that.css({
						float:'left',
						width:eachWidth+10,
						height:height,
						overflow:'visible',
						position:'absolute',
						left:W+'px'
					}).find('img').css({
						position:'relative',
						left:'-'+W+'px',
						width:width,
						zIndex:1
					});
					W = eachWidth+W;
				});
			},
			selectable : function(item, items, display){
				
				var functions = this;
						
				if( !display.flag || $(this).hasClass('active') ){
					return false;
				}else{
					display.flag = false;
					
					var imgUri = item.find('a').attr('href');
					
					$( this.imgObj(imgUri) ).appendTo( display );
					
					functions.wipeAnimate(
						$(display), 
						function(){
							$(display).html(
								functions.wipeObj( imgUri, 10, display )
							);
							display.flag = true;
						});
					
					items.removeClass('active');			
					item.addClass('active');
				};
				
			},
			start : function(display,elems,i){
				
				var functions = this;
				
				i = ( i === elems.length ) ? 0 : i;
				
				functions.selectable($(elems[i]),elems,display);
								
				display.auto = setTimeout( function(){
					functions.start( display, elems, i+1 ) 
				}, 10000 );
				
			}
		};
	
})(jQuery);