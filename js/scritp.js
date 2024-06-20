 let currentImageIndex = 0;

        const colors = ['#665F55', '#C1B6AD', '#C1B6AD'];
        const images = ['image/coffee-slider-1.png', 'image/coffee-slider-2.png', 'image/coffee-slider-3.png'];
        const names = ["S’mores Frappuccino", "Latte", "Espresso"];
        const descriptions = [
    "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice."];
        const prices = ["$5.50", "$5.00", "$4.50"];
        function recolor(imageIndex) {
            document.getElementById('cont').style.backgroundColor = colors[imageIndex];
        }

        function updateIndicators() {
            const indicators = document.querySelectorAll('.controls');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentImageIndex+1);
            });
        }

        function updateContent() {
            

            document.getElementById('h1name').innerText = names[currentImageIndex];
            document.getElementById('h2description').innerText = descriptions[currentImageIndex];
            document.getElementById('h3price').innerText = prices[currentImageIndex];
            // Убираем класс 'in' для плавного исчезновения текста
            h1name.classList.remove('in');
            h2description.classList.remove('in');
            h3price.classList.remove('in');
            // Ждем завершения анимации исчезновения
            setTimeout(() => {
                h1name.innerText = names[currentImageIndex];
                h2description.innerText = descriptions[currentImageIndex];
                h3price.innerText = prices[currentImageIndex];
                // Добавляем класс 'in' для плавного появления текста
                h1name.classList.add('in');
                h2description.classList.add('in');
                h3price.classList.add('in');
            }, 100);
        }

        function changeImage(direction) {
            const imageElement = document.getElementById('slider_1');
            currentImageIndex += direction;
            if (currentImageIndex < 0) currentImageIndex = images.length - 1;
            if (currentImageIndex >= images.length) currentImageIndex = 0;

            const translateX = direction === -1 ? '100%' : '-100%';
            imageElement.style.transform = `translateX(${translateX})`;

            setTimeout(() => {
                imageElement.style.transition = 'none';
                imageElement.style.transform = `translateX(${direction === -1 ? '-100%' : '100%'})`;
                imageElement.src = images[currentImageIndex];
                recolor(currentImageIndex);
                updateIndicators();
                updateContent();

                setTimeout(() => {
                    imageElement.style.transition = 'transform 0.5s';
                    imageElement.style.transform = 'translateX(0)';
                }, 20);
            }, 500);
        }

        document.getElementById('next').addEventListener('click', function() {
            changeImage(1);
        });

        document.getElementById('prev').addEventListener('click', function() {
            changeImage(-1);
        });

        // Инициализация индикаторов при загрузке страницы
        updateIndicators();
        updateContent();

         // Выберите все ссылки с хэшами
    $('a[href*="#"]')
    // Удалить ссылки, которые на самом деле ни на что не ссылаются
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // Ссылки на странице
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Определите элемент, к которому нужно перейти
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Существует ли цель прокрутки?
            if (target.length) {
                // Предотвращать использование по умолчанию можно только в том случае, если анимация действительно должна произойти
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Обратный вызов после анимации
                    // Необходимо изменить фокус!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Проверка того, была ли цель сфокусирована
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Добавление tabindex для элементов, которые нельзя сфокусировать
                        $target.focus(); // Снова установите фокусировку
                    };
                });
            }
        }
    });