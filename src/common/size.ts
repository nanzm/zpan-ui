const BYTE_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const BIBYTE_UNITS = [
  "B",
  "kiB",
  "MiB",
  "GiB",
  "TiB",
  "PiB",
  "EiB",
  "ZiB",
  "YiB",
];

const BIT_UNITS = [
  "b",
  "kbit",
  "Mbit",
  "Gbit",
  "Tbit",
  "Pbit",
  "Ebit",
  "Zbit",
  "Ybit",
];

const BIBIT_UNITS = [
  "b",
  "kibit",
  "Mibit",
  "Gibit",
  "Tibit",
  "Pibit",
  "Eibit",
  "Zibit",
  "Yibit",
];

interface Options {
  readonly signed?: boolean;
  readonly locale?: boolean | string;
  readonly bits?: boolean;
  readonly binary?: boolean;
}

const formatSize = (number: number, options?: Options): string => {
  if (!Number.isFinite(number)) {
    throw new TypeError(
      `Expected a finite number, got ${typeof number}: ${number}`
    );
  }

  options = Object.assign({ bits: false, binary: false }, options);
  const UNITS = options.bits
    ? options.binary
      ? BIBIT_UNITS
      : BIT_UNITS
    : options.binary
    ? BIBYTE_UNITS
    : BYTE_UNITS;

  if (options.signed && number === 0) {
    return " 0 " + UNITS[0];
  }

  const isNegative = number < 0;
  const prefix = isNegative ? "-" : options.signed ? "+" : "";

  if (isNegative) {
    number = -number;
  }

  if (number < 1) {
    const numberString = toLocaleString(number, options.locale);
    return prefix + numberString + " " + UNITS[0];
  }

  const exponent = Math.min(
    Math.floor(
      options.binary
        ? Math.log(number) / Math.log(1024)
        : Math.log10(number) / 3
    ),
    UNITS.length - 1
  );
  number = Number(
    (number / Math.pow(options.binary ? 1024 : 1000, exponent)).toPrecision(3)
  );
  const numberString = toLocaleString(number, options.locale);

  const unit = UNITS[exponent];

  return prefix + numberString + " " + unit;
};

const toLocaleString = (number, locale) => {
  let result = number;
  if (typeof locale === "string") {
    result = number.toLocaleString(locale);
  } else if (locale === true) {
    result = number.toLocaleString();
  }

  return result;
};

export default formatSize;
