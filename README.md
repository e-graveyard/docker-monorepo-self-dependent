<p align="center">
  <a href="https://github.com/caian-org/docker-monorepo-self-dependent/actions/workflows/build-bare-image.yml">
    <img src="https://img.shields.io/github/workflow/status/caian-org/docker-monorepo-self-dependent/build-bare-image?label=bare&amp;logo=docker&amp;logoColor=FFF&amp;style=for-the-badge">
  </a>
  <a href="https://github.com/caian-org/docker-monorepo-self-dependent/actions/workflows/build-full-image.yml">
    <img src="https://img.shields.io/github/workflow/status/caian-org/docker-monorepo-self-dependent/build-full-image?label=full&amp;logo=docker&amp;logoColor=FFF&amp;style=for-the-badge">
  </a>
  <a href="https://github.com/caian-org/docker-monorepo-self-dependent/actions/workflows/build-edge-image.yml">
    <img src="https://img.shields.io/github/workflow/status/caian-org/docker-monorepo-self-dependent/build-edge-image?label=edge&amp;logo=docker&amp;logoColor=FFF&amp;style=for-the-badge">
  </a>
  <a href="https://github.com/caian-org/docker-monorepo-self-dependent/tags">
    <img src="https://img.shields.io/github/tag/caian-org/docker-monorepo-self-dependent.svg?logo=git&amp;logoColor=FFF&amp;style=for-the-badge" alt="github tag">
  </a>
</p>

<h1 align="center">docker monorepo with self-dependencies</h1>

<p align="center">
  <img src=".docs/ship.gif" height="260px"/>
</p>

This project exemplifies how to create a Docker [monorepo][monorepo] that has self-dependencies
(one docker image based on another, inside this same repository) using [GitHub Actions][github-actions].

[github-actions]: https://github.com/features/actions
[monorepo]: https://monorepo.tools

<ul>
<li>
<details>
<summary><strong>Sequence diagram: Tag push</strong> <em>(click to expand)</em></summary>

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

</details>
</li>

<li>
<details>
<summary><strong>Sequence diagram: Edge branch push</strong> <em>(click to expand)</em></summary>

```mermaid
sequenceDiagram
    autonumber
    participant user as User
    participant github as GitHub Actions
    participant build_edge as Edge build
    participant dockerhub as Docker Hub
    participant samples as Code samples

    user->>github: Pushes
    Note right of user: branch edge

    github-)build_edge: Triggers
    loop Every 8 hours
        github-)build_edge: Schedule
    end
    build_edge->>dockerhub: Pulls
    Note left of dockerhub: tag x.y.z-full
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

</details>
</li>
</ul>


## License

To the extent possible under law, [Caian Ertl][me] has waived __all copyright
and related or neighboring rights to this work__. In the spirit of _freedom of
information_, I encourage you to fork, modify, change, share, or do whatever
you like with this project! [`^C ^V`][kopimi]

[![License][cc-shield]][cc-url]

[me]: https://github.com/upsetbit
[cc-shield]: https://forthebadge.com/images/badges/cc-0.svg
[cc-url]: http://creativecommons.org/publicdomain/zero/1.0

[kopimi]: https://kopimi.com
