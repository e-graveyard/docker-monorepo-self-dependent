FROM caian/sample-devcontainer:0.5.0-full

ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

USER ${DOCKER_DEFAULT_USER}

# just upgrade all brew packages
RUN eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
    && brew update \
    && brew upgrade
