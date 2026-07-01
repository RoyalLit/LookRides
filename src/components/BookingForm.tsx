'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Navigation, Calendar, Clock, Phone, User, X, Send } from 'lucide-react';
import { Spinner } from '@/components/Skeleton';
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
        const res = await fetch(`/api/locations?q=${encodeURIComponent(query)}`, {
          headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error("API Proxy failed");
        const data = await res.json();
        
        // Photon returns 'features' array
        const results = data.features
          .filter((f: any) => f.properties?.countrycode === 'IN')
          .map((f: any) => {
            const props = f.properties;
            const rawParts = [props.name, props.city, props.state].filter(Boolean);
            // Collapse duplicate parts (e.g. "Chandigarh, Chandigarh" -> "Chandigarh")
            const parts = Array.from(new Set(rawParts));
            return {
              place_id: f.geometry.coordinates.join(','),
              display_name: parts.join(', '),
            };
          });

        // Deduplicate based on exact display_name
        const uniqueResults: Suggestion[] = [];
        const seen = new Set<string>();
        for (const item of results) {
          if (!seen.has(item.display_name)) {
            seen.add(item.display_name);
            uniqueResults.push(item);
          }
        }
        
        setSuggestions(uniqueResults);
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

      {open && value.length >= 3 && (
        <ul className={styles.suggestions} role="listbox">
          {loading && <li className={styles.suggestLoading}>Searching…</li>}
          {!loading && suggestions.length === 0 && (
            <li className={styles.suggestLoading}>No results found for "{value}"</li>
          )}
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateInput = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const el = e.target;
    let msg = '';
    
    // Validate only if there's a value or on blur. We don't want to yell at empty fields while typing.
    if (el.value || e.type === 'blur') {
      if (el.name === 'date_display') {
        if (el.value.length === 10 && !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(el.value)) {
          msg = 'Invalid date (DD/MM/YYYY)';
        } else if (e.type === 'blur' && el.value.length > 0 && el.value.length < 10) {
          msg = 'Incomplete date';
        } else if (e.type === 'blur' && !el.value) {
          msg = 'Travel date is required';
        }
      } else if (!el.validity.valid) {
        if (el.validity.patternMismatch) {
          if (el.name === 'phone') msg = 'Mobile number must be exactly 10 digits';
        } else if (el.validity.valueMissing) {
          msg = 'This field is required';
        } else {
          msg = 'Invalid format';
        }
      }
    }
    
    // Clear error immediately if typing and it becomes valid
    if (e.type === 'change' && msg === '' && fieldErrors[el.name]) {
      setFieldErrors(prev => ({ ...prev, [el.name]: '' }));
    } 
    // Set error on blur or if an error already exists and they are changing it but it's still wrong
    else if (e.type === 'blur' || (e.type === 'change' && fieldErrors[el.name])) {
      setFieldErrors(prev => ({ ...prev, [el.name]: msg }));
    }
  };

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
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="9876543210" 
                required 
                pattern="\d{10}"
                maxLength={10}
                className={fieldErrors.phone ? styles.inputError : ''}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '');
                  validateInput(e);
                }}
                onBlur={validateInput}
              />
            </div>
            {fieldErrors.phone && <span className={styles.errorText}>{fieldErrors.phone}</span>}
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
                pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/\d{4}"
                inputMode="numeric"
                maxLength={10}
                required
                className={fieldErrors.date_display ? styles.inputError : ''}
                onBlur={validateInput}
                onChange={(e) => {
                  // Auto-insert slashes: 01/05/2025
                  let v = e.target.value.replace(/\D/g, '');
                  if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                  if (v.length >= 6) v = v.slice(0, 5) + '/' + v.slice(5, 9);
                  e.target.value = v;
                  validateInput(e);
                }}
              />
            </div>
            {fieldErrors.date_display && <span className={styles.errorText}>{fieldErrors.date_display}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="time"><Clock size={13} /> Pickup Time</label>
            <div className={styles.inputWrap}>
              <input 
                type="time" 
                id="time" 
                name="time" 
                required
                className={fieldErrors.time ? styles.inputError : ''}
                onChange={validateInput}
                onBlur={validateInput}
              />
            </div>
            {fieldErrors.time && <span className={styles.errorText}>{fieldErrors.time}</span>}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? <Spinner size={18} light /> : <Send size={16} />}
          {loading ? '' : 'Check Availability & Book'}
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
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}><Spinner size={24} /></div>}>
      <FormInner />
    </Suspense>
  );
}
