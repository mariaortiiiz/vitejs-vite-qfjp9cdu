# Usar imagen oficial de Node.js versión 18 (LTS)
FROM node:18-alpine

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Crear directorio para los logs (importante para ELK)
RUN mkdir -p /var/log/backend && chmod 777 /var/log/backend

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que usa la aplicación (5000 según tu server.js)
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]