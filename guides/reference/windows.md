Windows Vista and newer Windows versions are fully supported.

To get started ensure the following dependencies are installed:

* Node.js - [https://nodejs.org/en/](https://nodejs.org/en/)
* Git - [https://git-scm.com/](https://git-scm.com/)
* Chrome - [https://www.google.com/chrome/](https://www.google.com/chrome/)

### Performance

Although supported, Windows performance, at least by default, isn't as good as
on Linux or MacOS. On a positive note, this story continues to improve. Both
Microsoft, and the Ember CLI team continue to work on improving these developer
ergonomics.

#### What causes the build slowdown?

The two primary reasons are:

* Lack of enabled-by-default symlinks
* Generally slower FS operations on NTFS

#### For the best possible Windows experience

* Use Windows Subsystem Linux [Installation
  Guide](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide)

#### Improving your Windows experience

Ensure Search and Defender ignore your project's `tmp` directory:

```bash
npm install -g ember-cli-windows
```

Then, to start the automatic configuration, run:

```bash
ember-cli-windows
```

*Make sure you use an elevated PowerShell.* <!-- Needs Instructions -->
If there was an error, try executing Set-ExecutionPolicy Unrestricted -scope Process first.

[Read more about this from the Microsoft DX Open Source team](http://felixrieseberg.com/improved-ember-cli-performance-with-windows/)

### Enabling symlinks

To create symlinks the account running Ember CLI must have the
`SeCreateSymbolicLinkPrivilege`. Users in the Administrators group have this
permission already. However, if UAC (User Access Control) is enabled, users in
the Administrators group must run their shell using Run As Administrator
because UAC strips away certain permissions from the Administrators +group,
including `SeCreateSymbolicLinkPrivilege`.

![Run As Administrator](/assets/images/run-as-admin.png)

If the user account is not part of the Administrators group you will need to
add the `SeCreateSymbolicLinkPrivilege` to allow the creation of symlinks. To
do this open the `Local Security Policy` by typing Local Security Policy in the
Windows `Run` Box.

Under `Local Policies` -> `User Rights Assignment` find the `Create symbolic
links` policy and double click it to add a new user or group. Once your user or
group has been added, your user should be able to create symlinks. Keep in mind
if your user is part of the Administrators group and UAC is enabled you will
still need to start your shell using `Run as Administrator`.

![Enabling Symlinks](/assets/images/enabling-symlinks.png)

### Issues With npm: `EEXISTS`, Path too Long, etc

There were always two major issues with running Node.js on Windows: first and
foremost, the operating system maintains a maximum length for path names, which
clashes with Node's traditional way of nesting modules in `node_modules`. The
second issue was a bit more subtle: The npm installer had a set of steps it
executed for each package and it would immediately start executing them as soon
as it decided to act on a package resulting in hard-to-debug race conditions.

`npm` 3 is a nearly complete rewrite of `npm`, fixing both issues. Windows users of
Ember Cli might want to make the switch to `npm` 3 to benefit from its
flat module installation (solving most issues involving long path names) as well
as its multi-stage installer.
