腾讯Burberry线上营销页面特效
============

4月24日，Burberry亚太地区规模最大的旗舰店在上海开幕。Burberry突破性地运用了诸多创新的数字营销模式，借助与腾讯的合作，为更多未能到场的用户创造了一个“平行的体验”，也正式开启了Burberry的创新数字营销之旅。  

腾讯的营销页面：
![最终效果](https://raw.githubusercontent.com/cyclegtx/burberryshow/master/images/txqr.png)

其中多次用到了类似于云雾褪去的效果，如下图。  
![最终效果](https://raw.githubusercontent.com/cyclegtx/burberryshow/master/images/xg.gif)  
我对这种神奇的特效产生的极大的兴趣，于是通过chrome的审查元素里面Resources找到下面这张图片（由于图片是白色的png，为了让大家看清楚我将背景调成了黑色）。  
<img src="https://raw.githubusercontent.com/cyclegtx/burberryshow/master/img/Touch1.png" style="backgroud:#000;" alt=""> 

于是效果的实现方式就显而易见了，是利用css3的```-webkit-mask```来实现的。  
```-webkit-mask```类似于photoshop里面的蒙板，在背景图片上加上一层蒙板，背景中的图片会透过蒙板中的白色部分显示出来，蒙板中的透明部分则遮挡住了背景。  
####Step1.为背景加上蒙板  

```html
<body>
	<div class="stage">
		<div class="sprite1"></div>
	</div>
</body>
```

```css
.stage{
	width: 320px;
	height: 480px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top:-240px;
	margin-left:-160px;
	background: url('./img/bg.jpg') no-repeat;
	background-size: auto 100%;
}
.stage .sprite1{
	width: 100%;
	height: 100%;
	background: url('./img/bg2.jpg') no-repeat;
	background-size: auto 100%;
	-webkit-mask:url('./img/Touch1.png') no-repeat;
	-webkit-mask-size: 100% 100%;
}

```

这里为了在桌面浏览器中观看方便，将画面大小调整成了320*480并居中。在```sprite1```中添加```background```的同时也增加了蒙板。  
```
-webkit-mask:url('./img/Touch1.png') no-repeat;
-webkit-mask-size: 100% 100%;
```  
我们这里将蒙板的大小设置为100%来观察蒙板的效果。图中画圈圈的地方就是sprite1透过蒙板展示出来的部分。  
![最终效果](https://raw.githubusercontent.com/cyclegtx/burberryshow/master/images/1.jpg)  
我们看到这个蒙板```Touch1.png```应该是一个序列帧组成的图片，我们只需要将其一帧帧的显示出来就可以实现动画了。  


