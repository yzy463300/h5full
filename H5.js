/*
*author: 410636163@qq.com  yzy
*H5全屏滚动插件
*
*/
;(function(){ 
	var H5 = function(elements,option){  
		this.touchStart = this.touchStart.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchEnd = this.touchEnd.bind(this);
		this.pageHeight = $(window).height();
		this.dragStart = 0;//开始拖动时手指Y的位置
		this.moveDistance = 0;//手指移动的距离
		this.flag = true;//每屏是否切换完成
		this.pageIndex = 0;//当前页面index
		this.loop = option.loop || true;//是否循环滚动
		this.zIndex = 1;
		this.page = elements.find('.item');
		this.len = this.page.length - 1; 
		this.index = $(this).draggable;
		elements.on({
			'touchstart':this.touchStart,
			'touchmove':this.touchMove,
			'touchend':this.touchEnd
		}); 
		this.initMuisc(option);
		this.initDom(option);
	}
	H5.prototype.touchStart = function(e) {
	   	this.dragStart = e.originalEvent.targetTouches[0].clientY;
		this.moveDistance = 0;
	};
	H5.prototype.touchMove = function(e) {
		this.moveDistance = e.originalEvent.targetTouches[0].clientY - this.dragStart;
	};
	H5.prototype.touchEnd = function(e) {
		var that = this;
		if (this.moveDistance <= -30 ) {
			if (this.flag) {
				this.flag = false;
				if (!this.loop) {
					if (++this.pageIndex > len) {
						this.flag = true;
						this.pageIndex = len;
						$('.arrow').hide();
						return
					}
				}else{
					this.pageIndex = ++this.pageIndex > this.len ? 0 : this.pageIndex;
				}
				this.page.eq(this.pageIndex).css({'top': '100%','zIndex': ++this.zIndex,'-webkit-transform':'translate3d(0,0,0)'});
				this.page.eq(this.pageIndex).show();
				this.page.eq(this.pageIndex).transition({y : -this.pageHeight},800,function(){
		 			that.flag = true;
					if (that.pageIndex == 0) {
						that.page.eq(that.len).hide();
					}else{
						that.page.eq(that.pageIndex-1).hide();
					}
				})  
			}
		}else if (this.moveDistance >= 30) {
			if (this.flag) {
				this.flag = false;
				if (!this.loop) {
					if (--this.pageIndex < 0) {
						this.pageIndex = 0;
						this.flag = true;
						$('.arrow').hide();
						return
					}
				}else{
					this.pageIndex = --this.pageIndex < 0 ? this.len : this.pageIndex;
				}
				this.page.eq(this.pageIndex).css({'top': '-100%','zIndex':++this.zIndex,'-webkit-transform':'translate3d(0,0,0)'});
				this.page.eq(this.pageIndex).show();
				this.page.eq(this.pageIndex).transition({y : this.pageHeight},800,function(){
					that.flag = true;
					if (that.pageIndex == that.len) {
						that.page.eq(0).hide()
					}else{
						that.page.eq(that.pageIndex+1).hide();
						if (that.pageIndex+1 == 3) {
						}
					}
				});
			}
		}
	};
	H5.prototype.
	H5.prototype.initMuisc = function(option) {
		if (option.audio) {
			var autoplay = 'autoplay="autoplay"';
			var loopPlay = 'loop="loop"';
			var src = option.audio;  
		}
		if(option.img){
			var musicImg = 'url(' + option.img + ')';
		}
		$('body').append('<div class="bgm playing"><audio id="audio" src='+src+' '+autoplay+' '+loopPlay+'></audio></div>');
		$('.bgm').css({
			width: '48px',
			height: '48px',
			backgroundImage:  musicImg || 'url(http://img.cntapp.com/h5/dragon/assets/music.png)',
			position:'fixed',
			right:'30px',
			top:'30px',
			zIndex:'9999',
			backgroundPosition:'-48px 0'  
		});
		$('.bgm').on('click',function(event) {
			event.stopPropagation();
			if ($(this).hasClass('playing')) {
				$(this).removeClass('playing');
				$(this).css('backgroundPosition', '0 0');
				$('#audio')[0].pause();
			}else{
				$(this).addClass('playing');
				$(this).css('backgroundPosition', '-48px 0');
				$('#audio')[0].play();
			}
		});
		document.addEventListener("WeixinJSBridgeReady", function(){
		    $('#audio')[0].play();
		}, false);
	};
	H5.prototype.initDom = function(option) {
		$('.part').each(function(index, el) {
			$(this).addClass('hide');
		});
		if (option.useArrow) {
			$('body').append('<div class="arrow"></div>');
			$('.arrow').css({
				position:'fixed',
				left:'0',
				bottom:'30px',
				zIndex:'998',
				width: '100%',
				height: '40px',
				background:'url(http://img.cntapp.com/h5/arrow_down.png) no-repeat center',
				'-webkit-animation' : '1s arrow_ ease infinite'
			});
		}
	};
	if (typeof module !== 'undefined' && typeof exports === 'object') {
	    module.exports = H5;
	} else {
	    window.H5 = H5;
	}
})()





