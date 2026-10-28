import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="photo fill" style={{ backgroundImage: "url('/205fd7ce-0a9b-414f-ad0d-d9b6a0ffa0e8.png')" }} aria-hidden />
      <div className="fill overlay-hero" aria-hidden />
      <div className="fade-bottom" aria-hidden />

      <div className="container k-container">
        <div className="hero-inner">
          {/* Vertical kanji + seal */}
          <div className="d-none d-sm-flex flex-column align-items-center gap-3">
            <div className="d-flex flex-column font-jp text-gold" style={{ fontSize: 28, lineHeight: 1.15 }}>
              <span>居</span>
              <span>酒</span>
              <span>屋</span>
            </div>
            <div className="seal">
              <span className="font-jp vertical">剣心</span>
            </div>
          </div>

          <div style={{ maxWidth: 560 }}>
            <p className="eyebrow">Authentic Japanese Cuisine</p>
            <h1>
              Good Food
              <br />
              Good Company
            </h1>
            <p className="mt-4 mb-0 fs-6" style={{ maxWidth: 380, fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>
              Experience the true taste of Japan at Kenshin. Fresh ingredients, traditional recipes,
              and a warm izakaya atmosphere — perfect for every occasion.
            </p>
            <a href="#menu" className="btn-kenshin mt-4">
              Explore Our Menu <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
