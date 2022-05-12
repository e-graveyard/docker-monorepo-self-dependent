FROM caian/sample-devcontainer:latest AS devcontainer

ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

USER ${DOCKER_DEFAULT_USER}
WORKDIR /home/${DOCKER_DEFAULT_USER}

COPY entrypoint.sh .
RUN sudo chmod +x entrypoint.sh


FROM devcontainer AS dependencies
USER root
COPY package.json .
COPY package-lock.json .

RUN eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
    && npm install --only=production \
    && rm package.json package-lock.json


FROM dependencies AS run
COPY index.js .
RUN chown -R "${DOCKER_DEFAULT_USER}:${DOCKER_DEFAULT_USER}" "/home/${DOCKER_DEFAULT_USER}"

USER ${DOCKER_DEFAULT_USER}
ENTRYPOINT ["./entrypoint.sh"]
