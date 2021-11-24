
// Exit modal on bg click
document.querySelectorAll('.modal-background').forEach(n => n.addEventListener('click', function () {
    const modal_box_id = this.parentElement.id;
    document.getElementById(modal_box_id).classList.remove('is-active');
    document.getElementById(modal_box_id).classList.add('is-out');
}));

// Close modal on button click
document.querySelectorAll('button.delete').forEach(n => n.addEventListener('click', function () {
    const modal_box_id = this.parentElement.parentElement.parentElement.id;
    document.getElementById(modal_box_id).classList.remove('is-active');
    document.getElementById(modal_box_id).classList.add('is-out');
}));

// Open modal box
function modal_box_manage() {
    const modal_box_id = this.id+'-modal';
    document.getElementById(modal_box_id).classList.add('is-active');
    document.getElementById(modal_box_id).classList.remove('is-out');
};
document.querySelectorAll('.read-more-button').forEach(n => n.addEventListener('click', modal_box_manage));

// Burger button manage
document.querySelector('.navbar-burger').addEventListener('click', function () {
    this.classList.toggle('is-active');
    document.querySelector('.navbar-menu').classList.toggle('is-active');
});

// Brand button manage
document.querySelector('#navbar-brand').addEventListener('click', function () {
    window.scrollTo({
        top: 0
    });
});

// Navbar links manage
const nav_links = document.querySelectorAll('.navbar-menu > .navbar-end > .navbar-item, #about_button, #contact_button');
function nav_link_action() {
    const section_id = this.id.replace('navbar-', '').replace('_button', '');
    
    // Close dropdown
    document.querySelector('.navbar-burger').classList.remove('is-active');
    document.querySelector('.navbar-menu').classList.remove('is-active');

    window.scrollTo({
        top: document.getElementById(section_id).getBoundingClientRect().top+window.scrollY-81
    });
}
nav_links.forEach(n => n.addEventListener('click', nav_link_action));

// Animate elements
function animate_element(element, detect_top=true, detect_bottom=true) {
    if(detect_top == true && detect_bottom == true) {
        if(element.getBoundingClientRect().top < window.screen.height*3/4 && element.getBoundingClientRect().bottom > window.screen.height*1/4) {
            element.classList.add('is-active');
        }
    }
    else if(detect_top == true) {
        if(element.getBoundingClientRect().top < window.screen.height*3/4) {
            element.classList.add('is-active');
        }
    }
    else if(detect_bottom == true) {
        if(element.getBoundingClientRect().bottom > window.screen.height*1/4) {
            element.classList.add('is-active');
        }
    }
};

// Navbar bg color manage + scroll animations
window.addEventListener('scroll', function () {
    const nav = document.getElementById('navbar');
    if(this.scrollY >= nav.clientHeight) nav.classList.remove('has-background-transparent'); else nav.classList.add('has-background-transparent')

    // For animate on top and bottom
    const animate_both = ['#about_text', '#about_img', '#target_text', '#target_img', '#services_title', '#services_audyt', '#services_ksiegowosc', '#services_doradztwo', '#services_audyt'];
    animate_both.forEach(function(element) {
        animate_element(document.querySelector(element));
    });

    // For only animate on top 
    const animate_top = ['#contact_title', '#contact_form_container', '#contact_data'];
    animate_top.forEach(function(element) {
        animate_element(document.querySelector(element), true, false);
    });
});

// Checking form fields
function is_field_correct(element, pattern, message) {
    // RegEx obj
    var regex_pattern = new RegExp(pattern);
    // Get field value
    const field_value = element.querySelectorAll('input, textarea')[0];

    // Check if field meets the conditions
    if(regex_pattern.test(element.querySelectorAll('input, textarea')[0].value)) {
        // Delete error messages
        element.querySelectorAll('input, textarea')[0].classList.remove('is-danger');
        element.querySelector('.error_box').innerHTML = '';
        // Return True if is correct
        return true;
    }
    else {
        // Mark fields as incoorect
        element.querySelectorAll('input, textarea')[0].classList.add('is-danger');
        element.querySelector('.error_box').innerHTML = message;
        // Return False if incorrect
        return false
    }
};

