import { useEffect, useState } from "react";

interface Quote {
  q: string;
  a: string;
}

export default function TipCard() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch("/quotes/api/random");
      const data = await res.json();
      setQuote(data[0]);
    } catch (error) {
      console.error("Failed to fetch quote", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-primary bg-opacity-10">
      
      {loading ? (
        <p className="text-muted">Loading magical wisdom...</p>
      ) : (
        <>
          <p className="fs-5 fst-italic mb-4">
            "{quote?.q}"
          </p>
        </>
      )}

      <div className="d-flex align-items-center">
        <div
          className="bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-2"
          style={{ width: "40px", height: "40px" }}
        >
          💡
        </div>
        <span className="fw-semibold text-primary">
          Doraemon's Tip
        </span>
      </div>

      <button
        className="btn btn-sm btn-outline-primary mt-3 rounded-pill"
        onClick={fetchQuote}
      >
        New Tip
      </button>
    </div>
  );
}