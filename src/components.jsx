// UI primitives — restyled for the Underwriting Workbench look
// Drawer / icon set / partner banner pieces live here too.

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Field / inputs ----------

function Field({ label, hint, required, children, error, span = 1, optional }) {
  return (
    <label className="field" style={{ gridColumn: `span ${span}` }}>
      <div className="field__head">
        <span className="field__label">
          {label}
          {required ? <span className="field__req">*</span> : null}
          {optional ? <span className="field__opt">(optional)</span> : null}
        </span>
        {hint ? <span className="field__hint">{hint}</span> : null}
      </div>
      {children}
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, mono, type = "text", disabled, suffix, prefix }) {
  return (
    <div className={`input ${disabled ? "input--disabled" : ""}`}>
      {prefix ? <span className="input__prefix">{prefix}</span> : null}
      <input
        className={`input__el ${mono ? "input__el--mono" : ""}`}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {suffix ? <span className="input__suffix">{suffix}</span> : null}
    </div>
  );
}

function NumberInput({ value, onChange, placeholder, suffix, prefix, min, max, step = 1 }) {
  const locale = () => (window.appSettings && window.appSettings.locale) || "de-DE";
  const decimalSep = () => new Intl.NumberFormat(locale()).formatToParts(1.1).find(p => p.type === "decimal")?.value || ",";
  const groupSep   = () => new Intl.NumberFormat(locale()).formatToParts(1000).find(p => p.type === "group")?.value || ".";

  const fmt = (n) => {
    if (n == null || n === "") return "";
    const num = Number(n);
    if (isNaN(num)) return String(n);
    return new Intl.NumberFormat(locale(), { maximumFractionDigits: 2 }).format(num);
  };

  const parse = (str) => {
    if (!str) return "";
    const gs = groupSep();
    const ds = decimalSep();
    const cleaned = str.split(gs).join("").replace(ds, ".");
    const n = parseFloat(cleaned);
    return isNaN(n) ? "" : n;
  };

  const [display, setDisplay] = useState(fmt(value));
  useEffect(() => { setDisplay(fmt(value)); }, [value, locale()]);

  const handleBlur = () => {
    const parsed = parse(display);
    if (parsed === "") { setDisplay(""); onChange?.(""); return; }
    let n = Number(parsed);
    if (isNaN(n)) { setDisplay(fmt(value)); return; }
    if (min != null && n < min) n = min;
    if (max != null && n > max) n = max;
    onChange?.(n);
    setDisplay(fmt(n));
  };

  return (
    <div className={`input`}>
      {prefix ? <span className="input__prefix">{prefix}</span> : null}
      <input
        className="input__el input__el--mono"
        type="text"
        inputMode="decimal"
        value={display}
        onChange={(e) => setDisplay(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {suffix ? <span className="input__suffix">{suffix}</span> : null}
    </div>
  );
}

function Select({ value, onChange, options, placeholder, disabled }) {
  return (
    <div className={`select ${disabled ? "select--disabled" : ""}`}>
      <select
        className="select__el"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled={!!value}>{placeholder || "Select…"}</option>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value ?? o.code ?? o.label ?? o.name;
          const l = typeof o === "string" ? o : o.label ?? o.name ?? v;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
      <svg className="select__chev" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
        <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

function YesNo({ value, onChange, disabled }) {
  return (
    <div className={`yesno ${disabled ? "yesno--disabled" : ""}`}>
      <button type="button" className={`yesno__btn ${value === "Yes" ? "is-on" : ""}`} onClick={() => onChange?.("Yes")} disabled={disabled}>Yes</button>
      <button type="button" className={`yesno__btn ${value === "No"  ? "is-on" : ""}`} onClick={() => onChange?.("No")}  disabled={disabled}>No</button>
    </div>
  );
}

function Check({ checked, onChange, label, sub }) {
  return (
    <label className={`check ${checked ? "is-on" : ""}`}>
      <span className="check__box" aria-hidden="true">
        {checked ? (
          <svg viewBox="0 0 12 12" width="11" height="11"><path d="M2.5 6.2 L5 8.6 L9.5 3.7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : null}
      </span>
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange?.(e.target.checked)} hidden />
      <span className="check__body">
        <span className="check__label">{label}</span>
        {sub ? <span className="check__sub">{sub}</span> : null}
      </span>
    </label>
  );
}

// ---------- Layout helpers ----------

function Section({ title, kicker, right, children, intro }) {
  return (
    <section className="section">
      <header className="section__head">
        <div className="section__head-l">
          {kicker ? <div className="section__kicker">{kicker}</div> : null}
          <div className="section__title-row">
            <h2 className="section__title">{title}</h2>
          </div>
          {intro ? <p className="section__intro">{intro}</p> : null}
        </div>
        {right ? <div className="section__head-r">{right}</div> : null}
      </header>
      <div className="section__body">{children}</div>
    </section>
  );
}

function Group({ children, cols = 12 }) {
  return <div className="group" style={{ "--cols": cols }}>{children}</div>;
}

function HelperBanner({ children }) {
  return (
    <div className="helper-banner">
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 4.5 L8 8.8 M8 11 L8 11.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      <span>{children}</span>
    </div>
  );
}

function InfoNote({ children, tone = "info" }) {
  return <div className={`note note--${tone}`}>
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 4.5 L8 8.8 M8 11 L8 11.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
    <span>{children}</span>
  </div>;
}

function MiniBtn({ children, onClick, danger, disabled, kind = "ghost" }) {
  return (
    <button type="button" className={`mini-btn mini-btn--${kind} ${danger ? "is-danger" : ""}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Tag({ children, tone = "neutral" }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

// ---------- Icon set (Font Awesome 6) ----------
function Icon({ name, size = 16 }) {
  const map = {
    "id-card":      "fa-regular fa-id-card",
    "shield":       "fa-solid fa-shield-halved",
    "puzzle":       "fa-solid fa-puzzle-piece",
    "credit-card":  "fa-solid fa-credit-card",
    "cloud":        "fa-solid fa-toolbox",
    "doc":          "fa-regular fa-file-lines",
    "edit":         "fa-solid fa-pen-ruler",
    "list":         "fa-solid fa-list-check",
    "id-tag":       "fa-solid fa-tag",
    "sliders":      "fa-solid fa-sliders",
    "handshake":    "fa-solid fa-file-contract",
    "chev-down":    "fa-solid fa-chevron-down",
    "chev-right":   "fa-solid fa-chevron-right",
    "file":         "fa-regular fa-file",
    "clock":        "fa-regular fa-clock",
    "status":       "fa-regular fa-clipboard",
    "tag":          "fa-solid fa-tag",
    "pencil":       "fa-solid fa-pencil",
    "trash":        "fa-regular fa-trash-can",
    "feedback":     "fa-regular fa-comment-dots",
    "links":        "fa-solid fa-link",
    "user":         "fa-regular fa-user",
    "close":        "fa-solid fa-xmark",
    "settings":     "fa-solid fa-gear",
    "coins":        "fa-solid fa-coins",
    "upload":       "fa-solid fa-upload",
    "mail":         "fa-regular fa-envelope",
  };
  const cls = map[name];
  if (!cls) return null;
  return <i className={cls} aria-hidden="true" style={{ fontSize: size, width: size, display: "inline-block", textAlign: "center" }} />;
}

// ---------- Drawer (right slide-over for editing rows) ----------

function Drawer({ open, onClose, title, footer, children, width = 760 }) {
  if (!open) return null;
  return (
    <div className="drawer-root">
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer" style={{ width }}>
        <header className="drawer__head">
          <h3 className="drawer__title">{title}</h3>
          <button type="button" className="drawer__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="drawer__body">{children}</div>
        {footer ? <footer className="drawer__foot">{footer}</footer> : null}
      </aside>
    </div>
  );
}

// ---------- Display primitives (read-only main-pane cards) ----------

function DisplayCard({ title, onEdit, children, span, grid = true }) {
  return (
    <div className="dcard" style={{ gridColumn: span ? `span ${span}` : undefined }}>
      <header className="dcard__head">
        <h3 className="dcard__title">{title}</h3>
        {onEdit ? (
          <button className="dcard__edit" onClick={onEdit} aria-label={`Edit ${title}`} title={`Edit ${title}`}>
            <Icon name="pencil" size={14} />
          </button>
        ) : null}
      </header>
      <div className={`dcard__body ${grid ? "dcard__body--grid" : ""}`}>{children}</div>
    </div>
  );
}

function DisplayField({ label, value, mono, span = 1, empty = "—" }) {
  const isEmpty = value == null || value === "" || value === false;
  return (
    <div className="dfield" style={{ gridColumn: `span ${span}` }}>
      <div className="dfield__label">{label}</div>
      <div className={`dfield__value ${mono ? "is-mono" : ""} ${isEmpty ? "is-empty" : ""}`}>
        {isEmpty ? empty : value}
      </div>
    </div>
  );
}

function DisplayCardGrid({ children, cols = 2 }) {
  return <div className="dcard-grid" style={{ "--dcols": cols }}>{children}</div>;
}

// ---------- Filled (drawer) input variants ----------

function FilledInput({ value, onChange, placeholder, mono, type = "text", suffix }) {
  return (
    <div className="finput">
      <input
        className={`finput__el ${mono ? "is-mono" : ""}`}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || "Placeholder"}
      />
      {suffix ? <span className="finput__suffix">{suffix}</span> : null}
    </div>
  );
}

function FilledNumber({ value, onChange, placeholder, suffix, min, max }) {
  const locale = () => (window.appSettings && window.appSettings.locale) || "de-DE";
  const decimalSep = () => new Intl.NumberFormat(locale()).formatToParts(1.1).find(p => p.type === "decimal")?.value || ",";
  const groupSep   = () => new Intl.NumberFormat(locale()).formatToParts(1000).find(p => p.type === "group")?.value || ".";

  // Format a raw number for display
  const fmt = (n) => {
    if (n == null || n === "") return "";
    const num = Number(n);
    if (isNaN(num)) return String(n);
    return new Intl.NumberFormat(locale(), { maximumFractionDigits: 2 }).format(num);
  };

  // Parse a locale-formatted string back to a plain number string
  const parse = (str) => {
    if (!str) return "";
    const gs = groupSep();
    const ds = decimalSep();
    // Remove group separators, replace decimal sep with "."
    const cleaned = str.split(gs).join("").replace(ds, ".");
    const n = parseFloat(cleaned);
    return isNaN(n) ? "" : n;
  };

  const [display, setDisplay] = useState(fmt(value));

  // Keep display in sync when value changes externally
  useEffect(() => { setDisplay(fmt(value)); }, [value, locale()]);

  const handleChange = (e) => {
    setDisplay(e.target.value); // let user type freely
  };

  const handleBlur = () => {
    const parsed = parse(display);
    if (parsed === "") {
      setDisplay("");
      onChange?.("");
      return;
    }
    let n = Number(parsed);
    if (isNaN(n)) { setDisplay(fmt(value)); return; }
    if (min != null && n < min) n = min;
    if (max != null && n > max) n = max;
    onChange?.(n);
    setDisplay(fmt(n));
  };

  return (
    <div className="finput">
      <input
        className="finput__el is-mono"
        type="text"
        inputMode="decimal"
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || ""}
      />
      {suffix ? <span className="finput__suffix">{suffix}</span> : null}
    </div>
  );
}

function FilledSelect({ value, onChange, options, placeholder }) {
  return (
    <div className="fselect">
      <select className="fselect__el" value={value ?? ""} onChange={(e) => onChange?.(e.target.value)}>
        <option value="">{placeholder || "Placeholder"}</option>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value ?? o.code ?? o.label ?? o.name;
          const l = typeof o === "string" ? o : o.label ?? o.name ?? v;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
      <svg className="fselect__chev" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function FilledYesNo({ value, onChange }) {
  return (
    <div className="fyesno">
      <button type="button" className={`fyesno__btn ${value === "Yes" ? "is-on" : ""}`} onClick={() => onChange?.("Yes")}>Yes</button>
      <button type="button" className={`fyesno__btn ${value === "No"  ? "is-on" : ""}`} onClick={() => onChange?.("No")}>No</button>
    </div>
  );
}

function FilledRadio({ value, onChange, options }) {
  return (
    <div className="fradio">
      {options.map((opt) => (
        <label key={opt} className={`fradio__item ${value === opt ? "is-on" : ""}`} onClick={() => onChange?.(opt)}>
          <span className="fradio__circle" />
          <span className="fradio__label">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function FilledField({ label, children, span = 1 }) {
  return (
    <div className="ffield" style={{ gridColumn: `span ${span}` }}>
      <label className="ffield__label">{label}</label>
      {children}
    </div>
  );
}

function DrawerForm({ children, cols = 2 }) {
  return <div className="drawer-form-grid" style={{ "--dfcols": cols }}>{children}</div>;
}

function DrawerFooter({ onSave, onCancel, saveLabel = "Save", cancelLabel = "Cancel" }) {
  return (
    <div className="drawer-foot">
      <button className="btn btn--accent" onClick={onSave}>{saveLabel}</button>
      <button className="btn btn--outline" onClick={onCancel}>{cancelLabel}</button>
    </div>
  );
}

function FilledDate({ value, onChange, placeholder = "dd/mm/yyyy" }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  // Parse value to Date object
  const parseDate = (str) => {
    if (!str) return null;
    const parts = str.split(/[.\/\-]/);
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return new Date(+y, +m - 1, +d);
    }
    return null;
  };

  const selected = parseDate(value);
  const [viewDate, setViewDate] = React.useState(() => selected || new Date());

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const firstDayOfWeek = (y, m) => new Date(y, m, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = daysInMonth(year, month);
  const startDay = (firstDayOfWeek(year, month) + 6) % 7; // Monday first

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Mo","Tu","We","Th","Fr","Sa","Su"];

  const selectDay = (d) => {
    const dd = String(d).padStart(2, "0");
    const mm = String(month + 1).padStart(2, "0");
    onChange?.(`${dd}/${mm}/${year}`);
    setOpen(false);
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isSelected = (d) => selected && selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
  const isToday = (d) => { const t = new Date(); return t.getDate() === d && t.getMonth() === month && t.getFullYear() === year; };

  return (
    <div className="finput finput--date" ref={ref}>
      <input
        className="finput__el is-mono"
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
      />
      <span className="finput__cal-icon" onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-calendar-days"></i>
      </span>
      {open && (
        <div className="datepicker">
          <div className="datepicker__header">
            <button className="datepicker__nav" onClick={prevMonth}><i className="fa-solid fa-chevron-left"></i></button>
            <span className="datepicker__title">{monthNames[month]} {year}</span>
            <button className="datepicker__nav" onClick={nextMonth}><i className="fa-solid fa-chevron-right"></i></button>
          </div>
          <div className="datepicker__days-header">
            {dayNames.map(d => <span key={d} className="datepicker__dayname">{d}</span>)}
          </div>
          <div className="datepicker__grid">
            {Array.from({ length: startDay }).map((_, i) => <span key={`e${i}`} className="datepicker__empty"></span>)}
            {Array.from({ length: days }).map((_, i) => {
              const d = i + 1;
              return (
                <button
                  key={d}
                  className={`datepicker__day ${isSelected(d) ? "is-selected" : ""} ${isToday(d) ? "is-today" : ""}`}
                  onClick={() => selectDay(d)}
                >{d}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function NavDivider({ label }) {
  return (
    <li className="nav-divider" aria-hidden="true">
      {label ? <span className="nav-divider__label">{label}</span> : null}
    </li>
  );
}

// ---------- Maturity Assessment components ----------

function AnswerBadge({ value }) {
  if (!value) return <span className="answer-badge answer-badge--empty">—</span>;
  const colors = {
    "Yes":            { bg: "#e8f5e0", fg: "#2e7d0e", dot: "#65a518" },
    "Partially":      { bg: "#fff8e1", fg: "#b8860b", dot: "#e6a817" },
    "No":             { bg: "#fde8e8", fg: "#b71c1c", dot: "#e60018" },
    "No information": { bg: "#f0f0f0", fg: "#666",    dot: "#999" },
  };
  const c = colors[value] || colors["No information"];
  return (
    <span className="answer-badge" style={{ background: c.bg, color: c.fg }}>
      <span className="answer-badge__dot" style={{ background: c.dot }} />
      {value}
    </span>
  );
}

function RatingBadge({ label, score }) {
  const colors = {
    "Advanced":     { bg: "#e8f5e0", fg: "#2e7d0e" },
    "Progressive":  { bg: "#e3f2fd", fg: "#1565c0" },
    "Intermediate": { bg: "#fff8e1", fg: "#b8860b" },
    "Basic":        { bg: "#f0f0f0", fg: "#666" },
  };
  const c = colors[label] || colors["Basic"];
  return (
    <span className="rating-badge" style={{ background: c.bg, color: c.fg }}>
      {score != null ? <span className="rating-badge__score">{Number(score).toFixed(2)}</span> : null}
      {label}
    </span>
  );
}

function PillToggle({ options, value, onChange }) {
  return (
    <div className="pill-toggle">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`pill-toggle__btn ${value === opt.value ? "is-active" : ""}`}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function QuestionRow({ question, answer, onClick, isKeyControl }) {
  return (
    <div className={`q-row ${isKeyControl ? "q-row--key" : ""}`} onClick={onClick}>
      <span className="q-row__id">{question.id}</span>
      <span className="q-row__text">{question.question}</span>
      <span className="q-row__meta">
        {question.isOT ? <span className="q-row__ot">OT</span> : null}
        {isKeyControl ? <span className="q-row__kc">KC</span> : null}
      </span>
      <span className="q-row__answer">
        <AnswerBadge value={answer} />
      </span>
    </div>
  );
}

function DomainSummaryCard({ domain, index, score, onClick }) {
  const questions = QUESTIONS.filter((q) => q.domain === index);
  const answered = questions.filter((q) => domain.answers && domain.answers[q.id]).length;
  const total = questions.length;
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  const kcQuestions = questions.filter((q) => q.isKeyControl);
  const rating = score != null && CALC && CALC.getRatingLabel ? CALC.getRatingLabel(score) : null;

  return (
    <div className="domain-card" onClick={onClick}>
      <div className="domain-card__head">
        <div className="domain-card__name">{DOMAIN_NAMES[index]}</div>
        {rating ? <RatingBadge label={rating} score={score} /> : null}
      </div>
      <div className="domain-card__progress">
        <div className="domain-card__bar">
          <div className="domain-card__bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="domain-card__count">{answered}/{total} answered ({pct}%)</span>
      </div>
      {kcQuestions.length > 0 ? (
        <div className="domain-card__kc">{kcQuestions.length} Key Control{kcQuestions.length > 1 ? "s" : ""}</div>
      ) : null}
    </div>
  );
}

function KeyControlsGauge({ kc }) {
  const total = (kc.fulfilled || 0) + (kc.partial || 0) + (kc.notFulfilled || 0) + (kc.noInfo || 0);
  if (total === 0) return null;
  const pct = (n) => `${((n / total) * 100).toFixed(1)}%`;

  return (
    <div className="kc-gauge">
      <div className="kc-gauge__bar">
        {kc.fulfilled > 0 ? <div className="kc-gauge__seg kc-gauge__seg--ok" style={{ width: pct(kc.fulfilled) }} /> : null}
        {kc.partial > 0 ? <div className="kc-gauge__seg kc-gauge__seg--partial" style={{ width: pct(kc.partial) }} /> : null}
        {kc.notFulfilled > 0 ? <div className="kc-gauge__seg kc-gauge__seg--bad" style={{ width: pct(kc.notFulfilled) }} /> : null}
        {kc.noInfo > 0 ? <div className="kc-gauge__seg kc-gauge__seg--none" style={{ width: pct(kc.noInfo) }} /> : null}
      </div>
      <div className="kc-gauge__legend">
        <span className="kc-dot kc-dot--ok" /><span>Fulfilled ({kc.fulfilled})</span>
        <span className="kc-dot kc-dot--partial" /><span>Partial ({kc.partial})</span>
        <span className="kc-dot kc-dot--bad" /><span>Not fulfilled ({kc.notFulfilled})</span>
        <span className="kc-dot kc-dot--none" /><span>No info ({kc.noInfo})</span>
      </div>
    </div>
  );
}

// ==========================================================================
// MA Status Widget
// ==========================================================================

function MaStatusBar({ ma, maStatusVariant, setMaStatusVariant, onNavigate }) {
  const answers = (ma && ma.answers) || {};
  const businessSize = (ma && ma.businessSize) || "XL";
  const includeOT = ma ? ma.includeOT !== false : true;
  const uwOverrides = (ma && ma.uwOverrides) || {};

  const overall = CALC.overallRating(answers, businessSize, includeOT, uwOverrides);
  const answered = overall.totalAnswered || 0;
  const total = overall.totalQuestions || 0;
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  const kc = overall.keyControls || {};
  const kcTotal = (kc.fulfilled || 0) + (kc.partial || 0) + (kc.notFulfilled || 0) + (kc.noInfo || 0);
  const kcPct = (n) => kcTotal > 0 ? `${((n / kcTotal) * 100).toFixed(1)}%` : "0%";

  const isCompact = maStatusVariant === true;

  return (
    <div className={`ma-status-bar${isCompact ? " ma-status-bar--compact" : ""}`}>
      <span className="ma-status-bar__label">Maturity Assessment</span>

      {/* Progress */}
      <div className="ma-status-bar__group">
        <span className="ma-status-bar__count">{answered}/{total}</span>
        <div className="ma-mini-bar">
          <div className="ma-mini-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="ma-status-bar__count" style={{ color: "var(--fg-muted)", fontSize: 11 }}>{pct}%</span>
      </div>

      <span className="ma-stat-divider" />

      {/* Key Controls */}
      <div className="ma-status-bar__group">
        <span className="ma-status-bar__count">KC: {kc.fulfilled || 0}/{kcTotal}</span>
        {kcTotal > 0 ? (
          <div className="ma-mini-kc-bar">
            {kc.fulfilled > 0 ? <div className="ma-mini-kc-bar__seg--ok" style={{ width: kcPct(kc.fulfilled) }} /> : null}
            {kc.partial > 0 ? <div className="ma-mini-kc-bar__seg--partial" style={{ width: kcPct(kc.partial) }} /> : null}
            {kc.notFulfilled > 0 ? <div className="ma-mini-kc-bar__seg--bad" style={{ width: kcPct(kc.notFulfilled) }} /> : null}
            {kc.noInfo > 0 ? <div className="ma-mini-kc-bar__seg--none" style={{ width: kcPct(kc.noInfo) }} /> : null}
          </div>
        ) : null}
      </div>

      <span className="ma-stat-divider" />

      {/* Overall rating */}
      <div className="ma-status-bar__group">
        <RatingBadge label={overall.label} score={overall.score} />
      </div>

      <span className="ma-status-bar__spacer" />

      {/* Variant toggle */}
      <button
        className="ma-status-bar__toggle"
        onClick={() => setMaStatusVariant(!maStatusVariant)}
      >
        {isCompact ? "‹ Hide details" : "Details ▸"}
      </button>
    </div>
  );
}

function MaSidePanel({ ma, onNavigate, onHide }) {
  const answers = (ma && ma.answers) || {};
  const businessSize = (ma && ma.businessSize) || "XL";
  const includeOT = ma ? ma.includeOT !== false : true;
  const uwOverrides = (ma && ma.uwOverrides) || {};

  const overall = CALC.overallRating(answers, businessSize, includeOT, uwOverrides);
  const answered = overall.totalAnswered || 0;
  const total = overall.totalQuestions || 0;
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  const kc = overall.keyControls || {};
  const kcTotal = (kc.fulfilled || 0) + (kc.partial || 0) + (kc.notFulfilled || 0) + (kc.noInfo || 0);

  // Rating dot colours
  const ratingColor = {
    "Advanced":     "#65a518",
    "Progressive":  "#1565c0",
    "Intermediate": "#b8860b",
    "Basic":        "#aaa",
  };

  return (
    <div className="ma-side-panel">
      {/* Header */}
      <div className="ma-side-panel__head">
        <span className="ma-side-panel__title">MA Status</span>
        <button className="ma-side-panel__hide" onClick={onHide}>‹ Hide</button>
      </div>

      {/* Overall rating + progress */}
      <div className="ma-sp-section">
        <RatingBadge label={overall.label} score={overall.score} />
        <span className="ma-sp-progress-text">{answered}/{total} answered ({pct}%)</span>
        <div className="ma-sp-bar">
          <div className="ma-sp-bar__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Key controls */}
      <div className="ma-sp-section">
        <div className="ma-side-panel__section-label">Key Controls</div>
        <div className="ma-sp-kc-bar">
          {kc.fulfilled > 0 ? <div className="ma-sp-kc-bar__seg ma-sp-kc-bar__seg--ok" style={{ width: `${((kc.fulfilled / kcTotal) * 100).toFixed(1)}%` }} /> : null}
          {kc.partial > 0 ? <div className="ma-sp-kc-bar__seg ma-sp-kc-bar__seg--partial" style={{ width: `${((kc.partial / kcTotal) * 100).toFixed(1)}%` }} /> : null}
          {kc.notFulfilled > 0 ? <div className="ma-sp-kc-bar__seg ma-sp-kc-bar__seg--bad" style={{ width: `${((kc.notFulfilled / kcTotal) * 100).toFixed(1)}%` }} /> : null}
          {kc.noInfo > 0 ? <div className="ma-sp-kc-bar__seg ma-sp-kc-bar__seg--none" style={{ width: `${((kc.noInfo / kcTotal) * 100).toFixed(1)}%` }} /> : null}
        </div>
        <div className="ma-sp-kc-legend">
          <span className="ma-sp-kc-legend__item"><span className="kc-dot kc-dot--ok" /> Fulfilled ({kc.fulfilled || 0})</span>
          <span className="ma-sp-kc-legend__item"><span className="kc-dot kc-dot--partial" /> Partial ({kc.partial || 0})</span>
          <span className="ma-sp-kc-legend__item"><span className="kc-dot kc-dot--bad" /> Not fulfilled ({kc.notFulfilled || 0})</span>
          <span className="ma-sp-kc-legend__item"><span className="kc-dot kc-dot--none" /> No info ({kc.noInfo || 0})</span>
        </div>
      </div>

      {/* Per-domain rows (domains 1–9) */}
      <div className="ma-sp-section">
        <div className="ma-side-panel__section-label">Domains</div>
        <div className="ma-sp-domain-list">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((idx) => {
            const ds = CALC.domainScore(idx, answers, businessSize, includeOT);
            const override = (uwOverrides || {})[idx];
            const label = override ? override.rating : ds.label;
            const dotColor = ratingColor[label] || "#aaa";
            const shortName = DOMAIN_NAMES[idx]
              ? DOMAIN_NAMES[idx].replace(/^\d+\.\s*/, "")
              : `Domain ${idx}`;
            return (
              <div
                key={idx}
                className="ma-sp-domain"
                onClick={() => onNavigate && onNavigate("maDomain" + idx)}
              >
                <span className="ma-sp-domain__name" title={DOMAIN_NAMES[idx]}>{shortName}</span>
                <span className="ma-sp-domain__count">{ds.answered}/{ds.total}</span>
                <span className="ma-sp-domain__dot" style={{ background: dotColor }} title={label} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---- Role Toggle ----
function RoleToggle({ role, onToggle }) {
  const isSuperUser = role === "superuser";
  return (
    <div className="role-toggle" onClick={onToggle} title={isSuperUser ? "Switch to UW mode" : "Switch to Super User mode"}>
      <span className={`role-toggle__label ${!isSuperUser ? "role-toggle__label--active" : ""}`}>UW</span>
      <div className={`role-toggle__track ${isSuperUser ? "role-toggle__track--on" : ""}`}>
        <div className="role-toggle__thumb" />
      </div>
      <span className={`role-toggle__label ${isSuperUser ? "role-toggle__label--active" : ""}`}>Super User</span>
    </div>
  );
}

Object.assign(window, {
  Field, TextInput, NumberInput, Select, YesNo, Check,
  Section, Group, HelperBanner, InfoNote, MiniBtn, Tag,
  Icon, Drawer,
  DisplayCard, DisplayField, DisplayCardGrid,
  FilledInput, FilledNumber, FilledSelect, FilledYesNo, FilledRadio, FilledField, FilledDate,
  DrawerForm, DrawerFooter, NavDivider,
  AnswerBadge, RatingBadge, PillToggle, QuestionRow, DomainSummaryCard, KeyControlsGauge,
  MaStatusBar, MaSidePanel, RoleToggle,
});
