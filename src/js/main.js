fetch('https://api.vimeo.com/videos/824804225', {
  headers: {
    'Authorization': 'Bearer 7f6f4cd80bc7643fa09c71fd5a3408ca' 
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  
  const videoUrl = data.embed.html.match(/src="([^"]+)"/)[1];

  const slides = document.querySelector('.slides');
  for (let i = 0; i < 8; i++) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = `<div class="item"><iframe src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>`;
    slides.appendChild(slide);
  }

  const slideWidth = slides.offsetWidth / 4; 
  const slideCount = 2; 
  const itemCount = 4; 
  let currentIndex = 0;

  function goToSlide(index) {
    if (index < 0) {
      index = slideCount - itemCount; 
    } else if (index >= slideCount) {
      index = 0; 
    }
    slides.style.transform = `translateX(-${index * slideWidth * itemCount}px)`;
    currentIndex = index;
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  document.querySelector('.prev').addEventListener('click', prevSlide);
  document.querySelector('.next').addEventListener('click', nextSlide);

  

})
.catch(error => console.error('Error:', error));
