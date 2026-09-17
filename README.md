# Gapa
Website/app voor GAPA Lederwaren in Schagen

## Draaien met Docker

Installeer Docker Desktop en voer vanuit deze map uit:

```powershell
docker compose up --build
```

Open daarna [http://localhost:8080](http://localhost:8080). Stoppen kan met `Ctrl+C`.

De webcontainer serveert de website via Nginx en PHP-FPM. De oude lokale database en PHP-database-endpoints zijn verwijderd. Authenticatie en opslag worden voortaan via Supabase aangesloten. Voor publicatie bij de klant is HTTPS nog steeds nodig; regel dat bij voorkeur via de reverse proxy of hostingomgeving van de klant.



    ALS je gaat pushen:

## Docker-compose down  (terminal)
## PUSH OP GIT
## docker-compose up --build    (terminal)
