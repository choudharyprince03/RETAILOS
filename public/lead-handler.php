<?php
/**
 * MOAR RetailOS — Phase 1 Lead Handler (lead-handler.php)
 * Same-site email endpoint for public retail solution showcase.
 * Validates input, checks spam honeypot field, and dispatches notification email.
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// 1. Spam honeypot check
$honeypot = trim((string)($data['honeypot'] ?? ''));
if ($honeypot !== '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Spam check triggered']);
    exit;
}

// 2. Input sanitization & validation
$name        = strip_tags(trim((string)($data['name'] ?? '')));
$email       = filter_var(trim((string)($data['email'] ?? '')), FILTER_SANITIZE_EMAIL);
$company     = strip_tags(trim((string)($data['company'] ?? '')));
$interest    = strip_tags(trim((string)($data['interest'] ?? 'Platform overview')));
$enquiryType = strip_tags(trim((string)($data['enquiryType'] ?? 'Talk to our team')));
$message     = strip_tags(trim((string)($data['message'] ?? '')));
$consent     = !empty($data['consent']);

if ($name === '' || $email === '' || $company === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Name, work email, and company are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address.']);
    exit;
}

if (!$consent) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Contact consent is required.']);
    exit;
}

$recipient = 'harsha.nandakumar@moaradvisory.com';
$subject   = sprintf('[MOAR RetailOS] %s: %s', $enquiryType, $interest);

$bodyLines = [
    "Enquiry Type: {$enquiryType}",
    "Area of Interest: {$interest}",
    "",
    "Name: {$name}",
    "Work Email: {$email}",
    "Company: {$company}",
    "Consent Confirmed: Yes",
    "",
    "Message:",
    $message !== '' ? $message : '(No additional message provided)',
];
$body = implode("\r\n", $bodyLines);

$headers = [
    'From: MOAR RetailOS Showcase <noreply@moaradvisory.com>',
    "Reply-To: {$email}",
    'X-Mailer: MOAR-RetailOS-Phase1',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true, 'recipient' => $recipient]);
} else {
    http_response_code(503);
    echo json_encode([
        'ok' => false,
        'error' => 'Mail service unavailable on host; please use email client fallback.',
    ]);
}
