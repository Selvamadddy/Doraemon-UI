import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Card, Button } from "react-bootstrap";

const FunFactWidget = () => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      const data = await response.json();
      setFact(data.text); // API returns fact in 'text'
    } catch (error) {
      setFact("Oops! Could not fetch a fun fact.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <Card
      className="p-3 my-3 text-white"
      style={{ backgroundColor: "#1f2937", borderRadius: "10px" }}
    >
      <Card.Body>
        <div className="d-flex align-items-start">
          <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>💡</span>
          <div>
            <h6 className="text-uppercase">Fun Fact</h6>
            {loading ? (
              <Spinner animation="border" size="sm" className="mt-1" />
            ) : (
              <p>{fact}</p>
            )}
            <Button
              variant="link"
              className="p-0"
              style={{ color: "#facc15", textDecoration: "none" }}
              onClick={fetchFact}
            >
              Next Fact →
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FunFactWidget;
