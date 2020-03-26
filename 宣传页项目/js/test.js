/*测试脚本*/

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
	]
};

/*定义测试脚本*/

function setScreenAnimate( screenCls ){
    var screen = document.querySelector( screenCls ); //获取当前屏元素
    var animateElements = screenAnimateElements[ screenCls ]; //需要设置动画的元素（数组形式）

    var isSetAnimateClass = false;  // 是否有初始化子元素的样式
    var isAnimateDone = false;  // 当前屏幕下所有子元素的状态是DONE？

    screen.onclick = function(){
    	//将所有元素添加初始化状态init
    	if( isSetAnimateClass === false ){
    	    for(var i = 0,len = animateElements.length;i < len;i++){
    	    	var element = document.querySelector( animateElements[i]);
    	    	var basCls = element.getAttribute('class');
    	    	element.setAttribute('class',basCls+' '+animateElements[i].substr(1)+'_animate_init');
    	    }
    	isSetAnimateClass = true;
    	return;
        }
        //为元素添加动画状态done
        if( isAnimateDone === false){
        	for(var i = 0 , len = animateElements.length; i < len ; i++){
        		var element = document.querySelector( animateElements[i] );
    	    	var basCls = element.getAttribute('class');
    	    	element.setAttribute('class',basCls.replace('_animate_init','_animate_done'));
        	}
        	isAnimateDone = true;
        	return;
        }
        //为元素恢复初始状态init
        if( isAnimateDone === true ){
        	for(var i = 0 , len = animateElements.length; i < len ; i++){
        		var element = document.querySelector( animateElements[i] );
    	    	var basCls = element.getAttribute('class');
    	    	element.setAttribute('class',basCls.replace('_animate_done','_animate_init'));
        	}
        	isAnimateDone = false;
        	return;
        }
    }
}


for( k in screenAnimateElements){
	setScreenAnimate(k);
};