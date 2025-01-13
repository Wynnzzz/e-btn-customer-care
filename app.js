const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
    faq.addEventListener("click", (event) => {
        event.stopPropagation()

        if (faq.classList.contains("active")) {
            faq.classList.remove("active");
            const video = faq.querySelector('video');
            if (video) {
                video.pause(); 
                video.currentTime = 0; 
            }
        } else {
            faq.classList.add("active");
            faqs.forEach((otherfaq) => {
                if (otherfaq !== faq) {
                    otherfaq.classList.remove("active");
                    const video = otherfaq.querySelector('video');
                    if (video) {
                        video.pause();
                    }
                }
            });
        }
    });
});

document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const faqContainer = document.getElementById('faq-container');
    let hasScrolled = false;

    function onScroll() {
      if (!hasScrolled && window.scrollY > 50) { // Trigger ketika scroll lebih dari 50px
        faqContainer.classList.add('visible');
        hasScrolled = true;
        window.removeEventListener('scroll', onScroll); // Hapus event listener setelah animasi
      }
    }

    window.addEventListener('scroll', onScroll);
  });
