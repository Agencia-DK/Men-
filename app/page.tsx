"use client";

import { useEffect, useState } from "react";

type Dish = {
  name: string;
  description: string;
  price: string;
  category: "Botana" | "Del mar" | "Fuego" | "Especialidades" | "Bebidas";
  image: string;
  tag?: string;
};

const dishes: Dish[] = [
  { name: "Pescadillas", description: "Rellenas de pescado, con tortilla frita.", price: "$185", category: "Botana", image: "images/empanadas.png", tag: "Para compartir" },
  { name: "Nachos con queso", description: "Totopos crujientes con queso fundido y salsa de la casa.", price: "$160", category: "Botana", image: "images/botana-nachos.jpg" },
  { name: "Papas a la francesa", description: "Papas doradas con sal de la casa y aderezo ahumado.", price: "$110", category: "Botana", image: "images/botana-papas.jpg" },
  { name: "Palomitas", description: "Palomitas recién hechas con mantequilla especiada.", price: "$95", category: "Botana", image: "images/botana-palomitas.jpg" },
  { name: "Tacos dorados", description: "Tacos crujientes con lechuga, crema, queso y salsa verde.", price: "$185", category: "Botana", image: "images/botana-tacos-dorados.jpg" },
  { name: "Tostadas de pescado", description: "Pescado fresco, jitomate, cebolla, cilantro y aguacate sobre tostada crujiente.", price: "$195", category: "Botana", image: "images/botana-tostada-pescado.jpg" },
  { name: "Cóctel de camarón", description: "Camarón, aguacate, pepino, jitomate, cilantro y salsa cítrica de la casa.", price: "$245", category: "Del mar", image: "images/ceviche.jpg" },
  { name: "Pescado a las brasas", description: "Pesca del día asada entera, vegetales rostizados y limón tatemado.", price: "$420", category: "Del mar", image: "images/pescado-brasa.jpg", tag: "Especialidad de la casa" },
  { name: "Crujiente del lago", description: "Filetes de pescado, costra ligera, ensalada fresca y aderezo de la casa.", price: "$265", category: "Del mar", image: "images/pescado-frito.jpg" },
  { name: "Tomahawk", description: "Corte con hueso a las brasas, papas rústicas y mantequilla ahumada de chile.", price: "$695", category: "Fuego", image: "images/ribeye.jpg", tag: "Favorito" },
  { name: "Arrachera", description: "Arrachera a la parrilla, puré de papa, vegetales de temporada y romero.", price: "$545", category: "Fuego", image: "images/filete.jpg" },
  { name: "Rib eye", description: "Rib eye sellado, espárragos, puré rústico y reducción de vino.", price: "$520", category: "Fuego", image: "images/solomillo.jpg" },
  { name: "Pechuga empanizada", description: "Pechuga crujiente, polenta cremosa, flores y jugo especiado.", price: "$345", category: "Especialidades", image: "images/pollo-costra.jpg" },
  { name: "Cerdo en chile verde", description: "Cerdo braseado, salsa verde, arroz mexicano, frijoles y totopos.", price: "$325", category: "Especialidades", image: "images/cerdo-verde.jpg" },
  { name: "Pollo relleno de la casa", description: "Pechuga crujiente rellena de jamón y queso, puré y ensalada fresca.", price: "$365", category: "Especialidades", image: "images/pollo-relleno.jpg" },
  { name: "Jamaica ahumada", description: "Infusión de jamaica, piloncillo, naranja y un toque de humo.", price: "$85", category: "Bebidas", image: "images/bebida-jamaica.jpg" },
  { name: "Limonada de romero", description: "Limón fresco, romero del huerto y agua mineral.", price: "$90", category: "Bebidas", image: "images/bebida-limonada.jpg" },
  { name: "Té negro con cítricos", description: "Té frío, naranja, limón amarillo y miel de la región.", price: "$95", category: "Bebidas", image: "images/bebida-te.jpg" },
  { name: "Mezcal de la casa", description: "Espadín artesanal servido con naranja y sal de gusano.", price: "$165", category: "Bebidas", image: "images/bebida-mezcal.jpg", tag: "De la casa" },
  { name: "Copa de vino tinto", description: "Selección mexicana de temporada. Pregunta por la etiqueta disponible.", price: "$180", category: "Bebidas", image: "images/bebida-vino.jpg" },
];

