/* @ds-bundle: {"format":4,"namespace":"PersonalOSDesignSystem_c2885e","components":[{"name":"AISendButton","sourcePath":"components/buttons/AISendButton.jsx"},{"name":"PrimaryButton","sourcePath":"components/buttons/PrimaryButton.jsx"},{"name":"SecondaryButton","sourcePath":"components/buttons/SecondaryButton.jsx"},{"name":"BaseCard","sourcePath":"components/cards/BaseCard.jsx"},{"name":"KPICard","sourcePath":"components/cards/KPICard.jsx"},{"name":"SectionCard","sourcePath":"components/cards/SectionCard.jsx"},{"name":"IconContainer","sourcePath":"components/data/IconContainer.jsx"},{"name":"ListRow","sourcePath":"components/data/ListRow.jsx"},{"name":"ProgressIndicator","sourcePath":"components/data/ProgressIndicator.jsx"},{"name":"StatusChip","sourcePath":"components/data/StatusChip.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"SidebarNavItem","sourcePath":"components/navigation/SidebarNavItem.jsx"},{"name":"SidebarNavigationItem","sourcePath":"components/navigation/SidebarNavigationItem.jsx"},{"name":"TopNavigationAction","sourcePath":"components/navigation/TopNavigationAction.jsx"}],"sourceHashes":{"components/buttons/AISendButton.jsx":"b3e4621cd30a","components/buttons/PrimaryButton.jsx":"1bd2872f5c82","components/buttons/SecondaryButton.jsx":"0ca32d2149c7","components/cards/BaseCard.jsx":"29bfd96ef8fa","components/cards/KPICard.jsx":"5091495eebbb","components/cards/SectionCard.jsx":"900243cc1636","components/data/IconContainer.jsx":"3cedfc085f48","components/data/ListRow.jsx":"ce97ee2d69a3","components/data/ProgressIndicator.jsx":"373032f60808","components/data/StatusChip.jsx":"11de0e519dc8","components/forms/SearchField.jsx":"e6fdd96b1237","components/forms/Toggle.jsx":"9244bc153d7b","components/navigation/SidebarNavItem.jsx":"04fe36d41860","components/navigation/SidebarNavigationItem.jsx":"4d7580235a8a","components/navigation/TopNavigationAction.jsx":"13f8e779cda4","ui_kits/dashboard/BottomRow.jsx":"5ff9f734c54c","ui_kits/dashboard/KpiRow.jsx":"8ef62fa48628","ui_kits/dashboard/OrbitBoard.jsx":"6f8190b11f29","ui_kits/dashboard/RightColumn.jsx":"5514a7719723","ui_kits/dashboard/Sidebar.jsx":"312b2f01bf3d","ui_kits/dashboard/TopBar.jsx":"c15c8f5716e7","ui_kits/dashboard/icons.jsx":"723f3d6abbab"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PersonalOSDesignSystem_c2885e = window.PersonalOSDesignSystem_c2885e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/AISendButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATES = {
  default: {
    background: 'var(--gradient-accent)',
    boxShadow: 'none',
    color: 'var(--white)'
  },
  hover: {
    background: 'linear-gradient(90deg, rgb(143,112,255) 0%, rgb(178,153,255) 100%)',
    boxShadow: '0px 2px 12px 0px rgba(140,107,255,0.5)',
    color: 'var(--white)'
  },
  pressed: {
    background: 'linear-gradient(90deg, rgb(102,74,217) 0%, rgb(128,102,229) 100%)',
    boxShadow: 'none',
    color: 'var(--white)'
  },
  focus: {
    background: 'var(--gradient-accent)',
    boxShadow: '0 0 0 2px rgba(191,173,255,0.95), 0px 0px 6px 2px rgba(153,128,255,0.35)',
    color: 'var(--white)'
  },
  disabled: {
    background: 'rgba(77,71,102,0.5)',
    boxShadow: 'none',
    color: 'rgb(191,189,209)'
  }
};

/**
 * AI Send Button — square gradient icon button that submits an AI prompt.
 * 40×40, 10px radius, diagonal "send" glyph. Five interaction states.
 */
