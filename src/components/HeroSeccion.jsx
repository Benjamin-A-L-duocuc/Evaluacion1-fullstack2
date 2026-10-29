import React from "react";
import { Container } from "react-bootstrap";

function HeroSeccion({
    badge,
    titulo,
    subtitulo,
    tituloAs: Titulo = "h1",
    tituloClassName = "display-5 fw-bold mb-2",
    className = "py-5",
    containerClassName = "",
    children
}) {
    return (
        <header className={"hero " + className}>
            <Container className={containerClassName}>
                {badge ? (
                    <span className="badge badge-marca mb-3">{badge}</span>
                ) : null}
                {titulo ? <Titulo className={tituloClassName}>{titulo}</Titulo> : null}
                {subtitulo ? <p className="lead mb-0">{subtitulo}</p> : null}
                {children}
            </Container>
        </header>
    );
}

export default HeroSeccion;
