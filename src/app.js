const faqs = document.querySelectorAll(".faq");

document.querySelectorAll('.border').forEach(faq => {
    faq.addEventListener("click", (event) => {
        event.stopPropagation(); // Mencegah event bubbling

        // Jika FAQ sudah aktif, tutup dan hentikan video (jika ada)
        if (faq.classList.contains("active")) {
            faq.classList.remove("active");
            const video = faq.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        } else {
            // Aktifkan FAQ yang diklik dan nonaktifkan lainnya
            faq.classList.add("active");
            document.querySelectorAll('.border').forEach(otherFaq => {
                if (otherFaq !== faq) {
                    otherFaq.classList.remove("active");
                    const video = otherFaq.querySelector('video');
                    if (video) {
                        video.pause();
                        video.currentTime = 0; // Reset video
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