function AISendButton({
  state = 'default',
  style,
  className,
  onClick,
  ...rest
}) {
  const s = STATES[state] || STATES.default;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: className,
    onClick: onClick,
    disabled: state === 'disabled',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 10,
      border: 'none',
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      transition: 'background 140ms ease, box-shadow 140ms ease',
      background: s.background,
      boxShadow: s.boxShadow,
      color: s.color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 2 11 13"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 2 15 22l-4-9-9-4Z"
  })));
}
Object.assign(__ds_scope, { AISendButton, __ds_default_components_buttons_AISendButton_w9dlu0: AISendButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/AISendButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/PrimaryButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATES = {
  default: {
    background: 'var(--gradient-accent)',
    boxShadow: 'none',
    color: 'var(--white)'
  },
  hover: {
    background: 'linear-gradient(90deg, rgb(143,112,255) 0%, rgb(178,153,255) 100%)',
    boxShadow: '0px 2px 14px 0px rgba(140,107,255,0.45)',
    color: 'var(--white)'
  },
  pressed: {
    background: 'linear-gradient(90deg, rgb(102,74,217) 0%, rgb(128,102,229) 100%)',
    boxShadow: 'none',
    color: 'var(--white)'
  },
  focus: {
    background: 'var(--gradient-accent)',
    boxShadow: '0 0 0 2px rgba(191,173,255,0.95), 0px 0px 6px 2px rgba(153,128,255,0.35)',
    color: 'var(--white)'
  },
  disabled: {
    background: 'rgba(77,71,102,0.5)',
    boxShadow: 'none',
    color: 'rgb(178,176,199)'
  }
};

/**
 * Primary Button — the accent gradient CTA (e.g. "QUICK CREATE").
 * Rajdhani, all-caps, letter-spaced. Five interaction states.
 */
function PrimaryButton({
  children = 'QUICK CREATE',
  state = 'default',
  icon,
  style,
  className,
  onClick,
  ...rest
}) {
  const s = STATES[state] || STATES.default;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: className,
    onClick: onClick,
    disabled: state === 'disabled',
    style: {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 42,
      padding: '0 18px',
      borderRadius: 11,
      border: 'none',
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      lineHeight: '100%',
      letterSpacing: '0.6px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      transition: 'background 140ms ease, box-shadow 140ms ease',
      background: s.background,
      boxShadow: s.boxShadow,
      color: s.color,
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { PrimaryButton, __ds_default_components_buttons_PrimaryButton_a88o6w: PrimaryButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/PrimaryButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/SecondaryButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Secondary Button — low-emphasis action on an elevated glass surface.
 * Inter, sentence-case, hairline border. Sits beside PrimaryButton.
 */
function SecondaryButton({
  children = 'ANSEHEN',
  icon,
  style,
  className,
  onClick,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: className,
    onClick: onClick,
    style: {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '10px 20px',
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: 'var(--surface-elevated)',
      boxShadow: 'var(--hairline)',
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '100%',
      whiteSpace: 'nowrap',
      color: 'var(--text-primary)',
      transition: 'background 140ms ease',
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { SecondaryButton, __ds_default_components_buttons_SecondaryButton_1tsm7to: SecondaryButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/SecondaryButton.jsx", error: String((e && e.message) || e) }); }

// components/cards/BaseCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ELEVATIONS = {
  card: {
    backgroundColor: 'var(--surface-card)',
    backdropFilter: 'var(--glass-blur)',
    boxShadow: 'var(--shadow-card)'
  },
  glow: {
    backgroundColor: 'rgba(21,16,39,0.86)',
    backdropFilter: 'var(--glass-blur-card)',
    boxShadow: 'var(--shadow-card-glow)'
  },
  elevated: {
    backgroundColor: 'var(--surface-elevated)',
    backdropFilter: 'var(--glass-blur-card)',
    boxShadow: 'var(--shadow-elevated)'
  },
  soft: {
    backgroundColor: 'rgba(21,16,39,0.85)',
    backdropFilter: 'var(--glass-blur-card)',
    boxShadow: 'var(--shadow-soft)'
  }
};

/**
 * Base Card — the frosted-glass panel every dashboard module sits on.
 * Pick an `elevation`: card (default), glow (accent-ringed hero), elevated, soft.
 * 16px radius, blur, layered inset/drop shadows. Compose header + content inside.
 */
function BaseCard({
  elevation = 'card',
  padding = 20,
  children,
  style,
  className,
  ...rest
}) {
  const e = ELEVATIONS[elevation] || ELEVATIONS.card;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      borderRadius: 16,
      boxSizing: 'border-box',
      padding,
      ...e,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { BaseCard, __ds_default_components_cards_BaseCard_18si2tn: BaseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/BaseCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/KPICard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Ring({
  value = 70,
  size = 46
}) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.min(100, Math.max(0, value)) / 100 * c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "rgba(240,237,250,0.12)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--accent-primary)",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: `${dash} ${c}`
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      color: 'var(--gray-100)'
    }
  }, value, "%"));
}

/**
 * KPI Card — headline metric tile: label, big number, progress ring, sub-line
 * and a footer action link. Used across the top KPI row (Daily Tasks, Habits…).
 */
function KPICard({
  label = 'DAILY TASKS',
  value = '6',
  progress = 70,
  subtitle = '2 offen · 1 aktiv · 3 fertig',
  action = 'ALLE AUFGABEN',
  onAction,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.BaseCard, _extends({
    elevation: "elevated",
    padding: "16px 18px",
    className: className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 8,
      minHeight: 172,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.24px',
      textTransform: 'uppercase',
      color: 'rgb(184,178,204)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 30,
      lineHeight: '100%',
      color: 'rgb(240,237,250)'
    }
  }, value), progress != null && /*#__PURE__*/React.createElement(Ring, {
    value: progress
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 400,
      fontSize: 12,
      color: 'rgb(199,196,219)'
    }
  }, subtitle), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      alignSelf: 'flex-start',
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.6px',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, action, " \u2192"));
}
Object.assign(__ds_scope, { KPICard, __ds_default_components_cards_KPICard_1xt6250: KPICard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/KPICard.jsx", error: String((e && e.message) || e) }); }

// components/cards/SectionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Section Card — BaseCard with a standard header row: a title on the left and
 * an optional all-caps action link on the right ("ALLE →", "GOOGLE CALENDAR").
 */
function SectionCard({
  title = 'Section Titel',
  action,
  onAction,
  elevation = 'soft',
  children,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.BaseCard, _extends({
    elevation: elevation,
    padding: "18px 20px 20px",
    className: className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      alignSelf: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pos-card-title",
    style: {
      flex: 1,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: '0.6px',
      color: 'var(--text-primary)'
    }
  }, title), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, action)), children);
}
Object.assign(__ds_scope, { SectionCard, __ds_default_components_cards_SectionCard_1fdtjet: SectionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/SectionCard.jsx", error: String((e && e.message) || e) }); }

// components/data/IconContainer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon Container — 36×36 rounded glass tile that frames an icon.
 * Used for module glyphs and avatars-of-things. Pass any icon node.
 */
function IconContainer({
  icon,
  size = 36,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 10,
      backgroundColor: 'var(--surface-elevated)',
      boxShadow: 'var(--hairline)',
      color: 'var(--text-accent)',
      ...style
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { IconContainer, __ds_default_components_data_IconContainer_1hh24tr: IconContainer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/IconContainer.jsx", error: String((e && e.message) || e) }); }

// components/data/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * List Row — a checkable task/agenda row: leading checkbox, label, trailing meta.
 * Used in task columns, agenda lists and quick-add lists.
 */
function ListRow({
  label = 'Supabase Schema anlegen',
  meta = 'HEUTE',
  checked = false,
  onToggle,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      height: 36,
      padding: '0 2px',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    "aria-pressed": checked,
    style: {
      width: 16,
      height: 16,
      flexShrink: 0,
      borderRadius: 5,
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked ? 'var(--gradient-accent)' : 'transparent',
      boxShadow: checked ? 'none' : 'inset 0 0 0 1.5px rgba(255,255,255,0.18)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--white)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: checked ? 'var(--text-muted)' : 'var(--text-primary)',
      textDecoration: checked ? 'line-through' : 'none'
    }
  }, label), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, meta));
}
Object.assign(__ds_scope, { ListRow, __ds_default_components_data_ListRow_oo3c47: ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressIndicator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Progress Indicator — thin rounded track with an accent fill.
 * `value` is 0–100. Used in KPI/Goal rows.
 */
function ProgressIndicator({
  value = 60,
  height = 6,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: 'relative',
      width: '100%',
      height,
      borderRadius: 999,
      backgroundColor: 'var(--surface-inset)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: `${Math.min(100, Math.max(0, value))}%`,
      borderRadius: 999,
      background: 'var(--gradient-accent)',
      transition: 'width 220ms ease'
    }
  }));
}
Object.assign(__ds_scope, { ProgressIndicator, __ds_default_components_data_ProgressIndicator_zmjaph: ProgressIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressIndicator.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  accent: {
    ring: 'rgba(139,92,246,0.35)',
    text: 'var(--text-accent)'
  },
  success: {
    ring: 'rgba(74,222,128,0.4)',
    text: 'var(--accent-success)'
  },
  warning: {
    ring: 'rgba(251,191,36,0.4)',
    text: 'var(--accent-warning)'
  },
  danger: {
    ring: 'rgba(251,113,133,0.4)',
    text: 'var(--accent-danger)'
  },
  info: {
    ring: 'rgba(56,189,248,0.4)',
    text: 'var(--accent-info)'
  },
  neutral: {
    ring: 'rgba(255,255,255,0.12)',
    text: 'var(--text-secondary)'
  }
};

/**
 * Status Chip — small all-caps pill (priority, status, badges).
 * Inset dark fill with a colored hairline ring. Six tones.
 */
function StatusChip({
  children = 'HIGH',
  tone = 'accent',
  style,
  className,
  ...rest
}) {
  const t = TONES[tone] || TONES.accent;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      width: 'fit-content',
      padding: '4px 10px',
      borderRadius: 999,
      backgroundColor: 'var(--surface-inset)',
      boxShadow: `inset 0 0 0 1px ${t.ring}`,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '100%',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: t.text,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { StatusChip, __ds_default_components_data_StatusChip_1o9u363: StatusChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Search Field — inset command-search input with a lens icon and ⌘K hint.
 * Used in the header ("Suche in deinem OS …").
 */
function SearchField({
  placeholder = 'Suche in deinem OS …',
  shortcut = '⌘K',
  value,
  onChange,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      width: 320,
      height: 40,
      padding: '10px 10px 10px 14px',
      borderRadius: 12,
      boxSizing: 'border-box',
      backgroundColor: 'var(--surface-inset)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-muted)",
    strokeWidth: "2",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--text-primary)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      letterSpacing: '0.2px',
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }, shortcut));
}
Object.assign(__ds_scope, { SearchField, __ds_default_components_forms_SearchField_13t7kne: SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toggle — pill switch for smart-home devices and settings.
 * Controlled via `on`. 40×22 track, 16px knob (matches the design's larger
 * variant); the source also ships a compact 30×17 device variant (size="sm").
 */
function Toggle({
  on = false,
  size = 'md',
  onChange,
  style,
  className,
  ...rest
}) {
  const dims = size === 'sm' ? {
    w: 30,
    h: 17,
    knob: 13,
    pad: 2
  } : {
    w: 40,
    h: 22,
    knob: 16,
    pad: 3
  };
  const offset = dims.w - dims.knob - dims.pad;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    className: className,
    onClick: () => onChange && onChange(!on),
    style: {
      position: 'relative',
      width: dims.w,
      height: dims.h,
      borderRadius: 999,
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      backgroundColor: on ? 'var(--accent-glow)' : 'var(--surface-inset)',
      boxShadow: on ? 'none' : 'var(--hairline)',
      transition: 'background-color 160ms ease',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: dims.pad,
      left: on ? offset : dims.pad,
      width: dims.knob,
      height: dims.knob,
      borderRadius: '50%',
      backgroundColor: 'var(--white)',
      transition: 'left 160ms cubic-bezier(0.4,0,0.2,1)'
    }
  }));
}
Object.assign(__ds_scope, { Toggle, __ds_default_components_forms_Toggle_kxwno2: Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATES = {
  active: {
    background: 'var(--accent-glow)',
    boxShadow: 'var(--glow-nav-active)',
    color: 'var(--white)'
  },
  default: {
    background: 'transparent',
    boxShadow: 'none',
    color: 'rgb(153,150,178)'
  },
  hover: {
    background: 'rgba(255,255,255,0.06)',
    boxShadow: 'none',
    color: 'rgb(217,214,235)'
  }
};

/**
 * Sidebar Nav Item — vertical icon-over-label tab in the rail.
 * Pass an `icon` node (20×20) and a short all-caps `label`.
 * States: active (accent fill + glow), default, hover.
 */
function SidebarNavItem({
  icon,
  label = 'HOME',
  state = 'default',
  onClick,
  style,
  className,
  ...rest
}) {
  const s = STATES[state] || STATES.default;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: className,
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      width: 72,
      height: 54,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 140ms ease, box-shadow 140ms ease, color 140ms ease',
      background: s.background,
      boxShadow: s.boxShadow,
      color: s.color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 11,
      lineHeight: '100%',
      letterSpacing: '0.3px',
      textTransform: 'uppercase',
      color: 'currentColor'
    }
  }, label));
}
Object.assign(__ds_scope, { SidebarNavItem, __ds_default_components_navigation_SidebarNavItem_16kpxwn: SidebarNavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNavigationItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sidebar Navigation Item — outlined rail tab variant (2 states).
 * Unlike SidebarNavItem's filled active glow, the active state here is a
 * subtle elevated surface with an accent hairline ring and an Inter label.
 */
function SidebarNavigationItem({
  icon,
  label = 'HOME',
  state = 'default',
  onClick,
  style,
  className,
  ...rest
}) {
  const active = state === 'active';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: className,
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      width: 64,
      height: 56,
      padding: '9px 0',
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box',
      backgroundColor: active ? 'var(--surface-elevated)' : 'transparent',
      boxShadow: active ? 'var(--hairline-accent)' : 'none',
      color: active ? 'var(--text-accent)' : 'var(--text-secondary)',
      transition: 'background-color 140ms ease, box-shadow 140ms ease, color 140ms ease',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '100%',
      color: 'currentColor'
    }
  }, label));
}
Object.assign(__ds_scope, { SidebarNavigationItem, __ds_default_components_navigation_SidebarNavigationItem_1n5juz6: SidebarNavigationItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNavigationItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNavigationAction.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Top Navigation Action — 40×40 glass icon button for the header
 * (notifications, filter, settings). Hairline border on an elevated surface.
 */
function TopNavigationAction({
  icon,
  active = false,
  onClick,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: className,
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: active ? 'rgba(139,92,246,0.14)' : 'var(--surface-card)',
      boxShadow: active ? 'inset 0 0 0 1px rgba(139,92,246,0.4)' : 'var(--hairline)',
      color: active ? 'var(--text-accent)' : 'var(--text-secondary)',
      transition: 'background-color 140ms ease, box-shadow 140ms ease',
      ...style
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { TopNavigationAction, __ds_default_components_navigation_TopNavigationAction_17n86e2: TopNavigationAction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNavigationAction.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/BottomRow.jsx
try { (() => {
// BottomRow — Journal, AI Brain, Smart Home modules.
function Waveform() {
  const heights = [10, 18, 26, 14, 30, 22, 12, 28, 34, 20, 16, 24, 10, 30, 26, 14, 22, 32, 18, 12, 26, 20, 30, 16, 24, 14, 28, 10, 22, 18, 26, 12, 20, 16];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      height: 40,
      alignSelf: 'stretch'
    }
  }, heights.map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: h,
      borderRadius: 2,
      background: i < 14 ? 'var(--gradient-accent)' : 'rgba(196,181,253,0.28)'
    }
  })));
}
function BrainRow({
  icon,
  title,
  meta
}) {
  const {
    IconContainer
  } = window.PersonalOSDesignSystem_c2885e;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(IconContainer, {
    size: 32,
    icon: React.createElement(icon, {
      size: 16
    })
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 12,
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, meta));
}
function Device({
  icon,
  name,
  meta,
  on,
  toggle
}) {
  const {
    Toggle
  } = window.PersonalOSDesignSystem_c2885e;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 44%',
      minWidth: 120,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      padding: '9px 11px',
      borderRadius: 12,
      background: 'rgba(255,255,255,0.045)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: on ? 'var(--text-accent)' : 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, React.createElement(icon, {
    size: 18
  })), /*#__PURE__*/React.createElement(Toggle, {
    size: "sm",
    on: on,
    onChange: toggle
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 12,
      color: 'rgb(237,235,247)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-secondary)'
    }
  }, meta));
}
function BottomRow({
  devices,
  toggleDevice
}) {
  const {
    SectionCard
  } = window.PersonalOSDesignSystem_c2885e;
  const I = window.POSIcons;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      flex: 1,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Journal",
    action: "ALLE \u2192",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Waveform, null), /*#__PURE__*/React.createElement("span", {
    className: "pos-caption"
  }, "Heute, 08:15 \xB7 0:45"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.4,
      color: 'rgb(199,196,219)'
    }
  }, "Fokus heute auf Orbit und Figma Foundation. Guter Call mit ACME am Morgen \u2014 abends Training nicht vergessen.")), /*#__PURE__*/React.createElement(SectionCard, {
    title: "AI Brain",
    action: "\xD6FFNEN \u2192",
    style: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/ai-brain-network.png",
    alt: "",
    style: {
      position: 'absolute',
      right: -30,
      top: 30,
      width: 170,
      height: 170,
      opacity: 0.7,
      filter: 'drop-shadow(0 0 10px rgba(140,107,255,0.28))',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(BrainRow, {
    icon: I.bulb,
    title: "Content Ideas",
    meta: "8 neue Ideen"
  }), /*#__PURE__*/React.createElement(BrainRow, {
    icon: I.doc,
    title: "Legal Notes",
    meta: "6 Dokumente"
  }), /*#__PURE__*/React.createElement(BrainRow, {
    icon: I.coins,
    title: "Finance Thoughts",
    meta: "4 Notizen"
  }))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Smart Home",
    action: "ALLE GER\xC4TE \u2192",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px 11px'
    }
  }, /*#__PURE__*/React.createElement(Device, {
    icon: I.bulb,
    name: "Wohnzimmer",
    meta: devices.living ? 'Ein · Warm' : 'Aus',
    on: devices.living,
    toggle: () => toggleDevice('living')
  }), /*#__PURE__*/React.createElement(Device, {
    icon: I.robot,
    name: "Saugroboter",
    meta: "Dockt \xB7 100%",
    on: devices.vacuum,
    toggle: () => toggleDevice('vacuum')
  }), /*#__PURE__*/React.createElement(Device, {
    icon: I.sun,
    name: "Terrasse",
    meta: devices.patio ? 'Ein' : 'Aus',
    on: devices.patio,
    toggle: () => toggleDevice('patio')
  }), /*#__PURE__*/React.createElement(Device, {
    icon: I.thermo,
    name: "Temperatur",
    meta: "Wohnzimmer \xB7 22\xB0",
    on: devices.temp,
    toggle: () => toggleDevice('temp')
  }))));
}
window.BottomRow = BottomRow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/BottomRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/KpiRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// KpiRow — the four metric tiles across the top of the main column.
function KpiRow({
  tasksDone
}) {
  const {
    KPICard
  } = window.PersonalOSDesignSystem_c2885e;
  const items = [{
    label: 'DAILY TASKS',
    value: String(3 + tasksDone),
    progress: 40 + tasksDone * 10,
    subtitle: `${3 - tasksDone} offen · 1 aktiv · ${3 + tasksDone} fertig`,
    action: 'ALLE AUFGABEN'
  }, {
    label: 'HABITS',
    value: '5/7',
    progress: 71,
    subtitle: 'Gym noch offen heute',
    action: 'HABITS'
  }, {
    label: 'HEALTH',
    value: '8.240',
    progress: 62,
    subtitle: 'Schritte · Ziel 12k',
    action: 'HEALTH'
  }, {
    label: 'INVEST',
    value: '+3,2%',
    progress: 58,
    subtitle: 'Portfolio diese Woche',
    action: 'INVESTMENTS'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      flexShrink: 0
    }
  }, items.map(it => /*#__PURE__*/React.createElement(KPICard, _extends({
    key: it.label
  }, it, {
    style: {
      flex: 1,
      minHeight: 172
    }
  }))));
}
window.KpiRow = KpiRow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/KpiRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/OrbitBoard.jsx
try { (() => {
// OrbitBoard — the project kanban module (glow card).
function Ticket({
  title,
  tone,
  priority
}) {
  const {
    StatusChip
  } = window.PersonalOSDesignSystem_c2885e;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 10,
      borderRadius: 10,
      background: 'rgba(23,18,43,0.7)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-primary)',
      lineHeight: 1.35
    }
  }, title), priority && /*#__PURE__*/React.createElement(StatusChip, {
    tone: tone
  }, priority));
}
function Column({
  dot,
  title,
  count,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 10,
      borderRadius: 12,
      background: 'var(--surface-inset)',
      alignSelf: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: dot
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, count)), children, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.2px',
      color: 'var(--text-accent)',
      cursor: 'pointer'
    }
  }, "+ Neue Karte"));
}
function OrbitBoard({
  tasks,
  toggleTask
}) {
  const {
    BaseCard,
    ListRow,
    StatusChip
  } = window.PersonalOSDesignSystem_c2885e;
  return /*#__PURE__*/React.createElement(BaseCard, {
    elevation: "glow",
    padding: "18px 20px 20px",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pos-title"
  }, "Orbit \u2013 Project Board"), /*#__PURE__*/React.createElement(StatusChip, {
    tone: "accent"
  }, "Personal OS"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: 'rgb(168,140,255)',
      cursor: 'pointer'
    }
  }, "Zum Orbit Tool \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      padding: '14px 14px 12px',
      borderRadius: 14,
      background: 'rgba(23,18,43,0.5)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 13,
      color: 'rgb(235,232,247)'
    }
  }, "Meine Aufgaben heute"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '1px 7px',
      borderRadius: 999,
      background: 'rgba(139,92,246,0.18)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      color: 'rgb(184,158,255)'
    }
  }, tasks.filter(t => !t.done).length)), tasks.map(t => /*#__PURE__*/React.createElement(ListRow, {
    key: t.id,
    label: t.label,
    meta: t.meta,
    checked: t.done,
    onToggle: () => toggleTask(t.id)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 11,
      color: 'var(--text-accent)',
      cursor: 'pointer',
      marginTop: 4
    }
  }, "+ Neue Aufgabe")), /*#__PURE__*/React.createElement(Column, {
    dot: "var(--violet-300)",
    title: "To Do",
    count: "8"
  }, /*#__PURE__*/React.createElement(Ticket, {
    title: "Telegram Bot Webhook aufsetzen",
    tone: "info",
    priority: "MEDIUM"
  }), /*#__PURE__*/React.createElement(Ticket, {
    title: "Passwortschutz vor Komponenten-Bau"
  })), /*#__PURE__*/React.createElement(Column, {
    dot: "var(--accent-info)",
    title: "Review",
    count: "3"
  }, /*#__PURE__*/React.createElement(Ticket, {
    title: "Dashboard-Layout Wireframe",
    tone: "info",
    priority: "MEDIUM"
  }), /*#__PURE__*/React.createElement(Ticket, {
    title: "Ticket-Import Orbit pr\xFCfen",
    tone: "warning",
    priority: "LOW"
  })), /*#__PURE__*/React.createElement(Column, {
    dot: "var(--accent-success)",
    title: "Done",
    count: "12"
  }, /*#__PURE__*/React.createElement(Ticket, {
    title: "Tech-Stack Entscheidung",
    tone: "success",
    priority: "DONE"
  }), /*#__PURE__*/React.createElement(Ticket, {
    title: "Anthropic API Key eingerichtet",
    tone: "success",
    priority: "DONE"
  }))));
}
window.OrbitBoard = OrbitBoard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/OrbitBoard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/RightColumn.jsx
try { (() => {
// RightColumn — AI Briefing, Calendar, Goals.
function BriefItem({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--accent-glow)',
      marginTop: 6,
      flexShrink: 0,
      boxShadow: '0 0 8px rgba(167,139,250,0.7)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.4,
      color: 'var(--text-secondary)'
    }
  }, children));
}
function AgendaItem({
  time,
  title,
  dur
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      flexShrink: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      color: 'var(--text-accent)'
    }
  }, time), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, dur));
}
function MiniMonth() {
  const dots = {
    15: 1,
    22: 1,
    28: 1
  };
  const days = [];
  for (let d = 1; d <= 31; d++) days.push(d);
  const pad = 1; // July 2026 starts Wed → 2 blanks for Mo,Di
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      color: 'var(--text-primary)'
    }
  }, "Juli 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '3px 2px'
    }
  }, ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, d)), Array.from({
    length: pad + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: 'b' + i
  })), days.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      position: 'relative',
      height: 17,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: d === 11 ? '#fff' : 'rgb(199,196,219)',
      background: d === 11 ? 'var(--accent-primary)' : 'transparent'
    }
  }, d, dots[d] && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 0,
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: 'var(--violet-500)'
    }
  })))));
}
function RightColumn({
  ai,
  setAi,
  onAsk
}) {
  const {
    BaseCard,
    SectionCard,
    StatusChip,
    AISendButton,
    ProgressIndicator
  } = window.PersonalOSDesignSystem_c2885e;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      minWidth: 300
    }
  }, /*#__PURE__*/React.createElement(BaseCard, {
    elevation: "glow",
    padding: "18px 20px",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      height: 296,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--gradient-orb)',
      boxShadow: '0 0 12px rgba(167,139,250,0.6)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: '0.6px',
      color: 'var(--text-primary)'
    }
  }, "AI Morning Briefing"), /*#__PURE__*/React.createElement(StatusChip, {
    tone: "accent"
  }, "BETA")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/ai-orb.png",
    alt: "",
    style: {
      position: 'absolute',
      right: -6,
      top: 42,
      width: 140,
      height: 140,
      opacity: 0.8,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(BriefItem, null, "Du hast heute ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, "6 offene Aufgaben"), " im Orbit"), /*#__PURE__*/React.createElement(BriefItem, null, "2 Meetings im Kalender"), /*#__PURE__*/React.createElement(BriefItem, null, "Gym-Habit ist noch offen"), /*#__PURE__*/React.createElement(BriefItem, null, "Guter Fokus-Tag f\xFCr Deep Work")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 56,
      padding: '6px 8px 6px 16px',
      borderRadius: 12,
      background: 'rgba(15,13,33,0.55)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: ai,
    onChange: e => setAi(e.target.value),
    onKeyDown: e => e.key === 'Enter' && onAsk(),
    placeholder: "Frag deine AI \u2026",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-primary)'
    }
  }), /*#__PURE__*/React.createElement(AISendButton, {
    onClick: onAsk
  }))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Kalender \u2013 Heute",
    action: "Google Calendar",
    elevation: "soft",
    style: {
      height: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(AgendaItem, {
    time: "09:00",
    title: "Team Standup",
    dur: "30 m"
  }), /*#__PURE__*/React.createElement(AgendaItem, {
    time: "10:30",
    title: "Client Call \u2013 ACME",
    dur: "1 h"
  }), /*#__PURE__*/React.createElement(AgendaItem, {
    time: "14:00",
    title: "Deep Work Session",
    dur: "2 h"
  }), /*#__PURE__*/React.createElement(AgendaItem, {
    time: "19:00",
    title: "Abendessen mit Lisa",
    dur: "2 h"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 12,
      color: 'var(--text-accent)',
      cursor: 'pointer'
    }
  }, "Alle Termine anzeigen \u2192")), /*#__PURE__*/React.createElement(MiniMonth, null))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Goals \u2013 Monatsziele",
    action: "ALLE \u2192",
    elevation: "soft",
    style: {
      flex: 1
    }
  }, [['Personal OS Launch', 72], ['10 kg abnehmen', 45], ['10 k € Umsatz', 60]].map(([g, p]) => /*#__PURE__*/React.createElement("div", {
    key: g,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-primary)'
    }
  }, g), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      color: 'var(--text-accent)'
    }
  }, p, " %")), /*#__PURE__*/React.createElement(ProgressIndicator, {
    value: p
  })))));
}
window.RightColumn = RightColumn;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/RightColumn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Sidebar.jsx
try { (() => {
// Sidebar — 88px cosmic glass rail with logo + nav tabs.
function Sidebar({
  active,
  onSelect
}) {
  const {
    SidebarNavItem
  } = window.PersonalOSDesignSystem_c2885e;
  const I = window.POSIcons;
  const nav = [['HOME', I.home], ['ORBIT', I.orbit], ['KALENDER', I.calendar], ['HABITS', I.habits], ['GOALS', I.goals], ['HEALTH', I.health], ['INVEST', I.invest], ['SMART HOME', I.smart], ['AI BRAIN', I.brain]];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 88,
      alignSelf: 'stretch',
      flexShrink: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      padding: '16px 8px 14px',
      borderRadius: 20,
      background: 'rgba(21,16,39,0.68)',
      backdropFilter: 'blur(24px)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0px 8px 24px -4px rgba(0,0,0,0.35)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 12,
      flexShrink: 0,
      position: 'relative',
      background: 'var(--accent-primary)',
      boxShadow: '0px 0px 18px 0px rgba(167,139,250,0.5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 9,
      top: 9,
      width: 18,
      height: 18,
      borderRadius: '50%',
      boxShadow: 'inset 0 0 0 1.6px rgba(255,255,255,0.9)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 22,
      top: 8,
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6
    }
  }), nav.map(([label, icon]) => /*#__PURE__*/React.createElement(SidebarNavItem, {
    key: label,
    label: label,
    icon: React.createElement(icon, {
      size: 20
    }),
    state: active === label ? 'active' : 'default',
    onClick: () => onSelect(label),
    style: {
      width: '100%',
      alignSelf: 'stretch'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SidebarNavItem, {
    label: "",
    icon: React.createElement(I.settings, {
      size: 20
    }),
    style: {
      width: '100%',
      height: 40,
      gap: 0
    }
  }), /*#__PURE__*/React.createElement(SidebarNavItem, {
    label: "",
    icon: React.createElement(I.chevrons, {
      size: 20
    }),
    style: {
      width: '100%',
      height: 40,
      gap: 0
    }
  }));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/TopBar.jsx
try { (() => {
// TopBar — brand lockup + greeting, search, quick-create, avatar.
function TopBar({
  query,
  setQuery,
  onCreate
}) {
  const {
    SearchField,
    PrimaryButton
  } = window.PersonalOSDesignSystem_c2885e;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      height: 86,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      width: 260,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 22,
      height: 22,
      borderRadius: 6,
      background: 'var(--gradient-brand)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 4.5,
      top: 4.5,
      width: 13,
      height: 13,
      borderRadius: '50%',
      boxShadow: 'inset 0 0 0 1.2px rgba(255,255,255,0.85)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 13.2,
      top: 4.2,
      width: 3.6,
      height: 3.6,
      borderRadius: '50%',
      background: '#fff'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "pos-brand"
  }, "Personal OS")), /*#__PURE__*/React.createElement("span", {
    className: "pos-display",
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Guten Morgen, David"), /*#__PURE__*/React.createElement("span", {
    className: "pos-meta"
  }, "Samstag, 11. Juli 2026 \xB7 KW 28")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SearchField, {
    value: query,
    onChange: e => setQuery(e.target.value)
  }), /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: onCreate
  }, "Quick Create"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 40,
      padding: '6px 14px 6px 6px',
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--hairline)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--gradient-avatar)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '1.2px',
      color: 'var(--text-primary)'
    }
  }, "DAVID")));
}
window.TopBar = TopBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/icons.jsx
try { (() => {
// Personal OS icon set — Lucide-style 1.7px stroke glyphs used across the dashboard.
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};
const svg = (w, children) => props => React.createElement('svg', {
  width: props?.size || 20,
  height: props?.size || 20,
  viewBox: '0 0 24 24',
  ...S,
  'aria-hidden': true
}, children);
const Icons = {
  home: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M3 10.5 12 3l9 7.5'
  }), React.createElement('path', {
    key: 2,
    d: 'M5 9.5V21h14V9.5'
  })]),
  orbit: svg(24, [React.createElement('circle', {
    key: 1,
    cx: 12,
    cy: 12,
    r: 2.6
  }), React.createElement('ellipse', {
    key: 2,
    cx: 12,
    cy: 12,
    rx: 10,
    ry: 4.4,
    transform: 'rotate(-30 12 12)'
  })]),
  calendar: svg(24, [React.createElement('rect', {
    key: 1,
    x: 3,
    y: 4.5,
    width: 18,
    height: 16,
    rx: 2.5
  }), React.createElement('path', {
    key: 2,
    d: 'M3 9h18M8 2.5v4M16 2.5v4'
  })]),
  habits: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M20 6 9 17l-5-5'
  })]),
  goals: svg(24, [React.createElement('circle', {
    key: 1,
    cx: 12,
    cy: 12,
    r: 8
  }), React.createElement('circle', {
    key: 2,
    cx: 12,
    cy: 12,
    r: 3.4
  })]),
  health: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M3 12h4l2-5 3 10 2-5h7'
  })]),
  invest: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M4 18 10 12l4 3 6-7'
  }), React.createElement('path', {
    key: 2,
    d: 'M15 8h5v5'
  })]),
  smart: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M4 11 12 4l8 7'
  }), React.createElement('path', {
    key: 2,
    d: 'M6 9.5V20h12V9.5'
  }), React.createElement('circle', {
    key: 3,
    cx: 12,
    cy: 14,
    r: 1.6
  })]),
  brain: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M12 5a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V16a3 3 0 0 0 4 2.8A3 3 0 0 0 16 16v-2.2A3 3 0 0 0 15 8a3 3 0 0 0-3-3Z'
  }), React.createElement('path', {
    key: 2,
    d: 'M12 5v13.8'
  })]),
  settings: svg(24, [React.createElement('circle', {
    key: 1,
    cx: 12,
    cy: 12,
    r: 3
  }), React.createElement('path', {
    key: 2,
    d: 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.5 14H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 8a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V10a2 2 0 1 1 0 4h-.1'
  })]),
  chevrons: svg(24, [React.createElement('path', {
    key: 1,
    d: 'm13 17 5-5-5-5M6 17l5-5-5-5'
  })]),
  bell: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9'
  }), React.createElement('path', {
    key: 2,
    d: 'M13.7 21a2 2 0 0 1-3.4 0'
  })]),
  bulb: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z'
  })]),
  robot: svg(24, [React.createElement('rect', {
    key: 1,
    x: 4,
    y: 8,
    width: 16,
    height: 11,
    rx: 3
  }), React.createElement('path', {
    key: 2,
    d: 'M12 8V4M8 13h.01M16 13h.01'
  })]),
  sun: svg(24, [React.createElement('circle', {
    key: 1,
    cx: 12,
    cy: 12,
    r: 4
  }), React.createElement('path', {
    key: 2,
    d: 'M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19'
  })]),
  thermo: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z'
  })]),
  doc: svg(24, [React.createElement('path', {
    key: 1,
    d: 'M6 2h8l4 4v16H6Z'
  }), React.createElement('path', {
    key: 2,
    d: 'M14 2v4h4'
  })]),
  coins: svg(24, [React.createElement('ellipse', {
    key: 1,
    cx: 12,
    cy: 6,
    rx: 8,
    ry: 3
  }), React.createElement('path', {
    key: 2,
    d: 'M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6'
  })])
};
window.POSIcons = Icons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AISendButton = __ds_scope.AISendButton;

__ds_ns.PrimaryButton = __ds_scope.PrimaryButton;

__ds_ns.SecondaryButton = __ds_scope.SecondaryButton;

__ds_ns.BaseCard = __ds_scope.BaseCard;

__ds_ns.KPICard = __ds_scope.KPICard;

__ds_ns.SectionCard = __ds_scope.SectionCard;

__ds_ns.IconContainer = __ds_scope.IconContainer;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.ProgressIndicator = __ds_scope.ProgressIndicator;

__ds_ns.StatusChip = __ds_scope.StatusChip;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.SidebarNavItem = __ds_scope.SidebarNavItem;

__ds_ns.SidebarNavigationItem = __ds_scope.SidebarNavigationItem;

__ds_ns.TopNavigationAction = __ds_scope.TopNavigationAction;

})();
