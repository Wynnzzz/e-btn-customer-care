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

// Image Slider CS
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("service-container");
  const leftButton = document.getElementById("left-button1");
  const rightButton = document.getElementById("right-button1");

  const slides = [
    {
      title: "Proses Kredit Dokumen Tidak Langsung Keluar",
      icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M9.9 17.1L14 13M9.9 12.9L14 17"/>',
    },
    {
      title: "Kredit Jatuh Tempo Tidak Otomatis Paid Off",
      icon: '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18 2.5a2 2 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />',
    },

    {
      title: "KPR Inden: Rumah Belum Dibangun",
      icon: '<path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>',
    },
    {
      title: "Kenaikan Suku Bunga Kredit",
      icon: '<path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />',
    },
    {
      title: "Aplikasi Bale By BTN Terblokir",
      icon: '<path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />',
    },
    {
      title: "Kegagalan Transaksi Sistem",
      icon: '<path d="M6 18 18 6M6 6l12 12" />',
    },
    {
      title: "Gagal Pembayaran di BTN Mobile",
      icon: '<path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />',
    },
    {
      title: "ATM Expired / Hilang / Rusak",
      icon: '<path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/>',
    },
    {
      title: "Reset Pin ATM",
      icon: '<path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>',
    },
  ];

  function createSlide(slideData) {
    return `
        <div class="flex-none w-1/2 md:w-1/5 px-2">
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

  const SLIDE_WIDTH = 20; // 20% karena w-1/5
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
    const cloneCount = slides.length; // Satu set slide asli di awal dan akhir

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
    currentTranslate = -cloneCount * SLIDE_WIDTH;
    updatePosition(false);
  }

  function updatePosition(smooth = true) {
    container.style.transition = smooth ? "transform 0.3s ease-in-out" : "none";
    container.style.transform = `translateX(${currentTranslate}%)`;
  }

  function checkBoundary() {
    const totalSlides = container.children.length;
    const cloneCount = slides.length; // Jumlah slide kloning di awal/akhir
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
});

// Image Container I Care Room

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("icare-container");
  const leftButton = document.getElementById("left-button2");
  const rightButton = document.getElementById("right-button2");

  const slides = [
    {
      title: "Sertifikat Rumah Belum Jadi Saat Kredit Sudah Lunas",
      icon: '<path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"/>',
    },
    {
      title: "Asuransi Kredit Belum Cair",
      icon: '<path d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
    },
    {
      title: "Rekening Terkena Indikasi Skimming",
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

  const SLIDE_WIDTH = 25; // 25% karena w-1/4
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
    const cloneCount = slides.length; // Satu set slide asli di awal dan akhir

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
    currentTranslate = -cloneCount * SLIDE_WIDTH;
    updatePosition(false);
  }

  function updatePosition(smooth = true) {
    container.style.transition = smooth ? "transform 0.3s ease-in-out" : "none";
    container.style.transform = `translateX(${currentTranslate}%)`;
  }

  function checkBoundary() {
    const totalSlides = container.children.length;
    const cloneCount = slides.length; // Jumlah slide kloning di awal/akhir
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
});

// Tentang Kami Image

const cardData = {
  "btn-care": {
    title: "E-BTN Customer Care",
    steps: [
      {
        title: "1. Pemindaian QR-Code",
        content:
          "Nasabah melakukan pemindaian QR-Code tersedia pada meja nomor antrian yang nantinya akan tersambung pada web E-BTN Customer Care. Nasabah diarahkan pada ruang tunggu / antrian dan bisa mengakses web BTN Care guna mendapatkan informasi klaim baik terkait permasalahan Tabungan, Investasi, hingga Kredit.",
      },
      {
        title: "2. Informasi Layanan dan Pengaduan",
        content:
          "E-BTN Customer Care memberikan informasi layanan dan pengaduan nasabah serta dilengkapi dengan FAQ (Frequently Asked Questions). Melalui fitur ini, nasabah akan mendapatkan tiket nomor antrian untuk mendapatkan pelayanan di meja layanan Customer Service / Loan Service ataupun pada ruang I-Care Room.",
      },
    ],
  },
  "i-care": {
    title: "I-Care Room",
    steps: [
      {
        title: "Pelayanan di I-Care Room",
        content:
          "Nasabah yang telah mendapatkan tiket khusus untuk melanjutkan proses klaim akan diarahkan pada I-Care Room guna mendapatkan pelayanan yang tepat dan cepat sesuai yang dibutuhkan oleh nasabah sampai permasalahan terselesaikan.",
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
