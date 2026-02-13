import { useEffect, useState } from "react";
import { Card, Spinner, ProgressBar } from "react-bootstrap";
import "./DailyWisdomWidget.css";

type Wisdom = {
  quote: string;
  author: string;
};

export default function DailyWisdomWidget() {
  const [wisdom, setWisdom] = useState<Wisdom | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://quoteslate.vercel.app/api/quotes/random")
      .then((res) => res.json())
      .then((data) => {
        // QuoteSlate returns an object with fields like `quote` and `author`
        setWisdom({
          quote: data.quote,
          author: data.author || "Unknown",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const now = new Date();
  const minutesGone = now.getHours() * 60 + now.getMinutes();
  const percentGone = Math.round((minutesGone / 1440) * 100);

  return (
    <Card className="wisdom-card border-0 mb-4">
      <Card.Body>
        <div className="wisdom-header">
          <span className="wisdom-title">DAILY WISDOM</span>
          <div className="quote-icon">❝❞</div>
        </div>

        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <p className="wisdom-text">
            “{wisdom?.quote}” <br />
            <span className="wisdom-author">— {wisdom?.author}</span>
          </p>
        )}

        <div className="wisdom-footer">
          <ProgressBar now={percentGone} className="wisdom-progress" />
          <span className="wisdom-percent">
            {percentGone}% of day gone
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}
