// Cyber Maturity Assessment — Workbench shell
// Header (logo + workbench title + Feedback/Links/User)
// Sidebar (grouped nav matching the live cyber app)
// Main pane (Partner banner + current step content)

const { useState: useState_app, useEffect: useEffect_app, useMemo: useMemo_app } = React;

// ---- Initial state (matches live cyber app banner) ----
function makeInitialState() {
  return {
    offerNr: "CY-8021106222",
    optionNr: 1,
    lastModified: "19/06/2026 12:31h",

    client: {
      partner: "Unknown",
      partnerId: "N/A",
      status: "Draft",
    },

    maStatusVariant: false,  // false = sticky bar only; true = bar + side panel

    // Maturity Assessment state
    ma: {
      businessSize: "XL",
      includeOT: true,
      answers: {},       // { [uid]: { answer, reAnswer, remarks } }
      uwOverrides: {},   // { [domainIndex]: { score, rating, reasoning } }
    },
    // BI Assessment state
    bi: {
      year: 2026,
      turnover: 450000000,
      turnoverTrend: 3,
      profitMargin: 14,
      fixCosts: 28,
      otherCosts: 1200000,
      deductible: 500000,
      limit: 10000000,
      waitingPeriod: true,
      waitingPeriodHours: 12,
    },
  };
}

// ---- Navigation tree (matches the live cyber app) ----
const NAV = [
  { id: "generalData", label: "General Data", icon: "id-card" },
  { id: "riskProfile", label: "Risk Profile", icon: "shield", group: true, children: [
    { id: "generalInfo",       label: "General Information" },
    { id: "exposureProfile",   label: "General Exposure Profile" },
    { id: "riskAssessment",    label: "Risk Assessment" },
    { id: "exclusionsReview",  label: "Exclusions Review" },
    { id: "standardsCerts",    label: "Standards & Certifications" },
    { id: "maturityAssessment", label: "Maturity Assessment", group: true, children: [
      { id: "maOverview",      label: "Overview" },
      { id: "maDomain0",      label: "Additional Information" },
      { id: "maDomain1",      label: "1. Info Security Org" },
      { id: "maDomain2",      label: "2. Managing Data" },
      { id: "maDomain3",      label: "3. Data Protection" },
      { id: "maDomain4",      label: "4. Security Awareness" },
      { id: "maDomain5",      label: "5. Protection of IT" },
      { id: "maDomain6",      label: "6. Network Security" },
      { id: "maDomain7",      label: "7. Identity Management" },
      { id: "maDomain8",      label: "8. Incident / BCM" },
      { id: "maDomain9",      label: "9. External Providers" },
      { id: "maBiAssessment", label: "BI Assessment" },
      { id: "maAiImport",     label: "AI Import" },
    ]},
    { id: "partyExposure",     label: "Party Exposure & Hazard Groups" },
  ]},
  { id: "programCoverage",     label: "Program Coverage",        icon: "puzzle" },
  { id: "costData",            label: "Cost Data",               icon: "credit-card" },
  { id: "calcAdjustment",      label: "Calculation / Adjustment", icon: "sliders", group: true, children: [
    { id: "premiumResult", label: "Premium Result" },
  ]},
  { id: "submitOffers",        label: "Submit Offer(s)",         icon: "list" },
  { id: "conclusion",          label: "Conclusion",             icon: "file" },
];

