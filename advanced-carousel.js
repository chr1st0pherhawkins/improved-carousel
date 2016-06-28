
(function($){

	var defaults = {

		waitTime:4000

	};

 //Relating the javascript to the html classes
  function LSAdvancedSlider(element, setting)
  {
    this.options = {};
    this.element = element;

    this.carouselOuter = this.element;

    $.extend(this.options, defaults, setting);

    this.autoSlide = this.options.autoSlide;

    this.carouselInner = $(this.options.carouselInner); 

    this.wrapper = $(this.options.wrapper);

    this.leftTransparentElement= $(this.options.leftTransparentElement);

    this.rightTransparentElement = $(this.options.rightTransparentElement);

    this.TransparentWidth = this.rightTransparentElement.width();

    this.customHeight = this.options.customHeight;

    this.carouselItem = this.options.carouselItem;

    this.singleImageWidth = this.carouselOuter.width() - (this.leftTransparentElement.width() + this.rightTransparentElement.width());

    this.leftLink = $(this.options.leftLink);

    this.rightLink = $(this.options.rightLink);

    this.scrollButtonsContainer = $(this.options.scrollButtonsContainer);

    this.scrollButtonClass = this.options.scrollButtonClass;



    this.init();
  }

  LSAdvancedSlider.prototype.init = function()
  {
   var parent = this;
   numberOfImages = $(parent.carouselItem).length;

   $(parent.carouselItem).width(parent.singleImageWidth);
   parent.wrapper.width(numberOfImages * parent.singleImageWidth);

   parent.carouselInner.height(parent.customHeight).width(parent.singleImageWidth);
   parent.leftTransparentElement.height(parent.customHeight);
   parent.rightTransparentElement.height(parent.customHeight);
   $(parent.carouselItem).height(parent.customHeight);

   $(parent.carouselItem).eq($(parent.carouselItem).length - 1).

   insertBefore($(parent.carouselItem).eq(0));

   var originalWaitTime = parent.waitTime;
   parent.waitTime = 0;
   parent.slideLeft();
   parent.waitTime = originalWaitTime;

   var linkHeight = parent.leftLink.height();
   var leftLinkContainerHeight = parent.carouselInner.height();

   parent.leftLink.css({"top": (leftLinkContainerHeight - linkHeight)/2 + "px"}).on("click", function(){
    parent.slideRight.call(parent);
  });
   parent.rightLink.css({"top": (leftLinkContainerHeight - linkHeight)/2 + "px"}).on("click", function(){
    parent.slideLeft.call(parent);
  });
 };

 LSAdvancedSlider.prototype.slideLeft = function(){

  var parent = this;

  if(parseInt(parent.wrapper.css("left").replace("px","")) == -(parent.singleImageWidth))
{
  var first = $(parent.carouselItem).first();
  var last = $(parent.carouselItem).last();

  first.insertAfter(last);

  var originalWaitTime = parent.waitTime;
  parent.waitTime = 0;
  parent.wrapper.animate({"left": "+=" + parent.singleImageWidth + "px"}, parent.waitTime);
  parent.waitTime = originalWaitTime;
}

  parent.wrapper.animate({"left": "-=" + parent.singleImageWidth}, parent.waitTime)


};



LSAdvancedSlider.prototype.slideRight = function(){

  var parent = this;
  

 if(parseInt(parent.wrapper.css("left").replace("px","")) == - (parent.singleImageWidth))
 {
  var first = $(parent.carouselItem).first();
  var last = $(parent.carouselItem).last();

  last.insertBefore(first);

  var originalWaitTime = parent.waitTime;
  parent.waitTime = 0;
  parent.wrapper.animate({"left": "-=" + parent.singleImageWidth + "px"}, parent.waitTime);
  parent.waitTime = originalWaitTime;
}


  parent.wrapper.animate({"left": "+=" + parent.singleImageWidth + "px"}, parent.waitTime);

  



};




$.fn.advancedCarousel = function(setting){

	var  $this = this;

 new LSAdvancedSlider($this, setting);

 return $this;

}

})(jQuery)