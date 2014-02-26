(function($){
				   
	$.fn.commentPic = function(option){
		
		var 
		option = $.extend({
			id:null,
			pics:true,
			profile:true,
			blog:true,
			now:true,
			noImage:"http://stat.profile.ameba.jp/profile_images/common/noimage_m.gif"
		}, option);
		
		var 
		ids = new Array,
		fn = $.fn.commentPic.fn;
		
		$(this).find('.commentList li').each(function(){
			
			var 
			cAuthor = $(this).find('.commentAuthor'),
			uri = cAuthor[0].pathname,
			id = uri ? uri.split('/')[1] : 'noid',
			menuArea = $('<div class="menu">').insertAfter(cAuthor);
		
			$(this).addClass( id+'Comment' );
			
			if( !fn.duplicate(ids, id) ){
				ids.push(id);
			};
			
		});
				
		$.each( ids, function(){		
			
			var 
			id = this,
			self = $( '.'+id+'Comment' ),
			menuArea = self.find('.menu');
			
			if(option.pics){
				
				var 
				uri = $(self).find('.commentAuthor').attr('href');
				
				if( !uri ){
				
					var 
					obj = $('<img>',{ src:option.noImage });
					fn.appendImg(obj, self.find('.commentHeader'));
					
				}else{
					
					if (id.match(option.id)){
					
						var 
						myProfImg = $('.userProfileImage img').attr('src'),
						obj = $('<a>',{ href:'http://profile.ameba.jp/'+id });
						obj.append( $('<img>',{ src:myProfImg }) );
						
						fn.appendImg(obj, self.find('.commentHeader'));
										
					}else{
					
						var 
						profUri = "http://profile.ameba.jp/"+id+"/",
						blogfUri = "http://ameblo.jp/"+id+"/",
						nowfUri = "http://now.ameba.jp/"+id+"/";
						
				 		$.get( "http://mi2log.com/amblo/api/cross_domain_userimage?url="+profUri )
				 		.done(function( imgUri ){
							if( !imgUri ){
							
								var obj = $('<img>',{ src:option.noImage });
	
							}else{
							
								var 
								uri = fn.shortedImg + imgUri.replace('http://',''),
								obj = $('<a>',{ href:profUri });
								obj.append( $('<img>',{ src:uri }) );
								
							};
							
							fn.appendImg(obj, self.find('.commentHeader'));
						});
					
						if(option.profile){
							var 
							profile='<span class="prof_Link link">\
							<a href="'+profUri+'">profile</a>\
							</span>';
							menuArea.append(profile);
						};
						
						if(option.blog){
							var 
							blog='<span class="blog_Link link">\
							<a href="'+blogfUri+'">blog</a>\
							</span>';
							menuArea.append(blog);
						};
						
						if(option.now){
							var 
							now='<span class="now_Link link">\
							<a href="'+nowfUri+'">now</a>\
							</span>';
							menuArea.append(now);
						};
					};
				};
			};
		});
		return this;
	};
	
	$.fn.commentPic.fn = {
		duplicate : function(a,b){
		    for(var i =0; i < a.length; i++){
		        if(b.toLowerCase() == a[i].toLowerCase()){
		            return true;
		        }
		    }
		    return false;
		},
		shortedImg : 'http://imgstat.ameba.jp/view/d/200/',
		appendImg : function(picDoc,imgposition){
			imgposition.after($('<div class=authpic>')
			.append(picDoc));
		}
	};
		
})(jQuery);