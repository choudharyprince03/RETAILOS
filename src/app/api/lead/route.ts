import { NextResponse } from 'next/server';
import { MOAR_EMAIL } from '@/data/retailos-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name = '',
      email = '',
      company = '',
      interest = 'Platform overview',
      enquiryType = 'Talk to our team',
      message = '',
      consent = false,
      honeypot = '',
    } = body;

    // 1. Check spam honeypot field
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Spam check triggered.' },
        { status: 400 }
      );
    }

    // 2. Validate required inputs
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanCompany = String(company).trim();
    const cleanInterest = String(interest).trim() || 'Platform overview';
    const cleanType = String(enquiryType).trim() || 'Enquiry';
    const cleanMessage = String(message).trim();

    if (!cleanName || !cleanEmail || !cleanCompany) {
      return NextResponse.json(
        { ok: false, error: 'Please provide your name, work email, and company.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { ok: false, error: 'Please confirm contact consent so our team can respond.' },
        { status: 400 }
      );
    }

    const subject = `${cleanType}: ${cleanInterest}`;
    const emailBody = [
      `Enquiry: ${cleanType}`,
      `Capability / Area of Interest: ${cleanInterest}`,
      ``,
      `Name: ${cleanName}`,
      `Work email: ${cleanEmail}`,
      `Company: ${cleanCompany}`,
      `Consent confirmed: Yes`,
      `Submitted at: ${new Date().toISOString()}`,
      ``,
      cleanMessage ? `Message:\n${cleanMessage}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const mailtoUrl = `mailto:${MOAR_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;

    return NextResponse.json({
      ok: true,
      recipient: MOAR_EMAIL,
      subject,
      submittedAt: new Date().toISOString(),
      mailtoUrl,
      summary: {
        name: cleanName,
        email: cleanEmail,
        company: cleanCompany,
        interest: cleanInterest,
        enquiryType: cleanType,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to process enquiry payload.' },
      { status: 500 }
    );
  }
}
