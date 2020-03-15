/*!
	stat.js (с) homepictures.ru, 2017 - 2018
*/ 
var Stat = (function() {
	 function _c(d) {
		if(console) console.log(d);
	}
	function _cbReachGoal (){
		_c('Запрос '+yaCounter+'.reachGoal('+this.goal+',' + JSON.stringify(this.params) + ') в Метрику успешно отправлен');
	}
	function initMetrika() {
		if(typeof yaCounter != 'undefined' && window[yaCounter]) return;
		// поиск счетчика Метрики на странице
		yaCounter = false;
		if(typeof Ya != 'undefined') {
			var cntrs;
			if(typeof Ya.Metrika != 'undefined') {
				cntrs = Ya.Metrika.counters()
			}
			else if(typeof Ya.Metrika2 != 'undefined') {
				cntrs = Ya.Metrika2.counters();
			}
			else {
				return;
			}
			if(typeof cntrs[0] != 'undefined') {
				yaCounter = 'yaCounter'+cntrs[0].id;
				if(window[yaCounter]) return;
			}
		}
	}
	return {
		send: function($o) {
			var i, v, goal, t, j, e, gs;
			gs = ['goal-common', 'goal'];
			for(j = 0; j < gs.length; j++) {
				goal = $o.data(gs[j]);
				if(!goal) continue;
				goal = goal.split(';');
				for(i in goal) {
					v = $.trim(goal[i]);
					if(v != '') Stat.reachGoal(v);
				}
			}
			gs = ['ga-common', 'ga'];
			for(j = 0; j < gs.length; j++) {
				goal = $o.data(gs[j]);
				if(!goal) continue;
				goal = goal.split(';');
				for(i in goal) {
					v = $.trim(goal[i]);
					if(v != '') Stat.ga.apply(Stat, v.split(','));
				}
			}
			goal = $o.data('fbq');
			if(goal) {
				goal = goal.split(';');
				for(i in goal) {
					v = $.trim(goal[i]);
					if(v != '') Stat.fbq.apply(Stat, v.split(','));
				}
			}
			goal = $o.data('roistat');
			if(goal) {
				goal = goal.split(';');
				for(i in goal) {
					v = $.trim(goal[i]);
					if(v != '') Stat.roistat(v);
				}
			}
			gs = ['datalayer-common', 'datalayer'];
			for(j = 0; j < gs.length; j++) {
				goal = $o.data(gs[j]);
				if(!goal) continue;
				goal = goal.split(';');
				e = {};
				for(i in goal) {
					v = $.trim(goal[i]);
					if(v == '') continue;
					t = v.split(':');
					e[t[0]] = t.length > 1 ? t[1] : '';
				}
				Stat.dataLayer(e);
			}
		},
		/*
		* Отправка данных в Google.Analitics
		* @raram eventCategory
		* @raram eventAction
		* @raram eventLabel
		* @raram eventLabel
		*/
		ga : function(eventCategory, eventAction, eventLabel, eventLabel) {
			var pars = {hitType: 'event'};
			pars.hitCallback = function () {
				_c("Запрос ga('send', '" + JSON.stringify(pars) + "')  успешно отправлен");
			}
			if(eventCategory) pars.eventCategory = eventCategory;
			if(eventAction) pars.eventAction = eventAction;
			if(eventLabel) pars.eventLabel = eventLabel	;
			if(eventValue) pars.eventValue = eventValue;
			if(typeof ga != 'undefined') {
				_c("Отправляем запрос ga('send', '" + JSON.stringify(pars) + "')");
				ga('send', pars);
			}
			else {
				_c("Запрос ga('send', '" + JSON.stringify(pars) + "') не отправлен. Аналитика не найдена на сайте");
			}
		},
		ga2 : function(eventCategory, eventAction, eventLabel, eventValue) {
			var pars = {}, _l;
			if(!eventCategory) eventCategory = '';
			if(!eventAction) eventAction = '';
			if(!eventLabel) eventLabel = '';
			if(!eventValue) eventValue = 1;
			pars.hitCallback = function () {
				_c("Запрос ga("+ _l + ") успешно отправлен");
			};
			_l = "'send', 'event', '" + eventCategory + "', '"+ eventAction + "', '"+ eventLabel + "', '"+ eventValue + "'";
			if(typeof ga != 'undefined') {
				_c("Отправляем запрос ga("+ _l + ")");
				ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue, pars);
			}
			else {
				_c("Запрос ga("+ _l + ") не отправлен. Аналитика не найдена на сайте");
			}
		},
		fbq : function(track, Lead) {
			if(typeof fbq == 'function') fbq(track, Lead);//Facebook Pixel
			else _c("Запрос fbq("+ track+", "+Lead + ") не отправлен. Facebook Pixel не найден на сайте");
		},
		reachGoal : function(goal, params) {
			initMetrika();
			if(!params) params = {};
			if(yaCounter !== false) {
				_c('Отправляем запрос '+yaCounter+'.reachGoal('+goal+',' + JSON.stringify(params) +') в Метрику');
				window[yaCounter].reachGoal(goal, params, _cbReachGoal, {goal:goal, params:params});
			}
			else {
				_c('Запрос reachGoal('+goal+',' + JSON.stringify(params) +') не отправлен. Метрика не найдена на сайте');
			}
		},
		roistat: function(goal) {
			if(typeof roistat != 'undefined')
				roistat.event.send(goal);
		},
		dataLayer: function(e) {
			if(typeof dataLayer != 'undefined') {
				dataLayer.push(e);
				_c("Запрос dataLayer.push("+ JSON.stringify(e) + ") отправлен");
			}
			else _c("Запрос dataLayer.push("+ JSON.stringify(e) + ") не отправлен. dataLayer не найден на сайте");
		}		
	}
})();
