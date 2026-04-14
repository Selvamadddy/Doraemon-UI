import { useMemo } from "react";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;

  maxWords?: number;        // optional
  maxChars?: number;        // optional
  rows?: number;
  required?: boolean;
  disabled?: boolean;
};

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  maxWords,
  maxChars,
  rows = 3,
  required = false,
  disabled = false,
}: Props) {

  // WORD COUNT
  const wordCount = useMemo(() => {
    return value.trim() === ""
      ? 0
      : value.trim().split(/\s+/).length;
  }, [value]);

  // CHAR COUNT
  const charCount = value.length;

  // VALIDATION
  const isWordLimitExceeded = maxWords ? wordCount > maxWords : false;
  const isCharLimitExceeded = maxChars ? charCount > maxChars : false;

  const isInvalid = isWordLimitExceeded || isCharLimitExceeded;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value;

    const words = text.trim() === "" ? [] : text.trim().split(/\s+/);

    // Allow typing only if within limits
    if (
      (!maxWords || words.length <= maxWords) &&
      (!maxChars || text.length <= maxChars)
    ) {
      onChange(text);
    }
  };

  return (
    <div className="mb-3">

      {/* LABEL */}
      {label && (
        <label className="form-label fw-semibold">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      {/* INPUT */}
      <textarea
        className={`form-control ${isInvalid ? "is-invalid" : ""}`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={{
          resize: "none",
          borderRadius: "12px"
        }}
      />

      {/* FOOTER */}
      <div className="d-flex justify-content-between mt-1">

        {/* ERROR */}
        <div>
          {isWordLimitExceeded && (
            <small className="text-danger d-block">
              Max {maxWords} words allowed
            </small>
          )}
          {isCharLimitExceeded && (
            <small className="text-danger d-block">
              Max {maxChars} characters allowed
            </small>
          )}
        </div>

        {/* COUNTERS */}
        <small className={isInvalid ? "text-danger" : "text-muted"}>
          {maxWords && `${wordCount}/${maxWords} words`}
          {maxWords && maxChars && " • "}
          {maxChars && `${charCount}/${maxChars} chars`}
        </small>

      </div>

    </div>
  );
}