/* syntax hiliter:like a Gist(β)
 *
 * The MIT License (MIT) Copyright (c) 2013-2014
 * copyright : Mistuki Suzuki
 */
;(function($,undefined){

	var constructor = function(){
		return {
			syntaxElm : function(html){

				if(!html){
					return false;
				}else{
					var element = html.split(/\r\n|[\n\r\u2028\u2029\u0085]|<br>/gi);
				};
				for(
					var	i = 1
					,	num_element = ''
					,	code_element = ''
					,	a;
					element.length;
					i += 1
				){
					a = element.shift();
					a = a==='' ? '\t':a;
					if(a.match('<!--hilite-->')){
						var	hilite_class = ' hilite';
						a = a.replace('<!--hilite-->', '');
					}else{
						var hilite_class = '';
					};
					code_element += ('<div class="line'+hilite_class+'" id="file-transform-animate-js-LC'+i+'">'+ a +'</div>');
					num_element += ('<span class="line-number'+hilite_class+'" id="file-transform-animate-js-'+i+'" rel="file-transform-animate-js-L'+i+'">'+i+'</span>');		
				};
				return $('<tr>')
					.append('<td class="line-numbers">'+num_element+'</td>')
					.append('<td class="line-data"><pre class="line-pre">'+code_element+'</pre></td>');
			},
			replace : function(syntax_rep,type,regExp_words){
				for(var i = 0;i < type.length; i++){
					syntax_rep = syntax_rep.replace( regExp_words[i], function(a,b){
						var replace_word = b !== undefined ? a : b;
						return '%1' + type[i] + '%2' + a + '%3'
					});	
				};
				return syntax_rep
					.replace(/\%1/g,'<span class="syntax ')
					.replace(/\%2/g,'">')
					.replace(/\%3/g,'</span>');
			},
			codeType : {
				  js : 				'javascript'
				, entryScript :		'javascript'
				, script : 			'script language'
				, php : 			'PHP'
				, ruby : 			'Ruby'
				, cgi : 			'cgi'
				, html : 			'html'
				, text :			'text-data'
				, css : 			'css'
			}
		};
	};
	$.fn.syntaxHiliter =function(){
		
		var	fn = new constructor();
		
		return this.each(function(){
			
			var type = $(this).find('code')
			,	class_type = type.attr('class').match(/lang\-(.+)/)[1]
			,	body = $('<div class="gist"><div class="gist-file">\
					<div class="gist-data gist-syntax">\
					<div class="file-data">\
					<table cellpadding="0" cellspacing="0" class="lines">\
					<tbody></tbody></table></div></div></div>\
					<p class="script-type">'+fn.codeType[class_type]+'</p></div>')
			,	syntax_rep = $(this).find('code').html().replace(/\\'/g, '\\&#39')
			,	regExp_words = [];
			
			$(this).after(body).find('code').hide();
					
			//any script language
			if(	class_type === 'entryScript'||
				class_type === 'text'		||
				class_type === 'js'			||
				class_type === 'php'		||
				class_type === 'script'		||
				class_type === 'hx'			||
				class_type === 'ruby'		||
				class_type === 'objc'
			){
													
				body.addClass('scriptlangage');
				
				var type = ['CO','W','regR','A','B','C','D'];
					
					//comment
					regExp_words[0] = /^\/\/.*|^\s+\/\/.*|\/\/.*| \*\/?(\n|[^\/]|[^*]\/)*\* |#!.+/g 
					//literal
				,	regExp_words[1] = /'(.*?)'|"(.*?)"/g
					//regular expression
				,	regExp_words[2] = /[=|\(|\s]\/.+\/[g|i|\s|]*/g
					//function
				,	regExp_words[3] = /new[^a-zA-Z]|var(?:\s|$)|my\s|(function)(?=\()|return|this|else|typeof/g
					//mathmatic
				,	regExp_words[4] = /true|false|Math|ceil|null|delete|void|->/g
					//objection
				,	regExp_words[5] = /Array|RegExp|String|Function|echo|print/g
					//method
				,	regExp_words[6] = /(?=\.|)([a-zA-Z]+)(?=\()/g
				;
					
				body.find('tbody').append( fn.syntaxElm(fn.replace(syntax_rep,type,regExp_words) ) );
			//html
			}else if(
				class_type === 'html'
			){
				body.addClass('html');
						
				$(this).after(body).find('code').hide();
				
				var type = ['D','A','T','CO'];
					
					//attributes
					regExp_words[0] = /class|id|val|style|name|width|height|alt|href|src|onClick/g 
					//property
				,	regExp_words[1] = /\".+?\"/g
					//element
				,	regExp_words[2] = /<(.*?)>/g
				;
				
				body.find('tbody').append( fn.syntaxElm(fn.replace(syntax_rep,type,regExp_words) ) );
	
			//css
			}else if(
				
				type.hasClass('css')		||
				type.hasClass('lang-css')
				
			){
				body.addClass('css');
					
				$(this).after(body).find('code').hide();
				
				var type = ['A','W','D','CO'];
					
					//property
					regExp_words[0] = /.+?\:/g 
					//query:id
				,	regExp_words[1] = /(\#.*)(?=;)|\#.*\,/g
					//query:class
				,	regExp_words[2] = /(\:.+?)(?=;)|\:.+|\:.+/g
					//comment
				,   regExp_words[3] = /\/\*.+\*\/?/g
				;
					
				body.find('tbody').append( fn.syntaxElm(fn.replace(syntax_rep,type,regExp_words) ) );
				
			};
			
			//prepare something
			$('.syntax').each(function(){
				$(this).html($(this).text().replace(/</g,'&lt;'));
			});
		});
		
	};
	

})(jQuery);