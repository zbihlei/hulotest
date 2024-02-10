document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector('.slides');
    const slideWidth = slides.offsetWidth / 4; // Ширина каждого слайда
    const slideCount = 2; // Всего два слайда
    const itemCount = 4; // Количество элементов на слайде
    let currentIndex = 0;

    // Функция для перемещения к нужному слайду
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - itemCount; // Если индекс меньше 0, переходим к последнему слайду
        } else if (index >= slideCount) {
            index = 0; // Если индекс больше или равен количеству слайдов, переходим к первому слайду
        }
        slides.style.transform = `translateX(-${index * slideWidth * itemCount}px)`;
        currentIndex = index;
    }

    // Функции для перемещения к предыдущему и следующему слайду
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Добавляем обработчики событий для кнопок
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    // Fetch запрос для получения данных о видео
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
        const videoUrl = data.embed.html.match(/src="([^"]+)"/)[1]; // Получаем URL встроенного видео

        // Добавляем видео к каждому слайду
        const allSlides = document.querySelectorAll('.slide');
        allSlides.forEach(slide => {
            for (let i = 0; i < itemCount; i++) {
                const item = document.createElement('div');
                item.classList.add('item');
                item.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
                slide.appendChild(item);
            }
            // Добавляем обработчик события клика на слайд
            slide.addEventListener('click', function() {
                openModal(videoUrl);
            });
        });
    })
    .catch(error => console.error('Error:', error));

    // Функция для открытия модального окна
    function openModal(videoUrl) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
});
