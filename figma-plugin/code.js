// TechTok HW builder: builds the remaining Figma parts of the UX/UI course project.
// Run once in the file "UX-UI 2026 – TechTok – Design" (Figma desktop → Plugins → Development).
// Builds: HW08 UI guideline, HW09 design system + handoff (page 2), HW03 audit frames + HW10 slides (page 3).
// Safe to re-run: it deletes and rebuilds only the sections it created itself.

const PROTO_V3 = 'https://www.figma.com/proto/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=4-430&starting-point-node-id=4%3A430';
const V1_CARD_ID = '4:81';
const V3_CARD_ID = '4:430';

const log = [];
const hex = (h) => { h = h.replace('#', ''); return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 }; };
const solid = (h, opacity) => [{ type: 'SOLID', color: hex(h), opacity: opacity === undefined ? 1 : opacity }];

const LIGHT = { bg: '#F6F7F4', surface: '#FFFFFF', sunk: '#EEF2EF', text: '#1B2420', 'text-muted': '#5E6B64', line: '#DDE3DE', accent: '#2F5D50', 'on-accent': '#FFFFFF', tag: '#E8EEEA', highlight: '#F3E3A8', danger: '#B3261E' };
const DARK = { bg: '#131816', surface: '#1B221F', sunk: '#0F1312', text: '#E6ECE8', 'text-muted': '#93A39A', line: '#2A332F', accent: '#8CC7B3', 'on-accent': '#0F1513', tag: '#222B27', highlight: '#4A4224', danger: '#F08A7E' };
const SPACE = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 };
const RADIUS = { thumb: 12, button: 16, group: 16, cover: 16, pill: 999 };

const F = {
  serifSemi: { family: 'Literata', style: 'SemiBold' },
  serif: { family: 'Literata', style: 'Regular' },
  sans: { family: 'Public Sans', style: 'Regular' },
  sansMed: { family: 'Public Sans', style: 'Medium' },
  sansSemi: { family: 'Public Sans', style: 'SemiBold' },
  sansBold: { family: 'Public Sans', style: 'Bold' },
  inter: { family: 'Inter', style: 'Regular' },
  interBold: { family: 'Inter', style: 'Bold' },
};

const TYPE = {
  'title/screen': [F.serifSemi, 30, 36, 0],
  'title/card': [F.serifSemi, 27, 33, 0],
  'title/reader': [F.serifSemi, 28, 35, 0],
  'reader/body': [F.serif, 18, 30, 0],
  'body': [F.sans, 16, 24, 0],
  'button': [F.sansSemi, 16, 20, 0],
  'meta': [F.sans, 13, 18, 0],
  'label': [F.sansMed, 12, 16, 0.8],
};

let V = {};      // variable name -> Variable
let TS = {};     // text style name -> TextStyle

// ---------- helpers ----------
function bindFill(node, varName, prop) {
  const v = V[varName];
  const base = { type: 'SOLID', color: { r: 0, g: 0, b: 0 } };
  const p = v ? figma.variables.setBoundVariableForPaint(base, 'color', v) : solid(LIGHT[varName.split('/').pop()] || '#000000')[0];
  node[prop || 'fills'] = [p];
}
const L = (role) => 'light/color/' + role; // light theme variable name

async function text(str, styleName, colorRole, opts) {
  opts = opts || {};
  const t = figma.createText();
  const st = TYPE[styleName];
  t.fontName = st[0];
  t.characters = str;
  if (TS[styleName]) { await t.setTextStyleIdAsync(TS[styleName].id); }
  else { t.fontSize = st[1]; t.lineHeight = { unit: 'PIXELS', value: st[2] }; }
  if (colorRole) bindFill(t, L(colorRole));
  if (opts.name) t.name = opts.name;
  if (opts.underline) t.textDecoration = 'UNDERLINE';
  if (opts.upper) t.textCase = 'UPPER';
  return t;
}
function note(str, size, bold, color) {
  const t = figma.createText();
  t.fontName = bold ? F.interBold : F.inter;
  t.characters = str;
  t.fontSize = size || 16;
  t.fills = solid(color || '#1E1E1E');
  return t;
}
function al(dir, props) {
  const f = figma.createFrame();
  f.layoutMode = dir;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  f.fills = [];
  f.clipsContent = false;
  if (props) for (const k in props) f[k] = props[k];
  return f;
}
function put(parent, child, h, v) {
  parent.appendChild(child);
  if (h) child.layoutSizingHorizontal = h;
  if (v) child.layoutSizingVertical = v;
  return child;
}
function wrapIn(parent, t) { parent.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; return t; }
function bindPad(f, v, h) {
  const sv = V['space/' + v], sh = V['space/' + h];
  if (sv) { f.setBoundVariable('paddingTop', sv); f.setBoundVariable('paddingBottom', sv); } else { f.paddingTop = f.paddingBottom = SPACE[v]; }
  if (sh) { f.setBoundVariable('paddingLeft', sh); f.setBoundVariable('paddingRight', sh); } else { f.paddingLeft = f.paddingRight = SPACE[h]; }
}
function bindGap(f, s) { const v = V['space/' + s]; if (v) f.setBoundVariable('itemSpacing', v); else f.itemSpacing = SPACE[s]; }
function bindRadius(f, r) {
  const v = V['radius/' + r];
  if (v) { for (const c of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) f.setBoundVariable(c, v); }
  else f.cornerRadius = RADIUS[r];
}
function sectionOn(page, name, x, y) {
  const s = figma.createSection();
  s.name = name;
  page.appendChild(s);
  s.x = x; s.y = y;
  return s;
}
function fitSection(s, pad) {
  pad = pad || 80;
  let r = 0, b = 0;
  for (const c of s.children) { r = Math.max(r, c.x + c.width); b = Math.max(b, c.y + c.height); }
  s.resizeWithoutConstraints(r + pad, b + pad);
}
function removeOwnSections(page, names) {
  for (const n of [...page.children]) if (n.type === 'SECTION' && names.includes(n.name)) n.remove();
}
function propKey(set, prefix) { return Object.keys(set.componentPropertyDefinitions).find((k) => k.startsWith(prefix)); }
function variant(set, name) { const c = set.children.find((x) => x.name === name); if (!c) throw new Error('variant not found: ' + set.name + ' / ' + name); return c; }

