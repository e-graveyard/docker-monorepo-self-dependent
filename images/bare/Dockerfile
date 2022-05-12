FROM debian:buster-slim AS base

# the default non-root user that runs the entrypoint command for this image
ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

# since this is a debian-based image, the home directory will be "/home/<username>"
ARG DOCKER_USER_HOME_DIR=/home/${DOCKER_DEFAULT_USER}
ENV DOCKER_USER_HOME_DIR $DOCKER_USER_HOME_DIR

# for reproducible images, it is a good practice to have pinned versions of any kind of package/dependency
RUN apt-get update \
    && apt-get install --yes --no-install-recommends \
        "apt-transport-https=1.8.2.*" \
        "build-essential=12.6*" \
        "ca-certificates=20200601*" \
        "curl=7.64.0*" \
        "git=1:2.20.1*" \
        "sudo=1.8.27*" \
        "procps=2:3.3.*" \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# also a good practice to have an image that runs with a non-root user by default
# this non-root user will have sudo capabilities without password and it's own home directory
RUN groupadd "${DOCKER_DEFAULT_USER}" \
    && useradd \
        -rm \
        -d "${DOCKER_USER_HOME_DIR}" \
        -s /bin/bash \
        -g "${DOCKER_DEFAULT_USER}" "${DOCKER_DEFAULT_USER}" \
    && passwd --delete "${DOCKER_DEFAULT_USER}" \
    && usermod -a -G sudo "${DOCKER_DEFAULT_USER}" \
    && echo "%sudo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
    && mkdir -p \
        "${DOCKER_USER_HOME_DIR}" \
    && chown -R \
        "${DOCKER_DEFAULT_USER}:${DOCKER_DEFAULT_USER}" \
        "${DOCKER_USER_HOME_DIR}"


FROM base AS brew
USER ${DOCKER_DEFAULT_USER}
WORKDIR ${DOCKER_USER_HOME_DIR}

# installs homebrew
RUN curl -sSL \
        "https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh" \
        -o brew-install.sh \
    && chmod +x brew-install.sh \
    && ./brew-install.sh \
    && rm brew-install.sh


FROM brew AS run
ENTRYPOINT ["/bin/bash"]
