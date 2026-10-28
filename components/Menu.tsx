import { ArrowRight } from "lucide-react";
import { MENU_ITEMS } from "@/lib/data";

export default function Menu() {
  return (
    <section id="menu" className="bg-ink border-top-k">
      <div className="container k-container py-5">
        <div className="d-flex align-items-end justify-content-between">
          <div>
            <p className="eyebrow">Our Menu</p>
            <h2 className="font-serif fw-medium mt-2 mb-0" style={{ fontSize: 28 }}>
              Signature Dishes
            </h2>
          </div>
          <a href="#menu" className="btn-outline-kenshin btn-sm-k">
            View Full Menu <ArrowRight size={13} />
          </a>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 mt-3">
          {MENU_ITEMS.map((item) => (
            <div className="col" key={item.title}>
              <a href="#menu" className="menu-card">
                <div className="photo-wrap">
                  <div
                    className="photo"
                    style={{ backgroundImage: `url(${item.img})` }}
                    role="img"
                    aria-label={item.title}
                  />
                </div>
                <div className="p-3 pe-4">
                  <h3 className="font-serif fw-semibold mb-1" style={{ fontSize: 13 }}>
                    {item.title}
                  </h3>
                  <p className="text-mute mb-0 fs-10">{item.sub}</p>
                </div>
                <ArrowRight size={13} className="arrow" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
