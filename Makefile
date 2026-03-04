# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                          PORTFOLIO PROJECT MAKEFILE                          ║
# ║               Delegates to makefile.py for cross-platform support            ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

.DEFAULT_GOAL := help

# All targets simply pass through to the Python build script.
# This gives us colourised output on every platform (Windows / macOS / Linux)
# without relying on bash ANSI escape codes or GNU tools.

PY := python

# ── Catch-all rule ────────────────────────────────────────────────────────────
# Any target not listed below falls through here so you can still type
#   make <anything>
# and have it forwarded to makefile.py automatically.
%:
	@$(PY) makefile.py $@

# ── Explicit phony declarations ───────────────────────────────────────────────
# Listed so that tab-completion and `make help` work predictably.

.PHONY: help
help:
	@$(PY) makefile.py help

# Development
.PHONY: install dev start preview
install:
	@$(PY) makefile.py install
dev:
	@$(PY) makefile.py dev
start:
	@$(PY) makefile.py start
preview:
	@$(PY) makefile.py preview

# Build
.PHONY: build build-force analyze analyze-verbose gen-git-stats
gen-git-stats:
	@$(PY) makefile.py gen-git-stats
build:
	@$(PY) makefile.py build
build-force:
	@$(PY) makefile.py build-force
analyze:
	@$(PY) makefile.py analyze
analyze-verbose:
	@$(PY) makefile.py analyze-verbose

# Quality
.PHONY: lint lint-fix type-check check
lint:
	@$(PY) makefile.py lint
lint-fix:
	@$(PY) makefile.py lint-fix
type-check:
	@$(PY) makefile.py type-check
check:
	@$(PY) makefile.py check

# Maintenance
.PHONY: clean clean-all reinstall update outdated
clean:
	@$(PY) makefile.py clean
clean-all:
	@$(PY) makefile.py clean-all
reinstall:
	@$(PY) makefile.py reinstall
update:
	@$(PY) makefile.py update
outdated:
	@$(PY) makefile.py outdated

# Git
.PHONY: status log pull push
status:
	@$(PY) makefile.py status
log:
	@$(PY) makefile.py log
pull:
	@$(PY) makefile.py pull
push:
	@$(PY) makefile.py push

# Information
.PHONY: info env
info:
	@$(PY) makefile.py info
env:
	@$(PY) makefile.py env

# Composite
.PHONY: fresh-start prod-ready quick-deploy
fresh-start:
	@$(PY) makefile.py fresh-start
prod-ready:
	@$(PY) makefile.py prod-ready
quick-deploy:
	@$(PY) makefile.py quick-deploy
