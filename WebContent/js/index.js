(function(Core){
	'use strict';

	if(typeof define === "function" && define.amd) {
		define("Core", [], function(){
			return Core();
		});
	}else{
		window['Core'] = Core();
	}
})(function(){
	'use strict';

	var UI = {}; // Core;
	var moduleData = {}; //module
	var moduleSelector = {};
	var Sandbox = function(){
		var args = Array.prototype.slice.call(arguments);
		var callback = args.pop();
		var modules = (args[0] && typeof args[0] === 'string') ? args:args[0];

		return {
			rtnJson:function(data, notevil){
				return UI.Utils.strToJson(data, notevil || true);
			},
			uiInit:function(data){
				return UI.moduleBehavior(data);
			},
			sliderBar:function(data){
				return UI.SliderBar.call(data.context, data.callback);
			},
			rtnPrice:function(price){
				return UI.Utils.price(price);
			},
			rtnObjLength:function(obj){
				return UI.Utils.objLengtn(obj);
			},
			getModule:function(moduleID){
				return UI.getModule(moduleID);
			},
			getComponents:function(componentID, setting, callback){
				return UI.getComponents(componentID, setting, callback);
			},
			moduleEventInjection:function(strHtml, defer){
				UI.moduleEventInjection(strHtml, defer);
			},
			scrollController:function(wrapper, container, callback, id){
				return UI.Scrollarea.setScrollArea(wrapper, container, callback, id);
			},
			utils:UI.Utils,
			setLoadingBarState:function(isLoad){
				if(isLoad) UI.Loading.show();
				else UI.Loading.hide();
			},
			validation:UI.validation,
			ga:UI.ga,
			aaNew:UI.aaNew,
			reSize:UI.reSizeWidth,
			cookie:UI.cookie,
			sessionHistory:UI.sessionHistory
		}
	}

	UI.register = function(moduleID, creator){
		//console.log(new Object({'moduleid':moduleID, 'creator':creator}));
		moduleData[moduleID] = {
			creator:creator,
			instance:null
		}
	}

	UI.init = function(moduleID){
		moduleData[moduleID].instance = moduleData[moduleID].creator(new Sandbox(this));
		moduleData[moduleID].instance.init();
		/*deplicated*/
		/*
			body의 Dom요소의 moduleName에 따라 모듈실행
		*/
		/*if(moduleData[moduleID].instance !== undefined && moduleData[moduleID].instance.init !== undefined && typeof moduleData[moduleID].instance.init == 'function'){
			moduleData[moduleID].instance.init();
		}*/
	}

	UI.destroy = function(moduleID){
		var data = moduleData[moduleID];
		if(data.instance && moduleData[moduleID].instance.destroy !== undefined && typeof moduleData[moduleID].instance.destroy == 'function'){
			data.instance.destroy();
			delete data.instance;
		}
	}

	UI.initAll = function(){
		for(var moduleID in moduleData){
			if(moduleData.hasOwnProperty(moduleID)){
				this.init(moduleID);
			}
		}
	}

	UI.destroyAll = function(){
		for(var moduleID in moduleData){
			if(moduleData.hasOwnProperty(moduleID)){
				this.destroy(moduleID);
			}
		}
	}

	UI.getModule = function(moduleID){
		try{
			return moduleData[moduleID].instance;
		}catch(e){
			console.log(moduleID + ' - This module is not defined');
		}
	}

	UI.moduleBehavior = function(data){
		/************************************************************************************************************
			모듈이 실행되는 context 내에 같은 이름( selector )을 가진 template 이 있을경우 모듈의 인스턴스 함수 init이 n번 실행되는 경우 발견
			해당 모듈은 각각의 스코프를 가지고 있기때문에 템플릿 내의 컴포넌트의 기능의 오류는 없으나 메모리를 차지하기 때문에 추후 변경 요망

			모듈 : 페이지내에 하나만 존재
			컴포넌트 : 페이지내에 여러개 존재

			따라서 모듈은 페이지 내에 하나만 존재하는 것이기 때문에 template의 레이아웃을 변경해야한다.
		************************************************************************************************************/

		/*if(data.hasOwnProperty('moduleName')){
			moduleSelector[data.attrName] = data.moduleName;
		}*/

		if($(data.selector).length <= 0) return;
		$(data.selector).each(function(i){
			if(data.hasOwnProperty('attrName')){
				if(data.attrName instanceof Array){
					data.handler.method.call(this, (function(){
						var obj = {};
						for(var i in data.attrName){
							obj[data.attrName[i]] = UI.Utils.strToJson($(this).attr(data.attrName[i]), true);
						}
						return obj;
					}.bind(this))());
				}else{
					data.handler.method.call(this, UI.Utils.strToJson($(this).attr(data.attrName), true));
				}
			}
		});
	}


	UI.getComponents = function(componentID, setting, callback){
		try{
			var _self = this;
			var component = this.Components[componentID];
			var $context = (setting && setting.context) ? setting.context : $('body');
			var attrName = (component.attrName instanceof Array) ? component.attrName[0] : component.attrName;
			var selector = (setting && setting.selector) ? setting.selector : '['+ attrName +']';
			var setting = (setting) ? setting : {};
			var arrComponent = [];
			var reInitIS = component.hasOwnProperty('reInit');

			if(component.hasOwnProperty('constructor') && component.hasOwnProperty('attrName')){
				//기존에 실행되었던 component 를 지운다.

				/*if(this.CurrentComponents.hasOwnProperty(componentID) && component.hasOwnProperty('reInit')){
					for(var i=0; i<this.CurrentComponents[componentID].components.length; i++){
						if(typeof this.CurrentComponents[componentID].components[i].destroy === 'function'){
							this.CurrentComponents[componentID].components[i].destroy();
						}
					}
				}*/

				$context.find(selector).each(function(i){
					var instance;
					var context = $(this).context;
					var indexOf = _self.CurrentComponentsContext.indexOf(context); //(reInitIS) ? _self.CurrentComponentsContext.indexOf(context) : -1;
					setting['selector'] = this;

					if(indexOf > -1){
						instance = _self.CurrentComponents[indexOf].setting(setting);
						//console.log('instance1', instance);
					}else{
						instance = component.constructor().setting(setting).init((function(){
						    if(component.attrName instanceof Array){
						        var obj = {};
        						for(var i in component.attrName){
        							obj[component.attrName[i]] = _self.Utils.strToJson($(this).attr(component.attrName[i]), true);
        						}
        						return obj;
						    }else{
						        return _self.Utils.strToJson($(this).attr(component.attrName), true);
						    }
						}.bind(this))());
						_self.CurrentComponentsContext.push(context);
						_self.CurrentComponents.push(instance);
					}

					if(callback && typeof callback === 'function'){
						callback.call(instance, i, this);
					}

					arrComponent.push(instance);
				});
				//console.log( 'com', (arrComponent.length > 1) ? arrComponent : arrComponent[0] );
				return (arrComponent.length > 1) ? arrComponent : arrComponent[0];
			}else{
				component = null;
				setting = null;
				console.log(componentID + ' - constructor is not defined.');
			}

		}catch(e){
			console.log(e);
		}
	}

	UI.moduleEventInjection = function(strHtml, defer){
		/************************************************************************************************************
			First starting is auto from component, definition is retry that component from module

			component 부터 자동으로 실행되어야한다. module에서 component를 다시 정의하기 때문에 기존의 이벤트들이 삭제되어 아무런 동작을 안한다.
			그리고 기본적인 동작을 하는 component만 실행한다. ( hasOwnProperty( object ) )
		************************************************************************************************************/

		if(!strHtml) return;

		var _self = this;
		var ID = this.Utils.arrSameRemove(strHtml.match(/data-(?:module|component)-+(?:\w|-)*/g)).sort();
		for(var i=0; i<ID.length; i++){
			var name = ID[i].replace(/data-/g, '').replace(/-/g, '_');
			var type = name.replace(/\_\w*/g, '');
			if(type === 'module'){
				try{
					/*if(moduleSelector.hasOwnProperty(ID[i])){
						if(this.getModule(moduleSelector[ID[i]]).hasOwnProperty('destroy')){
							this.getModule(moduleSelector[ID[i]]).destroy();
							delete moduleSelector[ID[i]];
						}
					}

					this.getModule(name).init();*/

					//UI.init
					if(this.getModule(name)){
						if(this.getModule(name).hasOwnProperty('destroy')){
							this.getModule(name).destroy();
							moduleData[name].instance = null;
							//delete moduleSelector[ID[i]];
						}
						//this.getModule(name).init();
					}

					this.init(name);
					if(defer && this.getModule(name).hasOwnProperty('setDeferred')){
						this.getModule(name).setDeferred(defer);
					}

				}catch(e){
					console.log(e);
				}
			}else if(type === 'component'){
				try{
					var component = this.Components[name];
					if(component.hasOwnProperty('constructor') && component.hasOwnProperty('reInit') && component.reInit){
						_self.getComponents(name);
					}else{
						component = null;
					}
				}catch(e){
					console.log(e);
				}

			}
		}
	}

	UI.Components = {};
	UI.CurrentComponentsContext = [];
	UI.CurrentComponents = [];
	UI.Observer = {
		eventID:0,
		addEvent:function(type, handler){
			if(!this.listeners) this.listeners = {};
			if(!this.listeners[type]) this.listeners[type] = {};

			var eventID = this.eventID++;
			this.listeners[type][eventID] = handler;
			return eventID;
		},
		fireEvent:function(type){
			if(!this.listeners || !this.listeners[type]) return false;
			var handlers = this.listeners[type];
			var eventID;
			var args =  Array.prototype.slice.call(arguments);

			if(handlers.stop) return false;

			args.shift();
			for(eventID in handlers) {
				if(handlers.hasOwnProperty(eventID)){
					if(eventID !== "stop"){
						if(!handlers[eventID].stop){
							handlers[eventID].apply(args[0], args[1]);
						}
					}
				}
			}
		},
		removeEvent:function(type, hnd){
			if(!this.listeners || !this.listeners[type]) return -1;
			var handlers = this.listeners[type];
			if(typeof hnd === "function"){
				for(eventID in handlers) if(handlers.hasOwnProperty(f)){
					if(handlers[eventID] === hnd){
						delete handlers[eventID];
						break;
					}
				}
				return !handlers[eventID];
			}else{
				if(handlers[hnd]) delete handlers[hnd]
					return !handlers[hnd];
			}
		},
		applyObserver:function(tclass){
			for(var p in this){
				tclass.prototype[p] = this[p];
			};

			return true;
		}
	}

	UI.Utils = {
		contextPath:(function(){
			try{
			    return _GLOBAL.SITE.CONTEXT_PATH ? _GLOBAL.SITE.CONTEXT_PATH : '';
			}catch(e){
			    return '';
			}
		})(),
		getValidateChk:function(components, msg){
			var isValidateChk = false;
			if(Array.isArray(components)){
				$.each(components, function(i){
					isValidateChk = this.getValidateChk(msg);
				});
			}else{
				isValidateChk = components.getValidateChk(msg);
			}

			return isValidateChk;
		},
		getQueryParams:function(str, type){
			if(!str) return [];

			var data = (type === 'array') ? [] : {};
			str.replace(/([^?=&]+)(?:=([^&]*))/g, function(pattern, key, value){
				if(type === 'array'){
					data.push(pattern);
				}else{
					//data[key] = decodeURI(value);
					if(data.hasOwnProperty(key)){
						if(typeof data[key] === 'object'){
							data[key].push(value);
						}else{
							data[key] = [data[key], value];
						}
					}else{
						data[key] = value;
					}
				}
			});

			return data;
		},
		arrSameRemove:function(arr){
			if(arr === null) return [];
			return arr.reduce(function(a,b){
				if (a.indexOf(b) < 0 ) a.push(b);
				return a;
			},[]);
		},
		objLengtn:function(obj){
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		},
		trim:function(str){
			return str.replace(/(^\s*)|(\s*$)/gi, '');
		},
		price:function(price){
			//if(!price) return false;
			var temp = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
			if(_GLOBAL.SITE.USE_KOREA_WON_PRICE_FORMAT == true ){
				temp += '원';
			}
			return temp;
		},
		strToJson:function(str, notevil){
			try{
				// json 데이터에 "가 있을경우 변환할필요가 없으므로 notevil을 false로 변경
				if(str.match(/"/,'g') !== null) notevil = false;
				if(notevil) {
					return JSON.parse(str
						// wrap keys without quote with valid double quote
						.replace(/([\$\w]+)\s*:+([`'~!@#$%^&*?();:|_+=\/\w-#().\s0-9가-힣/\[/\]]*)/g, function(_, $1, $2){
							if($2 !== ''){
								return '"'+$1+'":"'+$2+'"';
							}else{
								return '"'+$1+'":""';
							}
						})
						//.replace(/([\$\w]+)\s*:+([`~!@#$%^&*()_=+|{};:,.<>?\s\w가-힣]*)/g, function(_, $1, $2){return '"'+$1+'":"'+$2+'"';})
						//replacing single quote wrapped ones to double quote
						.replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';}));
				} else {
					return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
				}
			}catch(e){
				return false;
			}
		},
		mobileChk:(function(){
			return navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/);
		})(),
		mobileDetect:(function(){
			/*
				console.log( md.mobile() );          // 'Sony'
				console.log( md.phone() );           // 'Sony'
				console.log( md.tablet() );          // null
				console.log( md.userAgent() );       // 'Safari'
				console.log( md.os() );              // 'AndroidOS'
				console.log( md.is('iPhone') );      // false
				console.log( md.is('bot') );         // false
				console.log( md.version('Webkit') );         // 534.3
				console.log( md.versionStr('Build') );       // '4.1.A.0.562'
				console.log( md.match('playstation|xbox') ); // false
			*/
			return new MobileDetect(window.navigator.userAgent);
		})(),
		touch:(window.Modernizr && Modernizr.touch === true) || (function () {
			'use strict';
			return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
		})(),
		transforms3d:(window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
			'use strict';
			var div = document.createElement('div').style;
			return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
		})(),
		transforms:(window.Modernizr && Modernizr.csstransforms === true) || (function () {
			'use strict';
			var div = document.createElement('div').style;
			return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
		})(),
		transitions:(window.Modernizr && Modernizr.csstransitions === true) || (function () {
			'use strict';
			var div = document.createElement('div').style;
			return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
		})(),
		addEvent:function($target, evt, func){
			if(window.addEventListener || document.addEventListener){
				$target.addEventListener(evt, func);
			}else{
				$target.attachEvent('on'+ evt, func);
			}
		},
		removeEvent:function($target, evt, func){
			if(window.addEventListener){
				$target.removeEventListener(evt, func);
			}else{
				$target.detachEvent('on'+ evt, func);
			}
		},
		ajax:function(url, method, data, callback, isCustom, isLoadingBar, delay, dataType, cache){
			//$('.dim').addClass('active');
			if(!isLoadingBar) UI.Loading.show();

			// POST 일때 token 추가, 현재 admin에서만 동작함
			var $tokenForm = $('#tokenForm');
			if( $tokenForm != null && data != null && String(method).toLowerCase() == 'post'){
				if( typeof( data ) == 'object' ){
					if( data.csrfToken == null ){
						data.csrfToken = $tokenForm.find('input[name="csrfToken"]').val();
					}
				}
				if( typeof( data ) == 'string' ){
					data = data + '&' + $tokenForm.serialize()
				}
			}

			$.ajaxSetup({cache:false});
			$.ajax({
				url:url,
				type:method||'POST',
        		dataType:dataType||'json',
				data:data,
				cache:false,
				complete:function(data){
					//$('.dim').removeClass('active');

					_.delay(function(data){

						if(!isLoadingBar) UI.Loading.hide();
						if(data.status == 200 && data.readyState === 4 || isCustom ){
							callback(data);
						}else{
							UIkit.notify('error : ' + data.status, {timeout:3000,pos:'top-center',status:'danger'});
						}
					},( delay || 100 ), data);
				}
			});
		},
		jsonp:function(url, data, callbackName, callback, isLoadingBar){
			if(!isLoadingBar) UI.Loading.show();

			$.jsonp({
				url:url,
				data:data,
				dataType:'jsonp',
				callbackParameter:callbackName,
				timeout:5000,
				success:function(data, status){
					UI.Loading.hide();
					callback(data, status);
				},
				error:function(XHR, textStatus, errorThrown){
					UI.Loading.hide();
					callback({error:textStatus});
				}
			});

			/*$.ajax({
				url:url,
				data:data,
				dataType:'jsonp',
				jsonp:callbackName,
				success:function(data){
					console.log('fjdsjaflkdsjalkjvdlksanfklewnkl');
					if(!isLoadingBar) UI.Loading.hide();
					callback(data);
				}
			});*/

		},
		promise:function(opts){
			var isLoadingBar = (opts.isLoadingBar === false) ? opts.isLoadingBar : true;
			if(!opts.url) return false;
			if(isLoadingBar) UI.Loading.show();

			var defer = $.Deferred();
			var promise = $.ajax({
				url:opts.url,
				type:opts.method || 'GET',
				data:opts.data || {},
				success:function(data){
					if(isLoadingBar) UI.Loading.hide();
					if(opts.hasOwnProperty('custom') && opts.custom){
						defer.resolve(data);
					}else{
						if(data.hasOwnProperty('result')){
							if(data.result){
								defer.resolve(data);
							}else{
								defer.reject(data.errorMessage || data.errorMsg || data);
							}
						}else{
							defer.resolve(data);
						}
					}
				},
				error:function(data){
					if(isLoadingBar) UI.Loading.hide();
					defer.reject(data.statusText);
				}
			});

			return defer.promise();
		},
		replaceTemplate:function(template, rtnFunc){
			return template.replace(/{+[\w-]*}+/g, function(pattern){
				return rtnFunc(pattern.replace(/{{|}}/g, ''));
			});
		},
		replaceTemplateTest:function(template, data){
			function rtnTemp(template){
				data.forEach(function(data, i){
					var txt = '';
					var temp = template.replace(/({{each?[\s\w.]+}}{1})([\s\w<>="{}#\/.-]*){{\/each}}/g, function(){
						var argexp = new RegExp(/each/, 'g');
						var args = arguments;
						var arrKeys = args[1].match(/[^{}]/g).join('').replace(/(?:each|\s)/g, '').split(/\./g);
						var tempData = data;

						for(var i=0; i<arrKeys.length; i++){
							if(i > 0){
								tempData = rtnValue(tempData, arrKeys[i]);
							}
						}

						if(argexp.test(args[2])){
							rtnTemp(args[2]);
						}

						txt += args[2].replace(/{+[\w.]*}+/g, function(pattern){
							var arrKeys = pattern.match(/[^{}]/g).join('').split(/\./g);
							var val = data;

							for(var i=0; i<arrKeys.length; i++){
								if(i > 0){
									val = rtnValue(val, arrKeys[i]);
								}
							}

							return val;
						});
					});

					return txt;
				});
			}

			function rtnValue(data, key){
				return data[key];
			}

			return rtnTemp(template);
		},
		url : {
			appendParamToURL:function( url, key, value ){
				var g = "?";
				if ( url.indexOf( g ) !== -1 ){
					g = "&";
				}
				return url + g + key + "=" + ( _.isEmpty($.trim( value )) ? "" : encodeURIComponent( value ))

			},
			appendParamsToUrl: function ( e, i, d ) {
				var g = UI.Utils.url.getUri( e ),
					h = arguments.length < 3 ? false : d;
				var f = $.extend( g.queryParams, i );
				var c = g.path + "?" + $.param( f );
				if ( h ) {
					c += g.hash
				}
				if ( c.indexOf( "http" ) < 0 && c.charAt( 0 ) !== "/" ) {
					c = "/" + c
				}
				return c
			},
			removeParamFromURL: function ( d, k ) {
				var g = d.split( "?" );
				if ( g.length >= 2 ) {
					var c = g.shift();
					var j = g.join( "?" );
					var h = encodeURIComponent( k ) + "=";
					var f = j.split( /[&;]/g );
					var e = f.length;
					while ( 0 < e-- ) {
						if ( f[ e ].lastIndexOf( h, 0 ) !== -1 ) {
							f.splice( e, 1 )
						}
					}
					d = c + "?" + f.join( "&" )
				}
				return d
			},
			updateParamFromURL: function ( e, c, f ) {
				var d = new RegExp( "([?&])" + c + "=.*?(&|$)", "i" );
				var g = e.indexOf( "?" ) !== -1 ? "&" : "?";
				if ( e.match( d ) ) {
					return e.replace( d, "$1" + c + "=" + f + "$2" )
				} else {
					return e + g + c + "=" + f
				}
			},
			staticUrl: function ( c ) {
				if ( !c || a.trim( c ).length === 0 ) {
					return b.urls.staticPath
				}
				return b.urls.staticPath + ( c.charAt( 0 ) === "/" ? c.substr( 1 ) : c )
			},
			ajaxUrl: function ( c ) {
				return UI.Utils.url.appendParamToURL( c, "format", "ajax" )
			},
			toAbsoluteUrl: function ( c ) {
				if ( c.indexOf( "http" ) !== 0 && c.charAt( 0 ) !== "/" ) {
					c = "/" + c
				}
				return c;
			},
			toProtocolNeutralUrl: function ( d ) {
				var c = d ? d.indexOf( "://" ) : -1;
				return c >= 0 ? d.substr( c + 1 ) : d;
			},
			// hot-fix (chohh) -20160513
			getCurrentUrl: function () {
				//return window.location.href
				return window.location.origin + window.location.pathname + window.location.search;
			},
			getQueryStringParams: function ( c ) {
				if ( !c || c.length === 0 ) {
					return {};
				}
				var e = {},
					d = unescape( c );
				d.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ), function ( g, f, i, h ) {
					e[ f ] = h;
				} );
				return e;
			},
			getUri: function ( e ) {
				var c;
				if ( e.tagName && a( e ).attr( "href" ) ) {
					c = e;
				} else {
					if ( typeof e === "string" ) {
						c = document.createElement( "a" );
						c.href = e;
					} else {
						return null;
					}
				}
				var d = ( c.pathname.charAt( 0 ) === "/" ? "" : "/" ) + c.pathname;
				return {
					protocol: c.protocol,
					host: c.host,
					hostname: c.hostname,
					port: c.port,
					path: d,
					query: c.search,
					queryParams: c.search.length > 1 ? UI.Utils.url.getQueryStringParams( c.search.substr( 1 ) ) : {},
					hash: c.hash,
					url: c.protocol + "//" + c.hostname + d,
					urlWithQuery: c.protocol + "//" + c.hostname + c.port + d + c.search
				}
			},
			hashExists: function () {
				return ( window.location.hash ) ? true : false;
			},
			getHashFromUrl: function () {
				return window.location.hash.substring( 1 );
			}
		},
		rtnMatchComma:function(keyword){
			return keyword.match(/[0-9a-zA-Z가-힣\s]+[^,\s]/g) || [];
		}
	}

	UI.Loading = (function(){
		var template = '<div class="loading"><div class="dim"></div><div class="contents"><img src="/cmsstatic/theme/c-commerce/assets/images/preloader.gif" /><span class="comment">처리중 입니다.</span></div></div>';
		var $loading = $('body').append((function(){
			return $('#loading-icon-template').html();
		})() || template).find('.loading');

		return {
			show:function(){
				$loading.focus();
				$loading.addClass('open');
			},
			hide:function(){
				$loading.removeClass('open');
			}
		}
	})();

	UI.Scrollarea = (function(){
		var ScrollArea = function(wrapper, container, callback, id){
			var ID = id || '';
			var $wrapper = $(wrapper);
			var $container = $(container);
			var currentPer = 0;
			var arrCallBackFunc = [];
			var maximumHeight;
			var percent;
			var scrollTop;

			return {
				init:function(){
					var _self = this;
					$wrapper.on('scroll.' + ID, function(e){
						scrollTop = $(this).scrollTop();
						maximumHeight = $container.height() - $(this).height();
						percent = Math.round((scrollTop / maximumHeight) * 100);

						if(callback && typeof callback === 'function'){
							callback.call(_self, percent, scrollTop);
							currentPer = percent;
						}else{
							console.log('Not defined that callbackfunc of scrollEvent');
							$wrapper.off('scroll');
						}
					});

					return _self;
				},
				setScrollTop:function(top){
					$wrapper.scrollTop(top);
					return this;
				},
				setScrollPer:function(per){
					return Math.round((maximumHeight / 100) * per);
				},
				getScrollTop:function(offsetTop){
					return Math.round(((offsetTop - $wrapper.height()) / maximumHeight) * 100);
				},
				getScrollPer:function(){
					return currentPer;
				},
				setAddCallBack:function(callbackfunc){
					arrCallBackFunc.push(callbackfunc);
				},
				destroy:function(){
					$wrapper.off('scroll.' + ID);
					return this;
				}
			}
		}

		return {
			setScrollArea:function(wrapper, container, callback, id){
				return new ScrollArea(wrapper, container, callback, id).init();
			}
		};
	})();


	UI.SliderBar = function(){
		var _self = this;
		var callback = Array.prototype.slice.call(arguments).pop();
		var $container = $(this).parent();
		var currentPer = 0;
		var startX = 0;

		if(UI.Utils.touch){
			UI.Utils.addEvent(this, 'touchstart', onStart);
			UI.Utils.addEvent(this, 'touchmove', onMove);
			UI.Utils.addEvent(this, 'touchend', onEnd);
		}else{
			UI.Utils.addEvent(this, 'mousedown', onStart);
		}

		function onStart(e){
			var touchobj = (UI.Utils.touch) ? e.touches[0] : e;

			startX = touchobj.clientX - $container.offset().left;
			currentPer = ((startX / $container.width()) * 100);

			if(typeof callback.start == 'function') callback.start(currentPer);
			if(!UI.Utils.touch){
				UI.Utils.addEvent(document, 'mousemove', onMove);
				UI.Utils.addEvent(document, 'mouseup', onEnd);
			}
		}

		function onMove(e){
			var touchobj = (UI.Utils.touch) ? e.touches[0] : e;
			var percent = ((((touchobj.clientX - $container.offset().left) - startX) / $container.width()) * 100) + currentPer;

			if(percent < 0) percent = 0;
			else if(percent > 100) percent = 100;

			//console.log(percent);

			if(typeof callback.move == 'function') callback.move(percent);
		}

		function onEnd(e){
			if(typeof callback.end == 'function') callback.end();
			if(!UI.Utils.touch){
				UI.Utils.removeEvent(document, 'mousemove', onMove);
				UI.Utils.removeEvent(document, 'mouseup', onEnd);
			}
		}

		return {
			getPercent:function(){
				return currentPer;
			},
			setPercent:function(per){
				currentPer = per;
				if(typeof callback.move == 'function') callback.move(currentPer);
			}
		}
	}


	UI.polyfill = (function(){

		//  ~ IE8 function bind method add
		Function.prototype.bind = Function.prototype.bind || function(b) {
			if (typeof this !== "function") {
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var a = Array.prototype.slice;
			var f = a.call(arguments, 1);
			var e = this;
			var c = function() {};
			var d = function() {
				return e.apply(this instanceof c ? this : b || window, f.concat(a.call(arguments)));
			};
			c.prototype = this.prototype;
			d.prototype = new c();
			return d;
		};




		//  ~ IE8 Object keys method add
		// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
		if (!Object.keys) {
			Object.keys = (function() {
				'use strict';
				var hasOwnProperty = Object.prototype.hasOwnProperty,
					hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
					dontEnums = [
						'toString',
						'toLocaleString',
						'valueOf',
						'hasOwnProperty',
						'isPrototypeOf',
						'propertyIsEnumerable',
						'constructor'
					],
					dontEnumsLength = dontEnums.length;

				return function(obj) {
					if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
						throw new TypeError('Object.keys called on non-object');
					}

					var result = [], prop, i;

					for (prop in obj) {
						if (hasOwnProperty.call(obj, prop)) {
							result.push(prop);
						}
					}

					if (hasDontEnumBug) {
						for (i = 0; i < dontEnumsLength; i++) {
							if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
							}
						}
					}

					return result;
				};
			}());
		}



		// ECMA-262 5판, 15.4.4.21항의 작성 과정
		// 참고: http://es5.github.io/#x15.4.4.21
		if (!Array.prototype.reduce) {
			Array.prototype.reduce = function(callback /*, initialValue*/) {
				'use strict';
				if (this == null) {
					throw new TypeError('Array.prototype.reduce called on null or undefined');
				}
				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}
				var t = Object(this), len = t.length >>> 0, k = 0, value;
				if (arguments.length == 2) {
					value = arguments[1];
				} else {
					while (k < len && !(k in t)) {
						k++;
					}
					if (k >= len) {
						throw new TypeError('Reduce of empty array with no initial value');
					}
					value = t[k++];
				}
				for (; k < len; k++) {
					if (k in t) {
						value = callback(value, t[k], k, t);
					}
				}
				return value;
			};
		}

	})();

	UI.validation = (function(){
		var DEFAULT_OPTION = {
			animate: false,
			errorClass: "error",
			errorsContainer : function(elem, isRadioOrCheckbox ) {
				var $target = null;
				if( $(elem.$element).is('input[type="radio"]') || $(elem.$element).is('input[type="checkbox"]') ){
					$target = $( elem.$element ).parent().parent();
				}else{
					$target = $( elem.$element ).parent();
				}
				$target.removeClass("server-error");
				return $target;
			},
			classHandler : function(elem, isRadioOrCheckbox ) {
				var $target = null;
				if( $(elem.$element).is('input[type="radio"]') || $(elem.$element).is('input[type="checkbox"]') ){
					$target = $( elem.$element ).parent().parent();
				}else{
					$target = $( elem.$element ).parent();
				}
				$target.removeClass("server-error");
				return $target;
			},
			errorsWrapper: '<span class="error-message"></span>',
			errorTemplate: '<span></span>',
			validationThreshold : 1,
			excluded: ':hidden'
		}

		function init( dom, opts ){
			dom.parsley( $.extend( DEFAULT_OPTION, opts ));
		}

		function reset( dom, opts ){
			dom.parsley( $.extend( DEFAULT_OPTION, opts ) ).reset();
		}

		function validate( dom ){
			dom.parsley().validate();
		}

		function isValid( dom ){
			return dom.parsley().isValid();
		}

		function destroy( dom ){
			dom.parsley().destroy();
		}

		return {
			init : init,
			reset : reset,
			validate : validate,
			isValid : isValid,
			destroy : destroy
		}
	})();

	UI.ga = ( function(){
		var target = 'master.send';
		var useGa = _GLOBAL.MARKETING_DATA().useGa;
		function isValid() {
			if( !useGa ){
				return false;
			}
			var ga = ga || {};
			return _.isFunction(ga);
		}
		// non-interaction event 처리
		function sendEvent( type, action, label, value ) {
			if ( isValid() ) {
				if ( _.isEmpty(action) ) {action = 'action is empty';}
				if ( _.isEmpty(label) ) {label = 'label is empty';}
				if ( typeof value === 'undefined' || isNaN(value) || !_.isNumber(value) ) {
					value = 0;
				}
				ga( target, 'event', type, action, label, value, {'nonInteraction': 1});
			}
		}
		// 서버에서 처리 되는 ga 호출시 사용
		function processor( data ){
			var marketingData = _GLOBAL.MARKETING_DATA();
			switch( data.orderType ){
				// 주문시
				case 'ORDER' :
					break;
				// 반품시
				case 'RETURN' :
					//TODO
					// 반품되는 전체 order 정보가 필요함 복수 일수도 있음
					//commerce( "order-return",  marketingData.returnOrderNumber, "" );
					break;
				// 부분 반품시
				case 'PARTIAL_RETURN' :
					break;
				// 취소시
				case 'VOID' :
					commerce( "order-cancel",  marketingData.cancelOrderNumber, marketingData.cancelPrice );
					break;
				// 부분 취소시
				case 'PARTIAL_VOID' :
					commerce( "order-partial-cancel",  marketingData.cancelOrderNumber, marketingData.cancelPrice );
					break;
			}

			// 반품 취소 처리 필요
			Core.Utils.ajax(Core.Utils.contextPath +'/processor/execute/google_enhanced_ec', 'GET', data, function(data){
				//console.log( data.responseText );
				if( data.status == 200){
					if( String(data.responseText).indexOf('html') == -1 ){
						$("body").append( data.responseText );
					}
				}
			}, true, true );
		}
		function pv( type, url ){
			if( isValid() ) {
				ga( target, type, url ); // ex) ga("master.send", "pageview", "/pagename");
			}
		}
		function social( name, action, url ){
			if( isValid() ) {
				ga( target, 'social', name, action, url );
			}
		}
		function action( action, label, value ){
			sendEvent( 'user-action', action, label, value);
		}
		function commerce( action, label, value ){
			sendEvent( 'commerce', action, label, value );
		}
		function error( action, label, value ){
			sendEvent( 'error', action, label, value );
		}
		return {
			processor : processor,
			pv : pv,
			social : social,
			action : action,
			commerce : commerce,
			error : error
		}
	}());

	// UI.aa = ( function(){
	// 	var marketingData = _GLOBAL.MARKETING_DATA();
	// 	var useAa = marketingData.useAa;
	// 	var traceType = "";
	// 	var pageName = "";
	// 	var pageType = "";
	// 	var breadcrumb = "";

	// 	function isValid() {
	// 		return useAa;
	// 	}
	// 	function updateMarketingData(){
	// 		marketingData = _GLOBAL.MARKETING_DATA();
	// 	}
	// 	function pv(){
	// 		if( isValid()){
	// 			pageName = marketingData.pathName.split('/');
	// 			pageType = marketingData.pageType;
	// 			breadcrumb = marketingData.pathName;
	// 			var newAcount = false;
	// 			var newLogin = false;

	// 			if( marketingData.pathName.length == 1 ){
	// 				pageName = pageName[0];
	// 			}else{
	// 				pageName = pageName[ pageName.length - 1 ];
	// 			}

	// 			if( marketingData.pageType == 'home' ){
	// 				pageName = 'Home';
	// 				breadcrumb = 'Home';
	// 			}

	// 			if( marketingData.pageType == 'registerSuccess'){
	// 				newAcount = true;
	// 			}

	// 			var param = getPageData( "default", pageName, pageType, breadcrumb, newAcount, newLogin );
	// 			processor( param );
	// 		}
	// 	}
	// 	function commerce( type ){
	// 		updateMarketingData();
	// 		var param = {};

	// 		switch( type ){
	// 			case 'category' :
	// 				if( marketingData.categoryInfo == null ){
	// 					return;
	// 				}
	// 				var categoryInfo = marketingData.categoryInfo;
	// 				if( categoryInfo.paging == null ){
	// 					return;
	// 				}

	// 				traceType = 'plp';
	// 				pageName = categoryInfo.name;
	// 				pageType = 'plp';
	// 				breadcrumb = getBreadcrumbData(categoryInfo.breadcrumbs);

	// 				var page = categoryInfo.paging.page - 1;
	// 				var pageSize = categoryInfo.paging.pageSize;
	// 				param.categoryId = categoryInfo.id;
	// 				param.limit = pageSize;
	// 				param.offset = page * pageSize;
	// 				param.url = marketingData.pathName;
	// 			break;

	// 			case 'product' :
	// 				if( marketingData.productInfo == null ){
	// 					return;
	// 				}
	// 				var categoryInfo = marketingData.categoryInfo;
	// 				var productInfo = marketingData.productInfo;

	// 				traceType = 'pdp';
	// 				pageName = productInfo.name;
	// 				pageType = 'pdp';
	// 				breadcrumb = getBreadcrumbData(categoryInfo.breadcrumbs);

	// 				param.categoryId = categoryInfo.id;
	// 				param.productIds = productInfo.id;
	// 				param.url = marketingData.pathName;
	// 			break;
	// 			case 'search' :
	// 				if( marketingData.searchInfo == null ){
	// 					return;
	// 				}

	// 				var searchInfo = marketingData.searchInfo;
	// 				var itemList = marketingData.itemList;


	// 				traceType = 'searchResult';
	// 				pageName = 'search result'; // productName을 노출해야 하는데
	// 				pageType = 'search result';
	// 				breadcrumb = 'Search';

	// 				param.totalResultCount = searchInfo.totalCount;
	// 				param.searchTerm = searchInfo.keyword;

	// 				if( itemList != null ){
	// 					var productIds = $.map(itemList, function(item){ return item.id });
	// 					param.productIds = String(productIds);
	// 				}


	// 				// todo 검색 결과가 없을때 에러가 난다;
	// 				if( productIds == "" ){
	// 					return;
	// 				}

	// 			break;
	// 			case 'cart' :
	// 				traceType = 'cartView';
	// 				pageName = 'Cart'
	// 				pageType = 'cart';
	// 				breadcrumb = 'Cart';
	// 			break;

	// 			case 'checkout' :
	// 				if( marketingData.checkoutInfo == null ){
	// 					return;
	// 				}

	// 				var checkoutInfo = marketingData.checkoutInfo;

	// 				var step = checkoutInfo.step;
	// 				if( step == "order" ){
	// 					step = "billing";
	// 				}
	// 				step = step.charAt(0).toUpperCase() + step.slice(1);

	// 				traceType = 'checkout';
	// 				pageName = 'Checkout: ' + step;
	// 				pageType = 'checkout';
	// 				breadcrumb = 'Checkout';

	// 				param.checkoutStepName = step;
	// 			break;

	// 			case 'confirmation' :
	// 				traceType = 'orderConfirm';
	// 				pageName = 'Checkout : Order Confirmation'
	// 				pageType = 'order confirmation';
	// 				breadcrumb = 'Checkout/Order confirmation';

	// 				param.orderNumber = marketingData.orderNumber;
	// 			break;
	// 		}

	// 		param = $.extend( param, getPageData( traceType, pageName, pageType, breadcrumb ));
	// 		processor( param );
	// 	}

	// 	function getPageData(traceType, name, type, breadcrumb, newAcount, newLogin, errorCode ){
	// 		var page = {};
	// 		page.traceType = traceType;
	// 		page.pageName = name;
	// 		page.pageType = type;

	// 		if( breadcrumb != null ){
	// 			page.breadcrumb = breadcrumb;
	// 		}

	// 		if( type == 'error' && errorCode != null){
	// 			page.errorCode = errorCode;
	// 		}

	// 		if( newAcount == true ){
	// 			page.newAccountCreated = true;
	// 		}

	// 		if( newLogin == true ){
	// 			page.newLogin = true;
	// 		}

	// 		return page;
	// 	}
	// 	function getBreadcrumbData( breadcrumb ){
	// 		if( breadcrumb != '' ){
	// 			var breadcrumbList = String(breadcrumb).split('||');
	// 			breadcrumbList = _.without( breadcrumbList, 'home', 'Home', 'HOME').join('/');
	// 			return String(breadcrumbList);
	// 		}
	// 		return '';
	// 	}
	// 	function processor( param ){
	// 		Core.Utils.ajax('/processor/execute/adobe_enhanced_ec', 'GET', param, function(data){
	// 			//console.log( data.responseText );
	// 			if( data.status == 200){
	// 				$("body").append( data.responseText );
	// 			}
	// 		}, true, true );

	// 	}

	// 	function addEvent(){
	// 		var endPoint = UI.getComponents('component_endpoint');

	// 		endPoint.addEvent('loadMoreProducts', function( data ){
	// 			//console.log( data );

	// 			if( marketingData.categoryInfo == null ){
	// 				return;
	// 			}

	// 			var param = {
	// 				traceType : "plpMore",
	// 			}

	// 			var categoryInfo = marketingData.categoryInfo;
	// 			var page = data.page - 1;
	// 			var pageSize = data.pageSize;

	// 			param.categoryId = categoryInfo.id;
	// 			param.limit = pageSize;
	// 			param.offset = page * pageSize;
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('applyFilter', function( data ){
	// 			//console.log( data );
	// 			/*
	// 			digitalData.eventData = {
	// 				filterCategory : data.key,
	// 				filterOption : data.value
	// 			}
	// 			digitalData.event = 'applyFilter';

	// 			var param = {
	// 				traceType : "search",
	// 				filter : 'Y',
	// 				filterCategory : data.key,
	// 				filterOption : data.value
	// 			}
	// 			processor( param );
	// 			*/
	// 		});
	// 		endPoint.addEvent('quickView', function( data ){
	// 			//console.log( data );

	// 			var param = {
	// 				traceType : "search",
	// 				quickview : "Y",
	// 				productIds : data.product.id
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('addToCart', function( data ){

	// 			var param = {
	// 				traceType : 'addToCart',
	// 				cartType : 'add to cart',
	// 				skuIds : data.skuId,
	// 				quantities : data.quantity
	// 			}
	// 			processor( param );

	// 		});
	// 		endPoint.addEvent('buyNow', function( data ){
	// 			//console.log( data );

	// 			var param = {
	// 				traceType : "addToCart",
	// 				cartType : 'buy now',
	// 				skuIds : data.skuId,
	// 				quantities : data.quantity
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('addToWishlist', function( data ){
	// 			//console.log( data );
	// 		});
	// 		endPoint.addEvent('pdpColorClick', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "colorClick",
	// 				colorName : data.color
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('pdpImageClick', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "imgClick"
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('pdpSizeGuideClick', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "sizeGuide"
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('searchSuggestionClick', function( data ){
	// 			// 한글을 사용하면 안되는데 검색어가 한글이 많다.
	// 			// 바로 리다이텍트 걸려서 타이밍이 나올지 확인
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : 'searchSuggest',
	// 				searchTerm : data.key,
	// 				searchSuggestionName : data.text
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('removeFormCart', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "removeCart",
	// 				itemIds : data.orderItemId
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('cartAddQuantity', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : 'addCartQuantity',
	// 				skuIds : data.skuId,
	// 				quantities : data.quantity
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('applyPromoCode', function( data ){
	// 			//console.log( data );
	// 			//valid, invalid, expired
	// 			//만료된 코드를 알수는 있지만 메시지 처리 된 상태로 전달되고 있어 공통으로 처리가 불가능해 우선은 두가지로만 처리
	// 			var result = ( data.promoAdded == false ? 'invalid' : 'valid' );
	// 			var param = {
	// 				traceType : "applyPromoCode",
	// 				result : result,
	// 				code : data.promoCode
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('newsletterSubscribed', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "newsletter",
	// 				location : marketingData.pathName
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('newAccountCreated', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "createAccount"
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('login', function( data ){
	// 			//console.log( data );
	// 			digitalData.event = 'newLogin';
	// 		});
	// 		endPoint.addEvent('socialShareClick', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "socialShareService",
	// 				socialShareServiceName : data.service
	// 			}
	// 			processor( param );
	// 		});
	// 		endPoint.addEvent('addNewAddress', function( data ){
	// 			//console.log( data );
	// 			var param = {
	// 				traceType : "addNewAddress"
	// 			}
	// 			processor( param );
	// 		});
	// 	}
	// 	function init(){
	// 		addEvent();
	// 	}
	// 	return {
	// 		// 함수를 구분짓는것이 큰 의미는 없지만 추후 형태의 변화가 있을것을 대비해서 구분
	// 		init : init,
	// 		pv : pv,
	// 		commerce : commerce
	// 		//addEvent : addEvent,
	// 		//error : error
	// 	}
	// })();

	UI.reSizeWidth = (function(){
		var frag = '';
		var currentDeviceInfo = {};
		var currentBreakPoint = 0;
		var arrDevice = ['mobile', 'tablet', 'pc'];

		$(window).resize(function(e){
			var wH = $(window).width();
			if(wH <= 480 && frag !== 'mobile'){
				frag = 'mobile';
				currentDeviceInfo = arrDevice[0];
				$('body').attr('data-device', 'mobile');
			}else if(wH > 480 && wH <= 960 && frag !== 'tablet'){
				frag = 'tablet';
				currentDeviceInfo = arrDevice[1];
				$('body').attr('data-device', 'tablet');
			}else if(wH > 960 && frag !== 'pc'){
				frag = 'pc';
				currentDeviceInfo = arrDevice[2];
				$('body').attr('data-device', 'pc');
			}
		});

		$(window).trigger('resize');

		return {
			getState:function(){
				return currentDeviceInfo;
			}
		}
	})();

	UI.sessionHistory = (function(){
		var currentQueryParam = UI.Utils.getQueryParams(location.href);
		for(var key in currentQueryParam){
			sessionStorage.setItem(key, currentQueryParam[key]);
		}

		var currentHistory = (function(){
			var obj = {};
			for(var key in sessionStorage){
				obj[key] = sessionStorage[key];
			}
			return obj;
		})();

		return {
			getHistory:function(key){
				if(key){
					return currentHistory[key];
				}else{
					return currentHistory;
				}
			},
			updateHistory:function(){
				currentHistory = {};
				for(var key in sessionStorage){
					currentHistory[key] = sessionStorage[key];
				}
				return currentHistory;
			},
			setHistory:function(obj){
				if(!obj || typeof obj !== 'object'){
					throw new Error('param obj is not Object');
					return;
				}

				for(var key in obj){
					sessionStorage.setItem(key, obj[key]);
				}

				this.updateHistory();
			},
			removeHistory:function(key){
				if(!key) return;
				if(key === 'all'){
					sessionStorage.clear();
				}else{
					sessionStorage.removeItem(key);
				}

				this.updateHistory();
			}
		}
	})();

	UI.cookie = (function(){
		var objCookies = {};
		unescape(window.cookie).split(/;/).forEach(function(v, i){
			var arrValue = v.split(/=/);
			objCookies[arrValue[0].replace(/[\s\n\t]/, '')] = arrValue[1];
		});

		var setExpiresDate = function (expires , time){
			var date = new Date();
			date.setTime(date.getTime()+(expires*time*1000));
			var expires = "expires=" + date.toUTCString();
			return expires;
		}

		return {
			getCookie:function(key){
				return (key) ? objCookies[key] : objCookies;
			},
			setCookie:function(key, value, options){
				/*
					expires           쿠키 만료일       new Date(year, month, day, hours, minutes, seconds, milliseconds)
					expires_day       쿠키 생존 일      숫자
					expires_hour      쿠키 생존 시간    숫자
					domain            도메인          www.example.com 또는 sub.example.com 또는 example.com
					path              경로            / 또는 /dir
					secure            ssl             true 또는 false

				*/

				var options = options || {};
				var arrCookie = [];

				if(options.encodeType == "encodeURI" ){
					arrCookie.push(escape(key) + '=' + encodeURI(value));
				}else if( options.encodeType == "encodeURIComponent" ) {
					arrCookie.push(escape(key) + '=' + encodeURIComponent(value));
				}else{
					arrCookie.push(escape(key) + '=' + escape(value));
				}


				if(options.expires){
					if( typeof options.expires === 'object' && options.expires instanceof Date ){
						var date = options.expires;
						var expires = "expires=" + date.toUTCString();
						arrCookie.push(expires);
					}
				}else if(options.expires_day){
					arrCookie.push(setExpiresDate(options.expires_day , 24*60*60));
				}else if(options.expires_hour){
					arrCookie.push(setExpiresDate(options.expires_hour , 60*60));
				}

				if(options.domain) arrCookie.push("domain=" + options.domain);
				if(options.path) arrCookie.push('path=' + options.path);
				if(options.secure === true) arrCookie.push('secure=' + options.secure);

				document.cookie = arrCookie.join('; ');
			},
			delCookie:function(key){
				if(!key){
					return 'You will try remove cookie ';
				}else{
					document.cookie=key + "=" + "; expires=" + new Date().toUTCString();
				}
				return objCookies[key];
			}
		}
	})();

	return UI;
});

function showMenu(){
	$("#mobileMenuOpenBtn").trigger('click');
}

$(document).ready(function(){
	//channel sessionHistory
	var currentQueryParam = Core.Utils.getQueryParams(location.href);
	if(currentQueryParam.channel){
		if(!currentQueryParam.pid){
			Core.sessionHistory.removeHistory('pid');
		}
	}

	//modules init
	if(document.readyState == 'complete' || document.readyState == 'interactive'){
		//category history back
		var categoryPagingType = sessionStorage.getItem('categoryPagingType');
		if(categoryPagingType === 'scroll' || categoryPagingType === 'more'){
			if(sessionStorage.getItem('categoryPathname') === location.pathname){
				if(sessionStorage.getItem('categoryTarget')){
					$('body').find(sessionStorage.getItem('categoryTarget')).html(sessionStorage.getItem('categoryList'));
					$(document).scrollTop(sessionStorage.getItem('categoryScrollTop'));
					removeHistory(false);

					//UIkit.notify('history back', {timeout:3000,pos:'top-center',status:'warning'});
				}
			}else{

				if(!sessionStorage.getItem('isHistoryBack')){
					sessionStorage.removeItem('categoryCurrentPage');
					sessionStorage.removeItem('categoryLineSize');
				}
				removeHistory(sessionStorage.getItem('isHistoryBack'));
				sessionStorage.removeItem('isHistoryBack');
				//UIkit.notify('history back no', {timeout:3000,pos:'top-center',status:'warning'});
			}
		}else{
			removeHistory(false);
			//UIkit.notify('history back out', {timeout:3000,pos:'top-center',status:'warning'});
		}

		function removeHistory(flag){
			if(!flag){
				sessionStorage.removeItem('categoryTarget');
				sessionStorage.removeItem('categoryList');
				sessionStorage.removeItem('categoryPathname');
				sessionStorage.removeItem('categoryScrollTop');
			}
		}


		//document ready dim none;
		$('.dim').removeClass('module-start-before');

		//modules registered in Core
		//Core.initAll();

		// modules defined
		var initDocument = $('body').html();
		Core.moduleEventInjection(initDocument);

		// scroll top go
		var offset = 350;   // 수직으로 어느정도 움직여야 버튼이 나올까?
		var duration = 60;   // top으로 이동할때까지의 animate 시간 (밀리세컨드, default는 400. 예제의 기본은 500)

		Core.Scrollarea.setScrollArea(window, document, function(per){
			if(per !== 0 && this.getScrollPer() > per){
				$('.scrollup').fadeIn(duration);
			}else if(per === 0 || this.getScrollPer() < per){
				$('.scrollup').fadeOut(duration);
			}

			if(per > 30){
				$('.historyBack').fadeIn(duration);
			}else{
				$('.historyBack').fadeOut(duration);
			}

			//console.log( per );
		}, 'top');

		// 현재 왓슨스에만 적용되어있는 상단 뒤로가기 버튼 이벤트 처리
		$('.historyBack').click(function(e){
			e.preventDefault();
			history.back();
			return false;
		});

		$('.scrollup').click(function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		});


		// 모든 submit 시 loding 처리
		$('form').on( 'submit', function(){
			if($(this).attr('data-isLoadingBar') === 'false') return;
			Core.Loading.show();
		});

		// 이미지맵 사용시 반응형 처리
	    $('img[usemap]').rwdImageMaps();

		Core.cookie.setCookie( "MOBILEYN", (!Core.Utils.mobileChk ? 'N' : 'Y' ));

		// 앱 푸시 값 추가 해야함
	    if( _GLOBAL.CUSTOMER.ISSIGNIN  ){
		    Core.cookie.setCookie( "USERID", _GLOBAL.CUSTOMER.ID);
			//Core.cookie.setCookie( "USERNAME", _GLOBAL.CUSTOMER.FIRSTNAME + _GLOBAL.CUSTOMER.LASTNAME );
			//Core.cookie.setCookie( "USERNAME_ENCODEURI", _GLOBAL.CUSTOMER.FIRSTNAME + _GLOBAL.CUSTOMER.LASTNAME, { encodeType : "encodeURI" }  );
			Core.cookie.setCookie( "USERNAME_ENCODEURICOMPONENT", _GLOBAL.CUSTOMER.FIRSTNAME + _GLOBAL.CUSTOMER.LASTNAME, { encodeType : "encodeURIComponent" }  );
			Core.cookie.setCookie( "USER_EXTERNALID", _GLOBAL.CUSTOMER.EXTERNALID);
			Core.cookie.setCookie( "USER_PUSHYN", "Y");
	    }else{
			Core.cookie.delCookie( "USERID" );
			//Core.cookie.delCookie( "USERNAME" );
			//Core.cookie.delCookie( "USERNAME_ENCODEURI" );
			Core.cookie.delCookie( "USERNAME_ENCODEURICOMPONENT" );
			Core.cookie.delCookie( "USER_EXTERNALID" );
			Core.cookie.delCookie( "USER_PUSHYN" );
	    }

		/* UIKit modal override */
		/*UIkit.modal.alert = function(content, options) {
		    var modal = UIkit.modal.dialog(([
		        '<div class="uk-margin uk-modal-content">'+String(content)+'</div>',
		        '<div class="uk-modal-footer uk-text-right"><button class="button small uk-modal-close">확인</button></div>'
		    ]).join(""), UIkit.$.extend({bgclose:false, keyboard:false}, options)).show();
		    return modal;
		};

		UIkit.modal.confirm = function(content, options) {
		    var modal = UIkit.modal.dialog(([
		        '<div class="uk-margin uk-modal-content">'+String(content)+'</div>',
		        '<div class="uk-modal-footer uk-text-right"><button class="button small uk-modal-close">확인</button></div>'
		    ]).join(""), UIkit.$.extend({bgclose:false, keyboard:false}, options)).show();
		    return modal;
		};*/



		/* 부하 테스트시 필요한 스크립트 특정 파라미터가 있으면 이벤트를 트리거 */

		var e = {},
			d = Core.Utils.url.getCurrentUrl();
		d.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ), function ( g, f, i, h ) {
			e[ f ] = decodeURIComponent(h);
		} );

		var url = e;

		if( url.tftest ){

			// 상품 바로주문
			// localhost:8080/checkout?tftest=true
			$(this).find("div[data-attribute-name='SHOES_SIZE']").find(".input-radio").eq(0).trigger('click');
			/*
			$(".option-wrap:eq(0)").find('[class^="product-option_"]' ).each( function(){

			});
			*/

				//$("[data-brz-components-type]").find("select").find("option:eq(1)").attr("selected", "selected");
				/*
			$(".option-wrap:eq(0)").find('.select-box' ).each( function(){
				console.log( $(this));
				console.log( $(this).data("brz-components-type"));
				if( $(this).data("brz-components-type") == "SIZE"){
					console.log( 'update')
					$(this).find("select").find("option:eq(1)").attr("selected", "selected").trigger('change');
				}
			});
			*/

			// btn-buy
			// btn-next
			// btn-next
			// btn-gift-submit
			// btn-checkout-complete-submit

			//A4NE-CP35-HE97

			var isFirst = true;
			$('[data-add-item]').each(function(i){
				$(this).find('.btn-link').each( function(){
					var $btn = $(this);
					var type = $btn.attr("action-type");
					if( type == "redirect" && isFirst ){
						isFirst = false;
						_.delay(function(){
							$btn.trigger("click");
						},
						1000);
						return false;
					}
				});
			});

			// 주문고객 정보 입력
			// localhost:8080/checkout?tftest=true&email=dire2@nave.com&phone=01023247648

			if( url.email ){
				$('input[name="emailAddress"]').val( url.email );
				$('input[name="phoneNumber"]').val( url.phone );
				//$('[data-order-info-submit-btn]').trigger( 'click' );
			}

			if( url.name ){
				// 배송지 정보 입력
				//localhost:8080/checkout?tftest=true&name=이영선&phone=01023247648&addr1=주소1&addr2=주소2&pcode=12341
				$('input[name="address.fullName"]').val( url.name );
				$('input[name="address.phonePrimary.phoneNumber"]').val( url.phone );
				$('input[name="address.addressLine1"]').val( url.addr1 );
				$('input[name="address.addressLine2"]').val( url.addr2 );
				$('input[name="address.postalCode"]').val( url.pcode );
				$('input[name="fulfillmentOptionId"]').eq(0).attr("checked", true);
				//$('[data-order-shipping-submit-btn]').trigger( 'click' );
			}

			// gift 카드 적용
			//3GRG-WSSK-G6JW
			// http://localhost:8080/checkout?tftest=true&gift=XD7Z-9EKG-ZP3F
			// http://localhost:8080/checkout?tftest=true&gift=3GRG-WSSK-G6JW

			if( url.gift ){
				$('input[name="giftCardNumber"]').val( url.gift );
				$('#applyGiftcard_form').submit();
			}

			// 최종 결제
			// http://localhost:8080/checkout?tftest=true&complete=true
			if( url.complete ){
				$('input[name="isCheckoutAgree"]').prop('checked', true);
				$('[data-checkout-btn]').trigger('click');
			}
		}

		/*

		$("[data-issoldout]").each( function( index, data ){
			var isSoldout = $(this).text();
			var type = $( this ).data('issoldout');
			var target = "";
			switch( type ){
				case "productItem" :
					target = $( this ).closest(".product-item");
				break;
				case "product" :
					target = $(".product-option-container");
				break;
			}
			if( String(isSoldout) == "true"){
				target.find('[data-soldout-target="true"]').removeClass('uk-hidden');
				target.find('[data-soldout-target="false"]').remove();
			}else{
				target.find('[data-soldout-target="true"]').remove();
				target.find('[data-soldout-target="false"]').removeClass('uk-hidden');
			}

		})

		*/

	}
});

(function(Core){
	var Map = function(){
		'use strict';

		var $this, $btn, storeList = null, map = null, markers = [], infoWindows = [], currentStoreIndex = 0;
		var setting = {
			selector:'[data-component-map]',
			target:'map',
			storeList:null
		}

		var makeMarkerIcon = function(storeData){
			var icon =  {
				size: new naver.maps.Size(20, 31),
				origin: new naver.maps.Point(0, 0),
				anchor: new naver.maps.Point(10, 16)
			}

			if(storeData.additionalAttributes && storeData.additionalAttributes.icon && storeData.additionalAttributes.icon !== ''){
				icon.content = '<i class="icon_map_marker '+storeData.additionalAttributes.icon+'"></i>';
			} else if(undefined !== storeData.additionalAttributes && undefined !== storeData.additionalAttributes.storeType
			           && storeData.additionalAttributes.storeType.indexOf('direct') !== -1){
				// icon.url = Core.Utils.contextPath + '/cmsstatic/theme/c-commerce/cmsstatic/theme/c-commerce/assets/images/g_ico_mapFlag01.png';
				icon.url = 'https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/theme/c-commerce/cmsstatic/theme/c-commerce/assets/images/g_ico_mapFlag01.png';
			} else{
				// icon.url = Core.Utils.contextPath + '/cmsstatic/theme/c-commerce/cmsstatic/theme/c-commerce/assets/images/g_ico_mapFlag02.png';
				icon.url = 'https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/theme/c-commerce/cmsstatic/theme/c-commerce/assets/images/g_ico_mapFlag02.png';
			}

			return icon;
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				var args = arguments[0];

				storeList = setting.storeList || args['data-store-list'];

				var firstLatitude = (storeList[0]) ? storeList[0].latitude:37.3595953;
				var firstLongitude = (storeList[0]) ? storeList[0].longitude:127.1053971;

				map = new naver.maps.Map(setting.target, {
					center:new naver.maps.LatLng(firstLatitude, firstLongitude),
					zoom:9
				});

				_self.initMap();
				return this;
			},
			mapEvent:function(seq){
				var _self = this;
				var marker = markers[seq], infoWindow = infoWindows[seq];
				if (infoWindow.getMap()) {
					infoWindow.close();
					_self.fireEvent('closeMarker', this, [seq]);
				} else {
					infoWindow.open(map, marker);
					_self.fireEvent('openMarker', this, [storeList[seq], seq]);
					map.setCenter(new naver.maps.LatLng(storeList[seq].latitude, storeList[seq].longitude));
					map.setZoom(10);
				}
			},
			initMap:function(){
				//store 위도, 경도 값으로 지도 마커 찍어내기
				//store type에 따라 2개의 마커icon 필요함
				var _self = this;

				for (var i=0; i<storeList.length; i++) {
					var position = new naver.maps.LatLng(storeList[i].latitude, storeList[i].longitude);
					var marker = new naver.maps.Marker({
						map:map,
						position:position,
						title:storeList[i].name,
						icon:makeMarkerIcon(storeList[i]),
						zIndex:100
					});

					var infoWindow;
					if($('body').attr('data-device') === 'mobile'){
						//mobile
						infoWindow = new naver.maps.InfoWindow({
							content: '<div id="map_store_info_layer" style="width:120px;text-align:center;padding:10px 6px 10px 10px;"><span class="tit">'+ storeList[i].name +'</span></div>'
						});
					} else {
						//pc
						infoWindow = new naver.maps.InfoWindow({
							content: '<div id="map_store_info_layer" style="width:260px;text-align:center;padding:20px 14px 20px 20px;">'+Handlebars.compile($('#map-window-store-info').html())(storeList[i])+'</div>'
						});
					}

					markers.push(marker);
					infoWindows.push(infoWindow);
				}

				// 지도 마커 클릭 이벤트
				for (var i=0, ii=markers.length; i<ii; i++) {
					naver.maps.Event.addListener(markers[i], 'click', (function(seq){
						return function(){
							_self.mapEvent(seq);
						}
					})(i));
				}
			},
			getStoreList:function(id){
				return (function(){
					if(!id){
						return storeList;
					}else{
						for(var key in storeList){
							if(storeList[key].id == id){
								return storeList[key];
							}
						}
					}
				});
			},
			setStoreList:function(arrStoreList){
				arrStoreList.forEach(function(current, index, arr){
					storeList.push(current);
				});

				return this;
			},
			reInit:function(){
				//변수 초기화
				// map = null;
				markers = [];
				infoWindows = [];
				// currentStoreIndex = 0;
				setting.storeList = storeList;
				this.initMap();
				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_map'] = {
		constructor:Map,
		attrName:['data-component-map', 'data-store-list']
	}
})(Core);

(function(Core){
	var Phone = function(){
		'use strict';

		var setting = {
			selector:'[data-component-phone]'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();

				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var args = arguments[0] || {};
				var $this = $(setting.selector);
				$this.text(args.phonenum.replace(/(^[0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/g, '$1-$2-$3'));
				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_phone'] = {
		constructor:Phone,
		reInit:true,
		attrName:'data-component-phone'
	}
})(Core);

(function(Core){

	var ProductOptionSelected = function(){
		'use strict';

		var receiveToEvent = function(checkedOpt){
			var key = Object.keys(checkedOpt)[0];
			var index = 0;
			var resetIS = false;
			var objOpt = {};
			var currentIndex = 0;

			//currentSku 초기화하여 사용해야 하지만 returnToSkuData에 currentSku값을 사용하는 문제점 해결시 사용해야함
			//if(key === firstOptName) currentSku = allSkuData;
			//선택된 옵션 인덱스

			for(var i=0; i<optionData.length; i++){
				if(optionData[i].type === key){
					currentIndex = i;
					break;
				}
			}

			optionData.map(function(data, i, o){
				if(data.type === key) data.selectedValue = (checkedOpt[key] !== '' && checkedOpt[key] !== null) ? checkedOpt[key] : null;

				//선택된 다음 옵션들 리셋
				if(i > currentIndex) disabled(data.type, i);
				if(data.selectedValue === null){
					if(checkedOpt[key] !== '' && checkedOpt[key] !== null && index === i){
						//data.type : 다음 옵션 아이디
						//data : 다음 옵션 리스트
						//returnToSkuData(key, checkedOpt[key]) : sku 리스트
						nextOpt(data.type, data, returnToSkuData(objOpt));
					}
				}else{
					index++;
					objOpt[data.type] = data.selectedValue;

					if(index === o.length){
						if(productOptionType === 'multi') multiAddOption(objOpt);
						if(productOptionType === 'single') singleAddOption(objOpt);
					}
				}
			});
		}

		var returnToSkuData = function(objSkuValue){
			var arrData = [];
			var len = Object.keys(objSkuValue).length;
			var counter = 0;

			//currentSku값에서만 옵션을 체크하여 값을 전달 해야 하지만
			//currentSku값의 초기화 문제때문에 allSkuData의 배열을 이용해야한다.
			allSkuData.forEach(function(data){
				counter = 0;
				for(var key in objSkuValue){
					if(data[key] == objSkuValue[key]){
						counter++;
						if(counter === len){
							arrData.push(data);
						}
					}else{
						return false;
					}
				}
			});

			return arrData;
		}

		var nextOpt = function(componentID, opt, sku){
			currentSku = sku;
			optionDom[componentID].receiveToData(opt, sku);
		}

		var disabled = function(componentID, index){
			optionData[index].selectedValue = null;
			optionDom[componentID].disabled();
		}

		var noAddOption = function(){
			var obj = {};
			obj['qty'] = $('input[name=quantity]').eq(0).val();
			currentOptList = {};
			currentOptList['noOption'] = obj;
		}

		var singleAddOption = function(objOpt){
			var obj = {};
			var listKey = '';
			var sku = null;
			var counter = 0;

			sku = returnToSkuData(objOpt)[0];

			//옵션타입이 selectbox일때 value가 없는 즉, 선택하세요.. 이 선택될 경우 sku가 없으므로 리턴시킨다.
			if(!sku) return;

			obj['price'] = sku.price;
			obj['qty'] = $this.find('.qty').val();
			obj['maxQty'] = sku.quantity;
			obj['retailPrice'] = sku.retailPrice;
			obj['salePrice'] = sku.salePrice;
			obj['inventoryType'] = sku.inventoryType;
			obj['options'] = {};
			obj['upc'] = sku.upc;
			obj['id'] = sku.skuId;
			obj['locationQuantity'] = sku.locationQuantity;

			for(var optionKey in option){
				listKey += option[optionKey].values[option[optionKey].selectedValue];
				obj['options'][optionKey] = option[optionKey].values[option[optionKey].selectedValue];

				counter++;
			}

			currentOptList = {};
			currentOptList[listKey] = obj;

			if($submitBtn.hasClass('disabled') && submit){
				$submitBtn.removeClass('disabled');
			}

			if(obj.salePrice){
				var salePrice = parseInt(obj.salePrice.replace(/[￦,가-힣]/g, ''));
				var retailPrice = parseInt(obj.retailPrice.replace(/[￦,가-힣]/g, ''));
				var productInfo = _GLOBAL.MARKETING_DATA().productInfo;

				if( productInfo ){
					productInfo.price = salePrice;
					productInfo.retailPrice = retailPrice;
				}

				if(salePrice < retailPrice){
					$salePrice.find('strong').text(obj.salePrice).data("price", salePrice);
					$retailPrice.text(obj.retailPrice);
					$('.marketing-msg').show();
				}else{
					$salePrice.find('strong').text(obj.retailPrice).data("price", obj.retailPrice);
					$retailPrice.text('');
					$('.marketing-msg').hide();
				}
			}else{
				$salePrice.find('strong').text(obj.retailPrice).data("price", obj.retailPrice);
				$retailPrice.text('');
			}
			$upcCode.data('upc', obj.upc);
			$upcCode.text(obj.upc);

			/*
				fireEvent 가 등록되기전에 호출하여 처음 이벤트는 발생하지 않는다 그래서 setTimeout으로 자체 딜레이를 주어 해결하였다.
				조금 위험한 방법아지만 해결방법을 찾기 전까지 사용해야 할꺼 같다.
			*/
			setTimeout(function(){
				__self.fireEvent('skuComplete', __self, [obj]);
			});
		}

		var multiAddOption = function(objOpt){
			//console.log('multiAddOption');
		}


		var promiseInit = function(_self){
//			allSkuData = objOptType['data-sku-data']; //Core.Utils.strToJson($this.attr('data-sku-data'));
			//bundleDefaultSkuData = Core.Utils.strToJson($this.attr('data-bundleDefaultSkuData-data'));

			//allSkuData = $this.find("[data-sku-data]").data("sku-data");
			//$this.find("[data-sku-data]").remove();
			//옵션 데이터 나누기 예) COLOR:{}, SIZE:{} ...

			for(var k in optionData){
				option[optionData[k].type] = optionData[k];

				for(var i=0; i<allSkuData.length; i++){
					allSkuData[i][optionData[k].type] = allSkuData[i].selectedOptions[k];
				}
			}

			$optionWrap.find('[data-brz-components-type]').each(function(i){

				optionDom[$(this).attr('data-brz-components-type')] = Core.getComponents(componentType, {context:$this, selector:this}, function(){
					this.addEvent('change', function(attributeValue, valueId, id, friendlyName){
						var obj = {};
						var _that = this;
						var $that = $(_that);
						var attributeName = $that.attr('data-attributename');
						var friendlyName = $that.attr('data-friendly-name');

						obj[$(_that).attr('name')] = valueId;
						receiveToEvent(obj);

						$optionWrap.find('input[type=hidden]').each(function(i){
							if($(this).attr('name') === 'itemAttributes['+attributeName+']'){
								$(this).val(escape(attributeValue));
								//$(this).val(attributeValue);
							}
						});

						endPoint.call("pdpOptionClick", $.extend( objOptType, { type : attributeName, value : attributeValue, skuData : allSkuData }));

						/*
							fireEvent 가 등록되기전에 호출하여 처음 이벤트는 발생하지 않는다 그래서 setTimeout으로 자체 딜레이를 주어 해결하였다.
							조금 위험한 방법아지만 해결방법을 찾기 전까지 사용해야 할꺼 같다.
						*/
						setTimeout(function(){
							if(isFireEvent){
								_self.fireEvent('changeFirstOpt', _that, [firstOptName, $(_that).attr('name'), productId, attributeValue, valueId, id, friendlyName]);
								if( attributeName.toLowerCase() == 'color' ){
									endPoint.call( 'pdpColorClick', { color : attributeValue })
								}
							}
							isFireEvent = true;
							$that.closest('div').prev().find('.over-txt').text(friendlyName);
						});
					});
				});

				optionData[i]['name'] = $(this).attr('data-attribute-name');
			});

			//sku load skuComplete
			_self.fireEvent('skuLoadComplete', _self, [allSkuData]);

			/*
				optionDom : radio, selectbox 컴포넌트
				optionData : 상품의 총 옵션 ( COLOR, SIZE .... )
				allSkuData : 상품 옵션으로 생성된 총 SkuData
				처음 옵션 init 로드 후 allSkuData를 가지고 해당 quantity를 체크하여 옵션의 상태를 처리한다.
				firstOptName은 현 컴포넌트 arguments의 objOptType['data-component-product-option'].first의 값을 가지고 와서 처리 한다. 해당 값은 템플릿에서 newProductOption에서 첫번째, 즉
				iterator.first 옵션의 type이며, COLOR, SIZE 만 테스트가 되어 있는 상태라 다른 옵션타입을 사용 할 경우 테스트를 해야 한다.
				단, 단품이 아닐때 실행한다.
			*/

			if(optionData && $optionWrap.find('[data-brz-components-type]').length > 0) optionDom[firstOptName].receiveToData(optionData[0], allSkuData);


			//first option select trigger
			$optionWrap.find('.input-radio.checked > label').each(function(i){
				$(this).trigger('click');
			});

			//입고알림 문자받기 show or hide
			if(document.getElementById("set-restock-alarm") && allSkuData){
				for(var index = 0; allSkuData.length > index; index++){
					if(0==allSkuData[index].quantity){
						//enable 입고알림문자받기
						$('#set-restock-alarm').show();
						break;
					}
				}
			}
		}


		var __self,
			$this,
			$submitBtn,
			$titleWrap,
			$salePrice,
			$retailPrice,
			$upcCode,
			$optionWrap,
			optionData = [],
			allSkuData = {},
			bundleDefaultSkuData = {},
			skuData = {},
			option = {},
			optionDom = {},
			qtyComponent = null,
			currentOptList = {},
			currentSku = [],
			currentSkuArray = [],
			productId = 0,
			submit = false,
			firstOptName = 'COLOR',
			productOptionType = 'step',
			selectOptAppendType = false,
			secondIS = false,
			objOptType,
			isFireEvent = true,
			componentType,
			endPoint;

		var setting = {
			selector:'[data-component-product-option]',
			optionWrap:'.option-wrap',
			submitBtn:'[data-cartbtn]',
			radio:'[data-component-radio]',
			select:'[data-component-select]',
			quantity:'[data-component-quantity]',
			titlewrap:'.title-wrap',
			salePrice:'.price',
			retailPrice:'.price-sale',
			upcCode:'.upc-code'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				__self = _self;

				$this = $(setting.selector);
				$optionWrap = $this.find(setting.optionWrap);
				$submitBtn = $this.find(setting.submitBtn);
				$titleWrap = $this.find(setting.titlewrap);
				$salePrice = $this.find(setting.salePrice);
				$retailPrice = $this.find(setting.retailPrice);
				$upcCode = $this.find(setting.upcCode);
				endPoint = Core.getComponents('component_endpoint');

				objOptType = arguments[0];
				firstOptName = objOptType['data-component-product-option'].first;
				productOptionType = objOptType['data-component-product-option'].productType;
				selectOptAppendType = objOptType['data-component-product-option'].selectOptAppendType;
				componentType = objOptType['data-component-product-option'].componentType || 'component_radio';

				productId = $this.attr('data-product-id') || false;
				optionData = objOptType['data-product-options'];

				var obj = {
					'productId':productId
				}

				Core.Utils.ajax(Core.Utils.contextPath + '/productSkuInventory', 'GET', obj, function(data){
				  var responseData = data.responseText;
					allSkuData = Core.Utils.strToJson(responseData).skuPricing;
					objOptType['data-sku-data'] = allSkuData;
					promiseInit(_self);

					// The Draw Size Check start
					if($('[data-thedrawend]').length === 1){
						var i = 0;
						$.each(allSkuData, function() {
							var externalId =  allSkuData[i].externalId.substring(0,2);
							var selectedOptions =  allSkuData[i].selectedOptions[0];
							if(externalId != "xx" && externalId != "XX"){
								$("select[id ='selectSize']").find("option[value=" + selectedOptions + "]").remove();
								$(".select-body>.list").find("a[href=" + selectedOptions + "]").parents('.list').remove();
							}
							i=i+1;
						});
					}
					// The Draw Size Check End
				}, false, true);

				return this;
			},
			setTrigger:function(optionName, value, valueId){
				isFireEvent = false;
				optionDom[optionName].trigger(value, valueId);
			},
			getValidateChk:function(msg){
				var arrIsValidateChk = [];
				var isValidate = false;
				for(var key in optionDom){
					isValidate = optionDom[key].getValidateChk();
					arrIsValidateChk.push(isValidate);
					if(isValidate){
						optionDom[key].getThis().prev().find('.msg').removeClass('msg-on').text('');
						optionDom[key].getThis().prev().parent().parent().find('.size-grid-type').removeClass('size_opt_check');
						optionDom[key].getThis().prev().parent().find('.btn-option').removeClass('caution-txt-color');
						optionDom[key].getThis().prev().parent().find('.product-option_radio').removeClass('option_check');
						//20180412추가 (사이즈선택 미선택 오류 메세지)
					}else{
						optionDom[key].getThis().prev().find('.msg').addClass('msg-on').text(msg);
						optionDom[key].getThis().prev().parent().parent().find('.size-grid-type').addClass('size_opt_check');
						optionDom[key].getThis().prev().parent().find('.btn-option').addClass('caution-txt-color');
						optionDom[key].getThis().prev().parent().find('.product-option_radio').addClass('option_check');
					}
				}

				return (arrIsValidateChk.indexOf(false) === -1) ? true : false;
			},
			getProductId:function(){
				return productId;
			},
			getDefaultSkuData:function(){
				// 단품일경우 (옵션이 없는경우) defaultSku 가 담겨서 넘어온다.
				// bundleDefaultSkuData 의 length 가 > 1 일때 번들 상품으로 bundleDefaultSkuData 넘김
				return (bundleDefaultSkuData.length > 0) ? bundleDefaultSkuData : allSkuData;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_product_option'] = {
		constructor:ProductOptionSelected,
		attrName:['data-component-product-option', 'data-product-options']
	}
})(Core);

(function(Core){
	var Like = function(){
		'use strict';

		var $this, $btn;
		var setting = {
			selector:'[data-component-like]',
			btn:'.like'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				$this = $(setting.selector);
				$btn = $this.find(setting.btn);

				$btn.each(function(i){
					var $this = $(this);
					var url = $this.attr('href');

					$this.off('click').on('click',function(e){
						e.preventDefault();

						var target = this;
						Core.Utils.ajax(url, 'GET', {}, function(data){
							var args = Core.Utils.strToJson(data.responseText, true);

							if(args.result){
								_self.fireEvent('likeFeedBack', target, [args]);
							}else{
								UIkit.notify(args.errorMessage, {timeout:3000,pos:'top-center',status:'warning'});
							}
						});
					});
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_like'] = {
		constructor:Like,
		attrName:'data-component-like'
	}
})(Core);

(function(Core){
	var Range = function(){
		var setting = {
			selector:'[data-component-range]',
			rangeBars:'.range-handler',
			rangeTrack:'.range-track',
			attrName:'data-component-range',
			componentName:'component_range'
		}

		var $this, $rangeBars, $track, args={}, minper=0, maxper=100, objSlider={}, eventID;


		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				$this = $(setting.selector);
				$rangeBars = $this.find(setting.rangeBars);
				$track = $this.find(setting.rangeTrack);
				args = arguments[0];

				$rangeBars.each(function(i){
					var $this = $(this);
					var slider = Core.SliderBar.call(this, (function(){
						if($this.is('.min')){
							return {
								move:function(percent){
									if(percent > maxper) percent = maxper;

									$this.css('left', percent + '%');
									$track.css({
										'left':percent + '%',
										'width':(maxper - percent) + '%'
									});

									minper = percent;
									_self.fireEvent('change', $this[0], [minper]);
								},
								end:function(){
									$this.addClass('focus').siblings().filter('.max').removeClass('focus');
									_self.fireEvent('touchEnd', $this[0], [minper]);
								}
							}
						}else if($this.is('.max')){
							return {
								move:function(percent){
									if(percent < minper) percent = minper;

									$this.css('left', percent + '%');
									$track.css({
										'width':(percent - minper) + '%'
									});

									maxper = percent;
									_self.fireEvent('change', $this[0], [maxper]);
								},
								end:function(){
									$this.addClass('focus').siblings().filter('.min').removeClass('focus');
									_self.fireEvent('touchEnd', $this[0], [maxper]);
								}
							}
						}
					})());

					objSlider[i] = slider;
				});

				return this;
			},
			getSlide:function(name){
				return objSlider[name];
			},
			getArgs:function(){
				return args;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	};

	Core.Components['component_range'] = {
		constructor:Range,
		attrName:'data-component-range',
	}
})(Core);

(function(Core){
	var SearchField = function(){
		'use strict';

		var $this, $btn, $input, $resultWrap, opt, searchTxt = '', _self, validateIS = false, isAction = true;
		var setting = {
			selector:'[data-component-searchfield]',
			resultWrap:'.result-wrap',
			btn:'.btn_search',
			input:'.input-textfield',
			attrName:'data-component-searchfield',
			resultTemplate:''
		}
		var rotationWords = new Array(), rollingTimer, rotationIndex = 0, setFirstWord, setStartRolling;

		var resultFunc = function(data){
			var json = (typeof data === Object) ? data : Core.Utils.strToJson(data.responseText || data, true);
			if(json.results.length > 0){
				addTemplate(json.results);
			}else{
				if(opt.complete !== 'auto'){
					UIkit.modal.alert('검색결과가 없습니다.', { labels: { 'Ok': '확인'}});
				}
			}

			isAction = true;
		}

		var addTemplate = function(data){
			if(setting.resultTemplate === ''){
				UIkit.notify('template is not defined', {timeout:3000,pos:'top-center',status:'warning'});
				return;
			}

			var template = Handlebars.compile($(setting.resultTemplate).html())(data);
			$resultWrap.empty().append(template);
		}

		var action = function(){
			endRollingSearchWord();

			if(searchTxt !== ''){
				_self.fireEvent('beforeSubmit', this, [searchTxt]);

				if(opt.hasOwnProperty('api')){
					Core.Utils.ajax(opt.api, 'GET', {'q':searchTxt}, resultFunc);
				}else if(opt.hasOwnProperty('submit')){
					_self.fireEvent('submit', this, [$(opt.submit), searchTxt]);
					$(opt.submit).submit();
				}else if(opt.hasOwnProperty('onEvent')){
					_self.fireEvent('searchKeyword', this, [$(opt.onEvent), searchTxt]);
					isAction = true;
				}
			}else{
				//UIkit.modal.alert(opt.errMsg);
				_self.fireEvent('searchEmpty', this, [$(opt.onEvent)]);
				$input.setErrorLabel(opt.errMsg);
			}
		}

		 /* 검색어 롤링 */
		//인기검색어 목록 얻어옴
		$('#favorite-keyword').find("li").each( function(){
			if(undefined !==$(this).data("searchword")){
				rotationWords.push($(this).data("searchword"));
			}
		});

		//인기검색어 롤링
		function rollingSearchWord(){
			if(rotationIndex == rotationWords.length){
				rotationIndex = 0;
			}
			var word = rotationWords[rotationIndex++];
			$('#search').val(word);
			searchTxt = word;
			// console.log('%d. %s', rotationIndex, word);
		}
		//5초마다 검색어 롤링 하도록 타이머를 걸어 준다.
		function startRollingSearchWordTimer(){
			// console.log('start rolling timer');
			if(rotationWords.length > 0){
				endRollingSearchWord();
				rollingTimer = setInterval(rollingSearchWord, 30000);
			}
		}
		//인기검색어 롤링 시작
		function startRollingSearchWord(){
			// console.log('start rolling word');
			//바로 표시 하는 경우, 검색어 입력 후 검색 시도시, 검색어가 사라지고 인기검색어로 검색이됨
			//2초 후에 첫 검색어가 표시되도록 한다.
			setFirstWord = setTimeout(rollingSearchWord, 2000);
			setStartRolling = setTimeout(startRollingSearchWordTimer, 5000);
		}
		//인기검색어 롤링 종료
        function endRollingSearchWord(){
			// console.log('end rolling');
			clearInterval(rollingTimer);
			rollingTimer = undefined;

			clearTimeout(setFirstWord);
			clearTimeout(setStartRolling);
		}

		//return prototype
		var Closure = function(){};
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				_self = this;
				opt = arguments[0];
				$this = $(setting.selector);
				$resultWrap = $this.find(setting.resultWrap);
				$btn = $this.find(setting.btn);

				// 필드값 판별 여부
				if (!$this.find('input').val() == '') {
					validateIS = true       
				}

				$input = Core.getComponents('component_textfield', {
					context:$this,
					selector:'.input-textfield'
				}, function () {
				
					this.addEvent('focusin', function(e){
						// console.log('focusin');
						$resultWrap.addClass('active');
						//포커스 상태에서 롤링 멈추고, 입력된 내용을 비운다.
						endRollingSearchWord();
						searchTxt = "";
						$('#search').val(searchTxt);
					});

					this.addEvent('focusout', function(e){
						// console.log('out');
						searchTxt = $(this).val();
						//검색어 롤링 재시작
						startRollingSearchWord();

						$("#jq_icon-delete_thin").removeClass('icon-delete_thin');
						//$("input.jq_search").val('');
					});

					// 검색 x 아이콘
	 				this.addEvent('keyup', function(e){
	             		if( $(this).length>0){
							validateIS = false;
	                		$("#jq_icon-delete_thin").addClass('icon-delete_thin');
	 					}
	 				});

					this.addEvent('enter', function(e){
						searchTxt = $(this).val();
						if(isAction && searchTxt !== ''){
							isAction = false;
							action();

							//EMB
							var widthMatch = matchMedia("all and (max-width: 767px)");
							if (Core.Utils.mobileChk || widthMatch.matches) {
								var mobileChk = 2;
							} else {
								var mobileChk = 1;
							}
							cre('send','Search',{search_string : searchTxt, event_number : mobileChk});
						}

					});
					if(opt.hasOwnProperty('autoComplete')){
						this.addEvent('keyup', function(e){
							// 비동기 호출 resultFunc callback 함수 넘김
							Core.Utils.ajax(opt.autoComplete, 'POST', {'q':$(this).val()}, resultFunc);
						});
					}
				});

				$btn.on('click', function(e){
					e.preventDefault();
					action();

					//EMB
					if(!searchTxt == ''){
						cre('send','Search',{search_string:searchTxt, event_number : 1});
					}
				});

				// result list click event
				$resultWrap.on('click', '.list a', function(e){
					e.preventDefault();

					validateIS = true;
					//$input.setValue($(this).text());
					_self.fireEvent('resultSelect', _self, [this]);

					/*if(!opt.hasOwnProperty('api')){
						$btn.trigger('click');
					}*/

					$resultWrap.removeClass('active');
				});

				searchTxt = $input.getValue();

				//검색어 탭 - 최근검색어 일때만 검색어 전체삭제 버튼 노출
				$('.sort-tabs').click(function(e){
					if($('#latest-keyword').attr('aria-hidden')=='true'){
						$('.search-btn-box').hide();
					} else {
						$('.search-btn-box').show();
					}
				});

				//검색어 롤링 시작
				startRollingSearchWord();
				return this;
			},
			getValidateChk:function(){
				if(opt.required === 'false' || setting.isModify === 'true'){
					return true;
				}else if(opt.required === 'true'){
					return validateIS;
				}
			},
			setErrorLabel:function(message){
				$input.setErrorLabel(message||opt.errMsg);
			},
			getInputComponent:function(){
				return $input;
			},
			getResultWrap:function(){
				return $resultWrap;
			},
			setResultAppend:function(appendContainer, template, data){
				if(appendContainer === 'this'){
					$resultWrap.append(Handlebars.compile($(template).html())(data));
				}else{
					$(appendContainer).append(Handlebars.compile($(template).html())(data));
				}

			},
			setResultPrepend:function(appendContainer, template, data){
				if(appendContainer === 'this'){
					$resultWrap.prepend(Handlebars.compile($(template).html())(data));
				}else{
					$(appendContainer).prepend(Handlebars.compile($(template).html())(data));
				}

			},
      externalAction:function(){
				action();
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_searchfield'] = {
		constructor:SearchField,
		attrName:'data-component-searchfield'
	};
})(Core);

(function(Core){
	var InputSelectBox = function(){
		'use strict';

		var $this, $select, $selectHead, $selectBody, $selectHeadTxt, $selectOption, opt, eventID, isValidate = false, currentSelectedIndex, isSelectedReset, endPoint, name;
		var selectDisabled = false;
		var setting = {
			selector:'[data-component-select]',
			select:'select',
			attrName:'data-component-select',
			template:"<a class='select-head'><span class='currentOpt'>{{currentLabel}}</span></a><ul class='select-body'>{{#each option}}<li class='list {{this.checked}} {{this.disabled}}'><a href='{{this.value}}' data-value='{{this.value}}'><span class='label'>{{this.label}}</span></a></li>{{/each}}</ul>"
		}

		var selectOpt = {
			'selectIcon':'',
			'currentLabel':'',
			'currentValue':'',
			'option':[]
		}

		var updateSelect = function($target){

			$($target).parent().addClass('checked').siblings().removeClass('checked');
			$($target).removeClass('checked');
			$selectHeadTxt.text($($target).find('.label').text());

			//$('select[name='+name+']').val($(this).attr('data-value'));
			//$('select[name='+name+']').trigger('change');

			$select.val($($target).attr('data-value'));
		}


		var rtnOption = function(key, data){
			data.forEach(function(data, i){
				if(data.inventoryType !== 'UNAVAILABLE'){
					if(data.inventoryType === 'ALWAYS_AVAILABLE' || null){
						$select.find('option').each(function(j){
							if(j === 0 || $(this).val() == data[key]){
								$(this).removeAttr('disabled');
								if($selectOption) $selectOption.eq(j).parent().removeClass('disabled');
								if(j > 0) return false;
							}
						});
					}else if(data.inventoryType === 'CHECK_QUANTITY'){
						if(data.quantity > 0 || data.quantity == null){
							$select.find('option').each(function(j){
								if(j === 0 || $(this).val() == data[key]){
									$(this).removeAttr('disabled');
									if($selectOption) $selectOption.eq(j).parent().removeClass('disabled');
									if(j > 0) return false;
								}
							});
						}
					}
				}
			});
		}

		var addSelect = function(){
			$selectHead = $this.find('.select-head');
			$selectBody = $this.find('.select-body');
			$selectHeadTxt = $selectHead.find('.currentOpt');
			$selectOption = $selectBody.find('a');

			$selectHead.on('click', function(e){
				e.preventDefault();
				if(!selectDisabled){
					if($this.hasClass('checked')){
						$this.removeClass('checked');
					}else{
						$this.addClass('checked');
					}
				}
			});

			$selectOption.on('click', function(e){
				e.preventDefault();

				//var name = $this.parent().parent().parent().find('select').attr('name');

				// && !$this.parent().hasClass('checked')
				if(!$(this).parent().hasClass('disabled') && !$(this).parent().hasClass('checked')){
					updateSelect( $(this) );
					$select.trigger('change');
					$selectHead.trigger('click');
				}
			});

			$this.on('mouseleave', function(e){
				$this.removeClass('checked');
			});
		}

		var appendOptionList = function(data){
			var template = Handlebars.compile(setting.template);
			var bindingHtml = template(data);
			$this.prepend(bindingHtml);
			addSelect();
		}



		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				$this = $(setting.selector);
				$select = $this.find(setting.select);
				endPoint = Core.getComponents('component_endpoint');
				opt = (opt) ? opt : arguments[0]||{};
				name = $select.attr('name');

				if(!Core.Utils.mobileChk){

					// 이전에 생성되어있던 dom 제거
					if( $($this).find('.select-head').length > 0){
						$($this).find('.select-head').remove();
						$($this).find('.select-body').remove();

						selectOpt = {
							'selectIcon':'',
							'currentLabel':'',
							'currentValue':'',
							'option':[]
						}
					}


					$this.addClass('pc');
					if( selectOpt.selectIcon ){
						selectOpt.selectIcon = opt.icon;
					}
					$select.find('option').each(function(i){
						var $this = $(this);
						if($(this).is(':selected')){
							selectOpt.currentLabel = this.text;
							selectOpt.currentValue = this.value;
						}

						selectOpt.option.push({
							'label':this.text,
							'value':this.value,
							'disabled':$(this).is(':disabled') ? 'disabled':'',
							'checked':$(this).filter(':selected').length > 0 ? 'checked':''
						});
					});

					appendOptionList(selectOpt);

					//selectbox 나오는 위치
					if(opt.position != null){

						switch(opt.position){
							case 'top' :
								$selectBody.css('top',-$selectBody.height());
								break;
							case 'bottom' :
								break;
						}
					}
				}

				//select init
				currentSelectedIndex = $select.find('option:selected').index();
				if(currentSelectedIndex > 0 && opt.changeType === 'step'){
					setTimeout(function(){
						$select.trigger('change');
					});
				}

				$select.off('update').on('update', function(e){
					e.preventDefault();
					if(!Core.Utils.mobileChk){
						var index = $select.find(":selected").index();
						updateSelect( $(this).closest(".select-box").find(".select-body li").eq(index).find("a") );
					}
				});

				$select.off('change').on('change', function(e){
					var that = this;
					var $selected = $(this).find('option:selected');
					var val = $selected.val();
					var index = $selected.index();

					if( val === '' || val === '선택해주세요' ){
						isValidate = false;
						return;
					}else{
						isValidate = true;
					}

					endPoint.call('changeSelect', { name : name, value : val });

					switch(opt.changeType){
						case 'normal' :
							_self.fireEvent('change', this, [val, $selected, index]);
							$(this).parsley().validate();
							break;
						case 'submit' :
							var url = "";
							if( $(this).val() === "" || $(this).val() === "default"){
								url = Core.Utils.url.removeParamFromURL( Core.Utils.url.getCurrentUrl(), $(this).attr('name') );
							}else{
								url = Core.Utils.url.updateParamFromURL( Core.Utils.url.getCurrentUrl(), $(this).attr('name'), $(this).val() );
							}

							window.location.assign( url );
							break;
						case 'step' :
							_self.fireEvent('change', that, [$(that).find('option:selected').attr('data-value'), $(that).find('option:selected').val(), $(that).attr('data-id'), $(that).find('option:selected').attr('data-friendly-name')]);
							break;

						case 'link' :
							var url = val;
							if( url != null && $.trim(url) != ''){
								window.location.assign( url );
							}
							break;
					}
				});

				return this;
			},
			receiveToData:function(option, skuData){
				isValidate = false;
				rtnOption(option.type, skuData);
			},
			reInit:function(){
				$select.val('');
				if(!Core.Utils.mobileChk){
					$selectHeadTxt.text($select.find('option').eq(0).val());
					$selectBody.scrollTop(0).find('.list').removeClass('checked').eq(0).addClass('checked');
				}
			},
			disabled:function(){
				//초기화
				$select.find('option').attr('disabled', 'disabled');
				if(currentSelectedIndex === 0 || isSelectedReset){
					$select.find('option').eq(0).prop('selected', true);
					if(!Core.Utils.mobileChk){
						$selectHeadTxt.text($select.find('option:selected').val());
						$selectBody.scrollTop(0).find('.list').addClass('disabled').removeClass('checked').eq(0).removeClass('disabled').addClass('checked');
					}
				}else{
					isSelectedReset = true;
				}
			},
			trigger:function(value, valueId){
				//console.log($this);
				//console.log(value, valueId);
				$select.val(valueId).attr('selected', 'selected');
				if($selectHead) $selectHead.find('.currentOpt').text(value);
				if($selectBody) $selectBody.children().eq($select.find('option:selected').index()).addClass('checked').siblings().removeClass('checked');
				$select.trigger('change');
			},
			destroy:function(){
				$selectHead.remove();
				$selectBody.remove();
			},
			getValidateChk:function(){
				if(opt.required === 'true'){
					if(!isValidate && opt.errMsg) UIkit.notify(opt.errMsg, {timeout:3000,pos:'top-center',status:'danger'});
					return isValidate;
				}else{
					return true;
				}
			},
			getThis:function(){
				return $this;
			},
			replaceSelectBox:function(selectbox){
				$this.find(setting.select).remove();
				$this.append(selectbox);
				this.init.call(this, opt);
			},
			rePaintingSelect:function(){
				this.init();
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_select'] = {
		constructor:InputSelectBox,
		reInit:true,
		attrName:'data-component-select'
	};
})(Core);

(function(Core){
	var Tab = function(){
		'use strict';

		var $this, $tabs, args;
		var setting = {
			selector:'[data-component-tabs]',
			tab:'a',
			attrName:'data-component-tabs',
			activeClass:'active'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();

				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0] || {};

				$this = $(setting.selector);
				$tabs = $this.find(setting.tab);

				$tabs.click(function(e){
					e.preventDefault();

					if(!$(this).hasClass(setting.activeClass)){
						$(this).addClass(setting.activeClass).siblings().removeClass(setting.activeClass);
						_self.fireEvent('tabClick', this, [$(this).index()]);
					}else if($(this).hasClass(setting.activeClass) && args.unlock === 'true'){
						$(this).removeClass(setting.activeClass);
						_self.fireEvent('tabClick', this, [$(this).index()]);
					}
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_tabs'] = {
		constructor:Tab,
		reInit:true,
		attrName:'data-component-tabs'
	}
})(Core);

(function(Core){
	var ThumbNail = function(){
		var setting = {
			selector:'[data-component-thumbnail]',
			container:'.thumb-wrap',
			scrollWrap:'.scroll-Wrap',
			list:'.thumb-list',
			thumbTemplate:'{{#each this}}<li class="thumb-list"><a href="{{thumbUrl}}?browse"><img src="{{thumbUrl}}?thumbnail"></a></li>{{/each}}'
		}

		var $this, $container, $list, currentIndex=0, arrThumbList=[], iScroll, args;
		var Closure = function(){}
		Closure.prototype.setting = function(){
			var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
		}
		Closure.prototype.init = function(){
			var _self = this;

			$this = $(setting.selector);
			$container = $this.find(setting.container);
			$list = $this.find(setting.list);
			args = arguments[0];

			var arrList = [];

			$container.find(setting.list).each(function(i){
				var data = Core.Utils.strToJson($(this).attr('data-thumb'), true);
				var imgUrl = $(this).find('img').attr('src').replace(/\?[a-z]+/g, '');
				var pushIS = true;

				data.thumbUrl = imgUrl;

				/* 중복 이미지 처리 */
				for(var i=0; i < arrList.length; i++){
					if(arrList[i].thumbSort === data.thumbSort && arrList[i].thumbUrl === data.thumbUrl){
						pushIS = false;
						console.log('same image');
						return;
					}
				}

				if(pushIS){
					arrList.push(data);
					arrThumbList.push(data);
				}
			});

			$container.on('click', 'li', function(e){
				e.preventDefault();

				$(this).addClass('active').siblings().removeClass('active');
				_self.fireEvent('changeIndex', this, [$(this).index()]);
			});

			this.setThumb(args.sort);

			return this;
		}
		Closure.prototype.getContainer = function(){
			return $this;
		}
		Closure.prototype.setTriggerThumb = function(index){
			var curIndex = index, totalNum = $container.find('li').length;

			if(curIndex < 0){
				curIndex = totalNum - 1;
			}else if(curIndex > totalNum - 1){
				curIndex = 0;
			}

			$container.find('li').eq(curIndex).trigger('click');
		}
		Closure.prototype.setThumb = function(sort){
			var _self = this;
			var appendTxt = '';
			var thumbWidth = (args.thumbType === 'bottom') ? $this.find('.thumb-list').eq(0).outerWidth() : $this.find('.thumb-list').eq(0).outerHeight();
			var count = 0;
			var sortType = sort || args.sort;
			var arrThumbData = arrThumbList.filter(function(item, index, array){
				if(item.thumbSort === sortType || item.thumbSort === 'null'){
					console.log(item);
					return item;
				}
			});

			var thumbTemplate = Handlebars.compile(setting.thumbTemplate)(arrThumbData);
			//var mobileTemplate = Handlebars.compile($("#product-gallery-template-mobile").html())(arrThumbData)
			var totalWidth = count * (thumbWidth + parseInt(args.between));
			if(args.thumbType === 'bottom') $container.empty().append(appendTxt).css({'width':totalWidth}).addClass('show');
			else if(args.thumbType === 'left'){
				if(!Core.Utils.mobileChk){
					$container.css({'height':totalWidth}).addClass('show');
				}
				$container.empty().append(thumbTemplate);
			}

			$container.find('.thumb-list').eq(0).addClass('active');
			$this.parent().append(mobileTemplate);

			_self.fireEvent('setThumbComplete', this);
			$container.find('a').eq(0).trigger('click');

			if(!Core.Utils.mobileChk){
				iScroll = new IScroll($this[0], {
					scrollX:(args.thumbType === 'bottom') ? true : false,
					scrollY:(args.thumbType === 'bottom') ? false : true
				});
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_thumbnail'] = {
		constructor:ThumbNail,
		attrName:'data-component-thumbnail'
	};
})(Core);

(function(Core){
	var ISwiper = function(){
		'use strict';

		var $this, args, $slider, opt, $list, defaultWidth, widthMatch;
		var setting = {
			selector:'[data-component-slider]',
			list:'.slider-wrapper, ul',
			prev:'<i class="icon-arrow_left"></i>',
			next:'<i class="icon-arrow_right"></i>'
		}

		var slideWidth = function(sWidth){
			return sWidth / (args.maxSlides || 1) - (args.slideMargin || 0);
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				$this = $(setting.selector);
				$list = $this.find(setting.list);

				args = arguments[0];

				//var maxSlides = (Core.Utils.mobileChk === null) ? args.maxSlides||1 : args.minSlides||1;
				//console.log(_GLOBAL.LAYOUT.MAX_WIDTH / (args.maxSlides || 1) - (args.slideMargin||0));

				defaultWidth = (args.slideWidth === 'full' ? slideWidth($('body').width()) : args.slideWidth) || slideWidth(_GLOBAL.LAYOUT.MAX_WIDTH);
				opt = {
					//slideWidth:args.slideWidth || $this.width() / maxSlides,
					slideWidth:defaultWidth,
					minSlides:args.minSlides || 1,
					maxSlides:args.maxSlides || 1,
					moveSlides:args.moveSlide||args.maxSlide,
					slideMargin:parseInt(args.slideMargin)||0,
					auto:(args.auto != undefined) ? args.auto : false,
					autoHover: true,
					pager:(args.pager != undefined) ? args.pager : true,
					pagerCustom: (args.pagerCustom != undefined) ? args.pagerCustom : false,
					controls:(args.controls != undefined) ? args.controls : false,
					responsive:(args.responsive != undefined) ? args.responsive : true,
					infiniteLoop:(args.infiniteLoop != undefined) ? args.infiniteLoop  :  false,
					mobileViewType:(args.mobileViewType != undefined) ? args.mobileViewType : 'slider',
					mode:args.mode || 'horizontal',
					preloadImages:'all',
					hideControlOnEnd: args.hideControlOnEnd || false,
					prevText: setting.prev,
					nextText: setting.next,
					startSlide:(args.startSlide != undefined) ? args.startSlide : 0,

					onSliderLoad:function($slideElement, currnetIndex){
						setTimeout(function(){
							_self.fireEvent('onInit', $slider, [$slideElement, currnetIndex]);
						});
					},
					onSlideAfter: function($slideElement, oldIndex, newIndex){
						_self.fireEvent('slideAfter', $slider, [$slideElement, oldIndex, newIndex]);

                        /*setTimeout(function(e) {
                            $(window).trigger("scroll");
                        }, 10);*/
                    },
					onSlideBefore: function($slideElement, oldIndex, newIndex){
						_self.fireEvent('slideBefore', $slider, [$slideElement, oldIndex, newIndex]);

                        /*setTimeout(function(e) {
                            $(window).trigger("scroll");
                        }, 10);*/
                    }

				}

				$this.show();

				if( opt.minSlides == 1 || opt.mobileViewType == 'list' ){
					widthMatch = matchMedia("all and (max-width: 767px)");
					var widthHandler = function(matchList) {
					    if (matchList.matches) {
					    	opt.slideWidth = "767px";
					    	if( opt.mobileViewType == 'list' ){
								if( $slider ){
								    $($slider.closest(".swipe-container").context).addClass("destroy");
						    	    $slider.destroySlider();
						    	}else{
						    	    $($list.closest(".swipe-container").context).addClass("destroy");
						    	}
					    	}else{
					    		if( $slider ){
						    	    $slider.reloadSlider( opt );
						    	}else{
						    	    $slider = $list.bxSlider(opt);
						    	}
					    	}
					    } else {
							opt.slideWidth = defaultWidth;
					    	if( $slider ){
					    	   $($slider.closest(".swipe-container").context).removeClass("destroy");
					    	    $slider.reloadSlider( opt );
					    	}else{
					    	    $($list.closest(".swipe-container").context).removeClass("destroy");
					    	    $slider = $list.bxSlider(opt);
					    	}
					    }
					};
					widthMatch.addListener(widthHandler);
					widthHandler(widthMatch);
				}else{
					$slider = $list.bxSlider(opt);
				}

				$this.find('.bxslider-controls .btn-next').on('click', function(e) {
					e.preventDefault();
					$slider.goToNextSlide();
				});
				$this.find('.bxslider-controls .btn-prev').on('click', function(e) {
					e.preventDefault();
					$slider.goToPrevSlide();
				});

				return this;
			},
			reloadSlider:function(index){
				opt.startSlide = (index) ? index : 0;
				$slider.reloadSlider( opt );
				return this;
			},
			redrawSlider:function(){
				$slider.redrawSlider();
				return this;
			},
			goToSlide:function(index){
				$slider.goToSlide(index);
				return this;
			},
			goToNextSlide:function(){
				$slider.goToNextSlide();
				return this;
			},
			goToPrevSlide:function(){
				$slider.goToPrevSlide();
				return this;
			},
			destroySlider:function(){
				$slider.destroySlider();
				return this;
			},
			getCurrentSlide:function(){
				return $slider.retCurrentSlide();
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_slider'] = {
		constructor:ISwiper,
		attrName:'data-component-slider',
		reInit:true
	}
})(Core);

(function(Core){
	var WishListBtn = function(){
		'use strict';

		var $this, args, endPoint;
		var setting = {
			selector:'[data-component-wishlistbtn]',
			activeClass:'active'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0];
				$this = $(setting.selector);
				endPoint = Core.getComponents('component_endpoint');

				/* wishlist */
				$this.click(function(e){
					e.preventDefault();

					var _self = $(this);
					var query = {
						productId:args.productId
					}

					Core.getModule('module_header').reDirect().setModalHide(true).setLogin(function(data){
						Core.Utils.ajax(args.api, 'GET', query, function(data){
							var jsonData = Core.Utils.strToJson(data.responseText, true) || {};
							if(jsonData.hasOwnProperty('error')){
								UIkit.notify(jsonData.error, {timeout:3000,pos:'top-center',status:'warning'});
							}else{
								if(jsonData.isWishListChk){
									_self.find('i').addClass('icon-wishlist_full');
+									_self.find('i').removeClass('icon-wishlist');
									UIkit.notify(args.addMsg, {timeout:3000,pos:'top-center',status:'success'});
									endPoint.call('addToWishlist', query);
								}else{
									_self.find('i').addClass('icon-wishlist');
+									_self.find('i').removeClass('icon-wishlist_full');
									endPoint.call('removeToWishlist', query);
									UIkit.notify(args.removeMsg, {timeout:3000,pos:'top-center',status:'warning'});
								}
								/*
								if( _.isFunction( marketingAddWishList )){
									marketingAddWishList();
								}
								*/
							}
						});
					});
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_wishlistbtn'] = {
		constructor:WishListBtn,
		reInit:true,
		attrName:'data-component-wishlistbtn'
	}
})(Core);

(function(Core){

	var InputTxtField = function(){
		'use strict';

		var $this, $input, $label, $errorField, $deleteBtn, isValidate = false, args, pattern;
		var objPattern = {
			name:'[^a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]',
			pw:'[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]',
			email:'^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
			phone:'^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$',
			number:'^[0-9]*$' /* ^[0-9] */
		}

		var setting = {
			selector:'[data-component-textfield]',
			input:'input',
			label:'label',
			errorField:'.error-message',
			attrName:'data-component-textfield',
			deleteBtn:'.delete'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				$this = $(setting.selector);
				$input = $this.find(setting.input);
				$label = $this.find(setting.label);
				$errorField = $this.find(setting.errorField);
				$deleteBtn = $this.find(setting.deleteBtn);
				args = arguments[0]||{};
				pattern = (args.type) ? new RegExp(objPattern[args.type], 'g') : false;

				if(args.disabled){
					$input.attr('disabled', 'disabled');
				}

				$input.on({
					'focusin':function(e){
						$this.addClass('focus');
						_self.fireEvent('focusin', this);
					},
					'focusout':function(e){
						var val = $input.val();
						$this.removeClass('focus');
						//$errorField.text('');

						if(val !== ''){
							isValidate = true;
							$this.addClass('value');
						}else{
							isValidate = false;
							$this.removeClass('value');
						}

						if(pattern){
							if(pattern.test(val)){
								$errorField.text('');
							}else if(!pattern.test(val)){
								$errorField.text(args.errMsg||'잘못된 형식 입니다.');
								isValidate = false;
							}
						}

						_self.fireEvent('focusout', this);
					},
					'keyup':function(e){
						if(e.keyCode === 13){
							_self.fireEvent('enter', this);
						}else{
							_self.fireEvent('keyup', this);
						}
					},
					'keydown':function(e){
						$this.addClass('value');
						if(e.keyCode === 13 && e.srcElement.type != 'textarea'){
							return false;
						}
					}
				});

				$input.bind("paste", function(e){
					var _self = this;
					setTimeout(function(){
						var val = $(_self).val();

						if(val !== ''){
							isValidate = true;
							$this.addClass('value');
						}else{
							isValidate = false;
							$this.removeClass('value');
						}
					});
				});


				$label.on('click', function(e){
					e.preventDefault();
					$input.focus();
				});

				$deleteBtn.on('click', function(e){
					e.preventDefault();
					$input.val('');
					$this.removeClass('value');
					isValidate = false;
				});

				this.setValueLabel();

				return this;
			},
			getValue:function(){
				return $input.val();
			},
			focus:function(){
				$input.focus();
			},
			getThis:function(){
				return $input;
			},
			setValue:function(val){
				if(val !== ''){
					isValidate = true;
					$input.val(val);
					$this.addClass('value');
				}else{
					isValidate = false;
					$input.val(val);
					$this.removeClass('value');
				}
			},
			getValidateChk:function(errorMsgType){
				if(args.required){
					if(!isValidate){
						if(errorMsgType === 'errorLabel') this.setError(args.validateMsg);
						else UIkit.notify(args.validateMsg, {timeout:3000,pos:'top-center',status:'danger'});
					}else{
						if(errorMsgType === 'errorLabel') this.setError('');
					}
					return isValidate;
				}else{
					return true;
				}
			},
			setError:function(message){
				$errorField.text((message || message == '') ? message : args.errMsg);
			},
			setErrorLabel:function(message){
				$label.text(message||args.errMsg).addClass('err');
			},
			setValueLabel:function(){
				// 초기 값이 있으면 label 숨김
				if($input.val() !== ''){
					$this.addClass('value');
					isValidate = true;
				}
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_textfield'] = {
		constructor:InputTxtField,
		reInit:true,
		attrName:'data-component-textfield',
	}
})(Core);

(function(Core){
        var SizeGuide = function(){
            'use strict';
    
            var $this, modal, args, endPoint;
            var setting = {
                selector:'[data-component-sizeguide]'
            }
            
            var Closure = function(){}

            Closure.prototype = {
                setting:function(){
                    var opt = Array.prototype.slice.call(arguments).pop();
                    $.extend(setting, opt);
                    return this;
                },
                init:function(){
                    var _self = this;

                    args = arguments[0];
                    $this = $(setting.selector);
    
                    // alert($this.html());
    
                    
                    /*sizeChart*/
                    var $sizeCategory = $('#view_size_guide').find('.size_category');
                    // var $sizeMenu = $sizeCategory.find('.size_menu');
                    // var $sizeSubMenu = $sizeMenu.find('.size_sub_menu');
                    var $sizeCategoryItem = $sizeCategory.find('>li');
                    // var $sizeMenuItem = $sizeMenu.find('>li');
                    // var $sizeSubMenuItem = $sizeSubMenu.find('>li');
    
                    /* Change css class when select Top menu (Men/Women/Kids/Goods)*/
                    //  $sizeCategoryItem.find('>a').on('click', function(){
                    //     $sizeCategoryItem.removeClass('on');
                    //     $(this).parent().addClass('on');
                    //     $sizeMenu.hide();
                    //     $(this).parent().find($sizeMenu).show();
                    //     $sizeMenuItem.removeClass('on');
                    //     $sizeSubMenuItem.removeClass('on');
                    //     $(this).parent().find($sizeMenuItem).eq(0).addClass('on');
                    //     $sizeSubMenu.hide();
                    //     $(this).parent().find($sizeSubMenu).eq(0).show();
            
                    //     if($(this).parent().find('ul').hasClass('size_sub_menu')){
                    //         $sizeCategory.height($(this).parent().find($sizeMenu).outerHeight(true) + $(this).parent().find($sizeSubMenu).outerHeight(true));
                    //     } else{
                    //         $sizeCategory.height($(this).parent().find($sizeMenu).outerHeight(true));
                    //     }
                    //     return false;
                    // });
    
                    /* Change css class when select each sub menu */
                    // $sizeSubMenuItem.find('>a').on('click', function(){
                    //     $sizeSubMenuItem.removeClass('on');
                    //     $(this).parent().addClass('on');
                    // });
    
                    /* toggle size guide, measurement guide */
                    $('.size_category').on('click', 'li', function(){


                        $('.size_category li.on').removeClass('on');
                        $(this).addClass('on');
                        var index = $(this).index();
//    console.log('li click, index:', index);
                        if(index == 0){
                            $('#measurement_guide').hide();
                            $('#size_table').show();
                        } else {
                            $('#measurement_guide').show();
                            $('#size_table').hide();
                        }
                    });
                    
                    /*table*/
                    var $sizeTable = $('#view_size_guide').find('.pop_size_table');
                    var $sizeTd = $sizeTable.find('tbody td');
                    var $sizeTheadTh = $sizeTable.find('thead th');
                    var $sizeTdFirst = $sizeTable.find('tbody td').eq(0);
    
                    $sizeTd.on({
                        mouseenter : function(){
                            var $tdIdx = $(this).index();
                            $sizeTheadTh.eq($tdIdx).addClass('highlight');
                            
                            $(this).parent().prevAll().each(function(){
                                $(this).find('td').eq($tdIdx-1).addClass('highlight2');
                            });
            
                            $(this).prevAll('td').addClass('highlight2');
                            $(this).parent().find('th').addClass('highlight');
                            $(this).addClass('highlight');
                        },mouseleave : function(){
                            var $tdIdx = $(this).index();
                            $sizeTheadTh.eq($tdIdx).removeClass('highlight');		
            
                            $(this).parent().prevAll().each(function(){
                                $(this).find('td').eq($tdIdx-1).removeClass('highlight2');
                            });
            
                            $(this).prevAll('td').removeClass('highlight2');
                            $(this).parent().find('th').removeClass('highlight');
                            $(this).removeClass('highlight');
                        }
                    });
      
                    /*tab*/
                    var $sizeTab = $('#view_size_guide').find('.tabbtn');
                    var $tabcon = $('#view_size_guide').find('.tabcon');
    
                    $sizeTab.find('a').bind('click', function(e){
                        var tar = $(this).attr('href');
                        $sizeTab.find('a').removeClass('active');
                        $(this).addClass('active');
                        $tabcon.hide();
                        $('#view_size_guide').find(tar).show();
                        
                        if (tar == '#chart1'){
                            $sizeTab.find('.tabbar').stop().animate({'left':'0'},400);
                        } else {
                            $sizeTab.find('.tabbar').stop().animate({'left':'73px'},400);
                        }
                        return false;
                    });
    
                    /*bra table*/
                    $(function(){
                        $(".one_row td").mouseover(function(){
                            $(".us-size").removeClass("highlight");
                            $(".one_row").find(".us-size").addClass("highlight");
                            $(".indi").removeClass("highlight2");
                            $(".one_row .indi").addClass("highlight2");
                            
                            if ( $(this).hasClass("indi") ){
                                $(".col-1, .col-2").removeClass("highlight2");
                                $(".one_row").find(".col-1, .col-2").addClass("highlight2");
                            }
                        });
    
                        $(".two_row td").mouseover(function(){
                            $(".us-size").removeClass("highlight");
                            $(".two_row").find(".us-size").addClass("highlight");
                            $(".indi").removeClass("highlight2");
                            $(".two_row .indi").addClass("highlight2");
                            
                            if ( $(this).hasClass("indi") ){
                                $(".col-1, .col-2").removeClass("highlight2");
                                $(".two_row").find(".col-1, .col-2").addClass("highlight2");
                            }
                        });
                        
                        $(".three_row td").mouseover(function(){
                            $(".us-size").removeClass("highlight");
                            $(".three_row").find(".us-size").addClass("highlight");
                            $(".indi").removeClass("highlight2");
                            $(".three_row .indi").addClass("highlight2");
                            
                            if ( $(this).hasClass("indi") ){
                                $(".col-1, .col-2").removeClass("highlight2");
                                $(".three_row").find(".col-1, .col-2").addClass("highlight2");
                            }
                        });
                        
                        $(".four_row td").mouseover(function(){
                            $(".us-size").removeClass("highlight");
                            $(".four_row").find(".us-size").addClass("highlight");
                            $(".indi").removeClass("highlight2");
                            $(".four_row .indi").addClass("highlight2");
                            
                            if ( $(this).hasClass("indi") ){
                                $(".col-1, .col-2").removeClass("highlight2");
                                $(".four_row").find(".col-1, .col-2").addClass("highlight2");
                            }
                        });
                        
                        $(".five_row td").mouseover(function(){
                            $(".us-size").removeClass("highlight");
                            $(".five_row").find(".us-size").addClass("highlight");
                            $(".indi").removeClass("highlight2");
                            $(".five_row .indi").addClass("highlight2");
                            
                            if ( $(this).hasClass("indi") ){
                                $(".col-1, .col-2").removeClass("highlight2");
                                $(".five_row").find(".col-1, .col-2").addClass("highlight2");
                            }
                        });
                        
                        $(".indi").mouseover(function(){
                            $(".indi_thead").addClass("highlight");
                            $(".col-1, .col-2").removeClass("highlight2");
                            $(this).addClass("highlight3");
                            
                            $(this).mouseleave(function(){
                                $(".indi_thead").removeClass("highlight");
                                $(".col-1, .col-2").removeClass("highlight2");
                                $(this).removeClass("highlight3");
                            });
                        });
                        
                        $(".col-1").mouseenter(function(){
                            $(".one_col").addClass("highlight");
                            $(this).removeClass("highlight2");
                            
                            $(this).mouseleave(function(){
                                $(".one_col").removeClass("highlight");
                                $(".us-size").removeClass("highlight");
                            });
                        });
                        
                        $(".col-2").mouseenter(function(){
                            $(".two_col, .col_head").addClass("highlight");
                            $(".indi_thead").addClass("normal");
                            $(this).removeClass("highlight2");
                            
                            $(this).mouseleave(function(){
                                $(".two_col, .col_head").removeClass("highlight");
                                $(".indi_thead").removeClass("normal");
                                $(".us-size").removeClass("highlight");
                            });
                        });
                    });
    
                    return this;
                } /* end of init:function(){*/
            } /* end of Closure.prototype = { */
    
            Core.Observer.applyObserver(Closure);
            return new Closure();
    
    
        // $(function(){
          
        // 	viewSlide(slideCode);
        // });
    
        // function viewSlide(chgCode) {
        //     $("#view_size_guide").html($("#" + chgCode).html());
        //     initEventListener(chgCode);
        //     }
        //     function initEventListener(chgCode) {
    
    
        //     }
        }
    
        Core.Components['component_sizeguide'] = {
            constructor:SizeGuide,
            reInit:true,
            attrName:'data-component-sizeguide'
        }
        
    })(Core);
(function(Core){

	var InputTxtArea = function(){
		'use strict';

		var $this, $input, $label, validateIS = false, opt;
		var setting = {
			selector:'[data-component-textarea]',
			input:'textarea',
			label:'label',
			attrName:'data-component-textarea'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				$this = $(setting.selector);
				$input = $this.find(setting.input);
				$label = $this.find(setting.label);

				opt = arguments[0]||{};

				if(opt.disabled){
					$input.attr('disabled', 'disabled');
				}

				// 초기 값이 있으면 label 숨김
				if($input.val() !== ''){
					$this.addClass('value');
					validateIS = true;
				}

				$input.on({
					'focusin':function(e){
						$this.addClass('focus');
						_self.fireEvent('focusin', this);
					},
					'focusout':function(e){
						var val = $input.val();
						$this.removeClass('focus');

						if(val !== ''){
							validateIS = true;
							$this.addClass('value');
						}else{
							validateIS = false;
							$this.removeClass('value');
						}

						_self.fireEvent('focusout', this);
					},
					'keydown':function(e){
						$this.addClass('value');
					}
				});

				return this;
			},
			getValue:function(){
				return $input.val();
			},
			setValue:function(val){
				$input.val(val);
			},
			getThis:function(){
				return $input;
			},
			getValidateChk:function(){
				if(opt.required){
					this.setErrorLabel();
					return validateIS;
				}else{
					return true;
				}
			},
			setErrorLabel:function(message){
				$label.text(message||opt.errMsg).addClass('err');
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_textarea'] = {
		constructor:InputTxtArea,
		reInit:true,
		attrName:'data-component-textarea'
	}
})(Core);

(function(Core){
	
	var autoSearchStorage = ['스타디움','FC 바르셀로나 스타디움','첼시 FC 스타디움','파리 생제르망 스타디움','FFF 스타디움','KOR 스타디움','USA 스타디움','대한민국 스타디움','브라질 스타디움','잉글랜드 스타디움','크로아티아 스타디움','포르투갈 스타디움','프랑스 스타디움','알파 드라이','테크 퀼티드 크루','우산','ACG AW84','ACG CLTR ','ACG 도그','ACG 러클','ACG 로고','ACG 우븐','AF1 러버','AF1 레벨','AF1 세이지','AF1 익스플로러','AF1 제스터','AJ FLEECE FZ HOODY','AOP 숏슬리브','AS M NSW','AV15 KFZ','AV15 풀리스','AV15 풀집','AV15 플리스','AW84 코어','Apple Watch','BEHIND THE DESIGN','CLUB FLEECE','CR7 백팩','CR7 샤이엔 백팩','CR7 스트라이크 볼','CR7 크루 삭스','CRP 3/4 팬츠 RD','F.C. 쇼츠','F.C. 크레스트 티','F.C. 티','FB 트레이닝 슈 백 3.0','FC 바르셀로나 스킬 미니볼','FC 바르셀로나 피치 볼','FFF H86 코어 캡','FFF 앤썸 재킷','FFF 어센틱 그랜드 슬램 숏슬리브 폴로','FFF 프라이드 티','FFF 프레스티지 볼','FreeRunArtistSeries','H86 코리아 캡','H86 코리아 캡','J 가드 보호대','JDB 23 프로 드라이 피티드 숏슬리브 탑','JDB AJ 3 탭 티 쇼츠 세트','JDB AJ23 뉴 레거시 배스킷볼 세트','JDB AJ23 베이스볼 머슬 세트','JDB AJ23 플라이트 머슬 세트','JDB 라이즈 그래픽 쇼츠','JDB 라이즈 배스킷볼 VERIAGE 티','JDB 라이즈 쇼츠 세트','JDB 바셀린 솔리드 타이츠','JDB 브랜드 리드 3 티','JDB 시멘트 프린트 롱슬리브 탑','JDB 에어 조던','JDB 윙스 플리스','JDB 코프 에어 조던 23','JDB 픽셀 팩 게임 체인저 티','JUST DO IT 스우시 티','L91 코어 캡','LA 레이커스','LA 레이커스 드라이','LA 레이커스 모던','LA 레이커스 스윙맨','LA 레이커스 써마','LA 레이커스 에어로빌 ','LD 러너','M JSW TEE','NBA','NBA 리스트밴드','NBA 스윙맨 저지','NBA 아이콘 에디션','NBA 어센틱 저지','NBA 엘리트 퀵','NBA 헤드밴드','NIKE','NIKE AIR','NIKE AIR MAX','NIKE AIR VERSITILE','NIKE LUNAR APPARENT','NIKE RUNALLDAY','NIKE SB PORTMORE','NIKE TANJUN','Nike On Air','NikeLab','NikeLab ACG','NikeLab ACG 고어-텍스','NikeLab ACG 디플로이','NikeLab ACG 레그 슬리브','NikeLab ACG 베리어블','NikeLab ACG 쇼츠','NikeLab ACG 팬츠','NikeLab ACG 후디','NikeLab NRG','NikeLab X','NikeLab X RT 디스트로이어','NikeLab x KJ','NikeLab x KJ 니트','NikeLab x KJ 믹스','NikeLab x RT PO','NikeLab x RT 쇼츠','NikeLab x RT 저지','NikeLab x RT 카 코트','NikeLab x RT 티','NikeLab 갸쿠소우','NikeLab 갸쿠소우 드라이','NikeLab 갸쿠소우 쇼츠','NikeLab 갸쿠소우 숏슬리브','NikeLab 갸쿠소우 우븐 쇼츠','NikeLab 갸쿠소우 유틸리티','NikeLab 갸쿠소우 재킷','NikeLab 갸쿠소우 타이츠','NikeLab 갸쿠소우 패커블','NikeLab 갸쿠소우 후디','NikeLab 롱슬리브','NikeLab 밀리터리','NikeLab 백팩','NikeLab 봄버 재킷','NikeLab 브라','NikeLab 씨 고스트 재킷','NikeLab 에센셜 디스트로이어','NikeLab 카고 팬츠','NikeLab 컬렉션','NikeLab 타이츠','NikeLab 티','NikeLab 팬츠','NikeLab 퍼포레이트 팬츠','NikeLab 퍼포먼스 스커트','NikeLab 폴리필 크루 탑','NikeLab 프리 런 모션 플라이니트 2017','NikeLab 플리스 팬츠','Nikelab ACG 고어-텍스® 디플로이 후디 재킷','PG 1','PG 2','Powerbeats3 Wireless','SB X QS 숏슬리브 탑','SB x 미디컴 H86 캡','SB x 미디컴 H86 캡','SB x 미디컴 덩크 하이 엘리트 QS','SB 노 쇼우 삭스','SB 덩크 로우 QS','SB 덩크 로우 엘리트','SB 덩크 로우 프로','SB 덩크 미드 프로 QS','SB 델타 포스 벌크','SB 드라이','SB 로고 티','SB 로고 티셔츠','SB 롱슬리브 탑','SB 모뉴먼트 티','SB 백팩','SB 블레이저 로우','SB 솔라소프트 포트모어','SB 쉴드 코치 재킷','SB 아노락','SB 아이콘','SB 에버렛','SB 에어 포스','SB 에어맥스','SB 줌 덩크','SB 줌 덩크 로우','SB 줌 덩크 하이 프로','SB 줌 블레이저','SB 줌 스테판 야노스키','SB 줌 야노스키','SB 체크 솔라 캔버스','SB 체크 솔라소프트 캔버스','SB 크루 삭스','SB 티','SB 팀 클래식','SB 포트모어 II 솔라소프트 슬립온','SB 프로 캡','SB 플렉스','SF AF 1 미드 스웨이드','SF 에어 포스','THE 1 REIMAGINED ICONS EVOLVED','하이퍼차지','게임 골 글로리 드라이','골든 스테이트 워리어즈','골든 스테이트 워리어즈 드라이','골든 스테이트 워리어즈 모던 NBA 크루','골든 스테이트 워리어즈 모던 NBA 팬츠','골든 스테이트 워리어즈 모던 쇼츠','골든 스테이트 워리어즈 스윙맨','골든 스테이트 워리어즈 스테이트먼트','골든 스테이트 워리어즈 써마','골든 스테이트 워리어즈 아이콘','골든 스테이트 워리어즈 어센틱','골든 스테이트 워리어즈 에어로빌','골프','그랜드 스탠드','그립','그립 그라디언트','그립 두들 하트','그립 레거시 플레시','그립 멀티 퓨추라','그립 스포츠 에센트','그립 드레스','그립 윈드러너','그립 짐 빈티니','그립 퀵','그립 템포','그립 플레시','그립 헤브','그립 헤브어 데이','나이지리아 트리뷰트 팬츠','네이마르 백팩','네이마르 스트라이크 볼','뉴 스우시 헤리티지 캡','뉴욕 닉스','뉴욕 닉스 NBA','뉴욕 닉스 드라이','뉴욕 닉스 모던','뉴욕 닉스 스윙맨','뉴욕 닉스 아이콘 에디션','뉴욕 닉스 에어로빌','뉴욕 닉스 워리어스','다운시프터','다이나모 프리','대한민국 REV 우븐','대한민국 SF1 레인 재킷','대한민국 드라이 스쿼드','대한민국 쉘 탑','대한민국 쉴드 스쿼드','대한민국 스트라이크','덩크 로우 플라이니트','듀얼 레이서','듀얼 퓨전 TR III 남성 트레이닝화','듀얼톤 레이서','드라이','드라이 FLABJACKS','드라이 JDQ','드라이 KA LONDON','드라이 KD 믹스테이프','드라이 KI','드라이 LBJ 블락','드라이 NOVO','드라이 PG13','드라이 SU18','드라이 골드 베너','드라이 뉴스페이퍼','드라이 니트 하이퍼라이트','드라이 더 조거 짐','드라이 드리블 쇼츠','드라이 럭스 플로우','드라이 런 슬리브리스','드라이 레거시 슬리브리스','드라이 레전드 롱슬리브','드라이 레전드 패스트','드라이 마일러 롱슬리브','드라이 마일러 탱크','드라이 메달리스트 롱슬리브','드라이 메달리스트 숏슬리브','드라이 메달리스트 탱크','드라이 베니어 쇼츠','드라이 블레이드','드라이 빅토리','드라이 쇼츠','드라이 쇼타임 카이리 풀집 후디','드라이 숏슬리브','드라이 스우시','드라이 스쿼드','드라이 스쿼드 재킷','드라이 스쿼드 팬츠','드라이 스트라이프','드라이 슬리브리스','드라이 슬림 다이나믹','드라이 슬림 솔리드','드라이 심리스','드라이 아웃','드라이 아카데미','드라이 어택','드라이 에센셜','드라이 엘레멘트','드라이 엘레스티카','드라이 엘리트','드라이 우븐','드라이 재킷','드라이 첼린저','드라이 콜드','드라이 쿠션','드라이 쿠쉬','드라이 쿨','드라이 쿨링','드라이 크롭','드라이 크루','드라이 크루넥','드라이 탑','드라이 탱크','드라이 테크','드라이 템포','드라이 트레인','드라이 티','드라이 팬츠','드라이 페놈','드라이 폴로','드라이 풀오버','드라이 풀집','드라이 프론트','드라이 플리스','드라이 핏','드라이 핏 드레스','드라이 핏 라이즈','드라이 핏 마일러','드라이 핏 메달리스트','드라이 핏 모멘텀','드라이 핏 빅토리','드라이 핏 쇼츠','드라이 핏 숏슬리브','드라이 핏 스쿼드','드라이 핏 아카데미','드라이 핏 엘레멘탈','드라이 핏 엘리트','드라이 핏 재킷','드라이 핏 탱크','드라이 핏 템포','드라이 핏 티','드라이 핏 팬츠','드라이 하프집','드라이 후디','드라이 히트','디스턴스','디스턴스 투인원','디스턴스 플렉스','디스트로이어 트레이닝','디파쳐 더플백','디파쳐 백팩','라디에이트 클럽백','라디에이트 토트백','라이벌 브라','라이즈 그래픽 쇼츠','라이트 보호대','라이트웨이트 라이벌','라이트웨이트 삭스','라이트웨이트 슬리브','라지 카파시티 웨이스트백','라켓','런','런 JDI 숏슬리브 탑','런 더플 백','런 라이트웨이트 백팩','런 스위프트','런 커뮤터 백팩','런올데이','레거시','레거시 햇','레거시 드라이 핏 블랙 숏슬리브 탑','레볼루션','레이서 쿨','레전더리 트레이닝','레전드','레전드 아카데미','레전드 백팩','레터럴 리지스턴스','레트로 백팩','로고 헤드밴드','로덴','로쉬 G','로쉬 G 프리미엄','롱-렝스 헤비 리지스턴스','루나','루나 어패런트','루나 커맨드','루나 컨버지','루나 컨트롤','루나 포스','루나 프라임','루나글라이드','루나솔로','루나에픽 로우 플라이니트','루나차지 에센셜','루나커맨드 2 보아','루나컨버지','루나컨트롤 베이퍼 2','르브론','르브론 XV','르브론 XV 로우','르브론 XV 리미티드','르브론 드라이','르브론 솔저','르브론 엘리트','르브론 올 코트','르브론 위트니스','리바','리액트 베이퍼','리액트 볼','리액트 엘레멘트','리액트 하이퍼덩크','리커버 선글라스','리커버리','리커버리 롤러 바','리커버리 볼','리플렉스 랜야드','마기아 볼','마일러 후디','마지스타 오브라','마지스타 온다','맘바 레이지','매버릭 선글라스','매치 골키퍼 글로브','매치 글로브','머큐리얼','머큐리얼 라이트','머큐리얼 베이퍼','머큐리얼 벨로체','머큐리얼 빅토리','머큐리얼 슈퍼플라이','머큐리얼 페이드 볼','머큐리얼X','머큐리얼X 베이퍼','머큐리얼X 빅토리','머큐리얼X 슈퍼플라이','메이플라이','메트콘','메트콘 4','메트콘 DSX','메트콘 레퍼','모던 러너 2 엔지니어','모션 어댑트 브라','모조 R 선글라스','모조 R 선글라스','모조 SE 선글라스','미드 러너 2','바디수트','바이저 코어','반달 2K','반달 하이 슈프림','밴딧 미러드 선글라스','밴딧 선글라스','버사 롱슬리브 탑','버사 택 8P 볼','베나시','베나시 듀오','베나시 솔라소프트','베나시 슬라이드','베나시 퓨처','베이직','베이직 월렛','베이퍼 12','베이퍼 골키퍼 글러브','베이퍼 글로브','베이퍼 맥스 에어','베이퍼 에너지 백팩','베이퍼니트 리펠 스트라이크','베이퍼니트 스트라이크 드릴','베이퍼맥스 플라이니트','벨로시티 백팩','보스턴 셀틱스 NBA','보스턴 셀틱스 드라이','보스턴 셀틱스 모던','보스턴 셀틱스 스윙맨','보스턴 셀틱스 아이콘','보스턴 셀틱스 어소시에이션','보스턴 셀틱스 에어로빌','보탁','브라질리아 더플백','브라질리아 백팩','브리드','브리드 라이즈','브리드 런','브리드 마일러','브리드 숏슬리브','브리드 스쿼드','브리드 슬리브리스 ','브리드 엘레멘트','브리드 엘레스티카','브리드 엘리트','브리드 탱크','브리드 테일윈드','브리드 퍼포먼스','브리드 하이퍼','브리드 하이퍼벤트','블레이저','블레이저 로얄','블레이저 로우','블레이저 로우 LE','블레이저 로우 SE','블레이저 로우 레더','블레이저 로우 스웨이드','블레이저 로우 팝','블레이저 프리미엄 로우','블리스','블리스 럭스 팬츠','블리스 빅토리 팬츠','블리스 스튜디오 팬츠','빅 마우스 보틀','빅토리 크림슨','삭다트','샤이엔 솔리드 백팩','샥스 그래비티','선레이 어저스트','선레이 프로텍트 2','세션 백팩','솔라 슬리브','솔레이','솔레이 슬리퍼','솔리드 고어 머플러 타올','쇼 X2 XL 선글라스','쇼타임 재킷','쉐이프 집 브라','쉴드 스위프트','쉴드 컨버티블','쉴드 코어','쉴드 테크','쉴드 하프집','쉴드 후디','슈터 NBA 슬리브스','스몰 카파시티 웨이스트팩','스우시','스우시 더블와이드 리스트밴드','스우시 리스트밴드','스우시 핑거 슬리브스','스우시 헤드밴드','스위프트 팬츠','스윙맨 로드','스윙맨 홈','스카일론','스컬프트 럭스','스컬프트 하이퍼','스쿼드 크루 삭스','스쿼드 티','스킬 이벤트 볼','스타디움 FC 바르셀로나','스타디움 백팩','스타디움 짐색','스테판','스튜디오 브라','스트라이크','스트레치 우븐 벨트','스포츠 백','스포츠 글로브','스포츠 백팩','스포츠 보틀','AF1 쇼츠','AF1 숏슬리브 탑','AF1 티','AF1 팬츠','AF1 헤비웨이트 티','AF1 후디','AM95 티','AOP 숏슬리브','AOP 플로럴','AV15 쇼츠','AV15 숏슬리브','AV15 플리스','H86 메탈 스우시 캡','H86 에센셜 캡','H86 캡','H86 퓨추라','JDI 덩크 티','N98 재킷','TB BF 플래그 코리아 티','넘버 티','노벌티 재킷','니트 타이츠','다운 필 모던 재킷','랠리 바시티 에어 재킷','랠리 타이트 팬츠','레거시','링거 숏슬리브 탑','매치업 숏슬리브 폴로','메쉬 드레스','메쉬 봄버 재킷','메쉬 스커트','메탈릭 재킷','모던 쇼츠','모던 조거','모던 케이프','모던 크루 FT','모던 팬츠','모던 풀집 후디','모던 후디','베이직 트랙 수트','본디드 쇼츠','비버지 1 티','빈티시 쇼츠','빈티지 팬츠','서울 티','선셋 퓨추라 티','쇼츠','수트','스냅','스우시','스트립드','아카이브','어드벤스','에센셜','에어','에어 롱슬리브','에어 팬츠','에어 포스','에어 플리스','오 우븐','옵틱','우븐','웜','윈드러너','재킷','저지','조거','짐','컨트리','코리아','크롭','크루','클럽','테크 니트','테크 샤이엔','테크 쉴드','테크 우븐','테크 플리스','트리뷰트','티','팝시클','팬츠','펀넬','폴로','풀집 후디','풋티','퓨추라','프로','프로','프리미엄','프린트','플리스','헤리티지','헤이워드','후디','스피드 레더','스피드 타이츠','스피어 엘레멘트','슬림 웨이스트팩','시카고 불스','시티 봄버 재킷','시티 트레이너','시프트 원','심리스','써마','써마 스피어','써마 크루','써마 팬츠','써마 플렉스','써마 후디','아신 모던','아웃버스트','아제다 토트백','아쿠아 삭','알파','애로우즈','앵글드','앵클','어드밴티지','어센틱','어소시에이션','언레스트','얼티메이트','에센셜 내비게이터','에센셜 체이서','에센셜 팬츠','에센셜 후디','에어 리바더치','에어 마에스트로','에어 모어','에어 베이퍼맥스','에어 벨라','에어 볼텍스','에어 사파리','에어 숏슬리브','에어 스카이론','에어 스퀘어','에어 스판','에어 시퀀트','에어 우븐','에어 조던 1','에어 조던 2','에어 조던 3','에어 조던 8','에어 조던 9','에어 조던 10','에어 조던 11','에어 조던 13','에어 조던 14','에어 조던 18','에어 조던 28','에어 조던 XXXII','에어 조던 점프맨','에어 조던 퍼스트','에어 줌','에어 캡','에어 컬러블락','에어 티','에어 팬츠','에어 포스','에어 폼포짓','에어 풀오버','에어 풋스케이프','에어 프레스토','에어 프리시전','에어 피펜','에어 허라치','에어 후디','에어 휴마라','에어로레이어','에어로리액트 모멘텀','에어로리액트 숏슬리브','에어로빌','에어로빌 레거시','에어로빌 바이저','에어로빌 빅 빌','에어로빌 캡','에어로빌 클래식','에어로빌 테일윈드','에어로빌 프로','에어로스위프트','에어맥스','에어맥스 1','에어맥스 270','에어맥스 90','에어맥스 93','에어맥스 95','에어맥스 97','에어맥스 LB','에어맥스 가일','에어맥스 다이너스티','에어맥스 도미네이트','에어맥스 모션','에어맥스 비전','에어맥스 시퀀트','에어맥스 어드밴티지','에어맥스 엑시스','에어맥스 엠버','에어맥스 인비고','에어맥스 인퓨리에이트','에어맥스 제로','에어맥스 주얼','에어맥스 타바스','에어맥스 타이니','에어맥스 타이파','에어맥스 테아','에어맥스 풀','에어맥스 퓨리','에어맥스 플러스','에이스 로고','에픽 럭스','에픽 리액트 플라이니트','엘레멘트','엘리베이트','엘리트 라이트웨이트','엘리트 컴페티션','엘리트 컴프레션','엘리트 쿠션','엘리트 퀵','엘리트 크루 삭스','오디세이 리액트','오르뎀','오세아니아 텍스타일','오클라호마 시티','요가','울트라 플라이트','윈드러너 재킷','윙스 라이트','유틸리티','익스펜더블','인-시즌','인디','인스타쿨','인터내셔널리스트','잉글랜드','재킷','저스트','점프맨 스냅백','점프맨 에어','점프맨 플라이트','조널 스트라이프','조널 자카드','조던 23','조던 AJ','조던 DNA','조던 그라인드','조던 드라이','조던 라이즈','조던 리렌트리스','조던 모데로','조던 슈터','조던 스포츠웨어','조던 써마','조던 얼티메이트','조던 엘리펀트','조던 울트라','조던 워드마크 티','조던 윙스','조던 점프맨','조던 제너레이션','조던 줌','조던 트레이너','조던 포뮬라','조던 프로','조던 플라이','조던 플라이니트','조던 플라이트','조던 핑거','조던 하이드로','주니어 마지스타','주니어 매치','주니어 머큐리얼','주니어 베이퍼','주니어 베이퍼','주니어 슈퍼플라이','주니어 티엠포','주니어 팬텀','주니어 프리시전','주니어 하이퍼베놈','줌 KD','줌 라이브','줌 레브','줌 베이퍼플라이','줌 스트라이크','줌 스트릭','줌 에비던스','줌 올 아웃','줌 윈플로','줌 윈플로우','줌 컨디션','줌 케이지','줌 트레인','줌 플라이','줌 피트니스','줌 하이퍼베놈','짐','차저','첼린저','카와','카이리','카이리 재킷','커뮤터','코르테즈','코비','코스 클래식','코어 미드','코어 탑','네이마르','드라이','라이트','로얄','버로우','보로우','숏슬리브 탑','스커트','스트라이크','어드밴티지','에어로리엑트','조널','체커드','크루','톱보이 탱크','파워','페더라이트','폴로','퓨어','플렉스','헤리티지','코튼 쿠션','쿠션','쿨 마일러','쿼터스낵','크루저','클래식','클럽','클리블랜드','타이','탄준','탱크','테니스','테센','테일윈드','테크','템포','토키','투어','트랜스패어런트','트레이닝','티엠포','팀','파리','파워 3인치 쇼츠','파워 런','파워 레이서','파워 모던','파워 미드','파워 쉴드','파워 스컬프드','파워 스튜디오','파워 스피드','파워 에센셜','파워 에픽','파워 에필','파워 윈도우','파워 크롭','파워 타이츠','파워 패스트','파워 포켓','파워 피티드','파워 하이퍼','파워 하이퍼쿨','파이널 재킷','파일론 콘즈','판테오스','패커블 백팩','팬텀','퍼포먼스','펀다멘탈','페놈 플라이니트','페더라이트','페이서 브라','포스','포켓나이프','풀 코트','풋볼','퓨추라','프라이드 티','프랑스','프레스토 익스트림','프렉스 우븐','프로','프로 PX 탱크','프로 드라이 타이츠','프로 롱슬리브 탑','프로 리스트','프로 쇼츠','프로 숏슬리브 탑','프로 스우시','프로 앵클','프로 엘보우','프로 오픈-파텔라','프로 웜 컴프레션','프로 웜 타이츠','프로 웨이스트 랩','프로 크로스오버 탱크','프로 크롭 크로스오버','프로 클래식 패디드 브라','프로 클래식 프린티 브라','프로 클로즈 파텔라','프로 타이츠','프로 탱크','프로 탱크탑','프로 파텔라','프로 퍼포레이트','프로 피티드','프로 하이퍼스트롱','프로 하이퍼쿨','프로테가','프리','프리모','프리미엄','프린티드','플라이','플락티스크','플렉스','플로럴','피치','피코','피티드 유틸리티','하이 컷 쇼츠','하이퍼 그립','하이퍼 엘리트','하이퍼덩크 2017','하이퍼베놈','하이퍼어댑트 재킷','하이퍼쿨','하이퍼퓨얼','하카타','행택 스우시 티','허라치','헤리티지','헤브 어 데이','훕스 엘리트'];
	
	sessionStorage.setItem('autoSearchKeyword', JSON.stringify(autoSearchStorage)); 
})(Core);
(function(Core){
	var InputRadio = function(){
		'use strict';
		var setting = {
			selector:'[data-component-radio]',
			attrName:'data-component-radio',
			container:'.input-radio',
			label:'label',
			radio:'input[type=radio]',
			unlock:false
		}

		var rtnOption = function(container, key, data){
			data.forEach(function(data, i){
				if(data.inventoryType != 'UNAVAILABLE'){
					if(data.inventoryType === 'ALWAYS_AVAILABLE' || null){
						enableItem(container, key, data);
					}else if(data.inventoryType === 'CHECK_QUANTITY'){
						if(opt && opt.uiType === 'pdp'){
							if(data.quantity === 0 && opt.quantityOption === 'restock'){
								enableItem(container, key, data);
							} else if(opt.quantityOption !== 'restock' &&(data.quantity > 0 || data.quantity == null)){
								enableItem(container, key, data);
							}
						}
					}
				}
			});
		}


		function enableItem(container, key, data){
			container.find(setting.radio).each(function(i){
				if($(this).val() == data[key]){
					$(this).removeAttr('disabled').parent().removeAttr('disabled').removeClass('disabled');
					if(opt && opt.uiType === 'pdp'){
						$(this).parent().find(setting.label).removeClass('sd-out');
					}
				}
			});
		}

		var $this, $label, $radio, $container, eventID, firstInit = false, opt, isValidate = false;

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				//console.log(arguments);
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				$this = $(setting.selector);
				$container = $this.find(setting.container);
				$label = $container.find(setting.label);
				$radio = $container.find(setting.radio);
				if(!opt) opt = arguments[0]||{};

				$label.off('click').on('click', function(e){
					e.preventDefault();


				    	//모바일 상품정렬 태깅 추가
							var st =$(this).attr('st');
			 if(st != "undefined")	{
			        		if(st=="F") {
			        			   var obj_val = "";

			        			   switch( $(this).attr('for') ){
		 	        			  	case 'sort1':
		 	        			       obj_val = "default";
			        						 break;
		 	        				  case 'sort2':
		 	        					 obj_val = "price+desc";
				        				   break;
			        				  case 'sort3':
		   	        					 obj_val = "price+asc";
				        					 break;
		 		        	    	}

						        	var data ={};
						              data.name  = "sort";
						         			data.value =  obj_val;
						        		  endPoint.call('changeSelect', data);

				          } else if(st=="S"){      //매장 픽업 사이즈 옵션

						         var data ={};
						         		data.name  = "Size Run Selection";
						         		data.page_event = {size_run_select : true}
						         		data.size_run_availability	="";
						         		data.size_run_selection =  $(this)[0].innerText;

		                    endPoint.call('pickupsizeClick', data);
					};
			 }
		      //-----------------------------------------------
					_self.fireEvent('click', this, [$(this).siblings()]);
					if(!$(this).parent().hasClass('disabled')){
						if($(this).siblings().prop('checked') && setting.unlock){
							$(this).siblings().prop('checked', false);
							$(this).parent().removeClass('checked');
							return;
						}

						$(this).siblings().trigger('click');
					}
				});

				$container.off('click').on('click', function(){		
					//PDP SIZE (optionGridType)
					if(opt && opt.uiType === 'pdp'){
					    _self.fireEvent('click', this, [$(this).siblings()]);						
						if(!$(this).attr('disabled')){
							$(this).parent().find(setting.label, setting.radio).each(function(){
								//기존에 선택된 사이즈 해지
								$(this).removeClass('selected');
								$(this).prop('checked', false);
							});
							$(this).find(setting.label).addClass('selected');
							$(this).find(setting.radio).prop('checked', true);
							$(this).find(setting.radio).trigger('change');
						}
					}
				})

				$radio.off('change').on('change', function(){
					if($(this).prop('checked')){						
						isValidate = true;
						$(this).parent().addClass('checked').siblings().removeClass('checked');
						$(this).siblings().attr('checked');

						switch(opt.eventType || 'step'){
							case 'step':
								_self.fireEvent('change', this, [$(this).attr('data-value'), $(this).val(), $(this).attr('data-id'), $(this).attr('data-friendly-name')]);
								break;
							case 'normal':
								_self.fireEvent('change', this, [$(this).val()]);
								break;
						}
					}
				});

				// 기본 선택값 처리
				$radio.each(function(i){
					var $this = $(this);
					if($this.prop('checked')){
						setTimeout(function(){
							$this.trigger('change');
							_self.fireEvent('init', $this);
						});
					} else if($(this).parent().hasClass('checked')){
						//CART 배송 방법(주문배송비/기본배송비) 기본 체크 처리
						setTimeout(function(){
							$this.trigger('click');
							_self.fireEvent('init', $this);
						});
					}
				});

				return this;
			},
			receiveToData:function(option, skuData){
				isValidate = false;
				rtnOption($container, option.type, skuData);
			},
			reInit:function(){
				this.init();
				/*$container;
				$container.each(function(i){
					$(this).removeClass('checked').find('input[type=radio]').removeAttr('checked');
				});*/
			},
			disabled:function(){
				$container.each(function(i){
					$(this).removeClass('checked').addClass('disabled').find('input[type=radio]').removeAttr('checked').attr('disabled', 'disabled');
				});
			},
			trigger:function(value, valueId){
				$radio.each(function(){
					if($(this).val() == valueId){
						$(this).trigger('click');
						return false;
					}
				});
			},
			getValidateChk:function(){
				if(opt.required){
					return isValidate;
				}else{
					return true;
				}
			},
			getThis:function(){
				return $this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_radio'] = {
		constructor:InputRadio,
		attrName:'data-component-radio',
		reInit:true
	}
})(Core);

(function(Core){
	var RegisterModal = function(){
		'use strict';

		var $this, args, endPoint;
		var setting = {
			selector:'[data-component-registermodal]',
			activeClass:'active'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				// var _self = this;
				args = arguments[0];
				$this = $(setting.selector);
				//endPoint = Core.getComponents('component_endpoint');

				/* register */
				$this.click(function(e){
					e.preventDefault();

					// var _self = $(this);
					Core.getModule('module_header').popRegister(function(data){
						location.reload();
					});
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_registermodal'] = {
		constructor:RegisterModal,
		reInit:true,
		attrName:'data-component-registermodal'
	}
})(Core);

(function(Core){
	var InputCheckBox = function(){
		'use strict';

		var $this, $checkbox, $label, args, isValidate = false;
		var setting = {
			selector:'[data-component-checkbox]',
			checkbox:'input[type=checkbox]',
			label:'label',
			attrName:'data-component-checkbox'
		}

		var updateCheckbox = function($target){
			if($target.prop('checked')){
				isValidate = true;
				$target.parent().addClass('checked');
			}else{
				isValidate = false;
				$target.parent().removeClass('checked');
			}
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				$this = $(setting.selector);
				$label = $this.find(setting.label);
				$checkbox = $this.find(setting.checkbox);
				args = arguments[0]||{}

				$label.on('click', function(e){
					e.preventDefault();
					$(this).siblings().trigger('click');
				});

				$checkbox.on('change', function(){
					updateCheckbox( $(this) );
					_self.fireEvent('change', this, [$(this).is(":checked")]);
				});

				// 체크만 하고 이벤트를 실행 시키지 않아야 할 경우도 있어서 제거
				/*
				$.propHooks.checked = {
					set: function(elem, value, name) {
					var ret = (elem[ name ] = value);
						$(elem).trigger("change");
						return ret;
					}
				};
				*/

				// 스크립트로 체크 처리시 change 이벤트는 실행 하지 않고 모양만 변경 처리
				$.propHooks.checked = {
					set: function(elem, value, name) {
					var ret = (elem[ name ] = value);
						updateCheckbox( $(elem));
						return ret;
					}
				}

				$checkbox.trigger('change');
				return this;
			},

			getValidateChk:function(){
				if(args.required){
					if(!isValidate){
						//UIkit.modal.alert(args.errMsg);
						UIkit.notify(args.errMsg, {timeout:3000,pos:'top-center',status:'danger'});
					}
					return isValidate;
				}else{
					return true;
				}
			},
			getThis:function(){
				return $checkbox;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_checkbox'] = {
		constructor:InputCheckBox,
		attrName:'data-component-checkbox',
		reInit:true
	};
})(Core);

(function(Core){
	var ResisterExtends = function(){
		'use strict';

		var $this, args;
		var setting = {
			selector:'[data-component-register-extends]'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0];
				$this = $(setting.selector);

				Core.getComponents('component_textfield', {context:$this}, function(i){
					this.addEvent('focusout', function(){
						if($(this).attr('id') === 'emailAddress'){
							$this.find('input[name=userId]').val($(this).val());
						}
					});
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_register_extends'] = {
		constructor:ResisterExtends,
		reInit:true,
		attrName:'data-component-register-extends'
	}
})(Core);

(function(Core){
	var Gallery = function(){

		var $this, $galleryWrap, $zoomWrap, args, arrGalleryList=[],arrColorList=[], sliderComponent,sliderComponent2, endPoint;
		var setting = {
			selector:'[data-component-gallery]',
			galleryWrapper:'#product-gallery',
			zoomWrapper:'.pdp-gallery-fullview',
			zoomAppender:'.gallery-images'
		}

		var Closure = function(){}
		Closure.prototype.setting = function(){
			var opt = Array.prototype.slice.call(arguments).pop();
			$.extend(setting, opt);
			return this;
		}

		Closure.prototype.init = function(){
			var _self = this;

			args = arguments[0];
			$this = $(setting.selector);
			$galleryWrap = $this.find(setting.galleryWrapper);
			$zoomWrap = $this.find(setting.zoomWrapper);
			endPoint = Core.getComponents('component_endpoint');

			/*
				fireEvent 가 등록되기전에 호출하여 처음 이벤트는 발생하지 않는다 그래서 setTimeout으로 자체 딜레이를 주어 해결하였다.
				조금 위험한 방법아지만 해결방법을 찾기 전까지 사용해야 할꺼 같다.
			*/
			setTimeout(function(){
				_self.fireEvent('skuLoadComplete', _self, ['COMINGSOON']);
			});

			//pc일때
			var arrList = [];
			$galleryWrap.find('.image-list').each(function(i){
				var data = Core.Utils.strToJson($(this).attr('data-thumb'), true);
				var isImage = ($(this).find('img').size() > 0) ? true : false;
				var imgUrl = $(this).find('img, source').attr('src').replace(/\?[a-z]+/g, '');
				var pushIS = true;

				data.isImage = isImage;
				data.thumbUrl = imgUrl;

				/* 중복 이미지 처리 */
				for(var i=0; i < arrList.length; i++){
					if(arrList[i].thumbSort === data.thumbSort && arrList[i].thumbUrl === data.thumbUrl){
						pushIS = false;
						return;
					}
				}

				if(pushIS){
					arrList.push(data);
					arrGalleryList.push(data);
				}
			});

			//모바일일때
			var arrList2 = [];
			$("#product-option_color").find("a").each(function(){
				var data = {};
				var linkUrl = $(this).attr('href');
				var isImage = ($(this).find('img').size() > 0) ? true : false;
				var imgUrl = $(this).find('img').attr('src').replace(/\?[a-z]+/g, '');
				var pushIS = true;
				data.isImage = isImage;
				data.thumbUrl = imgUrl;
				data.linkUrl = linkUrl;

				if(pushIS){
				arrList2.push(data);
				arrColorList.push(data);
				}
			});

			$galleryWrap.on('click', '.image-list a', function(){
				endPoint.call('pdpImageClick');
				$('html').addClass('uk-modal-page');
				$('body').css('paddingRight', 15);
				$zoomWrap.addClass('show');
				//선택항 PDP 이미지 index에 맞게 줌 이미지 스크롤, object.offset.top 값이 좀 이상해서 일일히 계산함.
				var fullWrapper = $this.find('.pdp-gallery-fullview-wrapper');
				if ($galleryWrap.find('video').length) {
			    var imagelengt = arrGalleryList.length-1;
				} else {
					var imagelengt = arrGalleryList.length;
				}
				var eachHeight = fullWrapper.outerHeight()/imagelengt;
				var imageIndex = $(this).attr('href').replace('#', '');
				if ($galleryWrap.find('video').length) {
					var offsetTop = (eachHeight*parseInt(imageIndex-1));
				} else {
					var offsetTop = (eachHeight*parseInt(imageIndex));
				}

				$zoomWrap.animate({scrollTop : offsetTop}, 500, 'linear');
			});

			$zoomWrap.click(function(){
			//  if($('#quickview-wrap').length <= 0){
				$('html').removeClass('uk-modal-page');
				$('body').removeAttr('style');
			//  }
				$(this).removeClass('show');
			});

			//진입시 바로 모바일 pc,사이즈 체크
			var widthMatch = matchMedia("all and (max-width: 767px)");
			if (Core.Utils.mobileChk || widthMatch.matches) {
				this.setThumb(args.sort);
				$("#product-option_color").hide();
			} else {
				this.setZoom(args.sort);
				$("#product-option_color").show();
			}

			//리사이징될때 실행 (오동작 체크 필요)
			$(window).resize(function() {
				if (Core.Utils.mobileChk || widthMatch.matches) {
					Closure.prototype.setThumb(args.sort);
					$("#product-option_color").hide();
				} else {
					Closure.prototype.setZoom(args.sort);
					$("#product-option_color").show();
				}
			});

			return this;
		}

		//pc인경우
		Closure.prototype.setZoom = function(sort){
			var _self = this;
			var appendTxt = '';
			var count = 0;
			var sortType = sort || args.sort;

			//console.log('arrGalleryList:' , arrGalleryList);
			var arrGalleryData = arrGalleryList.filter(function(item, index, array){
				if(item.thumbSort === sortType || item.thumbSort === 'null'){
				count++;
				return item;
				}
			});

			var thumbTemplate;
			if(args.type === 'snkrs'){
				thumbTemplate = Handlebars.compile($("#product-gallery-snkrs").html())(arrGalleryData);
			} else if(arrGalleryData.length > 3){
				thumbTemplate = Handlebars.compile($("#product-gallery-nike").html())(arrGalleryData);
			} else if ($galleryWrap.find('video').length){
				thumbTemplate = Handlebars.compile($("#product-gallery-nike").html())(arrGalleryData);
			} else {
				thumbTemplate = Handlebars.compile($("#product-gallery-nike-large").html())(arrGalleryData);
			}

			var zoomTemplate = Handlebars.compile($('#product-gallery-zoom').html())(arrGalleryData);

			$galleryWrap.empty().append(thumbTemplate);
			$zoomWrap.find(setting.zoomAppender).empty().append(zoomTemplate);
			$("#color-swipe").empty();
		}

		//모바일인경우
		Closure.prototype.setThumb = function(sort){
			var _self = this;
			var appendTxt = '';
			var count = 0;
			var sortType = sort || args.sort;
			var arrThumbData = arrGalleryList.filter(function(item, index, array){
				if(item.thumbSort === sortType || item.thumbSort === 'null'){
					count++;
					return item;
				}
			});

			var colorgalleryTemplate = Handlebars.compile($("#product-gallery-color-swipe").html())(arrColorList);
			var galleryTemplate = Handlebars.compile($("#product-gallery-swipe").html())(arrThumbData);
			var zoomTemplate = Handlebars.compile($('#product-gallery-zoom').html())(arrThumbData);

			$("#color-swipe").empty().append(colorgalleryTemplate);
			$galleryWrap.empty().append(galleryTemplate);
			$zoomWrap.find(setting.zoomAppender).empty().append(zoomTemplate);

			//사이즈 조정
			$galleryWrap.find(".swipe-wrapper").css('width','100%');
			$galleryWrap.find(".swipe-wrapper").find('li').css('min-width','auto');
			$("#color-swipe").find(".swipe-wrapper").find('li').css('min-width','auto');

			if(sliderComponent) sliderComponent.destroySlider();
			sliderComponent = Core.getComponents('component_slider', {context:$this, selector:'#product-gallery>div>.swipe-container'}, function(){
				this.addEvent('slideAfter', function($slideElement, oldIndex, newIndex){
					$galleryWrap.find('li').eq(newIndex).addClass('active').siblings().removeClass('active');
					jQuery('video').trigger('play');
				});
			});

			//항목이 1개 초과일 경우에만 슬라이더 작동
			if( $("#color-swipe").find(".swipe-wrapper").find('li').length > 1 ){
				if(sliderComponent2) sliderComponent2.destroySlider();
				sliderComponent2 = Core.getComponents('component_slider', {context:$this, selector:'#color-swipe>div>.swipe-container'}, function(){
					this.addEvent('slideAfter', function($slideElement, oldIndex, newIndex){
						$galleryWrap.find('li').eq(newIndex).addClass('active').siblings().removeClass('active');
					});
				});
			} else {
				$("#color-swipe ul").css({
					width: "145px"
				});
			}
		}


		// '1 사이즈' 노출 시 '사이즈가이드' 미노출
		$('.size-grid-type [sizeno="size1"]').closest('.size-grid-type').addClass('sizeGuideNone');
		
		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_gallery'] = {
		constructor:Gallery,
		attrName:'data-component-gallery'
	}
 })(Core);

(function(Core){
	var WishListBtn = function(){
		'use strict';

		var $this, args, endPoint;
		var setting = {
			selector:'[data-component-mobileaddtohome]',
			activeClass:'active'
		}

		var faviconFlag = true; // 시작화면 파비콘 노출여부(3초후 클로즈)
		var cookiesDelFlag = false; // 쿠키 삭제여부
		var IS_APP = navigator.userAgent.indexOf('/NKPLUS') != -1; // 인앱상태 여부
		var displayFavorite = false; 
		var closeTimeoutVar; //클리어에 사용될 변수

		// console.log('document.domain:', document.domain);
		//각종 함수 s
		// 쿠키중 파비콘 관련 쿠키의 시간이 다된것이 있다면 삭제한다.
		function fn_faviconCookieService(){
			if(cookiesDelFlag === "true"){
				deleteCookie("snkrsfavicon30day");
				deleteCookie("snkrsfavicon3sec");
			}
			if(faviconFlag === true){
				setTimeout(function(){fn_favicon3secCloseService();}, 3000);
			}
		}
		// 이 펑션을 사용할 경우 30일의 재사용 대기시간을 설정한다.
		function fn_faviconCloseService(){
			setCookieTimeover( "snkrsfavicon30day", 2592000000, 2592000000 ); // 2592000000
			favicon_layer_close();
		}

		// 페이지 종료시 사라지는 쿠키
		function fn_favicon3secCloseService(){		
			setCookieTimeover( "snkrsfavicon3sec", 0, 0 );
			favicon_layer_close();
		}
		//파비콘 팝업 닫기
		function favicon_layer_close(){
			// document.getElementById(favicon_layer).style.display = "none";
			$('#favicon_layer').hide();
		}
		/**
		* 쿠키 설정
		* @param cookieName 쿠키명
		* @param cookieExpireDate 쿠키값(유효날짜)
		* @param expireDay 쿠키 유효날짜
		*/
		function setCookieTimeover( cookieName, cookieExpireDate, expireDate )
		{
			var today = new Date();
			var milliSec = today.getTime() + cookieExpireDate;
			today.setTime(today.getTime() + parseInt(expireDate));
			if(expireDate === 0){
				document.cookie = cookieName + "=" + escape( milliSec ) + "; path=/;";
			}else{
				document.cookie = cookieName + "=" + escape( milliSec ) + "; path=/; expires=" + today.toGMTString() + ";";
			}
		}
		// 쿠키 호출
		function getCookie( cookieName ){
			var search = cookieName + "=";
			var cookie = document.cookie;
			if( cookie.length > 0 ){
				startIndex = cookie.indexOf( cookieName );
				if( startIndex != -1 ){
					startIndex += cookieName.length;
					endIndex = cookie.indexOf( ";", startIndex );
					if( endIndex == -1) endIndex = cookie.length;
					return unescape( cookie.substring( startIndex + 1, endIndex ) );
				} else {
					return false;
				}
			} else { 
				return false;
			}
		}
		// 쿠키 삭제
		function deleteCookie( cookieName ){
			var expireDate = new Date();
			expireDate.setDate( expireDate.getDate() - 1 );
			document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
		}

		// 홈화면 바로가기 추가 레이어
		function fn_homeDisplayAdd(){
			smartskin_HomeButtonAdd('SNKRS','');/* \n */

			try{
				var userAgent = navigator.userAgent.toLowerCase(); // 접속 핸드폰 정보 
				if(userAgent.match('android')) { 
					fbq('track', 'addTohome', {content_name: 'SNKRS'});  
				}						
			}catch(e){}		
		}
		// 홈화면 바로가기 추가 텍스트
		function fn_homeDisplayAddText(){
			smartskin_HomeButtonAdd('SNKRS','');/* \n */
	
			try{
				var userAgent = navigator.userAgent.toLowerCase(); // 접속 핸드폰 정보 
				if(userAgent.match('android')) { 
					fbq('track', 'addTohome', {content_name: 'SNKRS'});  
				}						
			}catch(e){}			
		}
		function smartskin_HomeButtonAdd(title,code){
			if(phoneTypeChk() !== false){
				var sm_HomeButtonTitle = title;
				var sm_LogAnalysisCode = code;
				var sm_HomeButtonTitle = encodeURI(sm_HomeButtonTitle);
				var sm_HomePageUri = 'https://' + document.domain + '/launch';
				// var sm_WebRootPathUri = "https://"+document.domain;
				var userAgent = navigator.userAgent.toLowerCase(); // 접속 핸드폰 정보 
				var iconurl = $('link[rel="shortcut icon"]').attr("href");
				if(userAgent.match('iphone')) { 
					iconurl = $('link[rel="apple-touch-icon-precomposed"]').attr("href");
				} else if(userAgent.match('ipad')) { 
					iconurl = $('link[rel="apple-touch-icon-precomposed"]').attr("href");
				} else if(userAgent.match('ipod')) { 
					iconurl = $('link[rel="apple-touch-icon-precomposed"]').attr("href");
				}
				var sm_naver_customUrlScheme= "intent://addshortcut?url="+sm_HomePageUri+"%3F"+sm_LogAnalysisCode+"&icon="+iconurl+"&title="+
				sm_HomeButtonTitle+"&oq="+sm_HomeButtonTitle+"&serviceCode=nstore&version=7#Intent;scheme=naversearchapp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.search;end";
				var sm_UserAgent = navigator.userAgent.toLowerCase();
				var sm_BlockDevice1 = sm_UserAgent.indexOf("iphone");
				var sm_BlockDevice2 = sm_UserAgent.indexOf("ipad");
				var sm_BlockDevice = sm_BlockDevice1 + sm_BlockDevice2;
				if(sm_BlockDevice == -2){
					location.href = sm_naver_customUrlScheme;				
				}else{					
					fn_favoriteShow();
				}	
			
				if(faviconFlag === true){
					setTimeout(function(){fn_favicon3secCloseService();}, 3000);
				}
			}
		}
		function phoneTypeChk(){
			var sAgent = navigator.userAgent,
			sWindowType = "win16|win32|win64|mac";
			try {
				if (sWindowType.indexOf(navigator.platform.toLowerCase()) === -1) {
					if (sAgent.match(/iPhone|iPad/i) !== null) {
						fn_favoriteShow();
						return false;
					} else if (sAgent.indexOf('Android') == -1) {
						return false;
					}
				} else {
					return true;
					// alert("모바일 기기에서만 지원되는 기능입니다.");
					// return false;
				}
			} catch(e) {}
				return true;
		}

		// 아이폰 홈화면 추가레이어 표기
		function fn_favoriteShow(){			
			if(displayFavorite === false){
				// document.getElementById('favorite_box').style.display="block";
				$("#favorite_box").show();
				displayFavorite = true;
				// 3초뒤 사라짐
				closeTimeoutVar = setTimeout(function(){fn_favoriteHide();}, 3000);
			}
		}

		// 아이폰 홈화면 추가레이어 숨김
		function fn_favoriteHide(){
			// document.getElementById('favorite_box').style.display="none";
			$("#favorite_box").hide();
			displayFavorite = false;
			clearTimeout(closeTimeoutVar);
		}

		//각종 함수 e

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				$this = $(setting.selector);
				
				//---------------------------------------//

				var userAgent = navigator.userAgent.toLowerCase(); // 접속 핸드폰 정보 
				// 모바일 홈페이지 바로가기 링크 생성 Icon-72.png Icon@2x.png
				if(userAgent.match('iphone')) { 
					$('link[rel="apple-touch-icon-precomposed"]').attr("href",'/cmsstatic/structured-content/1151/Icon@2x.png');
				} else if(userAgent.match('ipad')) { 
					$('link[rel="apple-touch-icon-precomposed"]').attr("sizes",'72x72');
					$('link[rel="apple-touch-icon-precomposed"]').attr("href",'/cmsstatic/structured-content/1151/Icon@2x.png');
				} else if(userAgent.match('ipod')) { 
					$('link[rel="apple-touch-icon-precomposed"]').attr("href",'/cmsstatic/structured-content/1151/Icon@2x.png');
				} else if(userAgent.match('android')) { 
					$('link[rel="shortcut icon"]').attr("href",'/cmsstatic/structured-content/1151/Icon-72.png');
				}

				$this.on('click', function(){
					fn_homeDisplayAddText();
				});
				
				//안드로이드 SNKRS 런칭캘린더를 <br/>홈 화면에 추가해보세요! 누름
				$('#add-favicon-to-home').on('click', function(){	
					fn_homeDisplayAdd();
				});

				//안드로이드 SNKRS 런칭캘린더를 <br/>홈 화면에 추가해보세요 의 닫기 아이콘
				$('#android-favicon-close').on('click', function(){
					fn_faviconCloseService();
				});
				//아이폰 SNKRS 런칭캘린더를 <br/>홈 화면에 추가해보세요 의 닫기 아이콘
				$('#apple-favorite-close').on('click', function(){
					fn_favoriteHide();
				});
				//------------------------------------//

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_mobileaddtohome'] = {
		constructor:WishListBtn,
		reInit:true,
		attrName:'data-component-mobileaddtohome'
	}
})(Core);

(function(Core){
	var FileUpLoad = function(){
		'use strict';

		var $this, $form, $inputFiles, $progress, $uploadBtn, currentIndex=0;
		var setting = {
			selector:'[data-component-file]',
			form:'#fileupload-form',
			inputFiles:'#input-file',
			uploadBtn:'[data-upload-btn]',
			maxLength:5
		}

		var setImgPreview = function(target){
			var _self = target;
			var _this = this;

			if($(this).val() === '') return false;

			$form.ajaxSubmit({
				success:function(data){
					upImageResult.call(_self, data);
				},
				error:function(data){
					_self.fireEvent('error', [data]);
				}
			});
		}

		var upImageResult = function(data){
			if(data.result === true){
				this.fireEvent('upload', this, [data.fileName, data.fullUrl]);
			}else if(data.result === 'error'){
				this.fireEvent('error', this, [data.errorMessage]);
			}else{
				this.fireEvent('error', this, ['이미지 전송을 실패하였습니다.']);
			}
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				var cUrl = Core.Utils.url.getCurrentUrl();
				var cQueryParams = Core.Utils.getQueryParams(cUrl);

				$this = $(setting.selector);
				$uploadBtn = $this.find(setting.uploadBtn);
				$inputFiles = $(setting.inputFiles);
				$form = $(setting.form);

				$uploadBtn.click(function(e){
					e.preventDefault();

					if(currentIndex >= setting.maxLength){
						_self.fireEvent('error', this, ['최대'+setting.maxLength+'장 까지만 업로드 가능합니다.']);
						return false;
					}

					//appView일때 toapp 호출
					var appVer = cQueryParams.appver || '';
					if(cQueryParams.deviceOs){
						if(cQueryParams.deviceOs.toLowerCase() === 'ios' || cQueryParams.deviceOs.toLowerCase() === 'and'){
							if(appVer.replace(/\./g, '') >= 120){
								location.href='toapp://attach?uploadUrl='+ location.origin + $form.attr('action') +'&mediatype=image&callback=Core.getModule("module_review_write").moduleConnect&imagecount=1';
							}else{
								console.log('app version - ' + appVer);
							}
						}
					}else{
						$inputFiles.trigger('click');
					}
				});

				$inputFiles.change(function(e){
					setImgPreview.call(this, _self);
				});

				return this;
			},
			setCurrentIndex:function(index){
				currentIndex = index;
			},
			setToappUploadImage:function(data){
				upImageResult.call(this, data);
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_file'] = {
		constructor:FileUpLoad,
		attrName:'data-component-file'
	}
})(Core);

(function(Core){
	var LoginModal = function(){
		'use strict';

		var $this, args, endPoint;
		var setting = {
			selector:'[data-component-loginmodal]',
			activeClass:'active'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				// var _self = this;
				args = arguments[0];
				$this = $(setting.selector);
				//endPoint = Core.getComponents('component_endpoint');

				/* login */
				$this.click(function(e){
					e.preventDefault();

					// var _self = $(this);
					Core.getModule('module_header').setModalHide(true).setLogin(function(data){
						// console.log('callback');
						location.reload();
					});
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_loginmodal'] = {
		constructor:LoginModal,
		reInit:true,
		attrName:'data-component-loginmodal'
	}
})(Core);

(function(Core){
	var EndPoint = function(){
		'use strict';

		var _self;
		var setting = {}


		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();

				$.extend(setting, opt);
				return this;
			},
			init:function(){
				_self = this;
				return this;
			}, 
			call:function( status, data ){
				//console.log('endpoint : ', status );
				_self.fireEvent(status, this, [data]);
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_endpoint'] = {
		constructor:EndPoint,
		reInit : true,
		attrName:'data-component-endpoint'
	}
})(Core);

(function(Core){
	var LaunchItem = function(){
		'use strict';

		var $this, $overlayTxt, $quickViewBtn, $hover, modal, args, endPoint;
		var setting = {
			selector:'[data-component-launchitem]'
		}

		var Closure = function(){}

		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				args = arguments[0];
				$this = $(setting.selector);
				endPoint = Core.getComponents('component_endpoint');
				
				
				// FEED IMAGES Lazy()
				$('.launch-category .img-component').Lazy();


				var notify_closure = function () {

						// Launch 리스트 NOTIFY ME 버튼 노출
						$this.find('.item-notify-me').on('click', function (e) {
						// $('.uk-grid').on('click', '.item-notify-me', function (e) {
							var url = $(this).attr('url');

							Core.Utils.ajax(url, 'GET', {}, function (data) {
								$("#restock-notification").remove();
								
								var notifyPop = $(data.responseText).find('#restock-notification');
								$('body').append(notifyPop)
								
								Core.moduleEventInjection(data.responseText);

								var obj = {
									'productId': $this.find('[name="productId"]').val()
								}

								// console.log('_self : ', _self);

								Core.Utils.ajax(Core.Utils.contextPath + '/productSkuInventory', 'GET', obj, function(data){
									var responseData = data.responseText;
									var allSkuData = Core.Utils.strToJson(responseData).skuPricing;
									_self.fireEvent('skuLoadComplete', _self, [allSkuData, 'COMINGSOON']);
								}, false, true);
														
								var modal = UIkit.modal("#restock-notification");
								if (modal.isActive()) {
									modal.hide();
								} else {
									modal.show();
								}
							});
						});

						if (!Core.Utils.mobileChk) {
							$this.find('.btn-box-notify')
								.mouseenter(function() {
									$this.find('.info-sect').addClass('opacity');
								})
								.mouseleave(function() {
									$this.find('.info-sect').removeClass('opacity');
								});
						}

				}
				notify_closure();

				/*
					fireEvent 가 등록되기전에 호출하여 처음 이벤트는 발생하지 않는다 그래서 setTimeout으로 자체 딜레이를 주어 해결하였다.
					조금 위험한 방법아지만 해결방법을 찾기 전까지 사용해야 할꺼 같다.
				*/
				// setTimeout(function(){
				// 	_self.fireEvent('notifyLoadComplete', _self, [notify_closure]);
				// });

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_launchitem'] = {
		constructor:LaunchItem,
		reInit:true,
		attrName:'data-component-launchitem'
	}
})(Core);

(function(Core){
	var CustomerAddress = function(){
		'use strict';

		var $this, args;
		var setting = {
			selector:'[data-component-customer-address]',
			selectBtn:'[data-customer-address-select-btn]',
			baseDom : '[data-customer-address]'
		}

		var getAddressInfoBySelect = function( $el ){
			var data = {};
			$el.closest(setting.baseDom).find('input[type=hidden]').each(function() {
				data[$(this).attr('name')] = $(this).val() || '';
			});	
			return data;
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0];
				$this = $(setting.selector);

				if( $this.find(setting.selectBtn).length == 0 ){
					return;
				}

				$this.find(setting.selectBtn).on('click', function(e){
					e.preventDefault();
					_self.fireEvent( 'select', this, [getAddressInfoBySelect( $(this) )]);
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_customer_address'] = {
		constructor:CustomerAddress,
		attrName:'data-component-customer-address'
	}
})(Core);

(function(Core){
	var InputColor = function(){
		'use strict';
		var setting = {
			selector:'[data-component-color]',
			attrName:'data-component-color',
			container:'#product-option_color',

		}
        var opt, $this, $container, endPoint;

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				opt = arguments[0]||{};

				$this = $(setting.selector);
				endPoint = Core.getComponents('component_endpoint');

				//show tool tip 
				$this.find('.input-radio').each(function(){
					$(this).mouseenter(function(){
						if($(this).find('.tooltip-pos').length){
							$(this).find('.tooltip-pos').show();
						};
					});

					$(this).mouseleave(function(){
						if($(this).find('.tooltip-pos').length){
							$(this).find('.tooltip-pos').hide();
						};
					});

					$(this).on('click', function(e){
						e.preventDefault();
						endPoint.call('pdpColorClick', {});
						window.location.href = $(this).attr("href");
					})
					
				});
				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_color'] = {
		constructor:InputColor,
		attrName:'data-component-color',
		reInit:true
	}
})(Core);

(function(Core){
	var CategoryItem = function(){
		'use strict';

		var $this, $overlayTxt, $quickViewBtn, $hover, modal, args, endPoint;
		var setting = {
			selector:'[data-component-categoryitem]',
			overlayTxt:'.category-overlaytext',
			quickViewBtn:'.quick-btn',
			hover:'.action-hover'
		}

		var Closure = function(){}

		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;

				args = arguments[0];
				$this = $(setting.selector);
				endPoint = Core.getComponents('component_endpoint');
				$overlayTxt = $this.find(setting.overlayTxt);
				$quickViewBtn = $this.find(setting.quickViewBtn);
				$hover = $this.find(setting.hover);
				modal = UIkit.modal('#common-modal', {modal:false, center:true});
				modal.off('.uk.modal.categoryItem').on({
					'hide.uk.modal.categoryItem':function(){
						//console.log('categoryItem modal hide');
						$('html').removeClass('uk-modal-page');
						$('body').removeAttr('style');
					}
				});

				Core.getComponents('component_categoryslider', {context:$this}, function(){
					this.addEvent('sliderOver', function(imgUrl){
						$this.find(args.imgWrapper).find('img').eq(0).attr('src', imgUrl);
					});
				});

				$quickViewBtn.click(function(e){
					e.preventDefault();

					//var id = $(this).siblings().filter('input[name=productId]').attr('value');
					var target = $(this).attr('data-href');
					var url = $(this).siblings().filter('input[name=producturl]').attr('value');

					Core.Utils.ajax(url, 'GET', {quickview:true}, function(data){
						var domObject = $(data.responseText).find('#quickview-wrap');
						$(target).find('.contents').empty().append(domObject[0].outerHTML);
						$(target).addClass('quickview');
						Core.moduleEventInjection(domObject[0].outerHTML);
						modal.show();

						var $product = $(domObject[0].outerHTML);
						var productData = Core.Utils.strToJson( $product.find('[data-module-product]').data('module-product'), true );
						var data = {
							id : productData.productId,
							name : $product.find('[data-name]').data('name'),
							price : $product.find('[data-price]').data('price'),
							isDefaultSku : productData.isDefaultSku
						}
						//endPoint.call('quickView', {product : data})
					});
				});
				if(!Core.Utils.mobileChk){
					$this.on({
						'mouseenter':function(e){
							$this.addClass('hover');
						},
						'mouseleave':function(){
							$this.removeClass('hover');
						}
					});
				}

				$this.find('a').click(function(e){
					e.preventDefault();
					if( $(this).closest(".related-items").length > 0 ){
						// 추천상품 클릭시
						endPoint.call('crossSaleClick');
						window.location.href = $(this).attr('href') + '?fm=cs';
					} else if( $(this).closest(".customer-order").find('.product-item').length > 0 ){
						// 위시리스트 클릭시
						endPoint.call('wishlistClick');
						window.location.href = $(this).attr('href');
					} else{
						sessionStorage.setItem('isHistoryBack', true);
						sessionStorage.setItem('categoryScrollTop', $(document).scrollTop());
						sessionStorage.setItem('categoryTarget', args.parentWrapper);
						sessionStorage.setItem('categoryPathname', location.pathname);
						sessionStorage.setItem('categoryList', $(args.parentWrapper)[0].innerHTML);
						window.location.href = $(this).attr('href');
					}
				});

				// PW 리스트 NOTIFY ME 버튼 노출
				$this.find('.item-notify-me').on('click', function (e) {
					var url = $(this).attr('url');

					Core.Utils.ajax(url, 'GET', {}, function (data) {
						$("#restock-notification").remove();
						
						var notifyPop = $(data.responseText).find('#restock-notification');
						$('body').append(notifyPop)
						
						Core.moduleEventInjection(data.responseText);

						var obj = {
							'productId': $this.find('[name="productId"]').val()
						}

						Core.Utils.ajax(Core.Utils.contextPath + '/productSkuInventory', 'GET', obj, function(data){
							var responseData = data.responseText;
							var allSkuData = Core.Utils.strToJson(responseData).skuPricing;

							// fireEvent
							_self.fireEvent('skuLoadComplete', _self, [allSkuData, 'PW']);

						}, false, true);

						var modal = UIkit.modal("#restock-notification");
						if (modal.isActive()) {
							modal.hide();
						} else {
							modal.show();
						}
					});
				});

				if(!Core.Utils.mobileChk){
					$hover.on('mouseenter', function(e){
						//$(this).addClass('over');
						//$(this).find("#item-color-opt").hide();
						$(this).find("#thumb-img-slider").show();
						//$(this).find("#riview-icon").show();
					});

					$hover.on('mouseleave', function(e){
						//$(this).removeClass('over');
						//$(this).find("#item-color-opt").show();
						$(this).find("#thumb-img-slider").hide();
						//$(this).find("#riview-icon").hide();
					});
				}

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_categoryitem'] = {
		constructor:CategoryItem,
		reInit:true,
		attrName:'data-component-categoryitem'
	}

	$(".section-filter").parent().next(".item-list-less").removeClass("item-list-less");

})(Core);

(function(Core){
	var ForgotPasswordModal = function(){
		'use strict';

		var $this, args, endPoint;
		var setting = {
			selector:'[data-component-forgotpasswordmodal]',
			activeClass:'active'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				// var _self = this;
				args = arguments[0];
				$this = $(setting.selector);
				//endPoint = Core.getComponents('component_endpoint');

				/* pop modal */
				$this.click(function(e){
					e.preventDefault();
					Core.getModule('module_header').setModalHide(true).popForgotPassword(function(data){
						location.reload();
					});
				});

				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_forgotpasswordmodal'] = {
		constructor:ForgotPasswordModal,
		reInit:true,
		attrName:'data-component-forgotpasswordmodal'
	}
})(Core);

(function(Core){
	var CartItmeLen = function(){
		'use strict';

		var $this, args, itemCountComponent=null;
		var setting = {
			selector:'[data-component-cartitemlen]'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0];
				$this = $(setting.selector);

				itemCountComponent = new Vue({
					el:$this[0],
					data:{
						'isEmpty':(args.itemCount*1 > 0) ? false : true,
						'itemCount':args.itemCount*1
					},
					watch:{
						itemCount:function(){
							this.isEmpty = (this.itemCount > 0) ? false : true
						}
					},
					computed:{
						reverseIsEmpty:function(){
							return (this.isEmpty) ? false : true;
						}
					}
				});
				return this;
			},
			getItemLength:function(){
				return itemCountComponent.itemCount;
			},
			setItemLength:function(itemLength){
				itemCountComponent.itemCount = itemLength;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_cartitemlen'] = {
		constructor:CartItmeLen,
		attrName:'data-component-cartitemlen'
	}
})(Core);

(function(Core){
	var FilterCategory = function(){
		'use strict';
		var setting = {
			selector:'[data-component-filtercategory]',
			attrName:'data-component-filtercategory',
		}
		var opt, $this;
		var displayLiCnt=6;

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				opt = arguments[0]||{};
				$this = $(setting.selector);
				//리스트 숨김 처리
				if($this.find('#two-depth-shoes').length > 0){
					var listLen = 0, hideMore, currentIndex;
					$this.find('#two-depth-shoes a').each(function(index){
						//현재 선택한 메뉴가 몇번째 메뉴인지 확인
						if($(this).attr('href')===opt.url){
							currentIndex = index;
						}
						listLen++;
					});
					
					if(displayLiCnt > listLen){
						//전체 리스트 개수가 6이하 이면 '더보기' 숨김. 리스트 모두 표시 
						$this.find('#more').hide();
					} else {
						if(displayLiCnt > currentIndex){
							//현재 선택한 메뉴의 인덱스가 6미만이면 '더보기'표시 하고 인덱스 6부터는 리스트 숨김
							$this.find('#more').show();
							$this.find('#two-depth-shoes a').each(function(index){
								if(index >= displayLiCnt){
									$(this).hide();
								}
							});
						} else if(currentIndex >= displayLiCnt){
							//현재 선택한 메뉴의 인덱스가 6이상이면 '더보기' 숨기고 리스트를 모두 표시함
							$this.find('#more').hide();
						}
					}
				}

				//더보기 누르면 리스트 모두 표시
				$this.find('#more').on('click', function(){
					$this.find('#more').hide();
					$this.find('#two-depth-shoes a').each(function(index){
						$(this).show();
					});
				});
				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_filtercategory'] = {
		constructor:FilterCategory,
		attrName:'data-component-filtercategory',
		reInit:true
	}
})(Core);

(function(Core){
	var addOnProduct = function(){
		'use strict';

		var $this, $addonListWrap, $msg, args, selectComponent = null, isRequired=false, forceDependent=false, isValidate=false, isFireEvent = true;
		var objChildItem={}; //single 만 됨
		var addOnListComponent = null;
		var addOnSelectComponent = null;
		var currentAddonIndex = 0;
		var setting = {
			selector:'[data-component-addon-product-option]',
			resultWrap:'.addon-wrap'
		}

		var addChildItem = function(key, skuData, requestChildItem){
			/*
				원상품 : 애드온 상품
					x_FORCED
					NONE
					1 : 1	EQUIVALENT			quantityComponent 추가 (수량체크는 원상품의 주문 수량만큼 추가가능) 인데 일단 수량 컴포넌트 삭제
					1 : x	PROPORTION			quantityComponent 추가 (relativeQuantity 값 만큼 추가가능)
					x : 1	PROPORTION_REV
			*/

			if(args['data-component-addon-product-option'].addOnListType === 'single'){
				objChildItem = {};
				addOnListComponent['items'] = [];
			}

			if(!objChildItem.hasOwnProperty(key)){
				skuData.isSubmit = args['data-component-addon-product-option'].isSubmit;
				skuData.privateId = key;
				objChildItem[key] = requestChildItem;
				addOnListComponent['items'].push(skuData);
				currentAddonIndex = addOnListComponent['items'].length - 1;
			}

			isValidate = true;
			if($msg.length > 0){
				$msg.text('');
			}
		}

		var addMessage = function(){
			if($msg.length > 0){
				$msg.text('상품을 선택해 주세요');
			}else{
				UIkit.notify('상품을 선택해 주세요', {timeout:3000,pos:'top-center',status:''});
			}
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0];

				//sku 옵션생성
				$this = $(setting.selector);
				$addonListWrap = $this.find(setting.resultWrap);
				$msg = $this.siblings().filter('.tit').find('.msg');

				var $select = $this.find(setting.selector);
				var optionData = args['data-product-options'];
				var skuData = args['data-sku-data'];
				var skuOpt = [];
				var addOnProductType = args['data-component-addon-product-option'].addOnProductType;
				var relativeType = args['data-component-addon-product-option'].addOnRelativeType;
				var relativeQuantity = args['data-component-addon-product-option'].addOnRelativeQuantity;
				forceDependent = (args['data-component-addon-product-option'].forceDependent === 'true') ? true : false;
				isRequired = (args['data-component-addon-product-option'].isRequired === 'true') ? true : false;

				for(var i=0; i<skuData.length; i++){
					if(skuData[i].inventoryType !== 'UNAVAILABLE'){
						if(skuData[i].quantity === 'null' || skuData[i].quantity > 0 || skuData[i].inventoryType === 'ALWAYS_AVAILABLE'){
						    (function(){
						        var obj = {};
								obj['privateId'] = skuData[i].skuId;
								obj['name'] = args['data-component-addon-product-option'].name;
								obj['retailPrice'] = Core.Utils.price(args['data-component-addon-product-option'].retailPrice);
						        obj['salePrice'] = Core.Utils.price(args['data-component-addon-product-option'].salePrice);
								obj['isQuantity'] = (relativeType === 'PROPORTION' || relativeType === 'NONE' || relativeType === 'null') ? true : false;
	    						obj['quantity'] = (relativeQuantity > skuData[i].quantity || relativeQuantity === 'null' || relativeQuantity === '') ?
													(skuData[i].inventoryType === 'ALWAYS_AVAILABLE' ? 100 : skuData[i].quantity) : relativeQuantity;
	    						obj['selectedOptions'] = (function(index){
	    						    var arr = [];
	    						    skuData[index].selectedOptions.forEach(function(a, i){
										var obj = {};
	    						        obj[optionData[i].attributeName] = optionData[i]['values'][a];
										arr.push(obj);
	    						    });
									obj['options'] = JSON.stringify(arr);
	    							return arr;
	    						})(i);
								obj['opt'] = (function(index){
	    						    var arr = [];
	    						    skuData[index].selectedOptions.forEach(function(a, i){
										arr.push(optionData[i]['values'][a]);
	    						    });
	    							return arr;
	    						})(i).join(' / ');
	    						skuOpt.push(obj);
						    })();
						}
					}
				}

				addOnSelectComponent = new Vue({
					el:$this.find('.addon-select')[0],
					data:{
						'skuData':skuOpt
					},
					created:function(){
						var _vm = this;
						this.$nextTick( function(){
							selectComponent = Core.getComponents('component_select', {context:$this}, function(){
								//this.rePaintingSelect();
								this.addEvent('change', function(val, $selected, index){
									var requestChildItem = {};
									var privateId = $selected.attr('data-privateid');
									requestChildItem.productId = args['data-component-addon-product-option'].addonId;
									requestChildItem.quantity = 1;

									for(var i=0; i<_vm.skuData[index-1].selectedOptions.length; i++){
										for(var key in _vm.skuData[index-1].selectedOptions[i]){
											requestChildItem['itemAttributes['+ key +']'] = _vm.skuData[index-1].selectedOptions[i][key];
										}
									}

									addChildItem(privateId, _vm.skuData[index-1], requestChildItem);
									if(isFireEvent){
										_self.fireEvent('addToAddOnItem', this, [privateId, $selected]);
									}else{
										isFireEvent = true;
									}
								});
							});
						});
					},
					methods:{
						rtnItemInfo:function(itemName, opt){
							return (opt !== '') ? (itemName + ' - ' + opt) : itemName;
						}
					}
				});

				addOnListComponent = new Vue({
					el:$this.find('.addon-list-wrap')[0],
					data:{
						'items':[]
					},
					watch:{
						items:function(items){
							var _vm = this;
							this.$nextTick( function(){
								for(var i=0, size=items.length; i<size; i++){
									if(items[i].isQuantity && currentAddonIndex === i){
										Core.getComponents('component_quantity', {context:$(_vm.$refs['addonItem'][currentAddonIndex])}, function(){
											this.addEvent('change', function(qty){
												objChildItem[_vm.$refs['addonItem'][currentAddonIndex].getAttribute('data-privateid')].quantity = qty;
											});
										});
									}
								}
							});
						}
					},
					methods:{
						quantitySetting:function(quantity){
							return '{maxQuantity:'+ quantity +', msg:개 까지 구매가능 합니다., quantityStateMsg:상품의 수량이 없습니다.}';
						},
						itemDelete:function(index){
							this.items.splice(index, 1);
						}
					}
				});

				/* delete btn addEvent */
				$addonListWrap.on('click', '.btn-delete', function(e){
					e.preventDefault();

					var $parent = $(this).closest('.addon-state');
					var key = $parent.attr('data-privateId');
					$parent.remove();

					if(objChildItem.hasOwnProperty(key)){
						delete objChildItem[key];
						selectComponent.reInit();
					}

					if(Core.Utils.objLengtn() <= 0){
						isValidate = false;
					}

					_self.fireEvent('itemDelete', this, [key]);
				});

				/* isSubmit === true */
				$addonListWrap.on('click', '.btn-submit', function(e){
					e.preventDefault();
					_self.fireEvent('submit', this, [_self.getChildAddToCartItems()]);
				});

				return this;
			},
			setTrigger:function(privateId){
				isFireEvent = false;
				if(selectComponent) selectComponent.trigger(privateId, privateId);
			},
			getChildAddToCartItems:function(){
				var arrChildItem = [];
				for(var key in objChildItem){
					arrChildItem.push(objChildItem[key]);
				}

				return arrChildItem;
			},
			getValidateChk:function(){
				if((!isRequired || isRequired === 'null' ) && (!forceDependent || forceDependent === 'null')){
					isValidate = true;
				}else{
					if(!isValidate){
						addMessage();
					}
				}
				return isValidate;
			},
			getAddonId:function(){
				return args['data-component-addon-product-option'].addonId;
			},
			removeItems:function(){
				$addonListWrap.find('.btn-delete').trigger('click');
			},
			getAddOnOrderId:function(){
				return args['data-component-addon-product-option'].addOnOrderId;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_addon_product_option'] = {
		constructor:addOnProduct,
		attrName:['data-component-addon-product-option', 'data-product-options', 'data-sku-data']
	}
})(Core);

(function(Core){
	var CategorySlider = function(){
		'use strict';

		var $this, modal, args, endPoint;
		var setting = {
			selector:'[data-component-categoryslider]'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0];
                $this = $(setting.selector);
                //change category primary image
				$this.find('ul').on('mouseenter', 'li', function(e){
					e.preventDefault();
                    var curImg = $(this).find("img").attr('src');
					curImg = curImg.replace("thumbnail", "browser");
                    //$(this).closest(".action-hover").find(".item-imgwrap").children("img").attr('src',curImg);
                    //over
                    _self.fireEvent('sliderOver', this, [curImg]);
				 });

                /*$this.find('ul').on('mouseleave', 'li', function(e){
                    e.preventDefault();
                    var curImg = $(this).find("img").attr('src');
                });*/

                var count = $this.find('ul').children().length;
                if(count <= 3){
                    $this.find("#btn_prev_smallthumb").hide();
                    $this.find("#btn_next_smallthumb").hide();
                }else{
                    $this.find("#btn_next_smallthumb").show();
                    $this.find("#small_slider_curr_pos").val(0);
                    $this.find("#small_slider_curr_page").val(1);

                    var pageCnt = Math.trunc(count / 3);
                    if(count % 3 != 0){
                        $this.find("#small_slider_lastimg_cnt").val(count-(pageCnt*3));
                        pageCnt++;
                    }
                    $this.find("#small_slider_page_cnt").val(pageCnt);
                }

                //set ul width
                $this.find('ul').each(function() {
                    $(this).width($(this).find('li').length*90);
                });


                $this.find("#btn_prev_smallthumb").click(function(){
                    var currPos = Number($this.find("#small_slider_curr_pos").val());
                    var currPage = Number($this.find("#small_slider_curr_page").val());
                    var pageCnt = Number($this.find("#small_slider_page_cnt").val());
                    var lastImgCnt = Number($this.find("#small_slider_lastimg_cnt").val());
                    var goSliderPos = currPos;
                    if(currPage == 1){
                        //console.log("Warning, first page !!!");
                        return false;
                    }
                    if(pageCnt == 2){
                            goSliderPos=0;
                    }else{
                        if(pageCnt == currPage){
                            if(lastImgCnt == 0)
                                goSliderPos = currPos - 183;
                            else
                                goSliderPos = currPos - 61*lastImgCnt;
                        }else{
                            goSliderPos = currPos - 183;
                        }
                    }
                    currPage--;
                    $this.find("#small_slider_curr_page").val(currPage);
                    $this.find("#small_slider_curr_pos").val(goSliderPos);
                    $this.find('ul').css("transform","translate( -"+goSliderPos+"px, 0px) translateZ(0px)");
                    $this.find('ul').css("transition-duration","0.5s");
                    if(currPage == 1){
                        $this.find("#btn_prev_smallthumb").hide();
                        $this.find("#btn_next_smallthumb").show();
                    }
                    //console.log("go this position ::: " + goSliderPos);
                })

                 $this.find("#btn_next_smallthumb").click(function(){
                    var currPos = Number($this.find("#small_slider_curr_pos").val());
                    var currPage = Number($this.find("#small_slider_curr_page").val());
                    var pageCnt = Number($this.find("#small_slider_page_cnt").val());
                    var lastImgCnt = Number($this.find("#small_slider_lastimg_cnt").val());
                    var goSliderPos = currPos;
                    if(currPage == pageCnt){
                        //console.log("Warning, last page !!!");
                        return false;
                    }
                    if((pageCnt-currPage) > 1 || ((pageCnt-currPage) == 1 && lastImgCnt == 0)){
                        goSliderPos=currPos+183;
                    }
                    if((pageCnt-currPage) == 1 && lastImgCnt != 0){
                        goSliderPos = currPos + 61*lastImgCnt;
                    }
                    currPage++;
                    $this.find("#small_slider_curr_page").val(currPage);
                    $this.find("#small_slider_curr_pos").val(goSliderPos);
                    $this.find('ul').css("transform","translate( -"+goSliderPos+"px, 0px) translateZ(0px)");
                    $this.find('ul').css("transition-duration","0.5s");
                    if(currPage == pageCnt){
                        $this.find("#btn_prev_smallthumb").show();
                        $this.find("#btn_next_smallthumb").hide();
                    }
                    //console.log("next button, go this position ::: " + goSliderPos);
                })
				return this;
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_categoryslider'] = {
		constructor:CategorySlider,
		attrName:'data-component-categoryslider'
	}
})(Core);

(function(Core){
	var Quantity = function(){
		'use strict';

		var $this, $input, $plusBtn, $minusBtn, $msg, currentQty = 1, maxLen = 1, args;
		var pattern = /[^0-9]/g;
		var setting = {
			selector:'[data-component-quantity]',
			input:'.label',
			plusBtn:'.plus',
			minusBtn:'.minus',
			attrName:'data-component-quantity',
			msg:'.msg'
		}

		var Closure = function(){}
		Closure.prototype = {
			setting:function(){
				var opt = Array.prototype.slice.call(arguments).pop();
				$.extend(setting, opt);
				return this;
			},
			init:function(){
				var _self = this;
				args = arguments[0];

				$this = $(setting.selector);
				$input = $this.find(setting.input);
				$plusBtn = $this.find(setting.plusBtn);
				$minusBtn =  $this.find(setting.minusBtn);
				$msg = $this.find(setting.msg);
				maxLen = (args.maxQuantity != 'null') ? args.maxQuantity : 100; // 최대수량 100
				currentQty = $input.val();


				$plusBtn.on('click', function(e){
					e.preventDefault();

					currentQty++;

					$input.val(currentQty);
					$(this).closest('.btn-qty').find('.minus').addClass('currentQty');
					$input.trigger('focusout');
				});

				$minusBtn.on('click', function(e){
					e.preventDefault();

					currentQty--;

					if(currentQty <= 1) {
						currentQty = 1;
						$(this).removeClass('currentQty');
					}
					$input.val(currentQty);
					$input.trigger('focusout');
				});

				$input.on({
					'keyup':function(e){
						var val = $input.val();
						if(pattern.test(val)){
							$input.val(val.replace(pattern, ''));
						}
					},
					'focusout':function(){
						currentQty = $(this).val();
						if(currentQty <= 1) currentQty = 1;

						if(parseInt(currentQty) > parseInt(maxLen)){
							$this.addClass('opt-msg-guide');
							$msg.text(maxLen + args.msg);
							currentQty = maxLen;
						}else{
							$this.removeClass('opt-msg-guide');
							$msg.text('');
						}

						$(this).val(currentQty);
						_self.fireEvent('change', this, [currentQty]);
					}
				});

				return this;
			},
			getQuantity:function(){
				return currentQty;
			},
			setQuantity:function(quantity){
				$input.val(quantity);
				currentQty = quantity;
			},
			setMaxQuantity:function(quantity){
				//console.log(quantity);
				if(args.maxQuantity == 'null' && quantity != null){
					maxLen = quantity;
				}else if(args.maxQuantity != 'null'){
					if(quantity != null){
						if(quantity < args.maxQuantity){
							maxLen = quantity;
						}else{
							maxLen = args.maxQuantity;
						}
					}else{
						maxLen = args.maxQuantity;
					}
				}else if(quantity == null){
					maxLen = 100;
				}

				if(quantity == 0){
					$msg.text(args.quantityStateMsg);
				}else{
					$msg.text('');
				}
			}
		}

		Core.Observer.applyObserver(Closure);
		return new Closure();
	}

	Core.Components['component_quantity'] = {
		constructor:Quantity,
		attrName:'data-component-quantity'
	}
})(Core);

(function(Core){
	'use strict';

	Core.register('module_inquiry', function(sandbox){
		var $appendListWrap = null;
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var args = arguments[0];

				var $appendListWrap = $this.find('[data-scrollarea]');
				var $scrollArea = $this.find(args['data-module-inquiry'].target);
				var $textField = $this.find('[data-component-textfield]');

				var currentPage = args['data-module-inquiry'].currentPage;
				var listPerPage = args['data-module-inquiry'].pageSize;
				var totalCount = args['data-module-inquiry'].totalCount;
				var totalPageCount = Math.ceil(totalCount / (listPerPage * currentPage));
				var ajaxIS = true;
				var subInquiryJson = args['data-sub-inquiry'];
				var arrSelectBox = [];
				var modal = UIkit.modal('#common-modal');
				var isOrderInquery = false;
				var objOrderData = {};

				var textComponent = sandbox.getComponents('component_textfield', {context:$this}, function(){
					this.addEvent('focusout', function(){
						var value = $(this).val();
						$this.find('#title').val(value);
						$this.find('#detail').val(value);
						objOrderData.value = value;

						if(isOrderInquery){
							$this.find('#detail').val(Handlebars.compile($('#inquery-order-list').html())(objOrderData));
						}
					});
				});

				var selectComponent = sandbox.getComponents('component_select', {context:$this}, function(i){
					var INDEX = i;
					arrSelectBox.push(this);
					this.addEvent('change', function(val){

						if(INDEX === 0){
							isOrderInquery = false;

							for(var key in subInquiryJson){
								if(key === val){
									var obj = {};
									obj.name = 'subInquiryType';
									obj.option = subInquiryJson[key];
									arrSelectBox[1].replaceSelectBox(Handlebars.compile($(args['data-module-inquiry'].template).html())(obj));
									break;
								}
							}


							/* 세금계산서문의 배송문의, 상품문의, A/S, 반품 취소 문의 일떼 자신이 주문한 상품 (orderItemList) 리스트를 불러온다. */
							if(val === 'BILL' || val === 'DELIVERY' || val === 'PRODUCT' || val === 'AS' || val === 'RETRUNCANCEL'){

								UIkit.modal.confirm("상품을 선택하시면 빠른 문의가 가능합니다.<br/>상품을 선택하시겠어요?", function(){
									var obj = {
										'mode':'template',
										'resultVar':'orderList',
										'proceedOrderList':''
									}

									switch(val){
										case 'PRODUCT' :
											obj.templatePath = '/account/partials/productItemListInquiry';
											obj.needWishList = 'Y';
											break;
										default :
											obj.templatePath = '/account/partials/orderItemListInquiry';
											obj.needOrderList = 'Y';
											break;
									}

									sandbox.utils.ajax('/processor/execute/customer_info', 'GET', obj, function(data){
										$('#common-modal').find('.contents').empty().append(data.responseText);
										modal.show();
									});
								});
							}
						}

					});
				});

				var scrollArea = sandbox.scrollController('[data-scrollarea]', $scrollArea[0], function(percent){
					if(totalPageCount > currentPage){
						if(ajaxIS && percent == 0){
							ajaxIS = false;
							currentPage++;

							var obj = {
								'page':currentPage,
								'mode':'template',
								'templatePath':'/account/partials/inquiryList',
								'resultVar':'inquiryDto'
							}

							sandbox.utils.ajax('/processor/execute/inquiry', 'GET', obj, function(data){
								ajaxIS = true;
								var $listFirst = $scrollArea.children().eq(0);
								$listFirst.after(data.responseText);
								scrollArea.setScrollTop($listFirst.offset().top);
							});
						}
					}else{
						/*console.log('문의하신 글 목록이 없습니다.');
						console.log('totalCount : '+totalCount+', listPerPage : '+listPerPage);*/
						scrollArea.destroy();
					}
				}, 'inquiry').setScrollTop($scrollArea.height());

				$this.find('.submit-btn').click(function(e){
					if(!selectComponent[0].getValidateChk() || !selectComponent[1].getValidateChk() || !textComponent.getValidateChk()) {
						e.preventDefault();
					}
				});

				/* common-modal orderList btn */
				$('#common-modal').find('.contents').on('click', 'a', function(e){
					var $this = $(this);
					isOrderInquery = true;
					objOrderData = {};

					if($this.attr('data-order-type') === 'products'){
						objOrderData.isInquery = false;
						objOrderData.name = $this.attr('data-order-name');
					}else if($this.attr('data-order-type') === 'orders'){
						objOrderData.isInquery = true;
					}

					objOrderData.orderId = $(this).attr('data-order-id');
					textComponent.focus();
					modal.hide();
				});

				$('#common-modal').find('.contents').on('mouseenter', 'a', function(e){
					$(this).addClass('active').siblings().removeClass('active');
				});


				/* 모바일 일때 푸터 없는 페이지 처리 */
				$('footer').addClass('no-footer');
				$(window).resize(function(){
					if($(window).width() <= 753 && !$('html').hasClass('uk-modal-page')){
						$('html').addClass('uk-modal-page');
						$appendListWrap.css('height', $(window).height() - ($('header').height() + 196));
					}else if($(window).width() > 753 && $('html').hasClass('uk-modal-page')){
						$('html').removeClass('uk-modal-page');
						$appendListWrap.removeAttr('style');
					}
				});
				$(window).trigger('resize');
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-inquiry]',
					attrName:['data-module-inquiry', 'data-sub-inquiry'],
					moduleName:'module_inquiry',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_reservation_product', function(sandbox){
		var $this, $btn, args, serviceMenData={}, reservationData={}, arrInventoryList, itemRequest, confirmData, selectedProduct, hasLocalNo, needMakeMap, areaMap = new Map();

		var loadStore = function(){
			if(!serviceMenData.hasOwnProperty('goodsCode')) return;
			if(serviceMenData.hasOwnProperty('localNo')) hasLocalNo = true;

			if(serviceMenData['goodsCode'] !== selectedProduct){
				selectedProduct = serviceMenData['goodsCode'];
				needMakeMap = true;
			} else{
				needMakeMap = false;
			}

			if(needMakeMap){
				//새로운 상품 재고 검색 시 맵 초기화
				//상품(사이즈) 별로 맵을 만든다
				// var keys = areaMap.keys();
				areaMap.forEach(function(item, key, mapObj){
					areaMap.set(key, 0);
				});
				// for(var index = 0; keys.length > index; index++ ){
				// 	areaMap.set(keys[index], 0);
				// }
			}
			//serviceMenData['mode'] = 'template';
			//serviceMenData['templatePath'] = '/page/partials/reservedInventory';
			//serviceMenData['cache'] = new Date().getTime();

			sandbox.utils.promise({
				//url:'/processor/execute/reserved_inventory',
				url:sandbox.utils.contextPath + '/reservedInventory',
				type:'GET',
				cache:false,
				data:serviceMenData
			}).then(function(data){
				// 은정 배포 후 적용 라인
				var inventoryList = data; //sandbox.utils.strToJson(data.replace(/&quot;/g, '"'));

				arrInventoryList = [];
				//API 호출시 마다 매장 수량 결과가 다시 오기 때문에 기존의 값을 지운다.
				inventoryList.forEach(function(a,i){
				    if(a.quantity > 0){
						arrInventoryList.push(a);
						if(needMakeMap){
							//새로운 사이즈로 검색한 경우에만 만들어 준다.
							//지역별 매장 개수 표시를 위해 직접 센다.
							if(areaMap.has(a.state)){
								var agencyCnt = areaMap.get(a.state);
								if(agencyCnt !== undefined || agencyCnt !== null){
									areaMap.set(a.state, ++agencyCnt);
								}
							}
						}
						// console.log('list:', arrInventoryList);
					}
				});

				//Hide size-chart when inventory list exist.
				$this.find('.size-select-txt').text($this.find('.reservation-product-size.checked').attr('typename'));
				if($this.find('#reservation-size-title-area').hasClass('uk-active')){
					$this.find('#reservation-size-title-area').click();
				}
				if(hasLocalNo || arrInventoryList.length > 0){
					$this.find('.location-search').empty().append(
						Handlebars.compile($("#store-list").html())({
							result:(arrInventoryList.length > 0)?true:false,
							list:arrInventoryList
						})
					);
				} else {
					// $this.find('.location-search').empty().append('<div style="padding:30px 0; text-align:center;"><p style="padding-top:35px;lign-height:18px;color:#838383">매장에 수량이 없는 상품입니다.</p></div>');
				    $this.find('.location-search').empty().append('<div class="less-items uk-text-center"><i class="ns-alert color-less"></i><br />매장에 수량이 없는 상품입니다.</div>');
				}

				//목록이 만들어 진 후에 '매장명''수량'에 대해 온클릭 이벤트를 걸어 소트 기능을 붙일 수 있음
				//매장명으로 정렬
				$this.find('.shipping-header .store-name').on('click', function(){
					Method.sortAgencyList('store');
				});
				//수량으로 정렬
				$this.find('.shipping-header .prd-cnt').on('click', function(){
					Method.sortAgencyList('quantity');
				});
                //지역별 대리점 선택 창 닫기
				$this.find('.btn-location-code-close').on('click', function(){
					$this.find('.location-code-wrap').removeClass('active');
					$this.find('.dim').removeClass('active');
				});

				//대리점 목록을 업뎃한다.
				Method.updateAreaAgencyCnt();
			}).fail(function(msg){
				defer = null;
				UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
			});
		}

		var Method = {
			moduleInit:function(){
				args = arguments[0];
				$this = $(this);
				$btn = $this.find('.reservation-btn');

				var currentDate = new Date();
				var reservationModal = UIkit.modal('#reservation-modal', {center:true});
				var disabledDays = [];
				var skuData = sandbox.getComponents('component_product_option', {context:$(document)}).getDefaultSkuData(); //sandbox.utils.strToJson($(this.getThis()).find("[data-sku]").attr("data-sku"));
				
				var radioComponent = sandbox.getComponents('component_radio', {context:$this}, function(i){
					var _self=this;
					var INDEX = i;

					this.addEvent('change', function(val){
						switch(INDEX){
							case 0 :
								for(var i=0; i<skuData.length; i++){
									for(var j=0; j<skuData[i].selectedOptions.length; j++){
										if($(this).attr('data-id') == skuData[i].selectedOptions[j]){
											serviceMenData['goodsCode'] = escape(skuData[i].externalId);
											loadStore();
											return;
										}
									}
								}
								break;
							case 1 :
								serviceMenData['localNo'] = val;
								$this.find('.location').text(val);
								$this.find('.dim').removeClass('active');
								$this.find('.location-code-wrap').removeClass('active');
								loadStore();
								break;
						}
					});
				});

				//지역 브랜치 맵 생성, 도시이름(한글)이 key가 되고 개수가 value
				$this.find('[data-area-info]').each(function(){
					areaMap.set($(this).attr('id'), 0);
				});

				$this.on('click', '.location-select', function(e){
					e.preventDefault();
					$this.find('.location-code-wrap').addClass('active');
					$this.find('.dim').addClass('active');
				});

				$this.on('click', '.reservation-apply', function(e){
					e.preventDefault();
					var $form = $(this).closest('form');
					var INDEX = $(this).closest('.shipping-list').index();

					confirmData = {};

					$this.find('input[name=fulfillmentLocationId]').val($(this).attr('data-locationid'));
					itemRequest = BLC.serializeObject($form);
					//사이즈 정보 추가
					itemRequest.size = $this.find('.reservation-product-size.checked').attr('typename');
					//가격에 콤마 + 원 추가
					itemRequest.retailprice = sandbox.rtnPrice(itemRequest.retailprice);
					itemRequest.saleprice = sandbox.rtnPrice(itemRequest.saleprice);
					itemRequest.price = sandbox.rtnPrice(itemRequest.price);

					/* 예약주문 확인 */
					//전화번호 정보 추가
					var phoneNumber = itemRequest['phone'], tempPhone, formatPhone;
					if(phoneNumber.length == 0){
						formatPhone = '정보없음';
					} else if(phoneNumber.length > 10){
						tempPhone = phoneNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
						formatPhone = tempPhone[1] + '-' + tempPhone[2] + '-' + tempPhone[3];
					}
          var isSignIn = (args.isSignIn === 'true')? true:false;
					confirmData.customer = {name:_GLOBAL.CUSTOMER.FIRSTNAME, phone:formatPhone, isSignIn:isSignIn}
					confirmData.storeInfo = arrInventoryList[INDEX];
					confirmData.product = itemRequest;
					disabledDays = arrInventoryList[INDEX].fulfillmentLocationCloseDates;

					// $this.find('.datepicker').datepicker('refresh');
					// $this.find('.datepicker-wrap').addClass('active');
					// $this.find('.dim').addClass('active');
					// $this.find('input[name=fulfillmentLocationId]').val($(this).attr('data-locationid'));

          //현재시간 확인
					var d = new Date(new Date().getTime());
					var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
					confirmData['reservedDate'] = date_format_str;

					//확인화면으로 넘김
					var reservationConfirmTemplate = Handlebars.compile($("#store-confirm").html())(confirmData);
					$this.find('.reservation-confirm-wrap').empty().append(reservationConfirmTemplate);
					$this.find('.reservation-confirm-wrap').addClass('active');
					$this.find('input[name=reservedDate]').val(confirmData['reservedDate']);
					itemRequest['reservedDate'] = confirmData['reservedDate'];
				});

				$this.on('click', '.reservation-confirm-btn', function(e){
					e.preventDefault();
					var _self = this;
					sandbox.getModule('module_header').setModalHide(true).setLogin(function(){
						Method.requestReservation.call(_self);
					});
				});

				$this.on('click', '.cencel-btn', function(e){
					e.preventDefault();
					$this.find('.reservation-confirm-wrap').removeClass('active');
					$this.find('.datepicker').removeClass('active');
					$this.find('.dim').removeClass('active');
				});

				//datapicker
				$this.find('.datepicker').datepicker({
					dateFormat: "yy-mm-dd",
					minDate:new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
					onSelect:function(date){
						confirmData['reservedDate'] = date;
						$this.find('.timepicker').focus();
					},
					beforeShowDay:function(date){
						var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
						return [ disabledDays.indexOf(string) == -1 ];
					}
				});

				//timepicker
				$this.find('.timepicker').focusout(function(e){
					var _self = $(this);
					setTimeout(function(){
						var time = _self.val();
						confirmData['reservedDate'] += ' ' + time + ':00';
					},200);
				});

				$this.find('.btn-time-submit').click(function(e){
					e.preventDefault();

					if(!confirmData['reservedDate']){
						UIkit.notify('방문 날짜와 시간을 선택해 주세요.', {timeout:3000,pos:'top-center',status:'warning'});
						return;
					}

					$this.find('.datepicker-wrap').removeClass('active');
					$this.find('.dim').removeClass('active');

					var reservationConfirmTemplate = Handlebars.compile($("#store-confirm").html())(confirmData);
					$this.find('.reservation-confirm-wrap').empty().append(reservationConfirmTemplate);
					$this.find('.reservation-confirm-wrap').addClass('active');
					$this.find('input[name=reservedDate]').val(confirmData['reservedDate']);
					itemRequest['reservedDate'] = confirmData['reservedDate'];
				});

				//dim click addEvent
				$this.find('.dim').off().on('click', function(e){
					$this.find('.reservation-confirm-wrap').removeClass('active');
					$this.find('.datepicker').removeClass('active');
					$this.find('.dim').removeClass('active');
					$this.find('.location-code-wrap').removeClass('active');
				});
			},
			updateAreaAgencyCnt:function(){
				$this.find('[data-area-info]').each(function(){
					$this.find('#area-branch-cnt-' + $(this).attr('value')).text(areaMap.get($(this).attr('id')));
				});
			},
			sortAgencyList:function(key){
				// console.log('key:', key);
				if(arrInventoryList.length > 0){
					if(key==='store'){
						arrInventoryList.sort(function(a,b){
							return a.name < b.name ? -1 : a.name > b.name ? 1:0;
						});
					} else {
						//quantity
						arrInventoryList.sort(function(a,b){
							return b['quantity'] - a['quantity'];
						});
					}

					$this.find('.location-search').empty().append(
						Handlebars.compile($("#store-list").html())({
							result:(arrInventoryList.length > 0)?true:false,
							list:arrInventoryList
						})
					);

					//대리점 목록을 업뎃한다.
					Method.updateAreaAgencyCnt();
				}
			},
			requestReservation:function(){
				var $form = $(this).closest('form');
				itemRequest = BLC.serializeObject($form);

				/* 예약주문 필수값 처리 */
				// if(!itemRequest.reservedDate || itemRequest.reservedDate === ''){
				// 	UIkit.notify('방문 날짜/시간를 선택해주세요', {timeout:3000,pos:'top-center',status:'danger'});
				// 	return false;
				// }

				sandbox.setLoadingBarState(true);
				BLC.ajax({
					url:$form.attr('action'),
					type:"POST",
					dataType:"json",
					data:itemRequest
				},function(data){
					if(data.error){
						sandbox.setLoadingBarState(false);
						UIkit.modal.alert(data.error);
					}else{
						/*var reservationComplateTemplate = Handlebars.compile($("#store-complate").html())();
						$('#reservation-modal').find('.contents').empty().append(reservationComplateTemplate);*/
						_.delay(function(){
							window.location.assign( sandbox.utils.contextPath + '/checkout' );
						}, 300);
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-reservation-product]',
					attrName:'data-module-reservation-product',
					moduleName:'module_reservation_product',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_thedrawfaq', function(sandbox){
		var $that;
		var closingMSTime = 0, drawStatus, discountTimer, before60Mins=60*60*1000, before1Min=60*1000 ;
		var Method = {
			moduleInit:function(){
				
				$('.page-scroll').bind('click', function(event) {	
					if ( $(window).width() < 870 ){
						var $anchor = $(this);
						$('html, body').stop().animate({
							scrollTop: $($anchor.attr('href')).offset().top - 98
						}, 1000/*, 'easeInOutExpo'*/);
						event.preventDefault();
					}else {
						var $anchor = $(this);
						$('html, body').stop().animate({
							scrollTop: $($anchor.attr('href')).offset().top -98
						}, 1000/*, 'easeInOutExpo'*/);
						event.preventDefault();	
					}
				});

			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-thedrawfaq]',
					attrName:'data-module-thedrawfaq',
					moduleName:'module_thedrawfaq',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_returnorder', function(sandbox){
		var Method = {
			$that:null,
			$allCheck:null, // 팝업 전체 선택 체크박스
			$itemList:null, // 선택 해서 popup에 노출되는 아이템 리스트
			$popModal:null,
			$returnBtn:null,
			$returnItemList:null,
			$popSubmitBtn:null,
			$beforeAddress:null,
			$refundAccountInfo:null, //환불정보 입력 폼
			$newAddress:null,
			isAblePartialVoid:null,
			deliverySearch:null,
			isNewAddress:false,
			isDoubleClickFlag:true,
			isCheckeds:false,
			isRefundAccount:false,
			isMid:false,
			isFdk:false,
			// isSearchAddress:true,

			moduleInit:function(){
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);

				var $this = $(this);
				Method.$that = $this;
				Method.$popModal = UIkit.modal("#popup-return");
				Method.$returnBtn = $this.find('[data-return-btn]');
				Method.$popCuntBtn = Method.$popModal.find('[data-cunt-submit]');
				Method.$popSubmitBtn = Method.$popModal.find('[data-return-submit]');
				Method.$popAddressModal = UIkit.modal("#popup-customer-address", {modal: false});
				Method.$beforeAddress = Method.$popModal.dialog.find('[data-before-return-address]');
				Method.$newAddress = Method.$popModal.dialog.find('[data-new-return-address]');
				Method.$refundAccountInfo = Method.$popModal.find('[data-refund-account-info]');

				// 반품 사유 변경시
				$this.find('[data-return-reason-type]').on("change", function(){
					Method.updatePaymentInfo( false );
				});

				// 전체 선택 체크박스 처리
				Method.$allCheck = Method.$popModal.find('input[name="check-all"]');
				Method.$allCheck.on("change", Method.changeAllCheck );

				// 주문별 전체 반품
				$this.find('[data-return-order-btn]').on('click', function(e){
					e.preventDefault();
					// console.log($(this).closest('[data-return-order]').find('[data-return-order-item]'))
					// Method.openReturnOrderPopup( $(this).closest('[data-return-order]').find('[data-return-order-item]') );
					Method.openReturnOrderPopup($(this).data("orderid"));
				});



				// 반품 신청 노출 여부
				// $this.find('.order-item-wrap').each(function (i) {
				//	var arrWrap = [];
				//	$(this).find('.item-info').each(function (i) {
				//		var arr = [];
				//		$(this).find('ul li').each(function (i) {
				//			arr.push($(this).find('[data-availablequantity]').data('availablequantity') == 0);
				//		});
				//		arrWrap = _.every(arr, Boolean)
				//	});
				//	if (!arrWrap) $(this).find('.item-btn').show();
				// });

				// 반품 신청 노출 여부
				$this.find('.order-item-wrap').each(function (i) {
				var arrWrap = false;
				$(this).find('.item-info').each(function (i) {
					$(this).find('ul li').each(function (i) {
						if( $(this).find('[data-availablequantity]').data('availablequantity') > 0){
						 arrWrap = true;
						 return false;;
						}
					});
				//	arrWrap = _.every(arr, Boolean)
				});
				    if (arrWrap){
						   $(this).find('.item-btn').show();
						}
				});


				// 배송지 선택 버튼
				$this.find('[data-customer-address-btn]').on('click', function(e){
					e.preventDefault();
					Method.$popAddressModal.show();
				});

				// 배송지 선택 모듈 select 이벤트 호출( 배송지 선택했을때 호출됨 )
				Core.getComponents('component_customer_address', {context:$this}, function(){
					this.addEvent('select', function(data){
						Method.updateCustomerAddress( data );
						if( Method.$popAddressModal.isActive()){
							Method.$popAddressModal.hide();
						}
					})
				});

				var addressList = Method.$popAddressModal.find('[data-customer-address-select-btn]');
				// 등록되어있는 배송지가 없다면
				// TODO customer_address compnent에 size 추가 하자
				if( !Core.getModule('module_header').getIsSignIn()){
					$this.find('[data-return-address-type] a').removeClass('uk-active').eq(1).addClass('uk-active');
					Method.updateAddressInput();
					$this.find('[data-return-address-type]').hide();
					$this.find('#return-address').removeClass('uk-margin-top');

					// Method.isSearchAddress = false;

					$this.find('.input-textfield.value > label').hide();

					var nonmemberinfo = $this.find('#NonMemberInfo');
					var newReturnAddress = $this.find('#new-return-address');
					newReturnAddress.find('input[name="addressFirstName"]').val(nonmemberinfo.data('name'));
					newReturnAddress.find('input[name="addrsessPhone"]').val(nonmemberinfo.data('phonenumber'));
					newReturnAddress.find('input[name="addressLine1"]').val(nonmemberinfo.data('addressline1'));
					newReturnAddress.find('input[name="addressLine2"]').val(nonmemberinfo.data('addressline2'));
					newReturnAddress.find('input[name="addressPostalCode"]').val(nonmemberinfo.data('addresspostalcode'));
					newReturnAddress.find('input[name="addressCity"]').val(nonmemberinfo.data('addresscity'));
				}else{
					// 첫번째 주소 선택
					$this.find('[data-return-address-type]').show();
					$this.find('#return-address').addClass('uk-margin-top');
					addressList.eq(0).trigger('click');
				}

				// 주소 입력 처리
				var $zipCodeInput = $(this).find('[name="addressPostalCode"]');
				var $cityInput = $(this).find('[name="addressCity"]');

				Method.deliverySearch = sandbox.getComponents('component_searchfield', {context:$this, selector:'.search-field', resultTemplate:"#address-find-list"}, function(){
					// 검색된 내용 선택시 zipcode 처리
					this.addEvent('resultSelect', function(data){
						var zipcode = $(data).data('zip-code5');
						var city = $(data).data('city');
						var doro = $(data).data('doro');

						var $input = this.getInputComponent().setValue( '(' + zipcode + ')' + city + doro );

						$zipCodeInput.val( zipcode );
						$cityInput.val( city.split(' ')[0] );
					});
				});

				// 배송지 입력 타입 버튼 선택시
				$this.find('[data-return-address-type]').on('show.uk.switcher', function(){
					Method.updateAddressInput();
				});

				// 수거메모 선택시
				$this.find('[data-personal-message-select]').on('change', Method.updatePersonalMessage )

				Method.$popSubmitBtn.on('click', Method.returnOrderSubmit );
			},

			updatePersonalMessage:function(e){
				e.preventDefault();
				var $msgContainer = Method.$popModal.dialog.find('[data-personal-message]');
				var $personalMsg = $msgContainer.find('[name="personalMessageText"]');

				var value = $(this).val();
				if(value == ''){
					$personalMsg.val('');
					$msgContainer.addClass('uk-hidden');
				}else if(value == 'dt_1'){
					// 직접입력일 경우
					$personalMsg.val('');
					$msgContainer.removeClass('uk-hidden');
				}else{
					//$personalMsg.val( $(this).find("option:selected").val() + "||" + $(this).find("option:selected").text() );
					$personalMsg.val( $(this).find("option:selected").text());
					$msgContainer.addClass('uk-hidden');
				}
			},

			// 반품 신청 팝업
			openReturnOrderPopup:function( orderId ){

				var $modal = Method.$popModal;

				var $modalForm = $modal.dialog.find('form');
				Method.$itemList = $modal.dialog.find('[data-return-reason-list]>ul');

				var $reasonItem = $modal.dialog.find('[data-return-reason-item]');
				var $returnAddress = $modal.dialog.find('input[name="return-address"]');

				Method.$itemList.empty();

				// sandbox.getModule('module_header').reDirect().setLogin(function(){
					sandbox.utils.promise({
						url:sandbox.utils.contextPath + '/account/orders/returnable/request/' + orderId,
						method:'GET',
					}).then(function(data){
						var defer = $.Deferred();

						$modal.find('#returnReasonItem').remove();
						$modal.find('[data-return-reason-list]').append(data);

						/*
						isAble 				: 주문 취소, 반품 가능 여부
						isRefundAccount 	: 환불 계좌 필요 여부
						isAblePartial   	: 부분 취소, 반품 가능 여부
						*/
						Method.isAblePartialVoid = $modal.find('#returnReasonItem').data('isablepartial');
						Method.isRefundAccount = $modal.find('#returnReasonItem').data('isrefundaccount');
						Method.isFdk = $modal.find('#returnReasonItem').data('isfdk');
						Method.isMid = $modal.find('#returnReasonItem').data('ismid');

						// 매입전 주문 반품 신청 시 예외처리
						if (Method.isFdk == true && Method.isMid == false) {
							$modal.find('.exception_request').show();
							$modal.find('.input-checkbox').css({'opacity':0, 'padding-left':0});
							$modal.find('.dynamic-form').hide();
							$modal.find('#panel-box').hide();
						}

						// 환불 계좌 필요 여부
						if (Method.isRefundAccount) {
							Method.$refundAccountInfo.show();
						} else {
							Method.$refundAccountInfo.hide();
						}

						var $newItem = $reasonItem.removeClass("uk-hidden");
						var $info = $newItem.find('[return-reason-info]');
						var $thumb = $newItem.find('[return-reason-thumb]');
						var $item = $modal.find('[data-return-reason-list]>ul>li');

						$item.each(function () {
							// 반품 가능 수량
							var returnableQuantity = $(this).find('input[name="returnableQuantity"]').val();
							// 반품 된 수량
							var returnedQuantity = $(this).find('input[name="returnedQuantity"]').val();

							// 복사된 정보중 수량은 삭제
							$info.find('.opt.quantity').remove();

							if( Method.isAblePartialVoid ){
								var $quantity = $(this).find('[return-reason-partials-quantity]');
								for( var i=1; i<=returnedQuantity; i++){
									$quantity.find("select").removeAttr('disabled').append( '<option value="' + i + '">' + i +'</option>');
								}
							}else{
								var $quantity = $(this).find('[return-reason-order-quantity]').show();
								$quantity.find('input[name="quantity"]').removeAttr('disabled').val(returnedQuantity);
								$quantity.find('[data-quantity]').text(returnedQuantity);
							}
						});

						// 팝업에서 수량 셀렉트 변경시
						//Method.$itemList.find('select').off('change').on("change", Method.updateStatus );

						Method.updatePaymentInfo( false );

						// 부분반품 불가  / 신청가능
						if( Method.isAblePartialVoid ){
							Method.updateSubmitBtn( false );
						} else {
							Method.updateSubmitBtn( true );
						}

						//Method.updateStatus();

						if( Method.isAblePartialVoid ){
							// console.log( '부분 반품' );
							$modal.find('[data-return-reason-list]>ul>li').find('input[type="checkbox"]').on("change", Method.changeItemCheck );

							// $modal.find('[data-return-reason-list]>ul>li').find('select').on("change", Method.updateStatus );

							Method.updateInfoByIsPartial( true );
							// Method.updateSubmitBtn( true );

							// 전체 취소로 초기화
							Method.$allCheck.prop('checked', false ).trigger('change');
						}else{
							// console.log( '전체 반품' );
							Method.updateInfoByIsPartial( false );
							// Method.updateSubmitBtn( true );
							// Method.updateStatus();
						}

						$modal.show();
						sandbox.validation.reset( $modal.dialog.find('form'));

						sandbox.getComponents('component_select', {context:$modal.dialog}, function(i){
							this.addEvent('change', function(val, $selected, index){
								if($(this).attr('name') == 'accountCode'){
									$(this).closest('.input-btn-group').find('input[name=accountName]').val($selected.text());
								}
								Method.updatePaymentInfo( false );
							});
						});

						sandbox.moduleEventInjection(data, defer);

						Method.$itemList = $modal.dialog.find('[data-return-reason-list]>ul');

						return defer.promise();
					}).then(function(data){
						// UIkit.modal.alert("취소 되었습니다.").on('hide.uk.modal', function() {
						// 	window.location.reload();
						// });
					}).fail(function(error){
						// if(error){
						// 	UIkit.modal.alert(error).on('hide.uk.modal', function() {
						// 		window.location.reload();
						// 	});
						// }else{
						// 	window.location.reload();
						// }
					});
				// });
			},

			// 아이템 단위로 수량 선택할 수 있는 select 노출 처리
			showHideAvailabeQuantity:function( $checkbox ){
				var $cancelQuantity = $checkbox.closest('li').find('[return-reason-partials-quantity]');
				if( $checkbox.prop('checked')){
					$cancelQuantity.slideDown('fast');
				}else{
					$cancelQuantity.slideUp('fast');
				}
			},

			// 부분 반품 가능 여부에 따른 정보 노출 처리
			updateInfoByIsPartial:function( $bool ){
				var $checkAllContainer = Method.$popModal.dialog.find('.container.check-all');
				var $checkboxs = Method.$itemList.find('.checkbox');
				var $info = Method.$popModal.dialog.find('[data-info-text]');

				if( $bool ){
					$checkAllContainer.show();
					$checkboxs.show();
					$info.show();
					Method.$popSubmitBtn.text('선택상품 주문 반품');
				}else{
					$checkAllContainer.hide();
					$checkboxs.hide();
					$info.hide();
					Method.$popSubmitBtn.text('주문 반품');
				}
			},

			// 체크 여부에 따른 리턴 버튼 활성화 처리
			updateRetunBtnStatus:function(){
				var isChecked =  Method.$that.find('[data-return-order]').find('[data-return-order-list]').find('input[type="checkbox"]').is(':checked');
				if( isChecked ){
					Method.$returnBtn.removeAttr('disabled').removeClass('disabled');
					Method.$returnBtn.text('부분 반품하기');
				}else{
					Method.$returnBtn.attr('disabled','true').addClass('disabled');
					Method.$returnBtn.text('부분 반품할 상품을 선택해주세요');
				}
			},

			// modal에서 전체 선텍
			changeAllCheck:function(e){
				var isCheck = $(this).prop('checked');

				// console.log('Method.$itemList : ', Method.$itemList.find('>li'))

				Method.$itemList.find('>li').each( function(){
					$(this).find('input[type="checkbox"]').prop( 'checked', isCheck );
					if( isCheck ){
						// 전체 수량을 선택 시켜 노출
						$(this).find('select[name="quantity"]').val( $(this).find('[data-quantity]').text()).trigger('update');
					}
					Method.showHideAvailabeQuantity( $(this).find('input[type="checkbox"]') );
				});
				Method.updateStatusChecked();

				if (Method.isCheckeds) {
					Method.updatePaymentInfo( false );
					Method.isCheckeds = false;
				}
			},

			// modal에서 체크박스 선택시
			changeItemCheck:function(e){
				Method.showHideAvailabeQuantity( $(this ));
				$(this).closest("li").find('select[name="quantity"]').val( $(this).closest("li").find('select[name="quantity"]') ).trigger('update');

				// Method.updateCheckAll();

				Method.updateStatusChecked();
				if (Method.isCheckeds) {
					Method.updatePaymentInfo( false );
					Method.isCheckeds = false;
				}
			},

			// 아이템 체크박스 변경시 전체 선택 체크박스 상태처리
			updateCheckAll:function(){
				if( Method.$itemList.find('>li').length == Method.$itemList.find('>li').find('input[type="checkbox"]:checked').length ){
					Method.$allCheck.prop( 'checked', true );
				}else{
					Method.$allCheck.prop( 'checked', false );
				}
			},

			// 리턴 상황에 따른 가격정보와
			updatePaymentInfo:function( $bool ){
				var $paymentContainer = Method.$popModal.find('[data-payment-conatiner]');
				$paymentContainer.hide();

				if( $bool ){
					$paymentContainer.show();
					Method.$popCuntBtn.hide();
				}else{
					$paymentContainer.hide();
					Method.$popCuntBtn.show();
				}
			},

			updateStatusChecked:function(){
				var $modal = Method.$popModal;
				// 부분반품이 가능한 경우
				if( Method.isAblePartialVoid ){
					var $items = Method.$itemList.find('>li').find('input[type="checkbox"]:checked').closest('li');
				}else{
					var $items = Method.$itemList.find('>li');
				}

				if( $items.length > 0 ){
					if (Method.isDoubleClickFlag) {
						Method.updateSubmitBtn( true ); // 체크박스 선택 가능
						Method.isDoubleClickFlag = false;
					}
				} else {
					// 아이템 없을때
					// 부분 취소, 반품 가능 여부
					var isablepartial = true;

					if (!isablepartial) {
						Method.updateSubmitBtn( true );
					} else {
						if (!Method.isDoubleClickFlag) {
							Method.updateSubmitBtn( false ); // 체크박스 선택 불가능
							Method.isDoubleClickFlag = true;
						}
					}
				}
			},

			// 버튼 활성화/비활성화 처리
			updateSubmitBtn:function( $bool ){
				var $paymentContainer = Method.$popModal.find('[data-payment-conatiner]');

				var _bool = [];
				Method.$popModal.find('[data-return-reason-list]>ul>li').each( function(){
					_bool.push($(this).find('input[type="checkbox"]').attr('disabled') == 'disabled')
				});
				var _disabledCheck = _.every(_bool, Boolean); // true

				if (_disabledCheck) {
					Method.$allCheck.attr('disabled', true).closest('.input-checkbox').addClass('disabled');
				} else {
					Method.$allCheck.attr('disabled', false).closest('.input-checkbox').removeClass('disabled');
				}

				if ($bool) {
					$paymentContainer.hide();
					Method.$popCuntBtn.show();

					// 총 결제금액 버튼
					Method.$popCuntBtn.on('click', function (e) {
						e.preventDefault();
						var $modalForm = Method.$popModal.dialog.find('form');
						sandbox.validation.validate($modalForm);
						if( sandbox.validation.isValid($modalForm)){
							Method.updatePaymentInfo(true);
							Method.updateStatus();
						}
					});

					Method.$popSubmitBtn.removeAttr('disabled').removeClass('disabled');
					Method.$popCuntBtn.removeAttr('disabled').removeClass('disabled');
				} else {
					// console.log('버튼 활성화/비활성화 처리 false')
					Method.$popSubmitBtn.attr('disabled','true').addClass('disabled');
					Method.$popCuntBtn.attr('disabled', 'true').addClass('disabled');
					Method.$popCuntBtn.off();
				}
			},

			// 취소 가격 및 추가 정보 입력 여부 처리
			updateStatus:function(){
				//console.log('updateStatus');
				var $modal = Method.$popModal;

				if( Method.isAblePartialVoid ){
					var $items = Method.$itemList.find('li').find('input[type="checkbox"]:checked').closest('li');
				} else {
					var $items = Method.$itemList.find('li');
				}

				var $form = $modal.dialog.find('form');
				var action = $form.attr('action') + '/calculator';
				var $itemForm = Method.getFormByPartialItem( $items );
				var param = $itemForm.serialize() + '&' + $form.serialize();

				if( Method.isAblePartialVoid ){
					if( !Method.getIsAvailablePartialReturn()){
						param += '&entireReturn=true';
					}
				}else{
					param += '&entireReturn=true';
				}

				// console.log('param--', param)
				Core.Utils.ajax( action, 'POST', param, function(data){

					var data = sandbox.rtnJson(data.responseText, true);
					var $paymentList = $modal.find('[data-payment-list]');
					var $paymentItem = $modal.find('.uk-hidden[data-payment-item]');
					$paymentList.empty();

					if( !data ){
						var $newItem = Method.getReplacePaymentItem( $paymentItem, '서버 통신 오류' );
						$newItem.appendTo( $paymentList );
					}

					var result = data.result;

					if( result == true ){
						// 반품 배송비
						var returnFgChargeFeeTotal = data.ro.returnFulfillmentFee;

						// 추가 배송비
						var parentFgChargeFeeTotal = data.ro.originFulfillmentChargeFee;

						// 총 환불 예정 금액
						var refundAmountTotal = data.ro.totalRefundableAmount;

						// 결제 정보
						if( returnFgChargeFeeTotal != null ){
							// 반품 배송비
							if( returnFgChargeFeeTotal != null && returnFgChargeFeeTotal.amount > 0 ){
								var $newItem = Method.getReplacePaymentItem( $paymentItem, "반품 배송비 : ", returnFgChargeFeeTotal.amount );
								$newItem.appendTo( $paymentList );
							}

							// 총 환불 예정 금액
							if( refundAmountTotal != null ){
								var $newItem = Method.getReplacePaymentItem( $paymentItem, "총 환불 예정 금액 : ", refundAmountTotal.amount );
								$newItem.appendTo( $paymentList );
							}

							// 추가 배송비
							if( parentFgChargeFeeTotal != null && parentFgChargeFeeTotal.amount > 0 ){
								var $newItem = Method.getReplacePaymentItem( $paymentItem, "추가 배송비 : ", parentFgChargeFeeTotal.amount );
								$newItem.appendTo( $paymentList );
							}
						} else {
							var $newItem = Method.getReplacePaymentItem( $paymentItem, 'PAYMENTS 정보 오류' );
							$newItem.appendTo( $paymentList );
						}

						Method.isCheckeds = true;
					}else{
						// var $newItem = Method.getReplacePaymentItem( $paymentItem, data.errorMsg );
						// $newItem.appendTo( $paymentList );
						Method.updatePaymentInfo( false );
						Method.isCheckeds = false;
						UIkit.modal.alert(data.errorMsg);
					}
				}, true);
			},

			// 계산 결과 dom 생성
			getReplacePaymentItem:function( $base, type, amount ){
				var $newItem = $base.clone().removeClass("uk-hidden");
				$newItem.find('[data-type]').text( type );
				if( amount ){
					$newItem.find('[data-amount]').text( sandbox.utils.price(amount) );
				}else{
					$newItem.find('[data-amount]').text( sandbox.utils.price(0) );
				}
				return $newItem;
			},

			// 선택된 아이템의 order dom
			getOrderElementByChecked:function($checkbox){
				var $order = $checkbox.closest('[data-return-order]');
				return {
					order : $order,
					allCheckbox : $order.find('input[name="check-all"]'),
					itemList : $order.find('[data-return-order-list]')
				}
			},

			// 배송지 선택으로 주소 입력시
			updateCustomerAddress:function( data ){
				var $target = Method.$popModal.dialog.find('[data-before-return-address]');
				if( $target.find('[data-user-name]').length > 0 ){
					$target.find('[data-user-name]').html($.trim(data.fullName));
				}

				if( $target.find('[data-phone]').length > 0 ){
					$target.find('[data-phone]').html($.trim(data.phoneNumber));
				}

				if( $target.find('[data-postalCode]').length > 0 ){
					$target.find('[data-postalCode]').html($.trim(data.postalCode));
				}

				if( $target.find('[data-address1]').length > 0 ){
					$target.find('[data-address1]').html($.trim(data.addressLine1));
				}

				if( $target.find('[data-address2]').length > 0 ){
					$target.find('[data-address2]').html($.trim(data.addressLine2));
				}

				// 변경된 값 input 에 적용
				$target.find('input[name="addressFirstName"]').val($.trim(data.fullName));
				$target.find('input[name="addressPhone"]').val($.trim(data.phoneNumber));
				$target.find('input[name="addressLine1"]').val($.trim(data.addressLine1));
				$target.find('input[name="addressLine2"]').val($.trim(data.addressLine2));
				$target.find('input[name="addressPostalCode"]').val($.trim(data.postalCode));
				$target.find('input[name="addressCity"]').val($.trim(data.city));
			},

			// 실제 전송될 주소 정보를 설정하기 위해 불필요 정보 disabled
			updateAddressInput:function(){
				if( Method.$beforeAddress.hasClass('uk-active')){
					Method.isNewAddress = false;
					Method.$beforeAddress.find('input').attr('disabled', false );
					Method.$newAddress.find('input').attr('disabled', true );
				}else{
					Method.isNewAddress = true;
					Method.$beforeAddress.find('input').attr('disabled', true );
					Method.$newAddress.find('input').attr('disabled', false );
				}
			},

			// 선택된 아이템을 하나의 form으로 만들어 리턴
			getFormByPartialItem:function( $items ){
				var $itemForm = $('<form></form>');

				//체크되어있는 아이템 가져와 form에 append
				$items.each( function(){
					var quantity = $(this).find('[name="quantity"]:enabled').val();
					var $newItem = $(this).clone();

					$newItem.find('[name="quantity"]').val(quantity);
					$newItem.appendTo( $itemForm );
				});
				return $itemForm;
			},

			returnOrderSubmit:function(e){
				e.preventDefault();

				var $modalForm = Method.$popModal.dialog.find('form');
				sandbox.validation.validate( $modalForm );

				if( sandbox.validation.isValid( $modalForm )){

					// if (Method.isSearchAddress) {
						if( Method.isNewAddress ){
							if( !Method.deliverySearch.getValidateChk() ){
								UIkit.modal.alert("검색을 통하여 배송지를 입력해주세요.");
								return false;
							}
						}
					// }

					//console.log( $modalForm.attr('action'))
					UIkit.modal.confirm('반품 하시겠습니까?', function(){
						// 주소에 노출된 우편번호 제거
						if( Method.isNewAddress ){
							var $addressLine1 = $modalForm.find('[name="addressLine1"]:visible');
							if( $addressLine1 ){
								var address1 = $addressLine1.val().split(')');
								if( address1.length > 1 ){
									$addressLine1.val( $.trim( address1[1]) );
								}
							}
						}

						var isPartial = false;
						var param = '';

						if( Method.isAblePartialVoid ){
							isPartial = true;
							if( !Method.getIsAvailablePartialReturn()){
								isPartial = false;
							}
						}

						// 부분 취소일때는 상품별
						if( isPartial ){
							var $itemForm = Method.getFormByPartialItem( Method.$itemList.find('>li').find('input[type="checkbox"]:checked').closest('li') );
							param = $itemForm.serialize() +'&'+ $modalForm.serialize();
						}else{
							var $itemForm = Method.getFormByPartialItem( Method.$itemList.find('>li'));
							param = $itemForm.serialize() +'&'+ $modalForm.serialize();
							param += '&entireReturn=true';
						}

						// Method.updateSubmitBtn( false );

						Core.Utils.ajax( $modalForm.attr('action'), 'POST', param, function(data){
							var data = sandbox.rtnJson(data.responseText, true);
							var result = data['result'];
							if( result == true ){
								if( _GLOBAL.MARKETING_DATA().useGa == true ){
									var marketingOption = {
										orderType : 'RETURN',
										orderId : data.ro.returnOrderId
									};
									Core.ga.processor( marketingOption );
								}
								UIkit.modal.alert("반품이 완료 되었습니다.").on('hide.uk.modal', function() {
									window.location.href = sandbox.utils.contextPath + "/account/orders/returned";
								});
							}else{
								UIkit.modal.alert(data['errorMsg']).on('hide.uk.modal', function() {
									window.location.reload();
								});
							}
							//$('.customer-contents').replaceWith($(data.responseText).find('.customer-contents'));

						},true)

					}, function(){},
					{
						labels: {'Ok': '확인', 'Cancel': '취소'}
					});
				}

			},

			// 부분반품 가능 여부 판단
			getIsAvailablePartialReturn:function(){

				var itemList = {};
				var $checkedList = Method.$itemList.find('>li').find('input[type="checkbox"]:checked').closest('li');

				$checkedList.each( function(){
					isAvailable = false;
					var orderItemSize = $(this).find('input[name="orderItemSize"]').val();
					var ableEntireReturn = $(this).find('input[name="ableEntireReturn"]').val();
					var returnableQuantity = $(this).find('input[name="returnableQuantity"]').val();
					var returnedQuantity = $(this).find('input[name="returnedQuantity"]').val();
					var orderId = $(this).find('input[name="orderId"]').val();
					var quantity = $(this).find('[name="quantity"]:not(:disabled)').val();

					if( itemList[orderId] == undefined ){
						itemList[orderId] = {};
						itemList[orderId].ableEntireReturn = ableEntireReturn;
						itemList[orderId].orderItemSize = orderItemSize;
						itemList[orderId].items = [];
					}

					var itemObj = {
						returnedQuantity : Number(returnedQuantity),
						returnableQuantity : Number(returnableQuantity),
						quantity : Number(quantity)
					}

					itemList[orderId].items.push( itemObj );
				})

				//console.log( itemList );

				var isAvailable = false;
				$.each( itemList, function(){
					// 전체 반품이 불가능하거나 현재 주문의 전체 아이템 사이즈와 선택된 아이템 사이즈가 같지 않다면
					// console.log( this.orderItemSize + ' : ' + this.items.length );
					if( this.ableEntireReturn == "false" || this.orderItemSize != this.items.length ){
						//console.log( '전체 반품이 불가능하거나 현재 주문의 전체 아이템 사이즈와 선택된 아이템 사이즈가 같지 않다면')
						isAvailable = true;
					}else{
						$.each( this.items, function(){
							//console.log( this.returnableQuantity + ' : ' + this.quantity);
							if( this.returnedQuantity != 0 || this.returnableQuantity != this.quantity ){
								//console.log('반품된 수량이 있거나 전체 수량이 아닌것 있음');
								isAvailable = true;
								return;
							}
						})
					}

					if( isAvailable == false ){
						//console.log('부분반품 불가능한 order가 있음');
						return false;
					}
				})
				return isAvailable;
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-returnorder]',
					attrName:'data-module-returnorder',
					moduleName:'module_returnorder',
					handler:{
						context:this,
						method:Method.moduleInit
					}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_dynamicentity', function(sandbox){
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var $submitInput = $(this).find('input[name=_find]');
				var search = sandbox.getComponents('component_searchfield', {context:$this}, function(){
					this.addEvent('submit', function(target, val){
						$submitInput.val(val);
						target.submit();
					});
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-dynamicentity]',
					attrName:'data-module-dynamicentity',
					moduleName:'module_dynamicentity',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_returnorder_history', function(sandbox){
		var Method = {
			moduleInit:function(){
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);

				var $this = $(this);

				$this.find('button.return-cancel-item').on("click", Method.returnOrderCancelItem );
			},

			// 반품 취소 요청
			returnOrderCancelItem:function(e){
				e.preventDefault();
				var $form = $(this).closest("form");

				UIkit.modal.confirm('반품을 취소 하시겠습니까?', function(){
					Core.Utils.ajax($form.attr("action"), "POST", $form.serialize(), function(data){

						UIkit.modal.alert("반품이 취소 되었습니다.").on('hide.uk.modal', function() {
							window.location.reload();
						});							

						/*
						var data = sandbox.rtnJson(data.responseText, true);
						var result = data['result'];
						if( result == true ){
							UIkit.modal.alert("반품이 취소 되었습니다.").on('hide.uk.modal', function() {
								window.location.reload();
							});							
						}else{
							UIkit.modal.alert(data['errorMsg']).on('hide.uk.modal', function() {
								window.location.reload();
							});
						}
						*/
					});
				}, function(){},
				{
					labels: {'Ok': '확인', 'Cancel': '취소'}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-returnorder-history]',
					attrName:'data-module-returnorder-history',
					moduleName:'module_returnorder_history',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_dynamicform', function(sandbox){
		var $deferred = null, endPoint;
		var Method = {
			$that:null,
			$form:null,
			moduleInit:function(){
				$.extend(Method, arguments[0]);

				var $this = $(this);
				Method.$that = $this;
				endPoint = Core.getComponents('component_endpoint');

				Method.$form = $this.find("form");
				var $submitBtn = $this.find('button[type="submit"]');

				sandbox.getComponents('component_textfield', {context:$this}, function(){
					this.addEvent('enter', function(e){
						$submitBtn.trigger('click');
					});
				});

				var datepicker = UIkit.datepicker(Method.$form.find('[data-uk-datepicker]'), {"format" : "YYYY.MM.DD"});
				datepicker.on('hide.uk.datepicker', function(){
					if( $(this).val() != ''){
						$(this).keydown();
					}
					/*
					console.log( "A" );
					var $input = sandbox.getComponents('component_textfield', {context:$(this).closest(".uk-form-row")} );
					console.log( $input);
					$input.fireEvent('')
					console.log("hide");
					*/
				});

				$submitBtn.on("click", function(e){
					e.preventDefault();
					sandbox.validation.validate( Method.$form );
					if( sandbox.validation.isValid( Method.$form )){
						if ($this.find('#checkTerms').length > 0) {
							if(!$this.find('#checkTerms').hasClass('checked')){
								UIkit.modal.alert('이용약관에 동의 해주세요.');
								return;
							}
						}
						if ($this.find('#checkPrivacy').length > 0) {
							if(!$this.find('#checkPrivacy').hasClass('checked')){
								UIkit.modal.alert('개인정보 수집 및 이용에 동의해주세요.');
								return;
							}
						}
						var msg = $(this).data('confirm-msg');
						var endPointType = $(this).data('endpoint-type');
						var endPointValue = $(this).data('endpoint-value');
						if( msg != null){
							UIkit.modal.confirm(msg, function(){
								if( endPointType != null ){
									endPoint.call( endPointType, endPointValue );
								}
								Method.submit();
							}, function(){},
							{
								labels: {'Ok': '확인', 'Cancel': '취소'}
							});
						}else{
							if( endPointType != null ){
								endPoint.call( endPointType, endPointValue );
							}
							Method.submit();
						}
					}
				});

				sandbox.validation.init( Method.$form );
			},
			SHA256:function(s){

				var chrsz   = 8;
				var hexcase = 0;

				function safe_add (x, y) {
					var lsw = (x & 0xFFFF) + (y & 0xFFFF);
					var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
					return (msw << 16) | (lsw & 0xFFFF);
				}

				function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
				function R (X, n) { return ( X >>> n ); }
				function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
				function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
				function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
				function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
				function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
				function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

				function core_sha256 (m, l) {
					var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
					var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
					var W = new Array(64);
					var a, b, c, d, e, f, g, h, i, j;
					var T1, T2;

					m[l >> 5] |= 0x80 << (24 - l % 32);
					m[((l + 64 >> 9) << 4) + 15] = l;

					for ( var i = 0; i<m.length; i+=16 ) {
						a = HASH[0];
						b = HASH[1];
						c = HASH[2];
						d = HASH[3];
						e = HASH[4];
						f = HASH[5];
						g = HASH[6];
						h = HASH[7];

						for ( var j = 0; j<64; j++) {
							if (j < 16){W[j] = m[j + i];} else {W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);}

							T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
							T2 = safe_add(Sigma0256(a), Maj(a, b, c));

							h = g;
							g = f;
							f = e;
							e = safe_add(d, T1);
							d = c;
							c = b;
							b = a;
							a = safe_add(T1, T2);
						}

						HASH[0] = safe_add(a, HASH[0]);
						HASH[1] = safe_add(b, HASH[1]);
						HASH[2] = safe_add(c, HASH[2]);
						HASH[3] = safe_add(d, HASH[3]);
						HASH[4] = safe_add(e, HASH[4]);
						HASH[5] = safe_add(f, HASH[5]);
						HASH[6] = safe_add(g, HASH[6]);
						HASH[7] = safe_add(h, HASH[7]);
					}
					return HASH;
				}

				function str2binb (str) {
					var bin = Array();
					var mask = (1 << chrsz) - 1;
					for(var i = 0; i < str.length * chrsz; i += chrsz) {
						bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
					}
					return bin;
				}

				function Utf8Encode(string) {
					string = string.replace(/\r\n/g,"\n");
					var utftext = "";

					for (var n = 0; n < string.length; n++) {

						var c = string.charCodeAt(n);

						if (c < 128) {
							utftext += String.fromCharCode(c);
						}
						else if((c > 127) && (c < 2048)) {
							utftext += String.fromCharCode((c >> 6) | 192);
							utftext += String.fromCharCode((c & 63) | 128);
						}
						else {
							utftext += String.fromCharCode((c >> 12) | 224);
							utftext += String.fromCharCode(((c >> 6) & 63) | 128);
							utftext += String.fromCharCode((c & 63) | 128);
						}

					}

					return utftext;
				}

				function binb2hex (binarray) {
					var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
					var str = "";
					for(var i = 0; i < binarray.length * 4; i++) {
						str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
						hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
					}
					return str;
				}

				s = Utf8Encode(s);
				return binb2hex(core_sha256(str2binb(s), s.length * chrsz));

			},
			submit:function(){
				//Method.$form.submit();

				if( _GLOBAL.PASSWORD_LEGACY_SHA_ENCODER ){
					sandbox.validation.destroy( Method.$form );
					Method.$form.find('input[type="password"]').each( function(){
						$(this).val( Method.SHA256( $(this).val() ));
					});
				}

				if( Method.isAjax === 'true'){
					sandbox.utils.ajax(Method.$form.attr('action'), 'POST', Method.$form.serialize(), function(data){
						var responseData = sandbox.rtnJson(data.responseText, true)['ResponseObject'];
						if(responseData){
							if($deferred){
								if(!responseData.isError || responseData.isError === 'false'){
									$deferred.resolve(responseData);
								}else{
								// changsoo.rhi
								    if(responseData instanceof Object && responseData.failureType == 'withoutpassword') {
								        $deferred.reject(responseData);
								    } else {
								      //  $deferred.reject(responseData.errorMap || Method.errMsg);
											    //로그인 실패시 모달 빼고,  메세지 출력.
										      	if($("div#jq_uk-alert-danger").length==1){
                              $("#jq_uk-alert-danger").show();
 															$("input#j_username").val('');
 															$("input#j_password").val('');
 															$("div.input-textfield").removeClass('value');
                           }
								    }
								}
							}
						}
					}, true);
				}else{
					Method.$form.submit();
				}
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-dynamicform]',
					attrName:'data-module-dynamicform',
					moduleName:'module_dynamicform',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				$deferred = null;
				console.log('destroy dynamicForm module');
			},
			setDeferred:function(defer){
				$deferred = defer;
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_review', function(sandbox){
		var $deferred, $this, modal, args, arrQueryString = [], currentProductId, isSignIn;
		var Method = {
			moduleInit:function(){
				args = arguments[0];
				$this = $(this);
				isSignIn = (args.isSignIn === 'true') ? true : false;

				//필터조건 초기화 ( 최신순, 도움순 )
				arrQueryString[2] = sandbox.utils.getQueryParams($('.sort-tabs').find('.sort-item').filter('.active').attr('href'), 'array').join('&');

				//modal init
				// modal = UIkit.modal('#common-modal', {center:true});
				modal = UIkit.modal('#common-modal-large', {center:true});
				modal.off('hide.uk.modal.review').on({
					'hide.uk.modal.review':function(){
						//console.log('review modal hide');
						$this.find('.contents').empty();
						if(isSignIn != sandbox.getModule('module_header').getIsSignIn()){
							if(currentProductId) Method.reviewProcessorController(currentProductId);
						}
					}
				});

				// product detail 상품 리뷰 쓰기
				$this.find('.review-write-btn').off('click').on('click', function(e){
					e.preventDefault();

					var target = $(this).attr('href');
					var productId = $(this).attr('data-productid');

					if(!productId){
						UIkit.notify('productID 가 없습니다.', {timeout:3000,pos:'top-center',status:'warning'});
						return;
					}

					Method.reviewTask(target, productId);
				});


				//review feedback
				var feedBack = sandbox.getComponents('component_like', {context:$this}, function(){
					this.addEvent('likeFeedBack', function(data){
						if(data.hasOwnProperty('HELPFUL')){
							// $(this).parent().siblings().find('.like-num').text(data.HELPFUL);
							$(this).find('.num').text(data.HELPFUL);
						}else if(data.hasOwnProperty('NOTHELPFUL')){
							$(this).find('.num').text(data.NOTHELPFUL);
							// console.log(data.NOTHELPFUL);
						}
					});
				});


				// 상품 리뷰 수정
				$this.find('.review-modify').off('click').on('click', function(e){
					e.preventDefault();

					var target = $(this).attr('href');
					var url = $(this).attr('data-link');
					var productId = $(this).attr('data-productid');
					var defer = $.Deferred();
					var successMsg = $(this).attr('data-successmsg');

					//review 모달 css 추가
					$(target).addClass('review-write');

					sandbox.utils.promise({
						url:url,
						type:'GET',
						data:{'redirectUrl':location.pathname}
					}).then(function(data){
						$(target).find('.contents').empty().append(data);
						sandbox.moduleEventInjection(data, defer);
						return defer.promise();
					}).then(function(data){
						//arrQueryString = [];
						UIkit.notify(successMsg, {timeout:3000,pos:'top-center',status:'success'});
						Method.reviewProcessorController(productId);
						modal.hide();
					}).fail(function(msg){
						defer = null;
						UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
						if(modal.isActive()) modal.hide();
					});
				});



				// 상품 리뷰 삭제
				$this.find('.review-remove').off('click').on('click', function(e){
					e.preventDefault();
					var _self = this;
					var url = $(this).attr('href');
					var productId = $(this).attr('data-productid');
					var reviewId = $(this).attr('data-reviewId');
					var successMsg = $(this).attr('data-successmsg');

					UIkit.modal.confirm("삭제 할까요?", function(){
						sandbox.utils.ajax(url, 'GET', {}, function(data){
							var data = sandbox.rtnJson(data.responseText);
							if(data.result){
								UIkit.notify(successMsg, {timeout:3000,pos:'top-center',status:'success'});
								Method.reviewProcessorController(productId);
							}else{
								UIkit.notify(data.errorMessage, {timeout:3000,pos:'top-center',status:'danger'});
							}
						});
					});
				});


				//review filter
				$this.find('a.review-filter').on('click', function(e){
					e.preventDefault();
					var query = sandbox.utils.getQueryParams($(this).attr('href'), 'array').join('&');
					var productId = $(this).attr('data-productid');

					if($(this).hasClass('star')){
						arrQueryString[0] = query;
					}else if($(this).hasClass('hash')){
						arrQueryString[1] = query;
					}else if($(this).hasClass('other')){
						arrQueryString[2] = query;
					}

					Method.reviewProcessorController(productId);
				});

				$this.find('.review-filter-delete').click(function(e){
					e.preventDefault();

					var query = sandbox.utils.getQueryParams($(this).attr('href'), 'array').join('&');
					var productId = $(this).attr('data-productid');

					arrQueryString = [];
					arrQueryString[2] = query;
					Method.reviewProcessorController(productId);
				});



				/* browse history back */
				if(sandbox.utils.mobileChk) {
					$(window).on('popstate', function(e) {
						var data = e.originalEvent.state;
						if(modal && modal.active){
							modal.hide();
						}
					});
				}
			},
			reviewTask:function(target, productId){
				var defer = $.Deferred();
				currentProductId = productId;

				sandbox.getModule('module_header').setLogin(function(data){
					//console.log('review : ', data);
					var isSignIn = data.isSignIn;
					sandbox.utils.promise({
						url:sandbox.utils.contextPath + '/review/reviewWriteCheck',
						type:'GET',
						data:{'productId':productId}
					}).then(function(data){
						//data.expect 기대평
						//data.review 구매평
						if(data.expect || data.review){
							/* review history */
							if(sandbox.utils.mobileChk) history.pushState({page:'review'}, "review", location.href);

							isSignIn = isSignIn;
							modal.show();
							return sandbox.utils.promise({
								url:sandbox.utils.contextPath + '/review/write',
								type:'GET',
								data:{'productId':productId, 'redirectUrl':location.pathname, 'isPurchased':data.review}
							});
						}else{
							defer.reject('리뷰를 작성할 수 없습니다.');
						}
					}).then(function(data){
						$(target).addClass('review-write');
						$(target).find('.contents').empty().append(data);
						sandbox.moduleEventInjection(data, defer);
						return defer.promise();
					}).then(function(data){
						Method.reviewProcessorController(productId);
						modal.hide();
					}).fail(function(msg){
						defer = null;
						UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
						if(modal.isActive()) modal.hide();
					});
				});
			},
			reviewProcessorController:function(productId){
				var arrData = [];
				var obj = {
					/*'mode':'template',
					'templatePath':'/modules/productListReview',
					'resultVar':'review',*/
					'productId':productId
				}

				for(var key in obj){
					arrData.push(key+'='+obj[key]);
				}

				///processor/execute/review      /review/list, /account/reviewlist
				//console.log(arrQueryString.join('&'));

				//템플릿 캐시로 인해 추가된 로딩바 상태
				sandbox.setLoadingBarState(true);
				_.delay(function(){
					sandbox.utils.ajax(args.api, 'GET', arrData.join('&') + arrQueryString.join('&') + '&mode=template&resultVar=reviewSummaryDto', function(data){
	                    // 탭 선택시 페이지 초기화
	                    sessionStorage.setItem('categoryCurrentPage', 1);

	                    //li 부분만 서버에서 받은 템플릿으로 교체 한다.
	                    var ulTag = $(args.target).find('#review-list');
						ulTag.empty();
						//PDP의 리뷰서머리 부분을 업데이트 한다.(3개만 표시)
						var ulTagSummary = $('#review-summary');
						ulTagSummary.empty();
	                    $(data.responseText).find('li').each(function(index){
	                    	var li = $(this);
							if(ulTag){
								ulTag.append(li.clone());
							}
							if(ulTagSummary && index < 3){
								ulTagSummary.append(li.clone());
							}
	                    });
	                    //다른 텝에서 '더 보기'를 눌러 전체 리뷰를 로드한 경우 버튼이 없으므로 다시 설정
	                    if($this.find('button#load-more').css("display") == "none"){
	                            $('button#load-more').show();
						}

						sandbox.moduleEventInjection(data.responseText);
					}, false, false);					
				}, 
				2500);
				
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-review]',
					attrName:'data-module-review',
					moduleName:'module_review',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				$deferred = null;
				$this = null;
				args = null;
				modal = null;

				//console.log('destroy reveiw module');
			},
			setDeferred:function(defer){
				$deferred = defer;
			},
			history:function(){

			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_forgot_password', function(sandbox){
		var Method = {
			$that:null,
			$form:null,
			$stepContainer:null,
			$errorAlert:null,
			moduleInit:function(){

				// listSize = 검색 결과 한번에 보여질 리스트 수

				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);

				var $this = $(this);
				var $submitBtn = $this.find('button[type="submit"]');

				Method.$that = $this;
				Method.$form = $this.find("form");

				Method.$stepContainer = $this.find(".step-container");
				Method.$errorAlert = Method.$that.find('[data-error-alert]');

				// 검색버튼 클릭시
				Method.$form.submit(function(e){
					e.preventDefault();
					Method.hideAlert();
					Method.submit();
					return false;
				});

				// 검색된 리스트중 선택시
				// Method.$that.on('click', '[data-customer-select-btn]', Method.selectCutomer );

				$this.on('click', '[data-certify-btn]', Method.guestCertify );

				Method.$that.on('click', '[data-back-btn]', function(){
					Method.viewStep(1);
				});

			},

			updateSelectOrder:function(e){
				e.preventDefault();
				// 자신 버튼 숨기기
				$(this).parent().hide();
				// 자신 컨텐츠 켜기
				$(this).closest('li').find('[data-certify-content]').slideDown('300');
				// 다른 버튼 보이기
				$(this).closest('li').siblings().find('[data-customer-select-btn]').parent().show();
				// 다른 컨텐츠 숨기기
				$(this).closest('li').siblings().find('[data-certify-content]').hide();
			},			

			submit:function(){
				sandbox.utils.ajax(Method.$form.attr("action"), 'POST', Method.$form.serialize(), function(data){
					Method.createCustomerList(JSON.parse( data.responseText ));
				});
			},
			viewStep:function(num){
				Method.$stepContainer.addClass('uk-hidden');
				Method.$that.find('.step-' + num ).find('input[name="identifier"]').val('');
				Method.$that.find('.step-' + num ).removeClass('uk-hidden');
			},
			showAlert:function(msg){
				UIkit.modal.alert(msg);
			},
			hideAlert:function(){
				Method.$errorAlert.addClass('uk-hidden');
			},
			createCustomerList:function(data){
				var result = data['result'];
				var $listContainer = Method.$that.find('.list-container');
				var list = data['ro'];
				var html = '';

				if( result == true ){
					if( list.length == 0 ){
						Method.showAlert('검색하신 내용을 찾을 수 없습니다. 다른 정보를 이용해 다시 검색해 주십시오.');
					}else{
						$.each( list, function( index, li ){
							li.useName = (li.fullName!=null && $.trim(li.fullName)!='');
							li.dateCreated = li.dateCreated.slice(0, 10).split("-").join(".");
						});

						html = Handlebars.compile($("#forgot-password-list").html())(list);

						$listContainer.html( html );
						//console.log( list );
						sandbox.moduleEventInjection( html );	

						Method.$that.on('click', '[data-customer-select-btn]',  Method.updateSelectOrder );

						Method.viewStep(2);
					}
				}else{
					Method.showAlert('검색하신 내용을 찾을 수 없습니다. 다른 정보를 이용해 다시 검색해 주십시오.');
				}
				///customer/requestPasswordChangeUrl?successUrl=/recover&customer=
			},
			
			// 비회원 인증 처리
			guestCertify:function(){
				var type = $(this).attr('data-type');
				var customerId = $(this).closest('li').find('input[name="customerId"]').val();
				var email = $(this).closest('li').find('input[name="email"]').val();
				var phoneNum = $(this).closest('li').find('input[name="phonenum"]').val();
				var url = sandbox.utils.contextPath + "/login/requestPasswordChangeUrl?customer=" + customerId;
				
				if( type === 'email'){
					url += '&messageType=EMAIL';
				}else if( type === 'sms'){
					url += '&messageType=SMS';
				}

				sandbox.utils.ajax(url, 'GET', {}, function(data){
					var responseData = sandbox.rtnJson(data.responseText);
					if(responseData.result == true){
						if(type === 'email'){
							Method.viewStep(3);
						}else if(type === 'sms'){
							Method.viewStep(4);
						}
					}else{
						Method.showAlert(responseData['errorMsg']);
					}

				}, true );

				return;
			}			

		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[ data-module-forgot-password ]',
					attrName:'data-module-forgot-password',
					moduleName:'module_forgot_password',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';
	Core.register('module_review_write', function(sandbox){
		var $deferred = null;
		var imgCount = 0;
		var removeId = null;
		var maxCount = 6;
		var currentStarCount = 0;
		var starCountIS = false;
		var fileLoad = null;
		var arrDescription = ['별로에요.', '그저 그래요.', '나쁘지 않아요.', '마음에 들어요.', '좋아요! 추천합니다.'];
		var imgTemplate = '<span class="preview-up-img"><a href="javascript:;" class="file-remove_btn"></a><img src="/kr/ko_kr/{{imgUrl}}?thumbnail" alt="{{imgAlt}}" /></span>';
		var inputHiddenTemplate = '<input type="hidden" name="fileList[{{id}}].fullUrl" class="file-{{id}}" value={{fullUrl}} /><input type="hidden" name="fileList[{{id}}].fileName" class="file-{{id}}" value={{fileName}} />';
		var endPoint, name, model;

		var Method = {
			moduleInit:function(){
				endPoint = Core.getComponents('component_endpoint');
				var $this = $(this);
				var $form = $this.find('#review-write-form');
				var $imgContainer = $this.find('.uplode-preview-list');
				var $thumbNailWrap = $this.find('.thumbnail-wrap');
				var $textArea = sandbox.getComponents('component_textarea', {context:$this});
				var $submitArea = $this.find('input[type=submit]');
				name = $($this).find('input[name="name"]').val();
				model = $($this).find('input[name="model"]').val();

				//작성완료 버튼 활성화
				function enableSumitButton(){
					if( starCountIS && $textArea.getValue().length > 0){
						if($submitArea.hasClass('disabled')){
							$submitArea.removeClass('disabled')
						}
					}
				}
				//textArea 포커스 이벤트
				 $this.find('#comment').change(function(){
					enableSumitButton();
				 });

				// fileLoad = sandbox.getComponents('component_file', {context:$this}, {setting:maxLength=6}, function(){
				fileLoad = sandbox.getComponents('component_file', {context:$this, maxLength:maxCount}, function(){
					var _self = this;
					this.addEvent('error', function(msg){
						UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'warning'});
					});

					this.addEvent('upload', function(fileName, fileUrl){
						//console.log(fileName, fileUrl);
						$thumbNailWrap.append(sandbox.utils.replaceTemplate(imgTemplate, function(pattern){
							switch(pattern){
								case 'imgUrl' :
									return fileUrl;
									break;
								case 'imgAlt' :
									return fileName;
									break;
							}
						}));

						imgCount++;
						_self.setCurrentIndex(imgCount);
					});
				});

				imgCount = $thumbNailWrap.children().size();
				fileLoad.setCurrentIndex(imgCount);

				currentStarCount = $this.find('.rating-star a').filter('.active').length - 1;

				$this.find('.rating-star a').click(function(e) {
					e.preventDefault();
					var index = $(this).index() + 1;
					$(this).parent().children('a').removeClass('active');
					$(this).addClass('active').prevAll('a').addClass('active');

					$this.find('input[name=rating]').val(index*20);
					$this.find('input[name=starCount]').val(index);
					$this.find('.rating-description').text(arrDescription[index-1]);

					starCountIS = true;

					enableSumitButton();
				});

				if(currentStarCount >= 0){
					$this.find('.rating-star a').eq(currentStarCount).trigger('click');
				}

				$this.find('.uplode-preview-list').on('click', '.file-remove_btn', function(e){
					e.preventDefault();
					var index = $(this).attr('href');
					$(this).parent().remove();

					imgCount--;
					fileLoad.setCurrentIndex(imgCount);
				});

				$this.find('input[type=submit]').click(function(e){
					e.preventDefault();

					if(!starCountIS || !$textArea.getValidateChk()){
						return;
					}

					$thumbNailWrap.children().each(function(i){
						var $this = $(this);
						$form.append(sandbox.utils.replaceTemplate(inputHiddenTemplate, function(pattern){
							switch(pattern){
								case 'id' :
									return i;
									break;
								case 'fileName' :
									return $this.find('img').attr('alt');
									break;
								case 'fullUrl' :
									return $this.find('img').attr('src');
									break;
							}
						}));
					});

					var itemRequest = BLC.serializeObject($form);
					sandbox.utils.ajax($form.attr('action'), $form.attr('method'), itemRequest, function(res){
						var data = sandbox.rtnJson(res.responseText);

						if(data.hasOwnProperty('errorMessage') || !data){
							if($deferred) $deferred.reject(data.errorMesage);
							else UIkit.notify(data.errorMesage, {timeout:3000,pos:'top-center',status:'danger'});
						}else{
							/*리뷰 작성 시 상품 화면으로 되돌아 가면서 reflesh 되지 않아 우선 막음*/
							/*if($deferred) $deferred.resolve(data); else */
							endPoint.call("writeReview",{ name : name, model : model });
							Core.ga.action('review','write');
							location.href = data.redirectUrl;
						}
					}, true);
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-review-write]',
					attrName:'data-module-review-write',
					moduleName:'module_review_write',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				$deferred = null;
				//console.log('destroy review-write module');
			},
			setDeferred:function(defer){
				$deferred = defer;
			},
			moduleConnect:function(){
				fileLoad.setToappUploadImage({
					fileName:arguments[0],
					fullUrl:arguments[1],
					result:(arguments[2] === '1') ? true : false
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_giftcard_credit', function(sandbox){
		var Method = {
			moduleInit:function(){
				var $this = $(this);
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[ data-module-giftcard-credit]',
					attrName:'data-module-giftcard-credit',
					moduleName:'module_giftcard_credit',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	// var arrLatestKeywordList = []; // sessionStorage 으로 cookie 변경

	Core.register('module_search', function(sandbox){
		var $this, args, clickIS, endPoint, latestKeywordList = '', arrLatestKeywordList = [], isSaveLatest;

		//초기값 설정, 쿠키에 저장 
		// isSaveLatest = $.cookie('isSaveLatest')
		// if(isSaveLatest == undefined){
		// 	alert('undefined isSaveLatest')
		// 	$.cookie('isSaveLatest', 'true');
		// 	isSaveLatest = $.cookie('isSaveLatest');
		// }

		// alert($.cookie('latestSearchKeyword'))

		// latestKeywordList = $.cookie('latestSearchKeyword');
		// if(latestKeywordList === ''){
		// 	alert('undefined latestKeywordList')
		// 	$.cookie('latestSearchKeyword', '');
		// 	latestKeywordList = $.cookie('latestSearchKeyword');
		// }
		
		// var offTag = "<li class='list less'>검색어 저장 기능이<br>꺼져있습니다.</li>" 
		// var setSaveLatestText = function(){ 
		// 	if(isSaveLatest == 'true'){
		// 		$('#toggle-save-latest').text("검색어저장 끄기");
		// 		$('#latest-keyword li.list').text("최근 검색어가 없습니다.");   //20150516추가 
		// 	} else {
		// 		$('#toggle-save-latest').text("검색어저장 켜기");
		// 		$('#latest-keyword').html(offTag);
		// 	}
		// }
		// setSaveLatestText();
 
		var setSearchKeyword = function (keyword) {
			var pattern = new RegExp(keyword, 'g');
			// arrLatestKeywordList = sandbox.utils.rtnMatchComma(latestKeywordList.replace(pattern, ''));
			
			arrLatestKeywordList.unshift(keyword);

			// arrLatestKeywordList

			if(arrLatestKeywordList.length >= args.keywordMaxLen){
				arrLatestKeywordList = arrLatestKeywordList.slice(0, -1);
			}
			// $.cookie('latestSearchKeyword', arrLatestKeywordList.join(','));
			sessionStorage.setItem('latestSearchKeyword', arrLatestKeywordList.join(',')); // sessionStorage으로 cookie 변경
		}

		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];
				clickIS = false;

				// 최근 검색어 없을 때 미노출
				if (sessionStorage.getItem('latestSearchKeyword') == null) {
					$('#keyword-count').hide();
				}

				// latestKeywordList = $.cookie('latestSearchKeyword') || '';
				latestKeywordList = sessionStorage.getItem('latestSearchKeyword') || ''; // sessionStorage으로 cookie 변경
				// arrLatestKeywordList = sandbox.utils.rtnMatchComma(latestKeywordList || '');
				arrLatestKeywordList = latestKeywordList.split(',');
				endPoint = Core.getComponents('component_endpoint');

				sandbox.getComponents('component_searchfield', {context:$this, resultTemplate:'#search-list', resultWrap:'.etc-search-wrap'}, function(){
					this.addEvent('resultSelect', function(data){
						
						var text = $(data).text();

						//nike는 인기검색어 앞에 순번이 있어 아이템 선택시 순번 제거 필요.
						// if(text.lastIndexOf('10', 0) === 0){
						// 	text = text.substring(4);
						// } else if(text.match(/^\d/)){
						// 	text = text.substring(3);
						// }

						var endPointData = {
							key : text,
							text : text
						}
						
						endPoint.call( 'searchSuggestionClick', endPointData );
						this.getInputComponent().setValue(text);
						setSearchKeyword(text);
						location.href = sandbox.utils.contextPath + '/search?q='+ text;
					});

					this.addEvent('beforeSubmit', function(data){
						setSearchKeyword(data);
					});

					// this.addEvent('removeList', function(keyword){
					// 	// 삭제버튼 이벤트를 받는 부분
					// 	// keyword 가 all 일때 쿠키의 최근 검색어를 모두 삭제
					// 	if(keyword === 'all'){
					// 		$.cookie('latestSearchKeyword', '');
					//   }else{
					// 		latestKeywordList = latestKeywordList.replace(keyword, '');
					// 		$.cookie('latestSearchKeyword', latestKeywordList);
					// 	}
					// });

					/* 최근검색어 */
					// if(args.isLatestKeyword === 'true'){
						this.setResultPrepend('#keyword-container', '#latest-search-keyword', {
							label:'최근 검색어',
							keyword:arrLatestKeywordList
						});
					// }
				});

				// search btn (search field show&hide)
				$('.search_less_txt_link a,.gnb-search-btn').click(function (e) {
					e.preventDefault();

					if (clickIS) {
						clickIS = false;
						$this.removeClass('active');
					} else {
						clickIS = true;
						$this.addClass('active');
					}
				});

				//최근 검색어 삭제 버튼
				// var lessTag = "<li class='less'>최근 검색어가 없습니다.!!!</li>"
				$('#delete-all-latest').click(function(e){
					// $.removeCookie('latestSearchKeyword', { path: '/' });
					// $.cookie('latestSearchKeyword', '');
					//최근검색어 리스트 삭제
					//$('#latest-keyword > li.list').remove();
					$('#keyword-count').remove();
					// $('#latest-keyword').html(lessTag);
					//검색입력창 최근 검색어 삭제

					arrLatestKeywordList.length = 0;
					latestKeywordList = '';

					sessionStorage.removeItem('latestSearchKeyword'); // sessionStorage으로 cookie 변경

					$this.find($('#search')).val("");
					//$('.etc-search-wrap .tit:first-child , #latest-keyword , #latest-keyword li, .search-btn-box').remove();
				});

				//최근검색어 리스트 개별 삭제
				// $('.btn-search-delete').click(function(e){
				// 	$(this).parent().remove();
				// });
				
				//검색어 저장 토글
				$('#toggle-save-latest').click(function(e){
					// $.cookie('isSaveLatest', !isSaveLatest);
					if(isSaveLatest == 'true'){
						isSaveLatest = 'false';
					} else {
						isSaveLatest = 'true';
					}
					$.cookie('isSaveLatest', isSaveLatest);
					setSaveLatestText();
				});

				//모바일인 경우 'x' 버튼 눌러 검색창 닫기
				$('.btn-search-close').click(function(){
					$('.gnb-search-field').removeClass('active').hide();
				});


				var md = new MobileDetect(window.navigator.userAgent);
				if (md.mobile()) {
					$('.search_less_txt_link a').on('click', function (e) {
						e.preventDefault();
						$('.gnb-search-field').addClass('active');
						$('.etc-search-wrap').addClass('active');
						$("body").css({'position':'fixed', 'left':0, 'right':0});
					});	
				}


				$this.find('#search').on('focusin', function () {
					$('.result-wrap').addClass('active');
					$('.search-mask').fadeIn(); 
					$("body").css({'position':'fixed', 'left':0, 'right':0});

					// var wordlist;
					// $.get("/kr/ko_kr/modules/seachkeywordData", function (data) {

					// }).done(function (data) {
					// 	var autocomplete = $(data).data('autocomplete')
					// 	var jsonTx = eval(autocomplete);
					// 	wordlist = jsonTx[0].wordlist;
					// 	console.log(wordlist);
					// }).done(function (data) {

					// 	function monkeyPatchAutocomplete () {
					// 		var oldFn = $.ui.autocomplete.prototype._renderItem;
					// 		$.ui.autocomplete.prototype._renderItem = function (ul, item) {

					// 			console.log($('.ui-autocomplete > li').length)
								
					// 			var re = new RegExp(this.term + "/*", "i");
					// 			var t = item.label.replace(re, "<span class='highlight'>" + this.term + "</span>");

					// 			return $("<li></li>").data("item.autocomplete", item).append("<a href='/kr/ko_kr/search?q=" + item.label + "'>" + t + "</a>").appendTo(ul);
					// 		};
					// 	}
					// 	monkeyPatchAutocomplete();

					// 	$("#search").autocomplete({
					// 		source: function (req, response) {
					// 			var re = $.ui.autocomplete.escapeRegex(req.term);
					// 			var matcher = new RegExp(re + "/*", "i");
					// 			var a = $.grep(wordlist, function (item, index) {
					// 				return matcher.test(item);
					// 			});
					// 			a = a.splice(0, 10)
					// 			response(a);
					// 		},
					// 		minLength:2
					// 	});
					// }).fail(function (data) {

					// }).always(function (data) {
	
					// });

				});

				// sessionStorage 데이터 사용
				var autoSearchKeywordList = JSON.parse(sessionStorage.getItem('autoSearchKeyword'));
				function patchAutocomplete () {
					var oldFn = $.ui.autocomplete.prototype._renderItem;
					$.ui.autocomplete.prototype._renderItem = function (ul, item) {							
						var re = new RegExp(this.term + "/*", "i");
						var t = item.label.replace(re, "<span class='highlight'>" + this.term + "</span>");

						var ts = item.value;
						// var pattern = new RegExp(item.label, 'g');
						// arrLatestKeywordList = sandbox.utils.rtnMatchComma(latestKeywordList.replace(pattern, ''));
						// arrLatestKeywordList.unshift(item.label);
						// if(arrLatestKeywordList.length >= args.keywordMaxLen){
						// 	arrLatestKeywordList = arrLatestKeywordList.slice(0, -1);
						// }
						// sessionStorage.setItem('latestSearchKeyword', arrLatestKeywordList.join(','));

						// return $("<li></li>").data("item.autocomplete", item).append("<a data-target=" + item.label + " href='/kr/ko_kr/search?q=" + item.label + "'><em>" + t + "</em></a>").appendTo(ul);



						return $("<li></li>").data("item.autocomplete", item).append("<a data-target='" + item.label + "' href='#'><em>" + t + "</em></a>").appendTo(ul);
					};
				}
				patchAutocomplete();

				// $('.ui-autocomplete a').click(function(e){
				// 	e.preventDefault();
				// 	var _target = $(this).data('target');
				// 	$('#search').value(_target);

				// 	console.log(_target)

				// 	var pattern = new RegExp(_target, 'g');
				// 	arrLatestKeywordList = sandbox.utils.rtnMatchComma(latestKeywordList.replace(pattern, ''));
				// 	arrLatestKeywordList.unshift(_target);
				// 	if(arrLatestKeywordList.length >= args.keywordMaxLen){
				// 		arrLatestKeywordList = arrLatestKeywordList.slice(0, -1);
				// 	}
				// 	sessionStorage.setItem('latestSearchKeyword', arrLatestKeywordList.join(','));

				// 	$('#search-form').submit();
				// });

				
				
				

				$("#search").autocomplete({
					source: function (req, response) {
						var re = $.ui.autocomplete.escapeRegex(req.term);
						var matcher = new RegExp(re + "/*", "i");
						var a = $.grep(autoSearchKeywordList, function (item, index) {
							return matcher.test(item);
						});
						a = a.splice(0, 10);
						response(a);
					},
					minLength:2,
					// autoFocus: true,
					change: function () {
						//console.log('change');
					},
					close: function () {
						//console.log('close');
						$('.etc-search-wrap').addClass('active');
					},
					focus: function () {
						//console.log('focus');
					},
					open: function () {
						//console.log('open');
						$('.etc-search-wrap').removeClass('active');

						$('.ui-autocomplete a').click(function(e){
							e.preventDefault();
							var _target = $(this).data('target');
							setSearchKeyword(_target);
							location.href = sandbox.utils.contextPath + '/search?q='+ _target;
						});
					},
					response: function () {
						//console.log('response');
					},
					search: function () {
						//console.log('select');
					},
					select: function () {
						//console.log('select');
					}
				});

				// $this.find('#search').on('focusout', function () {
				// 	$resultWrap.removeClass('active');
				// 	$('.search-mask').fadeOut(); //20180516추가
				// 	$("body").css('position','static'); //20180516추가
				// });

				$(document).on('click','.search-mask', function(){ //20180516추가
					$('.etc-search-wrap').removeClass('active');
					$("body").css('position','relative');
          $('.search-mask').fadeOut();
				});


				// 검색 input에 입력시 삭제버튼 생성
				$('#search').on('input', $(this), function(){ // input에 변화가 있을 시 
					if(this.value == "") { // input value가 empty 이면 실행 
						$('.btn-wrap').css('display','none');
					} else {  // input에 글자입력되면 실행 
						$('.btn-wrap').css('display','block');
					}
				});
			}
		}

		

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-search]',
					attrName:'data-module-search',
					moduleName:'module_search',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			searchTrigger:function(){
				$('.gnb-search-btn').trigger('click');
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_global_alert', function(sandbox){
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var msg = $(this).find('span').text();

				if( msg != null && $.trim(msg) ){
					UIkit.notify(msg, {timeout:0,pos:'top-center',status:'danger'});
				}
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[ data-module-global-alert]',
					attrName:'data-module-global-alert',
					moduleName:'module_global_alert',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_shipping_address', function(sandbox){
		var $this, args, modal = null, endPoint;
		var Method = {
			moduleInit:function(){
				// modal layer UIkit 사용
				$this = $(this);
				args = arguments[0];
				modal = UIkit.modal('#common-modal');
				endPoint = Core.getComponents('component_endpoint');

				$this.on('click', '.defaultAddress', function(e){
					e.preventDefault();
					endPoint.call('updateProfile', 'address book:select default shipping');
					$(this).parent().submit();
				});

				$this.on('click', '.add-address', function(e){
					e.preventDefault();
					Method.modalInit($(this).attr('href'));
				});

				$this.on('click', '.modify', function(e){
					e.preventDefault();
					Method.modalInit($(this).attr('href'));
				});

				$this.on('click', '.remove', function(e){
					e.preventDefault();
					var _self = this;
					UIkit.modal.confirm('삭제 하시겠습니까?', function(){
						$(_self).parent().submit();
					});
				});

				$this.find('.address-form').remove();
			},
			modalInit:function(url){
				sandbox.utils.ajax(url, 'GET', {}, function(data){
					var appendHtml = $(data.responseText).find('.address-form').html();
					modal.element.find('.contents').empty().append(appendHtml);
					sandbox.moduleEventInjection(appendHtml);
					modal.show();
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-shipping-address]',
					attrName:'data-module-shipping-address',
					moduleName:'module_shipping_address',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_gnb', function(sandbox){

		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var $oneDepth = $('.onedepth-list');
				var args = arguments[0];

				if(args.type === 'type1'){
					var timeoutId = null

					$oneDepth.on({
						'mouseenter.lnb':function(){
							clearInterval( timeoutId );
							$(this).find('>').addClass('active');
							$(this).siblings().find('>').removeClass('active');
						},
						'mouseleave.lnb':function(){
							var $this = $(this);
							timeoutId = setTimeout( function(){
								$this.find('>').removeClass('active');
							}, 300);
						},
						'click.lnb':function(e){
							var href = $(this).attr("href");
							if( href == "#" || href == "javascript:;" ){
								e.preventDefault();
								$(this).find('>').addClass('active');
							}
						}
					});
				}else if(args.type === 'type2'){
					$oneDepth.on({
						'mouseenter.lnb':function(){
							$(this).find('>').addClass('active');
							$(this).find('.header-menu_twodepth').css({'display':'block'});
							$(this).find('.menu-banner-conts').css({'display':'block'});
						},
						'mouseleave.lnb':function(){
							$(this).find('>').removeClass('active');
							$(this).find('.header-menu_twodepth').removeAttr('style');
							$(this).find('.menu-banner-conts').removeAttr('style');
						},
						'click.lnb':function(e){
							var href = $(this).attr("href");
							if( href == "#" || href == "javascript:;" ){
								e.preventDefault();
								$(this).find('>').addClass('active');
							}
						}
					});
				}

				var $modile = $('#mobile-menu');
				$modile.find('.mobile-onedepth_list').on('click', '> a', function(e){
					if(!$(this).hasClass('link')){
						e.preventDefault();
						$(this).siblings().show().stop().animate({'left':0}, 300);
					}
				});

				$modile.find('.location').on('click', function(e){
					e.preventDefault();
					$(this).parent().stop().animate({'left':-270}, 300, function(){
						$(this).css('left', 270).hide();
					});
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-gnb]',
					attrName:'data-module-gnb',
					moduleName:'module_gnb',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_shipping_address_write', function(sandbox){
		var $this, args, endPoint;

		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];
				endPoint = Core.getComponents('component_endpoint');

				var arrComponents = [];
				sandbox.getComponents('component_textfield', {context:$this}, function(){
					this.addEvent('focusout', function(){
						var value = $(this).val();
						if($(this).hasClass('fullName')){
							$this.find('#firstname').val(value);
							$this.find('#lastName').val(value);
						}
					});

					arrComponents.push(this);
				});
				sandbox.getComponents('component_searchfield', {context:$this, resultTemplate:'#address-find-list', isModify:args.isModify}, function(){
					this.addEvent('resultSelect', function(data){
						this.getInputComponent().setValue($(data).data('city') + ' ' + $(data).data('doro'));
						$this.find('#address1').val($(data).data('city') + ' ' + $(data).data('doro')); // 도로명 주소
						$this.find('#postcode').val($(data).data('zip-code5'));

						//상세주소 입력창으로 이동
						$this.find('#address2').focus();
					});

					arrComponents.push(this);
				});

				$this.find('button[type=submit]').off().on('click', function(e){
					e.preventDefault();

					var count = 0;
					$.each(arrComponents, function(i){
						if(!this.getValidateChk()){
							this.setErrorLabel();
						}else{
							count++;
						}
					});

					if(arrComponents.length === count){
						sandbox.setLoadingBarState(true);
						if( args.isModify == "true" ){
							endPoint.call('updateProfile', 'address book:edit shipping');
						}else{
							endPoint.call('updateProfile', 'address book:add shipping');
						}
						$this.find('form').submit();
					} 
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-shipping-address-write]',
					attrName:'data-module-shipping-address-write',
					moduleName:'module_shipping_address_write',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				$this = null;
				args = null;
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_guide', function(sandbox){
		var endPoint;
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);
				
				endPoint = Core.getComponents('component_endpoint');
				$(this).on('click', function(){
					var type = $(this).data('guide-type');
					if( type == 'size'){
						endPoint.call('pdpSizeGuideClick');
					}
				})
			},
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-guide]',
					attrName:'data-module-guide',
					moduleName:'module_guide',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_slick_slider', function(sandbox){
		var Method = {
			moduleInit:function(){
				var args = Array.prototype.slice.call(arguments).pop();
				//Method.opts = args || {}

				// method.opts 로 정의되던 값을 data로 변경
				// module 단위는 개별 instance로 사용될 수 없어서 dom 기준으로 다시 처리
				// 추후 html에서 data로 처리 하던, component로 처리하던 하자

				for( var i in args ){
					$(this).data( i, args[i] );
				}
				Method.resizeEventList = [];
				Method.startSlider( $(this), Method.resizeEventList );
			},

			probablyMobile:function() {
				var Y = navigator.appVersion;
				var isAndroid = ( /android/gi ).test( Y );
				var isIOS = ( /iphone|ipad|ipod/gi ).test( Y );
				return ( isAndroid || isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test( navigator.userAgent ) );
			},

			getCssInt:function( $item, attr ) {
				var val = parseInt( (''+$item.css(attr)).replace('px',''), 10 );
				return isNaN(val) ? 0 : val;
			},

			// 고정 비율로 리사이즈 처리
			// 리사이즈시 성능 이슈가 있음..
			// 슬라이더의 배경이 보이고, 커짐.
			// 그리고 슬라이드 1번째가 아닌 경우 좌표를 재계산하느라 버벅임..
			// Slick.prototype.setPosition 참고..
			enableResponsiveResize:function( slick ) {
				var $slider = slick.$slider;

				var sliderWidth 	 = parseInt($slider.data('width'), 10);
				var sliderHeight 	 = parseInt($slider.data('height'), 10);
				var sliderMaxWidth 	 = typeof $slider.data('maxWidth') === 'undefined' ? 0 : parseInt($slider.data('maxWidth'), 10);
				var sliderResponseRate = sliderHeight / sliderWidth;
				var isFullWidth = $slider.data('fullWidth');
				// fade 가 아닌 경우 다시 받아야 함
				var $slideList = $slider.find('.slider-slide');
				var $sliderTrack = $slider.find('.slick-track');
				var $layerList = $slider.find('.slider-layer-position');
				var $layerContents = $slider.find('.slider-layer-content');
				var $item,tagName;
				$slideList.hide();

				//var w = $slider.width();
				//var w = $slider.parent().width();
				var w = $slider.parent().css({'transition':'none'}).innerWidth();

				// fullwidth 가 아닐때
				if( !isFullWidth ){
					// 가로 사이즈가 maxwidth를 못넘기도록 처리
					if( sliderMaxWidth !== 0 && sliderMaxWidth < w ) {
						w = sliderMaxWidth;
					}
				}

				var h = Math.ceil(sliderResponseRate * w);

				var itemWidth, itemHeight, itemPosition, itemStyle;
				$slider.css({width:w+'px',height:h+'px'});
				$slideList.css({width:w+'px',height:h+'px'});

				// console.log('brz_col-1of2' + ' = ' + $('.brz_col-1of2').first().innerWidth() );
				// console.log($slider.attr('id') + ' = ' + w);

				//Layer 비율에 의한 위치 이동
				$layerList.each(function( idx, item ){
					$item = $(item);
					itemWidth = $item.data('left');
					itemHeight = $item.data('top');
					//itemPosition = $item.position();
					// 좌표 % 선언시 고정 위치 환산하여 재계산 넣을거면 position 기반 환산 처리
					itemStyle = $item[0].style;
					if( itemWidth.indexOf('%') < 0 ) {
						itemWidth = parseInt(itemWidth.replace('px',''), 10);
						$item.css('left', Math.ceil(w * itemWidth / sliderWidth) +'px');
					}
					if( itemHeight.indexOf('%') < 0 ) {
						itemHeight = parseInt(itemHeight.replace('px',''), 10);
						$item.css('top', Math.ceil(h * itemHeight / sliderHeight) +'px');
					}
				});

				// layer 원본 비율 처리
				$layerContents.each(function( idx, item ){
					$item = $(item);
					tagName = ('' + item.tagName).toLowerCase();
					if( tagName == 'div' ) {
						$item.css('fontSize', Math.ceil(w * $item.data('fontSize') / sliderWidth) );
					} else if ( tagName == 'img' ) {
						$item.css('width', Math.ceil(w * $item.data('width') / sliderWidth) );
						$item.css('height', Math.ceil(h * $item.data('height') / sliderHeight) );
					}
				});


				// 리사이즈 버그 처리
				slick.setPosition();

				$slideList.show();
			},

			videoPause:function( slider ){
				var $video = slider.find('.slider-layer-content iframe');
				$.each( $video, function(){
					var src = $(this).attr('src');
					if( src.indexOf('youtube') > -1 ){
						$(this)[0].contentWindow.postMessage('{"event":"command", "func":"pauseVideo", "args":""}','*');
					}

					if( src.indexOf('vimeo') > -1 ){
						$(this)[0].contentWindow.postMessage('{"method":"pause"}','*');
					}
				})

			},

			resizeEvent:function( slick ){
				//console.time( 'resizeEvent' );
				var $slider = slick.$slider;
				var enableResponsive = $slider.data('enableResponsive');	// 고정비율 리사이즈 사용 처리 여부
				var hideOnMobile	 = $slider.data('hideOnMobile');		// 모바일 일때 숨김
				var hideUnder		 = $slider.data('hideUnder');			//
				var hideOver		 = $slider.data('hideOver');			//

				var isShow = true;
				if( hideOnMobile ) {
					isShow = isShow && (Method.probablyMobile() ? false  : true);
				}
				if( hideUnder !== 0 ) {
					isShow = isShow && ($slider.width() < hideUnder ? false  : true);
				}
				if( hideOver !== 0) {
					isShow = isShow && ($slider.width() > hideOver ? false  : true);
				}

				var $parent = null;

				if( $slider.parent().hasClass('content-container') ){
					$parent = $slider.parent();
				}

				if(isShow) {
					$slider.show();
					if( $parent != null ) $parent.removeClass('uk-margin-bottom-remove');
				} else {
					$slider.hide();
					Method.videoPause( $slider );
					if( $parent != null ) $parent.addClass('uk-margin-bottom-remove');
				}

				if( enableResponsive ) {
					setTimeout(function(){Method.enableResponsiveResize( slick );}, 0);
				}else {
					slick.$slides.show();
				}
				//console.timeEnd( 'resizeEvent' );
			},
			startSlider:function( $slider, resizeEventList ) {

				// admin setting 처리
				var $slideList = $slider.find('.slider-slide');
				var $layerList = $slider.find('.slider-layer-position');
				var $layerContents = $slider.find('.slider-layer-content');
				var $track = $slider.find('.slick-track');
				var sliderResponseRate = 0.4; // 최초 슬라이더 비율 (600/1500)

				// 슬라이더 배경 이미지
				if( $slider.data('backgroundImage') != 'null' ) {
					$slider.css('background-image', 'url(' + $slider.data('backgroundImage') +')');
				}

				var enableResponsive = $slider.data('enableResponsive');	// 고정비율 리사이즈 사용 처리 여부
				var autoplay 		 = $slider.data('startSlideShow'); 		//
				var sliderWidth 	 = parseInt($slider.data('width'), 10); 				//
				var sliderHeight 	 = parseInt($slider.data('height'), 10); 				//
				var sliderMaxWidth 	 = typeof $slider.data('maxWidth') === 'undefined' ? 0 : parseInt($slider.data('maxWidth'), 10);
				if( sliderMaxWidth !== 0 && sliderMaxWidth < sliderWidth ) {
					sliderWidth = sliderMaxWidth;
				}
				var $item, tagName, $video;
				var baseWidth;

				if ( enableResponsive ) {
					sliderResponseRate = sliderHeight / sliderWidth;
					baseWidth = $slider.parent().width();
					$slider.data("base-width", baseWidth);
					$slider.css({width:baseWidth+'px',height:Math.ceil(sliderResponseRate * baseWidth)+'px'});
				} else {
					$slider.css({width:sliderWidth+'px',height:sliderHeight+'px'});
					$slideList.css({width:sliderWidth+'px',height:sliderHeight+'px'});
				}

				// layer 원본 사이즈 data 기록
				$layerContents.each(function( idx, item ){
					$item = $(item);
					tagName = ('' + item.tagName).toLowerCase();
					$video = $item.find('iframe');
					$.each( $video, function(){
						var src = $(this).attr('src');
						if( src.indexOf('youtube') > -1 ){
							var param = {
								enablejsapi : 1,
								rel : 0
							}
							$(this).attr('src', Core.Utils.url.appendParamToURL($(this).attr('src'), 'enablejsapi', 1));
							$(this).attr('src', Core.Utils.url.appendParamToURL($(this).attr('src'), 'rel', 0));
						}
						if( src.indexOf('vimeo') > -1 ){
							$(this).attr('src', Core.Utils.url.appendParamToURL(src, 'api', 1));
						}
						console.log( $(this).attr('src') );
					})

					if( tagName == 'div' ) {
						$item.data('font-size', Method.getCssInt($item, 'fontSize'));
					} else if ( tagName == 'img' ) {
						if( typeof $item.data('width') === 'undefined' ) {
							$item.data('width', Method.getCssInt($item, 'width'));
						} else {
							$item.data('width', $item.data('width').replace('px',''));
						}
						if( typeof $item.data('height') === 'undefined' ) {
							$item.data('height', Method.getCssInt($item, 'height'));
						} else {
							$item.data('height', $item.data('height').replace('px',''));
						}
					}
					//  else {
					// 	// $item.find("img");
					// 	// $item.data('width', Method.getCssInt($item, 'width'));
					// 	// $item.data('height', Method.getCssInt($item, 'height'));
					// }
				});

				resizeEventList.push(Method.resizeEvent);


				var _slider = $slider.slick({
				    autoplay 		: autoplay,										// 자동 시작 여부
				    autoplaySpeed 	: 4000, 										// slide 넘어가는 속도   			=> slide 별 , slide.slideDuration
				    initialSlide	: $slider.data('startWithSlide'),				// 시작 슬라이드 번호
				    rtl 			: $slider.data('twoWaySlideShow'),				// 슬라이더 방향 전환 (right to left)
				    accessibility 	: $slider.data('keyboardNavigation'),			// 키보드 방향 전환 - Enables tabbing and arrow key navigation
				    draggable 		: true,											// Enables desktop dragging
				    swipe 			: $slider.data('touchNavigation'),				// 터치 방향 전환 - Enables touch swipe
				    touchMove 		: $slider.data('touchNavigation'),				// 터치 방향 전환 - Enables slide moving with touch
				    infinite		: true,											// 반복될 방향으로 무제한 이동 , false 인 경우 1,2,3,2,1,2,3  순으로 이동
				    fade 			: true,											// 넘김시 fade 효과 사용
				    speed 			: $slider.data('fadeDuration'),					// 장면이 변하는 속도 (애니메이션 처리 속도) Slide/Fade animation speed
				    arrows  		: $slider.data('showPrevNextButton'),			// 좌, 우 버튼 노출 여부
				    dots: true,														// 하단 네비게이션 컨트롤바
				    easing:'linear',
				    waitForAnimate: false,
				    slidesToShow: 1,
				    adaptiveHeight: false,
				    prevArrow:'<button type="button" class="slick-prev slick-arrow"><i class="icon-arrow_left"></i></button>',
				    nextArrow:'<button type="button" class="slick-next slick-arrow"><i class="icon-arrow_right"></i></button>'
				});

				var limitLoopCount = 0;
				if( $slider.data('forceStopAfterLoop') == true ){
					limitLoopCount = $slider.data('loops');
				}

				var loopCount = 0;
				if( limitLoopCount > 0 ) {
					_slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
						if( currentSlide === slick.slideCount-1 ){
							loopCount++;
							if( loopCount >= limitLoopCount) {
								slick.paused = true;
							}
						}
					});
				}

				if( $slider.data('pauseOnHover') && autoplay ) {
					_slider.mouseenter(function(){_slider.slick('slickPause');}).mouseleave(function(){
						if(limitLoopCount < 1 || loopCount<limitLoopCount){_slider.slick('slickPlay');}
					});
				}

				if( $slider.data('showPrevNextButtonOnHover') ) {
					var arrowBtns = _slider.find(".slick-arrow").hide();
					_slider.mouseenter(function(){arrowBtns.show();}).mouseleave(function(){arrowBtns.hide();});
				}


				var naviDots = _slider.find(".slick-dots").hide();
				if( $slider.data('showSlideNavigationButton') ) {
					naviDots.show();
				} else {
					if( $slider.data('showSlideNavigationButtonOnHover') ) {
						_slider.mouseenter(function(){naviDots.show();}).mouseleave(function(){naviDots.hide();});
					}
				}

				_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
					Method.videoPause(slick.$slider);
					var $thumb = $(this).parent().find(".slider-thumb ul>li");
					if( $thumb.length > 0 ){
						$thumb.removeClass("active");
						$thumb.eq(nextSlide).addClass("active");
					}
				});

				_slider.on('breforeResize', function(event, slick){
					//console.log(slick);
					Method.resizeEvent( slick );
				});

				// layer hover 구현 - image 등록시만 동작
				/*
				$slider.find('img.slider-layer-content').hover(function(event){
					var _this = $(this);
					var _hover = _this.data( 'hover' );
					if( !brz.util.isEmpty(_hover) ) {
						_this.attr( 'src', _hover );
					}
				}, function(event){
					var _this = $(this);
					var _primary = _this.data( 'primary' );
					if( !brz.util.isEmpty( _primary ) ) {
						_this.attr( 'src', _primary );
					}
				});
				*/

				// 최초 실행
				if( _slider.length > 0 ) {
					Method.resizeEvent( _slider.get(0).slick );
				}
			}


		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-slick-slider]',
					attrName:'data-module-slick-slider',
					moduleName:'module_slick_slider',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_image_list', function(sandbox){
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var $item = $this.find('[data-image-item]');
				var total = $item.length;

				$item.on('mouseenter', function(){
					$(this).find('.hover').show();
				});

				$item.on('mouseleave', function(){
					$(this).find('.hover').hide();
				});
				
				if( $this.find('.not').length > 0 ){
				    $item.addClass('uk-width-medium-1-' + total); 
				}
				$this.show();
			},
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-image-list]',
					attrName:'data-module-image-list',
					moduleName:'module_image_list',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_social_login', function(sandbox){
		var Method = {
			moduleInit:function(){
				$this = $(this);
				sandbox.getComponents('component_select', {context:$this}, function(){
					this.addEvent('change', function(val){
						Method.submitFormByName( val );
					});
				});

				$(this).find('[data-social-btn]').on('click', function(e){
					e.preventDefault();
					var type = $(this).data('social-btn');
					Method.submitFormByName( type );
				})


			},
			submitFormByName:function(name){
				var $form = $this.find('form[name="' + name + '"]');
				if( $form ){
					$form.submit();
				}
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-social-login]',
					attrName:'data-module-social-login',
					moduleName:'module_social_login',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_instagram_embed', function(sandbox){
		var $this, args, model;
		var getFeedLoad = function(id){
			//var url = 'https://api.instagram.com/oembed/?url=http://instagr.am/p/BXW-qBZlRW1 ( feed ID ) /'  // embad
			//URL A short link, like http://instagr.am/p/fA9uwTtkSN/.
			//queryParam - MAXWIDTH, HIDECAPTION, OMITSCRIPT, CALLBACK

			sandbox.utils.jsonp('https://api.instagram.com/oembed/', {url:'http://instagr.am/p/' + id}, 'callback', function(data){
				$('#common-modal').find('.contents').empty().append(data.html);
				modal.show();

				if(window.instgrm){
					window.instgrm.Embeds.process();
				}
			});
		}

		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];

				var arrInstagramEmbed = args.feedIds.split("|");
				var template = Handlebars.compile($(args.template).html());

				//modal init
				modal = UIkit.modal('#common-modal', {center:true});
				modal.off('.uk.modal.instagram').on({
					'hide.uk.modal.instagram':function(){
						console.log('instagram modal hide');
						$('#common-modal').find('.contents').empty();
						//delete window.instgrm;
					}
				});

				for(var i=0; i<arrInstagramEmbed.length; i++){
					var bindingHtml = template({feedId:sandbox.utils.trim(arrInstagramEmbed[i])});
					$this.append(bindingHtml);
				}

				//instagram feed Event
				$this.find('a').each(function(){
					$(this).click(function(e){
						e.preventDefault();

						getFeedLoad($(this).attr('href'));
					});
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-instagram-embed]',
					attrName:'data-module-instagram-embed',
					moduleName:'module_instagram_embed',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				console.log('product destory');
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_social_share', function(sandbox){
		var endPoint, $this;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				endPoint = Core.getComponents('component_endpoint');

				$this.on('click', '#kakao-btn-wrapper', function(){
					endPoint.call('socialShareClick', {service : 'kakaotalk'});
				})

				$this.on('click', '.at-share-btn-elements a', function(){
					var service = '';
					var className = String( $(this).attr("class") );
					if( className.indexOf('facebook') > -1){
						service = 'facebook';
					}

					if( className.indexOf('twitter') > -1){
						service = 'twitter';
					}

					if( className.indexOf('kakao') > -1){
						service = 'kakao';
					}

					if( className.indexOf('email') > -1){
						service = 'email';
					}

					if( className.indexOf('lineme') > -1){
						service = 'lineme';
					}

					if( className.indexOf('pinterest') > -1){
						service = 'pinterest';
					}
					endPoint.call('socialShareClick', {service : service});
				})
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-social-share]',
					attrName:'data-module-social-share',
					moduleName:'module_social_share',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				if($this) $this.off();
				endPoint = null;
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_kakao', function(sandbox){
		var $this, args;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];

				if(args.appid === 'null') console.log('kakao appid is defined');

				Kakao.init(args.appid);
				Kakao.Link.createDefaultButton({
					container:args.btnContainer,
					objectType:'feed',
					content:{
						title:$('title').text(),
						imageUrl:location.origin + args.feedImg,
						link:{
							mobileWebUrl:location.href,
							webUrl:location.href
						}
					},
					buttons:[
						{
							title:'웹으로 보기',
							link: {
								mobileWebUrl:location.href,
								webUrl:location.href
							}
						}
					]
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-kakao]',
					attrName:'data-module-kakao',
					moduleName:'module_kakao',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				console.log('product destory');
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_store', function(sandbox){
		var $this, $infoViewContainer, filterQuery = [], searchQueryString = '', endPoint, storeInfoComponent, mapComponent, isAjax = false, reqPage = 1;
		/*
			store-info-view 에 추가되는 dom object

			<h2 class="tit">명동</h2>
			<span class="address">서울 영등포구 여의도동</span>
			<span class="phonenum">070-0000-0000</span>
			<dl class="info">
				<dt class="key">운영시간</dt>
				<dd class="value">평일 10:00, 주말 11:00</dd>
				<dt class="key">매장정보</dt>
				<dd class="value">네이버 지도 API v3는 JavaScript 형태로 제공되는 NAVER 지도 플랫폼으로써</dd>
			</dl>
			<button class="close-btn"><i class="icon-delete_thin"></i></button>
		*/

		/**************************

			매장검색
			매장이름, 지역검색 : _find=지하철&_search=name&_condition=like
			필터 : _find={{매장타입}}&_search=storeType&_condition=or||and

			admin에서 재고위치/대리점의 추가속성에 storeType, icon은 각각, 검색필터와 마커의 아이콘의 클래스를 입력하는 속성이다.

			membership: 나이키 멤버십 및 티켓을 사용 할 수 있는 매장
			nrc: nike running club
			ntc: nike traingin club
			reservation: 매장 상품 예약 서비스 제공 하는 매장

		***************************/

		var submitSearchMap = function(){
			//_find=서울&_search=name&_condition=like&_find=손목시계,지하철&_search=storeType&_condition=or

			var filterParams = location.pathname + '?';
			if(searchQueryString !== '') filterParams += searchQueryString + '&';
			if(filterQuery.length > 0){
				filterParams += '_find='+filterQuery.join(',')+'&_search=storeType&_condition=like';
			}
			location.href = filterParams.replace(/[?|&]$/, '');
		}

		var requestMapPaging = function(){
			if(isAjax == false && reqPage){
				reqPage = ++reqPage;
				var queryParams = Core.Utils.getQueryParams(location.href, 'array');
				var url = (queryParams.length > 0) ? Core.Utils.contextPath + '/store?' + queryParams.join('&') : Core.Utils.contextPath + '/store';
				Core.Utils.ajax(url, 'GET',{'page':reqPage}, function(data){
					var storeList = sandbox.rtnJson($(data.responseText).find('[data-component-map]').attr('data-store-list')) || [];
					if($(data.responseText).find(".search-list").length === 0){
						reqPage = undefined;
					}else{
						$(data.responseText).find(".search-list").each(function(){
							$(".search-result").append($(this));
						});
						if(mapComponent) mapComponent.setStoreList(storeList).reInit();
					}

					setTimeout(function(e){
						isAjax = false;
					}, 100);
				},true);
			}
		}

		var Method = {
			moduleInit:function(){
				var args = arguments[0];
				$this = $(this);
				$infoViewContainer = $(this).find(args.infoview);

				endPoint = Core.getComponents('component_endpoint');

				var currentParams = sandbox.utils.getQueryParams(location.href);
				var arrCurrentFilters = [];
				var currentStoreIndex = 0;
				if(currentParams.hasOwnProperty('_find') && currentParams['_find'] instanceof Array){
					arrCurrentFilters = sandbox.utils.arrSameRemove(currentParams['_find'][1].split(','));
				}else{
					currentParams = null;
					arrCurrentFilters = null;
				}

				mapComponent = sandbox.getComponents('component_map', {context:$this}, function(){
					this.addEvent('openMarker', function(storeInfo, i){
						//var objStoreInfo = Method.getStoreList($(this).attr('data-store-id'));

						storeInfo.OpeningHours = storeInfo.additionalAttributes['영업시간'];

						Method.showInfoDetail(storeInfo);
						currentStoreIndex = i;
						if($('body').attr('data-device') !== 'pc') $this.find('.search-result').css('display','none');
					});

					this.addEvent('closeMarker', function(i){
						$infoViewContainer.stop().animate({'left':$infoViewContainer.outerWidth(true)}, 300, function(){
							$infoViewContainer.removeAttr('style');
							$this.find('.search-result').removeAttr('style');
						});
					});
				});

				var searchField = sandbox.getComponents('component_searchfield', {context:$this}, function(){
					/*this.addEvent('beforeSubmit', function(){
						var val = arguments[0];
						$('input[name=_find]').val(val);
					});*/
					this.addEvent('searchEmpty', function($form){
						searchQueryString = $form.serialize();
						endPoint.call("searchStore", { key : searchQueryString })
						submitSearchMap();
					});

					this.addEvent('searchKeyword', function($form, value){
						searchQueryString = $form.serialize();
						endPoint.call("searchStore", { key : searchQueryString })
						submitSearchMap();
					});
				});

				var searchCheckBox = sandbox.getComponents('component_checkbox', {context:$this}, function(i, dom){
					this.addEvent('change', function(val){
						var $this = $(this);
						var index = filterQuery.indexOf(val);
						var val = $this.val();
						if(val !== 'all'){
							if($this.parents('[data-component-checkbox]').hasClass('checked')){
								filterQuery.push(val);
							} else{
								filterQuery.splice(filterQuery.indexOf(val),1);
							}
						}
					});

					if(arrCurrentFilters !== null && arrCurrentFilters.indexOf(encodeURI(this.getThis().val())) > -1){
						this.getThis().prop('checked', true);
						this.getThis().trigger('change');
					}
				});

				storeInfoComponent = new Vue({
					el:'#store-info-vue',
					data:{
						"name":null,
						"address1":null,
						"address2":null,
						"phone":null,
						"openHours":null
					},
					methods:{
						close:function(){
							mapComponent.mapEvent(currentStoreIndex);
						}
					}
				});

				$(this).find('.filter-btn').click(function(e){
					e.preventDefault();

					/*if(filterQuery.length > 0){
						var filterQueryParams = sandbox.utils.getQueryParams($(this).closest('form').serialize());
						filterQueryString = '_find='+filterQuery.join(',');
						if(filterQueryParams._search) filterQueryString += '&_search='+filterQueryParams._search;
						if(filterQueryParams._condition) filterQueryString += '&_condition='+filterQueryParams._condition;
					}else{
						filterQueryString = '';
					}*/

					searchField.externalAction();
				});

				//매장목록 페이징처리
				$(".search-result").scroll(function(){
					if((this.scrollTop + this.clientHeight) >= this.scrollHeight){
						requestMapPaging();
						isAjax = true;
					}
				});

				$(this).find('.search-result').on('click', 'li .search-list-a', function(e){
					e.preventDefault();

					mapComponent.mapEvent($(this).parent().index());

					$this.find('.search-result').removeAttr('style');
					if($('body').attr('data-device') !== 'pc') {
						$this.find('.search-result').css('display', 'none');
					}

					//서비스필터 open 상태에서 매장 목록 클릭시 서비스필터 close함
					var target = '#service-filter-area';
					if($(target).is(":visible")){
						$(target).hide();
						$(target).addClass('close');
					}
				});

				//service filter area show and hide
				$(this).on('click', '#service-filter-btn', function(e){
					var target = '#service-filter-area';
					if($(target).is(":visible")){
						$(target).hide();
						$(target).addClass('close');
					} else {
						$(target).show();
						$(target).removeClass('close');
					}
				});

				Method.updateCheckAll();

				// 매장찾기 전체 체크시
				$(this).find('input.check-all-store[type="checkbox"]').on('change', Method.changeAllCheck);
				// 아이템 체크박스 선택시
				$(this).find('input.check-item-store[type="checkbox"]').on("change", Method.changeItemCheck);

				//args에 startToDetail이 true일때 해당 상점의 디테일에 이벤트trigger를 한다. 단, storeId로 단일 상점필터를 걸었을경우 동작한다.
				if(args.startToDetail === 'true' && $(this).find('.search-result > li').length === 1){
					$(this).find('.search-result > li').eq(0).find('a').trigger('click');
				}
			},
			// 매장찾기 전체 체크 처리
			changeAllCheck:function(e){
				e.preventDefault();
				var isCheck = $(this).prop('checked');
				$('input.check-item-store[type="checkbox"]').each( function(){
					if(isCheck == true && !$(this).prop('checked')){
						$(this).prop('checked', isCheck ).trigger('change');
					}
					if(isCheck == false && $(this).prop('checked')){
						$(this).prop('checked', isCheck ).trigger('change');
					}
				});
			},
			// 아이템 체크박스 선택시
			changeItemCheck:function(e){
				var isCheck = $(this).prop('checked');
				if( isCheck ){
					$(this).parent().addClass('checked');
				}else{
					$(this).parent().removeClass('checked');
				}
				Method.updateCheckAll();
			},
			// 아이템 체크박스 변경시 전체 선택 체크박스 상태처리
			updateCheckAll:function(){

				if($('input.check-item-store[type="checkbox"]').length == $('input.check-item-store[type="checkbox"]:checked').length ){
					$('input.check-all-store[type="checkbox"]').prop( 'checked', true);
				}else{
					$('input.check-all-store[type="checkbox"]').prop( 'checked', false);
				}
			},
			//Store 선택 시 상세 정보 만드는 스크립트 실행
			showInfoDetail:function(data){
				storeInfoComponent.name = data.name;
				storeInfoComponent.address1 = data.address1;
				storeInfoComponent.address2 = data.address2;
				storeInfoComponent.phone = data.phone;
				storeInfoComponent.openHours = data.additionalAttributes['영업시간'];
				$infoViewContainer.stop().animate({'left':0}, 300);
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-store]',
					attrName:'data-module-store',
					moduleName:'module_store',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';
	Core.register('module_minicart', function(sandbox){
		var args, cartItemLenComponent, endPoint;
		var Method = {
			$that:null,
			$closeBtn:null,

			moduleInit:function(){
				var $this = $(this);
				Method.$that = $this;
				args = arguments[0];
				cartItemLenComponent = Core.getComponents('component_cartitemlen', {context:$('body')});
				endPoint = Core.getComponents('component_endpoint');

				$this.on('click', '[data-remove-item]',  function(e){
					e.preventDefault();
					var model = $(this).closest(".order-list").find("input[name='model']").val();
					var name = $(this).closest(".order-list").find("[data-eng-name]").data("eng-name");
					Method.removeItem( $(this).attr('href'), model, name);
				});

				$this.on('click', '[data-checkout-btn]', function(e){
					e.preventDefault();

					var info = $this.find('.cart-order_list .order-list');
					var itemList = [];

					$.each( info, function( index, productData ){
						var id = $(productData).find( '[data-id]').data('id');
						var model = $(productData).find( '[data-model]').data('model');
						var name = $(productData).find( '[data-name]').data('name');
						var retailPrice = $(productData).find( '[data-retail-price]').data('retail-price');
						var salePrice = $(productData).find( '[data-sale-price]').data('sale-price');
						var quantity = $(productData).find( '[data-quantity]').data('quantity');
						itemList.push({
							id : id,
							model : model,
							name : name,
							price : salePrice,
							retailPrice : retailPrice,
							quantity : quantity
						})
					})

					endPoint.call('checkoutSubmit',{ itemList : itemList });
					location.href = $(this).attr('href');
				});

				$this.on('click', '[data-keep-shopping]', function(e){
					// e.preventDefault();
					Method.hide();
				});
			},
			show:function(){
				//UIkit.offcanvas arguments type : selector:string, option:object
				UIkit.offcanvas.show('#minicart', {target:'#minicart', mode:'slide'});
			},
			hide:function(){
				//uikit 사용으로 hide는 필요없는 상황
				UIkit.offcanvas.hide('#minicart');
			},

			update:function( callback ){
				var obj = {
					'mode':'template',
					'templatePath':'/cart/partials/miniCart',
					'resultVar':'cart',
					'cache':new Date().getTime()
				}

				sandbox.utils.ajax(sandbox.utils.contextPath + '/processor/execute/cart_state', 'GET', obj, function(data){
					Method.$that.empty().append(data.responseText);
					var $data = $(data.responseText);
					var itemSize = $data.filter('input[name=itemSize]').val();
					var cartId = $data.filter('input[name=cartId]').val();

					if(Array.isArray(cartItemLenComponent)){
						for(var i=0, len=cartItemLenComponent.length; i<len; i++){
							cartItemLenComponent[i].setItemLength(itemSize);
						}
					}else{
						cartItemLenComponent.setItemLength(itemSize);
					}

					if( callback ){
						callback( { cartId : cartId} );
					}
					Method.show();
				});
			},
			removeItem:function( url, model, name ){
				// error 체크와 ajax 로딩 처리 추가 되야 함
				UIkit.modal.confirm("상품을 삭제 할까요?", function(){
					sandbox.utils.ajax(url, 'GET', {}, function(data){
						var param = sandbox.utils.url.getQueryStringParams( url );
						param.model = model;
						param.name = name;
						endPoint.call( 'removeFromCart', param );
						Method.update();
					});
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-minicart]',
					attrName:'data-module-minicart',
					moduleName:'module_minicart',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			show:Method.show,
			hide:Method.hide,
			update:Method.update
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_switcher', function(sandbox){
		var Method = {
			moduleInit:function(){
				// structured content에서 ukkit에 switcher module를 사용할 때 categoryslider 리셋 처리
				$(this).on('show.uk.switcher', function(event, area){
					var $container = $(this).closest('.content-container').find('.tab-container.uk-switcher > *').eq($(area).index());
					var $slider = $container.find('[data-component-slider]');
					if( $slider.length > 0){

						Core.getComponents('component_slider', {context:$container}, function(){
							$(this)[0].redrawSlider();
						});

						//$slider.bxSlider().reloadSlider();
					}

					/* image lazeload를 사용하지 않아 주석처리함 */
					/*setTimeout(function(e){
						$(window).trigger("scroll");
					}, 10);*/
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-switcher]',
					attrName:'data-module-switcher',
					moduleName:'module_switcher',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_newsletter', function(sandbox){
		var $this, args, $submitBtn, endPoint;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				$submitBtn = $this.find('.btn_join')
				args = arguments[0];
				endPoint = Core.getComponents('component_endpoint');

				var modal = UIkit.modal('#common-modal');
				var checkboxComponent = sandbox.getComponents('component_checkbox', {context:$this});
				var inputComponent = sandbox.getComponents('component_textfield', {context:$this}, function(){
					this.addEvent('enter', function(e){
						$submitBtn.trigger('click');
					});
				});

				$submitBtn.click(function(e){
					e.preventDefault();
					var _self = this;

					var $form = $(_self).closest('form');
					var param = $form.serialize();

					if(inputComponent.getValidateChk() && checkboxComponent.getValidateChk()){
						sandbox.utils.ajax($form.attr('action'), $form.attr('method'), param, function(data){
							var response = sandbox.rtnJson(data.responseText);

							if(response.hasOwnProperty('isSuccess')){
								endPoint.call('newsletterSubscribed');
								UIkit.notify(args.successMsg, {timeout:3000,pos:'top-center',status:'success'});
							}else if(response.hasOwnProperty('error')){
								UIkit.notify(response.error, {timeout:3000,pos:'top-center',status:'success'});
							}

							inputComponent.setValue('');
							checkboxComponent.getThis().trigger('click');
						});
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-newsletter]',
					attrName:'data-module-newsletter',
					moduleName:'module_newsletter',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				console.log('newsLetter destory');
			}
		}
	});
})(Core);

(function(Core){
	'use strict';
	Core.register('module_wishlist', function(sandbox){

		var $this, modal;
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var miniCartModule = sandbox.getModule('module_minicart');
				modal = UIkit.modal('#common-modal', {center:true});

				$this.on('click', '.wish-delete_btn', function(e){
					e.preventDefault();
					var $that = $(this);
					UIkit.modal.confirm('삭제 하시겠습니까?', function(){
						location.href = $that.attr('href');
					});
				});

				$this.find('.addtocart').each(function(i){
					var target = $(this).attr('data-target');
					var url = $(this).attr('data-href');

					$(this).click(function(e){
						e.preventDefault();

						Core.Utils.ajax(url, 'GET', {quickview:true}, function(data){
							var domObject = $(data.responseText).find('#quickview-wrap');

							if (domObject.length == 0) {
								UIkit.modal.alert('판매 중지된 상품입니다.');
							} else {
								$(target).find('.contents').empty().append(domObject[0].outerHTML);
								$(target).addClass('quickview');
								Core.moduleEventInjection(domObject[0].outerHTML);
								modal.show();
							}
						});

						/*sandbox.utils.ajax(url, 'POST', data, function(data){
							var jsonData = sandbox.rtnJson(data.responseText);
							if(jsonData.hasOwnProperty('error')){
								UIkit.notify(jsonData.error, {timeout:3000,pos:'top-center',status:'warning'});
							}else{
								//UIkit.notify('쇼핑백에 상품이 담겼습니다.', {timeout:3000,pos:'top-center',status:'success'});
								miniCartModule.update();
							}
						});*/
					});
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-wishlist]',
					attrName:'data-module-wishlist',
					moduleName:'module_wishlist',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_ordercancel', function(sandbox){
		var $this = null,
			$modalDeferred = null, //상위 모듈에서 보낸 $.Deferred
			args = null,
			refundAmountComponent = null,
			checkboxAllCounter = 0,
			isCheckboxAll = false,
			quantitySelectComponent = null,
			checkboxComponent = null,
			reFundBankTextComponent = null,
			isToApp = false,
			callBackUrl = '';


		var checkboxCalculator = function(isValue){
			if(isCheckboxAll){
				if(isValue){
					checkboxAllCounter++;
					if((checkboxComponent.length - 1) <= checkboxAllCounter){
						isCheckboxAll = false;
						Method.submitCalculator();
					}
				}else{
					checkboxAllCounter--;
					if(checkboxAllCounter <= 0){
						isCheckboxAll = false;
						Method.emptyRefundPayment();
					}
				}
			}else{
				if(isValue){
					checkboxAllCounter++;
				}else{
					checkboxAllCounter--;
				}
				Method.submitCalculator();
			}
		}

		var arrIndexOfs = function(key, arr){
			var arrIndex = [];
			for(var i=0; i<arr.length; i++){
				if(arr[i] === key){
					arrIndex.push(i);
				}
			}
			return arrIndex;
		}

		var checkboxAllValidateChk = function(){
			var isChecked = true;
			var $itemCheckbox = $this.find('.item-checkbox');
			for(var i=0; i < $itemCheckbox.length; i++){
				if(!$itemCheckbox.eq(i).find('input[type=checkbox]').prop('checked')){
					isChecked = false;
					break;
				}
			}
			return isChecked;
		}

		var Method = {
			moduleInit:function(){
				args = arguments[0];
				$this = $(this);

				//취소할 아이템
				var items = $this.find('.return-reason-item');
				var orderStatusFormData = sandbox.utils.getQueryParams($this.find('#order-status-form').serialize().replace(/\+/g, ' '));
				var arrOrderItemId = [];
				var arrItemParentOrderItemId = [];

				isToApp = (args['data-appcard-cancel']['isAppCard'] === 'true') ? true : false;
				callBackUrl = (args['data-appcard-cancel'].callbackUrl) ? args['data-appcard-cancel'].callbackUrl.replace(/\|/g, '&') : '';

				//주문에드온이 있다면 항상 전체취소만 가능하다.
				var isOrderAddon = (function(){
					var isAddon = false;
					$this.find('.return-reason-item').each(function(i){
						arrOrderItemId.push($(this).attr('data-orderItemId'));
						arrItemParentOrderItemId.push($(this).attr('data-parentOrderItemId'));
						if($(this).attr('data-isAddon') === 'true'){
							isAddon = true;
						}
					});
					return isAddon;
				})();

				var isAbleCancel = (function(){
					if(isToApp){
						return true;
					}else{
						if(orderStatusFormData.isAble === 'true'){
							if(orderStatusFormData.isFdk === 'true' && orderStatusFormData.isMid === 'false'){
								return false;
							}else{
								return true;
							}
						}else{
							return false;
						}
					}
				})();
				var isAblePartial = (isOrderAddon || isToApp) ? false : ((orderStatusFormData.isAblePartial === 'true') ? true : false);
				var isRefundAccount = (orderStatusFormData.isRefundAccount === 'true') ? true : false;

				refundAmountComponent = new Vue({
					el:'#refund-amount',
					data:{
						"isAbleCancel":isAbleCancel,
						"isRefundAccount":isRefundAccount,
						"isAblePartial":isAblePartial,
						"refundPayments":[{
							"paymentType":{"type":null,"friendlyType":null,"isFinalPayment":false},
							"orgPaymentAmount":{"amount":0,"currency":"KRW"},
							"paymentAmount":{"amount":0,"currency":"KRW"},
							"shippingAmount":{"amount":0,"currency":"KRW"},
							"taxAmount":{"amount":0,"currency":"KRW"},
							"totalAmount":{"amount":0,"currency":"KRW"}
						}],
						"refundAccountNeed":(isAbleCancel && isRefundAccount) ? true:false,
						"ableEntireVoid":(isAbleCancel && isAblePartial) ? true:false,
						"fulfillmentCharge":{"amount":0,"currency":"KRW"}
					},
					created:function(){
						this.$nextTick(function(){
							if(this.refundAccountNeed){
								$this.find('.refund-account-container').addClass('need-refund-account');
							}

							checkboxComponent = sandbox.getComponents('component_checkbox', {context:$this}, function(i){
								var INDEX = i;
								this.addEvent('change', function(val){
									var $that = $(this);
									var $quantityWrap = $that.closest('.return-reason-item').find('.quantity-wrap');
									if($(this).val() === 'all'){
										//체크박스 전체선택 / 해제
										isCheckboxAll = true;
										if(val){
											$this.find('.item-checkbox').each(function(){
												if(!$(this).hasClass('checked')){
													$(this).find('> label').trigger('click');
												}
											});
										}else{
											$this.find('.item-checkbox.checked > label').trigger('click');
										}
									}else{
										if(val){
											$quantityWrap.addClass('active');
										}else{
											$quantityWrap.removeClass('active');
										}
										$quantityWrap.find('input[type=hidden]').prop('disabled', !val);
										$this.find('.all-checkbox').find('input[type=checkbox]').prop('checked', checkboxAllValidateChk());

										//product 에드온상품이 있으면, arrItemParentOrderItemId를 비교하여 같이 취소될수있도록 처리한다.
										arrIndexOfs(arrOrderItemId[INDEX - 1], arrItemParentOrderItemId).forEach(function(val, index, arr){
											$this.find('.return-reason-item').eq(val).find('input[type=hidden]').prop('disabled', !val);
										});

										checkboxCalculator(val);
									}
								});
							});

							reFundBankTextComponent = sandbox.getComponents('component_textfield', {context:$this});
							quantitySelectComponent = sandbox.getComponents('component_select', {context:$this}, function(){
								this.addEvent('change', function(val, $selected){
									if($(this).attr('name') === 'refundBank'){
										console.log($selected.attr('data-bankcode-key'));
										$(this).closest('.select-box').find('input[name="refundBankCode"]').val($selected.attr('data-bankcode-key'));
									}else if($(this).attr('name') === 'reason'){
										console.log(val);
									}else{
										$(this).closest('.select-box').siblings().filter('input[name=quantity]').val(val);
										Method.submitCalculator();
									}
								});
							});

							//isAbleCancel이 true이고, checkboxComponent가 undefined일떄 계산기를 실행한다.
							//ropis일때는 계산기 로직을 제외한다. 분명 나중에 다시 수정하게 됨.
							if(this.isAbleCancel && !checkboxComponent){
								Method.submitCalculator();
							}

							$this.find('[data-order-confirm]').click(function(e){
								e.preventDefault();
								if(!$(this).hasClass('disabled')){
									if(isToApp){
										Method.appCreditCardCancel();
									}else{
										Method.submitCancelOrder();
									}
								}
							});

							$this.find('[data-order-cancel]').click(function(e){
								e.preventDefault();
								if($modalDeferred === null){
									sandbox.setLoadingBarState(true);
									sandbox.utils.walkThrough('admin', callBackUrl);
								}else{
									$modalDeferred.reject();
								}
							});
						});
					},
					watch:{
						refundAccountNeed:function(){
							/*if(this.refundAccountNeed === true){
								$this.find('.refund-account-container').addClass('need-refund-account');
							}else{
								$this.find('.refund-account-container').removeClass('need-refund-account');
							}*/
						}
					},
					methods:{
						isPartialVoid:function(groupCancellable, itemCancellabel, index, reverse){
							//isAbleCancel이 false이면 취소가 불가능한 주문이다.
							if(this.isAbleCancel){
								if(arrItemParentOrderItemId[index-1]){
									if(isOrderAddon){
										return false;
									}else{
										if(reverse){
											return true;
										}else{
											return false;
										}
									}
								}

								//isAblePartial이 false이면 무조건 전체취소만 가능하다.
								if(this.isAblePartial){
									//itemCancellabel이 false이면 전체취소만 가능하다.
									if(itemCancellabel){
										if(items.length <= 1 && items.attr('data-item-quantity') <= 1){
											return false;
										}else{
											return true;
										}
									}else{
										return false;
									}
								}else{
									return false;
								}
							}else{
								if(reverse){
									return true;
								}else{
									return false;
								}
							}
						},
						isOrderPartialVoid:function(reverse){
							//isAbleCancel이 false일때는 취소불가능
							//isAbleCancel이 true 이고, isAblePartial이 true일때 부분취소가능
							//isAbleCancel이 true 이고, isAblePartial이 false일 전체취소만가능
							if(this.isAbleCancel){
								if(this.isAblePartial){
									if(items.length <= 1 && items.attr('data-item-quantity') <= 1){
										return false;
									}else{
										return true;
									}
								}else{
									return false;
								}
							}else{
								if(reverse){
									return true;
								}else{
									return false;
								}
							}
						},
						rtnCause:function(){
							if(this.isAbleCancel){
								if(this.isAblePartial){
									if(items.length <= 1 && items.attr('data-item-quantity') <= 1){
										return '하단의 취소 버튼을 클릭하시면 취소가 완료됩니다.';
									}else{
										return '주문을 취소하실 상품과 수량을 선택해 주세요.';
									}
								}else{
									if(isToApp){
										return '하단의 취소 버튼을 클릭하시면 취소가 완료됩니다.';
									}else{
										return decodeURIComponent(orderStatusFormData['restrict-partial']);
									}
								}
							}else{
								return (function(){
									//ErrorCode 01 - fdk결제한 주문이며, 매입전 주문이지만 마이페이지주문 목록에 노출되고 있어 결제취소가 가능하게 되어 있음(결제취소 불가 해야함)
									//조건은 fdk결제이며, 결제 mid가 있으면 취소불가 error msg 출력
									var cause = decodeURIComponent(orderStatusFormData['never-cause']);
									return (cause !== 'undefined') ? cause : '매입 전 취소는 온라인에서 불가능 합니다.';
								})();
							}
						},
						rtnPaymentType:function(paymentType){
							var label = '';
							switch(paymentType){
								case 'CUSTOMER_CREDIT' :
									label = '적립금';
									break;
								case 'GIFT_CARD' :
									label = '기프트카드';
									break;
								case 'CREDIT_CARD' :
									label = '신용카드';
									break;
								case 'MOBILE' :
									label = '휴대폰소액결제';
									break;
								case 'BANK_ACCOUNT' :
									label = '실시간계좌이체';
									break;
								case 'KAKAO_POINT' :
									label = '카카오페이'
									break;
							}
							return label;
						},
						price:function(amount){
							return sandbox.utils.price(amount);
						}
					}
				});
			},
			submitCalculator:function(){
				if(!args['data-module-ordercancel'].orderId){
					UIkit.notify('orderId가 없습니다.', {timeout:3000,pos:'top-center',status:'danger'});
					return;
				}

				var formData = $this.find('#cancel-items-form').serialize();
				var url = sandbox.utils.contextPath + '/account/order/partial-cancel-calculator/' + args['data-module-ordercancel'].orderId;
				var transFormData = sandbox.utils.getQueryParams(formData);
				var isFormDataValidateChk = (transFormData.hasOwnProperty('orderItemId') && transFormData.hasOwnProperty('quantity')) ? true:false;

				if(refundAmountComponent.isAbleCancel && isFormDataValidateChk){
					sandbox.utils.ajax(url, 'POST', formData, function(data){
						var data = sandbox.rtnJson(data.responseText, true);
						var result = data['result'];
						if(data['result'] && data['ro']){
							refundAmountComponent.refundPayments = [];
							for(var i=0; i<data['ro']['refundPayments'].length; i++){
								if(data['ro']['refundPayments'][i].paymentType.type !== 'COD'){
									refundAmountComponent.refundPayments.push(data['ro']['refundPayments'][i]);
								}
							}

							//refundAmountComponent.refundAccountNeed = data['ro']['refundAccountNeed'];
							refundAmountComponent.ablePartialVoid = data['ro']['ablePartialVoid'];
							refundAmountComponent.fulfillmentCharge = data['ro']['fulfillmentCharge'];
							refundAmountComponent.ableEntireVoid = data['ro']['ableEntireVoid'];

							//cancelBtn enabled
							$this.find('[data-order-confirm]').removeClass('disabled');
						}else{
							if($modalDeferred !== null){
								$modalDeferred.reject(data['errorMsg']);
							}else{
								UIkit.modal.alert(data['errorMsg']);
							}
						}
					}, false, false, 100);
				}else{
					Method.emptyRefundPayment();
				}
			},
			emptyRefundPayment:function(){
				//계산할 금액 없음
				refundAmountComponent.refundPayments = [];

				//cancelBtn disabled
				$this.find('[data-order-confirm]').addClass('disabled');
			},
			refundAccountValidateChk:function(){
				//refundAccount validate check
				var $deferred = $.Deferred(),
					data = '';

				if(refundAmountComponent.refundAccountNeed){
					//validateChk
					var $form = $this.find('#refund-account-form');
					sandbox.validation.init( $form );
					sandbox.validation.validate( $form );

					if(sandbox.validation.isValid( $form )){
						$deferred.resolve($this.find('#refund-account-form').serialize());
					}else{
						$deferred.reject();
					}
				}else{
					$deferred.resolve();
				}

				return $deferred.promise();
			},
			cancelReasonValidateChk:function(data){
				//cancel reason validateChk
				var defer = $.Deferred();
				var $form = $this.find('#cancel-reason-form');
				var currentData = (data) ? sandbox.utils.getQueryParams(data, 'array') : [];

				if($form.length > 0){
					sandbox.validation.init( $form );
					sandbox.validation.validate( $form );
					if(sandbox.validation.isValid( $form )){
						defer.resolve(sandbox.utils.getQueryParams($form.serialize(), 'array').concat(currentData).join('&'));
					}else{
						defer.reject();
					}
				}else{
					defer.resolve();
				}
				return defer.promise();
			},
			submitCancelOrder:function(appCancelParams){
				if(!args['data-module-ordercancel'].orderId){
					UIkit.notify('orderId가 없습니다.', {timeout:3000,pos:'top-center',status:'danger'});
					return;
				}

				Method.refundAccountValidateChk().then(function(data){
					//cancel reason validateChk
					return Method.cancelReasonValidateChk(data);
				}).then(function(data){
					//orderCancel Item validate check
					var defer = $.Deferred();
					var cancelItemsData = $this.find('#cancel-items-form').serialize();
					var transFormData = sandbox.utils.getQueryParams(cancelItemsData);
					var currentData = sandbox.utils.getQueryParams(data, 'array');
					var isFormDataValidateChk = (transFormData.hasOwnProperty('orderItemId') && transFormData.hasOwnProperty('quantity')) ? true:false;
					if(refundAmountComponent.isAbleCancel && isFormDataValidateChk){
						defer.resolve(sandbox.utils.getQueryParams(cancelItemsData, 'array').concat(currentData).join('&'));
					}else{
						defer.reject('취소할 상품을 선택해주세요.');
					}
					return defer.promise();
				}).then(function(data){
					//submitCancelOrder confirm check
					var defer = $.Deferred();
					var message = (refundAmountComponent.ableEntireVoid) ? '취소 하시겠습니까?' : '선택한 상품을 취소하시겠습니까?';
					if(appCancelParams){
						defer.resolve(data);
					}else{
						UIkit.modal.confirm(message, function(){
							defer.resolve(data);
						},function(){
							defer.reject();
						},{
							labels: {'Ok': '확인', 'Cancel': '취소'}
						});
					}

					return defer.promise();
				}).then(function(data){
					//submitCancelOrder async
					var orderCancelApi = (isToApp)? '/account/order/appCancel/' : ((refundAmountComponent.ableEntireVoid) ? '/account/order/cancel/' : '/account/order/partial-cancel/');
					var url = sandbox.utils.contextPath + orderCancelApi + args['data-module-ordercancel'].orderId;
					var currentData = (appCancelParams) ? appCancelParams : [];
					var mixedData = sandbox.utils.getQueryParams(data, 'array').concat(currentData).join('&');
					return sandbox.utils.promise({
						url:url,
						method:'POST',
						data:mixedData
					});
				}).then(function(data){
					//part of submitCancelOrder complate
					var marketingType = '';
					if( data['result'] == true ){
						var marketingData = _GLOBAL.MARKETING_DATA();
						if( marketingData.useGa == true ){
							var marketingOption = {
								orderType : marketingType,
								orderId : Method.cancelOrderId
							};
							Core.ga.processor( marketingOption );
						}
						if($modalDeferred !== null){
							$modalDeferred.resolve(data);
						}else{
							UIkit.modal.alert('주문취소되었습니다.').on('hide.uk.modal', function(){
								sandbox.setLoadingBarState(true);
								sandbox.utils.walkThrough('admin', callBackUrl);
							});
						}
					}else{
						if($modalDeferred !== null) $modalDeferred.reject(data['errorMsg']);
					}
				}).fail(function(error){
					if(error) UIkit.modal.alert(error);
				});
			},
			appCreditCardCancel:function(){
				/* assist admin에서 앱카드 당일 취소시 사용 */
				Method.cancelReasonValidateChk().then(function(){
					var appFromData = sandbox.utils.getQueryParams($this.find('#appcancel').serialize().replace(/\+/g, '%20'));
					var arrQueryParams = [
						"callbackScript=Core.getModule('module_ordercancel').callBackCancelFdk",
						"cardCashSe=CARD",
						"delngSe=0",
						"splpc=" + appFromData.totalAmount,
						"vat="+ (appFromData.totalAmount * 1) * 0.1,
						"taxxpt=0",
						"instlntMonth=" + appFromData.month,
						"aditInfo=order_no%3D" + args['data-module-ordercancel'].orderId,
						"srcConfmNo=" + appFromData.confmNo,
						"srcConfmDe=" + appFromData.paydate
					];
					window.location.href = "seamless://pay=cancel&mode=req&"+arrQueryParams.join('&');
				}).fail(function(error){
					if(error) UIkit.modal.alert(error);
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-ordercancel]',
					attrName:['data-module-ordercancel', 'data-appcard-cancel'],
					moduleName:'module_ordercancel',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				$modalDeferred = null;
				console.log('destroy orderCancel module');
			},
			setDeferred:function(defer){
				$modalDeferred = defer;
			},
			callBackCancelFdk:function(resp){
				/* finpay 결제취소 콜백 */
				var decodeResp = decodeURIComponent(resp);
				var respObj = sandbox.utils.getQueryParams(decodeResp);
				var respArr = sandbox.utils.getQueryParams(decodeResp, 'array');
				if(respObj.setleSuccesAt == 'X'){
					//앱카드취소 실패
					if(respObj.setleMssage === '원거래없음'){
						UIkit.modal.alert('결제 시 사용한 카드가 아니거나 원거래 내역이 존재하지 않습니다.');
					}else{
						UIkit.modal.alert(respObj.setleMssage);
					}
				}else if(respObj.setleSuccesAt == 'O'){
					//앱카드취소 성공
					respArr.push('fdkCardCancel=Y');
					Method.submitCancelOrder(respArr);
				}
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_date_filter', function(sandbox){
		var Method = {
			$that:null,
			moduleInit:function(){
				var $this = $(this);
				Method.$that = $this;
				Method.$start = Method.$that.find('#start-date');
				Method.$end = Method.$that.find('#end-date');

				//css로 처리가 안되어 강제아코디언 height auto 추가;
				//꼭 지워야한다.
				setTimeout(function(){
					$this.find('.uk-accordion').css('height','auto');
				}, 100);

				$this.find('[data-date-list] a').on('click', function(){
					var value = $(this).attr('data-date');
					var currentQueryParams = sandbox.utils.getQueryParams(location.href);
					var arrCurrentQuery = [];
					for(var key in currentQueryParams){
						if(key !== 'fgType' && key !== 'ableCod' && key !== 'fulfillType'){
							arrCurrentQuery.push(key+'='+currentQueryParams[key]);
						}
					}

					switch(value){
						case '' :
							window.location.href = location.pathname;
							break;
						case 'ship' :
							window.location.href = location.pathname +'?'+ 'fgType=PHYSICAL_SHIP&fulfillType=type1';
							break;
						case 'pickup' :
							window.location.href = location.pathname +'?'+ 'fgType=PHYSICAL_PICKUP&fulfillType=type2';
							break;
						case 'bopis' :
							window.location.href = location.pathname +'?'+ 'ableCod=exclude&fulfillType=type1';
							break;
						case 'ropis' :
							window.location.href = location.pathname +'?'+ 'ableCod=only&fulfillType=type2';
							break;
					}
				});

				$this.find('[data-search-btn]').on('click', function(){
					if( Method.getValidateDateInput() ){
						var start = Method.$start.val().toString();
						var end = Method.$end.val().toString();

						//alert( start );
						//alert( moment(start, 'YYYYMMDD') );
						//alert( moment(start, 'YYYY.MM.DD').format('YYYYMMDD'));
						Method.searchSubmit( moment(start, 'YYYY.MM.DD').format('YYYYMMDD'), moment(end, 'YYYY.MM.DD').format('YYYYMMDD'), 'detail' );
					}else{
						UIkit.modal.alert( '기간을 선택해 주세요' );
					}
				});

				// 초기화
				$this.find('[data-reset-btn]').on('click', Method.reset);

				// uikit datepicker module 적용
				$this.find('input[class="date"]').each( function(){
					if( !moment($(this).val(), 'YYYY.MM.DD').isValid() ){
						$(this).val('');
					}
					if( $.trim( $(this).val() ) != ''){
						$(this).val( moment($(this).val(), 'YYYYMMDD').format('YYYY.MM.DD'));
					}
					var datepicker = UIkit.datepicker($(this), {
						maxDate : true,
						format : 'YYYY.MM.DD'
					});

					datepicker.on( 'hide.uk.datepicker', function(){
						$(this).trigger('focusout');
						Method.updateDateInput();
					});
				});

				//data-module-date-filter
			},

			// 앞보다 뒤쪽 날짜가 더 뒤면 두값을 서로 변경
			updateDateInput:function(){
				var start = String(Method.$start.val());
				var end = String(Method.$end.val());

				if( $.trim( start ) == '' || $.trim( end ) == ''  ){
					return;
				}

				// 같다면
				//var isSame = moment(Method.$start.val()).isSame(Method.$end.val());
				// 작다면
				//var isBefore = moment(Method.$start.val()).isBefore(Method.$end.val());
				// 크다면

				var isAfter = moment(start, 'YYYY.MM.DD').isAfter(moment(end, 'YYYY.MM.DD'));

				if( isAfter ){
					var temp = Method.$end.val();
					Method.$end.val( Method.$start.val() );
					Method.$start.val( temp );
				}
			},
			getValidateDateInput:function(){
				var start = String(Method.$start.val());
				var end = String(Method.$end.val());

				if( moment( start, 'YYYY.MM.DD' ).isValid() && moment( end, 'YYYY.MM.DD' ).isValid() ){
					return true;
				}
				return false;
			},
			searchSubmit:function( start, end, type ){
				var url = sandbox.utils.url.getCurrentUrl();
				url = sandbox.utils.url.removeParamFromURL( url, 'dateType' );

				// 전체 검색
				if(_.isUndefined( start )){
					url = sandbox.utils.url.removeParamFromURL( url, 'stdDate' );
					url = sandbox.utils.url.removeParamFromURL( url, 'endDate' );
				}else{
					var opt = {
						stdDate : start,
						endDate : end,
						dateType : type
					}

					url = sandbox.utils.url.appendParamsToUrl( url, opt )
				}

				window.location.href = url;

			},
			reset:function(){
				//Method.$start.val('').trigger('focusout');
				//Method.$end.val('').trigger('focusout');
				window.location.href = location.pathname;
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-date-filter]',
					attrName:'data-module-date-filter',
					moduleName:'module_date_filter',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){ /* BOPIS & LOPIS PICKUP LOCATION LAYER */
    Core.register('module_pickup_location', function(sandbox){

    var $this,
        hasLocalNo,
		vueContainer,
        pickupLocation = {
            currentLocation: null,
            storeList: [],
            locationCodeWrap: false,
            sortLt: false,
            sortNa: false,
            sortQt: false,
        },
        pickupConfirm = { isTaskConfirm: false, customer: null, storeInfo: null, itemRequest: null},

        pickupQuantity={
            isTaskQuantity:false,
            productPrice:0,
            newValue:0,
            min:0,
            max:0,
            size:0,
            quantity:{
                maxQuantity:1,
                msg:'개 까지 구매가능 합니다.',
                quantityStateMsg:'상품의 수량이 없습니다.'
            }
        },

        totalPickupLocation = {},
        location_inventory = {},

        args={},

        $btn,
        serviceMenData={},
        reservationData={},
        arrInventoryList,
        itemRequest,
        confirmData,
        selectedProduct,
        hasLocalNo,
        needMakeMap,
        areaMap = new Map();


    // 사용자 위치 정보 조회 (재고 보유 매장의 위치 정보를 얻어와 내주변 정렬하기 위한 기능)
    function findGeoLocation (isOnLoad) {
        var vm = this;

        var positionOpt = {
            enableHighAccuracy : false, // 정확도 조건. false == 빠른 응답
            timeout: 5000,
            maximumAge : 50000
        };

        if (navigator.geolocation) { // 위치정보 사용
            if (vueContainer.GeoLocation) {

                Core.Loading.show();

                var _delay = _.delay(function () {
                    Core.Loading.hide();
                    console.log('delay')
                }, 7000);

                navigator.geolocation.getCurrentPosition(function (position) {
                    if(serviceMenData['latitude'] != position.coords.latitude || serviceMenData['longitude'] != position.coords.longitude) {
                        serviceMenData['latitude']  = position.coords.latitude;  // API RESERVE
                        serviceMenData['longitude'] = position.coords.longitude; // API RESERVE
                    }

                    // var map = new naver.maps.Map('findGeoLocation');
                    naver.maps.Service.reverseGeocode({
                        location: naver.maps.LatLng(serviceMenData['latitude'], serviceMenData['longitude']),
                    }, function(status, response) {
                        if (status !== naver.maps.Service.Status.OK) {
                            return UIkit.notify("내 위치 정보를 찾을 수 없습니다.", {timeout:3000, pos:'top-center',status:'warning'});
                        }

                        var result = response.result,
                            items = result.items;

                        var _address = items[2].address.split(' ');
                        vueContainer.findLocation = _.drop(_address).join(' ');

                        // console.log('geolocationFindLocation => ', vm.findLocation)
                        vueContainer.GeoLocation = false;
                    });

					Core.Loading.hide();
					clearTimeout(_delay);

                    //pickupLocation.currentLocation = serviceMenData;
					//https://naveropenapi.apigw.ntruss.com/map/v1/geocode
					/*var geoLocation = serviceMenData['longitude'] +','+ serviceMenData['latitude'];
					sandbox.utils.jsonp('https://openapi.naver.com/v1/map/reversegeocode-js', {clientId:args.mapkey, query:geoLocation}, 'callback', function(data, status){
						if(data.hasOwnProperty('error')){
							UIkit.notify("내 위치 정보를 찾을 수 없습니다.", {timeout:3000, pos:'top-center',status:'warning'});
						}else{
	                        vueContainer.findLocation = _.drop(data['result']['items'][2].address.split(' ')).join(' ');
	                        // console.log('geolocationFindLocation => ', vm.findLocation)
	                        vueContainer.GeoLocation = false;
						}
					});*/

                    if(isOnLoad===false) {
                        loadStoreIfRadioChange();
                    }
                },
                null,
                positionOpt
                );
            }


        } else {
            UIkit.notify("내 위치 정보를 찾을 수 없습니다.", {timeout:3000, pos:'top-center',status:'warning'});
            //showPositionError({"error":"ERROR - Geolocation is not supported by this agent"});
        }
    }
    // findGeoLocation(true);


    // 내 주변순 위도 : 경도
    function calculateDistance (lat1, lon1, lat2, lon2) {
        var theta = lon1 - lon2;
        var dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);

        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344; // 킬로미터 단위적용

        function deg2rad (deg) {
            return (deg * Math.PI / 180.0);
        }

        function rad2deg (rad) {
            return (rad * 180 / Math.PI);
        }

        return dist;
    }

    var sizeOptionToggle = function (size, skuID) {
        $this.find('.size-select-txt').text(size);
        $this.find('#reservation-size-title-area').removeClass('uk-active');
        $this.find('.uk-accordion-content').removeClass('uk-active');
        $this.find('.accordion-wrapper').animate({'height':0}, 300, "linear", function () {});

        pickupQuantity.size = parseInt(size);
        vueContainer.pickupLocation(size, skuID);

        UIkit.accordion('.uk-accordion', {showfirst:false});
        $this.find('#idLocationSearch').show();

        // console.log('sizeOptionToggle')
    }

    // template
    Vue.component('pickup-location', {
      props: ['currentLocation', 'locationCodeWrap', 'storeall', 'storeList', 'dp', 'st', 'ls', 'sort', 'toggle', 'sortLt', 'sortNa', 'sortQt', 'findcal'],
      template:'<div>\
      <!--/* 지역코드선태 모달창 */-->\
      <div class="location-code-wrap" v-bind:class="{active:locationCodeWrap}">\
        <h2 class="tit"><span class="label">지역선택</span></h2>\
        <a class="uk-close btn-location-code-close" v-on:click="locationCodeClose"></a>\
        <div class="tit2">지역별 가장 가까운 나이키 매장을 찾으실 수 있습니다.</div>\
        <div class="code-wrap_radio">\
          <ul class="p-checkbox">\
            <li>\
              <input type="checkbox" id="storeAll" name="storelocal" v-model="storeall.active" />\
              <label for="storeAll" v-on:click="toggle(false)">전체</label>\
            </li>\
            <li v-for="(tag, index) in ls" v-if="tag.view === true">\
              <input type="checkbox" name="storelocal" v-model="tag.active" v-bind:id="\'storelocal\' + index" />\
              <label v-bind:for="\'storelocal\' + index" v-on:click="toggle(true)"><span class="label">{{ tag.name }}</span></label>\
            </li>\
          </ul>\
        </div>\
      </div>\
      <div class="dim" v-bind:class="{active:locationCodeWrap}"></div>\
      <div class="current-location-area">\
        <div class="txt">매장상황에 따라 상품수량 및 가격 차이가 있을 수 있습니다.</div>\
        <div class="location-item">\
          <span class="location-addr">\
            <span class="ns-pin-nike icon"></span>\
            <span class="current-location" v-text="findcal">위치정보 없음</span>\
          </span>\
          <a href="#none" class="location-select" v-on:click="locationSelect" data-click-area="inventory" data-click-name="my region">지역 선택</a>\
        </div>\
        <a href="#" class="btn-location-self" v-bind:class="{active:sortLt}" v-on:click="sort(\'locationTarget\')" data-click-area="inventory" data-click-name="nearest store">내 위치</a>\
      </div>\
      <div class="store-list"\
        <!--/* 상품예약 서비스 상점 리스트 */-->\
        <div class="shipping-header">\
          <span class="store-name" v-bind:class="{active:sortNa}" v-on:click="sort(\'name\')">매장명</span>\
          <span class="prd-cnt" v-bind:class="{active:sortQt}" v-on:click="sort(\'quantityNo\')">수량</span>\
        </div>\
        <div class="shipping-body">\
          <template v-if="dp.length">\
            <div v-for="store in dp" class="shipping-list" v-bind:data-locationid="store.id">\
              <div class="column column-addr">\
                <h2 class="tit"><a v-bind:href="\'/kr/ko_kr/store?storeId=\'+store.id" target="_blank" data-click-area="inventory" data-click-name="store info">{{store.name}}</a></h2>\
                <dl class="address-wrap">\
                  <dt class="addr-type">도로명</dt>\
                  <dd class="addr">({{store.zip}}) {{store.address1}} {{store.address2}}</dd>\
                  <dt class="addr-type">연락처</dt>\
                  <dd class="addr"><a v-bind:href="\'tel:\'+store.phone" data-click-area="inventory" data-click-name="store phone number">{{store.phone}}</a></dd>\
                </dl>\
              </div>\
              <div class="column column-reserve">\
                <span class="quantity">{{store.quantityNo}}</span>\
                <button v-if="store.pickupOrderType === \'BOTH\' || store.pickupOrderType === \'BOPIS\'"\
                  v-on:click="runOrderTask"\
                  v-bind:data-locationid="store.id"\
                  v-bind:data-maxquantity="store.quantityNo"\
                  data-pickup-type="bopis"\
                  class="reservation-apply btn-link mini" data-click-area="inventory" data-click-name="store choose:buy">구매하기</button>\
                <button v-if="store.pickupOrderType === \'BOTH\' || store.pickupOrderType === \'ROPIS\'"\
                  v-on:click="runOrderTask"\
                  v-bind:data-locationid="store.id"\
                  v-bind:data-maxquantity="store.quantityNo"\
                  data-pickup-type="lopis"\
                  class="pickup-apply btn-link mini" data-click-area="inventory" data-click-name="store choose">예약하기</button>\
              </div>\
            </div>\
          </template>\
          <template v-else>\
            <div class="less-items uk-text-center">\
              <i class="icon-search color-less x2large"></i><br />\
              해당 지역의 매장정보가 없습니다.\
            </div>\
          </template>\
        </div>\
      </div>\
    </div>',
      methods:{
        currentLocation:function(e){
          e.preventDefault();
          /* 위치기반 서비스 개발 */
          this.$emit('currentLocation');
        },
        runOrderTask:function(e){

            e.preventDefault();

            var storeId = e.target.getAttribute('data-locationid');
            var pickupType = e.target.getAttribute('data-pickup-type');
            var maxQuantity = e.target.getAttribute('data-maxquantity');

            pickupQuantity.min = 1;
            pickupQuantity.newValue = 1;
            pickupQuantity.max = maxQuantity;

            for (var i = 0; i < this.dp.length; i++) {
                if (this.dp[i].id == storeId) {
                    pickupConfirm.storeInfo = this.dp[i];
                }
            }

            pickupQuantity.productPrice = sandbox.rtnPrice($this.find('#productPriceDefault').val());

            this.$emit('ordertask', storeId, pickupType, maxQuantity);
        },

        locationCodeClose: function (e) {
          e.preventDefault();
          pickupLocation.locationCodeWrap = false;
          $this.find('#idLocationSearch').removeClass('active');
        },

        locationSelect: function (e) {
          e.preventDefault();
          pickupLocation.locationCodeWrap = true;
          $this.find('#idLocationSearch').addClass('active');
        },
      }
    });

    Vue.component('pickup-quantity', {
      props:['isTaskQuantity', 'productPrice', 'quantity', 'newValue', 'max', 'min', 'itemRequest'],
      template:'<article id="order-count-select" class="order-count" v-bind:class="{active:isTaskQuantity}" v-bind:data-component-quantity="quantity">\
          <a class="uk-close order-count-select-close" v-on:click="cancel"></a>\
          <h2 class="title">수량 선택</h2>\
          <div class="body">\
            <div class="count">\
              <div class="count-box">\
                <input type="number" v-model="newValue" class="label" readonly />\
                <button type="button" id="count-plus" v-on:click="plusBtn" class="plus"><i class="icon-plus"></i><span>1개씩 추가</span></button>\
                <button type="button" id="count-minus" v-on:click="minusBtn" class="minus"><i class="icon-minus"></i><span>1개씩 삭제</span></button>\
              </div>\
              <div class="price-box">{{productPrice}}</div>\
            </div>\
            <p class="msg"></p>\
            <button type="button" class="qty-selected btn-link width-max large" v-on:click="selected">선택완료</button>\
          </div>\
        </article>',
      methods: {
        plusMinusFun: function (operator, num) {

          var productPrice = $this.find('#productPrice').val();
          var productPriceDefault = $this.find('#productPriceDefault').val();

          if (operator == 'plus') {
            var count = parseInt(productPrice) + parseInt(productPriceDefault);
          } else {
            var count = parseInt(productPrice) - parseInt(productPriceDefault);
          }

          $this.find('#productPrice').val(count);
          $this.find('#retailPrice').val(count);
          $this.find('#quantity').val(num);

          pickupConfirm.itemRequest.quantity = num;
          pickupConfirm.itemRequest.retailprice = sandbox.rtnPrice(String($this.find('#productPrice').val()));

          this.productPrice = sandbox.rtnPrice(String($this.find('#productPrice').val()));
        },
        plusBtn: function () {
          if(this.max == undefined || (this.newValue < this.max)) {
            this.newValue = this.newValue + 1;
            this.plusMinusFun('plus', this.newValue);
          }
        },
        minusBtn: function () {
          if((this.newValue) > this.min) {
            this.newValue = this.newValue - 1;
            this.productPrice = this.productPrice * 2;
            this.plusMinusFun('minus', this.newValue);
          }
        },
        selected: function (e) {
            e.preventDefault();
            pickupConfirm.itemRequest.size = pickupQuantity.size;
            this.$emit('selected', 1);
        },
        cancel: function () {
          this.$emit('cancel', 'quantity');
        }
      },
      created: function() {

      }
    });


    //사용안함
    Vue.component('pickup-confirm', {
      props:['isTaskConfirm', 'customer', 'storeInfo', 'itemRequest'],
      template:'<div class="reservation-confirm-wrap" v-if="isTaskConfirm" v-bind:class="{active:isTaskConfirm}">\
      <div class="header">\
        <h2 class="tit">매장상품 {{itemRequest.titleName}} 확인</h2>\
        <span class="description">아래 정보를 확인하시고,{{itemRequest.titleName}} 신청버튼을 누르시면 <br/>매장상품 {{itemRequest.titleName}}이 완료됩니다.</span>\
      </div>\
      <div class="body">\
        <dl v-if="customer.isSignIn !== \'false\'" class="list-grid">\
          <dt class="caption">신청자 정보</dt>\
          <dd class="column">\
            <div class="contents customer">\
              <span><strong>이름: </strong>{{customer.firstName}}</span><br/>\
              <span><strong>휴대폰: </strong>{{customer.phoneNumber}}\
                <a class="btn-link line mini btn-info-edit" href="/kr/ko_kr/account" data-click-area="inventory" data-click-name="change personal info">회원정보 변경</a>\
              </span>\
            </div>\
          </dd>\
        </dl>\
        <dl v-if="storeInfo !== null" class="list-grid">\
          <dt class="caption">매장 정보</dt>\
          <dd class="column">\
            <div class="contents store">\
              <a class="link" v-bind:href="rtnStoreLink(storeInfo.id)" target="_blank">{{storeInfo.name}}</a>\
              <dl class="address-wrap">\
                <dt class="addr-type">도로명</dt>\
                <dd class="addr">({{storeInfo.zip}}) {{storeInfo.address1}} {{storeInfo.address2}}</dd>\
                <dt class="addr-type">연락처</dt>\
                <dd class="addr">{{storeInfo.phone}}</dd>\
              </dl>\
              <span v-if="storeInfo.additionalAttributes.length > 0"><strong>매장영업시간:</strong><br/></span>\
              <span class="description">매장 영업시간 외 {{itemRequest.titleName}}하신 경우, 다음 날 영업시간 내에 {{itemRequest.titleName}}확정 문자가 전송됩니다.</span>\
            </div>\
          </dd>\
        </dl>\
        <dl v-if="itemRequest !== null" class="list-grid">\
          <dt class="caption">{{itemRequest.titleName}} 상품</dt>\
          <dd class="column">\
            <div class="contents product">\
              <div class="product-image"><img v-bind:src="itemRequest.image" v-bind:alt="itemRequest.image" /></div>\
              <div class="product-info">\
                <a class="link" v-bind:href="itemRequest.url" target="_blank">{{itemRequest.name}}</a>\
                <span class="model">{{itemRequest.model}}</span>\
                <span class="option">색상 : {{itemRequest.option}}</span>\
                <span class="size">사이즈 : {{itemRequest.size}}</span>\
                <span class="quantity">수량 : {{itemRequest.quantity}}</span>\
                <span class="price">가격 : {{itemRequest.retailprice}}</span>\
              </div>\
            </div>\
          </dd>\
        </dl>\
      </div>\
      <p class="msg">\
        * {{itemRequest.titleName}} 신청이 완료되면 선택하신 매장으로부터 {{itemRequest.titleName}}확정 문자가 발송됩니다. 방문기간을 확인 하시고, 매장에 방문하셔서 {{itemRequest.titleName}}하신 상품을 결제하시면 구매가 완료됩니다.<br/>\
        * {{itemRequest.titleName}}취소는 {{itemRequest.titleName}}확정 문자수신 후 2시간 이내에 마이페이지 > 매장상품 {{itemRequest.titleName}} 서비스에서 가능합니다.</p>\
      <div class="footer">\
        <a href="javascript:;" class="reservation-confirm-btn btn-link large" data-click-area="inventory" v-on:click="submit">{{itemRequest.titleName}}하기</a>\
        <a href="javascript:;" class="cencel-btn btn-link line large" data-click-area="inventory" v-on:click="cancel">취소</a>\
      </div>\
    </div>',
      methods:{
        submit:function(e){
            e.preventDefault;
            this.$emit('submit');
        },
        cancel:function(e){
            e.preventDefault;
            this.$emit('cancel', 'orderConfirm');
        },
        rtnStoreLink:function(id){
            return '/kr/ko_kr/store?storeId=' + id;
        }
      }
    });

    var Method = {
        updateAreaAgencyCnt:function(hasLocalNo, areaMap){
            try {
                var countVal,
                    areaId;

                if(hasLocalNo==false) {//지역미선택
                    $this.find('[data-area-info]').each(function(){
                        areaId = $(this).attr('value');
                        countVal = areaMap[areaId];
                        if(typeof(countVal)==="undefined") {
                            countVal = "0";
                        }
                        $this.find('#area-branch-cnt-' + areaId).text(countVal);
                    });
                } else {//지역선택시 해당 지역만 초기화
                    var areaList = [];
                    for(var areaId in areaMap){
                        $this.find('#area-branch-cnt-' + areaId).text(areaMap[areaId]);
                    }
                }
            } catch (e) {
                //alert("지역 초기화중 에러 : "+ e);
            }
        },

        executeOrderCountFinish:function(){
            sandbox.getModule('module_header').setLogin(function(){
                var $form = $this.find('form');

                // form value
                var itemRequest = BLC.serializeObject($form);
                // pickupConfirm.itemRequest = itemRequest;

                sandbox.setLoadingBarState(true);

                BLC.ajax({
                    url:$form.attr("action"),
                    type:"POST",
                    dataType:"json",
                    // data: pickupConfirm.itemRequest
                    data: itemRequest
                },function (data) {
                    if(data.error){
                        sandbox.setLoadingBarState(false);
                        $this.find('.dim').removeClass('active');
                        UIkit.modal.alert(data.error);
                    }else{
                        Core.Loading.show();
                        // endPoint.call( 'buyNow', pickupConfirm.itemRequest);
                        endPoint.call( 'buyNow', itemRequest);
                        _.delay(function(){
                            window.location.assign(sandbox.utils.contextPath +'/checkout' );
                        }, 500);
                    }
                }).fail(function(msg){
                    if(commonModal.active) commonModal.hide();
                    Core.Loading.hide();
                    if(msg !== '' && msg !== undefined){
                        UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'warning'});
                    }
                });
            });
        },

        moduleInit:function () {
            $this = $(this);
            args = arguments[0];

            // vue 컴포넌트 초기화
		    vueContainer = new Vue({
		      el:'#idLocationSearch',
		      data: {
		        'location': pickupLocation,
		        'confirm': pickupConfirm,
		        'quantity': pickupQuantity,
		        'quantityNo': 0,

		        'skuIdNe': '',
		        'sizeIdNe': '',
		        'stateList': [],
		        'storeType': [],
		        'localSelect': [],

		        'dataList': [],
		        'inventory': [],

		        'storeAll': {'active': true},

		        'currentSort': 'quantity',
		        'currentSortDir': 'asc',

		        'findLocation': '위치정보 없음',

		        'tag': false,
		        'flag': false,

		        'GeoLocation': true
		      },

				created: function () {
					var vm = this;
					sandbox.utils.promise({
						url:sandbox.utils.contextPath +'/processor/execute/store',
						method:'GET',
						data:{
							'mode':'template',
							'templatePath':'/page/partials/storeList',
							'use-paging':false,
						},
					}).then(function (data) {
						var $defer = $.Deferred();
						var data = sandbox.utils.strToJson(data.replace(/&quot;/g, '"'));
						if (data !== '') {
							vm.dataList = data;
							$defer.resolve(data);
						} else {
							$defer.reject('location info is empty');
		                }

						return $defer.promise();
					}).fail(function (msg) {
						UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
		            });

					if(!window.naver){
						$.getScript("https://openapi.map.naver.com/openapi/v3/maps.js?clientId=" + args.mapkey + "&submodules=geocoder");
					}
				},

		      computed: {
		        storeList: function (s) {
		          var vm = this;
		          var flag = this.flag;

		          return this.dataList.filter(function (row, index) {

		            var _id = row.id;
		            var _state = row.state;

		            row.locationTarget = calculateDistance(serviceMenData.latitude, serviceMenData.longitude, row.latitude, row.longitude);

		            row.isAbleCod = (args.ableCod === 'true') ? true : false;
		            row.isAblePickup = (args.ablePickup === 'true') ? true : false;

		            return vm.inventory.some(function (size) {
		              var _size = size.fulfillmentLocationId;

		              if (_id == _size) row.quantityNo = size.quantityAvailable;

		              return vm.localSelect.some(function (tag) {
		                // console.log('### stateList => ', vm.localSelect);
		                if (!flag) {
		                  return _id == _size && vm.storeAll.active == true;
		                } else {
		                  return _id == _size && tag.name == _state && tag.active === true;
		                }
		              });
		            });

		          }).sort(function (a, b) {
		            // var modifier = 1;
		            if (vm.currentSortDir === 'desc') {
		                if (a[vm.currentSort] < b[vm.currentSort]) return 1;
		                if (a[vm.currentSort] > b[vm.currentSort]) return -1;
		            } else { // asc
		                if (a[vm.currentSort] < b[vm.currentSort]) return -1;
		                if (a[vm.currentSort] > b[vm.currentSort]) return 1;
		            }
		            return 0;
		          });
		        },

		        storeType: function () {
		          return this.storeType
		        },

		        localSelect: function () {
		          return this.localSelect
		        }
		      },

		      methods:{
		        pickupLocation: function (size, skuId) {
		          var vm = this;

		          this.skuIdNe = skuId;
		          this.sizeIdNe = size;

		            var obj = {
		                'skuId': skuId,
		                'json': 'true',
		                'fType': 'PHYSICAL_PICKUP'
		            }
		            // ajax:function(url, method, data, callback, isCustom, isLoadingBar, delay, dataType, cache){
		            sandbox.utils.ajax(sandbox.utils.contextPath + '/processor/execute/pickable_inventory', 'GET', obj, function(data){
		                vm.inventory = JSON.parse(data.responseText);
		                // 지역 초기화
		                vm.dataList.filter(function (row, index) {
		                    vm.localSelect[index] = { 'active': false, 'view': false, 'id': row.id, 'name': row.state};
		                });

		                // 사이즈 선택 시 해당 지역만 필터에 노출
		                vm.localSelect.filter(function (row) {
		                    var _id = row.id;
		                    vm.inventory.some(function (size) {
		                        var _size = size.fulfillmentLocationId;
		                        if (_id == _size) row.view = true;
		                    });
		                    if (row.view !== true) row.name = '';
		                });
		                vm.localSelect = _.unionBy(vm.localSelect, vm.localSelect, 'name');

		                // 사이즈 변경 시 초기화
		                vm.sort('quantityNo');
		                vm.toggle('false');
		                vm.storeAll.active = true;
		            }, true, false, 1200);
		        },

		        sort: function (s) {
		          switch (s) {
		            case 'locationTarget':
		                this.currentSortDir = 'asc';
		                findGeoLocation(true);
		            break;
		            case 'name': this.currentSortDir = 'asc'; break;
		            case 'quantityNo': this.currentSortDir = 'desc'; break;
		          }

		          this.currentSort = s;
		        },

		        toggle: function (bools) {
		          this.flag = JSON.parse(bools);
		          var vm = this;

		          if (this.flag) { // 지역선택
		            vm.storeAll.active = false;
		          } else { // 전체
		            vm.localSelect.filter(function (row) {
		                row.active = false;
		            });
		            // vm.storeAll = true;
		          }
		        },

		        pickupOrderQuantity: function (storeId, pickupType, maxQuantity) { // 수량 선택
		          var $form = $this.find('form');
		          var itemRequest = BLC.serializeObject($form);

		            var _pickupType = (pickupType === 'lopis') ? true : false;

		            itemRequest.isJustReservation = _pickupType
		            itemRequest.titleName = (pickupType === 'lopis') ? '예약' : '픽업';

		            $this.find('#isJustReservation').val(_pickupType);
		            $this.find('#fulfillmentLocationId').val(storeId);

		            itemRequest.fulfillmentLocationId = storeId;
		            pickupConfirm.itemRequest = itemRequest;
		            pickupConfirm.customer = sandbox.getModule('module_header').getCustomerInfo();

		            for (var i = 0; i < totalPickupLocation.length; i++) {
		                if (totalPickupLocation[i].id == storeId) {
		                    pickupConfirm.storeInfo = totalPickupLocation[i];
		                }
		            }

		            // pickupQuantity.isTaskQuantity = true; // 수량 선택 활성화
		            pickupQuantity.quantity.maxQuantity = pickupQuantity;
		            // $this.find('.dim').addClass('active');

		            // if (_pickupType) {
		            //     pickupConfirm.isTaskConfirm = true;
		            // } else {
		            //     Method.executeOrderCountFinish();
		            // }
		            Method.executeOrderCountFinish();
		        },

		        pickupConfirmShow: function (qty) { // 수량 선택 완료
		          pickupQuantity.isTaskQuantity = false;
		          $this.find('.dim').removeClass('active');
		          pickupConfirm.isTaskConfirm = true;
		        },

		        orderConfirmSubmit: function() {
		          Method.executeOrderCountFinish();
		        },

		        orderCancel: function (status) {
		          $this.find('.dim').removeClass('active');

		          var _productPriceDefault = $this.find('#productPriceDefault').val();

		          // 상품가격 초기화
		          $this.find('#productPrice').val(_productPriceDefault);
		          $this.find('#retailPrice').val(_productPriceDefault);

		          switch (status) {
		            case 'orderConfirm' :
		              pickupConfirm.isTaskConfirm = false;
		              break;
		            case 'quantity' :
		              pickupQuantity.isTaskQuantity = false;
		              break;
		          }
		        },

		        // findLocation:function(){
		        //   console.log('teste', pickupLocation.currentLocation);
		        // }
		      }
		    });


			var currentDate = new Date();
            var reservationModal = UIkit.modal('#reservation-modal', {center:true});
            var disabledDays = [];
            var skuData = sandbox.getComponents('component_product_option', {context:$(document)}).getDefaultSkuData();
            var radioComponent = sandbox.getComponents('component_radio', {context:$this}, function(i) {
                var _self = this;
                var INDEX = i;

                this.addEvent('change', function(size){
                    var skuID = 0;
                    var _this = this;
                    skuData.some(function (size) {
                        if ($(_this).data('id') == size.selectedOptions[0]) skuID = size.skuId;
                        return skuID
                    });
                    sizeOptionToggle(size, skuID);
                });

                // PDP 사이즈값 받아오기
                var pdp_option_size = $('.size-grid-type .hidden-option').val();
                if (pdp_option_size) {
                    this.trigger(pdp_option_size, pdp_option_size);
                }
            });
        }
    }

    return {
        init:function(){
            sandbox.uiInit({
                selector:'[data-module-pickup-location]',
                attrName:'data-module-pickup-location',
                moduleName:'module_pickup_location',
                handler:{context:this, method:Method.moduleInit}
            });
        }
    }
});

})(Core);

(function(Core){
	Core.register('module_order_pickup', function(sandbox){
		var args;
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				args = arguments[0];

				//주문자 인풋 컴포넌트
				var inputComponent = sandbox.getComponents('component_textfield', {context:$this});

				//주문자와 동일
				var checkoutComponent = sandbox.getComponents('component_checkbox', {context:$this}, function(i){
					this.addEvent('change', function(isChecked){
						if(isChecked){
							var customerInfo = sandbox.getModule('module_order_customer').getOrderCustomerInfo();
							$this.find('#fullname').val(customerInfo.name).focusout();
							$this.find('#phonenumber').val(customerInfo.phoneNum).focusout();
						}else{
							$this.find('#fullname').val('').focusout();
							$this.find('#phonenumber').val('').focusout();
						}
					});
				});


				$this.find('[data-order-pickup-submit-btn]').click(function(e){
					if(!inputComponent[0].getValidateChk('errorLabel') || !inputComponent[1].getValidateChk('errorLabel')){
						e.preventDefault();
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-order-pickup]',
					attrName:'data-module-order-pickup',
					moduleName:'module_order_pickup',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_product', function(sandbox){
		var currentFirstOptValue = '';
		var currentQuantity = 1;
		var itemAttributes = '';
		var miniOptionIS = false;
		var objProductOption = {};
		var minOffsetTop = 30;
		var maxOffsetTop = 0;
		var args = null;
		var $this;
		var imgCurrentIndex;
		var categoryId = '';
		var productId = '';
		var skuId = '';
		var isQuickView = false;
		var isQuantity = true;
		var productOption;
		var quantity;
		var endPoint;
		var privateId;
		var currentSkuData;
		var pickupModal;
		var itemRequest;

		var $optionWrap;
		var $galleryWrap;
		var $productDetailWrap;
		var optionWrapOffsetTop;
		var previousScrollTop = 0;
		var $descriptionWrap;
		var longDescription;

		var quantityCheck = function(inventoryType, maxQty){
			var obj = {isQuantity:false, maxQty:0}
			if(inventoryType !== 'UNAVAILABLE'){
				if(inventoryType === 'CHECK_QUANTITY'){
					obj.isQuantity = (maxQty > 0) ? true : false;
					obj.maxQty = maxQty;
				}else if(inventoryType === 'ALWAYS_AVAILABLE'){
					obj.isQuantity = true;
					obj.maxQty = null;
				}
			}else{
				obj.isQuantity = false;
				obj.maxQty = 0;
			}

			return obj;
		}

		var defaultSkuSetup = function(productOptComponents){
			var skuData, quantityState;
			if(!productOptComponents) return;
			if(quantity){
				if(Array.isArray(productOptComponents)){
					$.each(productOptComponents, function(i){
						skuData = this.getDefaultSkuData()[0];
						quantityState = quantityCheck(skuData.inventoryType, skuData.quantity);
						quantity[i].setMaxQuantity(quantityState.maxQty);
						isQuantity = quantityState.isQuantity;
					});
				}else{
					skuData = productOptComponents.getDefaultSkuData()[0];
					quantityState = quantityCheck(skuData.inventoryType, skuData.quantity);
					quantity.setMaxQuantity(quantityState.maxQty);
					isQuantity = quantityState.isQuantity;
				}
			}
		}

		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];
				categoryId = sandbox.utils.getQueryParams(location.href).categoryid;
				productId = args.productId;
				privateId = args.privateId;
				endPoint = Core.getComponents('component_endpoint');

				//임시 오픈용 nike 입고 알림 팝업 띄우기
				var isReservation = sandbox.utils.getQueryParams(location.href).hasOwnProperty('restock');
				if(isReservation){
					setTimeout(function(){
						$('.stocked-wrap').find('a[href=#restock-notification]').trigger('click');
					}, 300);
				}

				var $dim = $('[data-miniOptionDim]');
				var guideModal = UIkit.modal('#guide', {modal:false});
				var commonModal = UIkit.modal('#reservation-modal', {modal:false});
				var miniCartModule = sandbox.getModule('module_minicart');
				var gallery = sandbox.getComponents('component_gallery', {context:$this});
				var $infoHeightWrap = $('[data-info-height]');

				$productDetailWrap = $(".product-detail_wrap");
				$galleryWrap = $this.find('.product-gallery-wrap');
				$optionWrap = $this.find('.product-option-container');
				optionWrapOffsetTop = ($optionWrap.length > 0) ? $optionWrap.offset().top : 0;

				var addonProductGroup = {};
				var addonComponents = sandbox.getComponents('component_addon_product_option', {context:$(document)}, function(i){
					var INDEX = 0;
					var key = this.getAddonId();

					if(!addonProductGroup.hasOwnProperty(key)){
						addonProductGroup[key] = [];
						INDEX = 0;
					}else{
						INDEX++;
					}
					addonProductGroup[key].push(this);

					this.addEvent('addToAddOnItem', function(){
						var privateId = arguments[0];
						for(var i=0; i<addonProductGroup[key].length; i++){
							if(i != INDEX){
								addonProductGroup[key][i].setTrigger(privateId);
							}
						}
					});
				});

				quantity = sandbox.getComponents('component_quantity', {context:$(document)}, function(i){
					var INDEX = i;
					this.addEvent('change', function(qty){
						for(var i=0;i<quantity.length;i++){
							if(i !== INDEX){
								quantity[i].setQuantity(qty);
							}
						}
					});
				});


				var currentOptValueId = '';
				productOption = sandbox.getComponents('component_product_option', {context:$(document)}, function(i){ //product Option select components
					var CURRENT_INDEX = i;
					var INDEX = 0;
					var _self = this;
					var key = this.getProductId();


					if(!objProductOption.hasOwnProperty(key)){
						objProductOption[key] = [];
						INDEX = 0;
					}else{
						INDEX++;
					}

					objProductOption[key].push(this);

					this.addEvent('changeFirstOpt', function(firstOptName, optionName, productId, value, valueId, id){
						if(currentOptValueId != valueId){
							currentOptValueId = valueId;

							for(var i=0; i<objProductOption[productId].length; i++){
								if(i != INDEX){
									skuId = '';
									objProductOption[productId][i].setTrigger(optionName, value, valueId);
								}

								if(optionName !== 'COLOR'){
									objProductOption[productId][i].getValidateChk();
								}
							}

							if(optionName === 'COLOR'){
								gallery.setThumb(value);
							}
						}

					});

					this.addEvent('skuComplete', function(skuOpt){
						currentSkuData = skuOpt
						if(quantity){
							var quantityState = quantityCheck(skuOpt.inventoryType, skuOpt.maxQty);
							isQuantity = quantityState.isQuantity;
							skuId = skuOpt.id;

							if(args.isDefaultSku !== 'true'){
								if(Array.isArray(quantity)){
									//quantity[CURRENT_INDEX].setQuantity(1); //cart modify인 경우 수량 초기화 안함
									quantity[CURRENT_INDEX].setMaxQuantity(quantityState.maxQty);
								}else{
									//quantity.setQuantity(1); //cart modify인 경우 수량 초기화 안함
									quantity.setMaxQuantity(quantityState.maxQty);
								}
							}
						}
					});
				});

				/* 매장예약 */
				$('.reservation-btn').click(function(e){

					e.preventDefault();

					Core.Utils.ajax(location.href, 'GET', {
						reservationview:true,
						size:$("input[name=SIZE]:checked").val()
					}, function (data) {
						var domObject = $(data.responseText).find('#reservation-wrap');
						$('#reservation-modal').find('.contents').empty().append(domObject[0].outerHTML);
						Core.moduleEventInjection(domObject[0].outerHTML);
						commonModal.show();
					});
				});

				/* isDefaultSku - true  ( option이 없는 경우 )  */
				if(args.isDefaultSku === 'true') defaultSkuSetup(productOption);

				/* cart Update */
				$('[data-add-item]').each(function(i){
					var INDEX = i;

					$(this).find('.btn-link').click(function(e){
						e.preventDefault();
						var _self = $(this);
						var addToCartPromise = Method.moduleValidate(INDEX);

						// THE DRAW Start
						var actionType = _self.attr('action-type');
						var option =  $this.find('.hidden-option').val();
						if(option != 'undefined' && option != '' ){
							if(actionType === 'drawentry'){
								var theDrawId = $("[data-thedrawid]").data("thedrawid");
								var redirectUrl = $(location).attr('href');
								var drawurl = sandbox.utils.contextPath + '/theDraw/entry';
								BLC.ajax({
									type : "POST",
									dataType : "json",
									url : drawurl,
									data : {
										prodId : productId,
										theDrawId : theDrawId,
										skuId : skuId,
										redirectUrl : redirectUrl
									}
								},function(data){
									if(data.result == true){
										UIkit.modal('#draw-entryTrue-modal', {modal:false}).show();
										$('#draw-entryTrue-modal').find('.attention>p>a').click(function(){
											$(this).parents('p').next('div').toggle();
											return;
										});
									} else{
										UIkit.modal.alert(data.errorMessage);
									}
								});
								return;
							}else if(actionType === 'drawlogin'){
								Core.Loading.show();
								return;
							}else if(actionType === 'certified'){
								var certificationYnModal = UIkit.modal('#certification-yn-modal', {center:true, bgclose:false, keyboard:false});
								var redirectUrl = $(location).attr('href');
								$.cookie("thedrawCertified", 'thedraw', {expires: 1, path : '/'});
								$.cookie("thedrawRedirectUrl", redirectUrl, {expires: 1, path : '/'});
								certificationYnModal.show();
								return;
							}
						}
						// THE DRAW End

						addToCartPromise.then(function(qty){
							var $form = _self.closest('form');
							itemRequest = BLC.serializeObject($form);
							itemRequest['productId'] = productId;
							itemRequest['quantity'] = qty;

							/* 애드온 상품 추가 */
							var $deferred = $.Deferred();
							var addonProductIndex = 0;
							if(addonComponents){
								for(var key in addonProductGroup){
									if(addonProductGroup[key][0].getValidateChk()){
										var childItems = addonProductGroup[key][0].getChildAddToCartItems();
									    for(var i=0; i<childItems.length; i++){
									        for(var key in childItems[i]){
												itemRequest['childAddToCartItems['+addonProductIndex+'].'+key] = childItems[i][key];
									        }
									    }
										addonProductIndex++;
									}else{
										$deferred.reject();
									}
								}

							}

							$deferred.resolve(itemRequest);
							return $deferred.promise();
						}).then(function(itemRequest){
							var $form = _self.closest('form');
							var actionType = _self.attr('action-type');
							var url = _self.attr('href');

							/*****************************************************************
								유입 channel sessionStorage
								 - channel : 유입된 매체 식별 이름
								 - pid : 상품 식별 code ( productId, style Code, UPC.... )

								사이트 진입시 URL에 channel, pid 가 있을때 매출을 체크 한다.
								channel 만 있을경우에는 모든 상품을 channel 매출로 인지하고
								channel과 pid 둘다 있을경우 해당 상품만 channel 매출로 인지한다.
							*****************************************************************/

							if(sandbox.sessionHistory.getHistory('channel')){
								if(sandbox.sessionHistory.getHistory('pid')){
									if(sandbox.sessionHistory.getHistory('pid') === privateId){
										itemRequest['itemAttributes[channel]'] = sandbox.sessionHistory.getHistory('channel');
									}
								}else{
									itemRequest['itemAttributes[channel]'] = sandbox.sessionHistory.getHistory('channel');
								}
							}

							switch(actionType){
								case 'externalLink' :
									//외부링크
									window.location.href = url;
									break;
								default :
									BLC.ajax({
										url:url,
										type:"POST",
										dataType:"json",
										data:itemRequest
									}, function(data, extraData){
										if(commonModal.active) commonModal.hide();
										if(data.error){
											//UIkit.modal.alert(data.error);
											UIkit.modal.alert('사이즈를 선택하세요.');
										}else{
											var cartData = $.extend( data, {productId : productId, quantity : itemRequest.quantity, skuId : skuId });
											if(actionType === 'add'){
												miniCartModule.update( function( callbackData ){
													if( callbackData != null ){
														cartData.cartId = callbackData.cartId
													}
													endPoint.call('addToCart', cartData );

													//EMB productPrice 값 없을경우 예외처리 해야함
													var productCode = $optionWrap.find("[data-model]").data("model");
													var productPrice = $optionWrap.find("[data-price]").data("price");
													var productQuantity = $optionWrap.find("input[name=quantity]").val();
													var widthMatch = matchMedia("all and (max-width: 767px)");
													if (Core.Utils.mobileChk || widthMatch.matches) {
														var mobileChk = 2;
													} else {
														var mobileChk = 1;
													}
													cre('send','AddToCart',{
														id:productCode,
														price:parseInt(productPrice),
														quantity:parseInt(productQuantity),
														currency:'KW',
														event_number:mobileChk
													});
												});

											}else if(actionType === 'modify'){
												var url = Core.Utils.url.removeParamFromURL( Core.Utils.url.getCurrentUrl(), $(this).attr('name') );
												Core.Loading.show();
												endPoint.call( 'cartAddQuantity', cartData );
												_.delay(function(){
													window.location.assign( url );
												}, 500);
											}else if(actionType === 'redirect'){
												Core.Loading.show();
												endPoint.call( 'buyNow', cartData );
												_.delay(function(){
													window.location.assign( sandbox.utils.contextPath + '/checkout' );
												}, 500);
											}
										}
									});
									break;
							}
						}).fail(function(msg){
							if(commonModal.active) commonModal.hide();
							if(msg !== '' && msg !== undefined){
								UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'warning'});
							}
						});
					});
				});


				//scrollController
				var scrollArea = sandbox.scrollController(window, document, function(percent){
					var maxOffsetTop = this.getScrollTop($('footer').offset().top);
					var maxHeight = this.setScrollPer(maxOffsetTop);

					if(percent < minOffsetTop && miniOptionIS){
						miniOptionIS = false;
						$('.mini-option-wrap').stop().animate({bottom:-81}, 200);
						$('.mini-option-wrap').find('.info-wrap_product_n').removeClass('active');
						$dim.removeClass('active');
					}else if(percent >= minOffsetTop && percent <= maxOffsetTop && !miniOptionIS){
						miniOptionIS = true;
						$('.mini-option-wrap').stop().animate({bottom:0}, 200);
					}else if(percent > maxOffsetTop && miniOptionIS){
						miniOptionIS = false;
						$('.mini-option-wrap').stop().animate({bottom:-81}, 200);
						$('.mini-option-wrap').find('.info-wrap_product_n').removeClass('active');
						$dim.removeClass('active');
					}
				}, 'miniOption');

				//PDP 상품 설명 영역 스크롤 : 갤러리 영역내 위치 고정
				var summaryScrollController = sandbox.scrollController(window, document, function(per, scrollTop){
					if(sandbox.reSize.getState() === 'pc'){
						if($galleryWrap.height() > $optionWrap.height() && $optionWrap.height() + optionWrapOffsetTop > $(window).height()){

							var galleryHeight = $galleryWrap.height();
							var detailHeight = $productDetailWrap.height();

							//스크롤이 옵션영역 하단에 걸리는 순간
							if( scrollTop > optionWrapOffsetTop + $optionWrap.height() - $(window).height() && scrollTop < optionWrapOffsetTop + galleryHeight - $(window).height() ){
								!$optionWrap.hasClass("fixed") && $optionWrap.removeClass('fixed absolute bottom top').removeAttr("style").addClass('fixed bottom');
							}
							//스크롤이 하단으로 내려갔을 때
							else if( scrollTop >= optionWrapOffsetTop + galleryHeight - $(window).height() ){
								!$optionWrap.hasClass("absolute") && $optionWrap.removeClass('fixed absolute bottom top').removeAttr("style").addClass('absolute').css("bottom", detailHeight - galleryHeight + "px");
							}
							//스크롤이 상단으로 올라갔을 때
							else if( scrollTop <= optionWrapOffsetTop + $optionWrap.height() - $(window).height() ){
								!$optionWrap.hasClass("top") && $optionWrap.removeClass('fixed absolute bottom top').removeAttr("style").addClass('absolute top');
							}
							else {
							    $optionWrap.removeClass('fixed absolute bottom top').removeAttr("style");
							}




						} else {
							//아코디언 정보를 펼친 경우 갤러리 길이 보다 상품옵션이 더 길어 질수 있다
							$optionWrap.removeClass('fixed absolute bottom top').removeAttr("style");
						}
					}
					//스크롤 업/다운 구분을 위해 이전 스크롤 위치 기억
					previousScrollTop = scrollTop;

				}, 'product');

				$('.minioptbtn').click(function(e){
					e.preventDefault();
					$('.mini-option-wrap').find('.info-wrap_product_n').addClass('active');
					$dim.addClass('active');
				});

				$('.mini-option-wrap').on('click', '.close-btn', function(e){
					//console.log('mini-option-wrap');
					e.preventDefault();
					$('.mini-option-wrap').find('.info-wrap_product_n').removeClass('active');
					$dim.removeClass('active');
				});


				//guide option modal
				$this.find('.option-guide').on('click', function(e){
					e.preventDefault();
					guideModal.show();
				});


				$('.uk-quickview-close').click(function(e){
					guideModal.hide();
					isQuickView = true;
				});

				guideModal.off('.uk.modal.product').on({
					'hide.uk.modal.product':function(){
						if(isQuickView){
							setTimeout(function(){
								$('html').addClass('uk-modal-page');
								$('body').css('paddingRight',15);
							});
						}
					}
				});


				//
				var md = new MobileDetect(window.navigator.userAgent);
				if (md.mobile()) {
					var crossSaleswiper = new Swiper('#crossSale-swiper-container', {
						slidesPerView: 'auto',
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
						},
					});
				} else {
					var crossSaleswiper = new Swiper('#crossSale-swiper-container', {
						slidesPerView: 5,
						slidesPerGroup: 5,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
						},
					});
				}
				var crossSale = $("#crossSale-swiper-container")
				if (crossSale.find(".swiper-wrapper>li").length < 1) {
					crossSale.parent(".category-slider").parent(".related-items").hide();
				}



				//PDP summary에서 상품 설명의 이미지 제거한 내용을 영역에 붙임.
				if($this.find('[data-long-description]').attr('data-long-description')){
					var html = $.parseHTML($this.find('[data-long-description]').attr('data-long-description'));
					$(html).find('div.imgArea').remove().find('script').remove();
					$this.find('#pdp-description-summary').empty().append(html);
				}

        //상품 정보 영역의 높이 줄임처리 (상품정보, 유의사항)
				$infoHeightWrap.each(function(e){
					// e.preventDefault();
					var argmts = Core.Utils.strToJson($(this).attr('data-info-height'), true) || {};
					var pdpInfoSubjectHeight=78;
					var readMoreHeight=65;
					var infoType = argmts.infoType;
					var outerHeight = parseInt(argmts.outerHeight);
					var shortenHeight =  outerHeight-readMoreHeight;
					var contentsHeight = shortenHeight - pdpInfoSubjectHeight;
					var $descriptionWrap;
					if(infoType === 'attention-guide'){
						$descriptionWrap = $(this);
					} else if(infoType === 'product-detail'){
						$descriptionWrap = $(this).closest('.pop-detail-content');
					}

					if(argmts && ($descriptionWrap.outerHeight() > outerHeight || $descriptionWrap.outerHeight() === 0)){
						if(infoType === 'attention-guide'){
							$descriptionWrap.outerHeight(shortenHeight);
							$descriptionWrap.find('.guide-area').height(contentsHeight).css({'overflow':'hidden'});
							$descriptionWrap.find('#read-more').show();
						} else if(infoType === 'product-detail'){
							if($descriptionWrap.find('.conArea').length > 0){
								$descriptionWrap.find('.conArea').height(shortenHeight).width('100%').css({'overflow':'hidden'});
							}

							else if($descriptionWrap.find('.sectionR').length  > 0){
								//$descriptionWrap.find('.sectionR').height(shortenHeight).css({'overflow':'hidden'});
								//상품 설명 두번째 항목까지만 노출하고 이후 항목은 비노출처리 한다.
								//상품 설명 두번째 항목도 2줄까지만 보이도록 multi-line ellipsis 처리 한다.
								$descriptionWrap.find('.sectionR > ul:gt(2)').each(function(){
									$(this).hide();
									$(this).prev("h3") && $(this).prev("h3").hide();
								});
							}

						}
					}
				});

				//1 on 1 이미지 외 상품 설명 제거. 어드민 상품 속성에 porduct1on1이 true인 경우에만 PDP 화면 아래쪽에 표시됨.
				if($this.find('[data-1on1-description]').length > 0){
					var html = $.parseHTML($this.find('[data-long-description]').attr('data-long-description'));
					$(html).find('div.proInfo').remove().find('script').remove();
					$this.find('[data-1on1-description]').empty().append(html);
				}
			},
			moduleValidate:function(index){
				var INDEX = index;
				var deferred = $.Deferred();
				var validateChk = (args.isDefaultSku === 'true') ? true : false;
				var qty = 0;

				if(args.isDefaultSku === 'false'){
					validateChk = sandbox.utils.getValidateChk(productOption, '사이즈를 선택해 주세요.');
				}

				if(Array.isArray(quantity)){
					qty = quantity[INDEX].getQuantity();
				}else{
					qty = quantity.getQuantity();
				}

				if(validateChk && isQuantity && qty != 0){
					deferred.resolve(qty);
				}else if(!isQuantity || qty == 0){
					deferred.reject(args.errMsg);
				}else{
					deferred.reject();
				}

				return deferred.promise();
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-product]',
					attrName:'data-module-product',
					moduleName:'module_product',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				$this = null;
				args = [];
				productOption = null;
				quantity = null;
			},
			getItemRequest:function(){
				return itemRequest;
			},
			getSkuData:function(){
				return currentSkuData;
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_order_payment', function(sandbox){
		var endPoint;
		var Method = {
			$that:null,
			$submitBtn:null,
			$usafeContent:null,
			$agreeForm:null,
			moduleInit:function(){
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);

				endPoint = Core.getComponents('component_endpoint');

				var $this = $(this);
				Method.$that = $this;
				Method.$submitBtn = $this.find('[data-checkout-btn]');
				Method.$submitBtn.on("click", Method.checkout );
				$this.find('[data-payment-method]').find('.payment-method-item-title').on('click', Method.changePaymentMethod);
				$this.find('[data-cod-btn]').on("click", Method.codCheckout );

				/*
					Method.$agreeForm = $this.find('form[name="checkout-agree-form"]');
					sandbox.validation.init( Method.$agreeForm );
				*/

				Method.$usafeContent = $this.find('[data-usafe-content]');

				sandbox.getComponents('component_radio', {context:$this}, function(i){
					this.addEvent('change', function(target, val){
						if( $(this).attr('name') == 'usafeIsAgree'){
							Method.toggleUsafeContent( val == "true" );
						}
					});
				});
			},

			toggleUsafeContent:function($bool){
				if( $bool ){
					Method.$usafeContent.show();
				}else{
					Method.$usafeContent.hide();
				}
			},

			// payment 정보 선택시
			changePaymentMethod:function(e){
				e.preventDefault();
				var $item = $(this).closest('.payment-method-item');
				if(!$item.hasClass('active')){
					$item.siblings().removeClass('active');
					$item.addClass('active');
				}
			},

			updateSubmitBtn:function( $bool ){
				if( $bool ){
					Method.$submitBtn.removeAttr('disabled').removeClass('disabled');
				}else{
					Method.$submitBtn.attr('disabled','true').addClass('disabled');
				}
			},

			checkout:function(e){
				e.preventDefault();
				$(this).attr("enabled")
				var isCheckoutAgree = Method.$that.find('[name="isCheckoutAgree"]').is(':checked');
				var _self = $(this);

				/*
				sandbox.validation.validate( Method.$agreeForm );
				if(sandbox.validation.isValid( Method.$agreeForm )){

				}
				*/


				// 결제 방법에 따른 처리
				var $activeItem = Method.$that.find("[data-payment-method]").find(".payment-method-item.active");
				// 무통장일때
				if( $activeItem.data("type") == 'WIRE' ){
					var $form = $activeItem.find('form[name="checkout-useInsureGarantee-form"]');

					// 보증보험 사용할 때
					if( $form.length > 0 ){
						var usafeIsAgree = $activeItem.find('[name="usafeIsAgree"]:checked').val();

						if( usafeIsAgree == 'true'){
							sandbox.validation.init( $form );
							sandbox.validation.reset( $form );
							sandbox.validation.validate( $form );

							// 모두 선택 체크하고
							if( sandbox.validation.isValid( $form )){
								// 동의 여부 체크
								if( $activeItem.find('[name="usafeInfoAgree"]:checked').val() == 'false'){
									UIkit.modal.alert("개인정보 이용동의에 동의해주세요");
									return;
								}
							}else{
								return;
							}
						}
					}
				}

				if( !isCheckoutAgree ){
					UIkit.modal.alert("상품, 가격, 할인, 배송정보에 동의해주세요");
					return;
				}

				// Google recaptcha
				if ($("span[recaptchayn]").length>0){
					if (grecaptcha.getResponse() == ""){
						UIkit.modal.alert("리캡챠를 체크해야 합니다.");
						return;
					}
				};

				/*
					checkoutIamport를 실행하기 전에 checkout-request 에 먼저 결제가 가능한지 체크하고
					상태가 true 일떄 checkoutIamport를 호출한다.
					as-is : checkoutIamport
					to-be : checkoutRequest -> true -> checkoutIamport
				*/

				var payMethodParam = '';
			    if(Method.$that.find("[data-payment-method]").find(".payment-method-item.active").data("type") == 'KAKAO_POINT'){
			          payMethodParam = '?pay_method=point';
			    }


		    	Method.updateSubmitBtn( false );
				sandbox.utils.promise({
					url:sandbox.utils.contextPath + '/checkout/request'+payMethodParam,
					type:'GET'
				}).then(function(data){
					sandbox.setLoadingBarState(true);
				    if(data.isError == false){
				    	var paymentType = ($activeItem.length > 0) ? $activeItem.data("type") : null;
				    	endPoint.call("orderSubmit", { 'paymentType' : paymentType });

						// 결제 완료 상태 일때
				        if( _self.data('checkout-btn') == 'complete'){
        					_self.closest('form').submit();
        					return;
        				}

						//iamport 모듈
        				if( $activeItem.data('provider') == 'IAMPORT' ){
    						Method.checkoutIamport( $activeItem, data.total_amount );
    					}
				    }else{
						sandbox.setLoadingBarState(false);

						if(data._global == '선택 한 상품의 재고가 없습니다'){
							UIkit.modal.confirm(data._global + '<br/>해당상품의 수량변경 또는 삭제하여야 주문이 가능합니다.<br/>장바구니로 이동하시겠습니까?', function(){
								location.href = sandbox.utils.contextPath + '/cart';
							});
						}else{
							Method.updateSubmitBtn( true );
							UIkit.modal.alert(data._global);
						}
				    }
				}).fail(function(msg){
					sandbox.setLoadingBarState(false);
					UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
					Method.updateSubmitBtn( true );
				});
			},
			codCheckout:function(e){
				e.preventDefault();
				var _self = $(this);
				sandbox.utils.promise({
					url:sandbox.utils.contextPath + '/checkout/request',
					type:'GET'
				}).then(function(data){
				    if(data.isError == false){
						sandbox.setLoadingBarState(true);
						_self.closest('form').submit();
						return;
				    }else{
						sandbox.setLoadingBarState(false);
						UIkit.modal.alert(data._global);
				    }
				}).fail(function(msg){
					sandbox.setLoadingBarState(false);
					UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
				});
			},
			checkoutIamport:function( $activeItem, totalAmount ){
				// 결제 전일때
				var $orderinfo = $("#orderinfo-review");
				var $shippingInfo = $("#shipping-review");
				var $priceInfo = $("#order-summary");

				var IMP = window.IMP;
				//var in_app = $(frm.in_app).is(':checked');

				//IMP.init('imp29019801');
				//결제 처리 전에 이미 전달해놓은 상품가격 값과 비교해야함
				//$paymentInfo.find("input[name='cartId']").val()

				var paymentMethod = $activeItem.data("method"); // 결제 수단
				var mRedirectUrl = $activeItem.data("m-redirect-url"); // 모바일 url
				var noticeUrl = $activeItem.data("notice-url"); // 노티피케이션 url
				var version = $activeItem.data("version") || 'old'; // 에스크로 분기 처리를 위한 값  new or old
				var escrow = $activeItem.data("escrow"); // 에스크로 사용 여부

				var useReplaceReturnUrl = false;
				var cUrl = Core.Utils.url.getCurrentUrl();

				// 접근한 URL이 mshop 일 때
				if( cUrl.indexOf( 'www.nike' ) > -1 ){
					useReplaceReturnUrl = true;
				}else{
					// 접근한 URL이 mshop 이 아닌데 deviceOs 가 ios 일때
					if( String(Core.Utils.url.getQueryStringParams(cUrl).deviceOs ).toLowerCase() == 'ios' ){
						useReplaceReturnUrl = true;
					}
				}

				if( useReplaceReturnUrl ){
					if( mRedirectUrl != null ){
						mRedirectUrl = mRedirectUrl.replace('m.nike', 'www.nike');
					}
				}

				var appScheme = $activeItem.data("app-scheme"); // 모바일 앱 스키마 정보
				var identityCode = $activeItem.data("identity-code"); // iamport key
				var pg = $activeItem.data("pg");

				if( paymentMethod == '' || identityCode == '' || pg == ''){
					UIkit.modal.alert('결제 수단 정보로 인한 문제가 발생하였습니다.<br/>고객센터('+_GLOBAL.SITE.TEL+ ')로 문의 주시면 신속히 처리 도와드리겠습니다.');
					return;
				}

				IMP.init(identityCode);

				var $orderList = $priceInfo.find('[data-order]');
				var name = $orderList.eq(0).find('[data-name]').text();
				if( $orderList.length > 1 ){
					name += ' 외 ' + ($orderList.length-1);
				}
				var buyerName = $.trim($orderinfo.find('[data-name]').data('name')) || $shippingInfo.find('[data-name]').data('name');

		    	var param = {
					//pay_method : _GLOBAL.PAYMENT_TYPE_BY_IAMPORT[ paymentMethod ], // 추후 provider 에 따라 변수변경 *서버에서 내려오고 있음
					pg : pg,
					pay_method : paymentMethod, // 추후 provider 에 따라 변수변경
					merchant_uid : Method.$that.find("input[name='cartId']").val() + '_' + new Date().getTime(),
					name: name,
					amount:totalAmount.amount || $priceInfo.find('[data-amount]').data('amount'),
					buyer_email:$orderinfo.find('[data-email]').data('email'),
					//buyer_name:$orderinfo.find('[data-email]').data('email'),
					buyer_name:buyerName,
					buyer_tel:$shippingInfo.find('[data-phone]').data('phone'),
					buyer_addr:$shippingInfo.find('[data-address]').data('address'),
					buyer_postcode:$shippingInfo.find('[data-zipcode]').data('zipcode'),
					m_redirect_url:mRedirectUrl,
					app_scheme:appScheme,
					notice_url:noticeUrl,
					bypass:{acceptmethod:"SKIN(#111)"}
				};

				var depositPeriod = $activeItem.find('[name="depositPeriod"]').val() || 2;

				if( paymentMethod == 'vbank' ) {
					param.vbank_due = moment().add(depositPeriod, 'day').format('YYYYMMDD2359');
					param.custom_data = $activeItem.find('form').serialize().replace(/=/gi, ':').replace(/&/gi, '|');
				}

				if( escrow == true ){
					param.escrow = true;
				}
				/*
				if( paymentMethod == 'escrow') {
					if( version == 'new'){
						// 신 버전
					    param.pay_method='vbank';
						param.escrow = true;
					}else{
						// 기존 버전
						param.vbank_due = moment().add(depositPeriod, 'day').format('YYYYMMDD2359');
						param.custom_data = 'paymethod:escrow';
						param.escrow = false;
					}
				}
				*/




				IMP.request_pay(param, function(rsp) {
					//결제 완료시
					if ( rsp.success ) {
						var msg = '결제가 완료되었습니다.<br>';
						msg += '고유ID : ' + rsp.imp_uid + '<br>';
						msg += '상점 거래ID : ' + rsp.merchant_uid + '<br>';
						msg += '결제 금액 : ' + rsp.paid_amount + '<br>';
						msg += 'custom_data : ' + rsp.custom_data + '<br>';

						if ( rsp.pay_method === 'card' ) {
							msg += '카드 승인번호 : ' + rsp.apply_num + '<br>';
						} else if ( rsp.pay_method === 'vbank' ) {
							msg += '가상계좌 번호 : ' + rsp.vbank_num + '<br>';
							msg += '가상계좌 은행 : ' + rsp.vbank_name + '<br>';
							msg += '가상계좌 예금주 : ' + rsp.vbank_holder + '<br>';
							msg += '가상계좌 입금기한 : ' + rsp.vbank_date + '<br>';
						}
						//alert( msg );
						sandbox.setLoadingBarState(true);

						if(rsp.pg_provider == 'kakaopay'){
				         rsp.pay_method = 'point';
				     }

						_.delay(function(){
							location.href = sandbox.utils.contextPath + '/checkout/iamport-checkout/hosted/return?imp_uid=' + rsp.imp_uid + '&pay_method=' + rsp.pay_method + '&custom_data=' + rsp.custom_data;
						}, 3000);

					} else {

						//실패 메시지에 따라 그냥 넘길것인지 어떤 액션을 취할것인지 확인
						//var msg = '결제에 실패하였습니다.' + '<br>';
						//msg += '에러내용 : ' + rsp.error_msg + '<br>';
//						UIkit.modal.alert(rsp.error_msg);

						sandbox.setLoadingBarState(false);

						if( (rsp.error_msg == '사용자가 결제를 취소하셨습니다') || (rsp.error_msg == '[결제포기] 사용자가 결제를 취소하셨습니다')){
							endPoint.call('orderCancel');
						}

						UIkit.modal.alert( rsp.error_msg ).on('hide.uk.modal', function() {
							sandbox.setLoadingBarState(true);
							var cartId = Method.$that.find("input[name='cartId']").val();
							location.href = sandbox.utils.contextPath + '/checkout/request/'+ cartId;
						});
						//alert( msg );
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-order-payment]',
					attrName:'data-module-order-payment',
					moduleName:'module_order_payment',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_promotion', function(sandbox){
		var endPoint;
		var Method = {
			$that:null,
			$form:null,
			$errorMessage:null,

			moduleInit:function(){
				/*
					@replaceTarget : 결과값이 들어갈 dom
					@errorMessageTarget : error message 가 들어갈 dom 
				*/
				$.extend(Method, arguments[0]);

				var $this = $(this);
				Method.$that = $this;
				Method.$form = $this.find("form.promo-form");
				Method.$errorMessage = $this.find(Method.errorMessageTarget);
				endPoint = Core.getComponents('component_endpoint');

				if( Method.$form.length < 1 ){
					return;
				}

				$(this).find("button[type='submit']").on("click", function(e){
					e.preventDefault();
					Method.submitCode();
				});

				$(this).find(".promo-list .btn-delete").on("click", function(e){
					e.preventDefault();
					Method.removeCode( $(this).attr("href") );
				});

			},
			removeCode:function(url){
				sandbox.setLoadingBarState(true);
				BLC.ajax({
					url: url,
					type: "GET"
				}, function(data) {
					if (data.error && data.error == "illegalCartOperation") {
						UIkit.modal.alert(data.exception);
						sandbox.setLoadingBarState(false);
					} else {
						window.location.reload();
					}
				});
			},
			submitCode:function(){
				var $form = Method.$form;
				sandbox.setLoadingBarState(true);
				BLC.ajax({url: $form.attr('action'),
						type: "POST",
						data: $form.serialize()
					}, function(data, extraData) {

						var endPointData = $.extend(extraData, { 
							promoCode : sandbox.utils.url.getQueryStringParams( $form.serialize() ).promoCode
						});

						if (data.error && data.error == 'illegalCartOperation') {
							sandbox.setLoadingBarState(false);
							UIkit.modal.alert(data.exception);
							endPointData.exception = 'illegalCartOperation';
							
						} else {
							if(!extraData.promoAdded) {
								sandbox.setLoadingBarState(false);
								Method.$errorMessage.find(".text").html(extraData.exception)
								Method.$errorMessage.removeClass("uk-hidden");
							} else {
								if( _.isElement( Method.replaceTarget) ){
									sandbox.setLoadingBarState(false);
									$(Method.replaceTarget).html( data );
								}else{
									window.location.reload();
								}
							}
						}

						endPoint.call('applyPromoCode', endPointData);
					}
				);
				return false;
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-promotion]',
					attrName:'data-module-promotion',
					moduleName:'module_promotion',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_order_delivery', function(sandbox){
		var Method = {
			$popAddressModal :null,
			$beforeAddress:null,
			$newAddress:null,
			isNewAddress:false,
			isSelectAddress:false,
			moduleInit:function(){
				var $this = $(this);
				
				Method.$popAddressModal = UIkit.modal("#popup-customer-address", {modal: false});
				Method.$beforeAddress = $this.find('[data-before-address]');
				Method.$newAddress = $this.find('[data-new-address]');

				// 배송지 타입이 없는건 비회원이라는 뜻
				Method.isNewAddress = ( $this.find('[data-address-type]').length == 0 ) ? true : false;

				var $personalMsg = $(this).find('[name="personalMessageText"]');
				var $personalSelect = $(this).find('select[name="selectPersonalMessage"]');
				// select가 안되어있고 msg가 있으면 직접입력 처리
				if( $personalMsg.val() != "" && $personalSelect.val() =="" ){
					$personalSelect.val('dt_1');
					$personalMsg.closest(".input-textfield").removeClass('uk-hidden');
				}

				var $personalMsgSelect = sandbox.getComponents('component_select', {context:$this}, function(){
					this.addEvent("change", function(){
						var value = $(this).val();
						if(value == ''){
							$personalMsg.val('');
							$personalMsg.closest(".input-textfield").addClass('uk-hidden');
						}else if(value == 'dt_1'){
							// 직접입력일 경우
							$personalMsg.val('');
							$personalMsg.closest(".input-textfield").removeClass('uk-hidden');
						}else{
							//$personalMsg.val( $(this).find("option:selected").val() + "||" + $(this).find("option:selected").text() );
							$personalMsg.val( $(this).find("option:selected").text());
							$personalMsg.closest(".input-textfield").addClass('uk-hidden');
						}
					});
				});	

				Method.isSelectAddress = ( $(this).find('[name="isSearchAddress"]').val() == 'true' );
				var $zipCodeInput = $(this).find('[name="address.postalCode"]');
				var $zipCodeDisplay = $(this).find('[data-postalCode]');
				var deliverySearch = sandbox.getComponents('component_searchfield', {context:$this, selector:'.search-field', resultTemplate:'#address-find-list'}, function(){
					// 검색된 내용 선택시 zipcode 처리
					this.addEvent('resultSelect', function(data){
						var zipcode = $(data).data('zip-code5');
						var city = $(data).data('city');
						var doro = $(data).data('doro');						

						this.getInputComponent().setValue(city + ' ' + doro);

						$zipCodeInput.val( zipcode );
						$zipCodeDisplay.text( zipcode );
						$zipCodeDisplay.parent().removeClass("uk-hidden");
						Method.isSelectAddress = true;
					});
				});

				var $form = $this.find('#shipping_info');
				sandbox.validation.init( $form );

				// 배송지 정보 submit 시
				$this.find('[data-order-shipping-submit-btn]').on('click', function(e){
					e.preventDefault();
					sandbox.validation.validate( $form );
					if(sandbox.validation.isValid( $form )){
						if( Method.isNewAddress ){
							if( !Method.isSelectAddress ){
								UIkit.modal.alert("검색을 통하여 배송지를 입력해주세요.");
								return;
							}
						}
						$form.submit();
					}
				})


				// 배송지 선택 모듈 select 이벤트 호출( 배송지 선택했을때 호출됨 )
				Core.getComponents('component_customer_address', {context:$this}, function(){
					this.addEvent('select', function(data){
						Method.updateCustomerAddress( data );
						if( Method.$popAddressModal.isActive()){
							Method.$popAddressModal.hide();
						}
					})
				});	

				// 배송지 선택 버튼
				$this.find('[data-customer-address-btn]').on('click', function(e){
					e.preventDefault();
					Method.$popAddressModal.show();
				});				


				// 배송지 입력 타입 버튼 선택시
				$this.find('[data-address-type]').on('show.uk.switcher', function(){
					Method.isSelectAddress = deliverySearch.getValidateChk();
					Method.updateAddressInput();
				});

			}, 

			updateCustomerAddress:function( data ){
				var $target = Method.$beforeAddress;
				if( $target.find('[data-user-name]').length > 0 ){
					$target.find('[data-user-name]').html($.trim(data.fullName));
				}

				if( $target.find('[data-phone]').length > 0 ){
					$target.find('[data-phone]').html($.trim(data.phoneNumber));
				}

				if( $target.find('[data-postalCode]').length > 0 ){
					$target.find('[data-postalCode]').html($.trim(data.postalCode));
				}	

				if( $target.find('[data-address]').length > 0 ){
					$target.find('[data-address]').html($.trim(data.addressLine1 + ' ' + data.addressLine2));
				}

				/*
				if( $target.find('[data-address2]').length > 0 ){
					$target.find('[data-address2]').text(data.addressLine2);
				}
				*/

				// 변경된 값 input 에 적용 
				$target.find('input[name="address.fullName"]').val($.trim(data.fullName));
				$target.find('input[name="address.phonePrimary.phoneNumber"]').val($.trim(data.phoneNumber));
				$target.find('input[name="address.addressLine1"]').val($.trim(data.addressLine1));
				$target.find('input[name="address.addressLine2"]').val($.trim(data.addressLine2));
				$target.find('input[name="address.postalCode"]').val($.trim(data.postalCode));
			},

			updateAddressInput:function(){
				if( Method.$beforeAddress.hasClass('uk-active')){
					Method.isNewAddress = false;
					Method.$beforeAddress.find('input').attr('disabled', false );
					Method.$newAddress.find('input').attr('disabled', true );
				}else{
					Method.isNewAddress = true;
					Method.$beforeAddress.find('input').attr('disabled', true );
					Method.$newAddress.find('input').attr('disabled', false );
				}				
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-order-delivery]',
					attrName:'data-module-order-delivery',
					moduleName:'module_order_delivery',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_register', function(sandbox){
		var Method = {
			moduleInit:function(){
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);

				var $this = $(this);
				var $submitBtn = $this.find('button[type="submit"]');

				sandbox.getComponents('component_textfield', {context:$this}, function(){
					this.addEvent('enter', function(e){
						$submitBtn.trigger("click");
					});
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-register]',
					attrName:'data-module-register',
					moduleName:'module_register',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_order_customer', function(sandbox){
		var args = null;
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				args = arguments[0] || {};

				Method.$that = $this;
				Method.$submitBtn = $this.find('button[type="submit"]');
				Method.$submitBtn.on("click", Method.checkout );

				sandbox.validation.init( $this.find('#order_info') );

				if( $this.find('input[name="isAlreadyRegistered"]').length > 0){
					UIkit.modal.confirm('이미 회원 가입된 아이디 입니다. 로그인 하시겠습니까?', function(){
						window.location.replace(sandbox.utils.contextPath + '/login?successUrl=/checkout');
					}, function(){},
					{
						labels: {'Ok': '로그인', 'Cancel': '비회원 주문'}
					});

				}
			},

			checkout:function(e){
				e.preventDefault();
				var isCheckGcAgree = Method.$that.find('[name="isCheckGcAgree"]').is(':checked');
				var isCheckAcAgree = Method.$that.find('[name="isCheckAcAgree"]').is(':checked');

				if (Method.$that.find('[name="isCheckGcAgree"]').length > 0) {
					if( !isCheckGcAgree ){
						UIkit.modal.alert("이용약관에 동의 해주세요.");
						return;
					}
				}
				if (Method.$that.find('[name="isCheckAcAgree"]').length > 0) {
					if( !isCheckAcAgree ){
						UIkit.modal.alert("개인정보 수집 및 이용에 동의해주세요");
						return;
					}
				}
				Method.$that.find('#order_info').submit();
			}

		}


		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-order-customer]',
					attrName:'data-module-order-customer',
					moduleName:'module_order_customer',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			getOrderCustomerInfo:function(){
				return {
					name:args.name,
					phoneNum:args.phoneNum,
					emailAddress:args.emailAddress
				}
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_filter', function(sandbox){
		'use strict';

		var $filter, args, currentMinPrice, currentMaxPrice, minPrice, maxPrice, limit, arrInputPrice = [], arrQuery = [], currentRangePrice = '', endPoint;
		var pricePattern = 'price=range[{{minPrice}}:{{maxPrice}}]';

		var limitPrice = function(price){
			if(price < minPrice) return minPrice;
			else if(price > maxPrice) return maxPrice;
			else return price;
		}

		var replaceComma = function(str){
			return str.replace(/,|\.+[0-9]*/g, '');
		}

		var getPriceByPercent = function(price){
			return (price-minPrice) / (maxPrice-minPrice) * 100;
		}

		var getPercentByPrice = function(per){
			return Math.round(minPrice+(limit * per)/ 100);
		}


		var callEndPoint = function( option ){
			var temp = option.split("=");
			if( temp.length > 1){
				var opt = {
					key : temp[0],
					value : temp[1]
				}
				endPoint.call( 'applyFilter', opt );
			}
		}

		var filterStickyConfirm = function () {

			if (sandbox.getModule('module_pagination') !== null) {
				$('#filter-sticky-confirm span').text(sandbox.getModule('module_pagination').getTotalCount());
			}

			var menu_key = 0;
			var filtercategoryUrl = $('#category-swiper').data('url');
			var filtercategoryDepth = $('#category-swiper li.list-depth');

			$('#category-swiper li').each(function (index, val) {								
				if ($(val).hasClass('cloth-dhp2')) {
					$('#category-swiper li.list-depth').each(function (index, val) {				
						if (!$(val).next().hasClass('cloth-dhp2')) $(val).remove();
						else if ($(val).next().hasClass('cloth-dhp2')) $(val).find('a').text('전체');
					});
				} else if ($(val).hasClass('cloth-dhp3')) {
					$('#category-swiper li.list-depth').each(function (index, val) {				
						if (!$(val).next().hasClass('cloth-dhp3')) $(val).remove();
						else if ($(val).next().hasClass('cloth-dhp3')) $(val).find('a').text('전체');
					});
				}			
			});

			if($('body').attr('data-device') === 'mobile') {
				$('#category-swiper-container').show();
			} 

			$('#category-swiper li').each(function (index, val) {	
				var w = $(val).outerWidth();
				$(val).css('width', w + 20);
				if ($(this).hasClass('active')) menu_key = index;
			});

			var swiper = new Swiper('#category-swiper-container', {
				scrollbarHide: true,
				slidesPerView: 'auto',
				centeredSlides: false,
				initialSlide: menu_key,
				// initialSlide: 3,
				grabCursor: false
			});
		}
		filterStickyConfirm();


		$(window).resize(function (e) {
			var wH = $(window).width();
			if (wH <= 480) {
				// console.log('mobile');
				$('.f-subtitle-box').removeClass('.uk-accordion-title');
				$('#category-swiper-container').show();
			} else if (wH > 480 && wH <= 960) {
				// console.log('tablet');
				$('.f-subtitle-box').addClass('.uk-accordion-title');
				$('#category-swiper-container').hide();
			} else if (wH > 960) {
				// console.log('pc');
				$('#category-swiper-container').hide();
			}
		});


		function UpdateHeaders_top() {
			$(".wrapper").each(function() {
				var el = $('.item-list-wrap'),
					filter = $('.filter-wrap_category'),
					offset = el.offset(),
					scrollTop = $(window).scrollTop();
	
				if(!offset) return;
	
				(scrollTop > offset.top) ? filter.addClass('sticky') : filter.removeClass('sticky')
			});
		}
		$(window).scroll(UpdateHeaders_top).trigger("scroll");


		var local, local_pathname = location.pathname, params;
		if (location.pathname === "/kr/ko_kr/search") {
			local = location.pathname + location.search; // 검색
		} else {
			local = location.pathname; // 카테고리
		}

		var Method = {
			moduleInit : function () {
				args = arguments[0];
				$filter = $(this);
				endPoint = Core.getComponents('component_endpoint');

				//$('input[type=checkbox]').prop('checked', false);

				//초기 query 분류
				//arrQuery = sandbox.utils.getQueryParams(location.href, 'array');
				var query = sandbox.utils.getQueryParams(location.href);
				for(var key in query){
					if(key !== 'page'){
						if(typeof query[key] === 'string'){
							arrQuery.push(key+'='+query[key]);
						}else if(typeof query[key] === 'object'){
							for(var i=0; i < query[key].length; i++){
								arrQuery.push(key+'='+query[key][i]);
							}
						}
					}
				}

				//filter price range
				var priceRange = sandbox.getComponents('component_range', {context:$filter}, function(){
					this.addEvent('change', function(per){
						if($(this).hasClass('min')){
							currentMinPrice = getPercentByPrice(per);
							arrInputPrice[0].setValue(sandbox.rtnPrice(currentMinPrice));
						}else if($(this).hasClass('max')){
							currentMaxPrice = getPercentByPrice(per);
							arrInputPrice[1].setValue(sandbox.rtnPrice(currentMaxPrice));
						}
					});

					this.addEvent('touchEnd', function(per){
						var val = sandbox.utils.replaceTemplate(pricePattern, function(pattern){
							switch(pattern){
								case 'minPrice' :
									return currentMinPrice;
									break;
								case 'maxPrice' :
									return currentMaxPrice;
									break;
							}
						});

						if(arrQuery.indexOf(currentRangePrice) > -1){
							arrQuery.splice(arrQuery.indexOf(currentRangePrice), 1);
						}

						callEndPoint( val );
						arrQuery.push(val);
						currentRangePrice = val;

						Method.appendCateItemList();
					});
				});

				var textfield = sandbox.getComponents('component_textfield', {context:$filter}, function(){
					this.addEvent('focusout', function(e){
						var type = $(this).attr('data-name');
						var per = getPriceByPercent(limitPrice(replaceComma($(this).val())));

						if(type === 'min'){
							priceRange.getSlide(0).setPercent(per);
						}else if(type === 'max'){
							priceRange.getSlide(1).setPercent(per);
						}
					});

					arrInputPrice.push(this);
				});

				if(priceRange){
					var objPrice = (priceRange) ? priceRange.getArgs() : {min:0, max:1};
					minPrice = (objPrice.min == 'null') ? 0:parseInt(objPrice.min);
					maxPrice = (objPrice.max == 'null') ? 1:parseInt(objPrice.max);
					limit = maxPrice - minPrice;
					currentMinPrice = replaceComma(arrInputPrice[0].getValue());
					currentMaxPrice = replaceComma(arrInputPrice[1].getValue());
					priceRange.getSlide(0).setPercent(getPriceByPercent(currentMinPrice));
					priceRange.getSlide(1).setPercent(getPriceByPercent(currentMaxPrice));

					currentRangePrice = sandbox.utils.replaceTemplate(pricePattern, function(pattern){
						switch(pattern){
							case 'minPrice' :
								return currentMinPrice;
								break;
							case 'maxPrice' :
								return currentMaxPrice;
								break;
						}
					});
				}

 
				// 필터 클릭 처리
				sandbox.getComponents('component_radio', {context:$filter, unlock:true}, function(i){
					var currentValue = '';

					//처음 라디오 박스에 체크 되었을때만 이벤트 발생
					this.addEvent('init', function(){
						var val = this.attr('name') +'='+ encodeURIComponent($(this).val());
						currentValue = val;
					});

					this.addEvent('change', function(input){

						var val = $(input).attr('name') +'='+ encodeURIComponent($(input).val());

						// console.log('sort', val)

						if($(this).parent().hasClass('checked')){
							arrQuery.splice(arrQuery.indexOf(val), 1);
						}else{
							if(currentValue !== '') arrQuery.splice(arrQuery.indexOf(currentValue), 1);
							var filterData = '';
							if( $(this).data('label') != null ){
								filterData = $(this).attr('name') + '=' + $(this).data('label');
							}else{
								filterData = val;
							}
							callEndPoint( filterData );
							arrQuery.push(val);
							currentValue = val;
							// console.log(arrQuery)
						}

						Method.appendCateItemList();
					});
				});

				sandbox.getComponents('component_checkbox', {context:$filter}, function(){
					this.addEvent('change', function(){
						var val = $(this).attr('name') +'='+ encodeURIComponent($(this).val());

						if(arrQuery.indexOf(val) !== -1){
							arrQuery.splice(arrQuery.indexOf(val), 1);
						}else{
							var filterData = '';
							if( $(this).data('label') != null ){
								filterData = $(this).attr('name') + '=' + $(this).data('label');
							}else{
								filterData = val;
							}
							callEndPoint( filterData );
							arrQuery.push(val);
							// console.log(arrQuery)
						}

						Method.appendCateItemList();
					});
				});

				//필터 동작
				$(document).on('click', '.filter-remove-btn', function(e){
					e.preventDefault();

					var query = encodeURI($(this).attr('href'));
					arrQuery.splice(arrQuery.indexOf(query), 1);

					query = arrQuery.join('&');
					query += sandbox.getModule('module_pagination') ? (sandbox.getModule('module_pagination').getPagingType() === 'number' ? '&page=1&' : '') : '';
					window.location.assign(location.pathname + '?' + query);
				});

				// 필터 초기화
				$(document).on('click', '#filter-sticky-reset', function(e){
					sandbox.utils.ajax(location.pathname, 'GET', {}, function (data) {					
						var responseText = $(data.responseText).find(args['data-module-filter'].target)[0].innerHTML;
						$(args['data-module-filter'].target).empty().append(responseText);
						sandbox.moduleEventInjection(responseText);
						history.pushState(null, null, location.pathname);

						$('.filter-category-wrap form input').prop('checked', false);

						filterStickyConfirm();
					});
				});

				// 필터 열기
				$(document).on('click', args['data-module-filter'].filterOpenBtn, function(e){
					e.preventDefault();

					$filter.stop().animate({opacity:1, left:0}, 300, function () {
						$('.pw-filter-sticky').addClass('active');
					});

					$('.dim').addClass('active');
					$('html').addClass('uk-modal-page');
					$('body').css('paddingRight', 15);

					filterStickyConfirm();
				});

				// $filter.stop().animate({opacity:1, left:0}, 300);
				// $('.dim').addClass('active'); 
				// $('html').addClass('uk-modal-page');
				// $('body').css('paddingRight', 15);
				// filterStickyConfirm();
				// $('.pw-filter-sticky').addClass('active');


				// iphone error!
				// $(document).on('click', '.dim', function(e){ 
				$('.dim').on('click', function(e){
					$filter.stop().animate({opacity:0, left:-300}, 300, function(){
						$(this).removeAttr('style');
						$('.pw-filter-sticky').removeClass('active');
					});
					$('.dim').removeClass('active');
					$('html').removeClass('uk-modal-page');
					$('body').removeAttr('style');
				});


				//필터 더보기 버튼
				$filter.find('.more-btn').each(function(){
					var $this = $(this);
					var $target = $this.prev();
					var minHeight = $target.height();
					var maxHeight = $target.children().height();

					$(this).click(function(e){
						e.preventDefault();
						$target.removeClass('more-container');
						$this.remove();
					});
				});

				// 닫기 버튼
			  $filter.find('.btn-close, #filter-sticky-confirm').on('click', function(){
					$filter.stop().animate({opacity:0, left:-300}, 300, function(){
						$(this).removeAttr('style');
						$('.pw-filter-sticky').removeClass('active');
					});

					$('.dim').removeClass('active');
					$('html').removeClass('uk-modal-page');
					$('body').removeAttr('style');
				});

			},

			appendCateItemList:function(){
				//console.log(getPagingType);
				
				// var query = arrQuery.join('&');
				// query += sandbox.getModule('module_pagination') ? (sandbox.getModule('module_pagination').getPagingType() === 'number' ? '&page=1&' : '') : ''
				// window.location.assign(location.pathname + '?' + query);
				
				// $(args.form).serialize();
				// $(args.form).submit();
				// console.log($('[' + args['data-module-filter'].form + ']').serialize());
				// $('[' + args['data-module-filter'].form + ']').submit();

				var obj = $('.filter-category-wrap form').serialize();

				sandbox.utils.ajax(local, 'GET', obj, function (data) {
					var responseText = $(data.responseText).find(args['data-module-filter'].target)[0].outerHTML;
					$(args['data-module-filter'].target).empty().append(responseText);
					sandbox.moduleEventInjection(responseText);

					if (local_pathname === "/kr/ko_kr/search") {
						params = local + '&' + obj; // 검색
					} else {
						params = local + '?' + obj; // 카테고리
					}
					history.pushState(null, null, params);
					
					filterStickyConfirm();
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-filter]',
					attrName:['data-module-filter'],
					moduleName:'module_filter',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_checkout', function(sandbox){
		var Method = {
			moduleInit:function(){
				var $this = $(this);

				// header
				//매장상품 확인 예약 서비스에서 진입한 경우 탭을 다 펼침
				if($this.find('[data-cod-btn]').length > 0){
					$this.find('[data-order-tab] .header').each(function(){
						var $icon = $(this).find('[class^="icon-toggle-"]');
						var $view = $(this).closest('.order-tab').find('.view');
						var $preview = $(this).find('.preview');

						if( $view.length > 0 ){
							$preview.removeClass('uk-hidden');
							$view.removeClass('uk-hidden');
							$icon.remove();
						}
					});
					//결제수단 선택 글씨 지우기.

					// console.log($('[data-checkout-step]').data('checkout-step'));
	
					if($this.find('.contents').length > 0){
						$this.find('.contents').addClass('reservations-wrap');
					}
					if($this.find('.order-wrap').length > 0){
						$this.find('.order-wrap').addClass('reservations-item');
					}
					if($this.find('#popup-cancel').length > 0){
						$this.find('#popup-cancel').addClass('reservations-popup');
					}
				} else {
					$this.find('[data-order-tab] .header').on("mousedown", Method.updateOrderTab);

					// SEAMLESS_START 2018-02-05
					$this.find("#idChangePickupToShip").click(function() {
						UIkit.modal.confirm('<p align="center">상품수령 방법을 택배수령으로 변경하시겠습니까?</p><p align="center">일반배송인 경우 2~3일 소요됩니다.</p>', function(){
							Method.changePickupToShip();
						});
					});
					// SEAMLESS_END
				}
			},
			changePickupToShip:function(e){// SEAMLESS 2018-03-20
				var formRequest = BLC.serializeObject($("form[name=formChangePickupToShip]"));
				sandbox.setLoadingBarState(true);
				BLC.ajax({
					url:sandbox.utils.contextPath +"/cart/add?directOrder=true",
					type:"POST",
					dataType:"json",
					data : formRequest
				},function(data){
					if(data.error){
						sandbox.setLoadingBarState(false);
						UIkit.modal.alert(data.error);
					}else{
						Core.Loading.show();
						endPoint.call( 'buyNow', formRequest );//???
						_.delay(function(){
							window.location.assign( sandbox.utils.contextPath +'/checkout' );
						}, 500);
					}
				}).fail(function(msg){
					sandbox.setLoadingBarState(false);
					if(commonModal.active) commonModal.hide();
					if(msg !== '' && msg !== undefined){
						UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'warning'});
					}
				});
			},
			updateOrderTab:function(e){
				e.preventDefault();
				var $icon = $(this).find('[class^="icon-toggle-"]');
				var $view = $(this).closest('.order-tab').find('.view');
				var $preview = $(this).find('.preview');

				if( $view.length > 0 ){
					$preview.toggleClass('uk-hidden');
					$icon.toggleClass('uk-hidden');
					$view.toggleClass('uk-hidden');
				}
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-checkout]',
					attrName:'data-module-checkout',
					moduleName:'module_checkout',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_text_banner', function(sandbox){
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var $banner = $this.find('ul');

				var defaultOption = {
					onSliderLoad : function(){
						//$this.find('.text-wrap').width($this.find( ".bx-viewport" ).width() )
						//$this.show();
					},
					auto: true,	
					autoHover: true,
					autoDelay : 5000,
					adaptiveHeight: true,
					pager: false,
					useCSS: false,
					mode: "fade",
				}
				var slider = $banner.bxSlider(defaultOption);

				$(this).find('.bxslider-controls .btn-next').on('click', function(e) {
					e.preventDefault();
					slider.goToNextSlide();
				});
				$(this).find('.bxslider-controls .btn-prev').on('click', function(e) {
					e.preventDefault();
					slider.goToPrevSlide();
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-text-banner]',
					attrName:'data-module-text-banner',
					moduleName:'module_text_banner',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_category', function(sandbox){
		var $that;
		var arrViewLineClass=['uk-width-medium-1-3', 'uk-width-large-1-2', 'uk-width-large-1-3', 'uk-width-large-1-4', 'uk-width-large-1-5'];
		var Method = {
			moduleInit:function(){
				$this = $(this);

				// assist category 리스트 판별
				$(this).closest('body').addClass('module_category');

				//uk-width-medium-1-3 uk-width-large-1-3
				//view Length 2:maxLen
				$this.find('.select-view > button').click(function(e){
					e.preventDefault();

					if(!$(this).hasClass('active')){
						$(this).addClass('active').siblings().removeClass('active');

						var value = $(this).attr('data-value');

						$this.find('[data-component-categoryitem]').parent()
						.removeClass(arrViewLineClass.join(' '))
						.addClass('uk-width-large-1-'+value);

						//category lineSize
						sandbox.getModule('module_pagination').setLineSize(value);

						var $customBanner = $(this).closest('section').find('.item-list-wrap').find('.product-item.customBanner');

						if( $customBanner.length > 0){
							if( value <= 2 ){
								$customBanner.addClass('uk-hidden');
							}else{
								$customBanner.removeClass('uk-hidden');
							}
						}
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-category]',
					attrName:'data-module-category',
					moduleName:'module_category',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_guest_order_search', function(sandbox){
		var Method = {
			$that:null,
			$form:null,
			$stepContainer:null,
			$errorAlert:null,
			$searchKey:null,
			moduleInit:function(){

				// listSize = 검색 결과 한번에 보여질 리스트 수
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);

				var $this = $(this);
				Method.$that = $this;
				Method.$form = $this.find("form");

				Method.$stepContainer = $this.find(".step-container");
				Method.$errorAlert = Method.$that.find('[data-error-alert]');
				Method.$search = $this.find('.search-container');

				Core.getComponents('component_textfield', {context:$this}, function(){
					this.addEvent('enter', function(){
						Method.searchSubmit();
					});
				});

				$this.find('button[type="submit"]').on('click', function(e){
					e.preventDefault();
					Method.searchSubmit();
				} );


				// 로그인 버튼
				$this.on('click', '[data-login-btn]',  Method.customerLogin );

				// 인증하기 버튼
				$this.on('click', '[data-certify-btn]', Method.guestCertify );

				$this.on('click', '[data-back-btn]', function(){
					Method.viewStep(1);
				});

				sandbox.validation.init( Method.$form );
			},

			updateSelectOrder:function(e){
				e.preventDefault();
				// 자신 버튼 숨기기
				$(this).parent().hide();
				// 자신 컨텐츠 켜기
				$(this).closest('li').find('[data-certify-content]').slideDown('300');
				// 다른 버튼 보이기
				$(this).closest('li').siblings().find('[data-order-select-btn]').parent().show();
				// 다른 컨텐츠 숨기기
				$(this).closest('li').siblings().find('[data-certify-content]').hide();
			},
			searchSubmit:function(){
				sandbox.validation.validate( Method.$form );

				if( sandbox.validation.isValid( Method.$form )){
					Method.hideAlert();
					sandbox.utils.ajax(Method.$form.attr("action"), 'POST', Method.$form.serialize(), function(data){
						Method.createGuestOrderList(JSON.parse( data.responseText ));
					});
				}
			},
			viewStep:function(num){
				Method.$stepContainer.addClass('uk-hidden');
				Method.$that.find('.step-' + num ).find('input[name="identifier"]').val('');
				Method.$that.find('.step-' + num ).removeClass('uk-hidden');
			},
			showAlert:function(msg){
				UIkit.modal.alert(msg);
				//UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
				/*
				Method.$errorAlert.text(msg);
				Method.$errorAlert.removeClass('uk-hidden');
				*/
			},
			hideAlert:function(){
				Method.$errorAlert.addClass('uk-hidden');
			},
			createGuestOrderList:function(data){
				var result = data['result'];
				var $listContainer = Method.$that.find('.list-container');
				var list = data['ro'];
				var html = '';

				//console.log(data);

				if( result == true ){
					if( list.length == 0 ){
						Method.showAlert('검색결과가 없습니다. 다른 정보를 이용해 다시 검색해 주십시오.');
					}else{
						//orderNumber, phoneNumber, emailAddress, 주문자명(name), 뭐가 들어 올지 모름
						//주문자명의 경우 list에 매칭 값이 넘어 오지 않음.
						//넘어 오는 값 정보는
						//customerId, isGuestCustomer, guestOrderDTOs
						//guestOrderDTOS: orderNumber, submitDate, emailAddress, phoneNumber
						Method.$searchKey = Method.$that.find('input[name="identifier"]').val();
						var orderNumberPattern = /[0-9]{12,30}$/;  //입력값이 orderNum인 경우 orderNum이 일치 하면 목록에 추가
						var orderNumberSearch = false;
						if(orderNumberPattern.test(Method.$searchKey)){
							orderNumberSearch = true;
						}

						console.log(list);

						$.each( list, function( index, li ){
							var addList = false;
							for(var i=0; i<li.guestOrderDTOs.length; i++){
								if(orderNumberSearch){
									if(Method.$searchKey === li.guestOrderDTOs[i].orderNumber){
										li.guestOrderDTO = li.guestOrderDTOs[i];
										li.guestOrderDTO.orderItemName = li.guestOrderDTOs[i].orderItemNames[0];
										li.isItems = (li.guestOrderDTOs.length > 1);
										li.itemLength = li.guestOrderDTOs.length-1;
										li.totalAmount = sandbox.rtnPrice(li.guestOrderDTOs[i].totalAmount.amount);
										li.isPhoneNum = (li.guestOrderDTOs[i].phoneNumber) ? true : false;
									}
								}
							}

							// li.guestOrderDTO = li.guestOrderDTOs[0];
							// li.guestOrderDTO.orderItemName = li.guestOrderDTOs[0].orderItemNames[0];
							// li.isItems = (li.guestOrderDTOs.length > 1);
							// li.itemLength = li.guestOrderDTOs.length-1;
							// li.totalAmount = sandbox.rtnPrice(li.guestOrderDTO.totalAmount.amount);
							// li.isPhoneNum = (li.guestOrderDTOs[0].phoneNumber) ? true : false;
						});

						html = Handlebars.compile($("#guest-order-list").html())(list);

						$listContainer.html( html );
						sandbox.moduleEventInjection( html );


						// 검색된 리스트중 선택시
						Method.$that.on('click', '[data-order-select-btn]',  Method.updateSelectOrder );
						Method.viewStep(2);
					}
				}else{
					Method.showAlert(data['errorMsg']);
				}
			},
			customerLogin:function(){
				var orderNumber = $(this).closest('li').find('input[name="orderNumber"]').val();

				// 회원 주문
				var modal = UIkit.modal('#common-modal');
				var promise = null;
				promise = sandbox.utils.promise({
					url:sandbox.utils.contextPath + '/dynamicformpage',
					type:'GET',
					data:{'name':'login', 'dataType':'model'}
				}).then(function(data){
					var defer = $.Deferred();
					var appendTxt = $(data).find('.content-area').html();
					$('#common-modal').find('.contents').empty().append(appendTxt);
					sandbox.moduleEventInjection(appendTxt, defer);
					modal.show();
					return defer.promise();
				}).then(function(){
					//window.document.location.href = "/account/orders/" + orderNumber
					window.document.location.href = "/account/orders/";
				}).fail(function(msg){
					UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
					modal.hide();
				});
			},

			// 비회원 인증 처리
			guestCertify:function(){
				var type = $(this).attr('data-type');
				var orderNumber = $(this).closest('li').find('input[name="orderNumber"]').val();
				var customerId = $(this).closest('li').find('input[name="customerId"]').val();
				var email = $(this).closest('li').find('input[name="email"]').val();
				var phoneNum = $(this).closest('li').find('input[name="phonenum"]').val();
				var url = sandbox.utils.contextPath + "/guest/orders/requestAuthUrl?customer=" + customerId;

				//var type = $(this).closest('li').find('input[name^="certify.type"]:checked').val();
				// 현재는 무조건 email로 처리
				//customerId=1111111&targeter=이메일 or 폰&messageType=EMAIL or SMS

				if( type === 'email'){
					url += '&targeter=' + email + '&messageType=EMAIL';
				}else if( type === 'sms'){
					url += '&targeter=' + phoneNum + '&messageType=SMS';
				}

				sandbox.utils.ajax(url, 'GET', {}, function(data){
					var responseData = sandbox.rtnJson(data.responseText);
					if(responseData.result == true){
						Method.$search.hide();
						if(type === 'email'){
							Method.viewStep(3);
						}else if(type === 'sms'){
							Method.viewStep(4);
						}
					}else{
						Method.showAlert(responseData['errorMsg']);
					}

				}, true );

				return;
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-guest-order-search]',
					attrName:'data-module-guest-order-search',
					moduleName:'module_guest_order_search',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_cart', function(sandbox){
		var $this, endPoint;
		var Method = {
			moduleInit:function(){
				// modal layer UIkit 사용
				$this = $(this);
				var modal = UIkit.modal('#common-modal');
				endPoint = Core.getComponents('component_endpoint');

				var addonComponents = sandbox.getComponents('component_addon_product_option', {context:$this, optionTemplate:'#order-addon-sku-option'}, function(i){
					var _self = this;

					this.addEvent('submit', function(data){
						var $this = $(this);

						UIkit.modal.confirm('장바구니에 상품을 담으시겠습니까?', function(){
							var itemRequest = {};
							var addToCartItems = _self.getChildAddToCartItems();
							var keyName='';

							for(var i=0; i<addToCartItems.length; i++){
								keyName = 'childOrderItems[' + i + ']';
								for(var key in addToCartItems[i]){
									itemRequest['childAddToCartItems['+i+'].'+key] = addToCartItems[i][key];
								}
							}

							//애드온 orderId 알아야함
							itemRequest['addOnOrderId'] = _self.getAddOnOrderId();
							itemRequest['isAddOnOrderProduct'] = true;
							itemRequest['csrfToken'] = $this.closest('form').find('input[name=csrfToken]').val();

							BLC.ajax({
								url:$this.closest('form').attr('action'),
								type:"POST",
								dataType:"json",
								data:itemRequest
							}, function(data){
								if(data.error){
									UIkit.modal.alert(data.error);
								}else{
									location.href = sandbox.utils.url.getCurrentUrl();
								}
							});
						});
					});
				});


				// 품절상태 주문하기 버튼 disabled
				var arr = [];
				$(this).find('.product-opt_cart').each(function (i, v) {
					var _this = $(this);
					arr.push(_this.data('containskey') == true);
				});
				var arrWrap = _.some(arr, Boolean);
				if (arrWrap) $(this).find('.btn-order').attr('href', '#').addClass('disabled');


				//주문하기
				$(this).on('click', '.btn-order', function(e){
					e.preventDefault();
					endPoint.call('checkoutSubmit');
					if(addonComponents){

						e.preventDefault();
						if(sandbox.utils.getValidateChk(addonComponents)){
							var isAddOnOrderNoChoice = $("input[name='isAddOnOrderNoChoice']").is(":checked");
							var param = "";

							if( isAddOnOrderNoChoice  == true ){
								param = "?isAddOnOrderNoChoice=true";
							}

							location.href = $(this).attr('href') + param;
						}
					}else{
						location.href = $(this).attr('href');
					}
				});


				//옵션 변경
				$(this).on('click', '.optchange-btn', function(e){
					e.preventDefault();

					var target = $(this).attr('href');
					var $parent = $(this).closest('.product-opt_cart');
					var id = $parent.find('input[name=productId]').attr('value');
					var quantity = $parent.find('input[name=quantity]').attr('value');
					var url = $parent.find('input[name=producturl]').attr('value');
					var orderItemId = $parent.find('input[name=orderItemId]').attr('value');
					var size = $parent.find('input[name$=SIZE]').attr('value');
					var obj = {'qty':quantity, 'orderitemid':orderItemId, 'quickview':true, 'size':size}

					$parent.find('[data-opt]').each(function(i){
						var opt = sandbox.rtnJson($(this).attr('data-opt'), true);
						for(var key in opt){
							obj[key] = opt[key];
						}
					});

					sandbox.utils.ajax(url, 'GET', obj, function(data){
						var domObject = $(data.responseText).find('#quickview-wrap');
						$(target).find('.contents').empty().append(domObject[0].outerHTML)
						$(target).addClass('quickview');
						sandbox.moduleEventInjection(domObject[0].outerHTML);
						modal.show();
					});

				});

				//나중에 구매하기
				$(this).on('click', '.later-btn', function(e){
					e.preventDefault();

					$.cookie('pageMsg', $(this).attr('data-msg'));
					Method.addItem.call(this, {type:'later'});
				});

				//카트에 추가
				$(this).on('click', '.addcart-btn', function(e){
					e.preventDefault();

					$.cookie('pageMsg', $(this).attr('data-msg'));
					Method.addItem.call(this, {type:'addcart'});
				});

				//카트 삭제
				$(this).on('click', '.delete-btn .btn-delete', Method.removeItem );

				//카트 전체삭제
				$(this).on('click', '.btn-cart-delete-All', Method.removeItemAll);

				//페이지 상태 스크립트
				var pageMsg = $.cookie('pageMsg');
				if(pageMsg && pageMsg !== '' && pageMsg !== 'null'){
					$.cookie('pageMsg', null);
					UIkit.notify(pageMsg, {timeout:3000,pos:'top-center',status:'success'});
				}
			},
			addItem:function(opt){

				var $parent = $(this).closest('.product-opt_cart');
				var id = $parent.find('input[name=productId]').attr('value');
				var orderItemId = $parent.find('input[name=orderItemId]').attr('value');
				var quantity = $parent.find('input[name=quantity]').attr('value');
				var sessionId = $(this).siblings().filter('input[name=csrfToken]').val();
				var obj = {'productId':id, 'orderItemId':orderItemId ,'quantity':quantity, 'csrfToken':sessionId}
				var url = $(this).closest('form').attr('action');
				var method = $(this).closest('form').attr('method');

				$parent.find('[data-opt]').each(function(i){
					var opt = sandbox.rtnJson($(this).attr('data-opt'), true);
					for(var key in opt){
						obj['itemAttributes['+ $(this).attr('data-attribute-name') +']'] = opt[key];
					}
				});

				sandbox.utils.ajax(url, method, obj, function(data){
					var jsonData = sandbox.rtnJson(data.responseText, true) || {};
					var url = sandbox.utils.url.removeParamFromURL( sandbox.utils.url.getCurrentUrl(), $(this).attr('name') );

					if(jsonData.hasOwnProperty('error')){
						$.cookie('pageMsg', jsonData.error);
					}
					window.location.assign(url);
				});
			},
			removeItem:function(e){
				e.preventDefault();
				var url = $(this).attr('href');

				// TODO
				// 모델값이 없다;
				var model = $(this).closest(".item-detail").find("[data-model]").data("model");
				var name = $(this).closest(".item-detail").find("[data-eng-name]").data("eng-name");

				UIkit.modal.confirm('삭제하시겠습니까?', function(){
					Core.Loading.show();

					var param = sandbox.utils.url.getQueryStringParams( url );
					param.model = model;
					param.name = name;

					endPoint.call( 'removeFromCart', param);
					_.delay(function(){
						window.location.href = url;
					}, 1000);
				}, function(){},
				{
					labels: {'Ok': '확인', 'Cancel': '취소'}
				});


			},

			// 전체삭제 추가 2018.7.6
			removeItemAll:function(e){
				e.preventDefault();
				var url = $(this).attr('href');

				UIkit.modal.confirm('장바구니에 담긴 상품을 모두 삭제하시겠습니까?', function(){
					Core.Loading.show();



					BLC.ajax({
						url: url,
						type: "GET"
					}, function(data) {
						if (data.error ) {
							UIkit.modal.alert(data.error);
						} else {
							window.location.reload();

							_.delay(function(){
							}, 1000);


						}
					});



					_.delay(function(){
						window.location.href = url;
					}, 1000);
				}, function(){},
				{
					labels: {'Ok': '확인', 'Cancel': '취소'}
				});






				// BLC.ajax({
				// 	url:$this.closest('form').attr('action'),
				// 	type:"POST",
				// 	dataType:"json",
				// 	data:itemRequest
				// }, function(data){
				// 	if(data.error){
				// 		UIkit.modal.alert(data.error);
				// 	}else{
				// 		location.href = sandbox.utils.url.getCurrentUrl();
				// 	}
				// });





			}
			// 전체삭제 추가 2018.7.6 : end


		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-cart]',
					attrName:'data-module-cart',
					moduleName:'module_cart',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	// 전역으로 사용될 기본 변수명
	var md = null;
	var queryString = "";
	dl = {};

	function init(){
		md = _GLOBAL.MARKETING_DATA();
		// context
		md.pathName = md.pathName.replace(_GLOBAL.SITE.CONTEXT_PATH, "");
		queryString = Core.Utils.url.getQueryStringParams( Core.Utils.url.getCurrentUrl());

		// 기본 정보 이외의 추가 정보를 처리해야 하는 타입들
		switch( md.pageType ){
			case "category" :
				$.extend( dl, getCategoryData());
			break;

			case "search" :
				$.extend( dl, getSearchData());
			break;

			case "product" :
				$.extend( dl, getProductData());
			break;

			case "cart" :
				$.extend( dl, getCartData());
			break;

			case "checkout" :
				$.extend( dl, getCheckoutData());
			break;

			case "confirmation" :
				$.extend( dl, getOrderConfirmationData());
			break;

			case "register":
				$.extend( dl, getRegisterStartData());
			break;

			case "registerSuccess":
				if( _GLOBAL.CUSTOMER.ISSIGNIN ){
					$.extend( dl, getRegisterComplateData());
				}
			break;

		}

		$.extend( dl, getPageData());

		//console.log( dl );
		window._dl = dl;

		$(document).ready( function(){
			$("body").on("click", "[data-click-name]", function(e){
				//e.preventDefault();
				//var target = $(this).attr("target") || '_self';
				//var href = $(this).attr("href");
				var name = $(this).data("click-name");
				var area = $(this).data("click-area");
				var enable = $(this).data("click-enable");
				var endPoint = Core.getComponents('component_endpoint');
				//console.log(target);
				//console.log(href);
				//console.log(endPoint);
				if( enable != false ){
					endPoint.call('clickEvent', {area : area, name : name});
				}
				//alert("잠시 멈춤");
			})
		})
	}

	function getPageData(){
		var data = {};
		data.site_app_name = "nikestorekr"; // 고정
		data.page_division = "Commerce";
		data.country = "kr";
		data.language = "ko-KR";
		data.page_name = getPageName();

		data.site_section = getSectionL1Data(); // gender : man, women, boy, girls
		data.site_section_l2 = getSectionL2Data();
		data.page_type = getPageTypeData(); //goods, grid wall/ grid wall:PWH  prop17

		data.login_status = _GLOBAL.CUSTOMER.ISSIGNIN ? "logged in" : "not logged in";    //logged in,  not logged in

    //20180709 | member_serial 추가
    if(_GLOBAL.CUSTOMER.ISSIGNIN){
   		data.member_serial  = _GLOBAL.CUSTOMER.ID ;
    }


		if( data.page_type == "sport landing"){
			data.page_division = "brand";
			data.sport_category	= data.page_name[ data.page_name.length-1];
		}

		if( data.page_type == "brand landing"){
			data.page_division = "brand";
		}

		if( md.pathName == "/checkout"){
			$.extend( data, getCheckoutData());
		}

		if( md.pathName == "/launch"){
			$.extend( data, getCategoryData());
		}

		// 로그인 후 첫 페이지 이면
		/*
		var isFirstLogin = true;
		if( isFirstLogin == "true" ){
			data.page_event = {
				login : true
			}
		}
		*/
		return data;
	}
	function getPageName(){
		// checkout 에서 키프트 카드, 적립금 등을 사용해서 url 이 바뀌더라도 checkout으로 처리
		if( md.pathName.indexOf("/giftcard/credit") == 0 || md.pathName.indexOf("/giftcard/apply") == 0 || md.pathName.indexOf("/giftcard/removeCredit") == 0 ){
			md.pathName = "/checkout";
		}

		if( md.pathName == "/"){
			md.pathName = "/homepage";
		}
		//첫번째 / 제거
		var url = md.pathName.replace("/", "");
		return url.split("/");
	}

	function getPageTypeData(){
		// 이미 type 이 잡혀있다면 다시 설정하지 않음
		if( dl.page_type != null ){
			return;
		}
		//TODO
		// else if 로 전체 변경하자

		// goods
		// grid wall -> categoryData 에서 처리

		// homepage
		if( md.pathName == '/homepage' ){
			return "homepage";
		}
		// snkrs
		/*
		if( md.pathName == '/launch' || queryString.c == 'snkrs'){
			return "snkrs";
		}
		*/
		// search -> searchData에서 처리
		// sports landing


		if( getRegexTestResult( /\/l(.*.)\/(running|training|basketball|football|skateboarding|golf|yoga|tennis|gym-training)$/g, md.pathName ) ){
			return "sport landing";
		}

		// brand landing
		if( getRegexTestResult( /\/l\/(nikelab|jordan|nba|sportswear|acg)$/g, md.pathName ) ){
			return "brand landing";
		}

		// gender landing
		if( md.pathName == "/l/men" || md.pathName == "/l/women" || md.pathName == "/l/boys" || md.pathName == "/l/girls" ){
			return "gender landing";
		}

		// my page
		if( md.pathName == '/mypage' ){
			return "my page";
		}

		// cart -> cartData에서 처리
		// order -> checkout 에서 처리
		// cscenter -> 이부분은 확인 해야함 zendesk에서 던져줘야 하는 정보가 될수있음
		// the draw

		if( md.pathName == "/account/wishlist"){
			return "mylocker";
		}

		// memeber
		if( md.pathName.indexOf("/account") == 0 || md.pathName == "/resetPasswordSuccess" || md.pathName == "/updateAccountSuccess"){
			return "member";
		}

		// etc
		return "etc";

	}

	function getSectionL1Data(){
		var patten = "";

		if( md.pathName.indexOf("/l/men") == 0 || md.pathName.indexOf("/w/men")  == 0 || md.pathName.indexOf("/t/men")  == 0 ){
			return "men";
		}
		if( md.pathName.indexOf("/l/women") == 0 || md.pathName.indexOf("/w/women") == 0 || md.pathName.indexOf("/t/women")  == 0 ){
			return "women";
		}
		if( md.pathName.indexOf("/l/boys") == 0  || md.pathName.indexOf("/w/boys") == 0 || md.pathName.indexOf("/t/boys")  == 0 ){
			return "boys";
		}
		if( md.pathName.indexOf("/l/girls") == 0  || md.pathName.indexOf("/w/girls") == 0 || md.pathName.indexOf("/t/girls")  == 0 ){
			return "girls";
		}

		/*
		if( getRegexTestResult( /^\/category\/men/g, md.pathName )) {
			return "men";
		}

		if( getRegexTestResult( /^\/category\/women/g, md.pathName )) {
			return "women";
		}

		if( getRegexTestResult( /^\/category\/boys/g, md.pathName )) {
			return "boys";
		}

		if( getRegexTestResult( /^\/category\/girls/g, md.pathName )) {
			return "girls";
		}
		*/
		return "";
	}

	function getSectionL2Data(){
		// TODO
		// /w/men/ap||fw||eq
		// /w/men/fw/lifestyle

		// fw/ap/eq/xc 를 삭제해야하고
		// tennis|golf|skateboarding-shoes|football|basketball|gym-training|running
		// hoodies-crews|jackets-vests|pants-tights|tops-tshirts|shorts|nike-pro-compression|bags|socks|accessories-equipment
		// |set|baselayer|sports-bras|skirts-dresses

		// 체크되는 이름과 전달 해야하는 이름이 달라 명칭 따로 정의 
		var l2 = "";
		var l2List = [
						{key:"sportswear", value:""},
						{key:"running", value:""},
						{key:"football", value:""},
						{key:"basketball", value:""},
						{key:"athletic-training", value:""},
						{key:"womens-training", value:""},
						{key:"jordan", value:""},
						{key:"golf", value:""},
						{key:"skateboarding", value:""},
						{key:"young-athlete", value:""},
						{key:"tennis", value:""},
						{key:"nikelab", value:""},
						{key:"snkrs", value:""},
						{key:"nba", value:""},
						{key:"acg", value:""},
						{key:"nsw", value:"sportswear"},
						{key:"at/", value:"athletic training"},
						{key:"men-training", value:"athletic training"},
						{key:"men/fw/gym-training", value:"athletic training"},
						{key:"l/men/gym-training", value:"athletic training"},
						{key:"wt/", value:"womens training"},
						{key:"women-training", value:"womens training"},
						{key:"women/fw/gym-training", value:"womens training"},
						{key:"l/women/gym-training", value:"womens training"},
						{key:"action-sports", value:"skateboarding"},
					];
				/*
					,"nikelab"
					,"jordan"
					,"nba"
					,"fan-gear"
					,"tennis"
					,"golf"
					,"skateboarding-shoes"
					,"football"
					,"basketball"
					,"gym-training"
					,"running"
					,"hoodies-crews"
					,"jackets-vests"
					,"pants-tights"
					,"tops-tshirts"
					,"shorts"
					,"nike-pro-compression"
					,"bags"
					,"socks"
					,"accessories-equipment"
					,"set"
					,"baselayer"
					,"sports-bras"
					,"skirts-dresses"
				*/

		/*
		var subCategory = md.pathName.split("/");
		if( subCategory.length >= 5 ){
			// 첫번째 / 때문에 length가 1이 더 잡히기 때문에 4로 리턴
			return subCategory[4];
		}
		*/

		$.each( l2List, function( index, data ){
			//console.log( data );
			if( md.pathName.indexOf( "/"+data.key ) > -1 ){
				l2 = (data.value == "") ? data.key : data.value;
				return false;
			}
		})
		return l2;
	}

	// 카테고리 정보
	function getCategoryData(){
		var data = {};
		data.page_type = "grid wall";

		if( md.categoryInfo != null ){
			var categoryInfo = md.categoryInfo;

			if( categoryInfo.hasHeaderContent == true ){
				data.page_type += ":PWH";
			}

			// todo
			// 필터 적용하는 부분에서 url에 lf 값이 있으면 제거해줘야 함
			// 검색 필터를 사용자가 선택해서 넘어온경우가 아닌 링크로 만들어놓은 url에 필터가 걸려있으면 facet을 처리하지 않는다.

			/*
			if( categoryInfo.facet != null ){
				if( String(categoryInfo.lf).toUpperCase() != "Y" ){
					// todo
					// 필터 정보 부분 아직 어떤식으로 줄지 정해지지 않았음
					//JSON.stringify(categoryInfo.facet);
					data.search_facet = "{" + categoryInfo.facet.replace(/=/gi, ":").replace(/&/gi, ",") + "}";
					// facet를 사용한 경우
					data.page_event = {
						endeca_filter_applied :true
					}
				}
			}
			*/
		}
		return data;
	}

	// 상품정보
	function getProductData(){
		var data = {};
		data.page_type = "goods";
		md = _GLOBAL.MARKETING_DATA();
		//customProductInfo = nike에서만 사용하는 정보들
		if( md.productInfo != null && md.customProductInfo != null ){

			var totalRastingAvg = md.productInfo.reviewInfo !== undefined ? md.productInfo.reviewInfo.totalRatingAvg : 0;
			var totalRatingCount = md.productInfo.reviewInfo !== undefined ? md.productInfo.reviewInfo.totalRatingCount : 0;

			data.products = [
				{
					product_id : md.productInfo.model,
					product_category : md.customProductInfo.productCategory, 	// 현재 BU값을 productCategory 값으로 셋팅되어있음 // products, prop1, eVar12, prop20
					product_name : md.productInfo.name, 			// products, prop1, eVar12, prop20
					product_unit_price : md.productInfo.retailPrice,

					// 세일 가격 정보 정의 필요함
					product_inventory_status : "in stock" , // 재고 상태
					avg_product_rating : Number(totalRastingAvg / 100 * 5).toFixed(1), // 평균 review 평점
					// 평균 review 평점 Number(md.productInfo.reviewInfo.totalRatingAvg / 100 * 5).toFixed(1)
					number_of_product_review : totalRatingCount, // review 갯수
					product_finding_method : "browse", // 상품 페이지 방문 경로
					//onsite search(검색으로 바로 이동), browse(일반 plp에서), internal promotion(내부 프로모션 링크), external camopaign( cp코드 있으면 ), referring nike site(?), cross-sell(다른상품에서)
				}
			];

			// price 에는 최종 가격이 들어가기 때문에 정상가인 retailPrice 보다 작으면 세일중
			if( md.productInfo.price < md.productInfo.retailPrice ){
				data.products[0].product_discount_price = md.productInfo.price;

				// TODO
				// 카테고리 URL 결정되면 처리
				if( queryString.cr != null ){
					data.products[0].price_status = "clearance";
				}else{
					data.products[0].price_status = "reduced";
				}
			}

			data.page_event = {
				product_view : true, // product detail views
			}

			if( queryString.fm != null ){
				// sr, bw, pm, ec, cs

				var findingMethod = "";
				switch( queryString.fm ){
					case "sr":
						// 검색을 통해서 접근시
						findingMethod = "onsite search";
					break;
					case "pm":
						// 랜딩 페이지 혹은 pwh 이미지 클릭해서 왔을시
						findingMethod = "internal promotion";
					break;
					case "ec":
						// 어도비 마케팅 채널, 구글 마케팅 채널에서 왔을시
						findingMethod = "External campaign";
					break;
					case "cs":
						// 추천상품을 통해서 들어왔을시
						findingMethod = "cross-sell";
					break;
				}
				data.products[0].product_finding_method = findingMethod;

				// TODO
				//추천상품 링크를 통해 PDP 페이지를 들어온 경우
				if( findingMethod == "cross-sell" ){
					data.page_event.cross_sell_click_through = true // 추천상품 링크를 통해 PDP 페이지를 들어온 경우

					// pm 값으로 model명 받고 있음
					// prodducturl?fm=cs&md=201204-123;
					//data.products[0].cross_sell_source = queryString.md; // 추천 링크를 통한 PDP 페이지 방문 경로                       evar14=pdp:AA1128-200
				}
			}

			// 품절된 상품의 가격
			if( md.productInfo.isSoldOut ){
				data.products[0].product_inventory_status = "out of stock";
				data.page_event.value_out_of_stock_item = md.productInfo.price;
			}

			// 출시예정상품
			if( md.productInfo.isUpcoming ){
				data.products[0].product_inventory_status = "upcoming";
			}
		}
		return data;
	}

	// 카트 정보
	function getCartData(){
		var data = {};
		data.page_type = "cart";

		data.page_event = {
			cart_view : true, // 장바구니 보기 (장바구니 페이지 열기)
		}
		return data;
	}

	// 주문서 정보
	function getCheckoutData(){
		var data = {};
		data.page_type = "order";

		return data;
	}

	// 주문완료 정보
	function getOrderConfirmationData(){
		var data = {};

		data.page_type = "order";

		/* 구매확정시 필요 속성 영역 */
		data.purchase_id = md.orderNumber; // 구매 (확정) 번호

		var paymentType = "";

		if( md.paymentList != null ){
			$.each( md.paymentList, function( index, data ){
				if( data.type == "GIFT_CARD" ){
					paymentType = getPaymentMethodByType(data.type) + ( md.paymentList.length > 1 ? ":" : "")  + paymentType;
				}
				paymentType = paymentType + getPaymentMethodByType(data.type);
			});

			if( md.paymentList.length ){

			}
		}
		data.payment_method = paymentType, // 결제 수단

		data.products = [];

		if( md.itemList != null ){
			data.products = makeProducts( md.itemList );
		}

		data.page_event = {
			purchase : true,  // 구매 확정
			shipping_amount : md.orderShippingTotalAmount, // (Number) 배송비
			discount_amount : 0
		}

		if( md.orderDiscount != null ){
			data.page_event.discount_amount = md.orderDiscount;
		}

		return data;
	}
	function getPaymentMethodByType( type ){
		switch( type ){
			case "GIFT_CARD" :
				return "giftcertificate";
			break;

			case "CREDIT_CARD" :
				return "credit card";
			break;

			case "WIRE":
				return "wire";
			break;

			case "BANK_ACCOUNT":
				return "bank transfer";
			break;

			case "MOBILE":
				return "cellphone pay";
			break;

			case "KAKAO_POINT":
				return "KAKAO";
			break;
		}
	}
	// 검색 정보
	function getSearchData(){
		var data = {};
		data.page_type = "search";
		var isResultFound = (md.searchInfo.totalCount > 0);

		data.onsite_search_phrase = md.searchInfo.keyword,
		data.onsite_search_result_page_type = ( isResultFound ? "onsite search results" : "no result found"),

		data.page_event = {}

		if( isResultFound ){
			data.page_event.onsite_search = true;
		}else{
			data.page_event.null_search = true;
		}
		return data;
	}

	// 가입 시작 정보
	function getRegisterStartData(){
		var data = {};
		data.page_event = {
			registration_start : true, // 사용자 등록 시작
		}
		return data;
	}

	// 가입 완료 정보
	function getRegisterComplateData(){
		var data = {};
		data.page_event = {
			registration_complete : true, // 사용자 등록 완료
			email_signup_success : md.receiveEmail || false, // 이메일 수신 동의를 사용자 등록시에 한 경우
			sms_signup_success : md.smsAgree || false, // SMS 수신 동의를 사용자 등록시에 한 경우
			//sms_signup_success : (md.smsAgree == 'on')?true:false || false
		}

		if( _GLOBAL.CUSTOMER.ID != null ){
			data.member_serial = _GLOBAL.CUSTOMER.ID;
		}
		return data;
	}

	function makeProducts( itemList ){
		var products = [];
		$.each( itemList, function( index, productData ){
			var product = {
				product_id : productData.model,
				//TODO
				// bu 정보를 가져 올수 없음, classfication 정보에 있으니 id로만 처리하자고 요청
				product_name : productData.name, 			// products, prop1, eVar12, prop20
				product_quantity : productData.quantity,
				product_unit_price : productData.retailPrice,
			}

			if( productData.price < productData.retailPrice ){
				product.product_discount_price = productData.price;
			}
			products.push( product );
		})
		return products;
	}

	function getRegexTestResult( patten, str ){
		return patten.test( str );
	}

	function callTrackEvent( data ){
		if( _.isFunction( window._trackEvent )){
			_trackEvent( $.extend( {},  dl, data ) );
		}

		//Adobe Data 확인용 Break Point
		debug( $.extend( {},  dl, data ) );
		//console.log("break point");
	}

	function trackEvent( data ){
		//Adobe Data 확인용 Break Point
		debug( data );
	}

	function addEvent(){
		var endPoint = Core.getComponents('component_endpoint');
		var data = {};
		endPoint.addEvent('clickEvent', function( param ){
			debug( "clickEvent" );

			data = {};
			data.link_name = "Click Links";
			data.click_name = param.name;

			// 슬리이더에서 배너 등록해서 사용시 처리
			if( param.area == "slider"){
				data.click_area = String(data.click_name).split("_")[0];
			}else{
				data.click_area = param.area;
			}
			data.page_event = {
				link_click : true
			}
			callTrackEvent( data );
		});


		// 장바구니 추가시
		endPoint.addEvent('addToCart', function( param ){
			data = {};
			data.link_name = "Add To Cart";
			data.cart_serial = param.cartId;
			//var price = (param.retailPrice.amount > param.price.amount ? param.price.amount : param.retailPrice.amount );
			data.page_event = {
				add_to_cart : true,
				value_added_to_cart : (( md.productInfo != null ? md.productInfo.price : 0 ) * param.quantityAdded),
				units_added_to_cart : param.quantityAdded,
			}
			callTrackEvent( data );
		})

		// 바로 구매
		endPoint.addEvent('buyNow', function( param ){
			data = {};
			data.link_name = "Checkout:Buy Now";
			//data.checkout_serial = md.cartId; // 상품에서  클릭시에는 정보가 없음
			data.checkout_type = _GLOBAL.CUSTOMER.ISSIGNIN ? "registered" : "guest";    //logged in,  not logged in

			data.products = [];
			if( md.productInfo != null){

				data.products = [
					{
						product_id : md.productInfo.model,
						product_name : md.productInfo.name, 			// products, prop1, eVar12, prop20
						product_unit_price : md.productInfo.retailPrice,
						product_quantity : param.quantityAdded
					}
				];

				if( md.productInfo.price < md.productInfo.retailPrice ){
					data.products[0].product_discount_price = md.productInfo.price;
				}
			}

			data.page_event = {
				checkout : true,
				value_at_checkout : (( md.productInfo != null ? md.productInfo.price : 0 ) * param.quantityAdded),
				units_at_checkout : param.quantityAdded
			}
			callTrackEvent( data );
		});


		// 위시리스트 추가시
		endPoint.addEvent('addToWishlist', function( param ){
			data = {};
			data.link_name = "Add To Mylocker";
			data.page_event = {
				add_to_my_locker : true,
				value_added_to_my_locker : 1,
				units_added_to_my_locker : 1//( md.productInfo != null ? md.productInfo.price : 0 ) // 위시 리스트에 옵션을 저장히지 않기 때문에 의미 없는 정보..  고정값으로 1
			}
			callTrackEvent( data );
		});

		// review 작성 성공시
		endPoint.addEvent('writeReview', function( param ){
			data = {};
			data.link_name = "Product Review Submitted";

			//TODO
			// 리뷰 작성이후 상품정보가 없다.
			data.product = [
				{
					product_id : param.model,
					product_name : param.name
				}
			]

			data.page_event = {
				product_review_submitted : true
			}
			callTrackEvent( data );
		});

		endPoint.addEvent( 'pdpImageClick', function(){
			data = {};
			data.link_name = "PDP Interactions";
			data.pdp_interactions = "image selected";

			data.page_event = {
				pdp_interaction : true
			}
			callTrackEvent( data );
		})

		//사이즈 가이드 클릭시
		endPoint.addEvent('pdpSizeGuideClick', function(){
			data = {};
			data.link_name = "PDP Interactions";
			data.pdp_interactions = "Size Guide Open";

			data.page_event = {
				pdp_interaction : true
			}
			callTrackEvent( data );
		})

		// 최종 결제 버튼 클릭시
		endPoint.addEvent('orderSubmit', function( param ){
			md = _GLOBAL.MARKETING_DATA();
			data = {};
			data.link_name = "Order Submit";
			data.payment_method = "";
			data.products = [];

			if( md.itemList != null ){
				data.products = makeProducts( md.itemList );
			}

			// 결제 수단 정보가 있을시
			if( param.paymentType != null ){
				data.payment_method = getPaymentMethodByType(param.paymentType);
			}

			if( md.checkoutInfo != null ){
				if( md.checkoutInfo.promoList != null ){
					data.checkout_promo_code = String($.map(md.checkoutInfo.promoList, function(item){ return ( item.auto == true ) ? item.name + ':auto applying' : item.name } ));
				}

				if( md.checkoutInfo.giftCardList != null ){
					data.payment_method = getPaymentMethodByType('GIFT_CARD') + ( param.paymentType != null ? ":" : "") + data.payment_method;
				}

				// 적립금 사용시
				/*
				if( md.checkoutInfo.customerCredit != null ){
					data.payment_method = getPaymentMethodByType('GIFT_CARD') + ( param.paymentType != null ? ":" : "") + data.payment_method;
				}
				*/
			}
			
			data.page_event = {
				order_submitted : true
			}
			callTrackEvent( data );
		})

		// 사용자가 결제 중 취소한 경우
		endPoint.addEvent('orderCancel', function( param ){
			data = {};
			data.link_name = "Order submit canceled";
			data.page_event = {
				order_canceled : true
			}
			callTrackEvent( data );
		});

		// 회원가입창 오픈
		endPoint.addEvent('openRegister', function(){
			data = {};
			data.page_event = {
				registration_start : true
			}
			callTrackEvent( data );
		})

		// 회원 가입 완료
		endPoint.addEvent('registerComplete', function( param ){
			//console.log( param );
			data = {};
			data.page_event = {
				registration_complete : true
			}

			if( param.isReceiveEmail == true ){
				data.page_event.email_signup_success = true;
			}

			if( param.isCheckedReceiveSms == true ){
				data.page_event.sms_signup_success = true;
			}
			callTrackEvent( data );
		})

		// 매장 검색시
		endPoint.addEvent('searchStore', function( param ){
			data = {};
			data.link_name = "Store Locator"
			data.page_event = {
				store_locator : true
			}
			callTrackEvent( data );
		});

		// 장바구니 상품 삭제시
		endPoint.addEvent('removeFromCart', function( param ){
		//console.log( param)
			data = {};
			data.link_name = "Remove from Cart";
			data.products = [
				{
					product_id : param.model,
					product_name : param.name
				}
			]
			data.page_event = {
				remove_from_cart : true
			}
			callTrackEvent( data );
		});

		// 장바구니에서 결제하기 클릭시
		endPoint.addEvent('checkoutSubmit', function( param ){
			md = _GLOBAL.MARKETING_DATA();

			data = {};
			data.link_name = "Checkout:Cart";
			//data.checkout_serial = md.cartId;
			data.checkout_type = _GLOBAL.CUSTOMER.ISSIGNIN ? "registered" : "guest";    //logged in,  not logged in

			if( md.promoList != null ){

				data.checkout_promo_code = String($.map(md.promoList, function(item){ return ( item.auto == true ) ? item.name + ':auto applying' : item.name } ));
			}

			data.products = [];

			if( md.itemList != null ){
				data.products = makeProducts( md.itemList );
				data.page_event = {
					checkout : true,
					value_at_checkout : md.cartTotalAmount,
					units_at_checkout : md.totalItemCount
				}
			}

			if( param && param.itemList != null ){
				data.products = makeProducts( param.itemList );	
				data.page_event = {
					checkout : true
				}

				var totalItemCount = 0;
				var totalAmount = 0;

				$.each( param.itemList, function( index, productData ){
					totalAmount += (( productData.price < productData.retailPrice ? productData.price : productData.retailPrice ) * productData.quantity );
					totalItemCount += productData.quantity;
				})
				data.page_event.value_at_checkout = totalAmount;
				data.page_event.units_at_checkout = totalItemCount;
			}
			
			callTrackEvent( data );
		});

		// sort 선택시
		endPoint.addEvent('changeSelect', function( param ){
			if( param.name == "sort"){
				data = {};
				data.link_name = "Product Sort Options";

				// TODO
				// 넘어오는 param.value 를 변경해야함
				// 현재 sort에 적용된 옵션 이상함
				// featured : 추천순  newest : 최신순  price low-high  : 낮은 가격순     price high-low  : 높은 가격순
				var option = "";
				switch( param.value ){
					case "default":
						option = "newest";
					break;
					case "price desc":
						option = "price high-low";
					break;
					case "price asc":
						option = "price low-high";
					break;
				}

				data.product_sort_options = option;
				data.page_event = {
					product_sort : true
				}
				callTrackEvent( data );
			}
		});

		// 필터 선택시
		endPoint.addEvent('applyFilter', function( param ){
			data = {};
			data.link_name = "Product Search Facet";
			data.product_facet_option = param.key + ":"+ param.value;
			data.page_event = {
				endeca_filter_applied : true
			}
			callTrackEvent( data );
		});

		// 회원탈퇴시
		endPoint.addEvent('delete_account', function( param ){
			callTrackEvent( param );
		});
		// 상품 옵션 선택시
		endPoint.addEvent('pdpOptionClick', function( param ){
			data = {};
			if( String( param.type ).toLowerCase().indexOf("size") > -1 ){
				data.link_name = "Size Run Selection";

				//240:n|245:n|250:y|255:y|260:y|265:y|270:y|275:y|280:n|285:n|290:n|295:n|300:n|305:n|310:n|320:n
				var productOption = {}//['values'];

				// 전체 상품의 옵션 중에서 사이즈옵션 정보 가져오기
				$.each( param['data-product-options'],  function( index, optionData ){
					if( optionData.type == 'SIZE'){
						$.each( optionData['allowedValues'], function( idx, item ){
							productOption[ item.id ] = item.friendlyName;
						})

						data.size_run_selection = productOption[ optionData['selectedValue'] ];
						return false;
					}
				})

				// 가져온 정보에서 품절 여부 체크
				var sizeAvailabilityList = [];
				$.each( param['data-sku-data'], function(index, skuData){

				// 상품쪽 수정후 적용해야함
				//$.each( param['skuData'], function(index, skuData){
					var size = productOption[skuData.SIZE];
					var isAva = (skuData.quantity > 0 ? 'y' : 'n');
					sizeAvailabilityList.push( size + ':' + isAva );
				})
				data.size_run_availability = String(sizeAvailabilityList).split(',').join('|');
				data.page_event = {
					size_run_select : true
				}
			}

			callTrackEvent( data );
		});

		// 상품 컬러 선택시
		endPoint.addEvent('pdpColorClick', function( param ){
			data = {};
			data.link_name = "PDP Interactions";
			data.pdp_interactions = "colorway changed";

			data.page_event = {
				pdp_interaction : true
			}
			callTrackEvent( data );
		});

		// 회원정보 수정
		endPoint.addEvent('updateProfile', function( param ){
			data = {};
			data.link_name = "Profile Update";
			data.profile_update_type = param;
			data.page_event = {
				profile_update : true
			}
			callTrackEvent( data );
		});


		// 로그인 성공
		endPoint.addEvent('loginSuccess', function( param ){
			data = {};
			data.page_event = {
				login : true
			}
			callTrackEvent( data );
		});

		// promo 적용시
		endPoint.addEvent('applyPromoCode', function( param ){
			/*
			if( param.promoAdded == true ){
				data = {};
				data.checkout_promo_code = param.promoCode;
				data.page_event = {
					checkout_promo_code : true
				}
				callTrackEvent( data );
			}
			*/

		});

		// cross 클릭시
		endPoint.addEvent('crossSaleClick', function( param ){
			data = {};
			data.link_name = "PDP Interactions";
			data.pdp_interactions = "crossell selected";

			data.page_event = {
				pdp_interaction : true
			}
			callTrackEvent( data );
		})



		// 픽업 사이즈.
		endPoint.addEvent('pickupsizeClick', function( param ){
			callTrackEvent( param );
		});

	}

	function debug( data, alert ){
		//console.log( data );
		if( alert == true ){
			alert( data );
		}
	}
	Core.aa = {
		// 함수를 구분짓는것이 큰 의미는 없지만 추후 형태의 변화가 있을것을 대비해서 구분
		init : function(){
			init();
			addEvent();
		}
	}

})(Core);

(function(Core){
	Core.register('module_authenticate', function(sandbox){

		var customerListVue, args, $this, isDirectAuth, authData, customText, customerInfo = {isAuth:false, isSms:false, customers:[], authPhoneNum:null}, isConfirmed = false, sucCallback=null, failCallback=null, isTimerCounter=false;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];
				if( isDirectAuth == true ){
					Method.setDirectAuthType();
				}else{
					Method.setDefaultType();
				}

				// 최종 확인 버튼
				$this.find('.btn-use-search-member').off('click').on('click',function(e){
					if(isConfirmed){
						isConfirmed = false;
						if( sucCallback != null ){
							e.preventDefault();
							Method.callSuccessCallback();
						}
					}else{
						e.preventDefault();
						UIkit.modal.alert('OTP인증을 진행해주세요.');
					}
				});

				$this.find('[data-authenticate-test-btn]').off('click').on('click',function(e){
					e.preventDefault();
					if( isDirectAuth == true ){
						customerInfo.isAuthSuccess=true;
						customerInfo.customers[0]['isOverTime'] = false;
						customerInfo.customers[0]['time'] = null;
						customerInfo.customers[0]['isRequest'] = false;
						customerInfo.isSms = false;
					}
					Method.confirmSuccess();
				});

				$('#popup-layer-order-custom').on({
					'hide.uk.modal': function(){
						if( isDirectAuth == true ){
							sandbox.setLoadingBarState(true);
							location.reload();
							/*
							if( _.isFunction(customerListVue.$destroy)){
								customerListVue.$destroy();
							}
							*/
						}else{
							customerInfo.isAuth = false;
							customerInfo.isSms = false;
							customerInfo.customers = [];
							customerInfo.autoPhoneNum = null;
							isConfirmed = false;
							isTimerCounter = false;
						}
					}
				});
			},
			// 검색 없이 바로 인증 진행시
			setDirectAuthType:function(){
				$this.find('#customText').html( customText );

				if( authData == null ){
					UIkit.modal.alert('인증 정보가 올바르지 않습니다. 관리자에게 문의 하세요.').on('hide.uk.modal', function(){
						Method.callFailCallback();
					});
					return false;
				}

				customerInfo = {
					isAuth:true, 
					isSms:false, 
					customers:[{
						time:null,
						isRequest:false,
						isOverTime:false,
					}], 
					isAuthSuccess:false,
					authPhoneNum:null
				}

				customerListVue = new Vue({
					el:'#opt-direct-auth',
					data:customerInfo,
					methods:{
						authSms:function(e){
							if( e ) e.preventDefault();
							var _self = this;
							var index = 0;
							customerInfo.isSms = true;
							sandbox.utils.promise({
								url:'/otp/request',
								method:'POST',
								data:authData
							}).then(function(data){
								//카운터 시작
								isTimerCounter = true;
								if( customerInfo.customers[index]['time'] == null ){
									_self.countdown(index);
								}
								customerInfo.customers[index]['isOverTime'] = false;
								customerInfo.customers[index]['isRequest'] = true;
								customerInfo.customers[index]['time'] = parseInt(args.limitMin) * 60;
							}).fail(function(msg){
								customerInfo.isSms = false;
								UIkit.modal.alert('고객정보를 찾을수 없습니다.').on('hide.uk.modal', function(){
									Method.callFailCallback();
								});
							});
						},
						authConfirm:function(e){
							e.preventDefault();
							//otp 인증 비동기 처리
							if(!isConfirmed){
								var _self = this;
								var index = e.target.getAttribute('data-index');
								var $form = $(e.target).closest('form');
								var data = sandbox.utils.getQueryParams($form.serialize());
								sandbox.utils.promise({
									url:'/otp/confirm',
									method:'POST',
									data:$.extend( data, authData )
								}).then(function(data){
									customerInfo.customers[index]['isOverTime'] = false;
									customerInfo.customers[index]['isRequest'] = false;
									_self.isAuthSuccess=true;
									Method.confirmSuccess();
								}).fail(function(data){
									UIkit.modal.alert(data.errors || '인증번호가 일치하지 않습니다. 다시 시도해 주세요.');
								});
							}else{
								UIkit.modal.alert('인증번호가 확인되었습니다.<br/>확인을 클릭하여 다음단계를 진행해주세요.');
							}
						},
						countdown:function(index){
							/*
							console.log( 'index : ', index )
							console.log( 'time : ', time )
							console.log( 'isConfirmed : ', isConfirmed )
							console.log( 'isTimerCounter : ', isTimerCounter )
							*/
							var _self = this;

							setTimeout(function(){
								if(!isTimerCounter) return;
								var count = Number(customerInfo.customers[index]['time'])-1;
								customerInfo.customers[index]['time'] = count
								if(count > 0 && !isConfirmed){
									_self.countdown(index);
								}else{
									if( isConfirmed ){
										customerInfo.isAuthSuccess=true;
										customerInfo.customers[index]['isOverTime'] = false;
									}else{
										customerInfo.customers[index]['isOverTime'] = true;
									}
									customerInfo.customers[index]['time'] = null;
									customerInfo.customers[index]['isRequest'] = false;
									customerInfo.isSms = false;
								}
							}, 1000);
						}
					},
					created: function () {
						console.log( 'created' );
						this.$nextTick( function(){
							Core.moduleEventInjection($this.html());
						})
						//this.authSms();
					}
				});
			},
			// 일반적인 검색 후 인증 사용시
			setDefaultType:function(){
				$this.find('[data-authenticate-btn]').click(function(e){
					e.preventDefault();
					//costomer 비동기 처리
					var $form = $(this).closest('form');
					var data = sandbox.utils.getQueryParams($form.serialize());
					customerInfo.authPhoneNum = data.identifier;
					sandbox.utils.ajax($form.attr('action'), 'POST', data, function(data){
						var customerData = sandbox.rtnJson(data.responseText);
						if(customerData.result){
							for(var i=0; i<customerData.customerList.length; i++){
								customerData['customerList'][i]['isSmsConfirm'] = false;
								customerData['customerList'][i]['time'] = null;
							}
						}
						customerInfo.isAuth = true;
						customerInfo.customers = (customerData.result) ? customerData.customerList : [];
					});
				});
				
				customerListVue = new Vue({
					el:'#custom-list',
					data:customerInfo,
					watch:{
						customers:function(){
							this.$nextTick(function(){
								UIkit.accordion('#accordion-wrap', {showfirst:false});
							});
						}
					},
					methods:{
						authSms:function(e){
							e.preventDefault();

							if(!isConfirmed && !customerInfo.isSms){
								var _self = this;
								var index = e.target.getAttribute('data-index');
								var type = e.target.getAttribute('data-type');
								var msg = "";

								if(type=='SMS'){
									msg = this.authPhoneNum + '로 OTP(인증번호)를 전송하시겠습니까?'
								}else{
									msg = e.target.getAttribute('data-email') + '로 OTP(인증번호)를 전송하시겠습니까?'
								}
								customerInfo.isSms = true;


								UIkit.modal.confirm(msg, function(){
									var $form = $(e.target).closest('form');
									var data = sandbox.utils.getQueryParams($form.serialize());
									data['userName'] = _self.customers[index]['username'];
									data['messageType'] = type;

									/*
									sandbox.utils.ajax($form.attr('action'), 'POST', $.extend( data, {messageType : 'EMAIL'}), function(data){
										console.log( data );
									});
									*/
									sandbox.utils.promise({
										url:$form.attr('action'),
										method:'POST',
										data:data
									}).then(function(data){
										//카운터 시작
										isTimerCounter = true;
										customerInfo.customers[index]['isSmsConfirm'] = true;
										customerInfo.customers[index]['time'] = parseInt(args.limitMin) * 60;
										_self.countdown(index, parseInt(args.limitMin) * 60);
									}).fail(function(msg){
										customerInfo.isSms = false;
										UIkit.modal.alert('고객정보를 찾을수 없습니다.').on('hide.uk.modal', function(){
											Method.callFailCallback();
										});
									});

								}, function(){
									customerInfo.isSms = false;
								}, {bgclose:false});
							}else{
								if(isConfirmed) UIkit.modal.alert('인증번호가 확인되었습니다.<br/>확인을 클릭하여 다음단계를 진행해주세요.');
							}
						},
						authConfirm:function(e){
							e.preventDefault();
							//otp 인증 비동기 처리
							if(!isConfirmed){
								var _self = this;
								var index = e.target.getAttribute('data-index');
								var $form = $(e.target).closest('form');
								var data = sandbox.utils.getQueryParams($form.serialize());
								data['userName'] = _self.customers[index]['username'];

								sandbox.utils.promise({
									url:$form.attr('action'),
									method:'POST',
									data:data
								}).then(function(data){
									customerInfo.customers[index]['isSmsConfirm'] = false;
									Method.confirmSuccess();
								}).fail(function(data){
									UIkit.modal.alert(data.errors || '인증번호가 일치하지 않습니다. 다시 시도해 주세요.');
								});
							}else{
								UIkit.modal.alert('인증번호가 확인되었습니다.<br/>확인을 클릭하여 다음단계를 진행해주세요.');
							}
						},
						countdown:function(index, time){
							var count = time;
							var _self = this;

							setTimeout(function(){
								if(!isTimerCounter) return;
								customerInfo.customers[index]['time'] = --count;
								if(count > 0 && !isConfirmed){
									_self.countdown(index, count);
								}else{
									customerInfo.customers[index]['time'] = null;
									customerInfo.customers[index]['isSmsConfirm'] = false;
									customerInfo.isSms = false;
								}
							}, 1000);
						}
					}
				});

				var tabComponent = sandbox.getComponents('component_tabs', {context:$this}, function(){
					this.addEvent('tabClick', function(index){
						$this.find('.authenticate-type').eq(index).addClass('active').siblings().removeClass('active');
					});
				});

				
			}, 
			callSuccessCallback:function(){
				if( sucCallback != null ){
					sucCallback.call();
				}
			},
			callFailCallback:function(){
				if( failCallback != null ){
					failCallback.call();
				}
			},
			confirmSuccess:function(){
				if( isDirectAuth ){

				}else{
					UIkit.modal.alert('인증번호가 확인되었습니다.<br/>확인을 클릭하여 다음단계를 진행해주세요.');	
				}
				isConfirmed = true;
				$this.find('.btn-use-search-member.disabled').removeClass('disabled');
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-authenticate]',
					attrName:'data-module-authenticate',
					moduleName:'module_authenticate',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			customText:function( text ){
				customText = text;
				return this;
			},
			isDirectAuth:function(isDirect){
				isDirectAuth = isDirect || false;
				return this;
			},
			reset:function(otp){
				isDirectAuth = otp.isDirectAuth || false;
				customText = otp.customText || '';
				authData = otp.authData || null;
				this.init();
			},
			success:function( callback ){
				if( _.isFunction(callback)){
					sucCallback = callback;
				}
				return this;
			},
			fail:function( callback ){
				if( _.isFunction(callback)){
					failCallback = callback;
				}
				return this;
			}
		}
	});

	Vue.component('countdown', {
		props:['time'],
		template:'<span class="timer" v-if="time !== null">{{rtnTimer(Math.floor(time / 60 % 60))}}:{{rtnTimer(Math.floor(time % 60))}}</span>',
		methods:{
			rtnTimer:function(time){
				var numToString = time.toString();
				return (numToString.length > 1) ? numToString : '0' + numToString;
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_latest', function(sandbox){
		var $this, args, productId, arrLatestItems;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];
				productId = args.productId || null;

				//최근본상품 cookie
				var latestItemsMaxLength = args.latestItemsMaxLength;
				var latestItems = $.cookie('latestItems');

				if( productId != null){
					var pattern = new RegExp(productId, 'g');
					if(latestItems){
						arrLatestItems = latestItems.replace(pattern, '').match(/[0-9]+/g) || [];
						arrLatestItems.unshift(productId);

						if(arrLatestItems.length >= latestItemsMaxLength){
							arrLatestItems = arrLatestItems.slice(0, -1);
						}
						$.cookie('latestItems', arrLatestItems.join(','), {path:'/'});
					}else if(!latestItems){
						$.cookie('latestItems', productId, {path:'/'});
						$this.remove();
					}
				}

				addLatestItem(latestItems);
			}
		}

		var addLatestItem = function(items){
			var obj = {
				'id':items || 0, // 무조건 dom을 가져오기 위해서 가지고 있는 productid가 없어도 0을 넘겨 비어있음 나오게 한다.
				'mode':'template',
				'templatePath':'/modules/latest',
				'resultVar':'productList',
				'minSlides':args.minSlides || 2,
				'maxSlides':args.maxSlides || 4,
				'slideMargin':args.slideMargin || 0
			}

			sandbox.utils.ajax(sandbox.utils.contextPath + '/processor/execute/product', 'GET', obj, function(data){
				$this.append(data.responseText);
				sandbox.moduleEventInjection(data.responseText);
			}, false, true);
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-latest]',
					attrName:'data-module-latest',
					moduleName:'module_latest',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				console.log('latest destory');
			}
		}
	});
})(Core);

(function(Core){
	'use strict';
	Core.register('module_account_writelist', function(sandbox){
		var $this, modal, args;
		var Method = {
			moduleInit:function(){
				//main이고 리뷰쓸 상품이 있을경우
				var mainReviewOpenIS = false;
				var currentStarCount = null;

				args = arguments[0];
				$this = $(this);
				modal = UIkit.modal('#common-modal-large');
				modal.on({
					'show.uk.modal':function(){
						//console.log("Modal is visible.");
					},

					'hide.uk.modal':function(){
						$this.find('.contents').empty();
						$(currentStarCount).removeClass('active').siblings().removeClass('active');
					}
				});

				$this.on('click', '.btn-delete', function(e){
					e.preventDefault();

					if(mainReviewOpenIS){
						$this.find('.review-summary-group').fadeOut();
						$this.find('.review-write-wrap').stop().animate({width:375, height:190}, 300, function(){
							mainReviewOpenIS = false;
							$this.find('.review-main-msg').fadeIn();
							$('html').removeClass('uk-modal-page');
						});
					}else{
						$(args.target).remove();
					}
				});
				$this.on('click', '.review-open', function(e){
					e.preventDefault();

					$this.find('.review-main-msg').fadeOut();
					$this.find('.review-write-wrap').stop().animate({width:400, height:500}, 300, function(){
						mainReviewOpenIS = true;
						$this.find('.review-summary-group').fadeIn();
						$('html').addClass('uk-modal-page');
					});
				});

				//account reviewWrite rating-star count
				$this.find('.rating-star').each(function(i){
					var $this = $(this);
					$this.find('a').click(function(e) {
						e.preventDefault();

						var index = $(this).index() + 1;
						var target = $(this).parent().attr('data-target');
						var productId = $(this).parent().attr('data-productid');
						var orderItemId = $(this).parent().attr('data-orderitemid')

						$(this).parent().children('a').removeClass('active');
						$(this).addClass('active').prevAll('a').addClass('active');

						currentStarCount = this;
						Method.reviewTask(target, productId, orderItemId, index);
					});
				});
			},
			reviewTask:function(target, productId, orderItemId, startCount){
				var defer = $.Deferred();

				sandbox.utils.promise({
					url:sandbox.utils.contextPath + '/review/reviewWriteCheck',
					type:'GET',
					data:{'productId':productId, 'orderItemId':orderItemId}
				}).then(function(data){
					//data.expect 기대평
					//data.review 구매평
					if(data.expect || data.review){
						return sandbox.utils.promise({
							url:sandbox.utils.contextPath + '/review/write',
							type:'GET',
							data:{'productId':productId, 'redirectUrl':location.pathname, 'startCount':startCount, 'isPurchased':data.review, 'orderItemId':orderItemId}
						});
					}else{
						$.Deferred().reject('리뷰를 작성할 수 없습니다.');
					}

				}).then(function(data){
					modal.show();

					$(target).addClass('review-write');
					$(target).find('.contents').empty().append(data);
					sandbox.moduleEventInjection(data, defer);

					return defer.promise();
				}).then(function(data){
					Method.reviewProcessorController();
					modal.hide();
				}).fail(function(msg){
					//console.log('write fail');
					defer = null;
					UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
				});
			},
			reviewProcessorController:function(){
				var arrData = [];
				var obj = {
					'mode':'template',
					'templatePath':'/modules/myReviewWriteList',
					'resultVar':'review',
					'reviewType':'writeList',
					'_sort':'id',
					'_type_sort':'desc',
					'reviewLocation':'account'
				}

				sandbox.utils.ajax(args.api, 'GET', obj, function(data){
					$(args.target).empty().append(data.responseText);
					sandbox.moduleEventInjection(data.responseText);
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-account-writelist]',
					attrName:'data-module-account-writelist',
					moduleName:'module_account_writelist',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){

	Core.register('module_order', function(sandbox){
		var $this = null,
			$allCheck = null, 					// 팝업 전체 선택 체크박스
			$itemList = null, 					// 선택 해서 popup에 노출되는 아이템 리스트
			$itemListObj = null, 				// addon 이 제거된 아이템들
			$popModal = null, 					// 취소 팝업
			cancelOrderId = null, 				// 취소할 주문 id
			$popSubmitBtn = null, 				// 취소 submit 버튼
			$previewContainer = null, 			// 사용안함
			isAllFg = null, 					// 취소 선택시 모든 fulfilment가 취소 가능했는지 여부
			isAblePartialVoid = null, 			// 부분 취소 가능여부
			beforeSelectedOrder = null, 		// 사용안함
			$refundAccountInfo = null, 			//환불정보 입력 폼
			oldOrderUrl = null, 				//이전 사이트 주문 정보 URL
			args = null,
			objStore = {store:[]};

		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var args = arguments[0] || {};

				//modal init
				var modal = UIkit.modal('#common-modal', {center:true});
				// 오늘 날짜 location 대입
		        var today = new Date(),
		            yyyy = today.getFullYear(),
		            mm = today.getMonth() + 1,
		            dd = today.getDate();

		        if (dd < 10) dd = '0' + dd
		        else if (mm < 10) mm = '0' + mm
		        today = yyyy + mm + dd;

				//주문취소 시작
				//상점정보 가져오기
				var orderHistoryContainer = new Vue({
					el:'[data-vue-orderhistory]',
					data:objStore,
					created:function(){
						objStore['store'] = 1;
						sandbox.utils.promise({
							url:sandbox.utils.contextPath +'/processor/execute/store',
							method:'GET',
							data:{
								'mode':'template',
								'templatePath':'/page/partials/storeList',
								'use-paging':false,
							},
							isLoadingBar:false
						}).then(function(data){
							objStore['store'] = sandbox.utils.strToJson(data.replace(/&quot;/g, '"'));
						}).fail(function(data){
							UIkit.notify(data, {timeout:3000,pos:'top-center',status:'danger'});
						});
					},
					components:{
						'location':{
							props:['store']
						},
						'order-cencel-button':{
							props:['orderId', 'isJustReservation'],
							template:'<button class="btn-link width-fix cancel-order" v-on:click="orderCencel">{{rtnLabel}}</button>',
							computed:{
								rtnLabel:function(){
									return (this.isJustReservation) ? '예약취소' : '주문취소';
								}
							},
							methods:{
								orderCencel:function(e){
									e.preventDefault();
									var orderId = this.orderId;

									sandbox.utils.promise({
										url:sandbox.utils.contextPath + '/account/order/cancel/' + orderId,
										method:'GET'
									}).then(function(data){
										var defer = $.Deferred();
										$('#common-modal').find('.contents').empty().append(data);
										sandbox.moduleEventInjection(data, defer);
										modal.show();
										return defer.promise();
									}).then(function(data){
										UIkit.modal.alert("취소 되었습니다.").on('hide.uk.modal', function() {
											window.location.reload();
										});
									}).fail(function(error){
										if(error){
											UIkit.modal.alert(error).on('hide.uk.modal', function() {
												window.location.reload();
											});
										}else{
											window.location.reload();
										}
									});
								}
							}
						}
					},
					methods:{
						findLocation:function(locationId){
							try{
								for(var i=0; i<this.store.length; i++){
									if(this.store[i]['id'] == locationId){
										return this.store[i]['name'];
									}
								}
							}catch(e){
								console.log(e);
							}
						},
						shipType:function(locationId){
							try{
								var rtnState = '온라인 물류센터';
								for(var i=0; i<this.store.length; i++){
									if(this.store[i]['id'] == locationId){
										rtnState = this.store[i]['isDefault'] ? '온라인 물류센터':'매장';
										break;
									}
								}
								return rtnState;
							}catch(e){
								console.log(e);
							}
						}
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-order]',
					attrName:'data-module-order',
					moduleName:'module_order',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_checkout_address_review', function(sandbox){
		var $this, args;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];

				sandbox.utils.ajax(sandbox.utils.contextPath + '/checkout/orderRegeneration', 'GET', {}, function(data){
					var data = sandbox.rtnJson(data.responseText);
					if(!data['result']){
						UIkit.modal.alert(data['errorMsg']).on('hide.uk.modal', function() {
							location.href = sandbox.utils.contextPath + '/cart';
						});
					}
				}, false, true);
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-checkout-address-review]',
					attrName:'data-module-checkout-address-review',
					moduleName:'module_checkout_address_review',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				console.log('module_checkuot_address_review destory');
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_pickup_product', function(sandbox){
		var $this, $deferred;
		var setStoreListTemplate = function(data, qty){

			$this.find('.store-list').empty().append(
				Handlebars.compile($("#store-list").html())({
					result:(data.length>0)?true:false,
					list:data,
					locationQuantity:qty
				})
			);
		}
		var Method = {
			moduleInit:function(){
				$this = $(this);
				//해당 skuPricing에서 넘어온 locationQuantity 값을 가지고 스토어 리스트를 불러온다.
				//var arrStoreList=[{151:1},{151:4},{151:26},{151:3},{151:65}];
				var itemRequest = sandbox.getModule('module_product').getItemRequest();
				var locationQuantity = sandbox.getModule('module_product').getSkuData().locationQuantity;
				var arrStoreList = [];
				var currentDate = new Date();
				var disabledDays = [];
				var defer = $.Deferred();

				for(var key in locationQuantity){
					arrStoreList.push(key);
				}

				sandbox.utils.promise({
					url:sandbox.utils.contextPath + '/processor/execute/store',
					type:'GET',
					data:{
						'mode':'template',
						'templatePath':'/page/partials/storeList',
						'storeId':arrStoreList.join(','),
						'resultVar':'stores',
						'cache':new Date().getTime()
					}
				}).then(function(data){
					var data = sandbox.utils.strToJson(data.replace(/&quot;/g, '"'));
					data.forEach(function(a,b,c){
						a['quantity'] = locationQuantity[a.id]
					});

					var mapComponent = sandbox.getComponents('component_map', {context:$this, storeList:data});
					var searchComponent = sandbox.getComponents('component_searchfield', {context:$this}, function(){
						this.addEvent('searchKeyword', function(e, keyword){
							var pattern = keyword + '[a-z0-9A-Z가-힣]*';
							var regex = new RegExp(pattern);
							var result = [];

							for(var i=0; i<data.length; i++){
								if(regex.test(data[i].address1) || regex.test(data[i].address2) || regex.test(data[i].city)|| regex.test(data[i].name)|| regex.test(data[i].state)){
									result.push(data[i]);
								}
							}

							setStoreListTemplate(result);
							mapComponent.reInit(result);
						});
					});

					setStoreListTemplate(data);
					$(document).off().on('click', '.location-btn', function(e){
						e.preventDefault();
						mapComponent.mapEvent($(this).closest('.shipping-list').index());
					});
					$this.off().on('click', '.reservation-apply', function(e){
						e.preventDefault();

						var index = $(this).closest('.shipping-list').index();
						itemRequest['fulfillmentLocationId'] = data[index].id;
						disabledDays = data[index].holidayClosedDates;

						$this.find('.datepicker').datepicker('refresh');
						$this.find('.datepicker-wrap').addClass('active');
						$this.find('.dim').addClass('active');
					});
				}).fail(function(msg){
					defer = null;
					UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
				});

				$this.find('.confirm-btn').addClass('disabled').off().on('click', function(e){
					e.preventDefault();
					if(!$(this).hasClass('disabled')){
						$deferred.resolve(itemRequest);
					}
				});

				$this.find('.cancel-btn').off().on('click', function(e){
					e.preventDefault();
					$deferred.reject();
				});

				//datapicker
				$this.find('.datepicker').datepicker({
					dateFormat: "yy-mm-dd",
					minDate:new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
					maxDate:'+20D',
					onSelect:function(date){
						itemRequest['reservedDate'] = date;
						$this.find('.timepicker').focus();

					},
					beforeShowDay:function(date){
						var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
						return [ disabledDays.indexOf(string) == -1 ];
					}
				});

				//timepicker
				$this.find('.timepicker').focusout(function(e){
					var _self = $(this);
					setTimeout(function(){
						var time = _self.val();
						itemRequest['reservedDate'] += ' ' + time + ':00';
						$this.find('.datepicker-wrap').removeClass('active');
						$this.find('.dim').removeClass('active');
						$this.find('.confirm-btn').removeClass('disabled');
					},200);
				});

				//dim click addEvent
				$this.find('.dim').off().on('click', function(e){
					$(this).removeClass('active').parent().removeClass('active');
				});

			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-pickup-product]',
					attrName:'data-module-pickup-product',
					moduleName:'module_pickup_product',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			setDeferred:function(defer){
				$deferred = defer;
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_certification', function(sandbox){
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var args = arguments[0];
				//console.log('this:' , $(this));
				//console.log('args:' , arguments);
				var certificationYnModal = UIkit.modal('#certification-yn-modal', {center:true, bgclose:false, keyboard:false});
				certificationYnModal.show();

				//이전페이지로 이동
				$this.find('#btn-go-back').on('click', function(){
					window.history.back();
					return false;
				});

				//인증화면으로 이동
				$this.find('#btn-go-certification').on('click', function(){
					//console.log('go certification');
					/*
					$('#certification_frame').attr('src', sandbox.utils.contextPath + '/personalAuthentication/form');

					UIkit.modal("#certification-modal", {center:true, bgclose:false, keyboard:false} ).show();
					//certificationYnModal.hide();

					//Method.sendSiren24('hideCertificationLayer', '', 'certifymeorder');

					$('#btn-show-certification-yn-modal').off('click').on('click', function(){
						$('#certification_frame').contents().find("body").html('');
						certificationYnModal.show();
					})

*/
					window.open(sandbox.utils.contextPath +"/personalAuthentication/form","crPop","width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200");
				});

			},
			/**
			 * 서신평 인증
			 * @param successCallback : 성공콜백
			 * @param errorCallback : 에러콜백
			 * @param storeNo : 스토어번호
			 * sendSiren24(hideCertificationLayer, null, "certifymeorder");
			 * sendSiren24(aa1, aa2, "certifymemember");
			 */
			// sendSiren24:function(successCallback, errorCallback, certifymeMethod){
			// 	$("#retUrlSiren24").val( $("#retUrlSiren24").val() + "?serviceCode="+certifymeMethod+"&successCallback="+successCallback+"&errorCallback="+errorCallback);
			// 	$("#formGetServiceCode").attr("action","https://secure.nike.co.kr/member/getIpinReqInfoAjax.lecs?serviceCode="+certifymeMethod);
			// 	IframeSubmitter.submit($("#formGetServiceCode")[0], "setServiceCodeSiren24", $("#frameCert").attr("name"));
			// },
			//휴대폰 인증 siren 팝업 호출
			setServiceCodeSiren24:function(result){
				if (result.success) {
					$("#reqInfoSiren24").val(result.reqInfo);
					openPopupSiren24();
				} else {
					alert(result.message);
					return;
				}
			},
			//휴대폰 인증 siren 팝업
			openPopupSiren24:function(){
				var CBA_window_Siren24;
				CBA_window_Siren24 = window.open("", "IPINWindowSiren24", "width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200");
				if(CBA_window_Siren24 == null){
					alert(" ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.");
				}
				$("#formCertificationSiren24").attr("target", "IPINWindowSiren24");
				document.getElementById("formCertificationSiren24").submit();
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-certification]',
					attrName:'data-module-certification',
					moduleName:'module_certification',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_refund_account', function(sandbox){
		var serialize = function($form){
			//jquery에 있는 serialize가 한글을 escape 치리가 되어 처리 안되게 따로 만듬;
			var inputs = $form.find('input[type=hidden]');
			var queryParams = {};
			for(var i=0; i<inputs.length; i++){
				queryParams[inputs.eq(i).attr('name')] = inputs.eq(i).val();
			}
			return queryParams;
		}
		var Method = {
			$that:null,
			$popModal:null,
			$popSubmitBtn:null,
			$refundAccountInfo:null,
			moduleInit:function(){
				var $this = $(this);
				Method.$that = $this;
				Method.$popModal = UIkit.modal("#popup-refund-account");
				Method.$popSubmitBtn = Method.$popModal.find('[data-refund-account-submit]');
				Method.$refundAccountInfo = Method.$popModal.find('[data-refund-account-info]');

				// 환불 신청 팝업 open
				$this.find('[data-refund-account-btn]').on('click', function(e){
					e.preventDefault();
					Method.openRefundAccountPopup( $(this).closest('form') );
				});

				// 환불 신청 submit
				Method.$popSubmitBtn.on('click', Method.refundAccountSumit );
			},
			openRefundAccountPopup:function($form){
				/*var id = $form.closest('[data-order]').find('[name="id"]').val();
				var amount = $form.closest('[data-order]').find('[name="amount"]').val();*/
				var formData = serialize($form);

				if(formData.hasOwnProperty('account')){
					for(var key in formData){
						if(key === 'amount'){
							Method.$popModal.dialog.find('[data-total-amount]').find('.price').text(sandbox.utils.price(formData[key]));
						}else if(key === 'accountCode'){
							Method.$popModal.dialog.find('select[name="accountCode"]').val(formData[key]);
						}else{
							Method.$popModal.dialog.find('input[name="'+ key +'"]').val(formData[key]);
						}
					}

					sandbox.getComponents('component_textfield', {context:Method.$that}, function(i){
						//초기값에 따라 인풋라벨 초기화
						this.setValueLabel();
					});

					sandbox.getComponents('component_select', {context:Method.$that}, function(i){
						//초기값에 따라 셀랙트박스 리페인팅
						this.rePaintingSelect();
					});

					Method.$popModal.dialog.find('[data-refund-account-submit]').text('수정');
				}

				sandbox.moduleEventInjection(Method.$popModal.dialog.html());
				Method.$popModal.show();

				// 숨겨있는 내용은 init에 처리 되지 않아 show이후
				sandbox.validation.reset( Method.$refundAccountInfo.find('form'));
			},
			refundAccountSumit:function(e){
				e.preventDefault();
				var $refundAccountInfoForm = Method.$refundAccountInfo.find('form');
				sandbox.validation.validate( $refundAccountInfoForm );

				if( !sandbox.validation.isValid( $refundAccountInfoForm )){
					return;
				}

				//전체 form을 체크하여 체크된 아이템 처리
				UIkit.modal.confirm("환불을 요청 하시겠습니까?", function(){
					var accountName = $refundAccountInfoForm.find('[name="accountCode"] option:selected').text();
					$refundAccountInfoForm.find('[name="accountName"]').val(accountName);

					var url = $refundAccountInfoForm.attr('action');
					var method = $refundAccountInfoForm.attr('method');

					Core.Utils.ajax(url, method, $refundAccountInfoForm.serialize(), function(data){
					//Core.Utils.ajax(url + Method.cancelOrderId, "GET", "", function(data){
						var data = sandbox.rtnJson(data.responseText, true);
						var result = data['result'];
						if( result == true ){
							UIkit.modal.alert("환불 요청 되었습니다.").on('hide.uk.modal', function() {
								window.location.reload();
							});
						}else{
							UIkit.modal.alert(data['errorMsg']).on('hide.uk.modal', function() {
								window.location.reload();
							});
						}
					}, true);
				}, function(){},
				{
					labels: {'Ok': '확인', 'Cancel': '취소'}
				});

			}
		}
		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-refund-account]',
					attrName:'data-module-refund-account',
					moduleName:'module_refund_account',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	var allSkuDataItem;
	Core.register('module_launchcategory', function(sandbox){
		var $that, category;
		// var arrViewLineClass=['uk-width-medium-1-3', 'uk-width-large-1-2', 'uk-width-large-1-3', 'uk-width-large-1-4', 'uk-width-large-1-5'];
		
		
		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var $cate = $(".launch-category");
				var $item = $(".launch-list-item.upcomingItem");
				var $cate_header = $(".launch-lnb");

        if(arguments[0] && undefined != arguments[0].category){
					category = arguments[0].category;
				}

				//upcoming일때는 헤더 우측 뷰 변경 아이콘 숨기기
				if(category === 'upcoming'){
					$this.find('.toggle-box').hide();
				}
				// console.log('category:', category);
				

				var Listform = {
				    grid : function(setCookie){
								$(".item-list-wrap", $cate).removeClass("gallery").addClass("grid");
				        //$(".launch-list-item", $cate).removeClass("gallery").addClass("grid");
						$(".toggle-box span", $cate_header).removeClass("ns-grid").addClass("ns-feed");
						if(setCookie){$.cookie("launch_view_mode", "grid" , {path : "/"});}
				        
				    },
				    gallery : function(setCookie){
								$(".item-list-wrap", $cate).removeClass("grid").addClass("gallery");
				        //$(".launch-list-item", $cate).removeClass("grid").addClass("gallery");
				        $(".toggle-box span", $cate_header).removeClass("ns-feed").addClass("ns-grid");
				        if(setCookie){$.cookie("launch_view_mode", "gallery" , {path : "/"});}
					}
				};
				
				//날짜 순으로 상품 정렬
				var productListOrderedByDate = $cate.find('.launch-list-item').slice().sort(function(el1, el2){
					// var date1 = new Date($(el1).data('active-date')).getTime();
					// var date2 = new Date($(el2).data('active-date')).getTime();
					var date1 = Method.DateParse($(el1).data('active-date'));
					var date2 = Method.DateParse($(el2).data('active-date'));
					
					// date1 : Sat Aug 25 2018 20:05:00 GMT+0900 (한국 표준시)
					// date2 : Thu Feb 22 2018 10:00:02 GMT+0900 (한국 표준시)

					//descending
					//return -(date1 > date2) || +(date1 < date2) || (isNaN(date1)) - (isNaN(date2));
					//ascending
					return +(date1 > date2) || -(date1 < date2) || (isNaN(date1)) - (isNaN(date2));
				});

                //up-coming의 경우 날짜 순으로 정렬필요
				if(category ==="upcoming"){
					
					$cate.find('.uk-grid').empty().append(productListOrderedByDate);

					// $cate.find('.uk-grid').promise()
					// .done(function () {
					// 	$cate.find('.uk-grid').empty().append(productListOrderedByDate);
					// }).done(function () {
					// 	sandbox.getComponents('component_launchitem', {context:$(document)}, function () {
					// 		this.addEvent('notifyLoadComplete', function (notifyBtn) {
					// 			notify = notifyBtn();
					// 		});
					// 	});
					// });

					// Launch 리스트 NOTIFY ME 버튼 노출
					$item.find('.item-notify-me').on('click', function (e) {
					// $('.uk-grid').on('click', '.item-notify-me', function (e) {
						var url = $(this).attr('url');

						Core.Utils.ajax(url, 'GET', {}, function (data) {
							$("#restock-notification").remove();
							
							var notifyPop = $(data.responseText).find('#restock-notification');
							$('body').append(notifyPop)
							
							Core.moduleEventInjection(data.responseText);

							var obj = {
								'productId': $item.find('[name="productId"]').val()
							}

							Core.Utils.ajax(Core.Utils.contextPath + '/productSkuInventory', 'GET', obj, function(data){
								var responseData = data.responseText;
								allSkuDataItem = Core.Utils.strToJson(responseData).skuPricing;
								// console.log(allSkuDataItem)
								// console.log(Method)
								// _self.fireEvent('skuLoadComplete', _self, [allSkuData, 'COMINGSOON']);
							}, false, true);
													
							var modal = UIkit.modal("#restock-notification");
							if (modal.isActive()) {
								modal.hide();
							} else {
								modal.show();
							}
						});

					});

					if (!Core.Utils.mobileChk) {
						$item.find('.btn-box-notify')
							.mouseenter(function() {
								$item.find('.info-sect').addClass('opacity');
							})
							.mouseleave(function() {
								$item.find('.info-sect').removeClass('opacity');
							});
					}

					
					(function(list){
						 var xYear = "", xMonth = "", xDay = "";
						 list.each(function(){
							 var 
								 $this = $(this),
								 date = $this.attr("data-active-date").split(" ")[0],
								 arrDate = date.split("-"),
								 year = arrDate[0],
								 month = arrDate[1],
								 day = arrDate[2];
								 
								 //월이나 일이 바뀌면
								 if ( xMonth !== month || xDay !== day ){
									$this.before("<em class='upcoming-tit-date'>" + month + "월 " + day + "일</em>")
								 }
								 
								 //update state
								 xYear = year;
								 xMonth = month;
								 xDay = day;
 
						});
					
					})($cate.find('.launch-list-item'));
				}

				if( $.cookie("launch_view_mode") && category !== "upcoming" ){
					( $.cookie("launch_view_mode") === "gallery" ) ? Listform.gallery(true) : Listform.grid(true);
				} 
				//쿠키가 없는 경우(우측 뷰 변경 아이콘을 누르지 않은 경우)
				//feed는 기본이 gallery, in-stock는 기본이 grid, updoming은 gallery만 있음.
				else if(!$.cookie("launch_view_mode")){
                    if(category ==="in-stock"){
						Listform.grid(false);
					} else {
						Listform.gallery(false)
					}
				}
				else {
					( category === "in-stock" ) && Listform.grid(true);
				}				

				$cate.css("opacity", "1");

                //마우스 클릭시 탭 하단 선택 표시
				$('.launch-menu').on('click', 'li', function(){
					$('.launch-menu li.on').removeClass('on');
					$(this).addClass('on');
				});
                //우측 뷰 변경 아이콘 
				$this.find('.toggle-box a').on('click', function(e){
				    
				    if( category === "feed" || category === "in-stock" ){
				        if( $(".item-list-wrap", $cate).eq(0).hasClass("gallery") ){
				            Listform.grid(true);
				        }
				        else {
				            Listform.gallery(true);
				        }
				    }
				    else {
				    }
				    
					e.preventDefault();
					
				});
				//카테고리에서 상픔 클릭시 상단 탭 선택표시 off 및 우측 아이콘 숨김
				$('.launch-category .uk-grid div a').on('click', function(){
					$('.launch-menu li.on').removeClass('on');
				});
			},
			DateParse:function(dateStr){
				var a=dateStr.split(" ");
				var d=a[0].split("-");
				var t=a[1].split(":");
				return new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-launchcategory]',
					attrName:'data-module-launchcategory',
					moduleName:'module_launchcategory',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			getTotalSkuData:function () {
				return allSkuDataItem; // BK
			},
			getTotalSkuNotify:function () {
				return 'COMINGSOON'; // BK
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_giftcard', function(sandbox){
		var Method = {
			moduleInit:function(){
				
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-giftcard]',
					attrName:'data-module-giftcard',
					moduleName:'module_giftcard',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_launchproduct', function(sandbox){
		var $that;
		// var arrViewLineClass=['uk-width-medium-1-3', 'uk-width-large-1-2', 'uk-width-large-1-3', 'uk-width-large-1-4', 'uk-width-large-1-5'];

		var Method = {
			moduleInit:function(){
				$this = $(this);
				var args = {};
				args.skudata = $(this).find("[data-sku]").data("sku");
				$(this).find("[data-sku]").remove();

                //상품정보 스크롤 이동
                var _conH = $('.lc-prd-conts .product-info').height();
                var _conBox = $('.lc-prd-conts .lc-prd-images').height();
                var _winH = $(window).height();
                var _conOT = $('.lc-prd-conts').offset().top;
                var _winST = $(window).scrollTop();
				var _pt = (_winH - _conH)/2;

				//사이즈 셀렉트 수정
				var widthMatch = matchMedia("all and (max-width: 767px)");
				if (Core.Utils.mobileChk || widthMatch.matches) {
					$this.find('#selectSize').on('change', function(){
						var option = $('#selectSize option:selected').text();
						$(this).prev('label').text(option);
					});
				}

				// THE DRAW Count Down
				var certificationYnModal = UIkit.modal('#certification-yn-modal', {center:true, bgclose:false, keyboard:false});
				certificationYnModal.hide();
				if($this.find('[data-thedrawend]').length === 1){
					var startTime = $this.find('[data-currentdate]').data("currentdate");
				  var endTime = $this.find('[data-thedrawend]').data("thedrawend");
					startTime = String(startTime);
					endTime = String(endTime);
					console.log(startTime);
					console.log(endTime);
					var startDate = new Date(parseInt(startTime.substring(0,4), 10),
					         parseInt(startTime.substring(4,6), 10)-1,
					         parseInt(startTime.substring(6,8), 10),
					         parseInt(startTime.substring(8,10), 10),
					         parseInt(startTime.substring(10,12), 10),
					         parseInt(startTime.substring(12,14), 10)
					        );
					var endDate   = new Date(parseInt(endTime.substring(0,4), 10),
					         parseInt(endTime.substring(4,6), 10)-1,
					         parseInt(endTime.substring(6,8), 10),
					         parseInt(endTime.substring(8,10), 10),
					         parseInt(endTime.substring(10,12), 10),
					         parseInt(endTime.substring(12,14), 10)
					        );
					var dateGap = endDate.getTime() - startDate.getTime();
					var timeGap = new Date(0, 0, 0, 0, 0, 0, endDate - startDate);
					var diffDay  = Math.floor(dateGap / (1000 * 60 * 60 * 24)); // 일수
					var diffHour = timeGap.getHours();       // 시간
					var diffMin  = timeGap.getMinutes();      // 분
					var diffSec  = timeGap.getSeconds();      // 초

					function Timer(duration, display)	{
					  var timer = duration, hours, minutes, seconds;
					  setInterval(function () {
					      hours = parseInt((timer /3600), 10);
					      minutes = parseInt((timer / 60)%60, 10)
					      seconds = parseInt(timer % 60, 10);

								hours = hours < 10 ? "0" + hours : hours;
					      minutes = minutes < 10 ? "0" + minutes : minutes;
					      seconds = seconds < 10 ? "0" + seconds : seconds;

					      display.text(hours +":"+minutes + ":" + seconds);
							  st = hours +":"+minutes + ":" + seconds;
					      if(st == "00:00:00"){
									return;
								}
								--timer;
					  }, 1000);
					}

					jQuery(function ($){
					    var twentyFourHours = diffHour * 60 * 60;
							var twentyFourMin = diffMin * 60;
					    var display = $('.draw-date>dd');
					    Timer((diffDay * 24 * 60 * 60)+twentyFourHours+twentyFourMin+diffSec, display);
					});

					$.removeCookie('thedrawCertified');
					$.removeCookie('thedrawRedirectUrl');
					$.removeCookie('thedrawCertified', { path: '/' });
					$.removeCookie('thedrawRedirectUrl', { path: '/' });
				}

				// THE DRAW 참여여부
				var skuId = 111;
				var productId = $("[data-product-id]").data("product-id");
				var theDrawId = $("[data-thedrawid]").data("thedrawid");
				var redirectUrl = $(location).attr('href');
				var drawurl = sandbox.utils.contextPath + '/theDraw/entry/isWin';
				if($('[data-thedrawend]').length === 1){
					BLC.ajax({
						type : "POST",
						dataType : "json",
						url : drawurl,
						data : {
							prodId : productId,
							theDrawId : theDrawId,
							skuId : skuId,
							redirectUrl : redirectUrl
						}
					},function(data){
						if(data.result) {
							if(data.winFlag == "win" || data.winFlag == "lose") {
								$('[data-module-product]').remove();
								$('.btn-box').append('<span class="btn-link line large btn-comingsoon ns" style="cursor:default">THE DRAW 응모완료</span>');
							}
						}
					});
				}

				// THE DRAW 당첨자 확인 Start
				$this.find("#btn-drawiswin").click(function(e){
					e.preventDefault();
					$('.uk-modal .draw-entry').find('.attention>p>a').click(function(){
						$(this).parents('p').next('div').toggle();
						return;
					});
					BLC.ajax({
						type : "POST",
						dataType : "json",
						url : drawurl,
						data : {
							prodId : productId,
							theDrawId : theDrawId,
							skuId : skuId,
							redirectUrl : redirectUrl
						}
					},function(data){
						if(data.result) {
							if(data.winFlag == "win") {
								UIkit.modal('#draw-win-modal', {modal:false}).show();
								$('#draw-win-modal').find('#directOrder').attr('href',data.drawProductUrl);
							}
							else if(data.winFlag == "lose") {
								UIkit.modal('#draw-lose-modal', {modal:false}).show();
							}
							else if(data.winFlag == "notEntry") {
								UIkit.modal('#draw-notentry-modal', {modal:false}).show();
							}
						}
					});
				});
				// THE DRAW 당첨자 확인 End

				//excute component_gallery
				sandbox.getComponents('component_gallery', {context:$this}, function(i){
					//excuted js
				});

				$(window).load(function(){
					Chesk();
				});
				$(window).scroll(function(){
					Chesk();
				});
				$(window).resize(function(){
					Chesk();
				});

				function Chesk (){
					$('.lc-prd-conts .prd-con-wrap').css({'paddingTop': _pt});
					posCon();
				}

				function posCon(){
					// _conH = $('.lc-prd-conts .prd-con-wrap').height();
					_conH = $('.lc-prd-conts .product-info').height();
					_conBox = $('.lc-prd-conts .lc-prd-images').height();
					_winH = $(window).height();
					_conOT = $('.lc-prd-conts').offset().top;
					_winST = $(window).scrollTop();
					_pt = (_winH - _conH)/2;

					// console.log(_conH, _conBox, _winH, _conOT, _winST, _pt);

					$('.lc-prd-conts .prd-con-wrap').css({'paddingTop': _pt});
					if(_winST > _conOT && _winST < _conOT + _conBox - _winH){
						$('.lc-prd-conts').find('.prd-con-wrap').addClass('fix').css({'top': 0});
					} else if(_winST > _conOT + _conBox - _winH){
						// $('.lc-prd-conts').find('.prd-con-wrap').removeClass('fix').css('top', _conBox - _conH - _winH/2);
						$('.lc-prd-conts').find('.prd-con-wrap').removeClass('fix').css('top', _conBox - _winH);
					} else {
						$('.lc-prd-conts').find('.prd-con-wrap').removeClass('fix').css('top', 0);
					}
				}

				//입고알림 문자받기 show or hide
				Method.displayRestockAlarm(args);
			},
			displayRestockAlarm:function(args){
				if(args && undefined != args.skudata){
					for(var index = 0; args.skudata.length > index; index++){
						if(0==args.skudata[index].quantity){
							//enable 입고알림문자받기
							$('#set-restock-alarm').show();
							return;
						}
					}
				}
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-launchproduct]',
					attrName:'data-module-launchproduct',
					moduleName:'module_launchproduct',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_header', function(sandbox){
		var $this, $headerMenuWrap, args, isSignIn = false, modal, isModalHide = false, isRefresh = false, reDirectUrl = '', endPoint, errorCount=0;

		var Method = {
			moduleInit:function(){
				$this = $(this);
				$headerMenuWrap = $this.find('.header-mymenu');
				args = arguments[0];
				isSignIn = (args.isSignIn === 'true') ? true : false;
				modal = UIkit.modal('#common-modal', {center:true});

				endPoint = Core.getComponents('component_endpoint');

				$('.log_user').click(function(e){
					if ($('.log_user').hasClass('on')) {
						$(this).removeClass('on');
					} else {
						$(this).removeClass('on');
						$(this).addClass('on');
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-header]',
					attrName:'data-module-header',
					moduleName:'module_header',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			getCustomerInfo: function () {
				return args;
			},
			setLogin:function(callBackFunc){
				var _self = this;

				if(!isSignIn){
					//로그인 전
					sandbox.utils.promise({
						url:sandbox.utils.contextPath + '/dynamicformpage',
						type:'GET',
						data:{'name':'login', 'dataType':'model'}
					}).then(function(data){
						var defer = $.Deferred();
						var appendTxt = $(data).find('.content-area').html();
						$('#common-modal').find('.contents').empty().append(appendTxt);
						sandbox.moduleEventInjection(appendTxt, defer);
						endPoint.call("openLogin");
						$('#common-modal').css('zIndex', 1010);
						$('#common-modal .uk-modal-dialog').css('width', '480px');  //로그인 모달 width 변경 20170412
						modal.show();
						return defer.promise();
					}).then(function(data){
						$headerMenuWrap.find('li').eq(0).empty().append($(args.template).html());
						isSignIn = true;
						endPoint.call("loginSuccess");
						if(isModalHide) modal.hide();
						if(!isRefresh) callBackFunc({isSignIn:true});
						else if(isRefresh) location.href = reDirectUrl;
					}).fail(function(data){
						// changsoo.rhi
						if(data instanceof Object) {
					        _self.popForgotPassword(callBackFunc, data.failureType);
					    } else {
    						defer = null;
		    				//로그인 실패시 재귀호출
    						if(errorCount > 3){
    							UIkit.notify('일시적인 장애로 인해 잠시후 이용해 주시기 바랍니다.', {timeout:3000,pos:'top-center',status:'danger'});
    						}else{
    							UIkit.notify(data, {timeout:3000,pos:'top-center',status:'danger'});
    							_self.setLogin(callBackFunc);
								errorCount++;
    						}
					    }
					});
				}else{
					//로그인 후
					callBackFunc({isSignIn:true});
				}
			},
			getIsSignIn:function(){
				return isSignIn;
			},
			setModalHide:function(isHide){
				isModalHide = isHide;
				return this;
			},
			reDirect:function(url){
				isRefresh = true;
				reDirectUrl = (url) ? url : location.href;
				return this;
			},
			popRegister:function(callBackFunc, errorMsg){
				var _self = this;
				var isCheckedReceiveEmail = false;

				sandbox.utils.promise({
					url:sandbox.utils.contextPath + '/dynamicformpage',
					type:'GET',
					data:{'name':'register', 'dataType':'model'}
				}).then(function(data){
					// 팝업 노출
					var defer = $.Deferred();
					var appendTxt = $(data).find('.content-area').html();
					$('#common-modal').find('.contents').empty().append(appendTxt);
					sandbox.moduleEventInjection(appendTxt, defer);
					endPoint.call("openRegister");
					modal.show();
					//errorMsg 처리
					if(errorMsg){
						for(var key in errorMsg){
							$('#common-modal').find('#'+key).parent().addClass('error').append('<span class="error-message">' + errorMsg[key] + '</span>');
						}
					}
					return defer.promise();
				}).then(function(data){
					isCheckedReceiveEmail = $(modal.dialog).find("#receiveEmail").is(":checked");
					isCheckedReceiveSms = $(modal.dialog).find("#smsAgree").is(":checked");
					return sandbox.utils.promise({
						url: data.redirectUrl,
						type:'GET'
					});
				}).then( function(data){
					//회원가입 성공시
					$headerMenuWrap.find('li').eq(0).empty().append($(args.template).html());

					var appendTxt = $(data).find('.content-area').html();
					$('#common-modal').find('.contents').empty().append(appendTxt);

					endPoint.call("registerComplete", { isReceiveEmail : isCheckedReceiveEmail, isCheckedReceiveSms : isCheckedReceiveSms });
					modal.show();

					$('#common-modal').find('.register-success-btn').click(function(e){
						e.preventDefault();
						if(typeof callBackFunc === 'function'){
							callBackFunc(data);
						}
					});

					//modal hide
					UIkit.modal('#common-modal').off('hide.uk.modal.register').on({
						'hide.uk.modal.register':function(){
							callBackFunc(data);
						}
					});
				}).fail(function(msg){
					_self.popRegister(callBackFunc, msg);
				});
			},
			popForgotPassword:function(callBackFunc, type){
				var _self = this;
				sandbox.utils.promise({
					// url:'sandbox.utils.contextPath + /forgotPassword',
					url:sandbox.utils.contextPath + '/dynamicformpage?failureType='+type, // changsoo.rhi - failureType add
					type:'GET',
					data:{'name':'forgotPassword', 'dataType':'model'}
				}).then(function(data){
					var defer = $.Deferred();
					var appendTxt = $(data).find('.content-area').html();
					$('#common-modal').find('.contents').empty().append(appendTxt);
					sandbox.moduleEventInjection(appendTxt, defer);
					modal.show();
					return defer.promise();
				}).then(function(data){
					//find password success
					//console.log(data);
				}).fail(function(msg){
					defer = null;
					//console.log('msg:' , msg);
					UIkit.notify(msg, {timeout:3000,pos:'top-center',status:'danger'});
					//회원 가입 실패시 재귀호출
					_self.popForgotPassword(callBackFunc);
				});
			}
		}
	});

})(Core);

(function(Core){
	Core.register('module_pageredirect', function(sandbox){

		var Method = {
			moduleInit:function(){
                var $this = $(this);
				// var args = arguments[0];
                //강제 리다이렉트..별 쓸모 없어 보임
                if($this.attr('data-type') === 'COD'){
                document.location = '/mypage';
                }
			}
		}
		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-pageredirect]',
					attrName:'data-module-pageredirect',
					moduleName:'module_pageredirect',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_mobilegnb', function(sandbox){

		var Method = {
			moduleInit:function(){
				var $this = $(this);
				var args = arguments[0];
				var clickIS = false;
				var isSearch = false;

				// var $mobile = $('#mobile-menu');
				var $mobile = $('#' + $this.attr('id'));
				$mobile.find('.mobile-onedepth_list').on('click', '> a.mobile-menu-dynamic', function(e){
					if(!$(this).hasClass('link')){
						e.preventDefault();
						$(this).hide();
						$(this).parent().siblings().hide();
						$('#layout-mobile-menu-user').hide();
						$('#layout-mobile-menu-static').hide();
						$('ul.mobile-menu_onedepth').css("height","100%");
						$(this).siblings().show().stop().animate({'left':0}, 300);		
					}
				});

				$mobile.find('.mobile-twodepth_list').on('click', '> a.mobile-menu-dynamic', function(e){
					if(!$(this).hasClass('link')){
						e.preventDefault();
						$(this).hide();
						$(this).parent().siblings().hide();								
						$(this).siblings().show().stop().animate({'left':0}, 300);
					}
				});

				$mobile.find('.mobile-menu_twodepth > .location').on('click', function(e){
					e.preventDefault();
					$(this).parent().stop().animate({'left':-270}, 300, function(){
						$(this).css('left', 270).hide();
						$(this).parent().children(':first-child').show();
						$(this).parent().siblings().show();
						$('ul.mobile-menu_onedepth').css("height","auto");
						$('#layout-mobile-menu-user').show();
						$('#layout-mobile-menu-static').show();
					});
				});

				$mobile.find('.mobile-menu_threedepth > .location').on('click', function(e){
					e.preventDefault();
					$(this).parent().stop().animate({'left':-270}, 300, function(){
						$(this).css('left', 270).hide();
						$(this).parent().siblings().show();
						$(this).parent().children(':first-child').show();
					});
				});				

				// 브랜드&서포트 메뉴 .mobile-onedepth_list CSS 위해서 Click 이벤트 동작하지 않아서 아래 function()로 처리
				$mobile.find('.mobile-onedepth_list').on('click', '> a.mobile-menu-static', function(e){
					var open_target = $(this).attr("target");
					if(typeof(open_target) == "undefined"){
						open_target = "_self";
					}
					if($(this).attr("href") != "#"){
						window.open($(this).attr("href"), open_target);
					}					
				});

				$('.gnb-search-btn').click(function(e){
					e.preventDefault();
					$('.search-panel, .gnb-search-field').css('display', 'block');
					$('.search-field').find('input[type=search]').focus();
					$("body").css({'position':'fixed'}); //20180516추가
				});


				$mobile.on('show.uk.offcanvas', function(event, area){
					Core.ga.pv('pageview', '/mobileMenu');
					//모바일메뉴 reset
					$('ul.mobile-menu_twodepth').css('left', 270).hide();
					$('ul.mobile-menu_threedepth').css('left', 270).hide();
					$('ul.mobile-menu_onedepth').css("height","auto");					
					$('ul.mobile-menu_onedepth li').show();
					$('ul.mobile-menu_onedepth li a').show();
					$('#layout-mobile-menu-user').show();
					$('#layout-mobile-menu-static').show();		
					
					//android 기본 브라우저에서 scroll down 시 메뉴 노출되지 않은 현상 때문에 clip css 삭제처리
					$('.uk-offcanvas-bar').removeAttr("style");
				});

				$mobile.on('hide.uk.offcanvas', function(event, area){
					if(isSearch){
						sandbox.getModule('module_search').searchTrigger();
					}
					isSearch = false;
				});

				$mobile.find('.mobile-lnb-search').on('click', function(e){
					e.preventDefault();
					isSearch = true;
					UIkit.offcanvas.hide();
				});
			}
		}
		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-mobilegnb]',
					attrName:'data-module-mobilegnb',
					moduleName:'module_mobilegnb',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_qna_product', function(sandbox){
		var $this, $writeBtn, modal, textarea, args;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				$writeBtn = $this.find('.qna-write');
				modal = UIkit.modal('#common-modal');
				args = arguments[0];

				$writeBtn.click(function(e){
					e.preventDefault();

					sandbox.getModule('module_header').setLogin(function(){
						var url = $(this).attr('href');
						var param = sandbox.utils.getQueryParams(url);
						sandbox.utils.ajax(url, 'GET', {}, function(data){
							var responseText = data.responseText;
							$('#common-modal').find('.contents').empty().append(responseText);
							modal.show();
						});
					});
				});

				sandbox.getComponents('component_textarea', {context:$this}, function(){
					var _this = this;
					_this.getThis().closest('form').submit(function(e){
						e.preventDefault();

						if(sandbox.getModule('module_header').getIsSignIn()){
							if(!_this.getValidateChk()){
								UIkit.notify(args.errMsg, {timeout:3000,pos:'top-center',status:'danger'});
							}else{
								var param = $(this).serialize();
								sandbox.utils.ajax($(this).attr('action'), $(this).attr('method'), $(this).serialize(), function(data){
									if(data.readyState === 4 && data.status === 200 && data.statusText === 'success'){
										location.reload();
									}else{
										UIkit.notify(args.errMsg, {timeout:3000,pos:'top-center',status:'danger'});
									}
								});
							}
						}else{
							sandbox.getModule('module_header').setLogin(function(data){
								if(data.isSignIn){
									location.reload();
								}
							});
						}
					});
				});

			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-qna-product]',
					attrName:'data-module-qna-product',
					moduleName:'module_qna_product',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_thedraw', function(sandbox){
		var $that;
		var closingMSTime = 0, openingMSTime = 0, drawStatus, discountTimer, before60Mins=60*60*1000, before1Min=60*1000, waitingForOpening ;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				if(null != arguments && arguments[0]){
					if(undefined!=arguments[0].closingMSTime){
						closingMSTime = arguments[0].closingMSTime;
					}
					if(undefined!=arguments[0].openingMSTime){
						openingMSTime = arguments[0].openingMSTime;
					}
					if(undefined!=arguments[0].drawStatus){
						drawStatus = arguments[0].drawStatus;
						//drawStatus : ready 신청시작전 / opening 디스카운트 진행 중 / closed 신청종료
					}
					// console.log('drawStatus: %s, closingMSTime: %s', drawStatus, closingMSTime);
				}

				function prependZero(num, len) {
					while(num.toString().length < len) {
						num = "0" + num;
					}
					return num;
				}
				
				function TimeDiscount(){
					var currentMSTime = new Date().getTime();
					
					if(closingMSTime >= currentMSTime){
						var remainingTime = closingMSTime - currentMSTime;
						var days, hours, minuntes, seconds;
						// console.log('openingMSTime:' + openingMSTime + ', currentMSTime:' + currentMSTime);

						if(openingMSTime > currentMSTime){
							//count 시작 전
							waitingForOpening = true;
							// console.log('기다리는중');
						} else {
							//ready > opening이 되면 화면 reflash
							if(waitingForOpening == true){
								CloseCount();
								location.reload();
								// console.log('reload!!!, waitingForOpening:' , waitingForOpening);	
							}
							//count 진행 
							if(before1Min >= remainingTime){
								//1분전 붉은 글씨 표시
								if(!$('#remainTime').hasClass("c_ff0015")){        		
								 $('#remainTime').addClass("c_ff0015");
								}
							}
							
							seconds = Math.floor(remainingTime / 1000);
							minuntes = Math.floor(seconds / 60);
							seconds = seconds % 60;
							hours = Math.floor(minuntes / 60);
							minuntes = minuntes  % 60;
							hours = hours % 24;

							document.getElementById('remainingHours').innerHTML = prependZero(hours, 2) + '<span class="timeDot">:</span>';
							document.getElementById('remainingMinutes').innerHTML = prependZero(minuntes, 2)+ '<span class="timeDot">:</span>';
							document.getElementById('remainingSeconds').innerHTML = prependZero(seconds, 2);
							
							// console.log('%s:%s:%s', prependZero(hours, 2), prependZero(minuntes, 2), prependZero(seconds, 2));
						}
					} else {
						 //종료 시 타이머 종료 후 화면 리로드
						 CloseCount();
						 location.reload();
					}
					
				}

                function OpenCount(){
					// console.log('OpenCount');					
					if(drawStatus !== 'closed'){
					    discountTimer = setInterval(TimeDiscount, 500);
					}
				}

				function CloseCount(){
					if(undefined !== 'closed'){
						clearInterval(discountTimer);
					}
					
				}

				OpenCount();
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-thedraw]',
					attrName:'data-module-thedraw',
					moduleName:'module_thedraw',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_sizeguide', function(sandbox){
		var $this = $(this);
        var endPoint;
		var Method = {
			moduleInit:function(){
				var args = arguments[0];
				endPoint = Core.getComponents('component_endpoint');

				Method.viewSlide('SP_001');

				$this.find('[data-view-slide]').each(function(){
                    $(this).on('click', function(){
						//console.log($(this).data('view-slide'));
					});
				});

			},
			initEventListener:function(chgCode){
				/*sizeChart*/
				var $sizeCategory = $('#view_tgt').find('.size_category');
				var $sizeMenu = $sizeCategory.find('.size_menu');
				var $sizeSubMenu = $sizeMenu.find('.size_sub_menu');
				var $sizeCategoryItem = $sizeCategory.find('>li');
				var $sizeMenuItem = $sizeMenu.find('>li');
				var $sizeSubMenuItem = $sizeSubMenu.find('>li');

				$sizeCategoryItem.find('>a').on('click', function () {
					$sizeCategoryItem.removeClass('on');
					$(this).parent().addClass('on');
					$sizeMenu.hide();
					$(this).parent().find($sizeMenu).show();
					$sizeMenuItem.removeClass('on');
					$sizeSubMenuItem.removeClass('on');
					$(this).parent().find($sizeMenuItem).eq(0).addClass('on');
					$sizeSubMenu.hide();
					$(this).parent().find($sizeSubMenu).eq(0).show();
					if ($(this).parent().find('ul').hasClass('size_sub_menu')) {
						$sizeCategory.height($(this).parent().find($sizeMenu).outerHeight(true) + $(this).parent().find($sizeSubMenu).outerHeight(true));
					} else {
						$sizeCategory.height($(this).parent().find($sizeMenu).outerHeight(true));
					}
					return false;
				});
				$sizeMenuItem.find('>a').on('click', function () {
					$sizeMenuItem.removeClass('on');
					$sizeSubMenuItem.removeClass('on');
					$(this).parent().addClass('on');
					$sizeSubMenu.hide();
					$(this).next().show();
				});
				$sizeSubMenuItem.find('>a').on('click', function () {
					$sizeSubMenuItem.removeClass('on');
					$(this).parent().addClass('on');
				});
				/*table*/
				var $sizeTable = $('#view_tgt').find('.pop_size_table');
				var $sizeTd = $sizeTable.find('tbody td');
				var $sizeTheadTh = $sizeTable.find('thead th');
				var $sizeTdFirst = $sizeTable.find('tbody td').eq(0);
				$sizeTd.on({
					mouseenter: function () {
						var $tdIdx = $(this).index();
						$sizeTheadTh.eq($tdIdx).addClass('highlight');
						$(this).parent().prevAll().each(function () {
							$(this).find('td').eq($tdIdx - 1).addClass('highlight2');
						});
						$(this).prevAll('td').addClass('highlight2');
						$(this).parent().find('th').addClass('highlight');
						$(this).addClass('highlight');
					}, mouseleave: function () {
						var $tdIdx = $(this).index();
						$sizeTheadTh.eq($tdIdx).removeClass('highlight');
						$(this).parent().prevAll().each(function () {
							$(this).find('td').eq($tdIdx - 1).removeClass('highlight2');
						});
						$(this).prevAll('td').removeClass('highlight2');
						$(this).parent().find('th').removeClass('highlight');
						$(this).removeClass('highlight');
					}
				});
				/*tab*/
				var $sizeTab = $('#view_tgt').find('.tabbtn');
				var $tabcon = $('#view_tgt').find('.tabcon');
				$sizeTab.find('a').bind('click', function (e) {
					var tar = $(this).attr('href');
					$sizeTab.find('a').removeClass('active');
					$(this).addClass('active');
					$tabcon.hide();
					$('#view_tgt').find(tar).show();
					if (tar == '#chart1') {
						$sizeTab.find('.tabbar').stop().animate({ 'left': '0' }, 400);
					} else {
						$sizeTab.find('.tabbar').stop().animate({ 'left': '73px' }, 400);
					}
					return false;
				});
				/*bra table*/
				$(function () {
					$(".one_row td").mouseover(function () {
						$(".us-size").removeClass("highlight");
						$(".one_row").find(".us-size").addClass("highlight");
						$(".indi").removeClass("highlight2");
						$(".one_row .indi").addClass("highlight2");
						if ($(this).hasClass("indi")) {
							$(".col-1, .col-2").removeClass("highlight2");
							$(".one_row").find(".col-1, .col-2").addClass("highlight2");
						}
					});
					$(".two_row td").mouseover(function () {
						$(".us-size").removeClass("highlight");
						$(".two_row").find(".us-size").addClass("highlight");
						$(".indi").removeClass("highlight2");
						$(".two_row .indi").addClass("highlight2");
						if ($(this).hasClass("indi")) {
							$(".col-1, .col-2").removeClass("highlight2");
							$(".two_row").find(".col-1, .col-2").addClass("highlight2");
						}
					});
					$(".three_row td").mouseover(function () {
						$(".us-size").removeClass("highlight");
						$(".three_row").find(".us-size").addClass("highlight");
						$(".indi").removeClass("highlight2");
						$(".three_row .indi").addClass("highlight2");
						if ($(this).hasClass("indi")) {
							$(".col-1, .col-2").removeClass("highlight2");
							$(".three_row").find(".col-1, .col-2").addClass("highlight2");
						}
					});
					$(".four_row td").mouseover(function () {
						$(".us-size").removeClass("highlight");
						$(".four_row").find(".us-size").addClass("highlight");
						$(".indi").removeClass("highlight2");
						$(".four_row .indi").addClass("highlight2");
						if ($(this).hasClass("indi")) {
							$(".col-1, .col-2").removeClass("highlight2");
							$(".four_row").find(".col-1, .col-2").addClass("highlight2");
						}
					});
					$(".five_row td").mouseover(function () {
						$(".us-size").removeClass("highlight");
						$(".five_row").find(".us-size").addClass("highlight");
						$(".indi").removeClass("highlight2");
						$(".five_row .indi").addClass("highlight2");
						if ($(this).hasClass("indi")) {
							$(".col-1, .col-2").removeClass("highlight2");
							$(".five_row").find(".col-1, .col-2").addClass("highlight2");
						}
					});
					$(".indi").mouseover(function () {
						$(".indi_thead").addClass("highlight");
						$(".col-1, .col-2").removeClass("highlight2");
						$(this).addClass("highlight3");
						$(this).mouseleave(function () {
							$(".indi_thead").removeClass("highlight");
							$(".col-1, .col-2").removeClass("highlight2");
							$(this).removeClass("highlight3");
						});
					});
					$(".col-1").mouseenter(function () {
						$(".one_col").addClass("highlight");
						$(this).removeClass("highlight2");
						$(this).mouseleave(function () {
							$(".one_col").removeClass("highlight");
							$(".us-size").removeClass("highlight");
						});
					});
					$(".col-2").mouseenter(function () {
						$(".two_col, .col_head").addClass("highlight");
						$(".indi_thead").addClass("normal");
						$(this).removeClass("highlight2");
						$(this).mouseleave(function () {
							$(".two_col, .col_head").removeClass("highlight");
							$(".indi_thead").removeClass("normal");
							$(".us-size").removeClass("highlight");
						});
					});
				});
			},
			viewSlide:function(chgCode){
				$("#view_tgt").html($("#" + chgCode).html());
				Method.initEventListener(chgCode);
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-sizeguide]',
					attrName:'data-module-sizeguide',
					moduleName:'module_sizeguide',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_restocklist', function(sandbox){
		var $this = $(this);
        var endPoint;
		var Method = {
			moduleInit:function(){
				var args = arguments[0];
				endPoint = Core.getComponents('component_endpoint');

				$(this).on('click', '#restock-delete', function(e){
					e.preventDefault();
					var alarm_id = $(this).find("input[id='hidden-restock-id']").val();

					if(typeof(alarm_id) !== "undefined" && alarm_id !== "" && isNaN(alarm_id) === false){
						UIkit.modal.confirm('입고 알림 신청 내역을 삭제 하시겠습니까?', function(){
							Core.Loading.show();
							Core.Utils.ajax(Core.Utils.contextPath + '/restock/remove', 'GET',{'id':alarm_id}, function(data) {
								var data = $.parseJSON( data.responseText );
								if(data.result) {
									location.reload();
									UIkit.notify("입고 알림 신청이 삭제 되었습니다." , {timeout:3000,pos:'top-center',status:'success'});
								} else {
									UIkit.notify(args.errorMsg, {timeout:3000,pos:'top-center',status:'error'});
								}
							},true);
						}, function(){},
						{
							labels: {'Ok': '확인', 'Cancel': '취소'}
						});												
					}else{
						UIkit.notify("입고 알림 신청 삭제에 실패하였습니다. 잠시 후 다시 시도 해주세요.", {timeout:3000,pos:'top-center',status:'error'});
					}
				});
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-restocklist]',
					attrName:'data-module-restocklist',
					moduleName:'module_restocklist',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_restock', function(sandbox){

		// 입고 알림 신청 슬라이더
		$('.mtopslider').bxSlider({captions: true});

		// UIkit.modal('#restock-notification').show();
		UIkit.modal.dialog.template = '<div class="uk-modal module_restock"><div class="uk-modal-dialog"></div></div>';

		// UIkit confirm clone "confirm_title"
		UIkit.modal.confirm_title = function (content, onconfirm, oncancel) {
			var options = arguments.length > 1 && arguments[arguments.length-1] ? arguments[arguments.length-1] : {};

			onconfirm = UIkit.$.isFunction(onconfirm) ? onconfirm : function(){};
			oncancel  = UIkit.$.isFunction(oncancel) ? oncancel : function(){};
			options   = UIkit.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UIkit.modal.labels}, UIkit.$.isFunction(options) ? {}:options);

			var result = '<h1>' + String(content.mainMsg) + '</h1>' + '<p>' + String(content.subMsg) + '</p>';

			var modal = UIkit.modal.dialog(([
				'<div class="uk-margin uk-modal-content">' + result + '</div>',
				'<div class="uk-modal-footer uk-text-center"><button class="uk-button js-modal-confirm-cancel">' + options.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-confirm">'+options.labels.Ok+'</button></div>'
			]).join(""), options);

			modal.element.find(".js-modal-confirm, .js-modal-confirm-cancel").on("click", function(){
				UIkit.$(this).is('.js-modal-confirm') ? onconfirm() : oncancel();
				modal.hide();
			});

			modal.on('show.uk.modal', function(){
				setTimeout(function(){
					modal.element.find('.js-modal-confirm').focus();
				}, 50);
			});

			return modal.show();
		};

		// UIkit alert clone "alert_title"
		UIkit.modal.alert_title = function (content, options) {

			options = UIkit.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:'확인'}, options);

			if (typeof content === 'object') {
				var result = '<h1>' + String(content.mainMsg) + '</h1>' + '<p>' + String(content.subMsg) + '</p>';
			} else {
				var result = '<h1>' + String(content) + '</h1>';
			}

			var modal = UIkit.modal.dialog(([
				'<div class="uk-margin uk-modal-content">' + result + '</div>',
				'<div class="uk-modal-footer uk-text-center"><button class="uk-button uk-button-primary uk-modal-close">' + options.labels + '</button></div>'
			]).join(""), options);

			modal.on('show.uk.modal', function(){
				setTimeout(function(){
					modal.element.find('button:first').focus();
				}, 50);
			});

			return modal.show();
		};

		var $this = $(this);
		var endPoint, allSkuData, args, formatPhone, NotifyName;

		var Method = {
			moduleInit:function(){
				//SKU 정보에서 재고수량을 확인 하여 입고 알림 가능한 사이즈만 활성화
				//skuData는 productOptionComponent 에서 리턴 받는다,
				args = arguments[0];
				endPoint = sandbox.getComponents('component_endpoint');

				// console.log('isForcedDisplay ', args)

				sandbox.getComponents('component_product_option', {context:$(document)}, function () {
					this.addEvent('skuLoadComplete', function(data){

						allSkuData = data;

						/*if(allSkuData && allSkuData.length > 0){
							allSkuData.sort(function(a, b){
								//selectedOptions 오름차순으로 상품정렬
								var aOptions = a.selectedOptions[0];
								var bOptions = b.selectedOptions[0];
								return ((aOptions < bOptions) ? -1 : ((aOptions > bOptions) ? 1 : 0));
							});
						}*/

						Method.checkQuantity();

						//입고알림 문자받기 show or hide
						if($("#set-restock-alarm").length > 0 && allSkuData){
							for(var index = 0; allSkuData.length > index; index++){
								if(args.isForcedDisplay == 'true' || allSkuData[index].quantity == 0){
									//enable 입고알림문자받기
									$('#set-restock-alarm').show();
									break;
								}
							}
						}

						// ONE SIZE 초기값 설정
						var oneSize = $('#size-grid li');
						if (oneSize.hasClass('ONE')) {
							oneSize.find('a').addClass('selected');
							$('#size-value').text(oneSize.text()).attr('data-sku-id', allSkuData[0].skuId);
						}
					});
				});

				sandbox.getComponents('component_categoryitem', {context:$(document)}, function () {
					// _self.fireEvent('skuLoadComplete', _self, [allSkuData]);
					this.addEvent('skuLoadComplete', function (data, Notify) {
						allSkuData = data;
						NotifyName = Notify;
						// console.log('allSkuData====>', allSkuData);
						// console.log('Notify====>', NotifyName);
						Method.checkQuantity();
					});
				});

				sandbox.getComponents('component_launchitem', {context:$(document)}, function () {
					// _self.fireEvent('skuLoadComplete', _self, [allSkuData]);
					this.addEvent('skuLoadComplete', function (data, Notify) {
						allSkuData = data;
						NotifyName = Notify;
						// console.log('allSkuData====>', allSkuData);
						// console.log('Notify====>', NotifyName);
						Method.checkQuantity();
					});
				});

				sandbox.getComponents('component_gallery', {context:$(document)}, function () {
					this.addEvent('skuLoadComplete', function (Notify) {
						NotifyName = Notify;
						// console.log('Notify====>', NotifyName);
						Method.checkQuantity();
					});
				});


				// sandbox.getModule('module_launchcategory').getTotalSkuData()

				setTimeout(function () {
					if (sandbox.getModule('module_launchcategory')) {
						allSkuData = sandbox.getModule('module_launchcategory').getTotalSkuData();
						NotifyName = sandbox.getModule('module_launchcategory').getTotalSkuNotify();
						Method.checkQuantity();
					}
				}, 1000);

				//사이즈 선택시 css 변경
				$(this).find('#size-grid li').on('click', function(e){
					if(!$(this).attr('disabled')){
						$(this).parent().find('li a').each(function(){
							//기존에 선택된 사이즈 해지
							$(this).removeClass('selected');
						});
						$(this).find('a').addClass('selected');
						//사이즈 영역에 선택한 사이즈 값 표시
						document.getElementById('size-value').innerHTML= $(this).text();

						//sku id 저장
						$('#size-value').attr('data-sku-id', allSkuData[$(this).index()].skuId);

						//사이즈 선택 후 사이즈 선택역역을 숨긴다
						Method.sizeTableOpen();
					}
				});

				// $(this).find('#size-grid li').trigger('click');

				//사이즈 표시 영역 선택
				$(this).find('#size-value-area').on('click', function(){
					//사이즈가 선택된 경우에만 사이즈 리스트를 닫는다.
					if($('#size-value').attr('data-sku-id')){
						Method.sizeTableOpen();
					} else {
						UIkit.modal.alert_title("상품의 사이즈를 선택하셔야 입고 알림 문자를 받으실 수 있습니다.");
					}
					//console.log(allSkuData[$(this).index()].skuId)
				});

				//개인정보 취급 방침 팝업 열기
				$(this).find('#privacyPolicyLink').on('click', function(e){
						$('#layerPrivacyPolicy').show();
				});

				//개인정보 취급 방침 팝업 닫기
				$('[id^="closePolicy"]').each(function(){
					$(this).click(function(){
						$('#layerPrivacyPolicy').hide();
					});
				});

				//마이페이지 - 입고알림 서비스 신청 삭제하기
				// $this.on('click', '#btn-restock-delete',  function(e){
				// 	e.preventDefault();
				// 	console.log('hi');
				// 	var alarm_id = $(this).parent().parent().find("input[id='hidden-restock-id']").val();
				// 	if(typeof(alarm_id) != "undefined" && alarm_id != "" && isNaN(alarm_id) == false){
				// 		UIkit.modal.confirm('삭제 하시겠습니까?', function(){
				// 			Core.Utils.ajax('/restock/remove', 'GET',{'id':alarm_id}, function(data) {
				// 				var data = $.parseJSON( data.responseText );
				// 				if(data.result) {
				// 					UIkit.modal.alert( "정상적으로 삭제 되었습니다." ).on('hide.uk.modal', function() {
				// 						location.reload();
				// 					});
				// 				} else {
				// 					UIkit.notify(data.errorMsg, {timeout:3000,pos:'top-center',status:'danger'});
				// 				}
				// 			},true);
				// 		});
				// 	}else{
				// 		UIkit.modal.alert( "삭제 실패하였습니다. 짐시 후 다시 시도 해주세요." ).on('hide.uk.modal',null);
				// 	}
				// });

				//입고알림 서비스 신청 하기
				$(this).find('#request-restock-alarm').on('click', function(e){
					//사이즈 선택 확인
					if(!$('#size-value').attr('data-sku-id')){
						UIkit.modal.alert_title("사이즈를 선택하세요.");
						return;
					}
					//휴대전화 번호 입력 확인 targetValue
					var phoneNum = document.getElementById("targetValue").value;

					if(10 > phoneNum.length){
						UIkit.modal.alert_title('휴대폰번호를 정확하게 입력 하셔야<br/>입고 알림 서비스를 이용 하실 수 있습니다.');
						return;
					} else {
						var pattern =  new RegExp('^[0-9]*$', 'g');
						if(!pattern.test(phoneNum)){
							UIkit.modal.alert_title('휴대폰번호를 정확하게 입력 하셔야<br/>입고 알림 서비스를 이용 하실 수 있습니다.');
							return;
						}
					}
					//체크박스 확인
					if(!$('#check-privacy-policy-agree').hasClass('checked')){
						UIkit.modal.alert_title('개인정보 취급방침 이용에 동의 하셔야<br/>입고 알림 서비스를 이용 하실 수 있습니다.');
						return;
					}

					// phone number format
					var tempPhone;
					if(phoneNum.length > 10){
						tempPhone = phoneNum.match(/^(\d{3})(\d{4})(\d{4})$/);
					} else {
						tempPhone = phoneNum.match(/^(\d{3})(\d{3})(\d{4})$/);
					}
					formatPhone = tempPhone[1] + '-' + tempPhone[2] + '-' + tempPhone[3];

					var notify = {
						mainMsg : '입고 알림 신청을 하시겠습니까?',
						subMsg : '고객님께서 수신 동의하신<br/><strong>' + formatPhone + '</strong>(으)로<br/> 알림 문자가 발송됩니다.'
					};

					UIkit.modal.confirm_title(notify, function(){
						endPoint.call('clickEvent', {'area' : 'snkrs', 'name' : 'notify me:confirm' })
						Method.add();
					}, function(){
						endPoint.call('clickEvent', {'area' : 'snkrs', 'name' : 'notify me:cancel' })
					}, function(){},
					{
						labels: {'Ok': '신청', 'Cancel': ' 취소'}
					});
				});

			},
			checkQuantity:function(){
				if(allSkuData){
					$('#size-grid').find("li").each( function(index){
						var skuId = $(this).attr('value');
						if(allSkuData.length > index){
							if(allSkuData[index].quantity <= 0 || args.isForcedDisplay == 'true'){
								//입고알림에서는 재고가 없는 상품을 활성화
								$(this).removeAttr('disabled');
								$(this).find("a").removeClass('sd-out');
							}
						}
					});
				}
			},
			add:function(){
				var customerId = $('#request-restock-alarm').attr('data-customer-id');
				var obj = {
					'id' : customerId?customerId:'', //계정
					'skuId' : $('#size-value').attr('data-sku-id'),
					'messageType' : 'SMS', //SMS/EMAIL
					'target' : document.getElementById("targetValue").value, // SMS인 경우 번호, EMAIL인 경우 이메일
					'notify': NotifyName
				}
				// console.log('obj:', obj);
				Core.Utils.ajax(sandbox.utils.contextPath + '/restock/add', 'GET',obj, function(data) {
					var data = $.parseJSON( data.responseText );
					if( data.result ){ // result:true
						$('.uk-modal-close').click();
						// $(".sms-complete").show();
						var sucessMsg = {
							mainMsg : '입고 알림 신청이 완료되었습니다.',
							subMsg : '<span>알림 받을 휴대폰 번호<strong>' + formatPhone + '</strong></span>입고 즉시, 알림문자가 발송됩니다.'
						};
						UIkit.modal.alert_title(sucessMsg)
						// UIkit.notify(sucessMsg, {timeout:3000,pos:'top-center', status:'success'});
					}else{
						UIkit.modal.alert_title(data.errorMsg);
						// UIkit.notify(data.errorMsg, {timeout:3000,pos:'top-center',status:'danger'});
					}
				},true);
			},
			sizeTableOpen:function(){
				if($('#size-value-area').hasClass('open')){
					$('#size-value-area').removeClass('open');
					$('#size-list-area').slideUp();
				} else {
					$('#size-value-area').addClass('open');
					$('#size-list-area').show('bind');
				}
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-restock]',
					attrName:'data-module-restock',
					moduleName:'module_restock',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});

})(Core);

(function(Core){
	'use strict';

	Core.register('module_dynamicentity_board_comment', function(sandbox){
		var Method = {
			$that : null, 
			$commentContainer : null,
			dynamicName : null,
			storageId : null,
			moduleInit:function(){
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);				

				Method.$that = $(this);
				Method.dynamicName = $(this).find('input[name="dynamicName"]').val();
				Method.storageId = $(this).find('input[name="storageId"]').val();
				Method.$commentContainer = $(this).find('#'+ Method.dynamicName + '-comment');


				// 쓰기
				$(this).find('#comment-submit').off('click').on('click', Method.write );
				// 삭제
				$(this).find('a.deleteComment').off('click').on('click', Method.checkRemove );
				// 비빌번호 확인 후 삭제
				$(this).find('a.checkPassword').off('click').on('click', Method.togglePasswordForm );

				//paging 
				$(this).find('.btn-pagination > .paging').off('click').on('click', Method.paging );
			},
			write:function(e){
				e.preventDefault();
				if ( $.trim($("#authorName").val()) == "") {
					UIkit.notify('작성자를 입력해주세요.', {timeout:3000,pos:'top-center',status:'danger'});
					$("#authorName").focus();
					return;
				}

				if ($.trim($("#comment").val()) == "") {
					UIkit.notify('글 내용을 입력해주세요.', {timeout:3000,pos:'top-center',status:'danger'});
					$("#comment").focus();
					return;
				}

				 if( _GLOBAL.CUSTOMER.ANONYMOUS ){
					if ( $.trim($("#authorPassword").val()) == "") {
						UIkit.notify('비밀번호를 입력해주세요', {timeout:3000,pos:'top-center',status:'danger'});
						$("#authorPassword").focus();
						return;
					}
				}

				var $form = $(this).closest($('form#commentForm'));

				sandbox.utils.ajax($form.attr('action'), 'POST', $form.serialize(), function(data){
					var data = $.parseJSON( data.responseText );
					if( data.result ){
						location.reload();
					}else{
						UIkit.notify(data.errorMsg, {timeout:3000,pos:'top-center',status:'danger'});
					}
				}, true)				
			},
			// 비빌번호 확인 후 삭제 -- 사용안함
			checkPassword:function(e){
				e.preventDefault();
				var $form = $(this).closest('form');
				UIkit.modal.prompt("Password:", '', function(data){
					if( $.trim(data) != ''){
						$form.find('input[name="password"]').val(data);
						Method.remove($form);
					}
				});
			},

			togglePasswordForm:function(){
				if( $(this).hasClass('cancel')){
					$(this).removeClass('cancel').text('삭제');
					$(this).closest('form').find('.password-confirm').addClass('uk-hidden');
				}else{
					$(this).addClass('cancel').text('취소');
					$(this).closest('form').find('.password-confirm').removeClass('uk-hidden');
				}
			},

			// 삭제 확인
			checkRemove:function(e){
				e.preventDefault();

				var $form = $(this).closest('form');

				sandbox.validation.init( $form );
				sandbox.validation.validate( $form );

				if( sandbox.validation.isValid( $form )){
					UIkit.modal.confirm("삭제 하시겠습니까?", function(){
						Method.remove($form);
					});
				}
				/*
				if( $(this).hasClass('password')){
					var password = $(this).closest('form').find('input[name="password"]');
					if ( $.trim( password.val() ) == "") {
						UIkit.notify('비밀번호를 입력해주세요.', {timeout:3000,pos:'top-center',status:'danger'});
						password.focus();
						return;
					}
				}
				*/
				
				
			},
			// 삭제
			remove:function($form){
				sandbox.utils.ajax($form.attr('action'), 'POST', $form.serialize(), function(data){
					var data = $.parseJSON( data.responseText );
					if( data.result ){
						location.reload();
					}else{
						UIkit.notify(data.errorMsg, {timeout:3000,pos:'top-center',status:'danger'});
					}
				}, true)
			},

			paging:function(e){
				e.preventDefault();
				if( $(this).hasClass('active') ){
					return;
				}
				var param = _.object($(this).attr('href').split('&').map(function(p){return p.split('=');}));
				var obj = {
					'name': Method.dynamicName,
					'mode':'template',
					'storageId' : Method.storageId,
					'page' : Number(param.page) || 1,
					'pageSize' : Method.pageSize || 5,
					'pageListSize' : Method.pageListSize || 5,
					'_sort' : 'dateCreated',
					'_type_sort' : 'desc',
					'pagetype' : 'comment',
					'paging' : true,
				}

				sandbox.utils.ajax('/processor/execute/dynamic', 'GET', obj, function(data){
					var list = data.responseText;
					if( list != '' && list != undefined && list != null ){
						// TODO 페이징 타입에 따라 밑에 붙이던지 replace하던지
						Method.$commentContainer.replaceWith($(list).find('.comment-list'));
						sandbox.moduleEventInjection(list);
					}else{
						UIkit.notify('Server Error', {timeout:3000,pos:'top-center',status:'danger'});
					}
				}, true)
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-dynamicentity-board-comment]',
					attrName:'data-module-dynamicentity-board-comment',
					moduleName:'module_dynamicentity_board_comment',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_pagination', function(sandbox){
		var $this, args, currentPage, totalPageNum, totalPageCount, lineSize, pageSize, isHistoryBack = false, endPoint, scrollController;

		/*
			data-module-pagination="{
				type:scroll,
				totalCount:896,
				currentPage:1,
				pageSize:40,
				target:.item-list-wrap,
				api:/kr/ko_kr/w/men/fw,
				scrollWrapper:window,
				scrollContainer:document,
				lineSize:4}"
		*/
		var setSessionPaging = function(){
			sessionStorage.setItem('categoryPagingType', args.type);
			sessionStorage.setItem('categoryCurrentPage', currentPage + 1);
		}

		var Method = {
			moduleInit:function(){
				var sessionCurrentPage = sessionStorage.getItem('categoryCurrentPage');
				var sessionLineSize = sessionStorage.getItem('categoryLineSize');
				endPoint = Core.getComponents('component_endpoint');

				$this = $(this);
				args = arguments[0];
				currentPage = (sessionCurrentPage) ? sessionCurrentPage : args.currentPage;
				pageSize = Number(args.pageSize);
				totalPageNum = Math.ceil(args.totalCount / pageSize);
				lineSize = (sessionLineSize !== null) ? sessionLineSize : args.lineSize;

				switch(args.type){
					case 'more' :
						Method.typeMore();
						break;
					case 'scroll' :
						Method.typeScroll();
						break;
				}
			},
			getPaging:function(){
				return (args.totalCount > pageSize * currentPage && totalPageNum > currentPage) ? currentPage++ : null;
			},
			typeMore:function(){
				if(currentPage >= totalPageNum){
					// $this.find('button, a').remove();
					$this.find('button, a').hide();
					return;
				}

				$this.find('button, a').off('click').on('click', function(e){
					e.preventDefault();

					var _self = this;
					if(Method.getPaging()){
                        var sort = ($('a#review-sort-tab.review-filter.active').text() === '도움순'?'helpfulCount':'id');
						var obj = {
							'mode': args.mode,
							'templatePath':args.templatePath,
							'resultVar': args.resultVar,
							'productId': args.productId,
							'pageSize':pageSize,
							'page':currentPage,
							'lineSize':lineSize,
							'_sort':sort,
							'_type_sort':'desc',
							'cache':new Date().getTime()
						}
						
						sandbox.utils.ajax(args.api, 'GET', obj, function(data){
							if(args.api == '/kr/ko_kr/processor/execute/review'){
								$(data.responseText).find('li').each(function(index){
									$('ul#review-list').append(this);
								});
							} else {
								sandbox.moduleEventInjection($(data.responseText).find(args.target)[0].innerHTML);
							}
							
							Method.setEndPoint( data );
							if(currentPage >= totalPageNum){
								$(_self).off('click');
								$(_self).hide();
								// $(_self).remove();
							}
							setSessionPaging();
						});

						// sandbox.utils.ajax(args.api, 'GET', {'page':currentPage, 'pageSize':pageSize, 'lineSize':lineSize}, function(data){
						// 	$(args.target).append($(data.responseText).find(args.target)[0].innerHTML);
						// 	sandbox.moduleEventInjection($(data.responseText).find(args.target)[0].innerHTML);
						// 	Method.setEndPoint( data );
						// 	if(currentPage >= totalPageNum){
						// 		$(_self).off('click');
						// 		$(_self).remove();
						// 	}
						// 	setSessionPaging();
						// });
					}
				});
			},
			typeScroll:function(){
				if(currentPage >= totalPageNum) return;

				var _self = this;
				var isFirst = true;
				var isLoaded = true;
				var prevScrollTop = 0;
				var contentsHeightPer = 0;
				scrollController = sandbox.scrollController(window, document, function(percent){
					contentsHeightPer = this.getScrollTop($(args.target).offset().top + $(args.target).height());

					if(percent > contentsHeightPer && isLoaded && !isHistoryBack && this.getScrollPer() < percent && !isFirst){
						isLoaded = false;
						if(Method.getPaging()){
							sandbox.utils.ajax(args.api, 'GET', {'page':currentPage, 'pageSize':pageSize, 'lineSize':lineSize}, function(data){
								$(args.target).append($(data.responseText).find(args.target)[0].innerHTML);
								sandbox.moduleEventInjection($(data.responseText).find(args.target)[0].innerHTML);
								Method.setEndPoint( data );
								if(currentPage >= totalPageNum){
									scrollController.destroy();
								}else{
									isLoaded = true;
									setSessionPaging();
								}
							});
						}
					}

					//새로고침, 히스토리백을 했을경우 돔오브젝트가 생성되지 못한 상황에서 스크롤의 위치가 최 하단으로 이동 하기 때문에
					//처음 로드 시점에서는 무조건 scroll 이벤트를 막는다.
					isFirst = false;

				}, 'pagination');
			},
			setEndPoint:function( data ){
				var $products = $(data.responseText).find('.categoryMarketingScript #products div');
				var itemList = [];
				$products.each(function(index, data){
					itemList.push({
						id : $(data).data("id")
					});
				})
				// 로드한 정보를 기존 정보에 추가해야 할지? 우선은 이벤트쪽으로만 정보 전달
				endPoint.call('loadMoreProducts', {page : currentPage, pageSize: pageSize, lineSize: lineSize, itemList: itemList  })
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-pagination]',
					attrName:'data-module-pagination',
					moduleName:'module_pagination',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			setLineSize:function(size){
				lineSize = size;
				sessionStorage.setItem('categoryLineSize', lineSize);
			},
			getPagingType:function(){
				return args.type;
			},
			getTotalCount:function () {
				return args.totalCount; // BK
			},
			destroy:function(){
				if(args.type === 'scroll' && scrollController) scrollController.destroy();
				sessionStorage.setItem('categoryCurrentPage', 1);
			}
		}
	});
})(Core);

(function(Core){
	Core.register('module_instagram_feed', function(sandbox){
		var $this, args;
		var Method = {
			moduleInit:function(){
				$this = $(this);
				args = arguments[0];

				var url = 'https://api.instagram.com/v1/users/self/media/recent';  // 가입한 user의 feedData;
				var obj = {client_id:args.clientkey, access_token:args.token, count:args.count}
				var template = $(args.template).html();

				sandbox.utils.jsonp(url, obj, 'callback', function(data){
					var feedData = data.data;

					if(data.meta.hasOwnProperty('error_message')){
						UIkit.notify(data.meta.error_message, {timeout:3000,pos:'top-center',status:'error'});
						return
					}

					/* 인스타그램에서 보내주는 이미지 크기가 달라 thumbnail_high 를 따로 가공해서 넣어준다. */
					for(var i=0; i<feedData.length; i++){
						feedData[i]['images']['thumbnail_high'] = {
							width:320,
							height:320,
							url:feedData[i]['images']['thumbnail']['url'].replace('s150x150', 's320x320')
						}
					}

					var source = $(args.template).html();
					var template = Handlebars.compile(source);
					var bindingHtml = template({instagram:feedData});



					$this.append(bindingHtml);
					sandbox.moduleEventInjection(bindingHtml);
				}, true);
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-instagram-feed]',
					attrName:'data-module-instagram-feed',
					moduleName:'module_instagram_feed',
					handler:{context:this, method:Method.moduleInit}
				});
			},
			destroy:function(){
				console.log('product destory');
			}
		}
	});
})(Core);

(function(Core){
	'use strict';

	Core.register('module_global_popup', function(sandbox){
		var Method = {
			moduleInit:function(){
				var args = Array.prototype.slice.call(arguments).pop();
				$.extend(Method, args);

				var options = {
					id : Method.id,
					width : Method.width,
					height : Method.height,
					marginLeft : Method.marginLeft || 0,
					marginTop : Method.marginTop || 0,
					marginBottom : Method.marginBottom || 0,
					layoutType : Method.layoutType,
					backgroundColor : Method.backgroundColor,
					borderWidth : Method.borderWidth || 0,
					boxPosition : Method.boxPosition,
					triggerActionType : Method.triggerActionType,
					triggerActionValue : Method.triggerActionValue,
					animationType : Method.animationType,
					closeExpireTime : Method.closeExpireTime,
					useCloseMessage : Method.useCloseMessage,
					closeType : Method.closeType,
					closePosition : Method.closePosition,
					closeMarginTop : Method.closeMarginTop || 0,
					closeMarginLeft : Method.closeMarginLeft || 0,
					closePaddingTop : Method.closePaddingTop || 0,
					closePaddingRight : Method.closePaddingRight || 0,
					closePaddingBottom : Method.closePaddingBottom || 0,
					closePaddingLeft : Method.closePaddingLeft || 0,
					closeBackgroundHeight : Method.closeBackgroundHeight || 0
				}
				$("#global_popup_" + options.id).brzPopup(options);
			}
		}

		return {
			init:function(){
				sandbox.uiInit({
					selector:'[data-module-global-popup]',
					attrName:'data-module-global-popup',
					moduleName:'module_global_popup',
					handler:{context:this, method:Method.moduleInit}
				});
			}
		}
	});
})(Core);