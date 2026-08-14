type IconProps = { className?: string };

export function FacebookIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14 9.5V7.7c0-.9.6-1.1 1-1.1h2.5V3h-3.5C10.9 3 10 5.1 10 7.4v2.1H8v3.5h2V21h4v-7.9h2.7l.4-3.5H14Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 3h4.2l4 5.6L16.8 3H20l-6.4 8.4L20.4 21h-4.2l-4.4-6.1L6.8 21H3.5l6.9-9L4 3Z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.2c-.4 0-1.3.1-2.1.9C2.6 5.7 2.4 7.2 2.4 7.2S2.2 9 2.2 10.7v1.6c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.9.8 2.3.9C7 19 12 19 12 19s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.5v-1.6c0-1.8-.2-3.5-.2-3.5ZM9.9 14.1V8.9l5.4 2.6-5.4 2.6Z" />
    </svg>
  );
}

export function MegaphoneIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3 11v2a2 2 0 0 0 2 2h1l2 6h2l-1.2-6H10l9 4V5l-9 4H5a2 2 0 0 0-2 2Z" />
      <path d="M18 9.5a3.5 3.5 0 0 1 0 5" />
    </svg>
  );
}

export function RssIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4 4a16 16 0 0 1 16 16" />
      <path d="M4 10.5a9.5 9.5 0 0 1 9.5 9.5" />
      <circle cx="6" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M9 15 15 9" />
      <path d="M10.5 6.5 12 5a3.5 3.5 0 1 1 5 5l-1.5 1.5" />
      <path d="M13.5 17.5 12 19a3.5 3.5 0 1 1-5-5l1.5-1.5" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  );
}

export function LeafIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4 20c0-9 6-15 16-15 0 10-6 16-16 15Z" />
      <path d="M6 18c4-4 8-7 11-11" />
    </svg>
  );
}
export function MailIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PhoneIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M6 3h3l1.5 4.5L8.5 9a12 12 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function PinIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}
