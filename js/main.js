document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const phone = this.querySelector('#phone').value;
            const message = this.querySelector('#message').value;
            
            // Simple validation - could be enhanced
            if (!name || !email || !message) {
                alert('Lütfen tüm zorunlu alanları doldurun.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form data:', { name, email, phone, message });
            
            // Show success message
            alert('Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.');
            
            // Reset form
            this.reset();
        });
    }
});