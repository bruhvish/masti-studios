const ITEMS = ['CINEMATOGRAPHY', 'EDITING', 'BRAND BUILDING', 'DESIGN', 'SOCIAL', 'MAKE GOOD NOISE'];
const ITEMS_ALT = [
  'TOO MANY TABS', 'ONE MORE TAKE', 'EXPORT FINAL_FINAL_07', 'MOVE THAT 2PX LEFT', 'NICE.',
];
// Duplicated once so the CSS animation (translateX -50%) loops seamlessly.
const LOOP = [...ITEMS, ...ITEMS_ALT, ...ITEMS, ...ITEMS_ALT];
//const LOOP_ALT = [...ITEMS_ALT, ...ITEMS_ALT];

export default function Marquee() {
  return (
    <>
      <section className="marquee">
        <div className="marquee-track">
          {LOOP.map((item, i) => (
            <div className="marquee-item" key={i}>
              {item} <span className="sep">///</span>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="marquee marquee-alt">
        <div className="marquee-track marquee-track-reverse">
          {LOOP_ALT.map((item, i) => (
            <div className="marquee-item" key={i}>
              {item} <span className="sep">///</span>
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
}