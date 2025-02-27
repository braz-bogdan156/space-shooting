// Функція для перевірки зіткнення
export function hitTestRectangle(r1, r2) {
  const r1Bounds = r1.getBounds();
  const r2Bounds = r2.getBounds();

  return (
    r1Bounds.x < r2Bounds.x + r2Bounds.width &&
    r1Bounds.x + r1Bounds.width > r2Bounds.x &&
    r1Bounds.y < r2Bounds.y + r2Bounds.height &&
    r1Bounds.y + r1Bounds.height > r2Bounds.y
  );
}
