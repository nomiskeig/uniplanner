FROM eclipse-temurin:21 as base


FROM base AS deps

ENV APP_HOME=/app
WORKDIR $APP_HOME 
COPY build.gradle.kts settings.gradle.kts gradlew $APP_HOME
COPY gradle $APP_HOME/gradle
RUN apt-get update && apt-get -y install findutils
RUN ./gradlew build || return 0

COPY . . 
RUN ./gradlew build

FROM deps AS runner

ENV ARTIFACT_NAME=uniplanner-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/app
WORKDIR $APP_HOME
COPY --from=deps $APP_HOME/build/libs/$ARTIFACT_NAME .
EXPOSE 8080
CMD java -jar $ARTIFACT_NAME

