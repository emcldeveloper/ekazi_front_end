import { useEffect, useState } from "react";
import { TEMPLATES } from "../data/templates";
import { Card } from "react-bootstrap";

export default function TemplateSlider() {
  const [index, setIndex] = useState(0);
  const total = TEMPLATES.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000); // change slide every 4s

    return () => clearInterval(interval);
  }, [total]);

  return (
    <Card>
      <Card.Body>
        <h3 className="text-sm font-bold text-gray-900 mb-2">
          Available CV Templates
        </h3>
        <div className="w-full overflow-hidden rounded-lg">
          <img
            src={TEMPLATES[index].image}
            alt=""
            className="w-full h-64 object-contain transition-opacity duration-700"
          />
        </div>
      </Card.Body>
    </Card>
  );
}