// ---------- 1. fonts ----------
async function loadFonts() {
  for (const k in F) {
    try { await figma.loadFontAsync(F[k]); }
    catch (e) { throw new Error('Font ' + F[k].family + ' ' + F[k].style + ' is not available. It is a free Google font; in the Figma desktop app it should load automatically.'); }
  }
}

// ---------- 2. variables + text styles ----------
async function tokens() {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  let col = cols.find((c) => c.name === 'TechTok tokens');
  if (!col) col = figma.variables.createVariableCollection('TechTok tokens');
  const mode = col.modes[0].modeId;
  const existing = await figma.variables.getLocalVariablesAsync();
  const byName = {};
  for (const v of existing) if (v.variableCollectionId === col.id) byName[v.name] = v;
  const mk = (name, type, value, scopes) => {
    let v = byName[name];
    if (!v) v = figma.variables.createVariable(name, col, type);
    v.setValueForMode(mode, value);
    v.scopes = scopes;
    V[name] = v;
  };
  for (const [theme, set] of [['light', LIGHT], ['dark', DARK]]) {
    for (const role in set) {
      const c = hex(set[role]);
      const scopes = role.startsWith('text') || role === 'on-accent' ? ['TEXT_FILL', 'STROKE_COLOR'] : ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR', 'TEXT_FILL'];
      mk(theme + '/color/' + role, 'COLOR', { r: c.r, g: c.g, b: c.b, a: 1 }, scopes);
    }
  }
  for (const s in SPACE) mk('space/' + s, 'FLOAT', SPACE[s], ['GAP', 'WIDTH_HEIGHT']);
  for (const r in RADIUS) mk('radius/' + r, 'FLOAT', RADIUS[r], ['CORNER_RADIUS']);
  // text styles
  const styles = await figma.getLocalTextStylesAsync();
  for (const name in TYPE) {
    let st = styles.find((s) => s.name === name);
    if (!st) { st = figma.createTextStyle(); st.name = name; }
    const [font, size, lh, ls] = TYPE[name];
    st.fontName = font; st.fontSize = size;
    st.lineHeight = { unit: 'PIXELS', value: lh };
    st.letterSpacing = { unit: 'PIXELS', value: ls };
    if (name === 'label') st.textCase = 'UPPER';
    TS[name] = st;
  }
  log.push('tokens: ' + Object.keys(V).length + ' variables, ' + Object.keys(TS).length + ' text styles');
}

