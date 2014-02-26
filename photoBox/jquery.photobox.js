/* JQuery.PhotoBox for Ameblo
 *
 * it make a sticky animation when you choose an image.that is it.
 *
 * The MIT License (MIT) Copyright (c) 2012  copyright:Mistuki Suzuki. 
 *
 */

(function($){
var BGimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp'+
    'bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6'+
    'eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0'+
    'NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
    'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw'+
    'dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv'+
    'IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS'+
    'ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD'+
    'cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFu'+
    'Y2VJRD0ieG1wLmlpZDo2NEQ0NUMxODRGOUIxMUUyQjcwRTgxOTI4MjFBRTNEMCIgeG1wTU06RG9j'+
    'dW1lbnRJRD0ieG1wLmRpZDo2NEQ0NUMxOTRGOUIxMUUyQjcwRTgxOTI4MjFBRTNEMCI+IDx4bXBN'+
    'TTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY0RDQ1QzE2NEY5QjExRTJC'+
    'NzBFODE5MjgyMUFFM0QwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY0RDQ1QzE3NEY5QjEx'+
    'RTJCNzBFODE5MjgyMUFFM0QwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4'+
    'bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QTleBQAAAA9JREFUeNpiYGZgaAAIMAAAkQCEaCV5'+
    '+QAAAABJRU5ErkJggg==';
var closeimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp'+
    'bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6'+
    'eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0'+
    'NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
    'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw'+
    'dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv'+
    'IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS'+
    'ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD'+
    'cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFu'+
    'Y2VJRD0ieG1wLmlpZDoxQUU2NjQ2NjQyNTIxMUUyQTczMjlENjAyODQ2OTE5NiIgeG1wTU06RG9j'+
    'dW1lbnRJRD0ieG1wLmRpZDoxQUU2NjQ2NzQyNTIxMUUyQTczMjlENjAyODQ2OTE5NiI+IDx4bXBN'+
    'TTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFBRTY2NDY0NDI1MjExRTJB'+
    'NzMyOUQ2MDI4NDY5MTk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFBRTY2NDY1NDI1MjEx'+
    'RTJBNzMyOUQ2MDI4NDY5MTk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4'+
    'bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+q5ME3AAABCpJREFUeNqcV0tIlUEUnntFQ69vvJEJ'+
    'vvKFEmhZirpIVLKFizAopRaJ4UJbVLpp0UaTJIlAo4WJIoi4CFTMJxoiil3Bi+ILxReiCD5Aro/y'+
    'dToz+P/M/f/5/a8e+ODOnDPnu/+Zc87MGACAOCi+iATEHcQthDfCgNhFrCCsCAti3SFvlFgHYYjP'+
    'iDXQly3Ed8RdPb8XKU2ICoQNLi+niB+I61r+DRqhvoeoOg+tShYXF8n29jZz4OPjQ0JDQ4mTk5PI'+
    'dAbxDtHpSKgfIs6UnzA2NgbFxcUQGxsLnp6e9N8ymEwmiI6OhsLCQhgYGNCKwEu9UMciDu02bWuL'+
    'OZWI9JCbmwsYERH5Iy1iuqeTvOXw8DDExMQ4TCrB398fWltblcSrCLOIuIq3GhkZkR0VFBSA1WoF'+
    'X1/fCwkHBwehvLxcHre3tyvJ25XE4eeZyGRnZweCg4PZ4uzsbDg+PmbzlDwgIEBF6OLiAm1tbbL3'+
    'kpISNu/h4SEK+wOe+BuvycvLYwvz8/Ph7Mw+zyi52Wy2IxV8GZSWljJ9amqqUvVLIjbztTo+Ps4W'+
    'eHt7w8nJiTBFJyYmwNnZmdl1dnZqFnNISIhWyKMo8WN+pqioiBkbDAaIj4+H9fV1odP+/n5oaWkR'+
    '6g4PDyEzMxOMRiPzlZWVpTR5Q4k/SqOjoyOIioqy27+4uDhNcpHs7e1BRkaGnQ8avY2NDd6sgRI3'+
    'SaOZmRnADqRKnvDwcMBOpd8nT08hOTlZmPGK5tJnxElPqYthNhNcrOpu8/PzBDsWGR0d1TxslpeX'+
    'CW4NGRoaEuppi+XERImN0ggzWNPx6uoq2d3d1dQfHByQqakpTT2WJD80UtIDaeTl5UUwqVSLMElI'+
    'b28vSU9P13SM/ZpgRRAsNaGeHiac/KV7/EUK/P7+PgQFBdntjZubG3R3dzucXNPT0yofrq6usLKy'+
    'wps1UeLn/ExOTo68wN3dHfBLhQQ005eWloS6yclJuw6XkpKiNHlPiQMRcqfo6emRO9Ls7KxmndKy'+
    '8/Pz0yw1aiOR19TUKNUJUsv8yc+mpaWxBQ0NDSqHtKzomSx9DQ0rZrTKrquri21TREQE6w+cjCKM'+
    'EnEyr1lYWGCLqOPKyko70sTERFWN0qMTs162a25ulnVYXsr/9Ex5LLbx2sbGRnlxfX09SzzaQrWO'+
    'xLCwMLDZbNDR0SHPVVRUKEmtovP4Bs0Z3qq2tpbttdS99C4AePeSf5eVlSlJ6UEUo3X1eaK0tlgs'+
    'F36pEnRP6f4K5LXe9fataFVdXR1LOv6ix9d6UlISVFdXs34tkEpHr7cvEJ8QN0VX27m5ObK5ucla'+
    'LJYUwf0lkZGRIj82xAfE18u8JCIRv+HqYkHcv8pLQsJTeoxdgvAP4pWeX8MlHm30VUFPiduIQMS1'+
    '80fbP8QaYhrRhxhwxNl/AQYAe3BJe0fqL18AAAAASUVORK5CYII=';
var nextimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp'+
    'bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6'+
    'eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0'+
    'NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
    'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw'+
    'dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv'+
    'IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS'+
    'ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD'+
    'cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFu'+
    'Y2VJRD0ieG1wLmlpZDowOEMxOTJFNTNGN0ExMUUyODVFMEU3RDE0MThBNzEzQiIgeG1wTU06RG9j'+
    'dW1lbnRJRD0ieG1wLmRpZDowOEMxOTJFNjNGN0ExMUUyODVFMEU3RDE0MThBNzEzQiI+IDx4bXBN'+
    'TTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4QzE5MkUzM0Y3QTExRTI4'+
    'NUUwRTdEMTQxOEE3MTNCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA4QzE5MkU0M0Y3QTEx'+
    'RTI4NUUwRTdEMTQxOEE3MTNCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4'+
    'bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fe9u0QAAAoJJREFUeNrUmDGLGkEUgMeFYDAHljEm'+
    'VWwXrYRNI0SxWDxIQOy8Qn+Ahb/AwlIEi03OA/+A4B+wyEFcz7trzrtLaSTXSCBaGQsFfXkjsyFZ'+
    'cjqzOyvkwVfOm4+Z2Zm3zwcARDBU5C3yBokgz5EjZIP8RH4gX5EBco58EcpOhTjwI3nkHFkBf6zY'+
    'mDzLsXcuHpl3yA24jxuWy7HQM+QU5Mcpyy0k9BIxwbsw2RxcQq+QW/A+btlcO4XoUl7A4eLCvn12'+
    'oQ/7MiyXS5hMJjKlPj4mpPOMpkKpVAoMw5AppduF6B1xxzNys9lALBajtykUi0WYzWYyhO6se8oS'+
    'yvOOXK/XEI/Ht0IUVVWh1+vJkMpbQj6RT9wuRPH7/VCr1WRcBT4qpIo8B/8Ssshms24OPHVQFUyU'+
    'RJ4QCdHpdEgikSDdbtfJcOqQpEIakRij0YhkMhlSqVQIrqbocI1u2ZXIuu7aMjvpdBrG47FI+msq'+
    '9M0rIUo4HAbcSt70D1Ro6qWQRblchul071RThRwo6vU6aTQaXBXjg9crpCgKVKtVmM/nXFt27aVQ'+
    'JBIBvAa4DzXdspFX25TL5YhpmgS/Nu5bgwpdyhYJBALb89Jut0koFBIZein16aDQSqDf7zt+OqQ8'+
    'rhaFQsFNOfL7caWcuBEKBoPQbDbdvvYnf9ZDT5F7J0KapsFwOHQrc88c/iphj3krxmg0upUplUqw'+
    'WCxkFGfHjxX5Zzw1ta7r0Gq1ZNXTZ7v+Oo6Qwc5PYbXieZN4Y8Dm/H9+FC1eIJ89lOmxOYSaDQHE'+
    '8EDGYLkdt2PeS2rHDFku1/2hgzasfA5beknW0nuNhFhLj7CW3ndkzFp6n0Rber8EGACVdFPbFIy2'+
    '5AAAAABJRU5ErkJggg==';
var previmg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp'+
    'bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6'+
    'eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0'+
    'NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
    'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw'+
    'dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv'+
    'IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS'+
    'ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD'+
    'cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFu'+
    'Y2VJRD0ieG1wLmlpZDowOEMxOTJFOTNGN0ExMUUyODVFMEU3RDE0MThBNzEzQiIgeG1wTU06RG9j'+
    'dW1lbnRJRD0ieG1wLmRpZDowOEMxOTJFQTNGN0ExMUUyODVFMEU3RDE0MThBNzEzQiI+IDx4bXBN'+
    'TTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4QzE5MkU3M0Y3QTExRTI4'+
    'NUUwRTdEMTQxOEE3MTNCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA4QzE5MkU4M0Y3QTEx'+
    'RTI4NUUwRTdEMTQxOEE3MTNCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4'+
    'bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+M0OMyQAAAm5JREFUeNrUmL2LGlEQwE8RDObAKpCY'+
    'VNFy0UowZSIWwsEdiJ1X6B+whb3YWNpYmJwHtnb+AVrkIJ4nuea8j/Yk12gCa2UsFHUyI0+JR1zf'+
    'x66QgV/39s0P1/dmdhwAcCAYGvIR+YD4kVfIIeJEfiO/kEekg1wgD0K7kxAHbiSFXCBT4I8peybF'+
    '9tiZi0fmGLkB9bhhe0kLvUTOwPo4Y3sLCb1FLsG+uGQ5uITeIbdgf9yyXKZC9FNewf7i6vnrey70'+
    'xapM/X4fJpMJz9LP24TiVsmUy2WIRqO8QsBybwjRHXGnKjIcDiGTydBNC6FQCBaLBe+jd6t7aiWU'+
    'UpVptVqgadpShgiHwzCfz0W2SK2EHKpHvFgsgtvtXstICpGDg4Q0wXKw8cdNJBIbIgpC5KCRkC4j'+
    '02g0IBAI/FNGUohCJ6GayBOz2Qzy+Ty4XK6tMgpCNRK65l3d6/UgFouZiigKfSehJ56V9XodfD4f'+
    'l4yC0A8SMsxWGIYB2WyWW0RRyNgplMvlhGVUhUxf2Wg0gkKhAE6ncx9CT9x/6mazCX6/326ha6Fj'+
    'PxgMIJlM2ilUk7oYS6USeDweO4R06dLRbreXFd1CoXXpkC6u1G6k02mrhNbFlThVqfaVSgW8Xq+q'+
    '0Onf/dAL5F5FqtvtQiQSkRW6Zw4bLeyRapM2Ho9B1/WlUDAYFOkYj7Y1+edW9NTVahXi8ThvT31u'+
    '9tVxiHSskKIaOJ3uPLwdlvP/+VBc8Yb6dhtlvrEcQsMGD31i2SBTZntLj2NO6FRbNI45sWI+tNeB'+
    'lUNypPeJjfTeI6/ZSO+AjfR+Ij020vsqOtL7I8AA0BxmWkRGTzcAAAAASUVORK5CYII=';
	
	$.fn.photoBox=function(){
		
		var $fn = $.fn.photoBox.fn;
		
		this.find('img').each(function(){
	
			var imgElm = $(this);
			if( imgElm.attr("src").match(/.jpg|.png/g) ){
				imgElm.attr( 'class','photobox');
			};
		});
	
		return this.each(function(){
		
			var that = this;
			
			$(".photobox").click(function(){
				
				var self = this;
			
				$('body')
				.append('<div id="photoBox">'+
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
				$('#controler').hide();
	
				self.allImg = $(that).find('img');
				self.imgLength = self.allImg.length;
				self.index = self.allImg.index(this);
				self.imgBg = $('#imgBg');
					
				$fn.open($(this),self);
	
				if(this.imgLength > 1){
					
					self.flag = true;
	
					$('.pb_prev').on('click',function(){
						
						if(!self.flag){return false;}
						else{
							$('#controler').slideUp();
							$fn.imgIndex(-1,self);
							self.flag = false;
							$fn.getBoxSize(self);
						}
					});
					
					$('.pb_next').on('click',function(){
						
						if(!self.flag){return false;}
						else{
							$('#controler').slideUp();
							$fn.imgIndex(1,self);
							self.flag = false;
							$fn.getBoxSize(self);
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
	
	$.fn.photoBox.fn = {
		
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
		open : function(imgElm,self){
			
			var sizeh = $(window).height(),
				sizew = $(window).width(),
				uri = $.fn.photoBox.fn.urlFilter( imgElm.attr("src") ),
				imgW = imgElm.width(),
				imgH = imgElm.height(),
				imgElm = $('<img class="imgElm" src="'+uri+'">');
				
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
				$.fn.photoBox.fn.display(this,self);
			});
			
		},
		getBoxSize : function(self){
			$(self.imgBg).find('img').stop().fadeOut('500',function(){
				$(this).remove();
				$.fn.photoBox.fn.open(self.allImg.eq(self.index),self);
			});
		},

		close : function(){
			$('div#photoBox').fadeOut(200,function(){
				$(this).remove();
			});
		},
		imgIndex : function(sel,self){
				self.index = self.index + sel;
		}
	}
})(jQuery);