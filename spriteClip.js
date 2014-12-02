var spriteClip = function (dom,w,h,time){
	if(dom){
		this.dom = dom;
		this.w = w ||0;
		this.h = h ||0;
		this.time = time || 0;
		this.display = this.dom.style.display;
		this.played = false;
	}else{
		return false;
	}
}
spriteClip.prototype.run = function(){
	if(this.played)
		return false;
	this.played = true;
	this.show();
	for(var w=0;w<this.w;w++){
		for(var h =0;h<this.h;h++){
			(function(w,h,self){
				var time = (h*self.time*self.w+w*self.time);
				setTimeout(function(){
					self.dom.style.webkitMaskPosition = (100/(self.w-1))*w+'% '+(100/(self.h-1))*h+'%';
					if(w >= self.w-1 && h>=self.h-1){
						var event = document.createEvent('HTMLEvents');
	                    event.initEvent('finish', true, true);
	                    event.eventType = 'message';
	                    event.content =  'finish';
	                    self.dom.dispatchEvent(event);
					}
				},time);
			})(w,h,this);
		}
	}
}
spriteClip.prototype.hide = function(){
	this.dom.style.display = 'none';
}
spriteClip.prototype.show = function(){
	this.dom.style.display = this.display;
}
spriteClip.prototype.finish = function(callback){
	this.dom.addEventListener('finish',callback);
}