// ---------- 3. components (HW09 design system) ----------
async function buildComponents(section) {
  const C = {};
  const header = note('HW09 – Mini design system', 48, true); section.appendChild(header); header.x = 60; header.y = 40;
  const sub = note('Only components used on the project screens. Every colour, gap, padding and radius is bound to a variable (TechTok tokens, light/* group). Naming: Component/Subtype, variant properties in Title Case.', 18, false, '#5E6B64');
  section.appendChild(sub); sub.x = 60; sub.y = 110; sub.textAutoResize = 'HEIGHT'; sub.resize(1800, sub.height);
  let y = 200;
  const place = (set, title) => {
    const t = note(title, 24, true); section.appendChild(t); t.x = 60; t.y = y;
    section.appendChild(set); set.x = 60; set.y = y + 44;
    y = set.y + set.height + 80;
  };
  const layoutSet = (set, cols) => {
    set.layoutMode = 'HORIZONTAL'; set.layoutWrap = 'WRAP';
    set.itemSpacing = 24; set.counterAxisSpacing = 24;
    set.paddingLeft = set.paddingRight = set.paddingTop = set.paddingBottom = 24;
    set.primaryAxisSizingMode = 'FIXED'; set.counterAxisSizingMode = 'AUTO';
    let w = 0; const kids = set.children.slice(0, cols);
    for (const k of kids) w += k.width; w += 24 * (kids.length - 1) + 48;
    set.resize(Math.max(w, 300), set.height);
    set.fills = solid('#FFFFFF'); set.strokes = solid('#9747FF'); set.dashPattern = [6, 4]; set.cornerRadius = 8;
  };

  // Button
  const btns = [];
  for (const type of ['Primary', 'Secondary', 'Text']) {
    for (const state of ['Default', 'Pressed', 'Disabled']) {
      const b = figma.createComponent();
      b.name = 'Type=' + type + ', State=' + state;
      b.layoutMode = 'HORIZONTAL'; b.primaryAxisSizingMode = 'AUTO'; b.counterAxisSizingMode = 'AUTO';
      b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER';
      bindPad(b, 'md', 'xl'); b.minHeight = 48; bindRadius(b, 'button');
      const lbl = await text(type === 'Text' ? 'Not interested' : (type === 'Primary' ? 'Read' : 'Save'), 'button', type === 'Primary' ? 'on-accent' : (type === 'Text' ? 'accent' : 'text'), { name: 'label' });
      b.appendChild(lbl);
      if (type === 'Primary') { bindFill(b, L('accent')); }
      else if (type === 'Secondary') { b.fills = []; bindFill(b, L('text-muted'), 'strokes'); b.strokeWeight = 1; if (state === 'Pressed') bindFill(b, L('sunk')); }
      else { b.fills = []; if (state === 'Pressed') bindFill(b, L('tag')); }
      if (type === 'Primary' && state === 'Pressed') b.fills = [Object.assign({}, b.fills[0], { opacity: 0.9 })];
      if (state === 'Disabled') b.opacity = 0.4;
      btns.push(b);
    }
  }
  const btnSet = figma.combineAsVariants(btns, section);
  btnSet.name = 'Button';
  const kL = btnSet.addComponentProperty('Label', 'TEXT', 'Read');
  for (const v of btnSet.children) { const l = v.findOne((n) => n.name === 'label'); l.componentPropertyReferences = { characters: kL }; }
  btnSet.description = 'One Primary per screen, for the main action only. Min height 48. Label is a verb. Disabled = 40% opacity + not focusable.';
  layoutSet(btnSet, 3); place(btnSet, 'Button  ·  Type × State');
  C.btn = btnSet; C.btnLabel = kL;
  const btn = (type, label, state) => { const i = variant(btnSet, 'Type=' + type + ', State=' + (state || 'Default')).createInstance(); i.setProperties({ [kL]: label }); return i; };
  C.mkBtn = btn;

  // Input/Number
  const ins = [];
  for (const state of ['Default', 'Focus', 'Error']) {
    const c = figma.createComponent(); c.name = 'State=' + state;
    c.layoutMode = 'VERTICAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED'; c.resize(320, 10); bindGap(c, 'xs');
    c.appendChild(await text('Cards per day', 'meta', 'text-muted', { name: 'label' }));
    const field = al('HORIZONTAL', { name: 'field', counterAxisAlignItems: 'CENTER' }); bindPad(field, 'md', 'lg'); field.minHeight = 48; bindRadius(field, 'thumb');
    bindFill(field, L('surface')); bindFill(field, L(state === 'Focus' ? 'accent' : (state === 'Error' ? 'danger' : 'text-muted')), 'strokes'); field.strokeWeight = state === 'Default' ? 1 : 2;
    put(c, field, 'FILL', null);
    field.appendChild(await text(state === 'Error' ? '70' : '30', 'body', 'text', { name: 'value' }));
    const help = await text(state === 'Error' ? '⚠ Choose a number from 5 to 50' : 'Between 5 and 50. Changes apply tomorrow.', 'meta', state === 'Error' ? 'danger' : 'text-muted', { name: 'helper' });
    wrapIn(c, help);
    ins.push(c);
  }
  const inSet = figma.combineAsVariants(ins, section); inSet.name = 'Input/Number';
  inSet.description = 'Label above, never placeholder-only. Border text-muted (≥3:1), focus 2px accent, error 2px danger + message with icon (colour is not the only signal).';
  layoutSet(inSet, 3); place(inSet, 'Input/Number  ·  State');

  // Toast
  const toasts = [];
  for (const type of ['Saved', 'Hidden']) {
    const c = figma.createComponent(); c.name = 'Type=' + type;
    c.layoutMode = 'HORIZONTAL'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(350, 10);
    c.counterAxisAlignItems = 'CENTER'; c.primaryAxisAlignItems = 'SPACE_BETWEEN'; bindPad(c, 'md', 'lg'); bindGap(c, 'md'); bindRadius(c, 'thumb'); bindFill(c, L('text'));
    const msg = await text(type === 'Saved' ? 'Saved ✓' : "Hidden this article. You'll see fewer like it.", 'body', 'bg', { name: 'message' });
    c.appendChild(msg); msg.textAutoResize = 'HEIGHT'; msg.layoutSizingHorizontal = 'FILL';
    if (type === 'Hidden') { const u = await text('Undo', 'button', 'bg', { name: 'undo', underline: true }); const ub = al('HORIZONTAL', { name: 'undo-target', minHeight: 48, minWidth: 48, counterAxisAlignItems: 'CENTER', primaryAxisAlignItems: 'CENTER' }); ub.appendChild(u); c.appendChild(ub); }
    toasts.push(c);
  }
  const toastSet = figma.combineAsVariants(toasts, section); toastSet.name = 'Toast';
  toastSet.description = 'Shows 6 s or until the next swipe. Hidden: states the scope (this article) + 48px Undo.';
  layoutSet(toastSet, 2); place(toastSet, 'Toast  ·  Type'); C.toast = toastSet;

  // TabBar
  const tabs = [];
  for (const active of ['Today', 'Saved', 'Settings']) {
    const c = figma.createComponent(); c.name = 'Active=' + active;
    c.layoutMode = 'HORIZONTAL'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(390, 10);
    c.primaryAxisAlignItems = 'SPACE_BETWEEN'; c.counterAxisAlignItems = 'CENTER'; bindPad(c, 'lg', 'xxl');
    bindFill(c, L('surface')); bindFill(c, L('line'), 'strokes'); c.strokeTopWeight = 1; c.strokeBottomWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0;
    for (const n of ['Today', 'Saved', 'Settings']) { const t = await text(n, n === active ? 'button' : 'meta', n === active ? 'accent' : 'text-muted', { name: 'tab/' + n }); c.appendChild(t); }
    tabs.push(c);
  }
  const tabSet = figma.combineAsVariants(tabs, section); tabSet.name = 'TabBar';
  tabSet.description = 'Active tab = accent + SemiBold (not colour alone). No badges or counts (anti-engagement rule).';
  layoutSet(tabSet, 1); place(tabSet, 'TabBar  ·  Active'); C.tab = tabSet;

  // Chip/Topic
  const chips = [];
  for (const sel of ['Yes', 'No']) {
    const c = figma.createComponent(); c.name = 'Selected=' + sel;
    c.layoutMode = 'HORIZONTAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'AUTO'; bindPad(c, 'sm', 'lg'); bindRadius(c, 'pill'); c.minHeight = 40; c.counterAxisAlignItems = 'CENTER';
    if (sel === 'Yes') bindFill(c, L('accent')); else { c.fills = []; bindFill(c, L('text-muted'), 'strokes'); c.strokeWeight = 1; }
    const t = await text(sel === 'Yes' ? '✓ Science' : 'Science', 'button', sel === 'Yes' ? 'on-accent' : 'text', { name: 'label' }); c.appendChild(t);
    chips.push(c);
  }
  const chipSet = figma.combineAsVariants(chips, section); chipSet.name = 'Chip/Topic';
  const kC = chipSet.addComponentProperty('Label', 'TEXT', 'Science');
  for (const v of chipSet.children) v.findOne((n) => n.name === 'label').componentPropertyReferences = { characters: kC };
  chipSet.description = 'Selected state = fill + check mark (not colour alone). Used in onboarding and Settings → Topics.';
  layoutSet(chipSet, 2); place(chipSet, 'Chip/Topic  ·  Selected');

  // Card/Article
  const cards = [];
  for (const img of ['Yes', 'No']) {
    for (const state of ['Default', 'Saved']) {
      const c = figma.createComponent(); c.name = 'Image=' + img + ', State=' + state;
      c.layoutMode = 'VERTICAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED'; c.resize(350, 10);
      bindPad(c, 'lg', 'lg'); bindGap(c, 'md'); bindRadius(c, 'group'); bindFill(c, L('surface')); bindFill(c, L('line'), 'strokes'); c.strokeWeight = 1;
      if (img === 'Yes') { const r = figma.createRectangle(); r.name = 'cover'; r.resize(318, 170); bindFill(r, L('sunk')); bindRadius(r, 'cover'); c.appendChild(r); r.layoutSizingHorizontal = 'FILL'; }
      c.appendChild(await text('Example Blog · 6 min read', 'meta', 'text-muted', { name: 'meta' }));
      wrapIn(c, await text('Why small teams ship faster than big ones', 'title/card', 'text', { name: 'title' }));
      const pill = al('HORIZONTAL', { name: 'ai-label' }); bindPad(pill, 'xs', 'sm'); bindRadius(pill, 'pill'); bindFill(pill, L('tag'));
      pill.appendChild(await text('AI summary', 'label', 'text-muted', { name: 'ai-label-text' })); c.appendChild(pill);
      wrapIn(c, await text('A short three-sentence summary of the article. It says what the piece argues and who it is for. Generated once per article and labelled as AI.', 'body', 'text', { name: 'summary' }));
      const acts = al('VERTICAL', { name: 'actions' }); bindGap(acts, 'sm'); put(c, acts, 'FILL', null);
      put(acts, btn('Primary', 'Read'), 'FILL', null);
      const row = al('HORIZONTAL', { name: 'secondary', counterAxisAlignItems: 'CENTER' }); bindGap(row, 'sm'); put(acts, row, 'FILL', null);
      put(row, btn('Secondary', state === 'Saved' ? 'Saved ✓' : 'Save'), 'FILL', null);
      row.appendChild(btn('Text', 'Not interested'));
      cards.push(c);
    }
  }
  const cardSet = figma.combineAsVariants(cards, section); cardSet.name = 'Card/Article';
  cardSet.description = 'Reading order: meta → title → AI summary label → summary → Read → Save → Not interested. Whole card body opens the reader (iteration 1).';
  layoutSet(cardSet, 4); place(cardSet, 'Card/Article  ·  Image × State'); C.card = cardSet;

  fitSection(section);
  log.push('components: Button(9) Input(3) Toast(2) TabBar(3) Chip(2) Card(4)');
  return C;
}

