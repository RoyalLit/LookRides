'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Navigation, Calendar, Clock, Phone, User, X } from 'lucide-react';
import styles from './BookingForm.module.css';

/* ── Location autocomplete via OpenStreetMap (free, no key) ── */
interface Suggestion {
  display_name: string;
  place_id: string;
}

function useLocationSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const search = useCallback((query: string) => {
    clearTimeout(timerRef.current);
    if (!query || query.length < 3) { setSuggestions([]); return; }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&location_bias_scale=0.5&bbox=68.1,6.5,97.4,35.5`, // Bounding box for India
          { headers: { 'Accept': 'application/json' } }
        );
        const data = await res.json();
        
        // Photon returns 'features' array
        const results = data.features.map((f: { geometry: { coordinates: unknown[] }; properties: { name?: string; city?: string; state?: string } }) => {
          const props = f.properties;
          const parts = [props.name, props.city, props.state].filter(Boolean);
          return {
            place_id: f.geometry.coordinates.join(','),
            display_name: parts.join(', '),
          };
        });
        setSuggestions(results);
      } catch { setSuggestions([]); }
      finally { setLoading(false); }
    }, 350);
  }, []);

  const clear = () => setSuggestions([]);
  return { suggestions, loading, search, clear };
}

/* ── Location Field Component ──────────────────────────────── */
function LocationField({
  id, name, label, placeholder, icon: Icon, initialValue = ''
}: {
  id: string; name: string; label: string; placeholder: string;
  icon: typeof MapPin; initialValue?: string;
}) {
  const [value, setValue] = useState<string>(initialValue || '');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { suggestions, loading, search, clear } = useLocationSuggestions();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
        clear();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [clear]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[activeIndex];
      setValue(selected.display_name);
      setOpen(false);
      setActiveIndex(-1);
      clear();
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className={styles.field} ref={wrapRef}>
      <label htmlFor={id}>
        <Icon size={13} /> {label}
      </label>
      <div className={styles.inputWrap}>
        <input
          type="text"
          id={id}
          name={name}
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          required
          ref={inputRef}
          onChange={(e) => {
            setValue(e.target.value);
            search(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => { if (suggestions.length) setOpen(true); }}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-haspopup="listbox"
        />
        {value && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => { setValue(''); clear(); setOpen(false); setActiveIndex(-1); }}
            aria-label="Clear"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && (loading || suggestions.length > 0) && (
        <ul className={styles.suggestions} role="listbox">
          {loading && <li className={styles.suggestLoading}>Searching…</li>}
          {suggestions.map((s, idx) => (
            <li
              key={s.place_id}
              role="option"
              aria-selected={idx === activeIndex}
              className={`${styles.suggestItem} ${idx === activeIndex ? styles.suggestItemActive : ''}`}
              onMouseDown={() => {
                setValue(s.display_name);
                setOpen(false);
                setActiveIndex(-1);
                clear();
              }}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <MapPin size={13} className={styles.suggestIcon} />
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Main Booking Form ─────────────────────────────────────── */
function FormInner() {
  const searchParams = useSearchParams();
  const initialPickup = searchParams.get('pickup') || '';
  const initialDrop = searchParams.get('drop') || '';

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData(e.currentTarget);

    // Convert DD/MM/YYYY → ISO date for API
    const rawDate = fd.get('date_display') as string;
    let isoDate = '';
    if (rawDate && /^\d{2}\/\d{2}\/\d{4}$/.test(rawDate)) {
      const [d, m, y] = rawDate.split('/');
      isoDate = `${y}-${m}-${d}`;
    } else {
      isoDate = rawDate || '';
    }

    const payload = {
      pickup_location: fd.get('pickup_location'),
      drop_location:   fd.get('drop_location'),
      date:            isoDate,
      time:            fd.get('time'),
      passenger_name:  fd.get('passenger_name'),
      phone:           fd.get('phone'),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to submit booking');
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 8000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formBody}>
      <div aria-live="polite" role="status">
        {success && (
          <div className={styles.successBox} id="booking-success">
            &#x2713; &nbsp;Booking request received! We&apos;ll call you shortly to confirm.
          </div>
        )}
        {error && (
          <div className={styles.errorBox} id="booking-error">{error}</div>
        )}
      </div>

      <form className={styles.form} onSubmit={handleSubmit} aria-describedby={error ? 'booking-error' : success ? 'booking-success' : undefined}>

        {/* Name & Phone row */}
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="passenger_name"><User size={13} /> Your Name</label>
            <div className={styles.inputWrap}>
              <input type="text" id="passenger_name" name="passenger_name" placeholder="Full Name" required />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="phone"><Phone size={13} /> Mobile Number</label>
            <div className={styles.inputWrap}>
              <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" required pattern="[0-9+\s\-]{7,15}" />
            </div>
          </div>
        </div>

        {/* Pickup */}
        <LocationField
          id="pickup_location"
          name="pickup_location"
          label="Pickup Location"
          placeholder="e.g. Derabassi, Sector 17 Chandigarh…"
          icon={MapPin}
          initialValue={initialPickup}
        />

        {/* Drop */}
        <LocationField
          id="drop_location"
          name="drop_location"
          label="Drop Location"
          placeholder="e.g. IGI Airport, Manali, Shimla…"
          icon={Navigation}
          initialValue={initialDrop}
        />

        {/* Date (DD/MM/YYYY) & Time row */}
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="date_display"><Calendar size={13} /> Travel Date</label>
            <div className={styles.inputWrap}>
              <input
                type="text"
                id="date_display"
                name="date_display"
                placeholder="DD/MM/YYYY"
                pattern="\d{2}/\d{2}/\d{4}"
                inputMode="numeric"
                maxLength={10}
                required
                onChange={(e) => {
                  // Auto-insert slashes: 01/05/2025
                  let v = e.target.value.replace(/\D/g, '');
                  if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                  if (v.length >= 6) v = v.slice(0, 5) + '/' + v.slice(5, 9);
                  e.target.value = v;
                }}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="time"><Clock size={13} /> Pickup Time</label>
            <div className={styles.inputWrap}>
              <input type="time" id="time" name="time" required />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Sending…' : 'Check Availability & Book'}
        </button>
      </form>

      <p className={styles.orCall}>
        Prefer to call? <a href="tel:+919780426567">+91 97804 26567</a>
      </p>
    </div>
  );
}

export default function BookingForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormInner />
    </Suspense>
  );
}
