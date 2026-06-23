// Cyber Maturity Assessment — Calculation module
// Scoring engine: domain scores, overall rating, BI calculation

window.CALC = (function () {
  var ANSWER_POINTS = { Yes: 2, Partially: 1, No: 0, "No information": 0 };
  var MAX_SCORE = 4;
  var THRESHOLDS = { Advanced: 3.2, Progressive: 2.5, Intermediate: 1.78 };

  function getRatingLabel(score) {
    if (score >= THRESHOLDS.Advanced) return "Advanced";
    if (score >= THRESHOLDS.Progressive) return "Progressive";
    if (score >= THRESHOLDS.Intermediate) return "Intermediate";
    return "Basic";
  }

  function getVisibleQuestions(domain, businessSize, includeOT) {
    return QUESTIONS.filter(function (q) {
      if (q.domain !== domain) return false;
      if (!includeOT && q.isOT) return false;
      // Domain 0: no size filter
      if (domain === 0) return true;
      // Domains 1-9: empty sizes array means visible for all sizes
      if (!q.sizes || q.sizes.length === 0) return true;
      return q.sizes.includes(businessSize);
    });
  }

  function domainScore(domain, answers, businessSize, includeOT) {
    var visible = getVisibleQuestions(domain, businessSize, includeOT);
    var sumAchieved = 0;
    var sumMax = 0;
    var answered = 0;
    var keyControls = { fulfilled: 0, partial: 0, notFulfilled: 0, noInfo: 0, total: 0 };

    for (var i = 0; i < visible.length; i++) {
      var q = visible[i];
      var a = answers && answers[q.uid];
      var answerValue = a ? a.answer : null;
      var points = answerValue != null && ANSWER_POINTS[answerValue] != null ? ANSWER_POINTS[answerValue] : 0;
      var achieved = points * q.multiplier;
      var maxPossible = 2 * q.multiplier;

      sumAchieved += achieved;
      sumMax += maxPossible;

      if (answerValue) answered++;

      // Track key controls (MinimumReq)
      if (q.type === "MinimumReq") {
        keyControls.total++;
        if (answerValue === "Yes") keyControls.fulfilled++;
        else if (answerValue === "Partially") keyControls.partial++;
        else if (answerValue === "No") keyControls.notFulfilled++;
        else keyControls.noInfo++;
      }
    }

    var score = sumMax > 0 ? (sumAchieved / sumMax) * MAX_SCORE : 0;
    score = Math.round(score * 100) / 100;

    return {
      score: score,
      label: getRatingLabel(score),
      answered: answered,
      total: visible.length,
      keyControls: keyControls,
    };
  }

  function overallRating(answers, businessSize, includeOT, uwOverrides) {
    var weightedSum = 0;
    var weightSum = 0;
    var totalAnswered = 0;
    var totalQuestions = 0;
    var aggKC = { fulfilled: 0, partial: 0, notFulfilled: 0, noInfo: 0, total: 0 };

    for (var d = 1; d <= 9; d++) {
      var weight = DOMAIN_WEIGHTS[d];
      var ds;

      if (uwOverrides && uwOverrides[d] != null) {
        // Use UW override score for this domain
        ds = domainScore(d, answers, businessSize, includeOT);
        var overrideScore = uwOverrides[d].score;
        weightedSum += overrideScore * weight;
      } else {
        ds = domainScore(d, answers, businessSize, includeOT);
        weightedSum += ds.score * weight;
      }

      weightSum += weight;
      totalAnswered += ds.answered;
      totalQuestions += ds.total;

      aggKC.fulfilled += ds.keyControls.fulfilled;
      aggKC.partial += ds.keyControls.partial;
      aggKC.notFulfilled += ds.keyControls.notFulfilled;
      aggKC.noInfo += ds.keyControls.noInfo;
      aggKC.total += ds.keyControls.total;
    }

    var score = weightSum > 0 ? weightedSum / weightSum : 0;
    score = Math.round(score * 100) / 100;

    var kcLabel =
      aggKC.notFulfilled === 0 && aggKC.noInfo === 0 ? "Fulfilled" : "Not fulfilled";

    return {
      score: score,
      label: getRatingLabel(score),
      keyControls: aggKC,
      kcLabel: kcLabel,
      totalAnswered: totalAnswered,
      totalQuestions: totalQuestions,
    };
  }

  function biCalc(bi) {
    if (!bi || !bi.turnover) return null;

    var turnover = bi.turnover;
    var turnoverTrend = bi.turnoverTrend || 0;
    var profitMargin = bi.profitMargin || 0;
    var fixCosts = bi.fixCosts || 0;
    var otherCosts = bi.otherCosts || 0;

    var insuredLoss =
      turnover * (1 + turnoverTrend / 100) * (profitMargin / 100 + fixCosts / 100) +
      otherCosts;
    var perDay = insuredLoss / 365;

    var horizons = [
      { label: "0.5 days", days: 0.5 },
      { label: "1 day", days: 1 },
      { label: "2 days", days: 2 },
      { label: "3 days", days: 3 },
      { label: "5 days", days: 5 },
      { label: "7 days", days: 7 },
      { label: "14 days", days: 14 },
      { label: "30 days", days: 30 },
      { label: "90 days", days: 90 },
    ];

    var scenarios = [
      { label: "Group total", fraction: 1.0 },
      { label: "Geo region largest", fraction: 0.65 },
      { label: "Business unit largest", fraction: 0.2 },
      { label: "Plant largest", fraction: 0.1 },
      { label: "Main data centre", fraction: 0.3 },
    ];

    var table = scenarios.map(function (s) {
      return {
        label: s.label,
        total: insuredLoss * s.fraction,
        values: horizons.map(function (h) {
          return perDay * h.days * s.fraction;
        }),
      };
    });

    return {
      insuredLoss: insuredLoss,
      perDay: perDay,
      horizons: horizons,
      table: table,
      deductible: bi.deductible || 0,
      limit: bi.limit || 0,
    };
  }

  return {
    ANSWER_POINTS: ANSWER_POINTS,
    MAX_SCORE: MAX_SCORE,
    THRESHOLDS: THRESHOLDS,
    getRatingLabel: getRatingLabel,
    getVisibleQuestions: getVisibleQuestions,
    domainScore: domainScore,
    overallRating: overallRating,
    biCalc: biCalc,
  };
})();
