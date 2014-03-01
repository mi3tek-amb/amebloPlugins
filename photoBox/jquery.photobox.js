/* JQuery.PhotoBox for Ameblo
 *
 * it make a sticky animation when you choose an image.that is it.
 *
 * The MIT License (MIT) Copyright (c) 2012-2014  copyright:Mistuki Suzuki. 
 */

;(function($,Window){
	
	$.fn.photoBox = function(){
		new $.fn.photoBox.init(this);
		return this
	};
	
	$.fn.photoBox.init = function(element){
		
		var $self = this;
		$self.body = $('<div id="photoBox">'+
							'<div id="BoxWrap">'+
								'<div id="centering">'+
								'<div id="displayArea" class="close"></div>'+
									'<div id="imgWrap">'+
										'<div id="image"></div>'+
										'<p id="closeButton" class="close">×</p>'+
										'<div id="controler">'+
											'<div id="controlerWrap" >'+
												'<div class="prev button">＜＜PREV</div>'+
												'<div class="next button">NEXT＞＞</div>'+
												'<div id="photoLength"></div>'+
											'</div>\
										</div>\
									</div>\
								</div>\
							</div></div>');
					
		$(element).each(function(){
			
			var that = $(this);
			
			that.find('img').each(function(){
				var imgElm = $(this);
				
				if( !imgElm.attr("src").match('emoji')
				){
					imgElm.addClass('photobox');
				};
			});
							
			$(".photobox").click(function(){
										
				$('body').append($self.body);
				
				var self = this
				,	controler = $('#controler');
				controler.hide();
	
				 self.allImg = that.find('.photobox')
				,self.index = self.allImg.index(self)
				,self.imgBg = $('#image')
				,self.imgLength = self.allImg.length;
									
				$self.open(self);
				
				self.flag = true;
	
				controler.find('.prev').on('click',function(){
					
					if(!self.flag){return false;}
					else{
						controler.slideUp();
						self.index = $self.imgIndex(-1,self);
						self.flag = false;
						$self.getBoxSize(self);
					}
				});
				
				controler.find('.next').on('click',function(){
					
					if(!self.flag){return false;}
					else{
						controler.slideUp();
						self.index = $self.imgIndex(1,self);
						self.flag = false;
						$self.getBoxSize(self);
					}
				});
	
				$('#photoBox').fadeIn(300)
				.find('.close').on('click',function(){
					$self.close(self);
				});
				return false;
			});
		});
	};
	
	$.fn.photoBox.init.prototype = {
		
		display : function(imgElm,self){
			
			var
			imgElm = $(imgElm),
			bh = imgElm.height(),
			bw = imgElm.width(),
			controler = $('#controler');
			
			$(self.imgBg).animate({height:bh,width:bw},function(){
				imgElm.fadeIn(500);
				self.flag = true;
				if( self.imgLength > 1 ){
					controler.slideDown();
					controler.find('.button').removeClass('nousege');
					
					if( self.index + 1 === self.imgLength ){
						controler.find('.next').addClass('nousege');
					};
					if( self.index === 0 ){
						controler.find('.prev').addClass('nousege');
					};
				}else{
					controler.remove();
				};
			});
		},
		open : function(self){
			
			var sizeh = $(Window).height()
			,	sizew = $(Window).width()
			,	imgElm = $(self.allImg.eq(self.index))
			,	uri = this.urlFilter( imgElm.attr("src") )
			,	imgH = imgElm.height()
			,	imgW = imgElm.width()
			,	imgElm = $('<img class="imgElm" src="'+uri+'">')
			,	that = this;
				
			var length = self.index + 1;
			
			$('#photoLength').empty()
			.append(length +' of ' + self.imgLength);
			
			if( imgH > imgW || imgH == imgW ){
				
				imgElm.css({maxHeight:sizeh*0.6});
					
			}else{
			
				imgElm.css({maxWidth:sizew*0.5});
			};
			
			$(imgElm).hide().prependTo(self.imgBg.empty())
			.on('load',function(){
				that.display(this,self);
			});
			
		},
		getBoxSize : function(self){
			var that = this;
			$(self.imgBg).find('img').stop().fadeOut('500',function(){
				$(this).remove();
				that.open(self);
			});
		},
		urlFilter : function(uri){
			if(uri && uri.match(/t(\w)+\_/g)){
				uri = uri.split('/'),
				uriHeader = uri.slice(0,10),
				uri = uri.pop().split('_').pop(),
				uri = (uriHeader+'/o'+uri).replace(/,/g, '/');
			};
			return uri;
		},
		close : function(){
			this.body.fadeOut(200,function(){
				$(this).remove();
			});
		},
		imgIndex : function(sel,self){
				return self.index + sel;
		}
	};
})(jQuery,window);