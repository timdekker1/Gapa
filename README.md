# Gapa
Website/app voor GAPA Lederwaren in Schagen

## Draaien met Docker

Installeer Docker Desktop en voer vanuit deze map uit:

```powershell
docker compose up --build
```

Open daarna [http://localhost:8080](http://localhost:8080). Stoppen kan met `Ctrl+C`.

De webcontainer serveert de website via Nginx en PHP-FPM. De aparte MySQL-container maakt automatisch de database en de `users`-tabel aan. Voor publicatie bij de klant is HTTPS nog steeds nodig; regel dat bij voorkeur via de reverse proxy of hostingomgeving van de klant.

De accountgegevens blijven in de Docker-volume `gapa_mysql_data` staan. Gebruik `docker compose down -v` alleen wanneer ook de databasegegevens verwijderd mogen worden.
