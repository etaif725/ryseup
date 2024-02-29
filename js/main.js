(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Project and Testimonial carousel
    $(".project-carousel, .testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


async function sendData(data) {
  try {
    console.log('Sending data to server:', data);

    const response = await fetch("http://ryseup.myvnc.com:3000/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Server response:', result);

      // Display success message
      document.getElementById('successMessage').innerText = 'Form submitted successfully!';
      document.getElementById('successMessage').style.display = 'block';

      // Optionally, reset the form after successful submission
      document.getElementById('LeadForm').reset();
    } else {
      console.error('Server response error:', response.status, response.statusText);

      // Display error message if the server request fails
      document.getElementById('errorMessages').innerText = 'Error submitting the form. Please try again later.';
      document.getElementById('errorMessages').style.display = 'block';
    }
  } catch (error) {
    console.error('Error sending data to server:', error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const send = document.querySelector("#send");
  if (send) {
    send.addEventListener("click", async function (event) {
      event.preventDefault();

      // Reset error and success messages
      document.getElementById('errorMessages').style.display = 'none';
      document.getElementById('successMessage').style.display = 'none';

      const form = document.getElementById('LeadForm');
      const formData = new FormData(form);
      
      // Convert FormData to JSON object
      const formDataObject = {};
      formData.forEach((value, key) => {
          formDataObject[key] = value;
      });

      // Validation logic
      if (!formData.name || !formData.company || !formData.position || !formData.mobile || !formData.email || !formData.size || !formData.service) {
        document.getElementById('errorMessages').innerText = 'Please fill in all the required fields.';
        document.getElementById('errorMessages').style.display = 'block';
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        document.getElementById('errorMessages').innerText = 'Please enter a valid email address.';
        document.getElementById('errorMessages').style.display = 'block';
        return;
      }

      // Phone number validation (assuming a simple format)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.mobile)) {
        document.getElementById('errorMessages').innerText = 'Please enter a valid 10-digit phone number.';
        document.getElementById('errorMessages').style.display = 'block';
        return;
      }

      // Send data if validation passes
      try {
        const response = await fetch("http://ryseup.myvnc.com:3000/leads/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Redirect to the thank you page
          window.location.href = '/thank-you';
        } else {
          // Display error message if the server request fails
          document.getElementById('errorMessages').innerText = 'Error submitting the form. Please try again later.';
          document.getElementById('errorMessages').style.display = 'block';
        }
      } catch (error) {
        console.error(error);
      }
    });
  } else {
    console.error("Element with id 'send' not found");
  }
});

async function sendSubscriptionData(data) {
  try {
    console.log('Sending subscription data to server:', data);

    const response = await fetch("http://ryseup.myvnc.com:3000/subs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Server response:', result);

      // Display success message
      document.getElementById('subscriptionSuccessMessage').innerText = 'Subscription successful!';
      document.getElementById('subscriptionSuccessMessage').style.display = 'block';

      // Optionally, reset the form after successful submission
      document.getElementById('FooterForm').reset();

      // Redirect to the thank you page for subscription
      window.location.href = '/thank-you';
    } else {
      console.error('Server response error:', response.status, response.statusText);

      // Display error message if the server request fails
      document.getElementById('subscriptionErrorMessages').innerText = 'Error subscribing. Please try again later.';
      document.getElementById('subscriptionErrorMessages').style.display = 'block';
    }
  } catch (error) {
    console.error('Error sending subscription data to server:', error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const subscribeButton = document.querySelector("#footersubsc");
  if (subscribeButton) {
    subscribeButton.addEventListener("click", async function (event) {
      event.preventDefault();

      // Reset error and success messages
      document.getElementById('subscriptionErrorMessages').style.display = 'none';
      document.getElementById('subscriptionSuccessMessage').style.display = 'none';

      // Get form data
      const formData = {
        email: document.getElementById('subscriptionEmail').value,
      };

      // Validation logic
      if (!formData.email || !validateEmail(formData.email)) {
        document.getElementById('subscriptionErrorMessages').innerText = 'Please enter a valid email address.';
        document.getElementById('subscriptionErrorMessages').style.display = 'block';
        return;
      }

      // Function to validate email
      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      // Send data if validation passes
      sendSubscriptionData(formData);
    });
  } else {
    console.error("Element with id 'footersubsc' not found");
  }
});


// FAQ Accordion Handler
var accordionItems = document.querySelectorAll('.collapsible-link');
accordionItems.forEach(function (item) {
  item.addEventListener('click', function (event) {
      event.preventDefault();

      var target = document.querySelector(this.getAttribute('data-target'));
      var isCollapsed = target.classList.contains('show');

      // Close all accordion items
      accordionItems.forEach(function (otherItem) {
          var otherTarget = document.querySelector(otherItem.getAttribute('data-target'));
          if (otherItem !== item && otherTarget.classList.contains('show')) {
              otherTarget.classList.remove('show');
              otherItem.setAttribute('aria-expanded', 'false');
          }
      });

      // Toggle the current accordion item
      if (isCollapsed) {
          target.classList.remove('show');
          item.setAttribute('aria-expanded', 'false');
      } else {
          target.classList.add('show');
          item.setAttribute('aria-expanded', 'true');
      }
  });
});
