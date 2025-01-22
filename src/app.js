const faqs = document.querySelectorAll(".faq");

document.querySelectorAll(".border").forEach((faq) => {
  faq.addEventListener("click", (event) => {
    event.stopPropagation(); // Mencegah event bubbling

    // Jika FAQ sudah aktif, tutup dan hentikan video (jika ada)
    if (faq.classList.contains("active")) {
      faq.classList.remove("active");
      const video = faq.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    } else {
      // Aktifkan FAQ yang diklik dan nonaktifkan lainnya
      faq.classList.add("active");
      document.querySelectorAll(".border").forEach((otherFaq) => {
        if (otherFaq !== faq) {
          otherFaq.classList.remove("active");
          const video = otherFaq.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0; // Reset video
          }
        }
      });
    }
  });
});

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const faqContainer = document.getElementById("faq-container");
  let hasScrolled = false;

  function onScroll() {
    if (!hasScrolled && window.scrollY > 50) {
      // Trigger ketika scroll lebih dari 50px
      faqContainer.classList.add("visible");
      hasScrolled = true;
      window.removeEventListener("scroll", onScroll); // Hapus event listener setelah animasi
    }
  }

  window.addEventListener("scroll", onScroll);
});


// Image Container I Care Room

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("icare-container");
  const leftButton = document.getElementById("left-button2");
  const rightButton = document.getElementById("right-button2");

  const slides = [
    {
      title: "Pengambilan Sertifikat Rumah",
      icon: '<path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"/>',
    },
    {
      title: "Asuransi Kredit Belum Cair",
      icon: '<path d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
    },
    {
      title: "Rekening Terindikasi Skimming",
      icon: '<path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/>',
    },
    {
      title: "Pengajuan Klaim Asuransi",
      icon: '<path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />',
    },
  ];

  function createSlide(slideData) {
    return `
        <div class="flex-none w-1/2 md:w-1/4 px-2">
          <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="text-red-600 mb-4">
              <svg class="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${slideData.icon}
              </svg>
            </div>
            <h3 class="text-center text-sm font-medium text-gray-800 h-10">${slideData.title}</h3>
          </div>
        </div>
      `;
  }

  // Function to get slide width based on screen size
  function getSlideWidth() {
    return window.innerWidth < 768 ? 50 : 25; // 50% for mobile, 20% for desktop
  }

  let SLIDE_WIDTH = getSlideWidth();
  let currentTranslate = 0;
  let isDragging = false;
  let isTransitioning = false;

  function initializeSlides() {
    // Clear container
    container.innerHTML = "";

    // Add initial slides
    slides.forEach((slide) => {
      container.insertAdjacentHTML("beforeend", createSlide(slide));
    });

    // Clone slides and add to beginning and end
    const cloneCount = slides.length;

    // Clone for beginning
    for (let i = 0; i < cloneCount; i++) {
      const slideToClone = slides[slides.length - 1 - (i % slides.length)];
      container.insertAdjacentHTML("afterbegin", createSlide(slideToClone));
    }

    // Clone for end
    for (let i = 0; i < cloneCount; i++) {
      const slideToClone = slides[i % slides.length];
      container.insertAdjacentHTML("beforeend", createSlide(slideToClone));
    }

    // Set initial position to show first original slide
    SLIDE_WIDTH = getSlideWidth();
    currentTranslate = -cloneCount * SLIDE_WIDTH;
    updatePosition(false);
  }

  function updatePosition(smooth = true) {
    container.style.transition = smooth ? "transform 0.3s ease-in-out" : "none";
    container.style.transform = `translateX(${currentTranslate}%)`;
  }

  function checkBoundary() {
    const totalSlides = container.children.length;
    const cloneCount = slides.length;
    const originalSlidesStart = cloneCount;
    const originalSlidesEnd = totalSlides - cloneCount;

    const currentIndex = -currentTranslate / SLIDE_WIDTH;

    if (currentIndex >= originalSlidesEnd) {
      currentTranslate = -(originalSlidesStart * SLIDE_WIDTH);
      updatePosition(false);
    } else if (currentIndex < originalSlidesStart) {
      currentTranslate = -(originalSlidesEnd - 1) * SLIDE_WIDTH;
      updatePosition(false);
    }
  }

  function slide(direction) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentTranslate += direction * SLIDE_WIDTH;
    updatePosition(true);

    setTimeout(() => {
      checkBoundary();
      isTransitioning = false;
    }, 300);
  }

  // Initialize slider
  initializeSlides();

  // Event Listeners
  leftButton.addEventListener("click", () => slide(1));
  rightButton.addEventListener("click", () => slide(-1));

  // Handle resize
  window.addEventListener('resize', () => {
    SLIDE_WIDTH = getSlideWidth();
    initializeSlides();
  });
});

// Tentang Kami Image

const cardData = {
  "btn-care": {
    title: "E-BTN Customer Care",
    steps: [
      {
        title: "1. Pemindaian QR-Code",
        content:
          "Nasabah melakukan pemindaian QR-Code tersedia pada meja nomor antrian yang nantinya akan tersambung pada web E-BTN Customer Care. Nasabah diarahkan pada ruang tunggu / antrian dan bisa mengakses web BTN Care guna mendapatkan informasi pengaduan baik terkait permasalahan Tabungan, Investasi, hingga Kredit.",
      },
      {
        title: "2. Informasi Layanan dan Pengaduan",
        content:
          "E-BTN Customer Care memberikan informasi layanan dan pengaduan nasabah serta dilengkapi dengan FAQ (Frequently Asked Questions). Melalui fitur ini, nasabah akan mendapatkan tiket nomor antrian untuk mendapatkan pelayanan di ruang I-Care Room.",
      },
    ],
  },
  "i-care": {
    title: "I-Care Room",
    steps: [
      {
        title: "Pelayanan di I-Care Room",
        content:
          "Nasabah yang telah mendapatkan tiket khusus untuk melanjutkan proses pengaduan akan diarahkan pada I-Care Room guna mendapatkan pelayanan yang cepat dan tepat sesuai dengan kebutuhan nasabah hingga permasalahan terselesaikan.",
      },
    ],
  },
};

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const cards = document.querySelectorAll(".card");

function showModal(cardId) {
  const data = cardData[cardId];
  modalTitle.textContent = data.title;

  modalContent.innerHTML = data.steps
    .map(
      (step) => `
                <div class="text-justify">
                    <h3 class="text-lg font-semibold text-gray-700 mb-2">${step.title}</h3>
                    <p class="text-gray-600 leading-relaxed">${step.content}</p>
                </div>
            `
    )
    .join("");

  modal.classList.add("active");
}

function hideModal() {
  modal.classList.remove("active");
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const cardId = card.dataset.card;
    showModal(cardId);
  });
});

closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    hideModal();
  }
});
