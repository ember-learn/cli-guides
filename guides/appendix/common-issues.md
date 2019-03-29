Having trouble with something? Check out these common pitfalls.

## Don't install `npm` packages with `sudo`

Installing packages such as `bower` with `sudo` powers can lead to permissions
issues and ultimately to problems installing dependencies. See
[https://gist.github.com/isaacs/579814](https://gist.github.com/isaacs/579814)
for a collection of various solutions.

## Installing from behind a proxy

If you're behind a proxy, you might not be able to install because ember-cli (or
some of its dependencies) tries to `git clone` a `git://` URL. (In this scenario,
only `http://` URLs will work).

You'll probably get an error like this:

```shell
npm ERR! git clone git://github.com/jgable/esprima.git Cloning into bare repository '/home/<username>/.npm/_git-remotes/git-github-com-jgable-esprima-git-d221af32'...
npm ERR! git clone git://github.com/jgable/esprima.git
npm ERR! git clone git://github.com/jgable/esprima.git fatal: unable to connect to github.com:
npm ERR! git clone git://github.com/jgable/esprima.git github.com[0: 192.30.252.129]: errno=Connection timed out
npm ERR! Error: Command failed: fatal: unable to connect to github.com:
npm ERR! github.com[0: 192.30.252.129]: errno=Connection timed out
```

As a workaround you can configure `git` to make the translation:

```shell
git config --global url."https://".insteadOf git://
```

## Using Canary build instead of release

In most cases you should use a stable release, but if you need to install a canary version to test beta features, you'd do it like this:

For Ember: `bower install ember#canary --resolution canary`
For `ember-data`: `npm install --save-dev emberjs/data#master`

## Windows build performance issues

See [The Windows Section](/release/appendix/windows/) for more details.

## Cygwin on Windows

Node.js on Cygwin is no longer supported [more
details](https://github.com/nodejs/node/wiki/Installation#building-on-cygwin)
Rather then using Cygwin, we recommend running ember-cli natively on windows,
or via the new [Windows Subsystem
Linux](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide).

<!-- ## Usage with Docker -->
<!-- Possible topic for future development. -->


## Usage with Vagrant

[Vagrant](https://vagrantup.com) is a system for automatically creating and
setting up development environments that run in a virtual machine (VM).

Running your ember-cli development environment from inside of a Vagrant VM will
require some additional configuration and will carry a few caveats.

### Ports

In order to access your ember-cli application from your desktop's web browser,
you'll have to open some forwarded ports into your VM. ember-cli by default
uses two ports.

* For serving assets the default is `4200`. Can be configured via `--port 4200`.
* For live reload there is no default. Can be configured via `---live-reload-port=9999`.

To make Vagrant development seamless these ports will need to be forwarded.

```ruby
Vagrant.configure("2") do |config|
  # ...
  config.vm.network "forwarded_port", guest: 4200, host: 4200
  config.vm.network "forwarded_port", guest: 9999, host: 9999
end
```

### Watched Files

The way Vagrant syncs directories between your desktop and VM may prevent file
watching from working correctly. This will prevent rebuilds and live reloads
from working correctly. There are several workarounds:

1. Watch for changes by polling the file system via: `ember serve --watcher polling`.
2. Use [nfs for synced folders](https://docs.vagrantup.com/v2/synced-folders/nfs.html).

### VM setup

When setting up your VM, install ember-cli dependencies as you normally would.
Some of these dependencies (such as [broccoli-sass](#sass)) may have native
dependencies that may require recompilation. To do so run:

```shell
npm rebuild
```

### Provider

The two most common Vagrant providers, VirtualBox and VMware Fusion, will both
work. However, VMware Fusion is substantially faster and will use less battery
life if you're on a laptop. As of now, VirtualBox will use 100% of a single CPU
core to poll for file system changes inside of the VM.
