<?php   
    # --- Data from form
    $name = $_POST['name'];
    $visitor_mail = $_POST['email'];
    $email_subject = $_POST['subject'];
    $message = htmlspecialchars($_POST['message']);
    $phone = $_POST['phone'];

    # --- Check whether email is set and add it.
    if( isset($_POST['email']) ) {
        $email_body = "User name: $name\n" . "User email: " . $_POST['email'] . "\n" . "User phone: " . $_POST['phone'] . "\n" . "User message: $message\n";
        $headers = "From: " . $_POST['email']  . " \r\n";
    }
    else {
        $email_body = "User name: $name\n" . "User phone: " . $_POST['phone'] . "\n" . "User message: $message\n";
        $headers = "";
    }

    # --- Destination email
    $to = 'fhg791@o2.pl';

    # --- Mail send
    if(mail($to, $email_subject, $email_body, $headers)) {
        echo 'Success';
    }
    else {
        echo 'Failure';
    }
?>