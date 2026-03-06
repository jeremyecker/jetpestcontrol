'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PEST_OPTIONS, SITE_NAME } from '@/site.config';

const PROPERTY_TYPES = ['Residential', 'Commercial', 'Multi-Family / Apartment'] as const;

interface LeadFormProps {
  variant?: 'hero' | 'inline' | 'page';
  title?: string;
  subtitle?: string;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      getResponse: (widgetId: string) => string | undefined;
      reset: (widgetId: string) => void;
    };
  }
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function getDigits(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

export default function LeadForm({
  variant = 'hero',
  title = 'Get a Free Estimate',
  subtitle = 'No commitment. We\'ll get back to you ASAP.',
  className = '',
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zip: '',
    pest_type: '',
    property_type: '',
    email: '',
    description: '',
    sms_consent: false,
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [zipError, setZipError] = useState('');
  const formStartedAt = useRef(Date.now());
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          size: 'invisible',
          callback: () => {},
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || submitted) return;

    setIsSubmitting(true);
    setError('');

    const phoneDigits = getDigits(formData.phone);
    if (phoneDigits.length !== 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      setIsSubmitting(false);
      return;
    }

    if (formData.zip.length !== 5) {
      setZipError('Please enter a valid 5-digit zip code');
      setIsSubmitting(false);
      return;
    }

    try {
      let turnstileToken = '';
      if (window.turnstile && turnstileWidgetId.current) {
        turnstileToken = window.turnstile.getResponse(turnstileWidgetId.current) || '';
      }

      const payload = {
        ...formData,
        phone: getDigits(formData.phone),
        turnstile_token: turnstileToken,
        page_url: window.location.href,
        form_started_at: formStartedAt.current,
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        window.location.href = '/thank-you';
      } else {
        setError(data.message || 'Something went wrong. Please try again or call us directly.');
        if (window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      }
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`bg-white rounded-xl p-8 text-center ${className}`}>
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">Thank You!</h3>
        <p className="text-gray-600">We&apos;ll be in touch shortly. Redirecting...</p>
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <div className={`bg-white rounded-xl shadow-xl ${isHero ? 'p-6' : 'p-6'} ${className}`}>
      {title && (
        <div className={`${isHero ? 'mb-4' : 'mb-6'} text-center`}>
          <h2 className={`font-bold text-brand-dark ${isHero ? 'text-xl' : 'text-xl'}`}>
            {title}
          </h2>
          {!isHero && subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className={isHero ? 'space-y-3' : 'space-y-4'}>
        {/* Honeypot */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 h-0 w-0 overflow-hidden"
          aria-hidden="true"
        />

        {isHero ? (
          /* HERO VARIANT: Compact grid */
          <>
            <div className="grid grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label htmlFor="hero-name" className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="hero-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="hero-phone" className="block text-xs font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="hero-phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setFormData((prev) => ({ ...prev, phone: formatted }));
                    if (phoneError) setPhoneError('');
                  }}
                  maxLength={14}
                  placeholder="(555) 555-1234"
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors text-sm"
                />
                {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
              </div>

              {/* ZIP */}
              <div>
                <label htmlFor="hero-zip" className="block text-xs font-medium text-gray-700 mb-1">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="hero-zip"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setFormData((prev) => ({ ...prev, zip: digits }));
                    if (zipError) setZipError('');
                  }}
                  placeholder="10001"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors text-sm"
                />
                {zipError && <p className="text-red-500 text-xs mt-1">{zipError}</p>}
              </div>

              {/* Pest Type */}
              <div>
                <label htmlFor="hero-pest" className="block text-xs font-medium text-gray-700 mb-1">
                  Pest Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="hero-pest"
                  name="pest_type"
                  required
                  value={formData.pest_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors bg-white text-sm"
                >
                  <option value="">Select...</option>
                  {PEST_OPTIONS.map((pest) => (
                    <option key={pest} value={pest}>
                      {pest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="col-span-2">
                <label htmlFor="hero-property" className="block text-xs font-medium text-gray-700 mb-1">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="hero-property"
                  name="property_type"
                  required
                  value={formData.property_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors bg-white text-sm"
                >
                  <option value="">Select property type...</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="hero-email" className="block text-xs font-medium text-gray-700 mb-1">
                Email <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="email"
                id="hero-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="hero-desc" className="block text-xs font-medium text-gray-700 mb-1">
                Describe Your Issue <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                id="hero-desc"
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us what's going on..."
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors resize-none text-sm"
              />
            </div>

            {/* SMS Consent */}
            <div className="flex items-start gap-2 col-span-2">
              <input
                type="checkbox"
                id="hero-sms"
                name="sms_consent"
                required
                checked={formData.sms_consent}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary shrink-0"
              />
              <label htmlFor="hero-sms" className="text-[10px] text-gray-500 leading-relaxed">
                I agree to receive text messages from {SITE_NAME} at the phone number provided.{' '}
                Message and data rates may apply. Message frequency varies. Reply STOP to opt out.{' '}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Turnstile container (invisible) */}
            <div ref={turnstileContainerRef} />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-colors text-base"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Free Estimate'}
            </button>

            {/* Minimal TCPA */}
            <p className="text-[10px] text-gray-400 leading-relaxed text-center">
              No commitment. We&apos;ll get back to you ASAP. See our{' '}
              <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.
            </p>
          </>
        ) : (
          /* FULL VARIANT: All fields */
          <>
            {/* Name */}
            <div>
              <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lead-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="lead-phone"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setFormData((prev) => ({ ...prev, phone: formatted }));
                  if (phoneError) setPhoneError('');
                }}
                onBlur={() => {
                  const digits = getDigits(formData.phone);
                  if (digits.length > 0 && digits.length !== 10) {
                    setPhoneError('Please enter a valid 10-digit phone number');
                  } else {
                    setPhoneError('');
                  }
                }}
                maxLength={14}
                placeholder="(555) 555-1234"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
              />
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

            {/* ZIP */}
            <div>
              <label htmlFor="lead-zip" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lead-zip"
                name="zip"
                required
                value={formData.zip}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 5);
                  setFormData((prev) => ({ ...prev, zip: digits }));
                  if (zipError) setZipError('');
                }}
                onBlur={() => {
                  if (formData.zip.length > 0 && formData.zip.length !== 5) {
                    setZipError('Please enter a valid 5-digit zip code');
                  } else {
                    setZipError('');
                  }
                }}
                placeholder="10001"
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
              />
              {zipError && <p className="text-red-500 text-xs mt-1">{zipError}</p>}
            </div>

            {/* Pest Type */}
            <div>
              <label htmlFor="lead-pest" className="block text-sm font-medium text-gray-700 mb-1">
                Pest Type <span className="text-red-500">*</span>
              </label>
              <select
                id="lead-pest"
                name="pest_type"
                required
                value={formData.pest_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors bg-white"
              >
                <option value="">Select pest type...</option>
                {PEST_OPTIONS.map((pest) => (
                  <option key={pest} value={pest}>
                    {pest}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="lead-property" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                id="lead-property"
                name="property_type"
                required
                value={formData.property_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors bg-white"
              >
                <option value="">Select property type...</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="email"
                id="lead-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="lead-desc" className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Issue <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                id="lead-desc"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your pest problem..."
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors resize-none"
              />
            </div>

            {/* SMS Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="lead-sms"
                name="sms_consent"
                required
                checked={formData.sms_consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
              />
              <label htmlFor="lead-sms" className="text-xs text-gray-600 leading-relaxed">
                I agree to receive text messages from {SITE_NAME} at the phone number provided.
                Message and data rates may apply. Message frequency varies. Reply STOP to opt out.{' '}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Turnstile */}
            <div ref={turnstileContainerRef} />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-colors text-base"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Free Estimate'}
            </button>

            {/* TCPA */}
            <p className="text-[10px] text-gray-400 leading-relaxed text-center">
              No commitment. We&apos;ll get back to you ASAP. By submitting, you consent to be contacted by {SITE_NAME}. See our{' '}
              <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>{' '}
              and{' '}
              <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