const STEP_COMP = {
  generalData:        Step_GeneralData,
  generalInfo:        Step_GeneralInfo,
  exposureProfile:    Step_ExposureProfile,
  riskAssessment:     Step_RiskAssessment,
  exclusionsReview:   Step_ExclusionsReview,
  standardsCerts:     Step_StandardsCerts,
  maOverview:      Step_MaOverview,
  maDomain0:       Step_MaDomain,
  maDomain1:       Step_MaDomain,
  maDomain2:       Step_MaDomain,
  maDomain3:       Step_MaDomainInline,
  maDomain4:       Step_MaDomain,
  maDomain5:       Step_MaDomain,
  maDomain6:       Step_MaDomain,
  maDomain7:       Step_MaDomain,
  maDomain8:       Step_MaDomain,
  maDomain9:       Step_MaDomain,
  maBiAssessment:  Step_MaBiAssessment,
  maAiImport:      Step_MaAiImport,
  partyExposure:      Step_PartyExposure,
  programCoverage:    Step_ProgramCoverage,
  costData:           Step_CostData,
  calcAdjustment:     Step_CalcAdjustment,
  premiumResult:      Step_PremiumResult,
  submitOffers:       Step_SubmitOffers,
  conclusion:         Step_Conclusion,
};

// All flat (ordered) IDs for prev/next nav
const FLAT_IDS = (function () {
  const ids = [];
  const walk = (items) => {
    items.forEach((n) => {
      if (n.children) {
        // If the group itself is a navigable item (not just a container), add it
        if (!n.group || n.icon) ids.push(n.id);
        walk(n.children);
      } else {
        ids.push(n.id);
      }
    });
  };
  // For flat IDs, we just want leaf-level navigable items
  const collect = (items) => {
    items.forEach((n) => {
      if (n.group && n.children) {
        n.children.forEach((c) => {
          if (c.group && c.children) {
            c.children.forEach((gc) => ids.push(gc.id));
          } else {
            ids.push(c.id);
          }
        });
      } else {
        ids.push(n.id);
      }
    });
  };
  collect(NAV);
  return ids;
})();

