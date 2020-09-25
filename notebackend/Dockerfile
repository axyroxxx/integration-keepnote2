FROM openjdk:11-jre
WORKDIR usr/lib
ENV MYSQL_HOST=localhost
ENV MYSQL_DATABASE=keepnote
ENV MYSQL_USER=approot
ENV MYSQL_PASSWORD=apppass
COPY ./target/notebackend-0.0.1-SNAPSHOT.jar /usr/lib/notebackend-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "notebackend-0.0.1-SNAPSHOT.jar"]
