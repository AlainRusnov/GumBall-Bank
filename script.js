'use strict';

////////////////////////////////////////////////////////
// GUMBALL BANK by Alain Rusnov
////////////////////////////////////////////////////////

///////////////////////////////////////
// Modal window
///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// replaced with above ^
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////
// Cookie message for Dashboard
///////////////////////////////////////////////////////

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'Fully functional Demo account Dashboard coming soon.';
message.innerHTML = 'Fully functional Demo account Dashboard coming soon.<button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  // message.remove();
  message.parentElement.removeChild(message);
});
// styles
message.style.backgroundColor = '#37383d';
message.style.width = '98.5vw';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


////////////////////////////////////////////////////////
// "LEARN MORE" smooth scroll
////////////////////////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
  section1.scrollIntoView({behavior: 'smooth'});
});

/////////////////////////////////////////////////////////
// Site navigation
///////////////////////////////////////////////////////////

// 1. Add event listener to common parent elements
// 2. determine what element originated that events

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
  }
});

/////////////////////////////////////////////////////////
// Menu fade animation
/////////////////////////////////////////////////////////

const nav = document.querySelector('.nav');

const handleHover = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link)
      el.style.opacity = this; // switched to "this" from binded value
    });
    logo.style.opacity = this;
  };
};

// Binded a value to pass into handler function
nav.addEventListener('mouseover', handleHover.bind(0.75));
nav.addEventListener('mouseout', handleHover.bind(1));




///////////////////////////////////////////////////////////
// Tabbed component
//////////////////////////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if(!clicked) return;

  // Remove active
  tabs.forEach( t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');

});

////////////////////////////////////////////////////////
// Sticky Navigation
////////////////////////////////////////////////////////

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}


const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////////////////////
// Reveal Sections
///////////////////////////////////////////////////////

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});


allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//////////////////////////////////////////////////////////
// Lazy loading images
///////////////////////////////////////////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));


//////////////////////////////////////////////////////////
// Testimonials Slider
//////////////////////////////////////////////////////////

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;


  const createDots = function() {
    slides.forEach(function(_,i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };
  // createDots();

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };
  // activateDot(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s,i) => (s.style.transform = `translateX(${100 * ( i - slide)}%)`)
    );
  };
  // goToSlide(0);

  // Next slide
  const nextSlide = function () {
    if(currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Previous Slide
  const previousSlide = function() {
    if(currentSlide === 0){
      currentSlide = maxSlide - 1;
    } else {
    currentSlide--;
    };
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  const init = function() {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);
  // currentSlide = 1: -100%, 0%, 100%, 200%

  // Slider Dots

  document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowLeft') previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function(e) {
    if ( e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    };
  });

};
slider();







