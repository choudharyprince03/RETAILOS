'use client';

import React, { useState, useEffect } from 'react';
import { SOL, ENQ_LABEL, MOAR_EMAIL, byId } from '@/data/retailos-data';
import { X, CheckCircle2, Mail, Send, AlertCircle } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  capId: string | null;
  reqType: string;
  onClose: () => void;
}

export default function EnquiryModal({
  isOpen,
  capId,
  reqType,
  onClose,
}: EnquiryModalProps) {
  const cap = capId ? byId(capId) : undefined;
  const label = ENQ_LABEL[reqType] || 'Talk to our team';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState(cap ? cap.name : 'MOAR RetailOS Platform');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    mailtoUrl: string;
    recipient: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const currentCap = capId ? byId(capId) : undefined;
      const currentLabel = ENQ_LABEL[reqType] || 'Talk to our team';
      setInterest(currentCap ? currentCap.name : 'MOAR RetailOS Platform');
      setMessage(currentCap ? `${currentLabel} - ${currentCap.name}. ` : '');
      setError(null);
      setSubmittedData(null);
    }
  }, [isOpen, capId, reqType]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !company.trim()) {
      setError('Please enter your name, work email, and company.');
      return;
    }
    if (!consent) {
      setError('Please confirm contact consent so our team can follow up.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          interest,
          enquiryType: label,
          message,
          consent,
          honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not submit form. Opening email draft instead.');
        return;
      }
      setSubmittedData({
        mailtoUrl: data.mailtoUrl,
        recipient: data.recipient || MOAR_EMAIL,
      });
    } catch {
      const subject = `${label}: ${interest}`;
      const body = `Enquiry: ${label}\nCapability: ${interest}\n\nName: ${name}\nWork email: ${email}\nCompany: ${company}\n\n${message}`;
      const fallbackUrl = `mailto:${MOAR_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = fallbackUrl;
      setSubmittedData({
        mailtoUrl: fallbackUrl,
        recipient: MOAR_EMAIL,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Enquire about a capability"
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="apple-glass relative z-10 w-full max-w-lg rounded-[32px] p-7 sm:p-9">
        <button
          onClick={onClose}
          aria-label="Close"
          className="glass-well absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[var(--mut)] transition hover:text-[var(--ink)]"
        >
          <X className="h-4 w-4" />
        </button>

        {!submittedData ? (
          <form onSubmit={handleSubmit}>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
              Connect with us · Enquiry
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--ink)]">
              {label}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--sub)]">
              {cap ? (
                <>
                  For <strong className="text-[var(--ink)]">{cap.name}</strong>.{' '}
                </>
              ) : (
                'About the MOAR RetailOS platform. '
              )}
              A MOAR operator will follow up. No obligation.
            </p>

            {error && (
              <div className="mt-3 flex items-center gap-2 rounded-2xl bg-rose-500/15 px-4 py-2.5 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Honeypot spam field */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="reqHoneypot">Do not fill this field</label>
              <input
                id="reqHoneypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="mt-5 space-y-3.5">
              <div>
                <label
                  htmlFor="reqName"
                  className="mb-1.5 block text-[11px] font-medium text-[var(--sub)]"
                >
                  Your name *
                </label>
                <input
                  id="reqName"
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-well w-full rounded-2xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--mut)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reqEmail"
                    className="mb-1.5 block text-[11px] font-medium text-[var(--sub)]"
                  >
                    Work email *
                  </label>
                  <input
                    id="reqEmail"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-well w-full rounded-2xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--mut)] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reqCompany"
                    className="mb-1.5 block text-[11px] font-medium text-[var(--sub)]"
                  >
                    Company *
                  </label>
                  <input
                    id="reqCompany"
                    type="text"
                    required
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="glass-well w-full rounded-2xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--mut)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reqInterest"
                  className="mb-1.5 block text-[11px] font-medium text-[var(--sub)]"
                >
                  Area of interest
                </label>
                <select
                  id="reqInterest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="glass-well w-full rounded-2xl px-4 py-3 text-sm text-[var(--ink)] focus:outline-none"
                >
                  <option value="MOAR RetailOS Platform">MOAR RetailOS Platform (General)</option>
                  {SOL.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.exp})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="reqMsg"
                  className="mb-1.5 block text-[11px] font-medium text-[var(--sub)]"
                >
                  Message (optional)
                </label>
                <textarea
                  id="reqMsg"
                  rows={3}
                  placeholder="Anything you would like us to know?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="glass-well w-full rounded-2xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--mut)] focus:outline-none"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs text-[var(--sub)]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded"
                />
                <span>
                  I agree that MOAR Advisory may use my contact details to respond to this retail showcase enquiry.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-pri mt-6 w-full py-3.5 text-sm disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{submitting ? 'Submitting enquiry…' : 'Send enquiry →'}</span>
            </button>

            <div className="mt-4 text-center text-xs text-[var(--mut)]">
              or email{' '}
              <a
                href={`mailto:${MOAR_EMAIL}`}
                className="font-medium text-[var(--accent-cyan)] hover:underline"
              >
                {MOAR_EMAIL}
              </a>
            </div>
          </form>
        ) : (
          <div className="py-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-lg">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-[var(--ink)]">
              Enquiry Logged &amp; Email Ready
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-[var(--sub)]">
              Your enquiry for <strong className="text-[var(--ink)]">{interest}</strong> has been validated by the same-site endpoint for{' '}
              <a
                href={`mailto:${submittedData.recipient}`}
                className="text-[var(--accent-cyan)] underline"
              >
                {submittedData.recipient}
              </a>
              . You can also open the pre-filled email draft directly in your mail client below.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={submittedData.mailtoUrl}
                className="btn btn-pri flex-1 text-xs"
              >
                <Mail className="h-4 w-4" />
                <span>Open in Email Client</span>
              </a>
              <button
                onClick={onClose}
                className="btn btn-gho flex-1 text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
