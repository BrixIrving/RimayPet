# C4 — Nivel 4: código del caso de uso ReportarMascotaPerdida

```mermaid
classDiagram
  class AlertasController {
    +crearReporte(dto, usuarioId) HttpResponse
  }
  class ReportarMascotaPerdida {
    +ejecutar(comando) Resultado
  }
  class ReporteMascotaPerdida {
    +id
    +mascotaId
    +propietarioId
    +ubicacion
    +radio
    +estado
    +crear(datos) ReporteMascotaPerdida
    +marcarAvistada()
    +marcarEncontrada()
  }
  class Ubicacion {
    +latitud
    +longitud
    +aproximar()
  }
  class RadioBusqueda {
    +kilometros
    +validar()
  }
  class RepositorioReportes {
    <<interface>>
    +guardar(reporte, tx)
    +buscarPorId(id)
  }
  class PublicadorEventos {
    <<interface>>
    +registrar(evento, tx)
  }
  class RepositorioPostgres
  class OutboxPostgres
  AlertasController --> ReportarMascotaPerdida
  ReportarMascotaPerdida --> ReporteMascotaPerdida
  ReporteMascotaPerdida *-- Ubicacion
  ReporteMascotaPerdida *-- RadioBusqueda
  ReportarMascotaPerdida --> RepositorioReportes
  ReportarMascotaPerdida --> PublicadorEventos
  RepositorioPostgres ..|> RepositorioReportes
  OutboxPostgres ..|> PublicadorEventos
```

La transacción la coordina el adaptador de persistencia/unidad de trabajo: guarda el reporte y la fila Outbox en la misma transacción. La API no publica directamente a Redis ni realiza el push.
