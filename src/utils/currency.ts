const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0,
});

export function formatCOP(value: number): string {
  return formatter.format(Number.isFinite(value) ? value : 0);
}

export function parseCOP(value: string): number {
  const digits = value.replace(/\D/g, '');
  return digits ? Number(digits) : 0;
}
