#!/usr/bin/env python3
"""
makefile.py - Cross-platform build system for the Portfolio project.

Usage:
    python makefile.py <target> [args...]
    make <target>           (delegates here via Makefile)

All targets mirror the existing Makefile targets exactly.
Requires: Python 3.7+
Optional: pip install colorama   (for colored terminal output)
"""

import inspect
import os
import shutil
import subprocess
import sys

try:
    from colorama import Fore, Style
    from colorama import init as _colorama_init

    _colorama_init(autoreset=True)
    HAS_COLOR = True
except ImportError:

    class _Stub:
        def __getattr__(self, _):
            return ""

    Fore = _Stub()
    Style = _Stub()
    HAS_COLOR = False

if not HAS_COLOR:
    print(
        "[INFO] colorama not installed. Run: pip install colorama  (optional, for colors)"
    )

APP_DIR = "app"


def print_header(title: str):
    bar = Fore.CYAN + Style.BRIGHT + "=" * 60 + Style.RESET_ALL
    label = Fore.CYAN + Style.BRIGHT + f"  {title}" + Style.RESET_ALL
    print(f"\n{bar}\n{label}\n{bar}")


def print_step(msg: str):
    print(f"{Fore.YELLOW}-->{Style.RESET_ALL} {msg}")


def print_success(msg: str):
    print(f"{Fore.GREEN}[OK]{Style.RESET_ALL} {msg}")


def print_warn(msg: str):
    print(f"{Fore.YELLOW}[WARN]{Style.RESET_ALL} {msg}")


def run_cmd(args, allow_failure: bool = False, cwd: str | None = None):
    """
    Run a command as a subprocess, streaming output directly to the terminal.
    Exits with the subprocess exit code on failure unless allow_failure=True.
    stdout/stderr are NOT captured — colour output passes through unmodified.
    """
    try:
        result = subprocess.run(args, cwd=cwd, shell=True)
    except FileNotFoundError:
        print(f"{Fore.RED}[ERROR]{Style.RESET_ALL} Command not found: '{args[0]}'")
        print(f"        Ensure '{args[0]}' is installed and on your PATH.")
        if not allow_failure:
            sys.exit(127)
        return 127
    if result.returncode != 0 and not allow_failure:
        sys.exit(result.returncode)
    return result.returncode


def _app_cmd(args, allow_failure: bool = False):
    """Run a bun command inside the `app/` subdirectory."""
    return run_cmd(args, allow_failure=allow_failure, cwd=APP_DIR)


def _root_cmd(args, allow_failure: bool = False):
    """Run a command from the repo root directory."""
    return run_cmd(args, allow_failure=allow_failure, cwd=None)


def target_install():
    print_header("Installing Dependencies")
    print_step("Running bun install...")
    _app_cmd(["bun", "install"])
    print_success("Dependencies installed successfully!")


def target_dev():
    print_header("Starting Development Server")
    print_step("Launching Vite dev server — press Ctrl+C to stop")
    _app_cmd(["bun", "run", "dev"])


def target_start():
    target_dev()


def target_preview():
    print_header("Starting Preview Server")
    print_step("Serving production build locally — press Ctrl+C to stop")
    _app_cmd(["bun", "run", "preview"])


def target_watch_prod():
    print_header("Watch + Serve Production Build")
    print_step("Building, watching for changes, and serving at http://localhost:3000")
    print_step("Press Ctrl+C to stop")
    _app_cmd(["bun", "run", "watch:prod"])


def target_gen_git_stats():
    print_header("Generating Git Statistics")
    _app_cmd(["bun", "run", "gen:git-stats"])
    print_success("Git stats generated!")


def target_gen_git_commits():
    print_header("Generating Git Commits")
    _app_cmd(["bun", "run", "gen:git-commits"])
    print_success("Git commits generated!")


def target_gen_git_meta():
    print_header("Generating Git Meta")
    _app_cmd(["bun", "run", "gen:git-meta"])
    print_success("Git meta generated!")


def target_gen_git_all():
    print_header("Generating All Git Data (parallel)")
    scripts = ["gen:git-stats", "gen:git-commits", "gen:git-meta"]
    processes = [
        subprocess.Popen(
            ["bun", "run", script],
            cwd=APP_DIR,
            shell=True,
        )
        for script in scripts
    ]
    exit_codes = [p.wait() for p in processes]
    failed = [scripts[i] for i, code in enumerate(exit_codes) if code != 0]
    if failed:
        print(f"{Fore.RED}[ERROR]{Style.RESET_ALL} Failed: {', '.join(failed)}")
        sys.exit(1)
    print_success("All git data generated!")


def target_gen_activity():
    print_header("Generating Activity Feed")
    _app_cmd(["bun", "run", "gen:activity"])
    print_success("Activity feed generated!")


def target_build():
    print_header("Building for Production")
    _root_cmd(["bun", "scripts/build.js"])
    print_success("Build completed successfully!")


