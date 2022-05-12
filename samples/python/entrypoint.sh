#!/bin/bash

eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

python3 main.py "$@"
