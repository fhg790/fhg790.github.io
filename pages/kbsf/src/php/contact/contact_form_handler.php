<?php
    # --- Data from form
    $visitor_mail = $_POST['email'];
    $visitor_phone_nr = $_POST['phone'];
    $email_subject = $_POST['subject'];
    $email_message = preg_replace("/\n/", "<br>", $_POST['message']);
    $send_mail_copy = $_POST['send_mail_copy'];

    # --- Body parsing
    $email_final_message = "<p><b>Od: </b>" . $visitor_mail . "</p>";
    $email_final_message_plain = "Od: " . $visitor_mail . "\n";
    if( $visitor_phone_nr ) {
        $email_final_message .= "<p><b>Dane kontaktowe: </b>" . $visitor_phone_nr . "</p>";
        $email_final_message_plain .= "Dane kontaktowe: " . $visitor_phone_nr . "\n";
    }
    $email_final_message .= "<p><b>Temat: </b>" . $email_subject . "</p>";
    $email_final_message_plain .= "Temat: " . $email_subject . "\n";

    $email_final_message .= "<p><b>Teść wiadomość:</b></p>";
    $email_final_message_plain .= "Teść wiadomość:\n";
    
    $email_final_message .= "<p>" . html_entity_decode($email_message) . "</p>";
    $email_final_message_plain .= html_entity_decode($email_message) . "\n";

    //Import PHPMailer classes into the global namespace
    //These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require '../lib/PHPMailer/src/Exception.php';
    require '../lib/PHPMailer/src/PHPMailer.php';
    require '../lib/PHPMailer/src/SMTP.php';

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication

        $mail->Host       = '';                     //Set the SMTP server to send through
        
        $mail->Username   = '';                     //SMTP username
        $mail->Password   = '';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        $mail->CharSet="utf-8";
        $mail->IsHTML(true);

        //Recipients
        $mail->setFrom('', 'www.kbsf.pl');
        $mail->addAddress('', 'Kancelaria Badania Sprawozdań Finansowych Sp. z o.o.');     //Add a recipient
        $mail->AddReplyTo($visitor_mail);
        // Send copy if needed
        if($send_mail_copy == 1) {
            $mail->addCC($visitor_mail);     //Add CC if needed
        }

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = "Nowa wiadomość ze strony | kbsf.pl";
        $mail->Body    = $email_final_message;
        $mail->AltBody = $email_final_message_plain;

        // $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>