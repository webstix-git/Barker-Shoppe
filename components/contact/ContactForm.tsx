"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { services, site } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  phone: string;
  petName: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const emptyForm: Fields = {
  name: "",
  email: "",
  phone: "",
  petName: "",
  service: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[\d\s().+-]{10,20}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) {
    errors.email = "We need an email address to reply to.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look quite right.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number we can reach you on.";
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Please enter a phone number we can reach you on.";
  }
  if (!values.service) errors.service = "Choose the service you're interested in.";
  return errors;
}

const fieldClasses =
  "w-full rounded-[0.875rem] border bg-white px-4 py-3 text-body-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export function ContactForm() {
  const [values, setValues] = useState<Fields>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof Fields, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    // TODO: wire to Formspree / Resend / a Next.js route handler before launch.
    console.info("Contact form submission (not yet sent anywhere):", values);
    setSubmitted(true);
    setValues(emptyForm);
  };

  if (submitted) {
    return (
      <div role="status" className="rounded-[1.5rem] bg-white p-8 shadow-[0_10px_30px_rgba(13,44,56,0.06)] ring-1 ring-cream-dark sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-xl text-brand-600">
          <Icon name="check" />
        </span>
        <h2 className="mt-4 text-display-sm">Thanks - We&rsquo;ve Got Your Note</h2>
        <p className="mt-3 text-body-sm text-muted">
          Someone from the shoppe will get back to you shortly. If it&rsquo;s time-sensitive, calling{" "}
          <a href={site.phoneHref} className="font-semibold text-wine underline underline-offset-4">
            {site.phoneDisplay}
          </a>{" "}
          is always faster.
        </p>
        <p className="mt-4 text-sm text-soft">
          Developer note: front-end confirmation only. Wire the form endpoint before launch.
        </p>
        <Button type="button" variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.5rem] bg-white p-7 shadow-[0_10px_30px_rgba(13,44,56,0.06)] ring-1 ring-cream-dark sm:p-9"
    >
      <h2 className="text-display-sm">Send Us a Message</h2>
      <p className="mt-3 text-body-sm text-muted">
        Tell us a little about your dog and what you need. We usually reply the same business day.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          required
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
          placeholder="Jordan Blake"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          required
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
          autoComplete="tel"
          placeholder="(417) 555-0134"
        />
        <Field
          id="petName"
          label="Dog's name"
          value={values.petName}
          error={errors.petName}
          onChange={(value) => update("petName", value)}
          placeholder="Biscuit"
        />

        <div className="sm:col-span-2">
          <label htmlFor="service" className="block font-display text-sm font-bold text-ink">
            Service you&rsquo;re interested in <span className="text-wine">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={cn(fieldClasses, "mt-2", errors.service ? "border-wine" : "border-cream-dark")}
          >
            <option value="">Choose one…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Multiple services">More than one service</option>
            <option value="Something else">Something else</option>
          </select>
          {errors.service && <FieldError id="service-error">{errors.service}</FieldError>}
        </div>

        <div className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="How can we help?"
            className={cn(fieldClasses, "resize-y border-cream-dark")}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg">
          <Icon name="envelope" />
          Send message
        </Button>
        <p className="text-sm text-muted">
          Prefer the phone?{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-wine underline decoration-wine/30 underline-offset-4 hover:text-brand-500"
          >
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  hint,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block font-display text-sm font-bold text-ink">
        {label} {required && <span className="text-wine">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
        className={cn(fieldClasses, "mt-2", error ? "border-wine" : "border-cream-dark")}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && <FieldError id={errorId!}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-wine">
      <Icon name="interrogation" className="text-sm" />
      {children}
    </p>
  );
}