// ---------- 4. HW08 UI guideline ----------
function lum(h) { const c = hex(h); const f = (x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); }
function ratio(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

async function buildGuideline(section, C) {
  const h = note('HW08 – Mini UI guideline', 48, true); section.appendChild(h); h.x = 60; h.y = 40;
  const sub = note('Based on the "Reading Room" direction. Colour variables are named by role; the Starter plan allows one variable mode, so light and dark are two groups (light/*, dark/*). Contrast values are calculated (WCAG 2.x).', 18, false, '#5E6B64');
  section.appendChild(sub); sub.x = 60; sub.y = 110; sub.textAutoResize = 'HEIGHT'; sub.resize(1800, sub.height);
  let y = 200;
  const block = (title, frame) => { const t = note(title, 28, true); section.appendChild(t); t.x = 60; t.y = y; section.appendChild(frame); frame.x = 60; frame.y = y + 48; y = frame.y + frame.height + 80; };

  // Colors (light + dark)
  for (const theme of ['light', 'dark']) {
    const set = theme === 'light' ? LIGHT : DARK;
    const fr = al('HORIZONTAL', { name: 'Colors – ' + theme, layoutWrap: 'WRAP', itemSpacing: 24, counterAxisSpacing: 24, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 });
    fr.primaryAxisSizingMode = 'FIXED'; fr.resize(1800, 10); fr.counterAxisSizingMode = 'AUTO'; fr.cornerRadius = 12;
    fr.fills = solid(theme === 'light' ? '#FFFFFF' : DARK.bg);
    for (const role in set) {
      const sw = al('VERTICAL', { name: theme + '/color/' + role, itemSpacing: 6 });
      const r = figma.createRectangle(); r.resize(140, 80); r.cornerRadius = 8; bindFill(r, theme + '/color/' + role); r.strokes = solid('#9E9E9E'); r.strokeWeight = 1; sw.appendChild(r);
      sw.appendChild(note('color/' + role, 13, true, theme === 'light' ? '#1B2420' : '#E6ECE8'));
      sw.appendChild(note(set[role], 12, false, theme === 'light' ? '#5E6B64' : '#93A39A'));
      fr.appendChild(sw);
    }
    block('Colour variables – ' + theme, fr);
  }

  // Contrast
  const pairs = [['text', 'surface'], ['text', 'bg'], ['text-muted', 'surface'], ['text-muted', 'bg'], ['accent', 'surface'], ['on-accent', 'accent'], ['danger', 'surface'], ['text-muted', 'tag'], ['line', 'surface']];
  const ct = al('VERTICAL', { name: 'Contrast check', itemSpacing: 8, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }); ct.fills = solid('#FFFFFF'); ct.cornerRadius = 12;
  for (const [fg, bg] of pairs) {
    const row = al('HORIZONTAL', { name: fg + ' on ' + bg, itemSpacing: 24, counterAxisAlignItems: 'CENTER' });
    for (const theme of ['light', 'dark']) {
      const set = theme === 'light' ? LIGHT : DARK;
      const s = al('HORIZONTAL', { paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, itemSpacing: 12, counterAxisAlignItems: 'CENTER' }); s.cornerRadius = 8; bindFill(s, theme + '/color/' + bg);
      const aa = note('Aa sample', 16, true); bindFill(aa, theme + '/color/' + fg); s.appendChild(aa);
      const r = ratio(set[fg], set[bg]);
      const isDecor = fg === 'line';
      const ok = isDecor ? '✗ decorative only' : (r >= 4.5 ? '✓ AA' : '✗');
      const rn = note(r.toFixed(2) + ':1  ' + ok, 14, true, theme === 'light' ? '#1B2420' : '#E6ECE8'); s.appendChild(rn);
      row.appendChild(s);
    }
    row.appendChild(note(fg + ' on ' + bg + (fg === 'line' ? ': dividers only; input borders use text-muted (≥3:1, WCAG 1.4.11)' : ''), 15, false));
    ct.appendChild(row);
  }
  block('Contrast check (light | dark)', ct);

  // Type
  const ty = al('VERTICAL', { name: 'Text styles', itemSpacing: 16, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }); ty.fills = solid('#FFFFFF'); ty.cornerRadius = 12;
  for (const name in TYPE) { const [font, size, lh] = TYPE[name]; ty.appendChild(await text(name + ' – ' + font.family + ' ' + font.style + ' ' + size + '/' + lh, name, 'text')); }
  block('Text styles', ty);

  // Spacing
  const spf = al('HORIZONTAL', { name: 'Spacing', itemSpacing: 32, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24, counterAxisAlignItems: 'MAX' }); spf.fills = solid('#FFFFFF'); spf.cornerRadius = 12;
  for (const s in SPACE) { const col = al('VERTICAL', { itemSpacing: 6, counterAxisAlignItems: 'CENTER' }); const r = figma.createRectangle(); r.resize(SPACE[s], SPACE[s]); bindFill(r, L('accent')); col.appendChild(r); col.appendChild(note('space/' + s + ' = ' + SPACE[s], 13)); spf.appendChild(col); }
  spf.appendChild(note('Screen side padding 20 · gap inside a card 12 · between groups 24', 15, false, '#5E6B64'));
  block('Spacing', spf);

  // Rules
  const rules = al('HORIZONTAL', { name: 'Rules', itemSpacing: 32, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }); rules.fills = solid('#FFFFFF'); rules.cornerRadius = 12;
  const ruleCol = async (title, lines, doNode, dontNode) => {
    const c = al('VERTICAL', { name: title, itemSpacing: 12 }); c.counterAxisSizingMode = 'FIXED'; c.resize(540, 10);
    c.appendChild(note(title, 22, true));
    for (const l of lines) { const t = note('• ' + l, 15); c.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; }
    const d = al('VERTICAL', { itemSpacing: 8, paddingTop: 12 }); d.appendChild(note('✓ Do', 15, true, '#1F804D')); d.appendChild(doNode); c.appendChild(d);
    const n = al('VERTICAL', { itemSpacing: 8, paddingTop: 12 }); n.appendChild(note('✗ Don\'t', 15, true, '#BF2E2E')); n.appendChild(dontNode); c.appendChild(n);
    rules.appendChild(c);
  };
  const doBtns = al('HORIZONTAL', { itemSpacing: 8 }); doBtns.appendChild(C.mkBtn('Primary', 'Read')); doBtns.appendChild(C.mkBtn('Secondary', 'Save'));
  const dontBtns = al('HORIZONTAL', { itemSpacing: 8 }); dontBtns.appendChild(C.mkBtn('Primary', 'Read')); dontBtns.appendChild(C.mkBtn('Primary', 'Save'));
  await ruleCol('Buttons', ['One Primary (filled accent) per screen, for the main action only.', 'Secondary = outlined text-muted. Text button for quiet actions.', 'Min height 48 px. Label is a verb.', 'Disabled = 40% opacity + not focusable; label stays.'], doBtns, dontBtns);
  const doIn = note('Label above the field: "Cards per day"\nError: 2px danger border + "⚠ Choose a number from 5 to 50"', 14);
  const dontIn = note('Placeholder-only label that disappears while typing\nError shown by red border only (colour as the only signal)', 14);
  await ruleCol('Inputs', ['Label above, never placeholder-only.', 'Border text-muted 1px (≥3:1), focus 2px accent, error 2px danger.', 'Error message below with an icon, says how to fix it.'], doIn, dontIn);
  const doIc = note('[↗] Open on Example Blog  — icon next to text naming the destination\nIcon-only button with accessible name "Save article", 48px target', 14);
  const dontIc = note('Lone ↗ icon with no text\n24px icon with a 24px tap target', 14);
  await ruleCol('Icons', ['24 px icon inside a 48 px tap target.', 'Icon-only buttons need an accessible name.', 'External-link ↗ always sits next to text naming the destination.'], doIc, dontIc);
  block('Usage rules', rules);
  fitSection(section);
  log.push('guideline built');
}

// ---------- 5. HW09 handoff ----------
async function buildHandoff(section, C) {
  const h = note('HW09 – Handoff: Today card', 48, true); section.appendChild(h); h.x = 60; h.y = 40;
  const ready = al('HORIZONTAL', { paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }); ready.fills = solid('#CDF4D3'); ready.cornerRadius = 999; ready.appendChild(note('✅ Ready for dev', 20, true, '#1F804D')); section.appendChild(ready); ready.x = 780; ready.y = 52;
  const kL = C.btnLabel;
  async function screen(name, opts) {
    const f = figma.createFrame(); f.name = name; f.resize(390, 844); f.layoutMode = 'VERTICAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED'; bindFill(f, L('bg')); f.clipsContent = true;
    const c = al('VERTICAL', { name: 'content' }); bindGap(c, 'md'); c.paddingLeft = c.paddingRight = 20; c.paddingTop = 16; c.paddingBottom = 12; put(f, c, 'FILL', 'FILL');
    const st = al('HORIZONTAL', { name: 'status', primaryAxisAlignItems: 'SPACE_BETWEEN', counterAxisAlignItems: 'CENTER' }); put(c, st, 'FILL', null);
    st.appendChild(await text("Today's reads", 'button', 'text')); st.appendChild(await text(opts.progress || '13 of 30 seen today', 'meta', 'text-muted', { name: 'progress' }));
    if (opts.hint) wrapIn(c, await text('Up to 30 cards a day. No need to see them all.', 'meta', 'text-muted', { name: 'first-card hint' }));
    if (opts.body) await opts.body(c);
    else {
      const card = variant(C.card, 'Image=' + (opts.noImage ? 'No' : 'Yes') + ', State=' + (opts.saved ? 'Saved' : 'Default')).createInstance(); card.name = 'Card/Article'; put(c, card, 'FILL', null);
      const nx = C.mkBtn('Text', 'Next ↓'); nx.name = 'next'; put(c, nx, 'FILL', null);
    }
    const tb = variant(C.tab, 'Active=Today').createInstance(); put(f, tb, 'FILL', null);
    if (opts.toast) { const t = variant(C.toast, 'Type=' + opts.toast).createInstance(); f.appendChild(t); t.layoutPositioning = 'ABSOLUTE'; t.x = 20; t.y = 844 - 60 - t.height - 16; }
    return f;
  }
  const frames = [];
  frames.push(await screen('Handoff / Today card – default', {}));
  frames.push(await screen('State / first card (hint)', { hint: true, progress: '1 of 30 seen today' }));
  frames.push(await screen('State / no image', { noImage: true }));
  frames.push(await screen('State / saved', { saved: true, toast: 'Saved' }));
  frames.push(await screen('State / hidden + undo', { toast: 'Hidden', progress: '14 of 30 seen today' }));
  frames.push(await screen('State / loading', { body: async (c) => { for (const hgt of [170, 18, 60, 18, 18, 48]) { const r = figma.createRectangle(); r.resize(350, hgt); bindFill(r, L('sunk')); r.cornerRadius = 8; c.appendChild(r); r.layoutSizingHorizontal = 'FILL'; } c.appendChild(await text('Loading today\'s reads…', 'meta', 'text-muted')); } }));
  frames.push(await screen('State / offline', { progress: '', body: async (c) => { const b = al('VERTICAL', { name: 'offline', counterAxisAlignItems: 'CENTER', primaryAxisAlignItems: 'CENTER' }); bindGap(b, 'md'); bindPad(b, 'xl', 'xl'); bindRadius(b, 'group'); bindFill(b, L('surface')); put(c, b, 'FILL', 'FILL'); b.appendChild(await text('No connection', 'title/card', 'text')); b.appendChild(await text('Your saved articles still work.', 'body', 'text-muted')); b.appendChild(C.mkBtn('Primary', 'Open Saved')); b.appendChild(C.mkBtn('Text', 'Try again')); } }));
  frames.push(await screen('State / done for today', { progress: '30 of 30 seen today', body: async (c) => { const b = al('VERTICAL', { name: 'done', counterAxisAlignItems: 'CENTER', primaryAxisAlignItems: 'CENTER' }); bindGap(b, 'xl'); put(c, b, 'FILL', 'FILL'); const t = await text("That's 30 good reads for today.", 'title/screen', 'text'); t.textAlignHorizontal = 'CENTER'; wrapIn(b, t); const s = await text('New articles tomorrow at 6:00.', 'body', 'text-muted'); s.textAlignHorizontal = 'CENTER'; wrapIn(b, s); b.appendChild(C.mkBtn('Secondary', 'Go to Saved (3)')); b.appendChild(C.mkBtn('Text', 'Close')); } }));
  frames.forEach((f, i) => { section.appendChild(f); f.x = 60 + (i === 0 ? 0 : 1100 + (i - 1) * 450); f.y = 160; const l = note(f.name, 16, true); section.appendChild(l); l.x = f.x; l.y = 130; });
  // reading order pins on the default screen
  const d = frames[0];
  const order = [[340, 18, 1], [20, 290, 2], [20, 380, 3], [20, 330, 4], [20, 510, 5], [20, 600, 6], [20, 660, 7], [300, 660, 8], [20, 725, 9]];
  for (const [x, y, n] of order) { const p = al('HORIZONTAL', { name: 'order ' + n, primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER' }); p.primaryAxisSizingMode = 'FIXED'; p.counterAxisSizingMode = 'FIXED'; p.resize(26, 26); p.cornerRadius = 13; p.fills = solid('#3D7BFF'); p.appendChild(note(String(n), 13, true, '#FFFFFF')); d.appendChild(p); p.layoutPositioning = 'ABSOLUTE'; p.x = x; p.y = y; }
  // annotation panel
  const an = al('VERTICAL', { name: 'Annotations', itemSpacing: 12, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }); an.counterAxisSizingMode = 'FIXED'; an.resize(560, 10); an.fills = solid('#FFF8D6'); an.cornerRadius = 12;
  const add = (s, b) => { const t = note(s, b ? 18 : 14, b); an.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; };
  add('Behavior', true);
  add('B1 Swipe up or "Next ↓" → next card. Card body tap → Reader (iteration 1).');
  add('B2 Save toggles Saved ✓ and shows Toast/Saved. Saved works offline.');
  add('B3 Not interested hides the card → Toast/Hidden for 6 s or until the next swipe; Undo restores it (iteration 3).');
  add('B4 A card counts as "seen" after ≥1 s on screen. At 30 seen → Done for today (no "load more").');
  add('Accessibility', true);
  add('A1 Reading order (blue pins): progress → hint → cover (decorative, hidden) → meta → title → AI summary label + summary → Read → Save → Not interested → Next.');
  add('A2 Accessible names: "Save article", "Next article", "Hide this article". Every swipe has a button alternative (WCAG 2.5.1).');
  add('A3 Targets ≥ 48 px (2.5.8). Toast is announced politely; Undo reachable within 6 s (2.2.1).');
  add('A4 "AI summary" label is read before the summary. Dynamic type: card scrolls internally, never truncates (1.4.4).');
  add('A5 All text ≥ 4.5:1 (see HW08 contrast check); selected states never rely on colour alone.');
  add('Variables used', true);
  add('Screen bg → light/color/bg · card → light/color/surface + light/color/line (border) · title → title/card + light/color/text · meta, progress, hint → meta + light/color/text-muted · AI label → label + light/color/tag · Read → Button Primary (light/color/accent, light/color/on-accent) · padding → space/lg, gaps → space/md, space/sm · radius → radius/group, radius/button');
  section.appendChild(an); an.x = 480; an.y = 160;
  fitSection(section);
  log.push('handoff built: ' + frames.length + ' frames');
}

// ---------- 6. HW03 audit frames ----------
async function buildAudit(section) {
  const h = note('HW03 – Usability & accessibility audit: Inshorts, task "find one story worth reading and open it"', 40, true); section.appendChild(h); h.x = 60; h.y = 40;
  const warn = note('TO DO (Olt): replace each grey box with your own screenshot (drag the image onto the box). Keep only findings you actually saw; delete the rest. A2 must be checked by hand with TalkBack / VoiceOver.', 20, false, '#BF2E2E');
  section.appendChild(warn); warn.x = 60; warn.y = 110; warn.textAutoResize = 'HEIGHT'; warn.resize(2400, warn.height);
  const F = [
    ['U1', 'Read-more link', '"Read more" is a small text link at the bottom edge; unclear whether it leaves the app.', 'Nielsen #6 · Fitts\'s law', 'Can\'t tell if opening costs the break → stays on summaries.', 'Clear button with destination + time: "Read on [source] · 6 min".'],
    ['U2', 'No reading time', 'No reading time for the full article.', 'Nielsen #1 Visibility of system status', 'Can\'t judge if it fits the gap (HW02 P2 #8).', 'Show estimated reading time on every card.'],
    ['U3', 'Endless feed', 'More cards keep coming; no progress, no end.', 'Nielsen #3 User control · humane design', 'Break has no natural end (HW01 problem).', 'Finite set, visible progress, end state.'],
    ['U4', 'Ads look like news', 'Ad cards share the news layout; only a small "Sponsored" label.', 'Nielsen #4 Consistency · deceptive: disguised ad', 'Wastes swipes, lowers trust in every card.', 'Distinct ad style + clear label, or no ads in the reading flow.'],
    ['U5', 'Swipe only', 'Only a one-time hint; no visible "next" affordance or tap alternative.', 'Nielsen #6 · WCAG 2.5.1 Pointer Gestures', 'One-handed / first-time users may not discover it.', 'Peek of next card + tap/button alternative.'],
    ['A1', 'Grey meta text', 'Light grey small text on white. Measure the hex values from your screenshot.', 'WCAG 1.4.3 Contrast (min 4.5:1)', 'Source credibility is hard to read outdoors.', 'Meta text ≥ 4.5:1.'],
    ['A2', 'Screen reader (manual)', 'Can you reach the next card and open a story with TalkBack/VoiceOver only? Are icon buttons named?', 'WCAG 2.1.1 · 4.1.2 Name, Role, Value', 'Screen-reader users can\'t finish the task.', 'Name every icon button; accessible "next story" action.'],
    ['A3', 'Largest font size', 'Does the summary truncate or overlap at the largest system font size?', 'WCAG 1.4.4 Resize Text', 'Low-vision users lose the summary.', 'Reflowing text that scrolls inside the card.'],
  ];
  F.forEach((f, i) => {
    const x = 60 + (i % 4) * 860, y = 200 + Math.floor(i / 4) * 1100;
    const shot = figma.createFrame(); shot.name = f[0] + ' – ' + f[1] + ' (screenshot)'; shot.resize(390, 844); shot.fills = solid('#E0E0E0'); shot.cornerRadius = 24;
    const ph = note('Paste screenshot here\n' + f[0], 22, true, '#757575'); shot.appendChild(ph); ph.x = 80; ph.y = 390;
    const pin = figma.createEllipse(); pin.resize(40, 40); pin.fills = solid(f[0].startsWith('A') ? '#3D7BFF' : '#E5383B'); pin.name = 'pin'; shot.appendChild(pin); pin.x = 20; pin.y = 20;
    section.appendChild(shot); shot.x = x; shot.y = y;
    const card = al('VERTICAL', { name: f[0] + ' – annotation', itemSpacing: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }); card.counterAxisSizingMode = 'FIXED'; card.resize(400, 10); card.fills = solid('#FFF8D6'); card.cornerRadius = 12;
    const rows = [[f[0] + ' ' + f[1], true], ['Problem: ' + f[2]], ['Principle: ' + f[3]], ['Consequence for Dóra: ' + f[4]], ['Fix direction: ' + f[5]]];
    if (f[0] === 'A2') rows.push(['☐ checked manually (tick when done)', true]);
    for (const [s, b] of rows) { const t = note(s, b ? 18 : 14, !!b); card.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; }
    section.appendChild(card); card.x = x + 410; card.y = y;
  });
  const y0 = 200 + 2 * 1100;
  const box = (name, lines, x) => { const b = al('VERTICAL', { name, itemSpacing: 10, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }); b.counterAxisSizingMode = 'FIXED'; b.resize(1200, 10); b.fills = solid('#FFFFFF'); b.strokes = solid('#B3B3B3'); b.cornerRadius = 12; for (const [s, bold] of lines) { const t = note(s, bold ? 22 : 15, !!bold); b.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; } section.appendChild(b); b.x = x; b.y = y0; };
  box('Deceptive patterns', [['Deceptive patterns (confirm) → fair alternative', true], ['DISGUISED ADS: sponsored cards styled like news → distinct style and label, or a separate ad slot outside the swipe flow.'], ['INFINITE SCROLL, no stopping cue → finite set, progress, end screen.'], ['NOTIFICATION NAGGING: permission prompt on first run, breaking-news pushes → ask after value is shown, explain what is sent, easy "fewer notifications".']], 60);
  box('States', [['States of the task (fill in ✔ / ✗ / weak)', true], ['Normal ✔ card feed'], ['Loading ? skeleton or spinner when slow?'], ['Empty ? probably never (endless feed = the problem)'], ['Error ? airplane mode: message + retry, or blank card?'], ['Success weak: jumps to a web view, no confirmation of where you are'], ['Disabled ? greyed controls, e.g. bookmark when logged out?']], 1320);
  fitSection(section);
  log.push('audit frames built');
}

// ---------- 7. HW10 slides ----------
async function buildSlides(section) {
  const h = note('HW10 – Presentation (one claim per slide · present with ▶ and arrow keys)', 40, true); section.appendChild(h); h.x = 60; h.y = 40;
  const S = [
    ['A few good reads, then you\'re done for today', 'TechTok (working title) · UX/UI Design · University of Pécs'],
    ['A 5-minute break turns into 30', 'I noticed it in myself: I unlock the phone in a short break and lose it to a feed.'],
    ['The problem is the situation, not a missing app', 'Students with short breaks reach for an endless feed by habit. Longer reading feels risky: is it worth it, will it fit?\nResult: the break stretches and nothing is remembered.'],
    ['Evidence: 4 interviews, 7 tests, all AI-simulated', 'Instructor-approved simulated participants. Plausible, not observed. Every claim is marked [SIM].'],
    ['People decide from a preview and the time it takes', '"Headlines are clickbait half the time. I need to know if it\'s worth it." (P4) [SIM]\n→ Every card shows summary, source and reading time.'],
    ['Limits you can dismiss get dismissed', '"The limit pops up and I just press 15 more minutes." (P3) [SIM]\n→ The end is part of the content: a finite set and a calm end screen.'],
    ['Dóra: the thumb decides before they do', 'Journey: break starts → unlock → scroll → "already?" → nothing remembered.'],
    ['Chosen: a finite daily set of summary cards', 'Picked from 10 ideas on impact × feasibility. Rejected: a break timer (just another limit to dismiss).'],
    ['"12 of 30" read as a quota, "18 left" as running out of lives', 'Tests: 0/3 understood progress without pressure. [SIM]'],
    ['"12 of 30 seen today · no need to see them all" passed', 'Retest: 1/1. "More like a page count in a magazine." Limit: one simulated participant.'],
    ['Main task: 3/3 unaided in under 3 min · end screen: 3/3 understood', 'Target was 4 of 5. The sample is 3 simulated users.'],
    ['Demo: one break, one article, done', '▶ Open the v3 prototype (link below) · backup: recorded video'],
    ['Untested: will they open it instead of TikTok?', 'Next: a 5-day diary study with 5 real students.'],
    ['What I learned', 'Strongest evidence: the progress-label iteration.\nWeakest: everything rests on simulated people.\nI\'d test with real students before building anything.'],
  ];
  const slides = [];
  for (let i = 0; i < S.length; i++) {
    const f = figma.createFrame(); f.name = String(i + 1).padStart(2, '0') + ' ' + S[i][0].slice(0, 40);
    f.resize(1920, 1080); f.layoutMode = 'VERTICAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
    f.paddingLeft = f.paddingRight = 140; f.paddingTop = 140; f.paddingBottom = 100; f.itemSpacing = 40; bindFill(f, L('bg'));
    const t = figma.createText(); t.fontName = F.serifSemi; t.characters = S[i][0]; t.fontSize = 72; t.lineHeight = { unit: 'PIXELS', value: 86 }; bindFill(t, L('text')); f.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL';
    const b = figma.createText(); b.fontName = F.sans; b.characters = S[i][1]; b.fontSize = 36; b.lineHeight = { unit: 'PIXELS', value: 52 }; bindFill(b, L('text-muted')); f.appendChild(b); b.textAutoResize = 'HEIGHT'; b.layoutSizingHorizontal = 'FILL';
    if (i === 11) { const l = figma.createText(); l.fontName = F.sansSemi; l.characters = 'Open prototype v3 ↗'; l.fontSize = 40; bindFill(l, L('accent')); l.hyperlink = { type: 'URL', value: PROTO_V3 }; l.textDecoration = 'UNDERLINE'; f.appendChild(l); }
    const foot = figma.createText(); foot.fontName = F.sans; foot.characters = String(i + 1) + ' / ' + S.length; foot.fontSize = 22; bindFill(foot, L('text-muted')); f.appendChild(foot); foot.layoutPositioning = 'ABSOLUTE'; foot.x = 1760; foot.y = 1020;
    section.appendChild(f); f.x = 60 + (i % 4) * 2020; f.y = 140 + Math.floor(i / 4) * 1180;
    slides.push(f);
  }
  // before / after visuals on slides 9 and 10 (clones of the prototype cards)
  try {
    const v1 = await figma.getNodeByIdAsync(V1_CARD_ID), v3 = await figma.getNodeByIdAsync(V3_CARD_ID);
    for (const [src, idx] of [[v1, 8], [v3, 9]]) {
      if (!src) continue;
      const cl = src.clone(); cl.reactions && (await cl.setReactionsAsync([]));
      slides[idx].appendChild(cl); cl.layoutPositioning = 'ABSOLUTE'; cl.rescale(0.6); cl.x = 1920 - 140 - cl.width; cl.y = 1080 - 80 - cl.height;
    }
  } catch (e) { log.push('slide visuals skipped: ' + e.message); }
  // click-through flow
  for (let i = 0; i < slides.length - 1; i++) {
    await slides[i].setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: slides[i + 1].id, navigation: 'NAVIGATE', transition: null, preserveScrollPosition: false }] }]);
  }
  fitSection(section);
  log.push('slides built: ' + slides.length);
  return slides[0];
}