const categories = ["Todos", "Botana", "Del mar", "Fuego", "Especialidades", "Bebidas"] as const;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Todos");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedDish || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedDish, menuOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -45px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeCategory]);

  const visibleDishes = activeCategory === "Todos" ? dishes : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="La Cornamenta, inicio">
          <img className="brand-logo" src="images/logo-venado.png" alt="" />
          <span><strong>La Cornamenta</strong><small>Cocina de fuego</small></span>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Navegación principal">
          <a href="#historia" onClick={() => setMenuOpen(false)}>Esencia</a>
          <a href="#menu" onClick={() => setMenuOpen(false)}>Menú</a>
          <a href="#visitanos" onClick={() => setMenuOpen(false)}>Visítanos</a>
          <a className="nav-reserve" href="https://wa.me/5210000000000">Reservar</a>
        </nav>
        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}><span /><span /></button>
      </header>

      <section className="hero" id="inicio">
        <img src="images/hero-restaurante.png" alt="Entrada de La Cornamenta al anochecer" />
        <div className="hero-shade" />
        <div className="embers" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-content">
          <p className="eyebrow">Valle de Bravo · México</p>
          <h1>El fuego deja<br /><em>huella.</em></h1>
          <p className="hero-copy">Cocina honesta, ingredientes locales y el ritual de las brasas en el corazón del bosque.</p>
          <div className="hero-actions"><a className="button button-solid" href="#menu">Descubrir el menú</a><a className="button button-ghost" href="#visitanos">Visítanos</a></div>
        </div>
        <a className="scroll-cue" href="#historia" aria-label="Desplazarse a nuestra esencia"><span>Explorar</span><i /></a>
      </section>

      <div className="marquee" aria-hidden="true"><div>FUEGO VIVO ✦ BRASAS ✦ ORIGEN ✦ TEMPORADA ✦ VALLE ✦ FUEGO VIVO ✦ BRASAS ✦ ORIGEN ✦ TEMPORADA ✦ VALLE ✦</div></div>

      <section className="menu-section section" id="menu">
        <div className="menu-heading reveal"><div><p className="eyebrow">A la mesa</p><h2>El menú</h2></div></div>
        <div className="filters" role="group" aria-label="Filtrar platillos">
          {categories.map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className="dish-grid">
          {visibleDishes.map((dish, index) => (
            <article className="dish-card reveal" key={dish.name} style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}>
              <button onClick={() => setSelectedDish(dish)} aria-label={`Ver ${dish.name}`}>
                <div className="dish-image"><img src={dish.image} alt={dish.name} />{dish.tag && <span className="dish-tag">{dish.tag}</span>}</div>
                <div className="dish-info"><p>{dish.category}</p><h3>{dish.name}</h3><div><span>{dish.description}</span><strong>{dish.price}</strong></div></div>
              </button>
            </article>
          ))}
        </div>
        <p className="menu-note">Los precios y la disponibilidad pueden cambiar según la temporada.</p>
      </section>

      <section className="experience">
        <video autoPlay muted loop playsInline preload="metadata" poster="images/solomillo.jpg" aria-hidden="true" disablePictureInPicture>
          <source src="videos/fuego-atmosfera.mp4" type="video/mp4" />
        </video>
        <div className="experience-shade" />
        <div className="experience-content reveal"><p className="eyebrow">La experiencia</p><h2>Una mesa junto<br />al <em>fuego</em></h2><p>Deja que la noche, el bosque y las brasas hagan el resto.</p><a className="button button-solid" href="https://wa.me/5210000000000">Reservar una mesa</a></div>
      </section>

      <section className="about-strip section" id="historia">
        <p className="eyebrow dark">La Cornamenta</p>
        <h2>Fuego, producto<br />y <em>territorio.</em></h2>
        <p>Cocinamos con brasas, ingredientes locales y respeto por cada temporada. Eso es todo lo que necesitamos para dejar huella.</p>
      </section>

      <section className="visit section" id="visitanos">
        <div className="visit-title reveal"><p className="eyebrow dark">Encuéntranos</p><h2>Ven al<br /><em>bosque</em></h2></div>
        <div className="visit-details reveal"><div><span>Ubicación</span><p>Valle de Bravo<br />Estado de México</p></div><div><span>Horario</span><p>Mar – Dom<br />13:00 – 23:00</p></div><div><span>Contacto</span><p>Reservaciones<br />por WhatsApp</p></div><a href="https://maps.google.com" className="text-link">Cómo llegar <b>↗</b></a></div>
      </section>

      <footer><div className="footer-brand"><img className="footer-logo" src="images/logo-venado.png" alt="Venado de La Cornamenta" /><strong>La Cornamenta</strong><small>Cocina de fuego</small></div><p>Hecho al fuego · Para compartir</p><div><a href="#inicio">Instagram</a><a href="#inicio">Facebook</a></div><small>© 2026 La Cornamenta</small></footer>

      {selectedDish && <div className="modal" role="dialog" aria-modal="true" aria-label={selectedDish.name} onClick={() => setSelectedDish(null)}><div className="modal-card" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedDish(null)} aria-label="Cerrar">×</button><img src={selectedDish.image} alt={selectedDish.name} /><div><p className="eyebrow dark">{selectedDish.category}</p><h2>{selectedDish.name}</h2><p>{selectedDish.description}</p><strong>{selectedDish.price}</strong></div></div></div>}
    </main>
  );
}
