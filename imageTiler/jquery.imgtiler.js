//imgtiler.js
/* 
 * Mitsuki Suzuki
 * MIT license
 */	

(function($){

$.fn.imgtiler = function(random){

	return this.each(function(){
	
		that = $(this);
		
				function imgResize(imageWrap){
			
					for (var i = 0; i < imageWrap.length; i = i +3){
						var posRandom = Math.random() * 2;
						if( posRandom > 1 ){
							var 
							cssfloat = 'right',
							margin = '0';
						}else{
							var 
							cssfloat = 'left',
							margin = '0';
						};
	
						//比を揃える
							imageWrap.eq(i).width(1000)
							.end().eq(i+1).width(1000)
							.end().eq(i+2).width(1000);
	
						//縦を整える
							var 
							h1 = imageWrap.eq(i).height(),
							h2 = imageWrap.eq(i+1).height(),
							h3 = imageWrap.eq(i+2).height(),
							b1 = h2/(h2+h3),
							b1 = h1*b1;
							
							imageWrap.eq(i+1).width('').css({height:b1})
							.end().eq(i+2).width('').css({height:h1-b1});
	
						//幅を整える
							var 
							a = imageWrap.eq(i).width(),
							b = imageWrap.eq(i+1).width(),
							a = a/(a+b),
							a = a*100;
							
							imageWrap.eq(i).height('').css({width:a - 0 + '%','float':cssfloat,'margin':margin})
							.end().eq(i+1).height('').css({width:100-a - 0 + '%','float':cssfloat,'margin':margin})
							.end().eq(i+2).height('').css({width:100-a - 0 + '%','float':cssfloat,'margin':margin});
					};
					imageWrap.animate({opacity:1});
				};
				
				that.each(function(){
				
				if(random){
				
					var subimgWrap = new Array(),
						index = 0,
						min=0,
						imageWrap = $(this).find('img'),
						maxlength = imageWrap.length;
					
					while(1){
						if ( min >= maxlength ) { break ; }
						
						var
						lengthIndex = Math.floor( Math.random() * 10 );
						
						if( lengthIndex <= 1 ){ lengthIndex = 2 };
						if( lengthIndex <= 4 ){ lengthIndex = 5 };
						
						var
						max = min + lengthIndex,
						subimgWrap = imageWrap.slice( min, max );
						imgResize(subimgWrap);
						min = max;
					}
					
				}else if(!random){
					
					var 
					subimgWrap = new Array(),
					index = 0,
					min = 0,
					imageWrap = $(this).find('img'),
					maxlength = imageWrap.length;
					
					while(1){
						if ( min >= maxlength ) { break ; }
						
						var
						lengthIndex = 3,
						max = min + lengthIndex,
						subimgWrap = imageWrap.slice( min, max );
						imgResize(subimgWrap);
						min = max;
					}
					
				};
		});
		return false;
	});
	$(this).off('imgtiler');
};
	
})(jQuery);