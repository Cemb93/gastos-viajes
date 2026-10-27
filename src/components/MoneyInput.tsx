import { useRef, type ChangeEvent } from 'react';
import { formatCOP, parseCOP } from '../utils/currency';

interface MoneyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function MoneyInput({ id, label, value, onChange }: MoneyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const caret = input.selectionStart ?? input.value.length;
    const digitsBeforeCaret = input.value.slice(0, caret).replace(/\D/g, '').length;
    const numericValue = parseCOP(input.value);
    onChange(numericValue);

    requestAnimationFrame(() => {
      const node = inputRef.current;
      if (!node) return;
      const formatted = numericValue === 0 ? '' : formatCOP(numericValue);
      let position = 0;
      let digitsSeen = 0;
      while (position < formatted.length && digitsSeen < digitsBeforeCaret) {
        if (/\d/.test(formatted[position])) digitsSeen++;
        position++;
      }
      node.setSelectionRange(position, position);
    });
  };

  return (
    <label className="money-row" htmlFor={id}>
      <span className="expense-label">{label}</span>
      <span className="money-entry">
        <span className="currency-sign" aria-hidden="true">$</span>
        <input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value === 0 ? '' : formatCOP(value).replace(/[^\d.,-]/g, '').trim()}
          placeholder="—"
          onChange={handleChange}
          aria-label={`${label}, valor en pesos colombianos`}
        />
      </span>
    </label>
  );
}
