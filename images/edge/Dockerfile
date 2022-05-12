FROM caian/sample-devcontainer:0.2.1-full

ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

USER ${DOCKER_DEFAULT_USER}

RUN brew update \
    && brew upgrade
