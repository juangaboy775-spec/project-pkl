// Initialize AOS
AOS.init({
  duration: 800,
  once: true
});

// Initialize lightbox
lightbox.option({
  'resizeDuration': 200,
  'wrapAround': true,
  'albumLabel': 'Gambar %1 dari %2'
});

// Preloader
window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelector('.preloader').classList.add('hidden');
  }, 1500);
});

// Show content function
function showContent(id) {
  var contents = document.querySelectorAll(".content");
  contents.forEach(function(c) {
    c.style.display = "none";
  });
  
  // Remove active class from all buttons
  var buttons = document.querySelectorAll(".menu-btn");
  buttons.forEach(function(btn) {
    btn.classList.remove("active");
  });
  
  // Add active class to clicked button
  event.target.classList.add("active");
  
  document.getElementById(id).style.display = "block";
  
  // Refresh AOS for new content
  AOS.refresh();
  
  // Scroll to content
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Show dokumentasi gallery function
function showDokumentasi(category) {
  // Hide all galleries
  var galleries = document.querySelectorAll(".dokumentasi-gallery");
  galleries.forEach(function(gallery) {
    gallery.classList.remove("active");
  });
  
  // Remove active class from all buttons
  var buttons = document.querySelectorAll(".dokumentasi-btn");
  buttons.forEach(function(btn) {
    btn.classList.remove("active");
  });
  
  // Show selected gallery
  document.getElementById(category).classList.add("active");
  
  // Add active class to clicked button
  event.target.classList.add("active");
  
  // Refresh AOS
  AOS.refresh();
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = document.querySelector('.dark-mode-toggle i');
  
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  document.querySelector('.dark-mode-toggle i').classList.remove('fa-moon');
  document.querySelector('.dark-mode-toggle i').classList.add('fa-sun');
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
  const scrollBtn = document.querySelector('.scroll-top');
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add('active');
  } else {
    scrollBtn.classList.remove('active');
  }
});

// Share functions
function shareToFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareToTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Lihat dokumentasi PKL kami di BPS Kota Medan');
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareToWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Lihat dokumentasi PKL kami di BPS Kota Medan: ');
  window.open(`https://wa.me/?text=${text}${url}`, '_blank');
}

function shareToInstagram() {
  // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link telah disalin! Silakan tempel ke Instagram Anda.');
  });
}

// Image modal functions
function openModal(src) {
  document.getElementById('imageModal').style.display = 'block';
  document.getElementById('modalImage').src = src;
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Video form functions
function showAddVideoForm() {
  document.getElementById('addVideoForm').style.display = 'block';
}

function hideAddVideoForm() {
  document.getElementById('addVideoForm').style.display = 'none';
}

function addNewVideo() {
  // Get form values
  const title = document.getElementById('videoTitle').value;
  const desc = document.getElementById('videoDesc').value;
  
  if (!title || !desc) {
    alert('Judul dan deskripsi video harus diisi!');
    return;
  }
  
  // Create new video item (this is just a demo - in real app you'd upload the video)
  const videoGrid = document.querySelector('.video-grid');
  const newVideoItem = document.createElement('div');
  newVideoItem.className = 'video-item';
  newVideoItem.innerHTML = `
    <div class="video-container">
      <video controls preload="metadata">
        <source src="#" type="video/mp4">
        Browser Anda tidak mendukung tag video.
      </video>
    </div>
    <div class="video-info">
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
  `;
  
  videoGrid.appendChild(newVideoItem);
  
  // Reset form and hide
  document.getElementById('videoTitle').value = '';
  document.getElementById('videoDesc').value = '';
  hideAddVideoForm();
  
  // Show success message
  alert('Video berhasil ditambahkan!');
}

// Show first content by default
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('tentang').style.display = 'block';
});