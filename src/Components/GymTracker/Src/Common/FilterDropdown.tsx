import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  fontSize?: number;
};

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  fontSize = 14
}: Props) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Close on outside click (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  return (
    <>
      <div ref={ref} className="position-relative">

        {/* BUTTON */}
        <button
          className={`btn rounded-pill px-3 py-2 d-flex align-items-center gap-2 
          ${value ? "btn-outline-primary" : "btn-light"}`}
          onClick={() => setOpen(true)} style={{ fontSize: fontSize }}
        >
          <span className="text-capitalize">
            {value ? `${label.toUpperCase()} => ${value}` : label}
          </span>
          <span style={{ fontSize: fontSize - 2 }}>▼</span>
        </button>

        {/* DESKTOP DROPDOWN */}
        {!isMobile && open && (
          <div className="dropdown-menu show p-2 shadow rounded-3 mt-2">

            <button
              className={`dropdown-item rounded ${value === "" ? "active" : ""} text-secondary`}
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              All
            </button>

            {options.map((item) => (
              <button
                key={item}
                className={`dropdown-item text-capitalize rounded ${
                  value === item ? "active" : ""
                }`}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM SHEET */}
      {isMobile && open && (
        <div className="mobile-sheet">

          {/* Overlay */}
          <div
            className="mobile-overlay"
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <div className="mobile-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <strong>{label}</strong>
              <button className="btn btn-sm btn-light" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="list-group">

              <button
                className={`list-group-item list-group-item-action ${value === "" ? "active" : ""}`}
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                All
              </button>

              {options.map((item) => (
                <button
                  key={item}
                  className={`list-group-item list-group-item-action text-capitalize ${
                    value === item ? "active" : ""
                  }`}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}

            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>
        {`
        /* Desktop dropdown fix */
        .dropdown-menu {
          min-width: 200px;
          z-index: 1000;
        }

        /* MOBILE SHEET */
        .mobile-sheet {
          position: fixed;
          inset: 0;
          z-index: 1050;
        }

        .mobile-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
        }

        .mobile-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 16px;
          max-height: 70vh;
          overflow-y: auto;

          /* animation */
          transform: translateY(100%);
          animation: slideUp 0.25s ease forwards;
        }

        @keyframes slideUp {
          to {
            transform: translateY(0);
          }
        }

        /* hover effects */
        .dropdown-item:hover {
          background: #f1f3f5;
        }
        `}
      </style>
    </>
  );
}