// Email field check on focus out
document.querySelector('#contact_form > #email > div > input').addEventListener("focusout", function () {
    is_field_correct(
        document.querySelector('#contact_form > #email'),
        '\\w+@\\w+(\\.\\w+){0,}',
        'To pole jest wymagane. Poprawna forma: nazwa@email.com'
    );
});
// Phone field check on focus out
document.querySelector('#contact_form > #phone > div > input').addEventListener("focusout", function () {
    is_field_correct(
        document.querySelector('#contact_form > #phone'),
        '^(\\+48){0,1} {0,1}\\d{3} {0,1}\\d{3} {0,1}\\d{3} {0,1}$\|^$',
        'Poprawna forma: (+48)500500500'
    );
});
// Subject field check on focus out
document.querySelector('#contact_form > #subject > div > input').addEventListener("focusout", function () {
    is_field_correct(
        document.querySelector('#contact_form > #subject'),
        '.\+',
        'To pole jest wymagane.'
    );
});
// Subject field check on focus out
document.querySelector('#contact_form > #message > div > textarea').addEventListener("focusout", function () {
    is_field_correct(
        document.querySelector('#contact_form > #message'),
        '.\+',
        'To pole jest wymagane.'
    );
});

// Contact form manage
document.getElementById("contact_form_button").addEventListener("click", function(e){
    // Prevent default form behaviour
    e.preventDefault();
    // Just get the form element
    var form = document.getElementById("contact_form");

    // Check email field
    var form_fields = [is_field_correct(
            form.querySelector('#email'),
            '\\w+@\\w+(\\.\\w+){0,}',
            'To pole jest wymagane. Poprawna forma: nazwa@email.com'
        ),
        // Check phone field
        is_field_correct(
            form.querySelector('#phone'),
            '^(\\+48){0,1} {0,1}\\d{3} {0,1}\\d{3} {0,1}\\d{3} {0,1}$\|^$',
            'Poprawna forma: (+48)500500500'
        ),
        // Check subject field
        is_field_correct(
            form.querySelector('#subject'),
            '.\+',
            'To pole jest wymagane.'
        ),
        // Check message field
        is_field_correct(
            form.querySelector('#message'),
            '.\+',
            'To pole jest wymagane.'
        )
    ];

    var mail_modal = document.querySelector('#thank-you-modal');

    // Send form if all good
    if(form_fields.filter(function (flag) {return flag == false}).length == 0) {
        const send_mail_copy_flag = form.querySelector('#send_mail_copy').querySelector('input').checked ? 1 : 0;
        
        $.ajax({
            type: "POST",
            url: '../src/php/contact/contact_form_handler.php',
            data: $('#contact_form').serialize() + "&send_mail_copy="+send_mail_copy_flag, // serializes the form's elements.
            success: function(data) {
                if(data.search('Message could not be sent. Mailer Error:') > -1) {
                    console.log(data);
                    mail_modal.querySelector('.content h5').innerText = 'Przepraszamy ale nie możemy w tym momencie wysłać wiadomości. Spróbuj napisać wiadomość później lub bezpośrednio na nasz adres e-mail: kancelaria@kbsf.pl!';
                    mail_modal.classList.add('is-active');
                }
                else {
                    console.log(data);
                    $('#contact_form')[0].reset();
                    mail_modal.querySelector('.content h5').innerText = 'Dziękujemy za wiadomość!';
                    mail_modal.classList.add('is-active');
                }
            },
            error: function(data) {
                console.log(data);
                mail_modal.querySelector('.content h5').innerText = 'Przepraszamy ale nie możemy w tym momencie wysłać wiadomości. Spróbuj napisać wiadomość później lub bezpośrednio na nasz adres e-mail: kancelaria@kbsf.pl!';
                mail_modal.classList.add('is-active');
            }
        });
    }
});

// Animation on load
window.addEventListener("load", function () {
    // Add animation on title section
    document.querySelector('#title').classList.add('is-active');
});