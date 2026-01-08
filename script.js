// 1. MOBILE MENU
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. HERO CAROUSEL
const slides = document.querySelectorAll('.slide');
const nextTime = 6000; 

if(slides.length > 0) {
    let currentSlide = 0;
    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    setInterval(nextSlide, nextTime);
}

// 3. PAYSTACK INTEGRATION (DONATE)
// ⚠️ REPLACE WITH YOUR PUBLIC KEY
const publicKey = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; 

function payWithPaystack(e) {
    if(e) e.preventDefault();
    
    let amount = document.getElementById("amount")?.value;
    let email = document.getElementById("email")?.value;
    let name = document.getElementById("fullname")?.value;
    let currency = document.getElementById("currency")?.value;

    if (!amount || !email) {
        alert("Please enter both your Email and Amount.");
        return;
    }

    if (typeof PaystackPop === 'undefined') {
        alert("Paystack connection failed. Check internet.");
        return;
    }

    let handler = PaystackPop.setup({
        key: publicKey, 
        email: email,
        amount: amount * 100, 
        currency: currency, 
        ref: ''+Math.floor((Math.random() * 1000000000) + 1), 
        metadata: {
            custom_fields: [{ display_name: "Donor Name", variable_name: "donor_name", value: name }]
        },
        onClose: function(){ alert('Transaction cancelled.'); },
        callback: function(response){ 
            alert('Thank you! Payment complete! Ref: ' + response.reference); 
            document.getElementById("paymentForm").reset();
        }
    });
    handler.openIframe(); 
}

// 4. CONTACT FORM AUTOMATION
const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        statusMsg.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        statusMsg.className = "status-loading";
        submitBtn.disabled = true; 
        submitBtn.innerHTML = 'Sending...';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        data.timestamp = new Date().toISOString(); 

        try {
            // N8N URL
            const webhookUrl = 'https://tolu-toye-01.app.n8n.cloud/webhook/purple-contact'; 
            
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                statusMsg.innerText = "Message sent successfully! We will get back to you soon.";
                statusMsg.className = "status-success";
                contactForm.reset(); 
            } else {
                statusMsg.innerText = "Server error. Please try again later.";
                statusMsg.className = "status-error";
            }
        } catch (error) {
            console.error('Error:', error);
            statusMsg.innerText = "Network error. Please check your connection.";
            statusMsg.className = "status-error";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane" style="margin-left:10px;"></i>';
        }
    });
}