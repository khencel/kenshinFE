import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-ink-soft border-top-k">
      <div className="row g-0">
        <div className="col-md-4">
          <div
            className="photo about-photo h-100"
            style={{ backgroundImage: "url(/694745914_1366664165483182_5688568179800709094_n.jpg)", backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat" }}
            role="img"
            aria-label="Kenshin restaurant interior"
          />
        </div>
        
        <div
            className="col-md-8 col-lg-5 d-flex flex-column justify-content-center px-4 px-md-5 py-5"
            style={{
              background: "linear-gradient(to right, #040405 35%, rgba(4, 4, 5, 0.85) 65%, rgba(4, 4, 5, 0) 100%)"
            }}
          >
          <p className="eyebrow">About Us</p>
          <h2 className="font-serif fw-medium mt-3 mb-0" style={{ fontSize: 26, lineHeight: 1.25 }}>
            A Taste of Japan,
            <br />
            Right Here in the Philippines
          </h2>
          <p className="text-mute mt-3 mb-0" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 440 }}>
            Kenshin Japanese Izakaya Restaurant brings the authentic flavors and warm ambiance of a
            traditional Japanese izakaya to your table. From classic favorites to modern creations,
            we serve more than just food — we serve an experience.
          </p>
          <a href="#about" className="btn-outline-kenshin mt-4 align-self-start">
            Learn More <ArrowRight size={14} />
          </a>
        </div>

        <div className="col-lg-3 d-none d-lg-block position-relative overflow-hidden">
          {/* <div className="brush">
            <span className="font-jp vertical">剣心</span>
          </div>
          <span className="mini-seal font-jp">剣</span> */}
        </div>

      </div>
    </section>
  );
}
