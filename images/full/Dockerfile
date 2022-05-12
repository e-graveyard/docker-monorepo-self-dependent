FROM caian/sample-devcontainer:0.7.0-bare

ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

USER ${DOCKER_DEFAULT_USER}

# initializes brew, updates and installs python, poetry (python dependency manager) and node
RUN eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
    && brew update \
    && brew upgrade \
    && brew install \
        "python" \
        "poetry" \
        "node"
