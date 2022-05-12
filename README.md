# Docker monorepo with self-dependencies

This project exemplifies how to create a Docker [monorepo][monorepo] that has self-dependencies
(one docker image based on another, inside this same repository) using [GitHub Actions][github-actions].

[github-actions]: https://github.com/features/actions
[monorepo]: https://monorepo.tools


## Tag push diagram

```mermaid
sequenceDiagram
    autonumber
    participant user as User
    participant github as GitHub Actions
    participant build_bare as Bare build
    participant build_full as Full build
    participant build_edge as Edge build
    participant dockerhub as Docker Hub
    participant samples as Code samples

    user->>github: Pushes a semver tag
    Note right of user: e.g. v0.1.0

    github-)build_bare: Triggers
    build_bare->>dockerhub: Pushes
    Note left of dockerhub: tag 0.1.0-bare
    build_bare-)github: Dispatches
    Note right of github: event "build-full-image"
    build_bare-->github: "bare" build ends

    github-)build_full: Triggers
    build_full->>dockerhub: Pulls
    Note left of dockerhub: tag 0.1.0-bare
    build_full->>dockerhub: Pushes
    Note left of dockerhub: tag 0.1.0-full
    build_full-)github: Dispatches
    Note right of github: event "build-edge-image"
    build_full-->github: "full" build ends

    github-)build_edge: Triggers
    build_edge->>dockerhub: Pulls
    Note left of dockerhub: tag 0.1.0-full
    build_edge->>dockerhub: Pushes
    Note left of dockerhub: tag latest
    build_edge-)github: Dispatches
    Note right of github: event "run-sample"
    build_edge-->github: "edge" build ends

    github-)samples: Triggers
    samples->>dockerhub: Pulls
    Note left of samples: tag latest
    samples-->github: "code samples" test ends
```
