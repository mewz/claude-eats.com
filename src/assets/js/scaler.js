// Claude Eats — serving-size scaler
// Each ingredient <span class="amt"> carries data-base (number) and data-unit.
// The header scaler adjusts servings; amounts rescale proportionally.

(function () {
  const root = document.querySelector('[data-recipe]');
  if (!root) return;

  const base = parseFloat(root.dataset.baseServings) || 1;
  let current = base;

  const countEl = root.querySelector('.scaler .count');
  const amounts = Array.from(root.querySelectorAll('.amt[data-base]'));

  // Format a scaled number: keep fractions human (1.5, 0.75, 12), trim noise.
  function fmt(n) {
    if (!isFinite(n)) return '';
    const rounded = Math.round(n * 100) / 100;
    if (Number.isInteger(rounded)) return String(rounded);
    // common cooking fractions
    const frac = rounded % 1;
    const whole = Math.floor(rounded);
    const map = { 0.25: '¼', 0.33: '⅓', 0.5: '½', 0.67: '⅔', 0.75: '¾' };
    const key = Object.keys(map).reduce((best, k) =>
      Math.abs(frac - parseFloat(k)) < Math.abs(frac - parseFloat(best)) ? k : best, '0.5');
    if (Math.abs(frac - parseFloat(key)) < 0.04) {
      return (whole ? whole + ' ' : '') + map[key];
    }
    return String(rounded);
  }

  function render() {
    const factor = current / base;
    countEl.textContent = current;
    amounts.forEach(el => {
      const b = parseFloat(el.dataset.base);
      const unit = el.dataset.unit || '';
      el.textContent = fmt(b * factor) + (unit ? ' ' + unit : '');
    });
  }

  root.querySelector('.scaler .minus')?.addEventListener('click', () => {
    if (current > 1) { current--; render(); }
  });
  root.querySelector('.scaler .plus')?.addEventListener('click', () => {
    current++; render();
  });

  render();
})();
