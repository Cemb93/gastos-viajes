export const expenseFields = [
  { key: 'conductor', label: 'Conductor' },
  { key: 'cargue', label: 'Cargue' },
  { key: 'descargue', label: 'Descargue' },
  { key: 'comision', label: 'Comisión' },
  { key: 'peajes', label: 'Peajes' },
  { key: 'acpm/gas', label: 'ACPM / GAS' },
  { key: 'montada', label: 'Montada' },
  { key: 'calibracion', label: 'Calibración' },
  { key: 'aceite', label: 'Aceite' },
  { key: 'engrasada', label: 'Engrasada' },
  { key: 'parqueadero', label: 'Parqueadero' },
  { key: 'lavado', label: 'Lavado' },
  { key: 'aseo', label: 'Aseo' },
  { key: 'hotel', label: 'Hotel' },
  { key: 'despinchada', label: 'Despinchada' },
  { key: 'calibración de aire', label: 'Calibración de Aire' },
  { key: 'cambio de aceite', label: 'Cambio de Aceite' },
  { key: 'mantenimiento del trailer', label: 'Mantenimiento del Trailer' },
  { key: 'mantenimiento de ruedas', label: 'Mantenimiento de Ruedas' },
  { key: 'mantenimiento de suspensión', label: 'Mantenimiento de Suspensión' },
  { key: 'mantenimiento de frenos', label: 'Mantenimiento de Frenos' },
  { key: 'revisión eléctrica', label: 'Revisión Eléctrica' },
  { key: 'otros', label: 'Otros' },
] as const;

export type ExpenseKey = typeof expenseFields[number]['key'];
export interface TripFormData {
  date: string;
  transportCompany: string;
  origin: string;
  destination: string;
  placas: string;
  No_manifiesto: string;
  realAdvance: number;
  notes: string;
  expenses: Record<ExpenseKey, number>;
}
