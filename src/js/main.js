// document.addEventListener("DOMContentLoaded", function () {
//     const slides = document.querySelector('.slides');
//     const slideWidth = slides.offsetWidth / 4; // Ширина каждого слайда
//     const slideCount = 2; // Всего два слайда
//     const itemCount = 4; // Количество элементов на слайде
//     let currentIndex = 0;
  
//     function goToSlide(index) {
//       if (index < 0) {
//         index = slideCount - 1; // Если индекс меньше 0, переходим к последнему слайду
//       } else if (index >= slideCount) {
//         index = 0; // Если индекс больше или равен количеству слайдов, переходим к первому слайду
//       }
//       slides.style.transform = `translateX(-${index * slideWidth * itemCount}px)`;
//       currentIndex = index;
//     }
  
//     function prevSlide() {
//       goToSlide(currentIndex - 1);
//     }
  
//     function nextSlide() {
//       goToSlide(currentIndex + 1);
//     }
  
//     document.querySelector('.prev').addEventListener('click', prevSlide);
//     document.querySelector('.next').addEventListener('click', nextSlide);
// });


// с окном

document.addEventListener("DOMContentLoaded", function () {
	const slides = document.querySelector('.slides');
	const slideWidth = slides.offsetWidth / 4; // Ширина каждого слайда
	const slideCount = 2; // Всего два слайда
	const itemCount = 4; // Количество элементов на слайде
	let currentIndex = 0;

	function goToSlide(index) {
		if (index < 0) {
			index = slideCount - 1; // Если индекс меньше 0, переходим к последнему слайду
		} else if (index >= slideCount) {
			index = 0; // Если индекс больше или равен количеству слайдов, переходим к первому слайду
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

	const items = document.querySelectorAll('.item');
	items.forEach(item => {
		item.addEventListener('click', function () {
			const imageUrl = this.dataset.src;
			openModal(imageUrl);
		});
	});

	function openModal(imageUrl) {
		const modal = document.createElement('div');
		modal.classList.add('modal');
		const modalContent = document.createElement('div');
		modalContent.classList.add('modal-content');
		const image = document.createElement('img');
		image.src = imageUrl;
		modalContent.appendChild(image);
		modal.appendChild(modalContent);
		document.body.appendChild(modal);
		modal.style.display = 'block';

		modal.addEventListener('click', closeModal);
		window.addEventListener('keydown', handleKeyPress);

		function closeModal() {
			modal.removeEventListener('click', closeModal);
			window.removeEventListener('keydown', handleKeyPress);
			modal.parentNode.removeChild(modal);
		}

		function handleKeyPress(event) {
			if (event.key === 'Escape') {
				closeModal();
			}
		}
	}
});




