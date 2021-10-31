import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

type NumberFormatCustomBaseProps = NumberFormatProps & {
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element> | any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
};

export const toCurrencyValue = (
  n: number,
  showCurrencySymbol = true
): string => {
  const valueToUse = isNaN(n) ? 0 : n;
  return valueToUse.toLocaleString("pt-br", {
    style: showCurrencySymbol ? "currency" : "decimal",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const currencyFormatter = (value: any, prefix: boolean): string => {
  if (Number(value) === undefined) return "";
  const valueToUse = value === 0 ? 0 : value / 100;
  const amount = toCurrencyValue(valueToUse, prefix);
  return `${amount}`;
};

const NumberFormatCustomBase = (
  props: NumberFormatCustomBaseProps,
  prefix: boolean
): any => {
  const { inputRef, onChange, name, onBlur, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      type="tel"
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      format={(e) => currencyFormatter(e, prefix)}
      onBlur={(e) => {
        const event = { ...e, target: { ...e.target, name } };
        onBlur && onBlur(event);
      }}
      onValueChange={(values) => {
        onChange &&
          onChange({
            target: {
              value: (values.floatValue ?? 0) / 100,
              name,
            },
          });
      }}
    />
  );
};

const InputWithPrefix = (props: any): JSX.Element => {
  return NumberFormatCustomBase(props, true);
};

export default InputWithPrefix;
