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
