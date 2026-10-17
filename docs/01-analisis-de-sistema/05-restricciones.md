# Restricciones

| ID | Restricción | Descripción |
|---|---|---|
| **RC01** | Infraestructura gratuita | El sistema debe desplegarse utilizando exclusivamente infraestructura de nivel gratuito (Oracle Cloud Free Tier). |
| **RC02** | Un solo desarrollador | El sistema debe poder ser construido y mantenido por un solo desarrollador. |
| **RC03** | API REST y WebSocket | Los microservicios exponen APIs REST y la mensajería en tiempo real usa un canal WebSocket independiente. |
| **RC04** | Autenticación centralizada | El acceso a los microservicios pasa por un API Gateway con autenticación JWT. |
| **RC05** | Contenerización | Todos los servicios se ejecutan en contenedores Docker, desplegados sobre más de un servidor. |
