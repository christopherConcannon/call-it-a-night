  // function to select element like jQuery
  const $ = (target) => {
    const elems = document.querySelectorAll(target)
    return (elems.length > 1) ? elems : document.querySelector(target)
  }

  document.addEventListener('DOMContentLoaded', function(){
    // initialize 
    M.Modal.init($('.modal'));
    M.Datepicker.init($('.datepicker'));
    M.Timepicker.init($('.timepicker'));
    M.Carousel.init($('.carousel'), {
      indicators: true
    });
})





