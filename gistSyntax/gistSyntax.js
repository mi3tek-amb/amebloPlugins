/* jQuery.gist.amb.js 
 * Mitsuki Suzuki
 * MIT license
 */	
;(function($){
	$.fn.postGist = function(b){
		var 
		b = $.extend({id:"anonymous"},b);
		
		return this.each(function(){
			var
			d = $(this),
			c = d.data('id');
			
			$.ajax({
				url:"http://ameblo.mi2log.com/api/api_gist?url=https://gist.github.com/"+b.id+"/"+c+".js",
				fileType:"json",
				success:function(f){
					var e = $(
						new Function("return '"+f.split("'")[3]+"'")()
					);
					
					d.html(
						e.find(".gist-file")[d.data('index')]
					);
				}
			});
		});
	};
})(jQuery);