// ---- Main App ----
function App() {
  const [state, setState] = useState_app(makeInitialState);
  const [activeId, setActiveId] = useState_app(() => {
    const hash = window.location.hash.replace("#", "");
    return (hash && STEP_COMP[hash]) ? hash : "generalData";
  });

  // Sync hash to activeId on load (browser back/forward)
  useEffect_app(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && STEP_COMP[hash]) setActiveId(hash);
      else setActiveId("generalData");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const [openGroups, setOpenGroups] = useState_app({ riskProfile: true, maturityAssessment: true });

  // Persist
  useEffect_app(() => {
    try {
      const saved = localStorage.getItem("cyber_ma_state_v1");
      if (saved) setState((s) => ({ ...s, ...JSON.parse(saved) }));
    } catch (e) {}
  }, []);
  useEffect_app(() => { try { localStorage.setItem("cyber_ma_state_v1", JSON.stringify(state)); } catch (e) {} }, [state]);

  const setSlice = (slice) => { setState((s) => ({ ...s, ...slice })); };
  const setMaStatusVariant = (v) => setState((s) => ({ ...s, maStatusVariant: v }));

  // Active step component
  const StepComp = STEP_COMP[activeId] || Step_GeneralData;

  // Active nav label
  const activeLabel = (() => {
    const find = (items) => {
      for (const n of items) {
        if (n.id === activeId) return n.label;
        if (n.children) {
          const found = find(n.children);
          if (found) return found;
        }
      }
      return null;
    };
    return find(NAV) || "";
  })();

  const goNext = () => {
    const idx = FLAT_IDS.indexOf(activeId);
    if (idx >= 0 && idx < FLAT_IDS.length - 1) {
      const next = FLAT_IDS[idx + 1];
      setActiveId(next);
      window.location.hash = next;
      ensureGroupOpen(next);
    }
  };
  const goPrev = () => {
    const idx = FLAT_IDS.indexOf(activeId);
    if (idx > 0) {
      const prev = FLAT_IDS[idx - 1];
      setActiveId(prev);
      window.location.hash = prev;
      ensureGroupOpen(prev);
    }
  };
  const ensureGroupOpen = (id) => {
    NAV.forEach((n) => {
      if (n.children) {
        if (n.children.some((c) => c.id === id)) {
          setOpenGroups((g) => ({ ...g, [n.id]: true }));
        }
        // Also check nested groups (e.g. maturityAssessment children)
        n.children.forEach((c) => {
          if (c.children && c.children.some((gc) => gc.id === id)) {
            setOpenGroups((g) => ({ ...g, [n.id]: true, [c.id]: true }));
          }
        });
      }
    });
  };

  const flatIdx = FLAT_IDS.indexOf(activeId);
  const isLast = flatIdx === FLAT_IDS.length - 1;
  const isFirst = flatIdx === 0;

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar
          nav={NAV}
          activeId={activeId}
          state={state}
          onPick={(id) => { setActiveId(id); window.location.hash = id; ensureGroupOpen(id); }}
          openGroups={openGroups}
          toggleGroup={(id) => setOpenGroups((g) => ({ ...g, [id]: !g[id] }))}
        />
        <main className={`main${state.maStatusVariant ? " main--with-panel" : ""}`} data-screen-label={activeLabel}>
          <div className="main__scroll">
            <div className="main__inner">
              <PartnerBanner state={state} />
              {activeId.startsWith("ma") ? (
                <MaStatusBar
                  ma={state.ma}
                  maStatusVariant={state.maStatusVariant}
                  setMaStatusVariant={setMaStatusVariant}
                />
              ) : null}
              <StepComp state={state} set={setSlice} activeId={activeId} />
            </div>
          </div>
          {state.maStatusVariant && activeId.startsWith("ma") ? (
            <MaSidePanel
              ma={state.ma}
              onNavigate={(id) => { setActiveId(id); window.location.hash = id; ensureGroupOpen(id); }}
              onHide={() => setMaStatusVariant(false)}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

// ---- Header ----
function Header() {
  return (
    <header className="header">
      <div className="header__l">
        <a className="brandmark" href="#">
          <img src="src/hdi-logo.png" alt="HDI" height="34" style={{ display: "block" }} />
          <span className="brandmark__divider" />
          <span className="brandmark__title">Underwriting Workbench</span>
        </a>
      </div>
      <div className="header__r">
        <a className="header-link" href="#"><Icon name="feedback" size={14} /> Feedback</a>
        <a className="header-link" href="#"><Icon name="links" size={14} /> Links</a>
        <a className="header-user" href="#">
          <Icon name="user" size={14} />
          Lemberger, Alexander
        </a>
      </div>
    </header>
  );
}

// ---- Sidebar ----
function Sidebar({ nav, activeId, state, onPick, openGroups, toggleGroup }) {

  // Compute dynamic done states
  const STANDARDS_LIST = [
    "Payment Card Industry Data Security Standard (PCI DSS)",
    "ISO 27001 : 2013 Information Security Management Systems",
    "COBIT 5 (Control Objectives for Information and Related Technologies)",
    "Information Security Forum (ISF) The Standard of Good Practice for IS 2018",
    "Business Sector Specific Standards (e.g. TISAX)",
    "NIST Cybersecurity Framework",
    "Critical Security Controls",
    "BSI Baseline Protection 100-x",
    "ISO/IEC 27031 Business Continuity",
  ];
  const certs = state.standardsCerts || {};
  const standardsCertsDone = STANDARDS_LIST.every(s => certs[s] && certs[s] !== "");

  // MA domain done = all visible questions answered
  const ma = state.ma || {};
  const answers = ma.answers || {};
  const businessSize = ma.businessSize || "XL";
  const includeOT = ma.includeOT !== false;

  const isDomainDone = (domain) => {
    const visible = CALC.getVisibleQuestions(domain, businessSize, includeOT);
    if (visible.length === 0) return false;
    return visible.every(q => answers[q.uid] && answers[q.uid].answer);
  };

  const isDone = (id) => {
    if (id === "standardsCerts") return standardsCertsDone;
    // maDomain0 ... maDomain9
    const domainMatch = id.match(/^maDomain(\d+)$/);
    if (domainMatch) return isDomainDone(parseInt(domainMatch[1], 10));
    return false;
  };

  // Render nested children (e.g. Maturity Assessment sub-items)
  const renderChildren = (children, depth = 1) => {
    return (
      <ul className="nav-children" style={depth > 1 ? { paddingLeft: 12 } : undefined}>
        {children.map((c) => {
          if (c.group && c.children) {
            const isOpen = openGroups[c.id];
            return (
              <li key={c.id} className={`nav-group ${isOpen ? "is-open" : ""}`}>
                <div
                  className={`nav-item ${activeId === c.id ? "is-active" : ""}`}
                  onClick={() => { toggleGroup(c.id); onPick(c.id); }}
                >
                  <span className={`nav-dot ${isDone(c.id) ? "nav-dot--done" : ""}`} />
                  <span className="nav-item__label">{c.label}</span>
                  <span className="nav-group__chev"><Icon name="chev-down" size={10} /></span>
                </div>
                {isOpen ? renderChildren(c.children, depth + 1) : null}
              </li>
            );
          }
          return (
            <li
              key={c.id}
              className={`nav-item ${activeId === c.id ? "is-active" : ""}`}
              onClick={() => onPick(c.id)}
            >
              <span className={`nav-dot ${isDone(c.id) ? "nav-dot--done" : ""}`} />
              <span className="nav-item__label">{c.label}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderNavItem = (n) => {
    if (n.group) {
      const isOpen = openGroups[n.id];
      return (
        <li key={n.id} className={`nav-group ${isOpen ? "is-open" : ""}`}>
          <div className="nav-group__head" onClick={() => toggleGroup(n.id)}>
            <span className="nav-dot" />
            <span className="nav-group__icon"><Icon name={n.icon} size={14} /></span>
            <span className="nav-group__label">{n.label}</span>
            <span className="nav-group__chev"><Icon name="chev-down" size={12} /></span>
          </div>
          {isOpen ? renderChildren(n.children) : null}
        </li>
      );
    }
    return (
      <li key={n.id}>
        <div
          className={`nav-flat ${activeId === n.id ? "is-active" : ""}`}
          onClick={() => onPick(n.id)}
        >
          <span className="nav-dot" />
          <span className="nav-group__icon"><Icon name={n.icon} size={14} /></span>
          <span className="nav-group__label">{n.label}</span>
        </div>
      </li>
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__head">
        <span className="sidebar__label">NAVIGATION</span>
      </div>
      <ul className="navlist">
        {nav.map(renderNavItem)}
      </ul>

      {/* OPTIONS and OFFER sections hidden — not in focus for this prototype */}

      {/* Version hidden — not in focus for this prototype */}
    </aside>
  );
}

// ---- Partner Banner (matches live cyber app) ----
function PartnerBanner({ state }) {
  const c = state.client;
  return (
    <div className="partner-banner">
      <div>
        <div className="partner-banner__top">
          <h1 className="partner-banner__title">{c.partner || "Unknown"}</h1>
          <div className="partner-banner__chips">
            <span className="pbchip"><i className="fa-solid fa-gear" style={{ fontSize: 11 }} /> Option: {state.optionNr}</span>
            <span className="pbchip"><i className="fa-solid fa-barcode" style={{ fontSize: 11 }} /> Partner ID: {c.partnerId || "N/A"}</span>
          </div>
        </div>
        <div className="partner-banner__meta">
          <span className="meta-item">
            <Icon name="file" size={13} />
            <span className="meta-item__label">Offer No.:</span>
            <span className="meta-item__value meta-item__value--mono">{state.offerNr}</span>
          </span>
          <span className="meta-item">
            <Icon name="status" size={13} />
            <span className="meta-item__label">Status:</span>
            <span className="meta-item__value">{c.status || "Draft"}</span>
          </span>
          <span className="meta-item">
            <Icon name="clock" size={13} />
            <span className="meta-item__label">Last modified:</span>
            <span className="meta-item__value meta-item__value--mono">{state.lastModified}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

window.App = App;
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
