# === Stage 1: Build ===
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

COPY . .

# Give executable permissions to the wrapper (for Linux/macOS)
RUN chmod +x mvnw

# Build the app using the Maven wrapper
RUN ./mvnw clean package -DskipTests

# === Stage 2: Run ===
FROM eclipse-temurin:17-jdk

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
