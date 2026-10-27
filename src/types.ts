export const expenseFields = [
  { key: 'conductor', label: 'Conductor' },
  { key: 'cargue', label: 'Cargue' },
  { key: 'descargue', label: 'Descargue' },
  { key: 'comision', label: 'Comisión' },
  { key: 'peaje', label: 'Peaje' },
  { key: 'otros', label: 'Otros' },
  { key: 'acpm/gas', label: 'ACPM / GAS' },
  { key: 'montada', label: 'Montada' },
  { key: 'calibracion', label: 'Calibración' },
  { key: 'aceite', label: 'Aceite' },
  { key: 'engrasada', label: 'Engrasada' },
  { key: 'parqueadero', label: 'Parqueadero' },
  { key: 'lavado', label: 'Lavado' },
  { key: 'aseo', label: 'Aseo' },
  { key: 'hotel', label: 'Hotel' },
] as const;

export type ExpenseKey = typeof expenseFields[number]['key'];
export interface TripFormData {
  date: string;
  transportCompany: string;
  origin: string;
  destination: string;
  realAdvance: number;
  notes: string;
  expenses: Record<ExpenseKey, number>;
}
