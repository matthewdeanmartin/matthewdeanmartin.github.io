# What’s the Problem?

---
# Takes a week to get development environment setup.
- Documentation either doesn’t exist at all, is outdated, or is aimed at someone with much more or much less experience, or documentation is actually a 500 page book no one has time to read
- Tech lead spends time stepping new developers through the process, keeps learning that every workstation is unique
- Working on two projects with a shared resources and the have conflicting resources (servers, libraries, native code, tooling)
- Install a server on host OS and it doesn’t go away and you have REDIS and Postgres running all the time
---
# Why Devcontainers?

- Single click
- Isolated development environment
- Lighter weight than several virtual machines
- Works with podman (we don’t have docker desktop licenses)
- VSCode integration means many tricky tasks are done by VS Code.

---
# What are Devcontainers?

- .devcontainer file
- Dockerfile that pulls a Microsoft built image (expect degraded VS Code integration if you use some other image)
- dotfiles for per-developer customization


---
# What did we used to do?

Develop on host operating system. More difficult to isolate, set up is README.md or various commands to be run manually.

Develop in Docker container. Lots of fiddling with Docker, not the best

WSL2. Same as developing on host OS, except now it is a virtual machine with more integration points with windows than your usual Hyper-V. Networking may or may not work with VPN. If it doesn’t, good luck with that.

Virtualbox/Vagrant. Same except now it is incompatible with docker and WSL2.

---
# How does devcontainers solve that?

Container uses a lot more host OS things, so VPN and networking more likely to work.

Generally no fiddling with `docker run` commands.

Still uses WSL via podman.

You can still interact with your files outside of the container

---
# Work patterns

---
- “Open in Container”
- Use terminal to do things inside of the container.
- Running a website in the container triggers VSCode to create port forwarding, open site in browser in host OS.
---
- Reduce context switching with terminal tools
- Optionally, add more CLI and TUI tools so you can browse the file system, etc.
- Or don’t and just do everything through VSCode.

---
# Secrets Management
- You could bake public secrets into the container, or use .env files
- Warning VS Codes .env can’t handle blank lines, the word `export` and doesn’t handle crlf (DOS line endings)

---
# Dotfiles
- Allows for per-developer customization.
- Config files from dotfiles repo are copied to your home directory.
- Becare full to not just publish everything in your home directory to a public dotfiles repo.
- Or don’t and just take the container defaults.

---
# Problems
- Podman is not easy to install on mac or windows.
- Start up cost of about a minute  or two.
- Docker containers & images take up a lot of drive space.
- Package manager will share less
- You have to clone with HTTPS not SSL for git-inside-containers integration to work (without re-adding credentials on each container.)
(If you mount your home folder, you can quickly copy your ssh keys)

---
# Alternatives
---
# “Open in WSL2” 
- Similar experience, but everyone can have a different WSL distro and the state is shared.
---
# Pycharm - open in WSL2. 
Pycharm runs in host operating system, but terminal and debugger run in WSL2.
---
# “Open in SSH” 
- Assumes you have a remote machine.
---
# Github codepspaces 

- Pay by the hour machines. First 20 hours a week are free, but you’re in Github not private Gitlab.
