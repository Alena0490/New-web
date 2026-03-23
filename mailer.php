<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 🍯 Honeypot kontrola
    if (!empty($_POST['website'])) {
        http_response_code(200);
        exit;
    }

    // Načtení dat z formuláře
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST["name"]), ENT_QUOTES, 'UTF-8') : '';
    $surname = isset($_POST['surname']) ? htmlspecialchars(trim($_POST["surname"]), ENT_QUOTES, 'UTF-8') : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST["phone"]), ENT_QUOTES, 'UTF-8') : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST["message"]), ENT_QUOTES, 'UTF-8') : '';

    // Ochrana proti email header injection
    $name = str_replace(["\r", "\n"], '', $name);
    $surname = str_replace(["\r", "\n"], '', $surname);

    // Kontrola dat
    if (empty($name) || empty($surname) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: https://www.alena-pumprova.cz/kontakt.php?success=-1#contact-form");
        exit;
    }

    // Odesílání e-mailu
    $recipient = "alenapumprova@seznam.cz";
    $subject = "Máte nový kontakt od: $name $surname";
    $email_content = "Jméno: $name\n";
    $email_content .= "Příjmení: $surname\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Telefon: $phone\n\n";
    $email_content .= "Zpráva:\n$message\n";
    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        header("Location: https://www.alena-pumprova.cz/kontakt.php?success=1#contact-form");
    } else {
        header("Location: https://www.alena-pumprova.cz/kontakt.php?success=-1#contact-form");
    }
    exit;
} else {
    echo "Žádná data nebyla přijata.";
    exit;
}
?>