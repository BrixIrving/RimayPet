# C4 · Nivel 4: diagrama de código

Muestra la estructura interna del caso de uso `ReportarMascotaPerdida`: clases, interfaces y métodos.

```mermaid
classDiagram
  class ReportarMascotaPerdida {
    +ejecutar(datos) Resultado
  }
  class RepositorioReportes {
    <<interface>>
    +guardar(reporte)
    +buscarPorId(id)
  }
  class PublicadorEventos {
    <<interface>>
    +publicar(evento)
  }
  class ReporteMascotaPerdida {
    +id
    +idMascota
    +ubicacion
    +radio
    +estado
    +crear(datos)$ ReporteMascotaPerdida
    +marcarAvistada()
    +marcarEncontrada()
  }
  class Ubicacion {
    +latitud
    +longitud
  }
  class RadioBusqueda {
    +km
  }
  class RepositorioReportesPostGIS
  class PublicadorRedis
  ReportarMascotaPerdida --> RepositorioReportes
  ReportarMascotaPerdida --> PublicadorEventos
  ReportarMascotaPerdida ..> ReporteMascotaPerdida : crea
  ReporteMascotaPerdida *-- Ubicacion
  ReporteMascotaPerdida *-- RadioBusqueda
  RepositorioReportesPostGIS ..|> RepositorioReportes
  PublicadorRedis ..|> PublicadorEventos
```

El código ejecutable del caso de uso está en `tecnologia/boilerplate-clean-architecture/src/alertas/application/casos-de-uso/ReportarMascotaPerdida.js`.
