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

    // Enhanced form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        // Add input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Add animation when input is focused
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('input-focused');
                }
            });
            
            // If input has value on page load, add focused class
            if (input.value) {
                input.parentElement.classList.add('input-focused');
            }
        });

        // Enhanced form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state on button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            submitButton.disabled = true;
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const phone = this.querySelector('#phone').value;
            const message = this.querySelector('#message').value;
            
            // Simulate form submission delay
            setTimeout(() => {
                // In a real application, you would send this data to a server
                console.log('Form data:', { name, email, phone, message });
                
                // Show success message
                const formContainer = contactForm.parentElement;
                const originalContent = formContainer.innerHTML;
                
                formContainer.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Teşekkürler, ${name}!</h3>
                        <p>Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
                        <button class="btn btn-submit reset-form">Yeni Mesaj</button>
                    </div>
                `;
                
                // Add event listener to reset button
                const resetButton = formContainer.querySelector('.reset-form');
                if (resetButton) {
                    resetButton.addEventListener('click', function() {
                        formContainer.innerHTML = originalContent;
                        // Re-initialize the form event listeners
                        document.dispatchEvent(new CustomEvent('form-reset'));
                    });
                }
            }, 1500);
        });
        
        // Re-initialize form after reset
        document.addEventListener('form-reset', function() {
            const newForm = document.querySelector('.contact-form form');
            if (newForm) {
                // Add same event listeners to new form
                // This code would need to reinitialize all form-related event listeners
            }
        });
    }

    const emergencyServiceBox = document.querySelector('.emergency-service.billboard');
    if (emergencyServiceBox) {
        // Add a subtle pulse effect that runs continuously
        function addPulseEffect() {
            emergencyServiceBox.classList.add('pulse-effect');
            setTimeout(() => {
                emergencyServiceBox.classList.remove('pulse-effect');
                setTimeout(addPulseEffect, 1000);
            }, 1000);
        }
        
        // Start the pulse effect
        addPulseEffect();
        
        // Add glowing effect on mouseover
        emergencyServiceBox.addEventListener('mouseover', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 102, 0, 0.7)';
        });
        
        emergencyServiceBox.addEventListener('mouseout', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    }
    

    const banner = document.querySelector('.announcement-banner');
    
    if (banner) {
        // Pause animation on hover
        banner.addEventListener('mouseenter', function() {
            document.querySelector('.banner-content').style.animationPlayState = 'paused';
        });
        
        banner.addEventListener('mouseleave', function() {
            document.querySelector('.banner-content').style.animationPlayState = 'running';
        });
        
        // Phone number in the banner should be clickable
        banner.querySelectorAll('.banner-item').forEach(item => {
            if (item.textContent.includes('+90 537 579 95 58')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    window.location.href = 'tel:+905375799558';
                });
            }
        });
    }

});


document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes pulse-emergency {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}
.pulse-effect {
    animation: pulse-emergency 1s ease;
}
</style>
`);

document.head.insertAdjacentHTML('beforeend', `
    <style>
        .input-focused label {
            color: #0055a4;
        }
        
        .form-success {
            text-align: center;
            padding: 30px 20px;
        }
        
        .form-success i {
            font-size: 60px;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .form-success h3 {
            color: #4CAF50;
            margin-bottom: 15px;
        }
        
        .form-success p {
            font-size: 16px;
            margin-bottom: 25px;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .form-error {
            animation: shake 0.6s ease-in-out;
        }
    </style>
    `);