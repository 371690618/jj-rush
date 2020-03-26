/*获取元素方法*/
var getElem = function( selector ){
	return document.querySelector( selector );
}
var getAllElem = function( selector ){
	return document.querySelectorAll( selector );
}

/*获取元素样式方法*/
var getCls = function( element ){
	return element.getAttribute('class');
}

/*设置元素样式方法*/
var setCls = function( element , cls ){
	return element.setAttribute('class',cls);
}

/*为元素添加样式*/
var addCls = function( element , cls ){
	var basCls = getCls( element );
	if( basCls.indexOf(cls) === -1){
		setCls( element , basCls+' '+cls);
	}
	return;
}

/*为元素删除样式*/
var delCls =function( element , cls ){
	var basCls = getCls( element );
	if(basCls.indexOf(cls) > -1){// 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
      //split将字符串以cls为分隔符转化为数组，join以空格为分隔符转化为字符串，再用replace加正则将多个空格转化为一个空格。
      setCls( element,basCls.split(cls).join(' ').replace(/\s+/g,' ') );	
	}
	return;
}

/*需要添加动画的对象*/
var screenAnimateElements = {
	'.screen-1' : [
	  '.screen-1__heading',
	  '.screen-1__subheading'
	],
	'.screen-2' : [
      '.screen-2__heading',
      '.screen-2__subheading',
      '.screen-2__underliner',
      '.screen-2__photo_i_1',
      '.screen-2__photo_i_2',
      '.screen-2__photo_i_3'
	],
	'.screen-3' : [
      '.screen-3__heading',
      '.screen-3__underliner',
      '.screen-3__subheading',
      '.screen-3__photo',
      '.screen-3__button',
      '.screen-3__button_i_1',
      '.screen-3__button_i_2',
      '.screen-3__button_i_3',
      '.screen-3__button_i_4',
      '.screen-3__button_i_5'
	],
	'.screen-4' : [
      '.screen-4__heading',
      '.screen-4__underliner',
      '.screen-4__subheading',
      '.screen-4__item_i_1',
      '.screen-4__item_i_2',
      '.screen-4__item_i_3',
      '.screen-4__item_i_4'
	],
	'.screen-5' : [
      '.screen-5__heading',
      '.screen-5__underliner',
      '.screen-5__subheading',
      '.screen-5__photo'
	],
	'.header' : [
      '.header'
	],
  'outLine' : [
      '.outLine',
      '.outLine__item'
  ]
};

/*设置init方法*/
var setScreenAnimateInit = function(screenCls){
    var screen = document.querySelector( screenCls ); //获取当前屏元素
    var animateElements = screenAnimateElements[ screenCls ]; //需要设置动画的元素（数组形式）
    for(var i = 0,len = animateElements.length;i < len;i++){
    	    var element = document.querySelector( animateElements[i]);
    	    var basCls = element.getAttribute('class');
    	    element.setAttribute('class',basCls+' '+animateElements[i].substr(1)+'_animate_init');
    }
}

/*第一步：初始化设置*/
window.onload = function(){
	//  为所有元素设置 init 
	for( k in screenAnimateElements){
		if(k == '.screen-1'){
			continue;
		}else if(k == '.screen-2'){
            continue;//因为有过度效果，刷新会看到为screen-2添加init时的消失效果，故手动为screen-2添加init。
		}else{
			setScreenAnimateInit(k);
		}
	}
	console.log('onload');
}
//手动为第一屏添加done，使用超时调用
setTimeout(function(){
    palyScreenAnimateDone('.screen-1');
    palyScreenAnimateDone('.header');
},1000);


//第二步：滚动条设置
function palyScreenAnimateDone(screenCls){
	var screen = document.querySelector( screenCls ); //获取当前屏元素
    var animateElements = screenAnimateElements[ screenCls ]; //需要设置动画的元素（数组形式）
    for(var i = 0 , len = animateElements.length; i < len ; i++){
        	var element = document.querySelector( animateElements[i] );
    	    var basCls = element.getAttribute('class');
    	    element.setAttribute('class',basCls.replace('_animate_init','_animate_done'));
    }
}
//获取导航栏全部元素
var navItems = getAllElem('.header__nav-item');
//获取右侧大纲全部元素
var outLineItems = getAllElem('.outLine__item');
//获取导航栏的下划线
var navTip = getElem('.header__nav-tip');

//设置导航栏激活状态下的字体颜色和下划线
var switchNavItemsActive = function(idx){
  for(var i=0;i<navItems.length;i++){
    delCls(navItems[i] , 'header__nav-item_status_active');
    navTip.style.left= 0 +'px';
  }
  addCls(navItems[idx] , 'header__nav-item_status_active');
  navTip.style.left= (idx*96)+'px';
}

//手动执行一次导航样式，令页面刷新时默认active在第一个
switchNavItemsActive( 0 );

//绑定页面滚动事件
window.onscroll = function(){
  //兼容性写法，部分浏览器的top会一直为0
	var top  = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(top);
    //设置导航条滚动变色
    if( top > 100 ){
    	addCls( getElem('.header') , 'header_animate_active' );
      addCls( getElem('.outLine') , 'outLine_animate_active' );
    }else{
    	delCls( getElem('.header') , 'header_animate_active' );
      delCls( getElem('.outLine') , 'outLine_animate_active' );
    }
  //页面滚动到哪播放到哪，导航栏跟随页面滚动而滚动显示
  if( top >= 0 ){
    switchNavItemsActive( 0 );
  }
	if( top > (640*1-100) ){
		palyScreenAnimateDone('.screen-2');
    switchNavItemsActive( 1 );
	}
	if( top > (640*2-100) ){
		palyScreenAnimateDone('.screen-3');
    switchNavItemsActive( 2 );
	}
	if( top > (640*3-100) ){
		palyScreenAnimateDone('.screen-4');
    switchNavItemsActive( 3 );
	}
	if( top > (640*4-100) ){
		palyScreenAnimateDone('.screen-5');
    switchNavItemsActive( 4 );
	}
}

/*第三步：点击航栏、侧边栏和底部按钮跳转*/
//获取底部按钮
var otherBtn = getElem('.other__button');
//设置跳转方法
var setNavJump = function( i , lib ){
    var elem = lib[i];
    elem.addEventListener( 'click' , function(){
      document.documentElement.scrollTop = 640*i+1;
      //兼容性写法，避免一些浏览器不支持document.documentElement.scrollTop
     /* if(document.documentElement.scrollTop){
        document.documentElement.scrollTop = 640*i+1;
      }else if(document.body.scrollTop){
        document.body.scrollTop = 640*i+1;
      }*/
    });
}
//顶部导航跳转
for(var i = 0,len = navItems.length;i<len;i++){
    setNavJump( i , navItems);
}
//右侧大纲跳转
for(var i = 0,len = outLineItems.length;i<len;i++){
    setNavJump( i , outLineItems);
}
//底部按钮跳转
otherBtn.addEventListener('click',function(){
  document.documentElement.scrollTop = 1;
})


/*第四步：滑动门特效*/
var setTip = function( idx , lib ){
  lib[idx].addEventListener('mouseover',function(){
    navTip.style.left=(idx*96)+'px';
  })
  
  var currentTip = 0;
  lib[idx].addEventListener('mouseout',function(){
     for(var i =0;i<navItems.length;i++){
        if(getCls( lib[i] ).indexOf('header__nav-item_status_active') > -1){
          currentTip = i;
          break;
        }
     }
      navTip.style.left=(currentTip*96)+'px';
  })
}

for(var i=0;i<navItems.length;i++){
  setTip( i , navItems);
}