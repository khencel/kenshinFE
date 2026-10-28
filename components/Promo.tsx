import { ArrowRight } from "lucide-react";

export default function Promo() {
  return (
    <section id="promo" className="position-relative overflow-hidden border-top-k border-bottom-k">
      <div className="photo fill"  aria-hidden />
      <div className="fill" style={{ background: "rgba(13,11,10,0.7)" }} aria-hidden />

      <div className="row g-0 position-relative">
        <div className="col-md-4">
          <div
            className="photo position-relative h-100"
            style={{ backgroundImage: "url(/84866.jpg)", minHeight: 200 }}
            role="img"
            aria-label="Wagyu beef set"
          >
            <span className="promo-badge">Special Promo</span>
          </div>
        </div>

        <div className="col-md-3 d-flex flex-column justify-content-center px-4 py-4" 
          style={{
              background: "linear-gradient(to right, #040405 35%, rgba(4, 4, 5, 0.85) 65%, rgba(4, 4, 5, 0) 100%)"
            }}
        >
          <h2 className="font-serif fw-medium mb-0" style={{ fontSize: 26 }}>
            Limited Time Offer
          </h2>
          <p className="mt-3 mb-0" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 320 }}>
            Enjoy our Chef&apos;s Special Wagyu Beef Set with a complimentary drink.
          </p>
          <a href="#reserve" className="btn-outline-kenshin btn-sm-k mt-4 align-self-start">
            Get the Promo <ArrowRight size={14} />
          </a>
        </div>
        
        <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center bg-warning">
          <img src="/wagyuDrinks.png" style={{width:"100%"}} alt="" />
          {/* <div className="promo-stamp">
            <p className="font-serif fw-bolder text-uppercase mb-0" style={{ fontSize: 24, lineHeight: 1.1 }}>
              Wagyu
              <br />
              Beef Set
            </p>
            <p className="mb-0 mt-1 text-uppercase fw-semibold" style={{ fontSize: 9, letterSpacing: "0.2em" }}>
              + Free Drink
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
