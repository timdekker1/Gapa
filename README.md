# Gapa
Website/app voor GAPA Lederwaren in Schagen

## Draaien met Docker

Installeer Docker Desktop en voer vanuit deze map uit:

```powershell
docker build -t gapa-lederwaren .
docker run --rm --name gapa-lederwaren -p 8080:8080 gapa-lederwaren
```

Open daarna [http://localhost:8080](http://localhost:8080). Stoppen kan met `Ctrl+C`.

De container serveert alleen de statische website via Nginx, draait als niet-root gebruiker en bevat enkele standaard security-headers. Voor publicatie bij de klant is HTTPS nog steeds nodig; regel dat bij voorkeur via de reverse proxy of hostingomgeving van de klant.

## Image overdragen zonder registry

Exporteer de gebouwde image naar een bestand:

```powershell
docker save gapa-lederwaren -o gapa-lederwaren.tar
```

De klant laadt die daarna in met:

```powershell
docker load -i gapa-lederwaren.tar
docker run -d --name gapa-lederwaren --restart unless-stopped -p 8080:8080 gapa-lederwaren
```
