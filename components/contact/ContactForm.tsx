"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useId,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import { Turnstile } from "@/components/contact/Turnstile";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { isValidInternationalPhone, toE164 } from "@/lib/phone";
import { services, site } from "@/lib/site";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

type Fields = {
  name: string;
  email: string;
  phone: string;
  petName: string;
  service: string;
  message: string;
};

const emptyForm: Fields = {
  name: "",
  email: "",
  phone: "",
  petName: "",
  service: "",
  message: "",
};

const FIELD_LABELS = {
  name: "Your name",
  email: "Email",
  phone: "Phone",
  service: "Service",
} as const;

type RequiredField = keyof typeof FIELD_LABELS;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ValidationResult = {
  message: string | null;
  invalidFields: RequiredField[];
};

function validate(values: Fields): ValidationResult {
  const missing: RequiredField[] = [];
  const invalidFormat: RequiredField[] = [];

  if (!values.name.trim()) missing.push("name");

  if (!values.email.trim()) {
    missing.push("email");
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    invalidFormat.push("email");
  }

  if (!values.phone.trim()) {
    missing.push("phone");
  } else if (!isValidInternationalPhone(values.phone)) {
    invalidFormat.push("phone");
  }

  if (!values.service) missing.push("service");

  const invalidFields = [...new Set([...missing, ...invalidFormat])];

  if (invalidFields.length === 0) {
    return { message: null, invalidFields: [] };
  }

  const parts: string[] = [];

  if (missing.length > 0) {
    const names = missing.map((key) => FIELD_LABELS[key]);
    parts.push(
      missing.length === 1
        ? `Please fill in ${names[0]}.`
        : `Please fill in: ${formatList(names)}.`,
    );
  }

  if (invalidFormat.length > 0) {
    const names = invalidFormat.map((key) => FIELD_LABELS[key]);
    parts.push(
      invalidFormat.length === 1
        ? `${names[0]} doesn’t look quite right.`
        : `${formatList(names)} don’t look quite right.`,
    );
  }

  return { message: parts.join(" "), invalidFields };
}

function formatList(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

const fieldClasses =
  "w-full min-w-0 max-w-full rounded-[0.875rem] border bg-white px-3 py-3 text-body-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:outline-none focus:ring-2 sm:px-4";

const fieldOkClasses = "border-cream-dark focus:border-brand-500 focus:ring-brand-200";
const fieldErrorClasses = "border-wine ring-1 ring-wine/30 focus:border-wine focus:ring-wine/25";

export function ContactForm() {
  const router = useRouter();
  const [values, setValues] = useState<Fields>(emptyForm);
  const [summary, setSummary] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState<RequiredField[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const summaryId = useId();

  const onTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
    setSummary(null);
  }, []);
  const onTurnstileExpire = useCallback(() => setTurnstileToken(""), []);
  const onTurnstileError = useCallback(() => {
    setTurnstileToken("");
    setSummary("Captcha failed to load. Please refresh and try again.");
  }, []);

  const update = (field: keyof Fields, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (summary) setSummary(null);
    if (invalidFields.includes(field as RequiredField)) {
      setInvalidFields((current) => current.filter((key) => key !== field));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validate(values);
    setSummary(result.message);
    setInvalidFields(result.invalidFields);
    if (result.message) {
      requestAnimationFrame(() => {
        document.getElementById("form-validation-summary")?.focus();
      });
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSummary("Please complete the captcha.");
      requestAnimationFrame(() => {
        document.getElementById("form-validation-summary")?.focus();
      });
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: toE164(values.phone) ?? values.phone.trim(),
      petName: values.petName.trim(),
      service: values.service,
      message: values.message.trim(),
      turnstileToken,
    };

    setSubmitting(true);
    try {
      // Posts through our API so the upstream form URL stays server-only.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: { success?: boolean; redirect_url?: string; error?: string } | null = null;
      try {
        data = (await response.json()) as {
          success?: boolean;
          redirect_url?: string;
          error?: string;
        };
      } catch {
        data = null;
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || "We couldn’t send your message. Please try again or call us.");
      }

      router.push(data?.redirect_url || "/thank-you");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn’t send your message. Please try again or call us.";
      setSummary(message);
      setTurnstileToken("");
      setTurnstileKey((key) => key + 1);
      requestAnimationFrame(() => {
        document.getElementById("form-validation-summary")?.focus();
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isInvalid = (field: RequiredField) => invalidFields.includes(field);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full min-w-0 rounded-[1.5rem] bg-white p-5 shadow-[0_10px_30px_rgba(13,44,56,0.06)] ring-1 ring-cream-dark sm:p-7 lg:p-9"
      aria-describedby={summary ? summaryId : undefined}
    >
      <h2 className="text-display-sm">Send Us a Message</h2>
      <p className="mt-3 text-body-sm text-muted">
        Tell us a little about your dog and what you need. We usually reply the same business day.
      </p>

      {summary ? (
        <p
          id="form-validation-summary"
          tabIndex={-1}
          role="alert"
          aria-live="polite"
          className="mt-6 flex items-start gap-2 rounded-[0.875rem] bg-wine/8 px-4 py-3 text-sm font-semibold text-wine outline-none ring-1 ring-wine/20"
        >
          <Icon name="interrogation" className="mt-0.5 shrink-0 text-sm" />
          <span id={summaryId}>{summary}</span>
        </p>
      ) : null}

      <p className={cn("text-sm text-muted", summary ? "mt-5" : "mt-8")}>
        Fields marked with an asterisk (<span className="font-semibold text-wine">*</span>) are
        required.
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          required
          value={values.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
          placeholder="Jordan Blake"
          invalid={isInvalid("name")}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={(value) => update("email", value)}
          autoComplete="email"
          placeholder="you@example.com"
          invalid={isInvalid("email")}
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          required
          value={values.phone}
          onChange={(value) => update("phone", value)}
          autoComplete="tel"
          inputMode="tel"
          placeholder="+1 (417) 501-1053"
          hint="US or international format with country code is fine."
          invalid={isInvalid("phone")}
        />
        <Field
          id="petName"
          label="Dog's name"
          value={values.petName}
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
            aria-invalid={isInvalid("service")}
            className={cn(
              fieldClasses,
              "mt-2",
              isInvalid("service") ? fieldErrorClasses : fieldOkClasses,
            )}
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
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block font-display text-sm font-bold text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="How can we help?"
            className={cn(fieldClasses, fieldOkClasses, "mt-2 resize-y")}
          />
        </div>

        {TURNSTILE_SITE_KEY ? (
          <div className="sm:col-span-2">
            <Turnstile
              key={turnstileKey}
              siteKey={TURNSTILE_SITE_KEY}
              onToken={onTurnstileToken}
              onExpire={onTurnstileExpire}
              onError={onTurnstileError}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={submitting || (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)}
        >
          <Icon name="envelope" />
          {submitting ? "Sending…" : "Send message"}
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
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  hint?: string;
  invalid?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  inputMode,
  hint,
  invalid = false,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;

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
        inputMode={inputMode}
        aria-invalid={invalid}
        aria-describedby={hintId}
        className={cn(fieldClasses, "mt-2", invalid ? fieldErrorClasses : fieldOkClasses)}
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
