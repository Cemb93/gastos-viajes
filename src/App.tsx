import { useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import MoneyInput from './components/MoneyInput';
import { expenseFields, type ExpenseKey, type TripFormData } from './types';
import { formatCOP } from './utils/currency';

const emptyExpenses = Object.fromEntries(expenseFields.map(({ key }) => [key, 0])) as Record<ExpenseKey, number>;
const today = new Date();
const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

export default function App() {
  const [data, setData] = useState<TripFormData>({
    date: localDate, transportCompany: '', origin: '', destination: '', realAdvance: 0, notes: '', expenses: { ...emptyExpenses },
  });
  const documentRef = useRef<HTMLElement>(null);
  const totalExpenses = useMemo(() => Object.values(data.expenses).reduce((sum, value) => sum + value, 0), [data.expenses]);

  const update = <K extends keyof TripFormData,>(field: K, value: TripFormData[K]) => setData(previous => ({ ...previous, [field]: value }));
  const updateExpense = (key: ExpenseKey, value: number) => setData(previous => ({ ...previous, expenses: { ...previous.expenses, [key]: value } }));

  const downloadImage = async () => {
    if (!documentRef.current) return;
    const canvas = await html2canvas(documentRef.current, { scale: 2, backgroundColor: '#fffdf8' });
    const link = document.createElement('a');
    link.download = 'presupuesto-de-viaje.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadPDF = async () => {
    if (!documentRef.current) return;
    const canvas = await html2canvas(documentRef.current, { scale: 2, backgroundColor: '#fffdf8' });
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const image = canvas.toDataURL('image/png');
    const pageWidth = 190;
    const pageHeight = canvas.height * pageWidth / canvas.width;
    pdf.addImage(image, 'PNG', 10, 10, pageWidth, Math.min(pageHeight, 277));
    pdf.save('presupuesto-de-viaje.pdf');
  };

  const leftKeys: ExpenseKey[] = ['conductor', 'cargue', 'descargue', 'comision', 'peaje', 'otros'];
  const rightKeys: ExpenseKey[] = ['acpm/gas', 'montada', 'calibracion', 'aceite', 'engrasada', 'parqueadero', 'lavado', 'aseo', 'hotel'];
  const labels = Object.fromEntries(expenseFields.map(item => [item.key, item.label])) as Record<ExpenseKey, string>;

  return (
    <main className="app-shell">
      <section className="editor-panel" aria-label="Formulario de presupuesto de viaje">
        <div className="editor-heading"><span>✎</span><div><h1>Presupuesto de viaje</h1><p>Completa los datos y registra los gastos del recorrido.</p></div></div>
        <div className="editor-fields">
          <label className="field"><span>Fecha</span><input type="date" value={data.date} onChange={e => update('date', e.target.value)} /></label>
          <label className="field"><span>Empresa de transporte</span><input value={data.transportCompany} onChange={e => update('transportCompany', e.target.value)} placeholder="Nombre de la empresa" /></label>
          <label className="field"><span>Origen</span><input value={data.origin} onChange={e => update('origin', e.target.value)} placeholder="Ciudad de origen" /></label>
          <label className="field"><span>Destino</span><input value={data.destination} onChange={e => update('destination', e.target.value)} placeholder="Ciudad de destino" /></label>
          <div className="field advance-field"><MoneyInput id="realAdvance" label="Anticipo real" value={data.realAdvance} onChange={value => update('realAdvance', value)} /></div>
        </div>
        <div className="editor-section-title">Gastos del viaje</div>
        <div className="editor-expenses">
          {[leftKeys, rightKeys].map((keys, columnIndex) => <div className="expense-column" key={columnIndex}>
            {keys.map(key => <MoneyInput key={key} id={`expense-${key}`} label={labels[key]} value={data.expenses[key]} onChange={value => updateExpense(key, value)} />)}
          </div>)}
        </div>
        <label className="field notes-field"><span>Notas extras</span><textarea rows={3} value={data.notes} onChange={e => update('notes', e.target.value)} placeholder="Observaciones del viaje..." /></label>
        <div className="editor-total"><span>Total de gastos</span><strong>{formatCOP(totalExpenses)}</strong></div>
        <div className="actions"><button type="button" onClick={downloadPDF}>Descargar PDF</button><button type="button" className="secondary" onClick={downloadImage}>Descargar imagen</button></div>
      </section>

      <section className="preview-wrap">
        <div className="preview-caption">Vista previa del documento</div>
        <article className="paper" ref={documentRef}>
          <header className="paper-header"><div className="paper-title">PRESUPUESTO DE VIAJE</div><div className="paper-date"><span>Fecha:</span><strong>{data.date ? new Date(`${data.date}T12:00:00`).toLocaleDateString('es-CO') : '________________'}</strong><span className="calendar-icon">▣</span></div><div className="company-ribbon">EMPRESA DE TRANSPORTE</div><div className="company-value">{data.transportCompany || ' '}</div><div className="truck-icon" aria-hidden="true">🚚</div></header>
          <section className="paper-route"><div><span>LUGAR DE SALIDA:</span><strong>{data.origin || '____________________'}</strong></div><div><span>DESTINO:</span><strong>{data.destination || '____________________'}</strong></div></section>
          <div className="paper-total"><span>TOTAL:</span><strong>{formatCOP(totalExpenses)}</strong></div>
          <div className="paper-section-ribbon">GASTOS</div>
          <section className="paper-expenses">
            {[leftKeys, rightKeys].map((keys, columnIndex) => <div className="paper-expense-column" key={columnIndex}>
              {keys.map(key => <div className="paper-expense-row" key={key}><span className="paper-expense-label">{labels[key]}</span><span className="paper-expense-value">{data.expenses[key] ? formatCOP(data.expenses[key]) : '________________'}</span></div>)}
            </div>)}
          </section>
          <section className="paper-advance"><span>ANTICIPO REAL</span><strong>{formatCOP(data.realAdvance)}</strong></section>
          <section className="paper-notes"><strong>Notas extras:</strong><p>{data.notes || ''}</p></section>
          <footer className="paper-footer">PRESUPUESTO DE VIAJE · Registro de gastos</footer>
        </article>
      </section>
    </main>
  );
}
