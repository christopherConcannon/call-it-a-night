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

// Global variable to grab the Current Time
var currentTime = moment().format('hh:mm:ss');
console.log(currentTime)



