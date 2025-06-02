<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verzamel formulierdata
    $fullName           = $_POST['name'] ?? '';
    $email          = $_POST['email'] ?? '';
    $subject            = $_POST['subject'] ?? '';
    $message         = $_POST['message'] ?? '';
   
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'secure.123webserver.biz';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@hkunlimited.nl';
        $mail->Password   = 'HenkGerwinHK02';
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;

        $mail->setFrom('info@hkunlimited.nl', $subject);
        $mail->addReplyTo($email);
        $mail->addAddress('info@hkunlimited.nl', 'hkunlimited');

        $mail->isHTML(true);
        $mail->Subject = 'Contactformulier: ' . $subject;
        $mail->Body = "
            <h2>Nieuw bericht van het contactformulier</h2>
            <p><strong>Naam:</strong> $fullName</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Onderwerp:</strong> $subject</p>
            <hr>
            <p><strong>Bericht:</strong></p>
            <p>$message</p> 
            <hr>
            <p>Dit bericht is verzonden via het contactformulier op de website.</p>
        ";

        $mail->send();

        header('Content-Type: application/json');
        echo json_encode(['status' => 'success']);
        exit;
    } catch (Exception $e) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Het verzenden van de e-mail is mislukt.',
            'errors' => [$mail->ErrorInfo]
        ]);
        exit;
    }
} else {
    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Ongeldige toegang']);
    exit;
}