// ---------- main ----------
async function main() {
  const pages = figma.root.children;
  if (pages.length < 3) throw new Error('Expected 3 pages in this file. Run the plugin in "UX-UI 2026 – TechTok – Design".');
  await loadFonts();
  await tokens();

  const p2 = pages[1];
  await figma.setCurrentPageAsync(p2);
  removeOwnSections(p2, ['HW09 – Design system', 'HW08 – UI guideline', 'HW09 – Handoff']);
  const ds = sectionOn(p2, 'HW09 – Design system', 0, 0);
  const C = await buildComponents(ds);
  const gl = sectionOn(p2, 'HW08 – UI guideline', ds.x + ds.width + 200, 0);
  try { await buildGuideline(gl, C); } catch (e) { log.push('guideline error: ' + e.message); }
  const ho = sectionOn(p2, 'HW09 – Handoff', 0, Math.max(ds.height, gl.height) + 200);
  try { await buildHandoff(ho, C); } catch (e) { log.push('handoff error: ' + e.message); }

  const p3 = pages[2];
  await figma.setCurrentPageAsync(p3);
  removeOwnSections(p3, ['HW03 – Audit', 'HW10 – Slides']);
  const au = sectionOn(p3, 'HW03 – Audit', 0, 0);
  try { await buildAudit(au); } catch (e) { log.push('audit error: ' + e.message); }
  const sl = sectionOn(p3, 'HW10 – Slides', 0, au.height + 300);
  try {
    const first = await buildSlides(sl);
    p3.flowStartingPoints = [{ nodeId: first.id, name: 'HW10 presentation' }];
  } catch (e) { log.push('slides error: ' + e.message); }

  log.push('IDs → design system ' + ds.id + ', guideline ' + gl.id + ', handoff ' + ho.id + ', audit ' + au.id + ', slides ' + sl.id);
}

main()
  .then(() => { console.log(log.join('\n')); const errs = log.filter((l) => l.includes('error')).length; figma.closePlugin(errs ? 'Done with ' + errs + ' error(s). See console (Plugins → Development → Show/Hide console).' : 'Done. HW08, HW09, HW03 frames and HW10 slides built.'); })
  .catch((e) => { console.error(e); console.log(log.join('\n')); figma.closePlugin('Failed: ' + e.message + ' (see console)'); });
