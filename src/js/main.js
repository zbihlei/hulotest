document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector('.slides');
    const slideWidth = slides.offsetWidth; 
    const slideCount = 2; 
    const itemCount = 1; 
    let currentIndex = 0;

    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1; 
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

    fetch('https://api.vimeo.com/videos/824804225', {
        headers: {
            'Authorization': 'Bearer 7f6f4cd80bc7643fa09c71fd5a3408ca'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('error');
        }
        return response.json();
    })
	.then(data => {
		const videoUrl = data.embed.html.match(/src="([^"]+)"/)[1]; 
		const allSlides = document.querySelectorAll('.slide');
		allSlides.forEach(slide => {
			for (let i = 0; i < itemCount; i++) { 
				const item = document.createElement('div');
				item.classList.add('item');
	
				const iframe = document.createElement('iframe');
				iframe.setAttribute('src', `${videoUrl}?autoplay=1&controls=0`);
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute('allow', 'autoplay; fullscreen');
				iframe.setAttribute('allowfullscreen', '');
	
				item.appendChild(iframe);
				slide.appendChild(item);
			}
		});
	
	})
    .catch(error => console.error('Error:', error));


    function openModal(videoUrl) {
        const modal = document.getElementById('videoModal'); 
        const modalContent = modal.querySelector('.modal-content');
        const iframe = modalContent.querySelector('iframe'); 
        iframe.src = videoUrl; 
        modal.style.display = 'block'; 

        modal.addEventListener('click', function () {
            modal.style.display = 'none';
            iframe.src = ''; 
        });
    }
});
