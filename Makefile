# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                          PORTFOLIO PROJECT MAKEFILE                          ║
# ║                         Windows-Compatible Commands                          ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Configuration                                                                │
# └──────────────────────────────────────────────────────────────────────────────┘

.DEFAULT_GOAL := help
SHELL := /bin/bash
APP_DIR := app

# Colors for terminal output (works on Windows Terminal, ConEmu, Git Bash)
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
MAGENTA := \033[0;35m
BLUE := \033[0;34m
RESET := \033[0m

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Help & Information                                                           │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: help
help: ## Show this help message
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════════════════╗$(RESET)"
	@echo "$(CYAN)║                       PORTFOLIO PROJECT - MAKE TARGETS                       ║$(RESET)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════════════════╝$(RESET)"
	@echo ""
	@echo "$(YELLOW)📦 Development Commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; /Development/ {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🏗️  Build & Deploy Commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; /Build|Deploy|Production/ {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🔍 Quality & Testing Commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; /Quality|Test|Lint|Check/ {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🧹 Maintenance Commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; /Maintenance|Clean/ {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🔧 Git Commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; /Git/ {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)ℹ️  Information Commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; /Info|Show/ {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Development Commands                                                         │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: install
install: ## [Development] Install all dependencies
	@echo "$(CYAN)📦 Installing dependencies...$(RESET)"
	@cd $(APP_DIR) && npm install
	@echo "$(GREEN)✓ Dependencies installed successfully!$(RESET)"

.PHONY: dev
dev: ## [Development] Start development server
	@echo "$(CYAN)🚀 Starting development server...$(RESET)"
	@cd $(APP_DIR) && npm run dev

.PHONY: start
start: dev ## [Development] Alias for dev

.PHONY: preview
preview: ## [Development] Preview production build locally
	@echo "$(CYAN)👀 Starting preview server...$(RESET)"
	@cd $(APP_DIR) && npm run preview

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Build & Deploy Commands                                                     │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: build
build: ## [Build] Build for production
	@echo "$(CYAN)🏗️  Building for production...$(RESET)"
	@cd $(APP_DIR) && npm run build
	@echo "$(GREEN)✓ Build completed successfully!$(RESET)"

.PHONY: build-force
build-force: ## [Build] Force rebuild (clean TypeScript cache)
	@echo "$(CYAN)🏗️  Force building (cleaning caches)...$(RESET)"
	@cd $(APP_DIR) && npm run force-build
	@echo "$(GREEN)✓ Force build completed!$(RESET)"

.PHONY: analyze
analyze: ## [Build] Build and analyze bundle size
	@echo "$(CYAN)📊 Analyzing bundle size...$(RESET)"
	@cd $(APP_DIR) && npm run analyze

.PHONY: analyze-verbose
analyze-verbose: ## [Build] Build with verbose bundle analysis
	@echo "$(CYAN)📊 Running verbose bundle analysis...$(RESET)"
	@cd $(APP_DIR) && npm run analyze:verbose

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Quality & Testing Commands                                                  │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: lint
lint: ## [Quality] Run ESLint on the codebase
	@echo "$(CYAN)🔍 Running linter...$(RESET)"
	@cd $(APP_DIR) && npm run lint
	@echo "$(GREEN)✓ Linting completed!$(RESET)"

.PHONY: lint-fix
lint-fix: ## [Quality] Run ESLint and auto-fix issues
	@echo "$(CYAN)🔧 Running linter with auto-fix...$(RESET)"
	@cd $(APP_DIR) && npx eslint . --ext ts,tsx --fix
	@echo "$(GREEN)✓ Linting and fixes completed!$(RESET)"

.PHONY: type-check
type-check: ## [Quality] Run TypeScript type checking
	@echo "$(CYAN)📝 Running TypeScript type check...$(RESET)"
	@cd $(APP_DIR) && npx tsc --noEmit
	@echo "$(GREEN)✓ Type checking completed!$(RESET)"

.PHONY: check
check: lint type-check ## [Quality] Run all checks (lint + type-check)
	@echo "$(GREEN)✓ All checks passed!$(RESET)"

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Maintenance Commands                                                        │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: clean
clean: ## [Maintenance] Clean build artifacts
	@echo "$(YELLOW)🧹 Cleaning build artifacts...$(RESET)"
	@rm -rf $(APP_DIR)/dist $(APP_DIR)/node_modules/.vite 2>/dev/null || true
	@echo "$(GREEN)✓ Clean completed!$(RESET)"

.PHONY: clean-all
clean-all: clean ## [Maintenance] Clean everything including node_modules
	@echo "$(YELLOW)🧹 Cleaning all dependencies...$(RESET)"
	@rm -rf $(APP_DIR)/node_modules 2>/dev/null || true
	@echo "$(GREEN)✓ Deep clean completed!$(RESET)"

.PHONY: reinstall
reinstall: clean-all install ## [Maintenance] Reinstall all dependencies from scratch
	@echo "$(GREEN)✓ Reinstall completed!$(RESET)"

.PHONY: update
update: ## [Maintenance] Update all dependencies to latest versions
	@echo "$(CYAN)📦 Updating dependencies...$(RESET)"
	@cd $(APP_DIR) && npm update
	@echo "$(GREEN)✓ Dependencies updated!$(RESET)"

.PHONY: outdated
outdated: ## [Maintenance] Check for outdated dependencies
	@echo "$(CYAN)📦 Checking for outdated dependencies...$(RESET)"
	@cd $(APP_DIR) && npm outdated || true

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Git Commands                                                                │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: status
status: ## [Git] Show git status
	@git status

.PHONY: log
log: ## [Git] Show recent git commits
	@git log --oneline --graph --decorate -10

.PHONY: pull
pull: ## [Git] Pull latest changes from remote
	@echo "$(CYAN)⬇️  Pulling latest changes...$(RESET)"
	@git pull
	@echo "$(GREEN)✓ Pull completed!$(RESET)"

.PHONY: push
push: ## [Git] Push changes to remote
	@echo "$(CYAN)⬆️  Pushing changes...$(RESET)"
	@git push
	@echo "$(GREEN)✓ Push completed!$(RESET)"

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Information Commands                                                        │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: info
info: ## [Info] Show project information
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════════════════╗$(RESET)"
	@echo "$(CYAN)║                           PROJECT INFORMATION                                ║$(RESET)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════════════════╝$(RESET)"
	@echo ""
	@echo "$(YELLOW)📁 Project:$(RESET)       Portfolio Website"
	@echo "$(YELLOW)🌐 Homepage:$(RESET)      https://utkarsh5026.github.io/"
	@echo "$(YELLOW)📂 App Directory:$(RESET) $(APP_DIR)"
	@echo ""
	@echo "$(YELLOW)🛠️  Technology Stack:$(RESET)"
	@echo "  • React $(BLUE)^18.3.1$(RESET)"
	@echo "  • TypeScript $(BLUE)^5.2.2$(RESET)"
	@echo "  • Vite $(BLUE)^5.4.21$(RESET)"
	@echo "  • Tailwind CSS $(BLUE)^3.4.16$(RESET)"
	@echo "  • Framer Motion $(BLUE)^12.4.7$(RESET)"
	@echo ""
	@cd $(APP_DIR) && node --version | awk '{print "$(YELLOW)📦 Node Version:$(RESET)  " $$0}'
	@cd $(APP_DIR) && npm --version | awk '{print "$(YELLOW)📦 npm Version:$(RESET)   " $$0}'
	@echo ""

.PHONY: env
env: ## [Info] Show environment information
	@echo "$(CYAN)Environment Information:$(RESET)"
	@echo "  Working Directory: $(shell pwd)"
	@echo "  App Directory:     $(APP_DIR)"
	@echo "  Make Version:      $(MAKE_VERSION)"
	@echo "  Shell:             $(SHELL)"

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │ Composite Commands                                                          │
# └──────────────────────────────────────────────────────────────────────────────┘

.PHONY: fresh-start
fresh-start: clean-all install dev ## [Development] Fresh start (clean, install, run dev)
	@echo "$(GREEN)✓ Fresh start completed!$(RESET)"

.PHONY: prod-ready
prod-ready: clean check build ## [Production] Ensure production readiness (clean, check, build)
	@echo "$(GREEN)✓ Production build ready!$(RESET)"

.PHONY: quick-deploy
quick-deploy: check build ## [Deploy] Quick deploy check (lint, type-check, build)
	@echo "$(GREEN)✓ Ready for deployment!$(RESET)"
	@echo "$(YELLOW)💡 Tip: Push to main branch to trigger GitHub Pages deployment$(RESET)"