def target_build_force():
    print_header("Force Building (Cleaning Caches)")
    target_gen_git_all()
    print_step("Cleaning TypeScript cache before build...")
    _app_cmd(["bun", "run", "force-build"])
    print_success("Force build completed!")


def target_analyze():
    print_header("Analyzing Bundle Size")
    _app_cmd(["bun", "run", "analyze"])


def target_analyze_verbose():
    print_header("Verbose Bundle Analysis")
    _app_cmd(["bun", "run", "analyze:verbose"])


def target_lint():
    print_header("Running ESLint")
    _app_cmd(["bun", "run", "lint"])
    print_success("Linting completed!")


def target_lint_fix():
    print_header("Running ESLint with Auto-fix")
    _app_cmd(["bunx", "eslint", ".", "--ext", "ts,tsx", "--fix"])
    print_success("Linting and fixes completed!")


def target_type_check():
    print_header("TypeScript Type Check")
    _app_cmd(["bunx", "tsc", "--noEmit"])
    print_success("Type checking completed!")


def target_format():
    print_header("Formatting Code")
    _app_cmd(["bun", "run", "format:write"])
    print_success("Formatting completed!")


def target_format_check():
    print_header("Checking Code Formatting")
    _app_cmd(["bun", "run", "format:check"])
    print_success("Formatting check passed!")


def target_check():
    print_header("Full Check: lint + type-check")
    target_lint()
    target_type_check()
    print_success("All checks passed!")


def target_clean():
    print_header("Cleaning Build Artifacts")
    dist = os.path.join(APP_DIR, "dist")
    vite_cache = os.path.join(APP_DIR, "node_modules", ".vite")
    for path in [dist, vite_cache]:
        if os.path.exists(path):
            shutil.rmtree(path, ignore_errors=True)
            print_step(f"Removed {path}")
    print_success("Clean completed!")


def target_clean_all():
    print_header("Deep Clean (artifacts + node_modules)")
    target_clean()
    nm = os.path.join(APP_DIR, "node_modules")
    if os.path.exists(nm):
        print_step(f"Removing {nm} ...")
        shutil.rmtree(nm, ignore_errors=True)
        print_step(f"Removed {nm}")
    print_success("Deep clean completed!")


def target_reinstall():
    print_header("Reinstalling from Scratch")
    target_clean_all()
    target_install()
    print_success("Reinstall completed!")


def target_update():
    print_header("Updating Dependencies")
    _app_cmd(["bun", "update"])
    print_success("Dependencies updated!")


def target_outdated():
    print_header("Checking for Outdated Dependencies")
    _app_cmd(["bun", "outdated"], allow_failure=True)


def target_status():
    print_header("Git Status")
    run_cmd(["git", "status"])


def target_log():
    print_header("Recent Git Commits")
    run_cmd(["git", "log", "--oneline", "--graph", "--decorate", "-10"])


def target_pull():
    print_header("Pulling Latest Changes")
    run_cmd(["git", "pull"])
    print_success("Pull completed!")


def target_push():
    print_header("Pushing Changes to Remote")
    run_cmd(["git", "push"])
    print_success("Push completed!")


def target_info():
    print_header("Project Information")
    print(f"\n{Fore.YELLOW}Project:{Style.RESET_ALL}        Portfolio Website")
    print(
        f"{Fore.YELLOW}Homepage:{Style.RESET_ALL}       https://utkarsh5026.github.io/"
    )
    print(f"{Fore.YELLOW}App Directory:{Style.RESET_ALL}  {APP_DIR}/")
    print(f"\n{Fore.YELLOW}Technology Stack:{Style.RESET_ALL}")
    stack = [
        ("React", "^18.3.1"),
        ("TypeScript", "^5.2.2"),
        ("Vite", "^5.4.21"),
        ("Tailwind CSS", "^3.4.16"),
        ("Framer Motion", "^12.4.7"),
    ]
    for name, version in stack:
        print(
            f"  {Fore.BLUE}•{Style.RESET_ALL} {name} {Fore.BLUE}{version}{Style.RESET_ALL}"
        )
    print()

    # bun version (best-effort)
    for tool in ["bun"]:
        try:
            version = subprocess.check_output(
                [tool, "--version"], text=True, cwd=APP_DIR
            ).strip()
            print(f"{Fore.YELLOW}{tool} version:{Style.RESET_ALL}    {version}")
        except Exception:
            print_warn(f"Could not determine {tool} version")
    print()


def target_env():
    print_header("Environment Information")
    print(f"  Working Directory:  {os.getcwd()}")
    print(f"  App Directory:      {APP_DIR}")
    try:
        import platform

        print(f"  Python Version:     {platform.python_version()}")
        print(f"  OS:                 {platform.system()} {platform.release()}")
    except Exception:
        pass


def target_fresh_start():
    print_header("Fresh Start — clean, install, dev")
    target_clean_all()
    target_install()
    target_dev()


def target_prod_ready():
    print_header("Production Readiness — clean + check + build")
    target_clean()
    target_check()
    target_build()
    print_success("Production build ready!")


