// Active nav highlighting
(function(){
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navLinks .nav-link').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
})();

// Certification modal dynamic content
var certModal = document.getElementById('certModal');
if (certModal) {
  certModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var title = button.getAttribute('data-title');
    var description = button.getAttribute('data-description');
    var link = button.getAttribute('data-link');
    document.getElementById('certModalLabel').textContent = title;
    document.getElementById('certTitle').textContent = title;
    document.getElementById('certDescription').textContent = description;
    document.getElementById('certLink').setAttribute('href', link);
  });
}

// Contact form validation
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var phone = document.getElementById('phone');
    var phoneValid = /^\d{10}$/.test(phone.value.trim());

    if (!phoneValid) {
      phone.classList.add('is-invalid');
      phone.classList.remove('is-valid');
    } else {
      phone.classList.remove('is-invalid');
      phone.classList.add('is-valid');
    }

    if (!contactForm.checkValidity() || !phoneValid) {
      contactForm.classList.add('was-validated');
      return;
    }

    document.getElementById('successAlert').classList.remove('d-none');
    contactForm.reset();
    contactForm.classList.remove('was-validated');
    document.querySelectorAll('#contactForm .form-control').forEach(el => el.classList.remove('is-valid'));
  }, false);
}
