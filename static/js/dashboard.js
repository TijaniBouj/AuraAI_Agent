$(function(){
  $('.card_more_button').on('click',
    function() {
      $(this).closest('.card').toggleClass('card_full');
      $(this).siblings('.card_more_content').slideToggle('fast');
      $(this).toggleClass('flipY');
    }
   )
}(jQuery));