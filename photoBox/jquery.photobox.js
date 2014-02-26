/* JQuery.PhotoBox for Ameblo
 *
 * it make a sticky animation when you choose an image.that is it.
 *
 * The MIT License (MIT) Copyright (c) 2012  copyright:Mistuki Suzuki. 
 */

(function($){
	
	$.fn.photoBox = function(){
		new $.fn.photoBox.init($(this));
		return this
	};
	
	$.fn.photoBox.init = function(element){
		
		var $self = this;
		$self.body = $('<div id="photoBox">'+
							'<div id="photoWrap">'+
								'<div class="centering">'+
								'<div class="pb_area close" style="background:url('+BGimg+')" ></div>'+
								'<div id="imgBg">'+
									'<p class="pb_button close" style="background:url('+closeimg+')"></p>'+
									'<div id="controler">'+
										'<div id="controlWrap" >'+
											'<span class="button pb_prev" style="background:url('+previmg+')" ></span>'+
											'<span class="button pb_next" style="background:url('+nextimg+')" ></span>'+
											'<span class="pb_length"></span>'+
					'</div></div></div></div></div>');
					
		element.each(function(){
			
			var that = $(this);
			
			that.find('img').each(function(){
		
				var imgElm = $(element)
				,	that = this;
				
				if( imgElm.attr("src").match(/.jpg|.png/g) ){
					imgElm.addClass('photobox');
				};
			});
							
			$(".photobox").click(function(){
				
				var self = this;
						
				$('body').append($self.body);
				$('#controler').hide();
	
				self.allImg = $(that).find('img');
				self.imgLength = self.allImg.length;
				self.index = self.allImg.index(self);
				self.imgBg = $('#imgBg');
					
				$self.open(self);
	
				if(this.imgLength > 1){
					
					self.flag = true;
	
					$('.pb_prev').on('click',function(){
						
						if(!self.flag){return false;}
						else{
							$('#controler').slideUp();
							$self.imgIndex(-1,self);
							self.flag = false;
							$self.getBoxSize(self);
						}
					});
					
					$('.pb_next').on('click',function(){
						
						if(!self.flag){return false;}
						else{
							$('#controler').slideUp();
							$self.imgIndex(1,self);
							self.flag = false;
							$self.getBoxSize(self);
						}
					});
				}	
	
				$('#photoBox').fadeIn(300).find('.close').on('click',function(){
					$fn.close(self);
				});
				return false;
			});
			
			return false;
		});

	};
	$.fn.photoBox.init.prototype = {
		
		display : function(imgElm,self){
			
			var
			imgElm = $(imgElm),
			bh = imgElm.height(),
			bw = imgElm.width();

			$(self.imgBg).animate({height:bh,width:bw},function(){
				imgElm.fadeIn(500);
				
				if( Number(self.imgLength) > 1 ){
					$('#controler').slideDown();
					$('#controlWrap .button').removeClass('nousege');
					
					if( self.index + 1 === self.imgLength ){
						$('#controlWrap .pb_next').addClass('nousege');
					};
					if( self.index === 0 ){
						$('#controlWrap .pb_prev').addClass('nousege');
					};
				}else{
					$('#controler').remove();
				};

				self.flag = true;
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
		open : function(self){
			
			var sizeh = $(window).height()
			,	sizew = $(window).width()
			,	imgElm = $(self)
			,	uri = this.urlFilter( imgElm.attr("src") )
			,	imgH = imgElm.height()
			,	imgElm = $('<img class="imgElm" src="'+uri+'">')
			,	that = this;
				
			var length = self.index + 1;
			
			$('.pb_length').empty()
			.append('<p>'+ length +' of ' + self.imgLength + '</p>');
			
			if( imgH > imgW || imgH == imgW ){
				
				$(imgElm).css({maxHeight:sizeh*0.6});
					
			}else{
			
				$(imgElm).css({maxWidth:sizew*0.5});
			};
			
			$(imgElm).hide().prependTo(self.imgBg)
			.on('load',function(){
				that.display(this,self);
			});
			
		},
		getBoxSize : function(self){
			var that = this;
			$(self.imgBg).find('img').stop().fadeOut('500',function(){
				$(this).remove();
				that.open(self.allImg.eq(self.index),self);
			});
		},

		close : function(){
			this.body.fadeOut(200,function(){
				$(this).remove();
			});
		},
		imgIndex : function(sel,self){
				self.index = self.index + sel;
		}
	}
})(jQuery);