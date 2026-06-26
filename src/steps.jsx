// Cyber Maturity Assessment — Step components
// Each step renders inside the main pane below the Partner Banner.
// Uses DisplayCard, DisplayField, Icon from components.jsx (loaded before this file)

const { useState: useS, useEffect: useE, useMemo: useM, Fragment: F } = React;

// ---- Helper: status dot ----
function StatusDot({ type }) {
  if (type === "error") return <i className="fa-solid fa-circle-exclamation" style={{ fontSize: 12, color: "#e60018", marginLeft: 4 }} />;
  if (type === "info") return <i className="fa-solid fa-circle-info" style={{ fontSize: 12, color: "#65a518", marginLeft: 4 }} />;
  return null;
}

// ---- General Data (shared, already exists in live app) ----
function Step_GeneralData({ state, set }) {
  return (
    <div className="step">
      <p className="step__placeholder" style={{ color: "#888", fontStyle: "italic" }}>General Data screen — shared with live app. Content not duplicated here.</p>
    </div>
  );
}

// ---- Risk Profile > General Information ----
function Step_GeneralInfo({ state, set }) {
  return (
    <div className="step">
      <DisplayCardGrid cols={2}>
        <DisplayCard title="General Information" onEdit={() => {}}>
          <DisplayField label="NAICS Code" />
          <DisplayField label="High Exposure Risk" />
          <DisplayField label="Business Sector" />
          <DisplayField label="Subsector" />
          <DisplayField label="Website" />
          <DisplayField label="Consultant" />
          <DisplayField label="Other Consultant" />
          <DisplayField label="Mandate Process" />
          <DisplayField label="Turnover" />
          <DisplayField label="Company Size" />
        </DisplayCard>
        <DisplayCard title="Business Description" onEdit={() => {}}>
          <DisplayField label="Business Description" />
        </DisplayCard>
      </DisplayCardGrid>

      <DisplayCard title="Regional Turnover Split" grid={false}>
        <table className="grid-tbl">
          <thead>
            <tr><th>Region</th><th>Turnover</th><th>Percentage</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><StatusDot type="error" /></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div style={{ borderTop: "1px solid #e0e4ea", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <i className="fa-regular fa-floppy-disk" style={{ fontSize: 13, color: "#888" }} />
          <strong>Total</strong>
          <span style={{ marginLeft: 8 }}>0.00</span>
          <StatusDot type="info" />
        </div>
        <div style={{ padding: "8px 16px" }}>
          <a className="add-link" style={{ color: "#888", fontSize: 13, cursor: "pointer" }}>+ Add new</a>
        </div>
      </DisplayCard>
    </div>
  );
}

// ---- Risk Profile > General Exposure Profile ----
function Step_ExposureProfile({ state, set }) {
  return (
    <div className="step">
      <DisplayCard title="General Exposure Profile" onEdit={() => {}}>
        <DisplayField label="M&A Activity" />
        <DisplayField label="Financial Health/Industry Performance" />
        <DisplayField label="E-Commerce Revenue & Online Services" />
        <DisplayField label="Volatility/Recovery in Sales/Seasonable Business" />
      </DisplayCard>

      <DisplayCard title="" onEdit={() => {}} grid={false}>
        <table className="grid-tbl">
          <thead>
            <tr><th>Record Type</th><th>estimated Number of Records</th></tr>
          </thead>
          <tbody>
            <tr><td><Icon name="chev-right" size={12} /> Number of PCI records</td><td><StatusDot type="error" /></td></tr>
            <tr><td><Icon name="chev-right" size={12} /> Number of PHI records</td><td><StatusDot type="error" /></td></tr>
            <tr><td><Icon name="chev-right" size={12} /> Number of PII records</td><td><StatusDot type="error" /></td></tr>
          </tbody>
          <tfoot>
            <tr><td><Icon name="chev-right" size={12} /> <strong>Total</strong></td><td><strong>0</strong></td></tr>
          </tfoot>
        </table>
      </DisplayCard>
    </div>
  );
}

// ---- Risk Profile > Risk Assessment ----
function Step_RiskAssessment({ state, set }) {
  return (
    <div className="step">
      <DisplayCard title="Risk Assessment" onEdit={() => {}}>
        <DisplayField label="Application" />
        <DisplayField label="Loss Run" />
        <DisplayField label="Risk Dialogue" />
        <DisplayField label="Financial State" />
        <DisplayField label="Claims History" />
        <DisplayField label="Risk Dialogue Date" />
      </DisplayCard>
    </div>
  );
}

// ---- Risk Profile > Exclusions Review ----
function Step_ExclusionsReview({ state, set }) {
  const exclusions = [
    "Claims against members of management and supervisory bodies",
    "Contractual liability",
    "Cyber operation",
    "Cyber war",
    "Discrimination",
    "Environmental harm",
    "Extortion monies",
    "Financial transaction",
    "Intellectual property or company or trade secrets espionage competition law",
    "Intentional acts and wilful breaches of duty",
    "Interruption or disruption of supply infrastructures",
    "Known losses, circumstances and pending proceedings",
    "Mutual claims",
    "Natural hazards",
    "Nuclear energy",
    "Patent",
    "Product recall",
    "Products and services",
    "Ransom",
  ];
  const clauses = [
    "Accumulation clause",
    "Consulting company Crawford & Company",
    "Consulting company KPMG",
    "Consulting company, individual",
    "Financial Interest Cover",
    "International program",
    "Leading clause",
    "Long term agreement",
    "Sanctionsclause individual",
    "Waiver of the state of the art clause",
  ];
  return (
    <div className="step">
      <DisplayCardGrid cols={2}>
        <DisplayCard title="Exclusions Review" onEdit={() => {}} grid={false}>
          <div className="exclusions-list">
            {exclusions.map((e) => (
              <div key={e} className="exclusion-row">
                <span className="exclusion-row__name">
                  <i className="fa-solid fa-file-lines" style={{ fontSize: 12, color: "#888", marginRight: 8 }} />
                  {e}
                </span>
                <span className="exclusion-badge exclusion-badge--excluded">
                  <span className="exclusion-badge__dot" />
                  Excluded
                </span>
              </div>
            ))}
          </div>
        </DisplayCard>
        <div>
          <DisplayCard title="Wording" onEdit={() => {}}>
            <DisplayField label="Wording" />
          </DisplayCard>
          <DisplayCard title="Clauses" onEdit={() => {}} grid={false} style={{ marginTop: 16 }}>
            <div className="exclusions-list">
              {clauses.map((c) => (
                <div key={c} className="exclusion-row">
                  <span className="exclusion-row__name">
                    <i className="fa-solid fa-file-lines" style={{ fontSize: 12, color: "#888", marginRight: 8 }} />
                    {c}
                  </span>
                  <span className="exclusion-badge exclusion-badge--excluded">
                    <span className="exclusion-badge__dot" />
                    Excluded
                  </span>
                </div>
              ))}
            </div>
          </DisplayCard>
        </div>
      </DisplayCardGrid>
    </div>
  );
}

// ---- Risk Profile > Standards & Certifications ----
function Step_StandardsCerts({ state, set }) {
  const standards = [
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
  const OPTIONS = ["Not implemented", "Partially implemented", "Fully implemented", "Not applicable"];
  const certs = state.standardsCerts || {};
  const setCert = (key, val) => set({ standardsCerts: { ...certs, [key]: val } });

  return (
    <div className="step">
      <DisplayCard title="Standards & Certifications" grid={false}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {standards.map((s, i) => (
            <div key={i} className="sc-row">
              <span className="sc-row__label">{s}</span>
              <select
                className="sc-row__select"
                value={certs[s] || ""}
                onChange={(e) => setCert(s, e.target.value)}
              >
                <option value="">— Select —</option>
                {OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </DisplayCard>
    </div>
  );
}

// ---- Risk Profile > Maturity Assessment: Overview Dashboard ----
function Step_MaOverview({ state, set }) {
  const ma = state.ma || {};
  const answers = ma.answers || {};
  const businessSize = ma.businessSize || "XL";
  const includeOT = ma.includeOT !== false;
  const setMa = (patch) => set({ ma: { ...ma, ...patch } });

  const overall = CALC.overallRating(answers, businessSize, includeOT, ma.uwOverrides);

  return (
    <div className="step">
      <div className="ma-controls">
        <span className="ma-controls__label">Business Size</span>
        <PillToggle
          options={[{value:"S",label:"S"},{value:"M",label:"M"},{value:"L",label:"L"},{value:"XL",label:"XL"}]}
          value={businessSize}
          onChange={(v) => setMa({ businessSize: v })}
        />
        <span className="ma-controls__sep" />
        <span className="ma-controls__label">Include OT</span>
        <PillToggle
          options={[{value:true,label:"Yes"},{value:false,label:"No"}]}
          value={includeOT}
          onChange={(v) => setMa({ includeOT: v })}
        />
        <span className="ma-controls__spacer" />
        <span className="ma-controls__label">Overall Rating</span>
        <RatingBadge label={overall.label} score={overall.score} />
      </div>

      <DisplayCard title="Key Controls" grid={false}>
        <KeyControlsGauge kc={overall.keyControls} />
        <div style={{ padding: "16px 16px 12px 0", fontSize: 13, color: "#666" }}>
          {overall.kcLabel === "Fulfilled"
            ? <span style={{ color: "#2e7d0e" }}><i className="fa-solid fa-circle-check" style={{ marginRight: 6 }} />All key controls fulfilled</span>
            : <span style={{ color: "#e60018" }}><i className="fa-solid fa-triangle-exclamation" style={{ marginRight: 6 }} />Key controls not fully satisfied</span>
          }
          <span style={{ marginLeft: 16, color: "#888" }}>
            {overall.totalAnswered}/{overall.totalQuestions} questions answered
          </span>
        </div>
      </DisplayCard>

      <div className="domain-grid">
        {Array.from({ length: 10 }).map((_, idx) => {
          const ds = CALC.domainScore(idx, answers, businessSize, includeOT);
          return (
            <DomainSummaryCard
              key={idx}
              domain={{ answers }}
              index={idx}
              score={ds.score}
              onClick={() => { window.location.hash = "maDomain" + idx; }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ---- Risk Profile > Maturity Assessment: Generic Domain Screen ----
function Step_MaDomain({ state, set, activeId }) {
  const ma = state.ma || {};
  const answers = ma.answers || {};
  const businessSize = ma.businessSize || "XL";
  const includeOT = ma.includeOT !== false;
  const setMa = (patch) => set({ ma: { ...ma, ...patch } });

  const domainIndex = parseInt((activeId || "").replace("maDomain", ""), 10) || 0;
  const visibleQuestions = CALC.getVisibleQuestions(domainIndex, businessSize, includeOT);
  const ds = CALC.domainScore(domainIndex, answers, businessSize, includeOT);
  const override = (ma.uwOverrides || {})[domainIndex];

  // Question edit drawer
  const [drawerQ, setDrawerQ] = useS(null);
  const [draft, setDraft] = useS({});

  const openQuestion = (q) => {
    const existing = answers[q.uid] || {};
    setDraft({ answer: existing.answer || "", reAnswer: existing.reAnswer || "", remarks: existing.remarks || "" });
    setDrawerQ(q);
  };
  const saveQuestion = () => {
    if (!drawerQ) return;
    const newAnswers = { ...answers, [drawerQ.uid]: { answer: draft.answer, reAnswer: draft.reAnswer, remarks: draft.remarks } };
    setMa({ answers: newAnswers });
    setDrawerQ(null);
  };

  // UW Override drawer
  const [overrideOpen, setOverrideOpen] = useS(false);
  const [overrideDraft, setOverrideDraft] = useS({});

  const openOverride = () => {
    const existing = override || {};
    setOverrideDraft({ score: existing.score ?? "", rating: existing.rating || "", reasoning: existing.reasoning || "" });
    setOverrideOpen(true);
  };
  const saveOverride = () => {
    const newOverrides = { ...(ma.uwOverrides || {}), [domainIndex]: { score: overrideDraft.score, rating: overrideDraft.rating, reasoning: overrideDraft.reasoning } };
    setMa({ uwOverrides: newOverrides });
    setOverrideOpen(false);
  };
  const clearOverride = () => {
    const newOverrides = { ...(ma.uwOverrides || {}) };
    delete newOverrides[domainIndex];
    setMa({ uwOverrides: newOverrides });
    setOverrideOpen(false);
  };

  return (
    <div className="step">
      <div className="domain-header">
        <div className="domain-header__left">
          <h2 className="domain-header__title">{DOMAIN_NAMES[domainIndex]}</h2>
          <span className="domain-header__count">{ds.answered}/{ds.total} answered</span>
        </div>
        <div className="domain-header__right">
          <RatingBadge label={override ? override.rating : ds.label} score={override ? override.score : ds.score} />
          {ds.answered === ds.total && ds.total > 0 ? (
            <MiniBtn onClick={openOverride}>
              <i className="fa-solid fa-user-pen" style={{ marginRight: 4 }} />UW Override
            </MiniBtn>
          ) : null}
        </div>
      </div>

      {ds.keyControls.total > 0 ? (
        <div style={{ marginBottom: 16 }}>
          <KeyControlsGauge kc={ds.keyControls} />
        </div>
      ) : null}

      <div className="dcard" style={{ padding: 0 }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid #e0e4ea", fontSize: 12, color: "#888", display: "flex", gap: 16 }}>
          <span>{visibleQuestions.length} questions</span>
          <span>Size: {businessSize}</span>
          {includeOT ? <span>OT: included</span> : null}
        </div>
        {visibleQuestions.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#888" }}>
            No questions visible for current filters.
          </div>
        ) : (
          visibleQuestions.map((q) => (
            <QuestionRow
              key={q.uid}
              question={q}
              answer={(answers[q.uid] || {}).answer}
              isKeyControl={q.type === "MinimumReq"}
              onClick={() => openQuestion(q)}
            />
          ))
        )}
      </div>

      {/* Question Edit Drawer */}
      <Drawer
        open={!!drawerQ}
        onClose={() => setDrawerQ(null)}
        title={drawerQ ? `${drawerQ.id} — Edit Answer` : ""}
        width={480}
        footer={<DrawerFooter onSave={saveQuestion} onCancel={() => setDrawerQ(null)} />}
      >
        {drawerQ ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", padding: "0 0 8px", borderBottom: "1px solid #eee" }}>
              {drawerQ.question}
            </div>
            <FilledField label="Answer">
              <FilledSelect
                value={draft.answer}
                onChange={(v) => setDraft({ ...draft, answer: v })}
                options={ANSWER_OPTIONS}
                placeholder="Select answer…"
              />
            </FilledField>
            <FilledField label="RE Answer (Re-Assessment)">
              <FilledSelect
                value={draft.reAnswer}
                onChange={(v) => setDraft({ ...draft, reAnswer: v })}
                options={ANSWER_OPTIONS}
                placeholder="Select RE answer…"
              />
            </FilledField>
            <FilledField label="Remarks">
              <textarea
                className="finput__el"
                rows={3}
                value={draft.remarks}
                onChange={(e) => setDraft({ ...draft, remarks: e.target.value })}
                placeholder="Optional remarks…"
                style={{ resize: "vertical", fontFamily: "inherit", fontSize: 13, padding: "8px 10px", border: "1px solid #d0d4dc", borderRadius: 4, width: "100%", boxSizing: "border-box" }}
              />
            </FilledField>
          </div>
        ) : null}
      </Drawer>

      {/* UW Override Drawer */}
      <Drawer
        open={overrideOpen}
        onClose={() => setOverrideOpen(false)}
        title="UW Override"
        width={400}
        footer={
          <div className="drawer-foot">
            <button className="btn btn--accent" onClick={saveOverride}>Save Override</button>
            {override ? <button className="btn btn--outline" style={{ color: "#e60018", borderColor: "#e60018" }} onClick={clearOverride}>Clear Override</button> : null}
            <button className="btn btn--outline" onClick={() => setOverrideOpen(false)}>Cancel</button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FilledField label="Override Score (0–4)">
            <FilledSelect
              value={overrideDraft.score === "" ? "" : String(overrideDraft.score)}
              onChange={(v) => {
                const num = Number(v);
                setOverrideDraft({ ...overrideDraft, score: v === "" ? "" : num, rating: v === "" ? "" : CALC.getRatingLabel(num) });
              }}
              options={["0", "1", "2", "3", "4"]}
              placeholder="Select score"
            />
          </FilledField>
          <FilledField label="Rating">
            <FilledSelect
              value={overrideDraft.rating}
              onChange={(v) => setOverrideDraft({ ...overrideDraft, rating: v })}
              options={["Basic", "Intermediate", "Progressive", "Advanced"]}
              placeholder="Auto from score"
            />
          </FilledField>
          <FilledField label="Reasoning">
            <textarea
              className="finput__el"
              rows={4}
              value={overrideDraft.reasoning}
              onChange={(e) => setOverrideDraft({ ...overrideDraft, reasoning: e.target.value })}
              placeholder="Explain override rationale…"
              style={{ resize: "vertical", fontFamily: "inherit", fontSize: 13, padding: "8px 10px", border: "1px solid #d0d4dc", borderRadius: 4, width: "100%", boxSizing: "border-box" }}
            />
          </FilledField>
          <div style={{ fontSize: 12, color: "#888", borderTop: "1px solid #eee", paddingTop: 8 }}>
            Calculated score: <strong>{ds.score.toFixed(2)}</strong> ({ds.label})
          </div>
        </div>
      </Drawer>
    </div>
  );
}

// ---- Inline-answer variant (direct dropdowns in card, no panel) ----
// Used for domain 3 (Data Protection) as a UX experiment
function Step_MaDomainInline({ state, set, activeId }) {
  const ma = state.ma || {};
  const answers = ma.answers || {};
  const businessSize = ma.businessSize || "XL";
  const includeOT = ma.includeOT !== false;
  const setMa = (patch) => set({ ma: { ...ma, ...patch } });

  const domainIndex = parseInt((activeId || "").replace("maDomain", ""), 10) || 0;
  const visibleQuestions = CALC.getVisibleQuestions(domainIndex, businessSize, includeOT);
  const ds = CALC.domainScore(domainIndex, answers, businessSize, includeOT);
  const override = (ma.uwOverrides || {})[domainIndex];

  // UW Override drawer (keep as drawer — rare action)
  const [overrideOpen, setOverrideOpen] = useS(false);
  const [overrideDraft, setOverrideDraft] = useS({});

  const openOverride = () => {
    const existing = override || {};
    setOverrideDraft({ score: existing.score ?? "", rating: existing.rating || "", reasoning: existing.reasoning || "" });
    setOverrideOpen(true);
  };
  const saveOverride = () => {
    const newOverrides = { ...(ma.uwOverrides || {}), [domainIndex]: { score: overrideDraft.score, rating: overrideDraft.rating, reasoning: overrideDraft.reasoning } };
    setMa({ uwOverrides: newOverrides });
    setOverrideOpen(false);
  };
  const clearOverride = () => {
    const newOverrides = { ...(ma.uwOverrides || {}) };
    delete newOverrides[domainIndex];
    setMa({ uwOverrides: newOverrides });
    setOverrideOpen(false);
  };

  const setAnswer = (uid, value) => {
    const existing = answers[uid] || {};
    const newAnswers = { ...answers, [uid]: { ...existing, answer: value } };
    setMa({ answers: newAnswers });
  };

  return (
    <div className="step">
      <div className="domain-header">
        <div className="domain-header__left">
          <h2 className="domain-header__title">{DOMAIN_NAMES[domainIndex]}</h2>
          <span className="domain-header__count">{ds.answered}/{ds.total} answered</span>
        </div>
        <div className="domain-header__right">
          <RatingBadge label={override ? override.rating : ds.label} score={override ? override.score : ds.score} />
          {ds.answered === ds.total && ds.total > 0 ? (
            <MiniBtn onClick={openOverride}>
              <i className="fa-solid fa-user-pen" style={{ marginRight: 4 }} />UW Override
            </MiniBtn>
          ) : null}
        </div>
      </div>

      {ds.keyControls.total > 0 ? (
        <div style={{ marginBottom: 16 }}>
          <KeyControlsGauge kc={ds.keyControls} />
        </div>
      ) : null}

      <div className="dcard" style={{ padding: 0 }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid #e0e4ea", fontSize: 12, color: "#888", display: "flex", gap: 16 }}>
          <span>{visibleQuestions.length} questions</span>
          <span>Size: {businessSize}</span>
          {includeOT ? <span>OT: included</span> : null}
        </div>
        {visibleQuestions.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#888" }}>
            No questions visible for current filters.
          </div>
        ) : (
          visibleQuestions.map((q) => {
            const a = (answers[q.uid] || {}).answer || "";
            return (
              <div key={q.uid} className="sc-row">
                <span className="sc-row__label">
                  {q.type === "MinimumReq" && <span className="qi-row__kc" style={{ marginRight: 6 }}>KC</span>}
                  {q.id} — {q.question}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, width: 280, justifyContent: "flex-end" }}>
                  <select
                    className="sc-row__select"
                    value={a}
                    onChange={(e) => setAnswer(q.uid, e.target.value)}
                  >
                    <option value="">— Select —</option>
                    {ANSWER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <span style={{ minWidth: 80, textAlign: "right" }}>{a ? <AnswerBadge value={a} /> : null}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* UW Override Drawer */}
      <Drawer
        open={overrideOpen}
        onClose={() => setOverrideOpen(false)}
        title="UW Override"
        width={400}
        footer={
          <div className="drawer-foot">
            <button className="btn btn--accent" onClick={saveOverride}>Save Override</button>
            {override ? <button className="btn btn--outline" style={{ color: "#e60018", borderColor: "#e60018" }} onClick={clearOverride}>Clear Override</button> : null}
            <button className="btn btn--outline" onClick={() => setOverrideOpen(false)}>Cancel</button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FilledField label="Override Score (0–4)">
            <FilledSelect
              value={overrideDraft.score === "" ? "" : String(overrideDraft.score)}
              onChange={(v) => {
                const num = Number(v);
                setOverrideDraft({ ...overrideDraft, score: v === "" ? "" : num, rating: v === "" ? "" : CALC.getRatingLabel(num) });
              }}
              options={["0", "1", "2", "3", "4"]}
              placeholder="Select score"
            />
          </FilledField>
          <FilledField label="Rating">
            <FilledSelect
              value={overrideDraft.rating}
              onChange={(v) => setOverrideDraft({ ...overrideDraft, rating: v })}
              options={["Basic", "Intermediate", "Progressive", "Advanced"]}
              placeholder="Auto from score"
            />
          </FilledField>
          <FilledField label="Reasoning">
            <textarea
              className="finput__el"
              rows={4}
              value={overrideDraft.reasoning}
              onChange={(e) => setOverrideDraft({ ...overrideDraft, reasoning: e.target.value })}
              placeholder="Explain your override…"
              style={{ resize: "vertical", fontFamily: "inherit", fontSize: 13, padding: "8px 10px", border: "1px solid #d0d4dc", borderRadius: 4, width: "100%", boxSizing: "border-box" }}
            />
          </FilledField>
          <div style={{ fontSize: 12, color: "#888" }}>
            Calculated score: <strong>{ds.score.toFixed(2)}</strong> ({ds.label})
          </div>
        </div>
      </Drawer>
    </div>
  );
}

// ---- Risk Profile > Maturity Assessment: BI Assessment ----
function Step_MaBiAssessment({ state, set }) {
  const bi = state.bi || {};
  const [drawerOpen, setDrawerOpen] = useS(false);
  const [draft, setDraft] = useS({});

  const openDrawer = () => { setDraft({ ...bi }); setDrawerOpen(true); };
  const saveDrawer = () => { set({ bi: draft }); setDrawerOpen(false); };

  const result = CALC.biCalc(bi);
  const fmtMio = (n) => n == null || isNaN(n) ? "—" : new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(n);

  return (
    <div className="step">
      <DisplayCardGrid cols={2}>
        <DisplayCard title="Input Parameters" onEdit={openDrawer}>
          <DisplayField label="Year" value={bi.year || "—"} />
          <DisplayField label="Turnover" value={bi.turnover ? fmtMio(bi.turnover) : "—"} />
          <DisplayField label="Turnover Trend" value={bi.turnoverTrend ? `${bi.turnoverTrend}%` : "—"} />
          <DisplayField label="Profit Margin" value={bi.profitMargin ? `${bi.profitMargin}%` : "—"} />
          <DisplayField label="Fix Costs" value={bi.fixCosts ? `${bi.fixCosts}%` : "—"} />
          <DisplayField label="Other Costs" value={bi.otherCosts ? fmtMio(bi.otherCosts) : "—"} />
        </DisplayCard>
        <DisplayCard title="Layer Parameters" onEdit={openDrawer}>
          <DisplayField label="Deductible" value={bi.deductible ? fmtMio(bi.deductible) : "—"} />
          <DisplayField label="Limit" value={bi.limit ? fmtMio(bi.limit) : "—"} />
          <DisplayField label="Waiting Period" value={bi.waitingPeriod ? "Yes" : "No"} />
          {bi.waitingPeriod ? <DisplayField label="Waiting Period (Hours)" value={bi.waitingPeriodHours || "—"} /> : null}
        </DisplayCard>
      </DisplayCardGrid>

      <DisplayCard title="Exposure Scenario Results" grid={false}>
        {result ? (
          <div>
            <div style={{ padding: "12px 16px", display: "flex", gap: 24, fontSize: 13, borderBottom: "1px solid #e0e4ea" }}>
              <span><strong>Insured Loss (annual):</strong> {fmtMio(result.insuredLoss)}</span>
              <span><strong>Per Day:</strong> {fmtMio(result.perDay)}</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="grid-tbl" style={{ fontSize: 11 }}>
                <thead>
                  <tr>
                    <th>Scenario</th>
                    {result.horizons.map((h) => <th key={h.label}>{h.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {result.table.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      {row.values.map((v, i) => <td key={i} style={{ fontFamily: "monospace" }}>{fmtMio(v)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#888", fontSize: 14 }}>
            <i className="fa-solid fa-chart-line" style={{ fontSize: 28, display: "block", marginBottom: 8, color: "#ccc" }} />
            Enter turnover data to see exposure scenarios.
          </div>
        )}
      </DisplayCard>

      {/* Edit Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="BI Assessment Parameters"
        width={440}
        footer={<DrawerFooter onSave={saveDrawer} onCancel={() => setDrawerOpen(false)} />}
      >
        <DrawerForm cols={1}>
          <FilledField label="Year">
            <FilledSelect value={draft.year ? String(draft.year) : ""} onChange={(v) => setDraft({ ...draft, year: v })} options={["2024", "2025", "2026", "2027", "2028"]} placeholder="Select year" />
          </FilledField>
          <FilledField label="Turnover">
            <FilledNumber value={draft.turnover} onChange={(v) => setDraft({ ...draft, turnover: v })} placeholder="e.g. 500000000" />
          </FilledField>
          <FilledField label="Turnover Trend (%)">
            <FilledNumber value={draft.turnoverTrend} onChange={(v) => setDraft({ ...draft, turnoverTrend: v })} suffix="%" placeholder="0" />
          </FilledField>
          <FilledField label="Profit Margin (%)">
            <FilledNumber value={draft.profitMargin} onChange={(v) => setDraft({ ...draft, profitMargin: v })} suffix="%" placeholder="0" />
          </FilledField>
          <FilledField label="Fix Costs (%)">
            <FilledNumber value={draft.fixCosts} onChange={(v) => setDraft({ ...draft, fixCosts: v })} suffix="%" placeholder="0" />
          </FilledField>
          <FilledField label="Other Costs (absolute)">
            <FilledNumber value={draft.otherCosts} onChange={(v) => setDraft({ ...draft, otherCosts: v })} placeholder="0" />
          </FilledField>
          <FilledField label="Deductible">
            <FilledNumber value={draft.deductible} onChange={(v) => setDraft({ ...draft, deductible: v })} placeholder="0" />
          </FilledField>
          <FilledField label="Limit">
            <FilledNumber value={draft.limit} onChange={(v) => setDraft({ ...draft, limit: v })} placeholder="0" />
          </FilledField>
          <FilledField label="Waiting Period">
            <FilledYesNo value={draft.waitingPeriod ? "Yes" : "No"} onChange={(v) => setDraft({ ...draft, waitingPeriod: v === "Yes" })} />
          </FilledField>
          {draft.waitingPeriod ? (
            <FilledField label="Waiting Period (Hours)">
              <FilledNumber value={draft.waitingPeriodHours} onChange={(v) => setDraft({ ...draft, waitingPeriodHours: v })} placeholder="0" suffix="h" />
            </FilledField>
          ) : null}
        </DrawerForm>
      </Drawer>
    </div>
  );
}

// ---- Risk Profile > Maturity Assessment: AI Import ----
function Step_MaAiImport({ state, set }) {
  const ma = state.ma || {};
  const answers = ma.answers || {};
  const setMa = (patch) => set({ ma: { ...ma, ...patch } });

  const [inputText, setInputText] = useS("");
  const [parsed, setParsed] = useS(null);
  const [importResult, setImportResult] = useS(null);

  const doParse = () => {
    setImportResult(null);
    try {
      const lines = inputText.trim().split("\n").filter((l) => l.trim());
      const items = lines.map((line) => JSON.parse(line));
      setParsed(items);
    } catch (e) {
      setImportResult({ success: false, message: "Parse error: " + e.message });
      setParsed(null);
    }
  };

  const doImport = () => {
    if (!parsed || parsed.length === 0) return;
    const codeMap = { 0: "Yes", 1: "Partially", 2: "No", 3: "No information" };
    let imported = 0;
    let skipped = 0;
    const newAnswers = { ...answers };

    for (const entry of parsed) {
      const uid = entry.uid;
      const q = QUESTIONS.find((qu) => qu.uid === uid);
      if (!q) { skipped++; continue; }

      let answerValue = entry.answer;
      // Map numeric codes to text if needed
      if (typeof answerValue === "number" && codeMap[answerValue] != null) {
        answerValue = codeMap[answerValue];
      }
      // Validate answer text
      if (!["Yes", "Partially", "No", "No information"].includes(answerValue)) {
        skipped++;
        continue;
      }

      newAnswers[uid] = {
        answer: answerValue,
        reAnswer: entry.reAnswer || (newAnswers[uid] || {}).reAnswer || "",
        remarks: entry.remarks || entry.remark || (newAnswers[uid] || {}).remarks || "",
      };
      imported++;
    }

    setMa({ answers: newAnswers });
    setImportResult({ success: true, message: `Imported ${imported} answer${imported !== 1 ? "s" : ""}. ${skipped > 0 ? `${skipped} skipped (no matching UID).` : ""}` });
    setParsed(null);
    setInputText("");
  };

  return (
    <div className="step">
      <DisplayCard title="AI Copilot Import" grid={false}>
        <ol style={{ margin: "0 0 0 20px", padding: "8px 0", fontSize: 14, lineHeight: 2, color: "#444" }}>
          <li>Run the Maturity Assessment questionnaire through your AI Copilot tool.</li>
          <li>Export results as JSONL (one JSON object per line).</li>
          <li>Each line must contain: <code style={{ background: "#f4f4f4", padding: "2px 6px", borderRadius: 3 }}>{`{"uid": 1, "answer": "Yes", "remarks": "..."}`}</code></li>
          <li>Answer values: <code>"Yes"</code>, <code>"Partially"</code>, <code>"No"</code>, <code>"No information"</code> (or numeric codes 0–3).</li>
          <li>Paste the output below and click <strong>Parse & Preview</strong> to verify before importing.</li>
        </ol>
      </DisplayCard>

      <DisplayCard title="Paste JSONL Data" grid={false}>
        <textarea
          value={inputText}
          onChange={(e) => { setInputText(e.target.value); setImportResult(null); setParsed(null); }}
          rows={12}
          placeholder={'{"uid": 1, "answer": "Yes", "remarks": "Evidence provided"}\n{"uid": 2, "answer": "Partially", "remarks": "..."}\n...'}
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "monospace", fontSize: 12, padding: "10px 12px", border: "1px solid #d0d4dc", borderRadius: 4, resize: "vertical" }}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button className="btn btn--accent" onClick={doParse} disabled={!inputText.trim()}>
            <i className="fa-solid fa-magnifying-glass" style={{ marginRight: 6 }} />Parse & Preview
          </button>
          {parsed && parsed.length > 0 ? (
            <button className="btn btn--accent" onClick={doImport}>
              <i className="fa-solid fa-file-import" style={{ marginRight: 6 }} />Import {parsed.length} answer{parsed.length !== 1 ? "s" : ""}
            </button>
          ) : null}
        </div>
      </DisplayCard>

      {importResult ? (
        <div style={{ padding: "12px 16px", borderRadius: 4, fontSize: 14, marginTop: 4, background: importResult.success ? "#e8f5e0" : "#fde8e8", color: importResult.success ? "#2e7d0e" : "#b71c1c", border: `1px solid ${importResult.success ? "#65a518" : "#e60018"}33` }}>
          <i className={`fa-solid ${importResult.success ? "fa-circle-check" : "fa-circle-exclamation"}`} style={{ marginRight: 8 }} />
          {importResult.message}
        </div>
      ) : null}

      {parsed && parsed.length > 0 ? (
        <DisplayCard title={`Preview (${Math.min(parsed.length, 20)} of ${parsed.length})`} grid={false}>
          <table className="grid-tbl" style={{ fontSize: 12 }}>
            <thead>
              <tr><th>UID</th><th>Answer</th><th>Remark</th></tr>
            </thead>
            <tbody>
              {parsed.slice(0, 20).map((entry, i) => {
                const codeMap = { 0: "Yes", 1: "Partially", 2: "No", 3: "No information" };
                const displayAnswer = typeof entry.answer === "number" ? (codeMap[entry.answer] || String(entry.answer)) : entry.answer;
                const remark = entry.remarks || entry.remark || "";
                return (
                  <tr key={i}>
                    <td style={{ fontFamily: "monospace" }}>{entry.uid}</td>
                    <td><AnswerBadge value={displayAnswer} /></td>
                    <td style={{ maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{remark || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DisplayCard>
      ) : null}
    </div>
  );
}

// ---- Risk Profile > Party Exposure & Hazard Groups ----
function Step_PartyExposure({ state, set }) {
  return (
    <div className="step">
      <h2 className="step__section-title">Party Exposure & Hazard Groups</h2>
      <DisplayCardGrid cols={2}>
        <DisplayCard title="First Party Exposure Profile" onEdit={() => {}}>
          <DisplayField label="Dependency of Business Operations on IT" />
          <DisplayField label="Dependency on Critical Providers" />
          <DisplayField label="Interdependency of Multiple Locations" />
        </DisplayCard>
        <DisplayCard title="Third Party Exposure Profile" onEdit={() => {}}>
          <DisplayField label="Privacy Regulation & Enforcement Environment" />
          <DisplayField label="Ratio Records/Revenue (%)" value="0" />
        </DisplayCard>
      </DisplayCardGrid>

      <DisplayCard title="Hazard Group First and Third Party" onEdit={() => {}} grid={false}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "8px 0" }}>
          <div>
            <h4 style={{ margin: "0 0 12px", fontWeight: 600, fontSize: 14 }}>First Party</h4>
            <div className="dfield"><div className="dfield__label">Hazard Group First Party - Default</div><div className="dfield__value is-empty">—</div></div>
            <div className="dfield"><div className="dfield__label">Hazard Group First Party - Calculated</div><div className="dfield__value is-empty">—</div></div>
            <div className="dfield"><div className="dfield__label">Hazard Group First Party - Selected</div><div className="dfield__value is-empty">—</div></div>
          </div>
          <div>
            <h4 style={{ margin: "0 0 12px", fontWeight: 600, fontSize: 14 }}>Third Party</h4>
            <div className="dfield"><div className="dfield__label">Hazard Group Third Party - Default</div><div className="dfield__value is-empty">—</div></div>
            <div className="dfield"><div className="dfield__label">Hazard Group Third Party - Calculated</div><div className="dfield__value is-empty">—</div></div>
            <div className="dfield"><div className="dfield__label">Hazard Group Third Party - Selected</div><div className="dfield__value is-empty">—</div></div>
          </div>
        </div>
      </DisplayCard>
    </div>
  );
}

// ---- Program Coverage ----
function Step_ProgramCoverage({ state, set }) {
  return (
    <div className="step">
      <p className="step__placeholder" style={{ color: "#888", fontStyle: "italic" }}>Program Coverage screen placeholder.</p>
    </div>
  );
}

// ---- Cost Data ----
function Step_CostData({ state, set }) {
  return (
    <div className="step">
      <DisplayCard title="Participation & Cost Details" onEdit={() => {}}>
        <DisplayField label="Type of Participation" value="100% direct business" />
        <DisplayField label="HDI Share in %" value="100" />
        <DisplayField label="Brokerage in %" value="0" />
        <DisplayField label="Leading Fee in %" />
        <DisplayField label="Other Costs in %" />
      </DisplayCard>
    </div>
  );
}

// ---- Calculation / Adjustment ----
function Step_CalcAdjustment({ state, set }) {
  return (
    <div className="step">
      <p className="step__placeholder" style={{ color: "#888", fontStyle: "italic" }}>Calculation / Adjustment screen placeholder.</p>
    </div>
  );
}

// ---- Premium Result ----
function Step_PremiumResult({ state, set }) {
  return (
    <div className="step">
      <p className="step__placeholder" style={{ color: "#888", fontStyle: "italic" }}>Premium Result screen placeholder.</p>
    </div>
  );
}

// ---- Submit Offer(s) ----
function Step_SubmitOffers({ state, set }) {
  return (
    <div className="step">
      <p className="step__placeholder" style={{ color: "#888", fontStyle: "italic" }}>Submit Offer(s) screen placeholder.</p>
    </div>
  );
}

// ---- Conclusion ----
function Step_Conclusion({ state, set }) {
  return (
    <div className="step">
      <p className="step__placeholder" style={{ color: "#888", fontStyle: "italic" }}>Conclusion screen placeholder.</p>
    </div>
  );
}


// ---- Question Management (Super User only) ----
function Step_QuestionMgmt() {
  const [questions, setQuestionsState] = useS(() => getActiveQuestions());
  const [filterDomain, setFilterDomain] = useS("all");
  const [drawerOpen, setDrawerOpen] = useS(false);
  const [draft, setDraft] = useS({});
  const [editUid, setEditUid] = useS(null); // null = add mode, uid = edit mode
  const [confirmDelete, setConfirmDelete] = useS(null); // uid to delete

  const persist = (arr) => {
    setQuestionsState(arr);
    setActiveQuestions(arr);
  };

  const filtered = filterDomain === "all"
    ? questions
    : questions.filter((q) => q.domain === Number(filterDomain));

  // --- CRUD ---
  const openAdd = () => {
    setEditUid(null);
    setDraft({
      domain: filterDomain === "all" ? 0 : Number(filterDomain),
      id: "",
      question: "",
      type: "",
      sizes: [],
      multiplier: 1.0,
      isOT: false,
    });
    setDrawerOpen(true);
  };

  const openEdit = (q) => {
    setEditUid(q.uid);
    setDraft({
      domain: q.domain,
      id: q.id,
      question: q.question,
      type: q.type || "",
      sizes: q.sizes || [],
      multiplier: q.multiplier,
      isOT: q.isOT || false,
    });
    setDrawerOpen(true);
  };

  const saveDrawer = () => {
    let arr;
    if (editUid != null) {
      // Edit existing
      arr = questions.map((q) =>
        q.uid === editUid
          ? { ...q, domain: draft.domain, id: draft.id, question: draft.question, type: draft.type || null, sizes: draft.sizes, multiplier: Number(draft.multiplier) || 1.0, isOT: draft.isOT }
          : q
      );
    } else {
      // Add new
      const newQ = {
        uid: nextUid(),
        domain: Number(draft.domain),
        id: draft.id,
        question: draft.question,
        type: draft.type || null,
        sizes: draft.sizes,
        multiplier: Number(draft.multiplier) || 1.0,
        isOT: draft.isOT,
        biSeverity: null,
        biRecoveryTime: null,
        cyberServices: null,
        csaMapping: null,
        cyquMapping: null,
      };
      arr = [...questions, newQ];
    }
    persist(arr);
    setDrawerOpen(false);
  };

  const doDelete = () => {
    const arr = questions.filter((q) => q.uid !== confirmDelete);
    persist(arr);
    setConfirmDelete(null);
  };

  const moveUp = (uid) => {
    const idx = questions.findIndex((q) => q.uid === uid);
    if (idx <= 0) return;
    // Only swap within same domain
    const q = questions[idx];
    const prev = questions[idx - 1];
    if (prev.domain !== q.domain) return;
    const arr = [...questions];
    arr[idx - 1] = q;
    arr[idx] = prev;
    persist(arr);
  };

  const moveDown = (uid) => {
    const idx = questions.findIndex((q) => q.uid === uid);
    if (idx < 0 || idx >= questions.length - 1) return;
    const q = questions[idx];
    const next = questions[idx + 1];
    if (next.domain !== q.domain) return;
    const arr = [...questions];
    arr[idx + 1] = q;
    arr[idx] = next;
    persist(arr);
  };

  const doReset = () => {
    if (!confirm("Reset all questions to the original catalog? This cannot be undone.")) return;
    resetQuestions();
    setQuestionsState(getActiveQuestions());
  };

  // Size checkbox toggle
  const toggleSize = (size) => {
    const s = draft.sizes || [];
    setDraft({ ...draft, sizes: s.includes(size) ? s.filter((x) => x !== size) : [...s, size] });
  };

  return (
    <div className="step">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Question Management</h2>
        <MiniBtn danger onClick={doReset}>
          <i className="fa-solid fa-rotate-left" style={{ marginRight: 4 }} />Reset to Defaults
        </MiniBtn>
      </div>

      {/* Domain filter tabs */}
      <div className="qm-tabs">
        <button className={`qm-tab ${filterDomain === "all" ? "qm-tab--active" : ""}`} onClick={() => setFilterDomain("all")}>All ({questions.length})</button>
        {DOMAIN_NAMES.map((name, i) => {
          const count = questions.filter((q) => q.domain === i).length;
          return <button key={i} className={`qm-tab ${filterDomain === String(i) ? "qm-tab--active" : ""}`} onClick={() => setFilterDomain(String(i))}>{name} ({count})</button>;
        })}
      </div>

      {/* Table */}
      <div>
        <table className="grid-tbl" style={{ fontSize: 12, width: "100%", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "4%" }} />
            <col style={{ width: "56%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "6%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Type</th>
              <th>Sizes</th>
              <th>Mult.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.uid}>
                <td>{q.id}</td>
                <td style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{q.question}</td>
                <td><span className={`qm-type ${q.type === "MinimumReq" ? "qm-type--min" : q.type === "ProgressiveReq" ? "qm-type--prog" : ""}`}>{q.type === "MinimumReq" ? "KC" : q.type === "ProgressiveReq" ? "Prog" : "—"}</span></td>
                <td>{(q.sizes || []).join(", ") || "All"}</td>
                <td>{q.multiplier}</td>
                <td>
                  <div className="qm-actions">
                    <button className="qm-btn" onClick={() => openEdit(q)} title="Edit"><i className="fa-solid fa-pen" /></button>
                    <button className="qm-btn qm-btn--danger" onClick={() => setConfirmDelete(q.uid)} title="Delete"><i className="fa-solid fa-trash" /></button>
                    <button className="qm-btn" onClick={() => moveUp(q.uid)} title="Move up"><i className="fa-solid fa-arrow-up" /></button>
                    <button className="qm-btn" onClick={() => moveDown(q.uid)} title="Move down"><i className="fa-solid fa-arrow-down" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add button */}
      <div style={{ marginTop: 12 }}>
        <MiniBtn onClick={openAdd}>
          <i className="fa-solid fa-plus" style={{ marginRight: 4 }} />Add Question
        </MiniBtn>
      </div>

      {/* Confirm delete dialog */}
      {confirmDelete != null ? (
        <div className="qm-overlay">
          <div className="qm-dialog">
            <p style={{ margin: "0 0 16px", fontSize: 14 }}>Delete question <strong>{(questions.find((q) => q.uid === confirmDelete) || {}).id}</strong>?</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn btn--outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn--danger" onClick={doDelete}>Delete</button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Edit/Add Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editUid != null ? "Edit Question" : "Add Question"}
        width={480}
        footer={<DrawerFooter onSave={saveDrawer} onCancel={() => setDrawerOpen(false)} saveLabel={editUid != null ? "Save" : "Add"} />}
      >
        <DrawerForm cols={1}>
          <FilledField label="Domain">
            <FilledSelect
              value={String(draft.domain)}
              onChange={(v) => setDraft({ ...draft, domain: Number(v) })}
              options={DOMAIN_NAMES.map((n, i) => ({ value: String(i), label: n }))}
              placeholder="Select domain"
            />
          </FilledField>
          <FilledField label="ID">
            <input className="finput__el" value={draft.id} onChange={(e) => setDraft({ ...draft, id: e.target.value })} placeholder="e.g. 3.6" />
          </FilledField>
          <FilledField label="Question">
            <textarea className="finput__el" rows={4} value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} placeholder="Enter question text" />
          </FilledField>
          <FilledField label="Type">
            <FilledSelect
              value={draft.type}
              onChange={(v) => setDraft({ ...draft, type: v })}
              options={["MinimumReq", "ProgressiveReq", ""]}
              placeholder="None"
            />
          </FilledField>
          <FilledField label="Sizes (leave empty for All)">
            <div style={{ display: "flex", gap: 12 }}>
              {["S", "M", "L", "XL"].map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" checked={(draft.sizes || []).includes(s)} onChange={() => toggleSize(s)} />
                  {s}
                </label>
              ))}
            </div>
          </FilledField>
          <FilledField label="Multiplier">
            <FilledNumber value={draft.multiplier} onChange={(v) => setDraft({ ...draft, multiplier: v })} placeholder="1.0" />
          </FilledField>
          <FilledField label="OT Question">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={draft.isOT} onChange={() => setDraft({ ...draft, isOT: !draft.isOT })} />
              <span style={{ fontSize: 13 }}>Yes, this is an OT-related question</span>
            </div>
          </FilledField>
        </DrawerForm>
      </Drawer>
    </div>
  );
}