def target_quick_deploy():
    print_header("Quick Deploy Check — lint + type-check + build")
    target_check()
    target_build()
    print_success("Ready for deployment!")
    print_warn("Tip: Push to main branch to trigger GitHub Pages deployment")


TARGETS = {
    # Development
    "install": (target_install, "Install all dependencies", "Development"),
    "dev": (target_dev, "Start development server", "Development"),
    "start": (target_start, "Alias for dev", "Development"),
    "preview": (target_preview, "Preview production build locally", "Development"),
    "watch-prod": (target_watch_prod, "Watch, rebuild, and serve production build at :3000", "Development"),
    # Build
    "gen-git-stats": (target_gen_git_stats, "Generate git statistics", "Build"),
    "gen-git-commits": (target_gen_git_commits, "Generate git commits JSON", "Build"),
    "gen-git-meta": (target_gen_git_meta, "Generate component-level git blame metadata", "Build"),
    "gen-git-all": (target_gen_git_all, "Generate all git data in parallel", "Build"),
    "gen-activity": (target_gen_activity, "Generate cross-repo activity feed JSON", "Build"),
    "build": (target_build, "Build for production", "Build"),
    "build-force": (
        target_build_force,
        "Force rebuild (clean TypeScript cache)",
        "Build",
    ),
    "analyze": (target_analyze, "Build and analyze bundle size", "Build"),
    "analyze-verbose": (
        target_analyze_verbose,
        "Build with verbose bundle analysis",
        "Build",
    ),
    # Quality
    "lint": (target_lint, "Run ESLint on the codebase", "Quality"),
    "lint-fix": (target_lint_fix, "Run ESLint and auto-fix issues", "Quality"),
    "type-check": (target_type_check, "Run TypeScript type checking", "Quality"),
    "format": (target_format, "Format codebase with Prettier", "Quality"),
    "format-check": (target_format_check, "Check formatting with Prettier", "Quality"),
    "check": (target_check, "Run all checks (lint + type-check)", "Quality"),
    # Maintenance
    "clean": (target_clean, "Clean build artifacts", "Maintenance"),
    "clean-all": (
        target_clean_all,
        "Clean everything including node_modules",
        "Maintenance",
    ),
    "reinstall": (
        target_reinstall,
        "Reinstall all dependencies from scratch",
        "Maintenance",
    ),
    "update": (
        target_update,
        "Update all dependencies to latest versions",
        "Maintenance",
    ),
    "outdated": (target_outdated, "Check for outdated dependencies", "Maintenance"),
    # Git
    "status": (target_status, "Show git status", "Git"),
    "log": (target_log, "Show recent git commits", "Git"),
    "pull": (target_pull, "Pull latest changes from remote", "Git"),
    "push": (target_push, "Push changes to remote", "Git"),
    # Info
    "info": (target_info, "Show project information", "Info"),
    "env": (target_env, "Show environment information", "Info"),
    # Composite
    "fresh-start": (
        target_fresh_start,
        "Clean, install, and run dev server",
        "Composite",
    ),
    "prod-ready": (
        target_prod_ready,
        "Clean, check, and build for production",
        "Composite",
    ),
    "quick-deploy": (target_quick_deploy, "Lint + type-check + build", "Composite"),
    # Meta
    "help": (None, "Show this help message", "Meta"),
}


def target_help():
    from collections import defaultdict

    title = (
        Fore.CYAN
        + Style.BRIGHT
        + "Portfolio Project — Available Commands"
        + Style.RESET_ALL
    )
    print(f"\n{title}\n")

    groups: dict = defaultdict(list)
    for name, (_, desc, group) in TARGETS.items():
        groups[group].append((name, desc))

    group_order = [
        "Development",
        "Build",
        "Quality",
        "Maintenance",
        "Git",
        "Info",
        "Composite",
        "Meta",
    ]
    for group in group_order:
        if group not in groups:
            continue
        header = Fore.YELLOW + Style.BRIGHT + f"{group}:" + Style.RESET_ALL
        print(header)
        for name, desc in groups[group]:
            padded = name.ljust(22)
            print(f"  {Fore.GREEN}{padded}{Style.RESET_ALL}  {desc}")
        print()

    if not HAS_COLOR:
        print("  Tip: pip install colorama  to enable colored output\n")


TARGETS["help"] = (target_help, "Show this help message", "Meta")


def main():
    if len(sys.argv) < 2:
        target_help()
        sys.exit(0)

    name = sys.argv[1]
    extra_args = sys.argv[2:] if len(sys.argv) > 2 else []

    if name not in TARGETS:
        print(f"{Fore.RED}[ERROR]{Style.RESET_ALL} Unknown target: '{name}'")
        print("  Run:  python makefile.py help  to list all available targets.")
        sys.exit(1)

    func, _, _ = TARGETS[name]
    sig = inspect.signature(func)
    if "extra_args" in sig.parameters:
        func(extra_args=extra_args if extra_args else None)
    else:
        func()


if __name__ == "__main__":
    main()
