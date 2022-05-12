FROM caian/sample-devcontainer:latest AS devcontainer

ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

USER ${DOCKER_DEFAULT_USER}
WORKDIR /home/${DOCKER_DEFAULT_USER}

COPY entrypoint.sh .
RUN sudo chmod +x entrypoint.sh


FROM devcontainer AS dependencies
USER root
COPY pyproject.toml .
COPY poetry.lock .

RUN eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
    && poetry export -f requirements.txt --output requirements.txt \
    && pip3 install -r requirements.txt \
    && rm requirements.txt pyproject.toml poetry.lock


FROM dependencies AS run
COPY main.py .
RUN chown -R "${DOCKER_DEFAULT_USER}:${DOCKER_DEFAULT_USER}" "/home/${DOCKER_DEFAULT_USER}"

USER ${DOCKER_DEFAULT_USER}
ENTRYPOINT ["./entrypoint.sh"]
